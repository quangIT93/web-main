import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationMoreV3 } from 'store/reducer/profileMeInformationMoreReducerV3';

interface IModalShare {
  openModalDeleteCv: {
    open: boolean;
    item: {
      id: null | number;
      imageURL: string;
      name: string;
      pdfURL: string;
      status: number | null;
    };
  };
  setOpenModalDeleteCv: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      item: {
        id: null | number;
        imageURL: string;
        name: string;
        pdfURL: string;
        status: number | null;
      };
    }>
  >;
}

const ModalDeleteCv: React.FC<IModalShare> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const { openModalDeleteCv, setOpenModalDeleteCv } = props;

  const dispatch = useDispatch();
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );

  const handleCancel = () => {
    setOpenModalDeleteCv({
      open: false,
      item: {
        id: null,
        imageURL: '',
        name: '',
        pdfURL: '',
        status: null,
      },
    });
  };

  const handleSubmit = async () => {
    if (openModalDeleteCv) {
      const result = await apiCv.deleteCvById([
        openModalDeleteCv?.item?.id as number,
      ]);
      if (result) {
        if (profileV3) {
          if (profileV3?.profilesCvs.length > 1) {
            if (
              openModalDeleteCv?.item?.id !==
              profileV3?.profilesCvs[profileV3?.profilesCvs.length - 1]?.id
            ) {
              await apiCv.putThemeCv(
                profileV3?.profilesCvs[profileV3?.profilesCvs.length - 1]?.id,
                1,
              );
            } else {
              await apiCv.putThemeCv(
                profileV3?.profilesCvs[profileV3?.profilesCvs.length - 2]?.id,
                1,
              );
            }
            const resultProfileV3L2 =
              await profileApi.getProfileInformationMoreV3(
                languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
              );
            if (resultProfileV3L2) {
              dispatch(setProfileMeInformationMoreV3(resultProfileV3L2));
            }

            setOpenModalDeleteCv({
              open: false,
              item: {
                id: null,
                imageURL: '',
                name: '',
                pdfURL: '',
                status: null,
              },
            });
          } else {
            const resultProfileV3L2 =
              await profileApi.getProfileInformationMoreV3(
                languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
              );
            if (resultProfileV3L2) {
              dispatch(setProfileMeInformationMoreV3(resultProfileV3L2));
              setOpenModalDeleteCv({
                open: false,
                item: {
                  id: null,
                  imageURL: '',
                  name: '',
                  pdfURL: '',
                  status: null,
                },
              });
            }
          }
        }
      }
    }

    try {
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
            ? 'Xóa CV/Hồ sơ'
            : languageRedux === 2
              ? 'Delete CV/Resume'
              : languageRedux === 3 && 'CV 삭제/이력서'}
        </h3>
      }
      footer={null}
      open={openModalDeleteCv.open}
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
          ? 'Xóa CV/Hồ sơ của bạn, bạn sẽ không thể ứng tuyển công việc bằng cách sử dụng nó nữa.\nBạn có muốn xóa CV/Hồ sơ này không?'
          : languageRedux === 2
            ? 'Delete your CV/Resume, you will no longer be able to apply for jobs using it.\nDo you want to delete this CV/Resume?'
            : languageRedux === 3 &&
              'CV/프로필을 삭제하면 더 이상 해당 이력서/프로필을 사용하여 직무에 지원할 수 없습니다.\n이 CV/프로필을 삭제하시겠습니까?'}
      </p>
      <div className="buttons-delete-cv-modal">
        <Button type="primary" shape="round" onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Đồng ý'
            : languageRedux === 2
              ? 'Yes'
              : languageRedux === 3 && '확인'}
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

export default ModalDeleteCv;
