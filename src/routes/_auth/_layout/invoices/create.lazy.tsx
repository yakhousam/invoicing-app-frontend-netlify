import CreateInvoiceForm from '@/components/invoice/CreateInvoiceForm'
import { Box, Paper, Typography } from '@mui/material'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/invoices/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.sm,
        margin: 'auto',
      }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Create a new invoice
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Fill out the form below to create a new invoice.
        </Typography>
        <Box sx={{ mt: 4 }} />
        <CreateInvoiceForm />
      </Paper>
    </Box>
  )
}
