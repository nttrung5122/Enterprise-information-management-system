// AppRouter.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import SignIn from "./components/pages/SignIn";
import FoodListingPage from "./components/pages/FoodListingPage";
import ReactDOM from "react-dom/client";

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
    path: "/foodlisting", //path for food listing
    element: <FoodListingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
