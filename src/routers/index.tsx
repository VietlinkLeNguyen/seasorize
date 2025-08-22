import Dashboard from '@/components/dashboard';
import { ErrorBoundary } from '@/components/error/page';
import History from '@/components/history';
import { DefaultLayout } from '@/components/layout';
import URLManagement from '@/components/url-management';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/url-management',
        element: <URLManagement />
      },
      {
        path: '/history',
        element: <History />
      }
    ]
  }
]);
export default router;
