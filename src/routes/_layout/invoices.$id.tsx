import { invoiceByIdOptions } from "@/queries";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

export const Route = createFileRoute("/_layout/invoices/$id")({
  beforeLoad: () => ({
    getTitle: () => "Invoice",
  }),
  loader: ({ context, params }) => {
    return context.queryClient?.ensureQueryData(invoiceByIdOptions(params.id));
  },
  component: Invoice,
});

const EditInvoiceForm = lazy(
  () => import("@/components/invoice/EditInvoiceForm")
);

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
        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 4 }}>
            <EditInvoiceForm onDeleteInvoice={onDeleteInvoice} />
          </Paper>
        </Suspense>
      </Box>
    </Stack>
  );
}
