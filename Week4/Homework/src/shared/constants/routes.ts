export const ROUTES = {
  login: {
    path: "/",
  },
  signup: {
    path: "/signup",
  },
  myPage: {
    path: "/mypage",
    children: {
      members: {
        path: "members",
        fullPath: "/mypage/members",
      },
    },
  },
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]["path"];
