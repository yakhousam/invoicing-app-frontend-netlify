import ClientsTable from "@/components/client/ClientsTable";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Typography } from "@mui/material";
import {
  Link as RouterLink,
  createLazyFileRoute,
} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.lg,
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold">
            Clients
          </Typography>

          <RouterLink to="/clients/create">
            <Button variant="contained" startIcon={<AddIcon />}>
              New Client
            </Button>
          </RouterLink>
        </Box>
        <ClientsTable />
      </Paper>
    </Box>
  );
}
