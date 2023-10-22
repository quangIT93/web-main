import MainLayout from 'layouts/main';
import TemplatesCv from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: '/templates-cv',
  component: (
    <MainLayout>
      <TemplatesCv />
    </MainLayout>
  ),
};

export default route;
