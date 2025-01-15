import { Chart } from "@/components/dashboard/Chart";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { Summary } from "@/components/dashboard/Summary";
import { Box, Grid2 as Grid, Paper, Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/overview")({
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
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>
      <Grid container>
        <Grid size={{ xs: 12, md: 8 }} px={2} minHeight={500}>
          <Chart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 4 }}>
            <Summary />
          </Paper>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Paper sx={{ p: 4 }}>
          <DashboardTable />
        </Paper>
      </Box>
    </Box>
  );
}
