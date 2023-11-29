import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import styles from './style.module.scss';
import { getCookie } from 'cookies';
import apiCompanyV3 from 'api/apiCompanyV3';

interface IModalReviewNotice {
  openModalConfirmDelete: boolean;
  setOpenModalConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  companyId: any;
  setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<any>>;
  setOpenModalPostReviewSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setStar: React.Dispatch<React.SetStateAction<any>>;
  setReview: React.Dispatch<React.SetStateAction<any>>;
  setMyReview: React.Dispatch<React.SetStateAction<any>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: any;
  isSuccess: boolean;
}

const ModalConfirmDelete: React.FC<IModalReviewNotice> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    openModalConfirmDelete,
    setOpenModalConfirmDelete,
    companyId,
    setOpenBackdrop,
    setStatus,
    setOpenModalPostReviewSuccess,
    setStar,
    setReview,
    setMyReview,
    setIsSuccess,
    inputRef,
    isSuccess,
  } = props;

  const handleCloseModal = () => {
    setOpenModalConfirmDelete(false);
  };

  const handleDeleteReview = async () => {
    try {
      setOpenBackdrop(true);
      const result = await apiCompanyV3.deleteCompanyReview(companyId);
      if (result) {
        setOpenModalConfirmDelete(false);
        setOpenBackdrop(false);
        setStatus('delete');
        setOpenModalPostReviewSuccess(true);
        setStar(0);
        setReview('');
        setMyReview({});
        setIsSuccess(!isSuccess);
        inputRef.current!.focus({
          cursor: 'end',
        });
      }
    } catch (error) {}
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
            ? 'Xác nhận xóa đánh giá'
            : languageRedux === 2
              ? 'Confirm deletion of review'
              : languageRedux === 3 && '리뷰 삭제 확인'}
        </h3>
      }
      footer={null}
      open={openModalConfirmDelete}
      // onOk={handleOk}
      onCancel={handleCloseModal}
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
          ? 'Bạn có chắc chắn muốn xóa đánh giá này. Sau khi xóa, đánh giá của bạn về công ty này sẽ không còn xuất hiện.'
          : languageRedux === 2
            ? 'Are you sure you want to delete this review. Once deleted, your review of this company will no longer appear.'
            : languageRedux === 3 &&
              '이 리뷰를 삭제하시겠습니까? 제거되면 더 이상 이 회사에 대한 리뷰를 볼 수 없습니다'}
      </p>
      <div className={styles.modal_confirm_delete_buttons}>
        <Button type="primary" shape="round" onClick={handleDeleteReview}>
          {languageRedux === 1
            ? 'Xóa'
            : languageRedux === 2
              ? 'Delete'
              : languageRedux === 3 && '삭제하다'}
        </Button>
        <Button type="text" shape="round" onClick={handleCloseModal}>
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

export default ModalConfirmDelete;
