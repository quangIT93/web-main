import React from 'react';

import { Box, MenuItem, TextField, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import api
import categoriesApi from 'api/categoriesApi';

import './style.scss';

const styleChildBox = {
  marginBottom: '12px',
};

const ContentListCv = () => {
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const getDataParentCategory = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories('vi');

      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getDataParentCategory();
  }, []);

  console.log('dataCategories', dataCategories);

  const handleChangeCategory = async () => {};

  return (
    <div className="contentCV-bottom">
      <div className="contentCV-bottom-left">
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Các danh mục <span className="color-asterisk">*</span>
          </Typography>
          <Autocomplete
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
                placeholder={'hello'}
                size="small"
                // error={!selectedProvince}
              />
            )}
          />
        </Box>

        <div></div>
      </div>

      <div className="contentCV-bottom-right"></div>
    </div>
  );
};

export default ContentListCv;
