import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import ManageMiners from '../miners/ManageMiners';
import Analytics from '../analytics/Analytics';
import Dashboard from '../dashboard/Dashboard';
import Login from './Login';
import Navbar from '../Navbar';
const RoutesCombined = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const authenticatedRoutes = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/miners',
          element: <ManageMiners />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/analytics',
          element: <Analytics />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const publicRoutes = [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const roters = !token ? publicRoutes : authenticatedRoutes[0].children;
  // Provide the router configuration using RouterProvider
  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}

        {roters.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            // children={route.children}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesCombined;
