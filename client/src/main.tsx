import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import HomePage from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from "@react-oauth/google"
import BaseLayout from './layout/BaseLayout';
import App from './pages/app';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    element: (
        <BaseLayout>
          <Outlet />
        </BaseLayout>
    ),
    children: [
      {
        path: "/app",
        element: <App />,
      },
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </GoogleOAuthProvider>
)
