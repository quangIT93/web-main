import React from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import './style.scss';

interface IModalShare {
  openModalVideoTutorial: boolean;
  setOpenModalVideoTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateVideo: React.Dispatch<React.SetStateAction<any>>;
}

const ModalVideoTutorial: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalVideoTutorial, setOpenModalVideoTutorial, handleCreateVideo } = props;

  const handleCancel = () => {
    setOpenModalVideoTutorial(false);
  };

  return (
    <Modal
      width={500}
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
            ? 'Hướng dẫn tạo video tuyển dụng'
            : languageRedux === 2
              ? 'Instructions for creating recruitment videos'
              : languageRedux === 3 && '채용공고 비디오 등록 안내'}
        </h3>
      }
      footer={null}
      open={openModalVideoTutorial}
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
        {languageRedux === 1
          ? 'Để có được Video tuyển dụng bạn chỉ cần tải lên thật nhiều hình ảnh liên quan công ty và nội dung tuyển dụng của bạn (hình ảnh nhân viên, team building, môi trường làm việc,... ) vào tin tuyển dụng trên HiJob. HiJob sẽ giúp bạn tạo video và đăng trên Tiktok, Youtube Shorts.'
          : languageRedux === 2
            ? 'To get a recruitment video, you just need to upload lots of images related to your company and recruitment content (employee images, team building, working environment,...) into the job posting on HiJob. HiJob will help you create videos and post on Tiktok, Youtube Shorts.'
            : languageRedux === 3 &&
            '채용 비디오를 등록하려면 HiJob에 (회사,채용관련) 이미지를 자세히 올려 주세요.  채용에 도움에되고 동영상 채용공고를 만들어서 틱톡 및 유튜브 쇼츠에 대신올려 드리겠습니다'}
      </p>
      <div className="buttons-create-video-tutorial-modal">
        <Button
          type="text"
          shape="round"
          onClick={handleCancel}
        >
          {languageRedux === 1
            ? 'Để lần sau'
            : languageRedux === 2
              ? 'Next time'
              : languageRedux === 3 && '다음에'}
        </Button>
        <Button
          type="primary"
          shape="round"
          onClick={handleCreateVideo}
        >
          {languageRedux === 1
            ? 'Tạo tin tuyển dụng'
            : languageRedux === 2
              ? 'Create job postings'
              : languageRedux === 3 && '채용공고 등록'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalVideoTutorial;
