import { useQuery } from '@tanstack/react-query';
import { fetchHistoricalData } from '../utils/api';

/**
 * Custom hook to fetch historical COVID-19 data for charting purposes.
 */
export const useHistoricalData = () => {
  return useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });
};
