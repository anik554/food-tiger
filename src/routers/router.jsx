import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import PrivateRouter from "./PrivateRouter";
import AvailableFood from "../pages/AvailableFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: "Page Not Found",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/available-foods",
        element: <AvailableFood />,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRouter>
            <AddFood />
          </PrivateRouter>
        ),
      },
      {
        path: "/manage-my-foods",
        element: "Manage My Foods",
      },
      {
        path: "/my-food-request",
        element: "My Food Request",
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
