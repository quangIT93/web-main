import MainLayout from 'layouts/MainLayout';
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
