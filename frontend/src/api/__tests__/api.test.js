import { describe, it, expect, vi } from 'vitest';
import {
  fetchInternationalDebtData,
  fetchCountrySummaryData,
  fetchCountrySeriesData,
  fetchSeriesSummaryData,
} from '../api';

global.fetch = vi.fn();

describe('API functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchInternationalDebtData', () => {
    it('should fetch data with correct query parameters', async () => {
      const mockResponse = { data: 'mockData' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters = { year: 2021, country: 'USA', indicator: 'GDP' };
      const result = await fetchInternationalDebtData(filters);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/v1/international_debt?year=2021&country=USA&indicator=GDP'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the response is not ok', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchInternationalDebtData()).rejects.toThrow(
        'Failed to fetch International Debt data'
      );
    });
  });

  describe('fetchCountrySummaryData', () => {
    it('should fetch country summary data', async () => {
      const mockResponse = { data: 'mockData' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCountrySummaryData();

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/v1/country_summary'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the response is not ok', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchCountrySummaryData()).rejects.toThrow(
        'Failed to fetch Country Summary'
      );
    });
  });

  describe('fetchCountrySeriesData', () => {
    it('should fetch country series data', async () => {
      const mockResponse = { data: 'mockData' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCountrySeriesData();

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/v1/country_series'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the response is not ok', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchCountrySeriesData()).rejects.toThrow(
        'Failed to fetch Country Series'
      );
    });
  });

  describe('fetchSeriesSummaryData', () => {
    it('should fetch series summary data', async () => {
      const mockResponse = { data: 'mockData' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchSeriesSummaryData();

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/v1/series_summary'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the response is not ok', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchSeriesSummaryData()).rejects.toThrow(
        'Failed to fetch Series Summary'
      );
    });
  });
});
