import { createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Transactions from "./Transactions/Transactions";
import ErrorRoute from "./ErrorRoute/ErrorRoute";
import NewTransaction from "./Transactions/NewTransaction";
import EditTransaction from "./Transactions/EditTransaction";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorRoute />,
    path: "/",
    children: [
      {
        element: <Transactions />,
        path: "transactions",
      },
      {
        element: <EditTransaction />,
        path: "transactions/:id",
      },
      {
        element: <NewTransaction />,
        path: "transactions/new",
      },
    ],
  },
]);

export default router;
