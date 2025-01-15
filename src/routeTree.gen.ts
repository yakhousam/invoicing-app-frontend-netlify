/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthLayoutOverviewImport } from './routes/_auth/_layout/overview'
import { Route as AuthLayoutInvoicesIndexImport } from './routes/_auth/_layout/invoices/index'
import { Route as AuthLayoutClientsIndexImport } from './routes/_auth/_layout/clients/index'
import { Route as AuthLayoutInvoicesCreateImport } from './routes/_auth/_layout/invoices/create'
import { Route as AuthLayoutInvoicesIdImport } from './routes/_auth/_layout/invoices/$id'
import { Route as AuthLayoutClientsCreateImport } from './routes/_auth/_layout/clients/create'
import { Route as AuthLayoutClientsIdImport } from './routes/_auth/_layout/clients/$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthLayoutLazyImport = createFileRoute('/_auth/_layout')()
const AuthLayoutSettingsLazyImport = createFileRoute(
  '/_auth/_layout/settings',
)()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthLayoutLazyRoute = AuthLayoutLazyImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/_layout.lazy').then((d) => d.Route))

const AuthLayoutSettingsLazyRoute = AuthLayoutSettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/settings.lazy').then((d) => d.Route),
)

const AuthLayoutOverviewRoute = AuthLayoutOverviewImport.update({
  id: '/overview',
  path: '/overview',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/overview.lazy').then((d) => d.Route),
)

const AuthLayoutInvoicesIndexRoute = AuthLayoutInvoicesIndexImport.update({
  id: '/invoices/',
  path: '/invoices/',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/invoices/index.lazy').then((d) => d.Route),
)

const AuthLayoutClientsIndexRoute = AuthLayoutClientsIndexImport.update({
  id: '/clients/',
  path: '/clients/',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/clients/index.lazy').then((d) => d.Route),
)

const AuthLayoutInvoicesCreateRoute = AuthLayoutInvoicesCreateImport.update({
  id: '/invoices/create',
  path: '/invoices/create',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/invoices/create.lazy').then((d) => d.Route),
)

const AuthLayoutInvoicesIdRoute = AuthLayoutInvoicesIdImport.update({
  id: '/invoices/$id',
  path: '/invoices/$id',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/invoices/$id.lazy').then((d) => d.Route),
)

const AuthLayoutClientsCreateRoute = AuthLayoutClientsCreateImport.update({
  id: '/clients/create',
  path: '/clients/create',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/clients/create.lazy').then((d) => d.Route),
)

const AuthLayoutClientsIdRoute = AuthLayoutClientsIdImport.update({
  id: '/clients/$id',
  path: '/clients/$id',
  getParentRoute: () => AuthLayoutLazyRoute,
} as any).lazy(() =>
  import('./routes/_auth/_layout/clients/$id.lazy').then((d) => d.Route),
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
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout': {
      id: '/_auth/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_layout/overview': {
      id: '/_auth/_layout/overview'
      path: '/overview'
      fullPath: '/overview'
      preLoaderRoute: typeof AuthLayoutOverviewImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/settings': {
      id: '/_auth/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthLayoutSettingsLazyImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/clients/$id': {
      id: '/_auth/_layout/clients/$id'
      path: '/clients/$id'
      fullPath: '/clients/$id'
      preLoaderRoute: typeof AuthLayoutClientsIdImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/clients/create': {
      id: '/_auth/_layout/clients/create'
      path: '/clients/create'
      fullPath: '/clients/create'
      preLoaderRoute: typeof AuthLayoutClientsCreateImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/invoices/$id': {
      id: '/_auth/_layout/invoices/$id'
      path: '/invoices/$id'
      fullPath: '/invoices/$id'
      preLoaderRoute: typeof AuthLayoutInvoicesIdImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/invoices/create': {
      id: '/_auth/_layout/invoices/create'
      path: '/invoices/create'
      fullPath: '/invoices/create'
      preLoaderRoute: typeof AuthLayoutInvoicesCreateImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/clients/': {
      id: '/_auth/_layout/clients/'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof AuthLayoutClientsIndexImport
      parentRoute: typeof AuthLayoutLazyImport
    }
    '/_auth/_layout/invoices/': {
      id: '/_auth/_layout/invoices/'
      path: '/invoices'
      fullPath: '/invoices'
      preLoaderRoute: typeof AuthLayoutInvoicesIndexImport
      parentRoute: typeof AuthLayoutLazyImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutLazyRouteChildren {
  AuthLayoutOverviewRoute: typeof AuthLayoutOverviewRoute
  AuthLayoutSettingsLazyRoute: typeof AuthLayoutSettingsLazyRoute
  AuthLayoutClientsIdRoute: typeof AuthLayoutClientsIdRoute
  AuthLayoutClientsCreateRoute: typeof AuthLayoutClientsCreateRoute
  AuthLayoutInvoicesIdRoute: typeof AuthLayoutInvoicesIdRoute
  AuthLayoutInvoicesCreateRoute: typeof AuthLayoutInvoicesCreateRoute
  AuthLayoutClientsIndexRoute: typeof AuthLayoutClientsIndexRoute
  AuthLayoutInvoicesIndexRoute: typeof AuthLayoutInvoicesIndexRoute
}

const AuthLayoutLazyRouteChildren: AuthLayoutLazyRouteChildren = {
  AuthLayoutOverviewRoute: AuthLayoutOverviewRoute,
  AuthLayoutSettingsLazyRoute: AuthLayoutSettingsLazyRoute,
  AuthLayoutClientsIdRoute: AuthLayoutClientsIdRoute,
  AuthLayoutClientsCreateRoute: AuthLayoutClientsCreateRoute,
  AuthLayoutInvoicesIdRoute: AuthLayoutInvoicesIdRoute,
  AuthLayoutInvoicesCreateRoute: AuthLayoutInvoicesCreateRoute,
  AuthLayoutClientsIndexRoute: AuthLayoutClientsIndexRoute,
  AuthLayoutInvoicesIndexRoute: AuthLayoutInvoicesIndexRoute,
}

const AuthLayoutLazyRouteWithChildren = AuthLayoutLazyRoute._addFileChildren(
  AuthLayoutLazyRouteChildren,
)

interface AuthRouteChildren {
  AuthLayoutLazyRoute: typeof AuthLayoutLazyRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLayoutLazyRoute: AuthLayoutLazyRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof AuthLayoutLazyRouteWithChildren
  '/overview': typeof AuthLayoutOverviewRoute
  '/settings': typeof AuthLayoutSettingsLazyRoute
  '/clients/$id': typeof AuthLayoutClientsIdRoute
  '/clients/create': typeof AuthLayoutClientsCreateRoute
  '/invoices/$id': typeof AuthLayoutInvoicesIdRoute
  '/invoices/create': typeof AuthLayoutInvoicesCreateRoute
  '/clients': typeof AuthLayoutClientsIndexRoute
  '/invoices': typeof AuthLayoutInvoicesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof AuthLayoutLazyRouteWithChildren
  '/overview': typeof AuthLayoutOverviewRoute
  '/settings': typeof AuthLayoutSettingsLazyRoute
  '/clients/$id': typeof AuthLayoutClientsIdRoute
  '/clients/create': typeof AuthLayoutClientsCreateRoute
  '/invoices/$id': typeof AuthLayoutInvoicesIdRoute
  '/invoices/create': typeof AuthLayoutInvoicesCreateRoute
  '/clients': typeof AuthLayoutClientsIndexRoute
  '/invoices': typeof AuthLayoutInvoicesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_auth/_layout': typeof AuthLayoutLazyRouteWithChildren
  '/_auth/_layout/overview': typeof AuthLayoutOverviewRoute
  '/_auth/_layout/settings': typeof AuthLayoutSettingsLazyRoute
  '/_auth/_layout/clients/$id': typeof AuthLayoutClientsIdRoute
  '/_auth/_layout/clients/create': typeof AuthLayoutClientsCreateRoute
  '/_auth/_layout/invoices/$id': typeof AuthLayoutInvoicesIdRoute
  '/_auth/_layout/invoices/create': typeof AuthLayoutInvoicesCreateRoute
  '/_auth/_layout/clients/': typeof AuthLayoutClientsIndexRoute
  '/_auth/_layout/invoices/': typeof AuthLayoutInvoicesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
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
    | '/_auth'
    | '/_auth/_layout'
    | '/_auth/_layout/overview'
    | '/_auth/_layout/settings'
    | '/_auth/_layout/clients/$id'
    | '/_auth/_layout/clients/create'
    | '/_auth/_layout/invoices/$id'
    | '/_auth/_layout/invoices/create'
    | '/_auth/_layout/clients/'
    | '/_auth/_layout/invoices/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRouteWithChildren,
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
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_layout"
      ]
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.lazy.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_layout/overview",
        "/_auth/_layout/settings",
        "/_auth/_layout/clients/$id",
        "/_auth/_layout/clients/create",
        "/_auth/_layout/invoices/$id",
        "/_auth/_layout/invoices/create",
        "/_auth/_layout/clients/",
        "/_auth/_layout/invoices/"
      ]
    },
    "/_auth/_layout/overview": {
      "filePath": "_auth/_layout/overview.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/settings": {
      "filePath": "_auth/_layout/settings.lazy.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/clients/$id": {
      "filePath": "_auth/_layout/clients/$id.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/clients/create": {
      "filePath": "_auth/_layout/clients/create.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/invoices/$id": {
      "filePath": "_auth/_layout/invoices/$id.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/invoices/create": {
      "filePath": "_auth/_layout/invoices/create.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/clients/": {
      "filePath": "_auth/_layout/clients/index.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/invoices/": {
      "filePath": "_auth/_layout/invoices/index.tsx",
      "parent": "/_auth/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
