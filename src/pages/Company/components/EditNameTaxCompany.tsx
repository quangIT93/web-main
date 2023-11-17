import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import languageApi from 'api/languageApi';

import './style.scss';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditNameFaxCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValid : React.Dispatch<React.SetStateAction<boolean>>;
}

const EditNameFaxCompany: React.FC<IEditNameFaxCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { dataCompany, setDataCompany, is_profile, setUnsavedChanges,setIsValid } = props;
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
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
  //   getlanguageApi();
  // }, [languageRedux]);

  const handleEditCompanyFax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setUnsavedChanges(true);
    setDataCompany((preValue: any) => ({
      ...preValue,
      taxCode: value,
    }));
    setIsValid(false)
  };

  const handleEditCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setUnsavedChanges(true);
    setDataCompany((preValue: any) => ({
      ...preValue,
      name: value,
    }));
    setIsValid(false)
  };

  return (
    <div className="edit-name-tax-company-container modal-person editCompany">
      <div className="edit-name-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {language?.company_name} <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="company_name"
          name="title"
          value={dataCompany?.name}
          onChange={handleEditCompanyName}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={language?.company_page?.place_name}
          disabled={is_profile ? true : false}
        //   error={titleError} // Đánh dấu lỗi
        />
        <div className="wrap-noti_input">
          {dataCompany?.name?.length > 255 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tên công ty không được vượt quá 255 ký tự'
                : 'Company name cannot exceed 255 characters'}
            </span>
          ) : dataCompany?.name?.length === 0 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tên công ty được để trống'
                : 'Company name cannot be blank'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.name?.length ? dataCompany?.name?.length : '0'
            }/255`}</span>
        </div>
      </div>
      <div className="edit-tax-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {language?.tax_code}
        </Typography>
        <TextField
          type="text"
          id="company_tax"
          name="title"
          value={dataCompany?.taxCode}
          onChange={handleEditCompanyFax}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={language?.company_page?.place_tax}
          disabled={is_profile ? true : false}
        //   error={titleError} // Đánh dấu lỗi
        />
        <div className="wrap-noti_input">
          {dataCompany?.taxCode?.length > 255 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Mã số thuế không được vượt quá 255 ký tự'
                : 'Tax code cannot exceed 255 characters'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.taxCode?.length ? dataCompany?.taxCode?.length : '0'
            }/255`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(EditNameFaxCompany);
