import DashboardLayout from "../layouts/DashboardLayout";
import OverviewCard from "../components/OverviewCard";
import { Typography, Grid, Paper } from "@mui/material";

export default function DashboardPage() {

  const loading = false;
  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }



  return (
    <DashboardLayout>

      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 120, textAlign: "center" }}>
          <OverviewCard
            title="Total Debt"
            value={`Card 1`}
          />
            
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <OverviewCard
            title="Top Debtor"
            value={`Card 2`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <OverviewCard
            title="# of Countries"
            value={`Card 3`}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}