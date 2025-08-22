import axiosInstance from '@/lib/axios';
import { History, HistoryParam } from './history.interface';

export class HistoryService {
  static async getListHistory(params?: HistoryParam): Promise<History[]> {
    return axiosInstance.get('/posts', { params });
  }
}
