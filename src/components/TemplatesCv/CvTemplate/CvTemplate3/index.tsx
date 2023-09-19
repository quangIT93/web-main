import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import html2canvas from 'html2canvas';
import './style.scss';

import { jsPDF } from 'jspdf';

declare global {
  interface Window {
    jspdf: typeof jsPDF;
  }
}

const CvTemplate3 = () => {
  const printElem = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => printElem.current,
  });
  const generatePDF1 = () => {
    const element = document.getElementById('container-cv');

    html2canvas(element as any).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Kích thước A4

      // Đặt kích thước hình ảnh trong tệp PDF
      let width = Math.round(pdf.internal.pageSize.getWidth());
      let height = Math.round(pdf.internal.pageSize.getHeight());

      let widthRatio = width / canvas.width;
      let heightRatio = height / canvas.height;

      let ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('my-cv.pdf');
    });
  };

  const contentRef = useRef(null);

  return (
    <>
      <div
        onClick={generatePDF1}
        style={{ position: 'relative', zIndex: '1000' }}
      >
        dowload
      </div>
      <div className="container-cv" id="container-cv" ref={contentRef}>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="content">
          <div className="content-left">
            <div className="profile">thai minh quang</div>
          </div>
          <div className="content-right">
            <div className="experr">rxxperimaen</div>
          </div>
        </div>

        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
        <div className="header">
          <div className="header-left">
            <div className="header-left_name">
              <p style={{ fontSize: '24px' }}>Thái</p>
              <p style={{ fontSize: '24px' }}>Minh Quang</p>
            </div>
            <div style={{ borderBottom: '1px solid #ccc' }}>
              Công nghệ thông tin
            </div>
          </div>
          <div className="header-right">
            <img src="./images/comunity_create_success.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CvTemplate3;
