# Dash

This is a simple mapper app.

## Relevant Commands

```sh
# Install the nx toolkit
pnpm install -g nx

# Build the app
pnpm exec nx build app

# Run the app
pnpm exec nx serve app -- --port 5000 --host 0.0.0.0

# Run the e2e tests
pnpm exec nx e2e app-e2e

# Show projects
pnpm exec nx show project app --web
pnpm exec nx show project app-e2e --web

# Generate a new react library
pnpm exec nx generate @nx/react:library \
  --projectNameAndRootFormat "as-provided" \
  --component "false" \
  --style "css" \
  --importPath "@dash/mapper-ui" \
  --name "mapper-ui" \
  --bundler "none" \
  --directory "libs/mapper-ui" \
  --unitTestRunner "jest"

pnpm exec nx generate @nx/react:library \
  --projectNameAndRootFormat "as-provided" \
  --component "false" \
  --style "css" \
  --importPath "@dash/tagger-ui" \
  --name "tagger-ui" \
  --bundler "none" \
  --directory "libs/tagger-ui" \
  --unitTestRunner "vitest"

pnpm exec nx generate @nx/react:library \
  --projectNameAndRootFormat "as-provided" \
  --component "false" \
  --style "css" \
  --importPath "@dash/common-ui" \
  --name "common-ui" \
  --bundler "none" \
  --directory "libs/common-ui" \
  --unitTestRunner "vitest"

# Generate a new react component
pnpm exec nx generate @nx/react:component \
  --nameAndDirectoryFormat "as-provided" \
  --name "mapper-property-grid" \
  --directory "libs/mapper-ui/src/components/mapper-property-grid" \
  --export

pnpm exec nx generate @nx/react:component \
  --nameAndDirectoryFormat "as-provided" \
  --name "tagger-index-page" \
  --directory "libs/tagger-ui/src/components/tagger-index-page" \
  --export

pnpm exec nx generate @nx/react:component \
  --nameAndDirectoryFormat "as-provided" \
  --name "qr-pdf" \
  --directory "libs/common-ui/src/components/qr-pdf" \
  --export

pnpm exec nx g @nx/js:lib --directory libs/qr qr --bundler=none
```

## Wishlist

- [x] When starting a canvas edit session, load canvas snapshot in to memory.
  - [x] All work are to be conducted in memory thereafter.
  - [ ] For each canvas, only store patches on mutations and don't store entire mutated objects. this lends to faster writes to indexdb on large canvas drawings
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
  - [x] now supports annotations that have parent annotations
  - [x] parent annotations act as a layer folder and they are no longer rendered in the canvas
  - [x] parent annotations can be collapsed and expanded
  - [ ] when selecting a parent annotation, all child annotations should be selected recursively
- multiselect
  - [ ] allow user to select multiple annotations (shift + click)
  - [ ] allow user to select multiple annotations by selecting the parent annotation
  - [ ] allow user to move multiple annotations
  - [ ] allow user to delete multiple annotations
  - [ ] allow user to edit multiple annotations
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
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## NX

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `npx nx serve app` to start the development server. Happy coding!

## Build for production

Run `npx nx build app` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)