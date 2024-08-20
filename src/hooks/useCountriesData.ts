import { useQuery } from '@tanstack/react-query';
import { fetchCountriesData } from '../utils/api';

/**
 * Custom hook to fetch COVID-19 data for all countries.
 */
export const useCountriesData = () => {
  return useQuery({
    queryKey: ['countriesData'],
    queryFn: fetchCountriesData,
  });
};
