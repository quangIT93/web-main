import MainLayout from 'layouts/main';
import MoreJobsPage from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/more-jobs',
  component: (
    <MainLayout>
      <MoreJobsPage />
    </MainLayout>
  ),
};

export default route;
