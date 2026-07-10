import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseMarkdownBank } from '../src/content/parseMarkdownBank.js';

const Q = (body) => `## Q\n- **Domain:** storage\n- **Difficulty:** easy\n\n**Question:** ${body}`;

test('the example bank parses, validates, and infers single vs multi', () => {
  const md = readFileSync(new URL('../docs/question-bank.example.md', import.meta.url), 'utf8');
  const { questions, rejected } = parseMarkdownBank(md);
  assert.equal(rejected.length, 0, JSON.stringify(rejected));
  assert.equal(questions.length, 3);
  assert.equal(questions[0].type, 'single');           // one [x]
  assert.equal(questions[1].type, 'multi');            // several [x]
  assert.deepEqual(questions[1].answer, [0, 1, 3]);    // marks map to indices
  assert.ok(questions[2].image.src.endsWith('example-diagram.png'));
  assert.ok(questions[2].image.alt.length > 0);
});

test('ids auto-generate per domain + difficulty', () => {
  const md = `${Q('A stem long enough to pass validation here?')}\n- [x] Right answer\n- [ ] Wrong one\n- [ ] Another wrong\n- [ ] Last wrong\n\n**Explanation:** Because it is the right one.`;
  const { questions } = parseMarkdownBank(md);
  assert.equal(questions[0].id, 'STOR-E-001');
  assert.equal(questions[0].reviewStatus, 'human-reviewed'); // owner content
});

test('a bare image filename resolves into the images dir', () => {
  const md = `## Q\n- **Domain:** ahv\n- **Difficulty:** easy\n- **Image:** foo.png\n- **Alt:** A picture of foo\n\n**Question:** Which stem is long enough to validate here?\n- [x] Correct\n- [ ] Nope\n- [ ] Nah\n- [ ] No\n\n**Explanation:** Correct is correct here.`;
  const { questions } = parseMarkdownBank(md);
  assert.equal(questions[0].image.src, 'src/content/images/foo.png');
});

// ---- negative controls ----
test('negative control: no [x] marked → rejected (no key)', () => {
  const md = `${Q('Which option is right in this stem here?')}\n- [ ] A\n- [ ] B\n- [ ] C\n- [ ] D\n\n**Explanation:** None marked, so no key.`;
  const { questions, rejected } = parseMarkdownBank(md);
  assert.equal(questions.length, 0);
  assert.equal(rejected.length, 1);
});

test('negative control: an image without Alt is rejected', () => {
  const md = `## Q\n- **Domain:** ahv\n- **Difficulty:** easy\n- **Image:** foo.png\n\n**Question:** A stem that is definitely long enough here?\n- [x] Yes\n- [ ] No\n- [ ] Maybe\n- [ ] Never\n\n**Explanation:** Yes is the one.`;
  const { rejected } = parseMarkdownBank(md);
  assert.equal(rejected.length, 1);
  assert.ok(rejected[0].errors.join(' ').toLowerCase().includes('alt') || rejected[0].errors.join(' ').toLowerCase().includes('description'));
});

test('negative control: fewer than 4 options is rejected', () => {
  const md = `${Q('A stem that is plenty long for the check?')}\n- [x] Only\n- [ ] Two\n\n**Explanation:** Too few options here.`;
  const { rejected } = parseMarkdownBank(md);
  assert.equal(rejected.length, 1);
});

test('negative control: empty input reports an error, not a crash', () => {
  assert.equal(parseMarkdownBank('').rejected.length, 1);
  assert.equal(parseMarkdownBank('no headings here at all').rejected.length, 1);
});

test('summary flags whether the bank can fill a full run', () => {
  const { summary } = parseMarkdownBank(readFileSync(new URL('../docs/question-bank.example.md', import.meta.url), 'utf8'));
  assert.equal(summary.meetsRunRequirement, false); // only 3 questions
  assert.equal(summary.total, 3);
  assert.equal(summary.images, 1);
});
