import React, { useState, memo } from 'react'
// import component UI
import Typography from '@mui/material/Typography'

import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { UploadLogoCompanyicon, ChangeLogoCompanyicon } from '#components/Icons';

interface IEditLogoCompany {
  dataCompany: any
  setDataCompany: any
}

const EditLogoCompany: React.FC<IEditLogoCompany> = (props) => {
  const { dataCompany, setDataCompany } = props

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<any>([]);
  const [imageFile, setImageFile] = React.useState<any>(null);

  React.useEffect(() => {
    const loadImage = async () => {
      try {
        // Bước 1: Xác định định dạng file từ URL
        const imageExtension = dataCompany.logo.split('.').pop();
        const imageType = `image/${imageExtension === 'jpg' ? 'jpeg' : imageExtension
          }`;

        // Bước 2: Chuyển đổi dữ liệu hình ảnh thành dạng file
        const imageBlob = new Blob([dataCompany.logo], { type: imageType });
        const imageFile = new File([imageBlob], `image.${imageExtension}`, {
          type: imageType,
        });

        setLogo((prevState: any) => [...prevState, imageFile])
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [dataCompany.image]);


  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setDataCompany((preValue: any) => ({
      ...preValue,
      logo: newFileList[0],
    }))
    console.log("newFileList", newFileList[0]);

  };

  console.log("dataCompany.logo ", dataCompany.logo);


  const onPreview = async (file: UploadFile) => {
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
  };

  return (
    <div className="edit-logo-company-container">
      <div className="edit-logo-company-content">
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700
          }}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          Logo công ty <span style={{ color: 'red' }}>*</span>
        </Typography>
        <div className="company-logo">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={logo ? logo : fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={1}
          >
            {
              fileList.length < 1 ? <UploadLogoCompanyicon /> : <ChangeLogoCompanyicon />
            }
          </Upload>
        </div>
      </div>
    </div >
  )
}

export default memo(EditLogoCompany)
