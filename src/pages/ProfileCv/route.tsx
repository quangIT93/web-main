import MainLayout from 'layouts/main';
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
