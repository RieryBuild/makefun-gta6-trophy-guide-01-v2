// Vice Ledger — local dev server for trying the guide and taking screenshots.
// Serves app/ at the root on port 8080. Node 22 standard library only.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), 'app');
const PORT = 8080;

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer((req, res) => {
  // URL already decodes the pathname once; decoding again would let an
  // encoded traversal slip past the containment check below.
  const raw = new URL(req.url || '/', 'http://127.0.0.1').pathname;
  const target = resolve(APP_ROOT, '.' + (raw === '/' ? '/index.html' : raw));
  const inside = target === APP_ROOT || target.startsWith(APP_ROOT + sep);
  if (!inside || !existsSync(target) || !statSync(target).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('not found\n');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(target)] || 'application/octet-stream' });
  res.end(readFileSync(target));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Vice Ledger dev server: http://127.0.0.1:${PORT}/`);
});
