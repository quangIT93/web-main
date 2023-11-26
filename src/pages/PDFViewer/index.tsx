import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { Document, Page } from 'react-pdf';
import { Avatar, Spin } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
//@ts-ignore
import { pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';
import profileApi from 'api/profileApi';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function PDFViewer() {
  const dispatch = useDispatch();
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const profileMoreV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [urlPdf, setUrfPdf] = React.useState<{
    id: number | null;
    name: string;
    status: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    imageURL: string;
    pdfURL: string;
  }>({
    id: null,
    name: '',
    status: null,
    createdAt: null,
    updatedAt: null,
    imageURL: '',
    pdfURL: '',
  });
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [pageNumber, setNumPages] = React.useState(1);

  // console.log('profileV3', profileV3?.profilesCvs[0].pdfURL);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const getProfileModerV3 = async () => {
    try {
      const result = await profileApi.getProfileInformationMoreV3(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        dispatch(setProfileMeInformationMoreV3(result));
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getProfileModerV3();
  }, []);

  const handleDownload = async (pdfUrl: string, namePdf: string) => {
    // Tạo một thẻ a ẩn
    if (pdfUrl && namePdf) {
      const link = document.createElement('a');
      link.download = `${namePdf}.pdf`; // Đặt tên cho tệp PDF khi tải về
      link.href = pdfUrl;
      if (link) document.body.appendChild(link);
      // Simulate a click event để tải tệp về
      link.click();
      // Loại bỏ thẻ a sau khi tải xong
      document.body.removeChild(link);
    }
  };

  React.useEffect(() => {
    if (
      searchParams.get('idPdf') &&
      profileMoreV3.length !== 0 &&
      profileV3?.length !== 0
    ) {
      profileMoreV3?.profilesCvs.map(
        (value: {
          id: number | null;
          name: string;
          status: number | null;
          createdAt: number | null;
          updatedAt: number | null;
          imageURL: string;
          pdfURL: string;
        }) => {
          if (value.id === Number(searchParams.get('idPdf'))) {
            setUrfPdf(value);
          }
        },
      );
    }
  }, [profileMoreV3, profileV3]);

  return (
    <div className="viewPdf-container">
      {/* <Navbar /> */}
      {urlPdf.id ? (
        <div className="viewPdf-content">
          <div className="header-content-viewPdf">
            <h2>
              {languageRedux === 1
                ? 'Nội dung CV'
                : languageRedux === 2
                  ? 'Content CV'
                  : languageRedux === 3 && 'CV 내용'}
            </h2>
            <div className="installCV">
              <p onClick={() => handleDownload(urlPdf.pdfURL, urlPdf?.name)}>
                Tải CV
              </p>
              {/* <p></p> */}
            </div>
          </div>
          <Document
            file={urlPdf.pdfURL} // Thay đổi đường dẫn tới file PDF của bạn
            loading={<Spin indicator={antIcon} />}
            noData={<Spin indicator={antIcon} />}
            onLoadSuccess={onDocumentLoadSuccess}
            // className="page-cv-wrapper"
          >
            {Array.apply(null, Array(pageNumber))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page
                  className="page-cv-reviewer"
                  loading={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                  noData={page === 1 ? <Spin indicator={antIcon} /> : <></>}
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={900}
                  height={1200}
                />
              ))}
          </Document>
        </div>
      ) : (
        <div>Khong co gi de hien thi</div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default PDFViewer;
