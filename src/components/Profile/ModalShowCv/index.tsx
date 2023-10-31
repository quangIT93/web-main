import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { Document, Page } from 'react-pdf';

import { Avatar, Spin } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { pdfjs } from 'react-pdf';

// data

import './style.scss';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const style = {
  position: 'absolute' as 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 70px)',
  width: 840,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,

  '@media (max-width: 399px)': {
    width: 300,
  },

  '@media (min-width: 410px) and (max-width: 639px)': {
    width: 410,
  },

  '@media (min-width: 640px) and (max-width: 839px)': {
    width: 640,
  },
};

interface IModalShowCv {
  setModalShowCvPdf: React.Dispatch<
    React.SetStateAction<{ open: boolean; urlPdf: string }>
  >;
  modalShowCvPDF: { open: boolean; urlPdf: string };
}

const ModalShowCv: React.FC<IModalShowCv> = (props) => {
  const { modalShowCvPDF, setModalShowCvPdf } = props;

  const [pageNumber, setNumPages] = React.useState(1);
  // const [modalShowCvPDF, setModalShowCvPdf] = React.useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const handleClose = () => {
    setModalShowCvPdf({ open: false, urlPdf: modalShowCvPDF.urlPdf });
  };

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  return (
    <Modal
      open={modalShowCvPDF.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-course-container"
    >
      <Box sx={style} className="Modal-show-cv">
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            cursor: 'pointer',
            // border: '1px solid',
            borderRadius: '50%',
            padding: '1px',
          }}
          onClick={handleClose}
        >
          <CloseOutlined style={{ fontSize: '30px' }} />
        </div>
        <h3>Show CV</h3>
        {modalShowCvPDF.urlPdf ? (
          <Document
            file={modalShowCvPDF?.urlPdf} // Thay đổi đường dẫn tới file PDF của bạn
            loading={<Spin indicator={antIcon} />}
            noData={<Spin indicator={antIcon} />}
            onLoadSuccess={onDocumentLoadSuccess}
            className="page-cv-wrapper"
          >
            {Array.apply(null, Array(pageNumber))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page
                  className="page-cv"
                  loading={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                  noData={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  // width={400}
                  // height={600}
                />
              ))}
          </Document>
        ) : (
          'Không có pdf để hiển thị'
        )}
      </Box>
    </Modal>
  );
};

export default ModalShowCv;
