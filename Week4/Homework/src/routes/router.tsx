import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import MyPage from "@/pages/MyPage";
import MembersPage from "@/pages/MembersPage";

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
    element: <MyPage />,
  },
  {
    path: "/mypage/members",
    element: <MembersPage />,
  },
]);
