import { invoicesOptions } from '@/queries'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout/invoices/')({
  loaderDeps: ({ search }) => search,
  beforeLoad: () => ({
    getTitle: () => 'Invoices',
  }),
  loader: ({ context }) =>
    context.queryClient?.ensureQueryData(invoicesOptions),
})
