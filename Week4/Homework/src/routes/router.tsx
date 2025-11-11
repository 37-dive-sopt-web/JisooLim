import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import MyPage from "@/pages/mypage/MyPage";
import MembersPage from "@/pages/MembersPage";
import Layout from "@/routes/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/mypage",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: "members",
        element: <MembersPage />,
      },
    ],
  },
]);
