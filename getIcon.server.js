import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import icons from './icons.json' assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getIcon(style, name) {
  const p = path.join(__dirname, style, `${name}.svg`);
  if (!fs.existsSync(p)) throw new Error(`Icon not found: ${style}/${name}`);
  return fs.readFileSync(p, 'utf-8');
}

export function getIconList() {
  return icons;
}
