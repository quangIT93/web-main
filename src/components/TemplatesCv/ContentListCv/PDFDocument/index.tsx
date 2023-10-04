import React, { memo, useEffect, useState } from 'react';

import { usePDF, StyleSheet } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf';
// Tạo một wrapper component để đóng gói Document và Page
const PdfDocument = ({ instance, numPages, onDocumentLoadSuccess }: any) => {
  return (
    <Document
      //   loading={<Spin indicator={antIcon} />}
      //   noData={<Spin indicator={antIcon} />}
      file={instance.url}
      onLoadSuccess={onDocumentLoadSuccess}
      className="page-cv-wrapper"
    >
      {Array.apply(null, Array(numPages))
        .map((x, i) => i + 1)
        .map((page) => (
          <Page
            className="page-cv"
            // loading={page === 1 ? <Spin indicator={antIcon} /> : <></>}
            // noData={page === 1 ? <Spin indicator={antIcon} /> : <></>}
            pageNumber={page}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
    </Document>
  );
};

export default PdfDocument;
