import DashboardIcon from '@/assets/icons/dashboard.svg';
import DashboardActiveIcon from '@/assets/icons/dashboard_active.svg';
import HistoryIcon from '@/assets/icons/history.svg';
import HistoryActiveIcon from '@/assets/icons/history_active.svg';
import UrlIcon from '@/assets/icons/url.svg';
import UrlActiveIcon from '@/assets/icons/url_active.svg';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router';

const sidebarItem = [
  {
    title: 'ダッシュボード',
    path: '/',
    icon: <DashboardIcon />,
    iconActive: <DashboardActiveIcon />
  },
  {
    title: 'URL管理',
    path: '/url-management',
    icon: <UrlIcon />,
    iconActive: <UrlActiveIcon />
  },
  {
    title: '履歴',
    path: '/history',
    icon: <HistoryIcon />,
    iconActive: <HistoryActiveIcon />
  }
];

export function AppSidebar({ children }: { children?: React.ReactNode }) {
  const href = useLocation().pathname;
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '264px'
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="icon" variant="inset" className="p-0">
        <SidebarHeader className="px-6 py-2">
          <img src="/logo.svg" alt="Logo" width={118} />
        </SidebarHeader>
        <SidebarContent className="px-4 py-6 gap-0">
          {sidebarItem.map((item, index) => {
            const isActive = checkIsActive(href, item.path);
            return (
              <Link to={item.path} className="w-full" key={index}>
                <SidebarMenuButton
                  isActive={isActive}
                  className="cursor-pointer h-13 p-3 font-normal"
                  style={
                    isActive
                      ? {
                          backgroundColor: '#F0ECFF',
                          color: '#0077B2',
                          fontWeight: 700
                        }
                      : {}
                  }
                >
                  <span className="w-7 h-7 rounded-lg">
                    {isActive ? item.iconActive : item.icon}
                  </span>
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            );
          })}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

function checkIsActive(href: string, item: string) {
  return href === item;
}
