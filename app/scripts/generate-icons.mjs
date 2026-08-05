import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcSvg = path.join(__dirname, '..', 'assets-src', 'icon-mark.svg');
const outDir = path.join(__dirname, '..', 'public', 'icons');

mkdirSync(outDir, { recursive: true });

const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-512.png', size: 512, padding: 0.16 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32.png', size: 32 },
];

for (const t of targets) {
  const size = t.size;
  if (t.padding) {
    const inner = Math.round(size * (1 - t.padding * 2));
    const buf = await sharp(srcSvg).resize(inner, inner).toBuffer();
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0x15, g: 0x2f, b: 0x57, alpha: 1 },
      },
    })
      .composite([{ input: buf, gravity: 'center' }])
      .png()
      .toFile(path.join(outDir, t.name));
  } else {
    await sharp(srcSvg).resize(size, size).png().toFile(path.join(outDir, t.name));
  }
  console.log('generated', t.name);
}

// apple-touch-icon also goes to public root (referenced directly)
await sharp(srcSvg)
  .resize(180, 180)
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));

console.log('done');
