import MainLayout from 'layouts/main';
import PDFViewer from '.';
import RouteProps from '../routes';

const route: RouteProps = {
  path: 'pdfview',
  component: (
    <MainLayout>
      <PDFViewer />
    </MainLayout>
  ),
};

export default route;
