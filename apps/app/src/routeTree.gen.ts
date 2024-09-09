/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const TaggerIndexLazyImport = createFileRoute('/tagger/')()
const GalleryIndexLazyImport = createFileRoute('/gallery/')()
const CanvasCanvasIdLazyImport = createFileRoute('/canvas/$canvasId')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TaggerIndexLazyRoute = TaggerIndexLazyImport.update({
  path: '/tagger/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tagger.index.lazy').then((d) => d.Route))

const GalleryIndexLazyRoute = GalleryIndexLazyImport.update({
  path: '/gallery/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/gallery.index.lazy').then((d) => d.Route))

const CanvasCanvasIdLazyRoute = CanvasCanvasIdLazyImport.update({
  path: '/canvas/$canvasId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/canvas.$canvasId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/canvas/$canvasId': {
      id: '/canvas/$canvasId'
      path: '/canvas/$canvasId'
      fullPath: '/canvas/$canvasId'
      preLoaderRoute: typeof CanvasCanvasIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/gallery/': {
      id: '/gallery/'
      path: '/gallery'
      fullPath: '/gallery'
      preLoaderRoute: typeof GalleryIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/tagger/': {
      id: '/tagger/'
      path: '/tagger'
      fullPath: '/tagger'
      preLoaderRoute: typeof TaggerIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AboutLazyRoute,
  CanvasCanvasIdLazyRoute,
  GalleryIndexLazyRoute,
  TaggerIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/canvas/$canvasId",
        "/gallery/",
        "/tagger/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/canvas/$canvasId": {
      "filePath": "canvas.$canvasId.lazy.tsx"
    },
    "/gallery/": {
      "filePath": "gallery.index.lazy.tsx"
    },
    "/tagger/": {
      "filePath": "tagger.index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
