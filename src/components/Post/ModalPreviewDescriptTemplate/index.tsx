import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

// import './style.scss';

interface IModalShare {
    openModalPreviewDescriptTemplate: boolean;
    setOpenModalPreviewDescriptTemplate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPreviewDescriptTemplate: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalPreviewDescriptTemplate, setOpenModalPreviewDescriptTemplate } = props;

    const handleCancel = () => {
        setOpenModalPreviewDescriptTemplate(false);
    };

    return (
        <Modal
            width={800}
            zIndex={2000}
            centered
            title={
                <h3
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        // fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'center',
                    }}
                >
                    {languageRedux === 1
                        ? 'Vị trí nhân viên kinh doanh'
                        : languageRedux === 2
                            ? 'Unable to save CV'
                            : languageRedux === 3 && 'CV를 저장할 수 없습니다.'}
                </h3>
            }
            footer={null}
            open={openModalPreviewDescriptTemplate}
            // onOk={handleOk}
            onCancel={handleCancel}
        >
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {languageRedux === 1
                    ? `Thúc đẩy hoạt động trao đổi hàng hóa giữa công ty và khách hàng-\nTư vấn, truyền đạt thông tin sản phẩm/ dịch vụ tới khách hàng\nPhát triển mạng lưới khách hàng tiềm năng sử dụng sản phẩm/ dịch vụ\nXây dựng niềm tin, uy tín với khách hàng\nSoạn thảo hợp đồng, thương thảo và ký kết với khách hàng\nGiải quyết vấn đề khiếu nại, phát sinh từ khách hàng\nDuy trì và chăm sóc khách hàng\n\nYêu cầu dành cho vị trí:\nTốt nghiệp đại học, cao đẳng chuyên ngành Quản trị Kinh doanh, Marketing, Kinh tế hoặc có bằng cấp tương đương\nCó X năm kinh nghiệm tại vị trí tương đương\nCó kỹ năng giao tiếp. Có ngoại ngữ là lợi thế\nThành thạo vi tính văn phòng, các phần mềm CRM là lợi thế\nNhiệt tình, năng động, kỹ năng phân tích và xử lý tình huống tốt\nCó phương tiện đi lại cá nhân\nQuyền lợi của vị trí: dựa theo chính sách phúc lợi của công ty`
                    : languageRedux === 2
                        ? 'You can only save a maximum of 10 CVs. Please delete unused CV at the CV Management page'
                        : languageRedux === 3 &&
                        'CV는 최대 10개까지만 저장할 수 있습니다. CV 관리 페이지에서 사용하지 않은 CV를 삭제해주세요.'}
            </p>
            {/* <div className="buttons-over-10-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            window.open('/profile-cv', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'Trang quảng lý CV'
            : languageRedux === 2
              ? 'CV Management page'
              : languageRedux === 3 && 'CV 관리 페이지'}
        </Button>
        <Button
          type="text"
          shape="round"
          //   style={{
          //     display: firstCv ? 'block' : 'none',
          //   }}
          onClick={handleCancel}
        >
          {languageRedux === 1
            ? 'Hủy'
            : languageRedux === 2
              ? 'Cancel'
              : languageRedux === 3 && '취소'}
        </Button>
      </div> */}
        </Modal>
    );
};

export default ModalPreviewDescriptTemplate;
