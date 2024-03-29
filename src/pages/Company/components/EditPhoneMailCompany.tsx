import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import { Input } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import languageApi from 'api/languageApi';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};
interface NumericInputProps {
  // style: React.CSSProperties;
  value: any;
  onChange: (value: any) => any;
  languageRedux: any;
  language: any;
  is_profile: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IEditPhoneMailCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, languageRedux, language, is_profile, setIsValid } =
    props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    setIsValid(true);
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange((preValue: any) => ({ ...preValue, phone: inputValue }));
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value?.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange((preValue: any) => ({
      ...preValue,
      phone: valueTemp.replace(/(\d+)/, '$1'),
    }));
  };
  return (
    <TextField
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={
        languageRedux === 1
          ? 'Số điện thoại'
          : languageRedux === 2
            ? 'Phone number'
            : '전화 번호'
      }
      inputProps={{ maxLength: 10 }}
      size="small"
      sx={{ width: '100%', marginTop: '8px' }}
      disabled={is_profile ? true : false}
      id="company_phone"
    />
  );
};

const EditPhoneMailCompany: React.FC<IEditPhoneMailCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    dataCompany,
    setDataCompany,
    is_profile,
    setUnsavedChanges,
    setIsValid,
  } = props;
  let regexCheckPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const handleEditCompanyMail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setUnsavedChanges(true);
    setDataCompany((preValue: any) => ({
      ...preValue,
      email: value,
    }));
    setIsValid(false);
  };

  //   const handleEditCompanyPhone = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   ) => {
  //     const { value } = e.target;
  //     setDataCompany((preValue: any) => ({
  //       ...preValue,
  //       phone: value,
  //     }));
  //   };

  return (
    <div className="edit-phone-mail-company-container modal-person editCompany">
      <div className="edit-phone-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {languageRedux === 1
            ? 'Số điện thoại'
            : languageRedux === 2
              ? 'Phone number'
              : '전화 번호'} <span style={{ color: 'red' }}>*</span>
        </Typography>
        <NumericInput
          value={dataCompany?.phone}
          onChange={setDataCompany}
          languageRedux={languageRedux}
          language={language}
          is_profile={is_profile}
          setIsValid={setIsValid}
        />
        <div className="wrap-noti_input">
          {regexCheckPhone.test(dataCompany?.phone) === false ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Số điện thoại không đúng định dạng'
                : languageRedux === 2
                  ? 'The phone number is not in the correct format'
                  : languageRedux === 3 &&
                  '전화 번호의 형식이 올바르지 않습니다.'}
            </span>
          ) : dataCompany && dataCompany?.phone?.length === 0 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Số điện thoại không được bỏ trống'
                : languageRedux === 2
                  ? 'Phone cannot be empty'
                  : languageRedux === 3 && '전화는 비워 둘 수 없습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.phone?.length ? dataCompany?.phone?.length : '0'
            }/10`}</span>
        </div>
      </div>
      <div className="edit-mail-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {
            languageRedux === 1
              ? 'Email'
              : languageRedux === 2
                ? 'Email'
                : '이메일'
          } <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="company_email"
          name="title"
          value={dataCompany?.email}
          onChange={handleEditCompanyMail}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder='example@gmail.com'
          disabled={is_profile ? true : false}
        //   error={titleError} // Đánh dấu lỗi
        />
        <div className="wrap-noti_input">
          {dataCompany?.email?.length === 0 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Email không được bỏ trống'
                : languageRedux === 2
                  ? 'Email cannot be empty'
                  : languageRedux === 3 && '이메일이 비어 있지 않습니다'}
            </span>
          ) : dataCompany?.email?.length > 50 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Email không được vượt quá 50 ký tự'
                : languageRedux === 2
                  ? 'Email cannot exceed 50 characters'
                  : languageRedux === 3 &&
                  '이메일은 50자를 초과할 수 없습니다.'}
            </span>
          ) : regexCheckEmail.test(dataCompany?.email) === false ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Email không đúng định dạng'
                : languageRedux === 2
                  ? 'The Email is not in the correct format'
                  : languageRedux === 3 && '이메일의 형식이 올바르지 않습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.email?.length ? dataCompany?.email?.length : '0'
            }/50`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(EditPhoneMailCompany);
