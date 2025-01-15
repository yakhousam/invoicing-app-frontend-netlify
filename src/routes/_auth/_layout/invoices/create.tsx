import { clientsOptions } from '@/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout/invoices/create')({
  beforeLoad: () => ({
    getTitle: () => 'Create Invoice',
  }),
  loader: ({ context }) => context.queryClient?.ensureQueryData(clientsOptions),
})
