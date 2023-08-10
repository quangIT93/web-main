import React, { useState, useEffect, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
import apiCompany from 'api/apiCompany';
import categoriesApi from 'api/categoriesApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';

// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
}

const EditFieldScaleCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { setDataCompany, dataCompany } = props;

  const [dataSizes, setDataSizes] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [dataCategories, setDataCategories] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    if (dataSizes && !selectedSize) {
      setSelectedSize(
        dataSizes?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companySizeInfomation?.nameText,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSizes]);
  useEffect(() => {
    if (dataCategories && !selectedCategory) {
      setSelectedCategory(
        dataCategories?.find(
          (dataCate: any) =>
            dataCate?.parent_category_id === dataCompany?.companyCategory?.id,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategories]);

  const getSizes = async () => {
    try {
      const sizes = await apiCompany.getAllSizesCompany(
        languageRedux === 1 ? "vi" : "en"
      );

      if (sizes) {
        setDataSizes(sizes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCateogrys = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCateogrys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCompanySize = (event: any, value: any) => {
    setSelectedSize(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companySizeInfomation: {
        id: value?.id,
      },
    }));
  };
  const handleEditCompanyCategory = (event: any, value: any) => {
    setSelectedCategory(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyCategory: {
        id: value?.parent_category_id,
      },
    }));
  };

  // console.log('selectedCategory', selectedCategory);

  return (
    <div className="edit-field-scale-company-container">
      <div className="edit-field-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {
            languageRedux === 1 ?
              company.field :
              companyEn.field
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Autocomplete
          options={dataCategories ? dataCategories : []}
          getOptionLabel={(option: any) => option?.parent_category || ''}
          value={selectedCategory || null}
          onChange={handleEditCompanyCategory}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                languageRedux === 1 ?
                  company.place_field :
                  companyEn.place_field
              }
              size="small"
              value={selectedCategory?.parent_category}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.parent_category === value?.parent_category;
          }}
          style={{ marginTop: '8px' }}
        />
      </div>

      <div className="edit-scale-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {
            languageRedux === 1 ?
              company.company_size :
              companyEn.company_size
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <Autocomplete
          options={dataSizes ? dataSizes : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedSize || null}
          onChange={handleEditCompanySize}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                languageRedux === 1 ?
                  company.place_size :
                  companyEn.place_size
              }
              size="small"
              value={selectedSize?.nameText}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.nameText === value?.nameText;
          }}
          style={{ marginTop: '8px' }}
        />
      </div>
    </div>
  );
});

export default memo(EditFieldScaleCompany);