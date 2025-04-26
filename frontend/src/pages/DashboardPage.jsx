import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDebtData } from "../redux/debtSlice";

import DashboardLayout from "../layouts/DashboardLayout";
import FilterBar from "../components/FilterBar";
import OverviewCard from "../components/OverviewCard";
import DebtTable from "../components/DebtTable";
import TableSelector from "../components/TableSelector";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const debtState = useSelector((state) => state.debt);
  const { data: debtData, status: debtStatus, error: debtError } = debtState;

  const [selectedView, setSelectedView] = useState("overview");
  const [selectedTable, setSelectedTable] = useState("international_debt");
  const [otherTableData, setOtherTableData] = useState([]);
  const [loadingOtherTable, setLoadingOtherTable] = useState(false);

  const fetchOtherTableData = async (table) => {
    setLoadingOtherTable(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/${table}`);
      const json = await res.json();
      setOtherTableData(json);
    } catch (error) {
      console.error("Failed to load other table data:", error);
    }
    setLoadingOtherTable(false);
  };

  useEffect(() => {
    if (selectedView === "table_view" && selectedTable !== "international_debt") {
      fetchOtherTableData(selectedTable);
    }
  }, [selectedTable, selectedView]);

  useEffect(() => {
    if (debtStatus === "idle") {
      dispatch(fetchDebtData());
    }
  }, [dispatch, debtStatus]);

  const isDebtTableSelected = selectedTable === "international_debt";

  return (
    <DashboardLayout onMenuClick={setSelectedView}>
      {((selectedView === "table_view" && loadingOtherTable) || (selectedView === "overview" && debtStatus === "loading")) ? (
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
              {isDebtTableSelected ? (
                <DebtTable rows={debtData} />
              ) : (
                <DebtTable rows={otherTableData} />
              )}
            </>
          )}
        </>
      )}
      {/* test for checking the view and table remove later 
      <Box sx={{ mt: 2 }}>
        
          <Typography variant="subtitle2">
            Current View: {selectedView}
          </Typography>
          <Typography variant="subtitle2">
            Current Table: {selectedTable}
          </Typography> 
      </Box>*/}
    </DashboardLayout>
  );
}