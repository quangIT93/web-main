import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';

import CV1 from './components/cv_1';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import './styles.scss';

import { DownloadOutlined } from '@ant-design/icons';

import { Modal, Button, Avatar } from 'antd';
import any from 'react/jsx-runtime';

const CV: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [blobCv, setBlobCv] = React.useState<any>();

  const handleOpenModel = () => {
    setOpen(!open);
  };

  const printDocument = async (isDowload: boolean) => {
    const pdf = new jsPDF();
    const divtoprints = document.querySelectorAll('.page');
    let lastPage = 0;
    for (const divtoprint of divtoprints) {
      // const divtoprint = document.querySelector(".page");
      await html2canvas(divtoprint as HTMLElement).then((canvas) => {
        // document.body.appendChild(canvas);  // if you want see your screenshot in body.
        const imgData = canvas.toDataURL('image/png');
        let width = Math.round(pdf.internal.pageSize.getWidth());
        let height = Math.round(pdf.internal.pageSize.getHeight());

        let widthRatio = width / canvas.width;
        let heightRatio = height / canvas.height;

        let ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        // addImage(imageData, format, x, y, width, height, alias, compression, rotation)
        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          Math.round(canvas.width * ratio),
          Math.round(canvas.height * ratio),
        );
        pdf.addPage();
        lastPage = pdf.getNumberOfPages();
      });
    }

    // Set the number of pages in the PDF file to 1
    pdf.deletePage(lastPage);
    // isDowload ? pdf.save("download.pdf") :
    //     window.open(URL.createObjectURL(pdf.output("blob")))
    if (isDowload) {
      pdf.save('download.pdf');
    } else {
      setBlobCv(URL.createObjectURL(pdf.output('blob')));
      setOpen(!open);
      console.log(URL.createObjectURL(pdf.output('blob')));
      window.open(URL.createObjectURL(pdf.output('blob')));
    }
    // pdf.save("download.pdf");
  };

  return (
    <div className="cv-container">
      <Navbar />
      <div className="cv-content">
        <div className="cv-content-page">
          <div className="page" id="divToPrint1">
            <div className="subpage">
              <CV1 />
            </div>
          </div>
        </div>
        <div className="cv-content-page">
          <div className="page" id="divToPrint2">
            <div className="subpage">
              <CV1 />
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            printDocument(true);
          }}
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
        <Button
          onClick={() => {
            printDocument(false);
          }}
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
        >
          Preview
        </Button>
      </div>
      <Footer />
      <Modal
        title="Basic Modal"
        open={open}
        //   onOk={this.handleOk}
        onCancel={handleOpenModel}
      >
        <Avatar size={200} src={blobCv} />
      </Modal>
    </div>
  );
};

export default CV;
