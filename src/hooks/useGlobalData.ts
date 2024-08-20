import { useQuery } from '@tanstack/react-query';
import { fetchGlobalData } from '../utils/api';

/**
 * Custom hook to fetch global COVID-19 data.
 */
export const useGlobalData = () => {
  return useQuery({
    queryKey: ['globalData'],
    queryFn: fetchGlobalData,
  });
};
