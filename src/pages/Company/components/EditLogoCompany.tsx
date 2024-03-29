import React, { useState, memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
// import { Button } from '@mui/material';

import { Modal, Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';

import {
  UploadLogoCompanyicon,
  ChangeLogoCompanyicon,
} from '#components/Icons';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';

interface IEditLogoCompany {
  dataCompany: any;
  setDataCompany: any;
  language: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditLogoCompany: React.FC<IEditLogoCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    dataCompany,
    setDataCompany,
    language,
    is_profile,
    setUnsavedChanges,
    setIsValid
  } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>(
    dataCompany?.logoPath && dataCompany?.logopath !== ''
      ? [
        {
          uid: '-1',
          name: 'logo.png',
          status: 'done',
          url: dataCompany?.logoPath,
          thumbUrl: dataCompany?.logoPath,
        },
      ]
      : [],
  );

  const propsUpload: UploadProps = {
    onChange: ({ fileList: newFileList }) => {
      setIsValid(false)
      setUnsavedChanges(true);
      setFileList(newFileList);
      setDataCompany((preValue: any) => ({
        ...preValue,
        logoPath: fileList[0] as RcFile,
      }));

      // console.log('newFileList', newFileList);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);

      return true;
    },
    beforeUpload: (file) => {
      // const isPNG = file.type === 'application/pdf';
      var checFileSize = true;
      // if (!isPNG) {
      //   message.error(`${file.name} không phải là file pdf`);
      // } else
      if (file.size > 1024 * 1024 * 5) {
        checFileSize = false;
        message.error(languageRedux === 1 ?
          "File phải nhỏ hơn 5mb" :
          languageRedux === 2 ?
            "File must be less than 5mb" : "파일은 5MB 미만이어야 합니다.");
      } else {
        setFileList([file]);
        return false;
      }
      return Upload.LIST_IGNORE || checFileSize;
    },
    onPreview: async (file: UploadFile) => {
      handlePreview(file);
    },
    maxCount: 1,
    listType: 'picture-card',
    fileList,
    disabled: is_profile ? true : false,
    id: 'company_upload_avatar'
  };

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  return (
    <div className="edit-logo-company-container">
      <div className="edit-logo-company-content">
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 700,
          }}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {languageRedux === 1
            ? 'Logo công ty'
            : languageRedux === 2
              ? "Company's logo"
              : '회사 로고'}{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <div className="company-logo">
          <Upload {...propsUpload}>
            {fileList.length < 1 ? (
              <UploadLogoCompanyicon />
            ) : (
              <ChangeLogoCompanyicon />
            )}
          </Upload>
        </div>
        <Modal
          centered
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};

export default memo(EditLogoCompany);
