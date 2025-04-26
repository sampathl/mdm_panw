// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterBar from "../components/FilterBar";
import OverviewCard from "../components/OverviewCard";
import DebtTable from "../components/DebtTable";
import TableSelector from "../components/TableSelector";

export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedTable, setSelectedTable] = useState("international_debt"); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async (table) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/${table}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedView === "table_view") {
      fetchTableData(selectedTable);
    }
  }, [selectedView, selectedTable]);

  return (
    <DashboardLayout onMenuClick={setSelectedView}>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {selectedView === "overview" && (
            <>
              <Typography variant="h4" gutterBottom>Overview</Typography>
              <FilterBar />
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

        {selectedView === "table_view" && (
          <>
            <Typography variant="h4" gutterBottom>Tables</Typography>
            <TableSelector
              selectedTable={selectedTable}
              onTableChange={setSelectedTable}
            />
            <DebtTable rows={data} />
          </>
        )}
        </>
      )}
      <Box sx={{ mt: 2 }}>
  {/* test for checking the view and table remove later 
  <Typography variant="subtitle2">
    Current View: {selectedView}
  </Typography>
  <Typography variant="subtitle2">
    Current Table: {selectedTable}
  </Typography> */}
</Box>
    </DashboardLayout>
  );
}