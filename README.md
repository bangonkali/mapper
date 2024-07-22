# Mapper

This is a simple mapper app.

## Wishlist

- [ ] all user to create a new document from scratch
  - [ ] allow user to add an image to a document
  - [ ] allow user to add/delete annotations to an image
  - [ ] allow user to add/delete tags to an annotation
- [x] introduce a way to dynamically add annotation overlay
- [x] use tanstack routing to separate mapper gallery vs editor view
- [ ] use react-hotkeys-hook to allow keyboard shortcuts for editing annotations and navigating the mapper gallery
  - [ ] https://react-hotkeys-hook.vercel.app/docs/intro
- [x] use divs instead of tables to control display of property grids
  - [x] make sure that the user can change the width of the column on the property grid
- [x] Allow user to view annotation tags in the form of a table
  - [x] when the user clicks on a tag in the table, the corresponding annotation should be highlighted in the editor
  - [x] when the user clicks on an annotation in the editor, the corresponding tag should be highlighted & focused & visible in the table
  - [ ] Add a toolbar in the table to allow some functions
    - [ ] Allow user to edit the tags in the table
    - [ ] Allow user to add annotations tag types using the table
- [x] Use tree view to navigate data hierarchy
- [ ] use orama for searching the data hierarchy
  - [ ] https://docs.orama.com/open-source/
- [ ] allow user to add images to the mapper gallery
  - [ ] allow user to edit the annotations images in the mapper gallery
  - [ ] allow media pipe object detection to add annotations to images
- [ ] editor quality of life
  - [ ] allow object snapping
    - [ ] https://konvajs.org/docs/sandbox/Objects_Snapping.html
  - [ ] allow user to upload images as annotation overlays
  - [ ] allow user to create a blank new sheet/canvas
    - [ ] requires restructuring the data hierarchy/document model

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
