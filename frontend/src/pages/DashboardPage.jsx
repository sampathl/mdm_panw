import DashboardLayout from "../layouts/DashboardLayouts";
import { Typography, Grid, Paper } from "@mui/material";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 120, textAlign: "center" }}>
            Card 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 120, textAlign: "center" }}>
            Card 2
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 120, textAlign: "center" }}>
            Card 3
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}