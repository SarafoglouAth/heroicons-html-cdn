# heroicons-html-cdn

A simple Node.js package to easily fetch Heroicons SVG strings for direct use in your HTML. This allows you to leverage the popular Heroicons library without the need for complex build configurations or component-based frameworks in certain scenarios.

## Installation

You can install `heroicons-html-cdn` using npm:

```bash
npm install heroicons-html-cdn
````

## Usage

Once installed, you can import the `getIcon` and `getIconList` functions into your JavaScript code:

```javascript
import { getIcon, getIconList } from 'heroicons-html-cdn';
```

**Getting a Specific Icon:**

The `getIcon` function allows you to retrieve the SVG string for a specific Heroicon. It takes two arguments:

1.  **`style`**: The style of the icon ('outline' or 'solid').
2.  **`name`**: The name of the icon (e.g., 'user', 'bell', 'arrow-right').

It returns the SVG string for the requested icon, which you can then inject directly into your HTML.

**Example (using Astro):**

```javascript
---
import { getIcon } from 'heroicons-html-cdn';
const svg = getIcon('outline', 'check-circle');
---

<div class="h-6 w-6 text-white" set:html={svg} />
```

**Getting a List of Icons:**

The `getIconList` function allows you to retrieve a list of available icon names for a specific style. It takes one argument:

1.  **`style`**: The style of the icons ('outline', 'solid', or 'mini').

It returns an array of strings, where each string is the name of an available icon in that style. For example:

```javascript
const outlineIcons = getIconList('outline');
console.log(outlineIcons); // Output: ['academic-cap', 'adjustments', ...]
```

**How to Find Icon Names:**

You can find the complete list of available Heroicons and their names on the official Heroicons website:

  * **Official Heroicons Website:** [https://heroicons.com/](https://heroicons.com/) (Browse the icons and note their names, which you'll use with the `getIcon` function.)

You can also explore the icon names by examining the filenames of the SVG icons in the official Heroicons GitHub repository:

  * **Heroicons GitHub Repository:** [https://github.com/tailwindlabs/heroicons](https://github.com/tailwindlabs/heroicons) (Check the `src/outline` and `src/solid` directories for SVG files. The filename (without the `.svg` extension) is the icon name.)

**Key Points:**

  * Ensure you have installed the package using npm.
  * Import the `getIcon` function to retrieve SVG strings for specific icons.
  * Use the correct icon `style` and `name` (found on the Heroicons website or GitHub repository) with the `getIcon` function.
  * You can style the icons using CSS on the container element where you inject the SVG.

 