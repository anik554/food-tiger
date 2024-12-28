import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/available-foods",
        element: "available-foods",
      },
      {
        path: "/add-food",
        element: "Add Food",
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
        element: "Registration Page",
      },
    ],
  },
]);

export default router;
