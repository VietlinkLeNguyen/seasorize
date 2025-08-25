import { IURLManagement } from '@/services/url/url.interface';

export const listUrls: IURLManagement[] = [
  {
    site_name: 'メインサイト',
    site_url: 'https://example.com',
    view_type: 'desktop_1920_1080',
    status: 'active',
    last_check: new Date(),
    interval: '1 hour'
  },
  {
    site_name: 'サンプルサイト',
    site_url: 'https://sample.com',
    view_type: 'desktop_1366_768',
    status: 'inactive',
    last_check: new Date(),
    interval: '6 hours'
  },
  {
    site_name: 'デモサイト',
    site_url: 'https://demo.com',
    view_type: 'tablet_768_1024',
    status: 'active',
    last_check: new Date(),
    interval: '12 hours'
  },
  {
    site_name: 'モバイルサイト',
    site_url: 'https://mobile.com',
    view_type: 'mobile_375_667',
    status: 'inactive',
    last_check: new Date(),
    interval: '1 day'
  }
];
