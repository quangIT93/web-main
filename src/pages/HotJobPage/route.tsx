import MainLayout from 'layouts/MainLayout';
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
