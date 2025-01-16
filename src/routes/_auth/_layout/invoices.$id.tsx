import EditInvoiceForm from "@/components/invoice/EditInvoiceForm";
import { invoiceByIdOptions } from "@/queries";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/invoices/$id")({
  beforeLoad: () => ({
    getTitle: () => "Invoice",
  }),
  loader: ({ context, params }) => {
    return context.queryClient?.ensureQueryData(invoiceByIdOptions(params.id));
  },
  component: Invoice,
});

function Invoice() {
  const router = useRouter();

  const onDeleteInvoice = () => {
    router.invalidate().finally(() => {
      return router.navigate({ to: "/invoices" });
    });
  };
  return (
    <Stack spacing={4} mt={4}>
      <Typography variant="h4" fontWeight="bold">
        Invoice
      </Typography>
      <Box
        sx={{
          width: (theme) => theme.breakpoints.values.lg,
          maxWidth: "100%",
          alignSelf: "center",
        }}
      >
        <Paper sx={{ p: 4 }}>
          <EditInvoiceForm onDeleteInvoice={onDeleteInvoice} />
        </Paper>
      </Box>
    </Stack>
  );
}
