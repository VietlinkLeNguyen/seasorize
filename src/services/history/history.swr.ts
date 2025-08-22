import useSWR from 'swr';
import { HistoryParam } from './history.interface';
import { HistoryService } from './history.service';

export function useHistory(params?: HistoryParam) {
  const { data, error, isLoading, mutate } = useSWR(['history', params], () =>
    HistoryService.getListHistory(params)
  );

  return {
    histories: data || [],
    isLoading,
    error,
    mutate
  };
}
