// Vice Ledger — entrypoint for the make.fun GTA 6 trophy guide bounty.
// Copies app/ and screenshots/ into the output directory and writes the
// dossier with the kit's buildDossier. Node 22 standard library only.
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

function fail(message: string): never {
  throw new Error(`vice-ledger main: ${message}`);
}

function assertNoSymlinks(root: string): void {
  const stat = lstatSync(root);
  if (stat.isSymbolicLink()) fail(`${root} is a symbolic link`);
  if (!stat.isDirectory()) return;
  for (const name of readdirSync(root)) {
    assertNoSymlinks(join(root, name));
  }
}

function emptyDirectory(dir: string): void {
  // Clear the directory's contents without removing the directory itself:
  // on the grader the output path is a bind mount, and removing it fails.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function copySorted(src: string, dest: string): void {
  // Copy in sorted name order so the output tree is built identically on
  // every run, whatever order the filesystem hands entries back in.
  const stat = lstatSync(src);
  if (stat.isSymbolicLink()) fail(`${src} is a symbolic link`);
  if (stat.isDirectory()) {
    mkdirSync(dest, { recursive: true });
    for (const name of readdirSync(src).sort()) {
      copySorted(join(src, name), join(dest, name));
    }
    return;
  }
  if (stat.isFile()) {
    copyFileSync(src, dest);
    return;
  }
  fail(`${src} is neither a file nor a directory`);
}

function main(): void {
  const appDir = join(REPO_ROOT, 'app');
  const shotsDir = join(REPO_ROOT, 'screenshots');
  if (!existsSync(appDir)) fail('app/ is missing from the repository');
  if (!existsSync(shotsDir)) fail('screenshots/ is missing from the repository');
  assertNoSymlinks(appDir);
  assertNoSymlinks(shotsDir);

  emptyDirectory(OUT_DIR);
  copySorted(appDir, join(OUT_DIR, 'app'));
  copySorted(shotsDir, join(OUT_DIR, 'screenshots'));

  const dossier = buildDossier(OUT_DIR, CAPS);
  writeFileSync(join(OUT_DIR, 'dossier.json'), dossier);
  console.log(`vice-ledger: wrote ${OUT_DIR} (dossier ${dossier.length} bytes)`);
}

main();
