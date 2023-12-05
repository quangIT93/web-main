import React from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import postApi from 'api/postApi';
import styles from './style.module.scss';
interface IModalShare {
  openModalClosePost: boolean;
  setOpenModalClosePost: React.Dispatch<React.SetStateAction<boolean>>;
  postId: any;
  setStatus: React.Dispatch<React.SetStateAction<any>>;
}

const ModalClosePost: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { openModalClosePost, setOpenModalClosePost, postId, setStatus } =
    props;

  const handleCancel = () => {
    setOpenModalClosePost(false);
  };

  const handleClosePost = async () => {
    try {
      const result = await postApi.updateStatusPost(postId, 3);
      if (result) {
        setStatus(3);
        handleCancel();
      }
    } catch (error) {
      console.log(error);
    }
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
            ? 'Đóng bài tuyển dụng'
            : languageRedux === 2
              ? 'Close job posting"'
              : '채용 공고 닫기'}
        </h3>
      }
      footer={null}
      open={openModalClosePost}
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
          ? 'Bạn có chắc chắn muốn đóng bài tuyển dụng này không? Bài tuyển dụng không thể được khôi phục sau khi đóng. Hãy quyết định cận thận'
          : languageRedux === 2
            ? 'Are you sure you want to close this job posting? Job postings cannot be restored once closed. Please decide carefully'
            : '이 채용 공고를 닫으시겠습니까? 채용 공고가 종료되면 복원할 수 없습니다. 신중하게 결정해주세요'}
      </p>
      <div className={styles.buttons_close_post_modal}>
        <Button type="primary" shape="round" onClick={handleClosePost}>
          {languageRedux === 1
            ? 'Đóng bài tuyển dụng'
            : languageRedux === 2
              ? 'Close job posting"'
              : '채용 공고 닫기'}
        </Button>
        <Button type="text" shape="round" onClick={handleCancel}>
          {languageRedux === 1
            ? 'Hủy'
            : languageRedux === 2
              ? 'Cancel'
              : languageRedux === 3 && '취소'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalClosePost;
