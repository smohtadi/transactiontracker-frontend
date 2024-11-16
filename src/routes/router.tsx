import { createBrowserRouter } from "react-router-dom";
import {
  ErrorRoute,
  Login,
  PrivateRoute,
  PublicRoute,
  Report,
  Root,
  Transactions,
  NewTransaction,
  EditTransaction,
} from "./index";

export const siteRoutes = {
  home: { path: "/" },
  login: { path: "/login" },
  transactions: { path: "/" },
  createTransaction: { path: "/transactions/new" },
  editTransaction: { path: "/transactions/:id" },
  report: { path: "/reports" },
};

const router = createBrowserRouter([
  {
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorRoute />,
    path: siteRoutes.login.path,
  },
  {
    element: <Root />,
    errorElement: <ErrorRoute />,
    // element: <Navigate to={siteRoutes.transactions.path} />,
    path: siteRoutes.home.path,
    children: [
      {
        element: (
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        ),
        path: siteRoutes.report.path,
      },
      {
        index: true,
        element: (
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        ),
        path: siteRoutes.transactions.path,
      },
      {
        element: (
          <PrivateRoute>
            <EditTransaction />
          </PrivateRoute>
        ),
        path: siteRoutes.editTransaction.path,
      },
      {
        element: (
          <PrivateRoute>
            <NewTransaction />
          </PrivateRoute>
        ),
        path: siteRoutes.createTransaction.path,
      },
    ],
  },
]);

export default router;
