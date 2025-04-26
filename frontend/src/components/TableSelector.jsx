import { Tabs, Tab, Box } from "@mui/material";


export default function TableSelector({ selectedTable, onTableChange }) {
  const handleChange = (event, newValue) => {
    onTableChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={selectedTable}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="International Debt" value="international_debt" />
        <Tab label="Country Summary" value="country_summary" />
        <Tab label="Country Series" value="country_series" />
        <Tab label="Series Summary" value="series_summary" />
      </Tabs>
    </Box>
  );
}