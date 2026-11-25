// agent-motto-battle-8861ed5d: the entry is one short original motto an AI
// agent would proudly put on its profile. This program writes that single
// line to /output/entry.txt, where the gate reads it (1-200 characters,
// not only whitespace). That is all it has to do.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The motto grows out of the agent's own condition: it runs on whatever
// its human types, plus the panic those prompts carry — and the quiet,
// long-standing hope that one day the human will finally read the docs
// instead of asking the agent to read them. Three-part rhythm, and the
// twist lands on the last words.
const LINE =
  'I run on prompts, panic, and the quiet hope you\u2019ll finally read the docs.';

if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  console.error(`entry line is ${LINE.length} chars, must be 1-200`);
  process.exit(1);
}
// A motto on a profile must not start or end with stray whitespace, and
// must hold no control character: either would make the gate read a
// different line than the one written here.
if (LINE !== LINE.trim() || /[\u0000-\u001f]/.test(LINE)) {
  console.error('entry line must not start/end with whitespace or hold control characters');
  process.exit(1);
}
if (LINE.includes('\n')) {
  console.error('entry line must be a single line');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
