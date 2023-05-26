import { routes } from "configs";

// Layouts
import { MainLayout, AuthLayout } from "layouts";

// Pages
import {
  HomePage,
  PostsListPage,
  PostDetailPage,
  CreatePostPage,
  AuthPage,
  AccountListPage,
  AccountDetailPage,
  BannerPage,
  ThemePage,
  ChatPage,
  NotPermissionPage,
  WorkerManagerPage,
  WorkerDetailPage,
} from "pages";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: routes.home,
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: routes.postsList,
    component: PostsListPage,
    layout: MainLayout,
  },
  {
    path: routes.postDetail,
    component: PostDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.createPost,
    component: CreatePostPage,
    layout: MainLayout,
  },
  {
    path: routes.accountList,
    component: AccountListPage,
    layout: MainLayout,
  },
  {
    path: routes.accountDetail,
    component: AccountDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.banner,
    component: BannerPage,
    layout: MainLayout,
  },
  {
    path: routes.themeCategory,
    component: ThemePage,
    layout: MainLayout,
  },
  {
    path: routes.chat,
    component: ChatPage,
    layout: MainLayout,
  },
  {
    path: routes.notPermission,
    component: NotPermissionPage,
    layout: MainLayout,
  },
  {
    path: routes.workerManager,
    component: WorkerManagerPage,
    layout: MainLayout,
  },
  {
    path: routes.workerDetail,
    component: WorkerDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.auth,
    component: AuthPage,
    layout: AuthLayout,
  },
];

export { publicRoutes };
