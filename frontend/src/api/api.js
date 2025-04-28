const API_BASE_URL =
  'https://intl-debt-backend-765483523765.us-central1.run.app/api/v1';

export async function fetchInternationalDebtData(filters = {}) {
  const params = new URLSearchParams();

  if (filters.year) params.append('year', filters.year);
  if (filters.country) params.append('country', filters.country);
  if (filters.indicator) params.append('indicator', filters.indicator);

  const url = `${API_BASE_URL}/international_debt?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch International Debt data');
  }
  return await response.json();
}

export async function fetchCountrySummaryData() {
  const response = await fetch(`${API_BASE_URL}/country_summary`);
  if (!response.ok) {
    throw new Error('Failed to fetch Country Summary');
  }
  return await response.json();
}

export async function fetchCountrySeriesData() {
  const response = await fetch(`${API_BASE_URL}/country_series`);
  if (!response.ok) {
    throw new Error('Failed to fetch Country Series');
  }
  return await response.json();
}

export async function fetchSeriesSummaryData() {
  const response = await fetch(`${API_BASE_URL}/series_summary`);
  if (!response.ok) {
    throw new Error('Failed to fetch Series Summary');
  }
  return await response.json();
}
