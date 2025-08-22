import axiosInstance from '@/lib/axios';
import { IURLManagement } from './url.interface';

export default class UrlService {
  static async getListUrls(): Promise<IURLManagement[]> {
    return await axiosInstance.get('/urls');
  }

  static async createUrl(urlData: IURLManagement): Promise<IURLManagement> {
    return await axiosInstance.post('/urls', urlData);
  }
}
