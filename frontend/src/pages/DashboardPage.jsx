import DashboardLayout from "../layouts/DashboardLayout";
import OverviewCard from "../components/OverviewCard";
import DebtTable from "../components/DebtTable";
import FilterBar from "../components/FilterBar";
import { Typography, Grid, Paper, Box, CircularProgress, } from "@mui/material";
import { useState, useEffect } from "react";

export default function DashboardPage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

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


  const totalDebt = data.reduce((sum, row) => sum + row.usd_millions, 0);
  const topDebtor = data.reduce(
    (top, row) => (row.usd_millions > top.usd_millions ? row : top),
    data[0]
  );
  const uniqueCountries = new Set(data.map((row) => row.country_name)).size;

  const yearOptions = data.length > 0 ? [...new Set(data.map((r) => r.year))].sort((a, b) => b - a) : [];
  const countryOptions = data.length > 0 ? [...new Set(data.map((r) => r.country_name))].sort() : [];

  const filteredData = data.filter((row) => {
    const yearMatch = selectedYear === "All" || row.year === parseInt(selectedYear, 10);
    const countryMatch =
      selectedCountry === "All" ||
      row.country_name.trim().toLowerCase() === selectedCountry.trim().toLowerCase();
    return yearMatch && countryMatch;
  });


  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }


  console.log(filteredData)
  console.log("Selected Year:", selectedYear);
  console.log("Selected Country:", selectedCountry);

  return (
    <DashboardLayout>

      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <FilterBar
        yearOptions={yearOptions}
        countryOptions={countryOptions}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 120, textAlign: "center" }}>
          <OverviewCard
            title="Total Debt"
            value={`$${totalDebt.toLocaleString()} M`}
          />
            
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
        <OverviewCard
            title="Top Debtor"
            value={`${topDebtor?.country_name || '-'} 
              ($${topDebtor?.usd_millions?.toLocaleString() || '0'} M)`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <OverviewCard
            title="# of Countries"
            value={uniqueCountries}
          />
        </Grid>
      </Grid>
      <DebtTable rows={filteredData} />
    </DashboardLayout>
  );
}