// AppRouter.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/pages/Dashboard";
import SignIn from "./components/pages/SignIn";
import BusinessPage from "./components/pages/BusinessPage";
import OrderPage from "./components/pages/OrderPage";
import WarehousePage from "./components/pages/WarehousePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />, // Render Dashboard at root
  },
  {
    path: "/dashboard", // Path for SignIn
    element: <Dashboard />,
  },
  {
    path: "/business", //path for food listing
    element: <BusinessPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/warehouse",
    element: <WarehousePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
