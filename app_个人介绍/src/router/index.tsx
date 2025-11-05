import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

import P_home from '../pages/p-home';
import P_admin_login from '../pages/p-admin_login';
import P_admin_dashboard from '../pages/p-admin_dashboard';
import P_admin_profile from '../pages/p-admin_profile';
import P_admin_portfolio from '../pages/p-admin_portfolio';
import P_admin_contact from '../pages/p-admin_contact';
import P_admin_bot_settings from '../pages/p-admin_bot_settings';
import P_admin_stats from '../pages/p-admin_stats';
import P_admin_page_settings from '../pages/p-admin_page_settings';
import P_portfolio_detail from '../pages/p-portfolio_detail';
import NotFoundPage from './NotFoundPage';
import ErrorPage from './ErrorPage';

function Listener() {
  const location = useLocation();
  useEffect(() => {
    const pageId = 'P-' + location.pathname.replace('/', '').toUpperCase();
    console.log('当前pageId:', pageId, ', pathname:', location.pathname, ', search:', location.search);
    if (typeof window === 'object' && window.parent && window.parent.postMessage) {
      window.parent.postMessage({
        type: 'chux-path-change',
        pageId: pageId,
        pathname: location.pathname,
        search: location.search,
      }, '*');
    }
  }, [location]);

  return <Outlet />;
}

// 使用 createBrowserRouter 创建路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: <Listener />,
    children: [
      {
    path: '/',
    element: <Navigate to='/home' replace={true} />,
  },
      {
    path: '/home',
    element: (
      <ErrorBoundary>
        <P_home />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-login',
    element: (
      <ErrorBoundary>
        <P_admin_login />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-dashboard',
    element: (
      <ErrorBoundary>
        <P_admin_dashboard />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-profile',
    element: (
      <ErrorBoundary>
        <P_admin_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-portfolio',
    element: (
      <ErrorBoundary>
        <P_admin_portfolio />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-contact',
    element: (
      <ErrorBoundary>
        <P_admin_contact />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-bot-settings',
    element: (
      <ErrorBoundary>
        <P_admin_bot_settings />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-stats',
    element: (
      <ErrorBoundary>
        <P_admin_stats />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/admin-page-settings',
    element: (
      <ErrorBoundary>
        <P_admin_page_settings />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/portfolio-detail',
    element: (
      <ErrorBoundary>
        <P_portfolio_detail />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '*',
    element: <NotFoundPage />,
  },
    ]
  }
]);

export default router;