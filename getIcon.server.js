import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Conditional import to avoid browser issues
let __dirname;
if (typeof window === 'undefined') {
  __dirname = path.dirname(fileURLToPath(import.meta.url));
} else {
  __dirname = './'; // Or a suitable fallback for browser context (unlikely to be used)
}

import icons from './icons.json' assert { type: "json" };

export function getIcon(style, name) {
  const p = path.join(__dirname, style, `${name}.svg`);
  if (!fs.existsSync(p)) throw new Error(`Icon not found: ${style}/${name}`);
  return fs.readFileSync(p, 'utf-8');
}

export function getIconList() {
  return icons;
}