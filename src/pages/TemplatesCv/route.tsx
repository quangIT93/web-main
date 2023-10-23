import MainLayout from 'layouts/MainLayout';
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
