import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import MyPage from "@/pages/mypage/MyPage";
import MembersPage from "@/pages/member/MembersPage";
import Layout from "@/routes/Layout";
import { ROUTES } from "@/shared/constants/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.login.path,
    element: <LoginPage />,
  },
  {
    path: ROUTES.signup.path,
    element: <SignupPage />,
  },
  {
    path: ROUTES.myPage.path,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: ROUTES.myPage.children.members.path,
        element: <MembersPage />,
      },
    ],
  },
]);
