import React from 'react';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import categoriesApi from 'api/categoriesApi';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const styleChildBox = {
  marginBottom: '12px',
};

const ContentListCv = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const getDataParentCategory = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories(
        languageRedux === 1 ? 'vi' : 'en'
      );

      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getDataParentCategory();
  }, [languageRedux]);

  console.log('dataCategories', dataCategories);

  const handleChangeCategory = async () => { };

  return (
    <div className="contentCV-bottom">
      <div className="contentCV-bottom-left">
        <Box sx={styleChildBox}>
          <Autocomplete
            autoHighlight
            className="contentCV-bottom-select"
            options={dataCategories ? dataCategories : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={
              true ? dataCategories?.find((cate: any) => cate.id === 1) : null
            }
            defaultValue={dataCategories}
            onChange={handleChangeCategory}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1 ?
                    "Chọn mẫu CV" :
                    "Choose resume template"
                }
                size="small"
              // error={!selectedProvince}
              />
            )}
          />
        </Box>

        <div className="list-template">
          {
            Array.from(new Array(10).keys()).map((item) => (
              <div className="template-item" key={item}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </div>
            ))
          }
        </div>
      </div>

      <div className="contentCV-bottom-right"></div>
    </div>
  );
};

export default ContentListCv;
