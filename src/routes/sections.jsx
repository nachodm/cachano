import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoute from './protectedRoute';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AddTrainingPage = lazy(() => import('src/pages/add-training'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const CalendarPage = lazy(() => import('src/pages/calendar'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
        {
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'calendar',
          element: <CalendarPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'add-training',
          element: <AddTrainingPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
