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
import languageApi from 'api/languageApi';
import { useLocation } from 'react-router-dom';

// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setFillActivity: React.Dispatch<React.SetStateAction<any>>;
  setFillSize: React.Dispatch<React.SetStateAction<any>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFieldScaleCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    setDataCompany,
    dataCompany,
    is_profile,
    setUnsavedChanges,
    setFillActivity,
    setFillSize,
    setIsValid,
  } = props;

  const [dataSizes, setDataSizes] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [dataCategories, setDataCategories] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const location = useLocation();
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
    if (is_profile === false) {
      getCateogrys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCompanySize = (event: any, value: any) => {
    setSelectedSize(value);
    setUnsavedChanges(true);
    setFillSize(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companySizeInfomation: {
        id: value ? value?.id : '',
      },
    }));
    setIsValid(false);
  };
  const handleEditCompanyCategory = (event: any, value: any) => {
    setSelectedCategory(value);
    setUnsavedChanges(true);
    setFillActivity(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyCategory: {
        id: value ? value?.parent_category_id : '',
      },
    }));
    setIsValid(false);
  };

  // console.log('selectedCategory', selectedCategory);

  return (
    <div className="edit-field-scale-company-container modal-person editCompany">
      <div className="edit-field-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {
            languageRedux === 1 ?
              "Lĩnh vực hoạt động" :
              languageRedux === 2 ?
                "Field of activity" : "활동 분야"
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataCategories ? dataCategories : []}
          getOptionLabel={(option: any) => option?.parent_category || ''}
          value={selectedCategory || null}
          onChange={handleEditCompanyCategory}
          id="company_place_activity"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1 ?
                "Lĩnh vực hoạt động" :
                languageRedux === 2 ?
                  "Field of activity" : "활동 분야"}
              size="small"
              value={selectedCategory?.parent_category}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.parent_category === value?.parent_category;
          }}
          style={{ marginTop: '8px' }}
        />
        <div className="wrap-noti_input">
          {!selectedCategory ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Vui lòng chọn lĩnh vực hoạt động'
                : languageRedux === 2
                  ? 'Please select your field of activity'
                  : languageRedux === 3 && '귀하의 활동분야를 선택해주세요.'}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="edit-scale-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {languageRedux === 1
            ? 'Quy mô công ty'
            : languageRedux === 2
              ? "Company's size"
              : '회사 규모'} <span style={{ color: 'red' }}>*</span>
        </Typography>
        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataSizes ? dataSizes : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedSize || null}
          onChange={handleEditCompanySize}
          id="company_place_size"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={languageRedux === 1
                ? 'Quy mô công ty'
                : languageRedux === 2
                  ? "Company's size"
                  : '회사 규모'}
              size="small"
              value={selectedSize?.nameText}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.nameText === value?.nameText;
          }}
          style={{ marginTop: '8px' }}
        />
        <div className="wrap-noti_input">
          {!selectedSize ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Vui lòng chọn quy mô công ty'
                : languageRedux === 2
                  ? 'Please select company size'
                  : languageRedux === 3 && '회사규모를 선택해 주세요'}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
});

export default memo(EditFieldScaleCompany);
