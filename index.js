// index.js (CommonJS-safe wrapper)
let mod;
function load() {
  if (!mod) mod = require('./getIcon.server.js');
  return mod;
}

exports.getIcon = (...args) => load().getIcon(...args);
exports.getIconList = () => load().getIconList();
