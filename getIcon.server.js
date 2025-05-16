// getIcon.server.js
const fs = require('fs');
const path = require('path');

/**
 * getIcon('solid', 'home') → raw SVG string
 */
exports.getIcon = (style, name) => {
  const p = path.join(__dirname, style, `${name}.svg`);
  if (!fs.existsSync(p)) throw new Error(`Icon not found: ${style}/${name}`);
  return fs.readFileSync(p, 'utf-8');
};

exports.getIconList = () => {
  return require('./icons.json');
};
