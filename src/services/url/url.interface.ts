export const VIEW_TYPES = [
  'desktop_1920_1080',
  'desktop_1366_768',
  'tablet_768_1024',
  'mobile_375_667'
];

export type ViewType = (typeof VIEW_TYPES)[number];

const INTERVALS = ['1 hour', '6 hours', '12 hours', '1 day', '3 days'];
export interface IURLManagement {
  site_name: string;
  site_url: string;
  view_type: ViewType;
  interval: (typeof INTERVALS)[number];
}
