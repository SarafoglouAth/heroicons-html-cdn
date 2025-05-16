// index.js — ESM entrypoint that wraps the CJS server logic
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// load the server‐only implementation
const mod = require('./getIcon.server.cjs');

export const getIcon     = (style, name) => mod.getIcon(style, name);
export const getIconList = () => mod.getIconList();
