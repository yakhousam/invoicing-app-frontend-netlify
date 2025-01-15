import ClientEdit from "@/components/client/ClientEdit";
import { Box, Paper, Stack } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/clients/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack spacing={4} mt={4}>
      <Box
        sx={{
          width: (theme) => theme.breakpoints.values.lg,
          maxWidth: "100%",
          alignSelf: "center",
        }}
      >
        <Paper sx={{ p: 4 }}>
          <ClientEdit />
        </Paper>
      </Box>
    </Stack>
  );
}
