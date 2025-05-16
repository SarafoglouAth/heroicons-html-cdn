declare module 'heroicons-html-cdn' {
  import type { SolidIconName, OutlineIconName } from './icon-types';

  export type { SolidIconName, OutlineIconName };  

  /**
   * Returns the raw SVG string for a given icon.
   * @throws if the icon file does not exist
   */
  export function getIcon(style: 'solid', name: SolidIconName): string;
  export function getIcon(style: 'outline', name: OutlineIconName): string;

  /**
   * Returns an object with all available icon names for each style.
   */
  export function getIconList(): {
    solid: SolidIconName[];
    outline: OutlineIconName[];
  };
}
