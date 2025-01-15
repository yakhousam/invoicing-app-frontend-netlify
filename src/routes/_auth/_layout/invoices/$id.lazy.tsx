import EditInvoiceForm from "@/components/invoice/EditInvoiceForm";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/invoices/$id")({
  component: RouteComponent,
});

function RouteComponent() {
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
