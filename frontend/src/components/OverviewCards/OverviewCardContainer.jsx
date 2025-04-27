import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import OverviewCard from './OverviewCard';

export default function OverviewCardContainer() {
  const debtData = useSelector((state) => state.debt.data);

  if (!debtData.length) {
    return null;
  }

  const totalDebt = debtData.reduce((sum, row) => sum + (row.value || 0), 0);
  const uniqueCountries = new Set(debtData.map((row) => row.country_name)).size;

  const countryDebtMap = {};
  for (const row of debtData) {
    if (row.country_name && row.value !== null) {
      countryDebtMap[row.country_name] =
        (countryDebtMap[row.country_name] || 0) + row.value;
    }
  }
  const topDebtorCountry =
    Object.entries(countryDebtMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Debt (USD)"
            value={totalDebt.toLocaleString()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard title="Number of Countries" value={uniqueCountries} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard title="Top Debtor Country" value={topDebtorCountry} />
        </Grid>
      </Grid>
    </Box>
  );
}
