# Gallery

This is a simple gallery app that fetches images from the [Unsplash API](https://unsplash.com/developers) and displays them in a grid. The app is built using React, TypeScript, and Vite.

## Wishlist

1. use tanstack routing to separate gallery vs editor view
1. use react-hotkeys-hook to allow keyboard shortcuts for editing annotations and navigating the gallery
   1. https://react-hotkeys-hook.vercel.app/docs/intro
1. use divs instead of tables to control display of property grids
   1. make sure that the user can change the width of the column on the property grid
1. Use tree view to navigate data hierarchy
   1. https://github.com/lukasbach/react-complex-tree
1. use orama for searching the data hierarchy
   1. https://docs.orama.com/open-source/
1. allow user to add images to the gallery
   1. allow user to edit the annotations images in the gallery
   1. allow media pipe object detection to add annotations to images
1. editor quality of life
   1. allow object snapping
      1. https://konvajs.org/docs/sandbox/Objects_Snapping.html
   1. allow user to upload images as annotation overlays
   1. allow user to create a blank new sheet/canvas
      1. requires restructuring the data hierarchy/document model

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
