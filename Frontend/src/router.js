import { createBrowserRouter } from "react-router-dom";

import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UserInfoPage } from "./pages/UserInfoPage";

import ProtectedLayout from "./layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LogInPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      {
        index: true,
        Component: UserInfoPage,
      },
    ],
  },
]);
