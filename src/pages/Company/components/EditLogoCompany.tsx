import React, { useState, memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
// import { Button } from '@mui/material';

import { Upload, message } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import {
  UploadLogoCompanyicon,
  ChangeLogoCompanyicon,
} from '#components/Icons';

interface IEditLogoCompany {
  dataCompany: any;
  setDataCompany: any;
}

const EditLogoCompany: React.FC<IEditLogoCompany> = (props) => {
  const { dataCompany, setDataCompany } = props;

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
      setFileList(newFileList);
      setDataCompany((preValue: any) => ({
        ...preValue,
        logoPath: fileList[0] as RcFile,
      }));

      console.log('newFileList', newFileList);
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
        message.error(`File lon hon 5mb`);
      } else {
        setFileList([file]);
        return false;
      }
      return Upload.LIST_IGNORE || checFileSize;
    },
    onPreview: async (file: UploadFile) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as RcFile);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
    maxCount: 1,
    listType: 'picture-card',
    fileList,
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
          Logo công ty <span style={{ color: 'red' }}>*</span>
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
      </div>
    </div>
  );
};

export default memo(EditLogoCompany);
