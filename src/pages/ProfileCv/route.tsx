import MainLayout from 'layouts/MainLayout';
import ProfliCv from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/profile-cv',
  component: (
    <MainLayout>
      <ProfliCv />
    </MainLayout>
  ),
};

export default route;
