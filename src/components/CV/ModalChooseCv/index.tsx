import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalShare {
  openModalChooseCv: boolean;
  setOpenModalChooseCv: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChooseCv: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalChooseCv, setOpenModalChooseCv } = props;
  const [firstCv, setFirstCv] = useState<any>(false);

  useEffect(() => {
    const firt_cv = getCookie('firstCv');
    if (firt_cv && firt_cv === '1') {
      setFirstCv(true);
    }
  }, []);

  const handleCancel = () => {
    setOpenModalChooseCv(false);
  };

  return (
    <Modal
      width={614}
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
            ? 'Chọn CV/Hồ sơ  để xin việc'
            : languageRedux === 2
              ? 'Choose CV/Resume to apply for a job'
              : languageRedux === 3 &&
                '직업에 지원하려면 CV/Resume를 선택하세요.'}
        </h3>
      }
      footer={null}
      open={openModalChooseCv}
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
          textAlign: 'center',
        }}
      >
        {firstCv
          ? languageRedux === 1
            ? 'Bạn có muốn chọn CV / Resume đã hoàn thành của mình để xin việc, Tuyển dụng có thể tìm thấy bạn dễ dàng hơn?'
            : languageRedux === 2
              ? 'Do you want to choose your completed CV/Resume to apply for a job, Recruitments can find you more easily?'
              : languageRedux === 3 &&
                '직업에 지원하기 위해 완전한 CV/이력서를 선택하시겠습니까? 그렇게 하면 채용팀이 귀하를 더 쉽게 찾을 수 있습니까?'
          : languageRedux === 1
            ? 'CV / Resume bạn vừa hoàn thành sẽ được chọn cho các đơn xin việc và Nhà tuyển dụng có thể tìm thấy bạn dễ dàng hơn!'
            : languageRedux === 2
              ? 'The CV/Resume you just completed will be selected for job applications and Employers can find you more easily!'
              : languageRedux === 3 &&
                '방금 작성한 CV/이력서가 선택되어 입사 지원서를 보내게 되며 고용주가 귀하를 더 쉽게 찾을 수 있습니다!'}
      </p>
      <div className="share-buttons-choose-cv-modal">
        <Button type="primary" shape="round">
          Yes
        </Button>
        <Button
          type="text"
          shape="round"
          style={{
            display: firstCv ? 'block' : 'none',
          }}
          onClick={handleCancel}
        >
          {languageRedux === 1
            ? 'Hủy'
            : languageRedux === 2
              ? 'Cancle'
              : languageRedux === 3 && '취소'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChooseCv;
