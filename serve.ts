// Vice Ledger v2 — local dev server: serves app/ at http://localhost:8080 for screenshot runs.
// Node 22, standard library only. Serves only files under app/; anything else is a 404.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(join(here, 'app'));
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png' };

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost:8080');
  let path = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const file = resolve(join(root, normalize(path)));
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});

server.listen(8080, () => console.log('vice-ledger-v2 serving app/ at http://localhost:8080'));
