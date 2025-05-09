import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountrySummary } from '../redux/countrySummarySlice';
import { fetchCountrySeries } from '../redux/countrySeriesSlice';
import { fetchSeriesSummary } from '../redux/seriesSummarySlice';
import { fetchDebtData } from '../redux/debtSlice';
import OverviewCardContainer from '../components/OverviewCards/OverviewCardContainer';
import TopNDebtorsChart from '../components/Charts/TopNDebtorsChart';

import DashboardLayout from '../layouts/DashboardLayout';
import GenericTable from '../components/GenericTable';
import InternationalDebtTable from '../components/InternationalDebtTable';
import TableSelector from '../components/TableSelector';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const debtStatus = useSelector((state) => state.debt.status);
  const { data: countrySummaryData, status: countrySummaryStatus } =
    useSelector((state) => state.countrySummary);
  const { data: countrySeriesData, status: countrySeriesStatus } = useSelector(
    (state) => state.countrySeries
  );
  const { data: seriesSummaryData, status: seriesSummaryStatus } = useSelector(
    (state) => state.seriesSummary
  );

  const [selectedView, setSelectedView] = useState('overview');
  const [selectedTable, setSelectedTable] = useState('international_debt');

  useEffect(() => {
    console.log(
      debtStatus,
      countrySummaryStatus,
      countrySeriesStatus,
      seriesSummaryStatus
    );
    if (debtStatus === 'idle') {
      dispatch(fetchDebtData());
    }
    if (countrySummaryStatus === 'idle') {
      dispatch(fetchCountrySummary());
    }
    if (countrySeriesStatus === 'idle') {
      dispatch(fetchCountrySeries());
    }
    if (seriesSummaryStatus === 'idle') {
      dispatch(fetchSeriesSummary());
    }
  }, [
    dispatch,
    debtStatus,
    countrySummaryStatus,
    countrySeriesStatus,
    seriesSummaryStatus,
  ]);

  return (
    <DashboardLayout onMenuClick={setSelectedView}>
      {selectedView === 'overview' && debtStatus === 'loading' ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {selectedView === 'overview' && (
            <>
              <Typography variant="h4" gutterBottom>
                Overview
              </Typography>

              <OverviewCardContainer />
              <TopNDebtorsChart />
            </>
          )}

          {selectedView === 'table_view' && (
            <>
              <Typography variant="h4" gutterBottom>
                Tables
              </Typography>
              <TableSelector
                selectedTable={selectedTable}
                onTableChange={setSelectedTable}
              />
              {selectedTable === 'international_debt' ? (
                <InternationalDebtTable />
              ) : selectedTable === 'country_summary' ? (
                <GenericTable rows={countrySummaryData} />
              ) : selectedTable === 'country_series' ? (
                <GenericTable rows={countrySeriesData} />
              ) : selectedTable === 'series_summary' ? (
                <GenericTable rows={seriesSummaryData} />
              ) : null}
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
