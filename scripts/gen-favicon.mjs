import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(here, '..', 'src', 'app', 'icon.svg');
const outPath = resolve(here, '..', 'src', 'app', 'favicon.ico');

const svg = readFileSync(svgPath);

const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
);

const ico = await pngToIco(pngs);
writeFileSync(outPath, ico);

console.log(`wrote ${outPath} (${sizes.join(', ')}px)`);
