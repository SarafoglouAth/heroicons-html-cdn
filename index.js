// index.js
const getIconModule = import('./getIcon.server.js');

export const getIcon = async (style, name) => {
  const { getIcon } = await getIconModule;
  return getIcon(style, name);
};

export const getIconList = async () => {
  const { getIconList } = await getIconModule;
  return getIconList();
};