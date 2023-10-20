import MainLayout from 'layouts/main';
import HotJobPage from '.';
import RouteProps from '../routes';
const route: RouteProps = {
  path: '/hotjobs',
  component: (
    <MainLayout>
      <HotJobPage />
    </MainLayout>
  ),
};

export default route;
