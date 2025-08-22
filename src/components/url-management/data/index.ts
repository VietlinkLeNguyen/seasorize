import { IURLManagement } from '../interface';

export const listUrls: IURLManagement[] = [
  {
    site_name: 'Example Site',
    site_url: 'https://example.com',
    view_type: 'desktop_1920_1080',
    interval: '1 hour'
  },
  {
    site_name: 'Sample Site',
    site_url: 'https://sample.com',
    view_type: 'desktop_1366_768',
    interval: '6 hours'
  },
  {
    site_name: 'Demo Site',
    site_url: 'https://demo.com',
    view_type: 'tablet_768_1024',
    interval: '12 hours'
  },
  {
    site_name: 'Mobile Site',
    site_url: 'https://mobile.com',
    view_type: 'mobile_375_667',
    interval: '1 day'
  }
];
