// AppRouter.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import SignIn from "./components/pages/SignIn";
import BusinessPage from "./components/pages/BusinessPage";
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
    path: "/business", //path for food listing
    element: <BusinessPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
