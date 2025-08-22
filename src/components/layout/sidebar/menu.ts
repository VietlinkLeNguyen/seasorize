import {
  History,
  LayoutDashboard,
  LinkIcon,
  MessagesSquare,
  Users
} from 'lucide-react';
export const sidebarData = {
  navGroups: [
    {
      title: 'General',
      children: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard
        },
        {
          title: 'URL Management',
          url: '/url-management',
          icon: LinkIcon
        },
        {
          title: 'History',
          url: '/history',
          icon: History
        },
        {
          title: 'Chats',
          url: '/chats',
          icon: MessagesSquare
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users
        }
      ]
    }
  ]
};
