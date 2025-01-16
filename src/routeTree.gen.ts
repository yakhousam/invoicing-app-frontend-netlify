/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as LayoutSettingsImport } from './routes/_layout/settings'
import { Route as LayoutOverviewImport } from './routes/_layout/overview'
import { Route as LayoutInvoicesIndexImport } from './routes/_layout/invoices.index'
import { Route as LayoutClientsIndexImport } from './routes/_layout/clients.index'
import { Route as LayoutInvoicesCreateImport } from './routes/_layout/invoices.create'
import { Route as LayoutInvoicesIdImport } from './routes/_layout/invoices.$id'
import { Route as LayoutClientsCreateImport } from './routes/_layout/clients.create'
import { Route as LayoutClientsIdImport } from './routes/_layout/clients.$id'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LayoutSettingsRoute = LayoutSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutOverviewRoute = LayoutOverviewImport.update({
  id: '/overview',
  path: '/overview',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutInvoicesIndexRoute = LayoutInvoicesIndexImport.update({
  id: '/invoices/',
  path: '/invoices/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutClientsIndexRoute = LayoutClientsIndexImport.update({
  id: '/clients/',
  path: '/clients/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutInvoicesCreateRoute = LayoutInvoicesCreateImport.update({
  id: '/invoices/create',
  path: '/invoices/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutInvoicesIdRoute = LayoutInvoicesIdImport.update({
  id: '/invoices/$id',
  path: '/invoices/$id',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutClientsCreateRoute = LayoutClientsCreateImport.update({
  id: '/clients/create',
  path: '/clients/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutClientsIdRoute = LayoutClientsIdImport.update({
  id: '/clients/$id',
  path: '/clients/$id',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/overview': {
      id: '/_layout/overview'
      path: '/overview'
      fullPath: '/overview'
      preLoaderRoute: typeof LayoutOverviewImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/settings': {
      id: '/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof LayoutSettingsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/clients/$id': {
      id: '/_layout/clients/$id'
      path: '/clients/$id'
      fullPath: '/clients/$id'
      preLoaderRoute: typeof LayoutClientsIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/clients/create': {
      id: '/_layout/clients/create'
      path: '/clients/create'
      fullPath: '/clients/create'
      preLoaderRoute: typeof LayoutClientsCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/invoices/$id': {
      id: '/_layout/invoices/$id'
      path: '/invoices/$id'
      fullPath: '/invoices/$id'
      preLoaderRoute: typeof LayoutInvoicesIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/invoices/create': {
      id: '/_layout/invoices/create'
      path: '/invoices/create'
      fullPath: '/invoices/create'
      preLoaderRoute: typeof LayoutInvoicesCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/clients/': {
      id: '/_layout/clients/'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof LayoutClientsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/invoices/': {
      id: '/_layout/invoices/'
      path: '/invoices'
      fullPath: '/invoices'
      preLoaderRoute: typeof LayoutInvoicesIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutOverviewRoute: typeof LayoutOverviewRoute
  LayoutSettingsRoute: typeof LayoutSettingsRoute
  LayoutClientsIdRoute: typeof LayoutClientsIdRoute
  LayoutClientsCreateRoute: typeof LayoutClientsCreateRoute
  LayoutInvoicesIdRoute: typeof LayoutInvoicesIdRoute
  LayoutInvoicesCreateRoute: typeof LayoutInvoicesCreateRoute
  LayoutClientsIndexRoute: typeof LayoutClientsIndexRoute
  LayoutInvoicesIndexRoute: typeof LayoutInvoicesIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutOverviewRoute: LayoutOverviewRoute,
  LayoutSettingsRoute: LayoutSettingsRoute,
  LayoutClientsIdRoute: LayoutClientsIdRoute,
  LayoutClientsCreateRoute: LayoutClientsCreateRoute,
  LayoutInvoicesIdRoute: LayoutInvoicesIdRoute,
  LayoutInvoicesCreateRoute: LayoutInvoicesCreateRoute,
  LayoutClientsIndexRoute: LayoutClientsIndexRoute,
  LayoutInvoicesIndexRoute: LayoutInvoicesIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/about': typeof AboutRoute
  '/overview': typeof LayoutOverviewRoute
  '/settings': typeof LayoutSettingsRoute
  '/clients/$id': typeof LayoutClientsIdRoute
  '/clients/create': typeof LayoutClientsCreateRoute
  '/invoices/$id': typeof LayoutInvoicesIdRoute
  '/invoices/create': typeof LayoutInvoicesCreateRoute
  '/clients': typeof LayoutClientsIndexRoute
  '/invoices': typeof LayoutInvoicesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRouteWithChildren
  '/about': typeof AboutRoute
  '/overview': typeof LayoutOverviewRoute
  '/settings': typeof LayoutSettingsRoute
  '/clients/$id': typeof LayoutClientsIdRoute
  '/clients/create': typeof LayoutClientsCreateRoute
  '/invoices/$id': typeof LayoutInvoicesIdRoute
  '/invoices/create': typeof LayoutInvoicesCreateRoute
  '/clients': typeof LayoutClientsIndexRoute
  '/invoices': typeof LayoutInvoicesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/about': typeof AboutRoute
  '/_layout/overview': typeof LayoutOverviewRoute
  '/_layout/settings': typeof LayoutSettingsRoute
  '/_layout/clients/$id': typeof LayoutClientsIdRoute
  '/_layout/clients/create': typeof LayoutClientsCreateRoute
  '/_layout/invoices/$id': typeof LayoutInvoicesIdRoute
  '/_layout/invoices/create': typeof LayoutInvoicesCreateRoute
  '/_layout/clients/': typeof LayoutClientsIndexRoute
  '/_layout/invoices/': typeof LayoutInvoicesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/overview'
    | '/settings'
    | '/clients/$id'
    | '/clients/create'
    | '/invoices/$id'
    | '/invoices/create'
    | '/clients'
    | '/invoices'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/overview'
    | '/settings'
    | '/clients/$id'
    | '/clients/create'
    | '/invoices/$id'
    | '/invoices/create'
    | '/clients'
    | '/invoices'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/about'
    | '/_layout/overview'
    | '/_layout/settings'
    | '/_layout/clients/$id'
    | '/_layout/clients/create'
    | '/_layout/invoices/$id'
    | '/_layout/invoices/create'
    | '/_layout/clients/'
    | '/_layout/invoices/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRoute: typeof LayoutRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRoute: LayoutRouteWithChildren,
  AboutRoute: AboutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/overview",
        "/_layout/settings",
        "/_layout/clients/$id",
        "/_layout/clients/create",
        "/_layout/invoices/$id",
        "/_layout/invoices/create",
        "/_layout/clients/",
        "/_layout/invoices/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_layout/overview": {
      "filePath": "_layout/overview.tsx",
      "parent": "/_layout"
    },
    "/_layout/settings": {
      "filePath": "_layout/settings.tsx",
      "parent": "/_layout"
    },
    "/_layout/clients/$id": {
      "filePath": "_layout/clients.$id.tsx",
      "parent": "/_layout"
    },
    "/_layout/clients/create": {
      "filePath": "_layout/clients.create.tsx",
      "parent": "/_layout"
    },
    "/_layout/invoices/$id": {
      "filePath": "_layout/invoices.$id.tsx",
      "parent": "/_layout"
    },
    "/_layout/invoices/create": {
      "filePath": "_layout/invoices.create.tsx",
      "parent": "/_layout"
    },
    "/_layout/clients/": {
      "filePath": "_layout/clients.index.tsx",
      "parent": "/_layout"
    },
    "/_layout/invoices/": {
      "filePath": "_layout/invoices.index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
