import DashboardLayout from "../layouts/DashboardLayout";
import OverviewCard from "../components/OverviewCard";
import { Typography, Grid, Paper, Box, CircularProgress, } from "@mui/material";
import { useState, useEffect } from "react";

export default function DashboardPage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/debt")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load data", e);
        setLoading(false);
      });
  }, []);

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