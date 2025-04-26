import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import OverviewCard from "../components/OverviewCard";
import DebtTable from "../components/DebtTable";
import FilterBar from "../components/FilterBar";
import { fetchDebtData } from "../redux/debtSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.debt);

  const [selectedView, setSelectedView] = useState("overview");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDebtData());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <DashboardLayout onMenuClick={setSelectedView}>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (status === "failed") {
    return (
      <DashboardLayout onMenuClick={setSelectedView}>
        <Typography color="error">Error: {error}</Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onMenuClick={setSelectedView}>

      {selectedView === "overview" && (
        <>
          <Typography variant="h4" gutterBottom>
            Overview
          </Typography>
          {/*<FilterBar/>*/}
          <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <OverviewCard title="Total Debt" value={`$Placeholder amount`} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewCard title="Top Debtor" value={`$ Placeholder country)`} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewCard title="# of Countries" value={'uniqueCountries'} />
            </Grid>
          </Grid>
          </Box>
        </>
      )}

      {selectedView === "debt_table" && (
        <>
          <Typography variant="h4" gutterBottom>
            Debt Table
          </Typography>
          <DebtTable rows={data} />
        </>
      )}
    </DashboardLayout>
  );
}