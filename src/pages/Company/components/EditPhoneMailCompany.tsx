import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import { Input } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};
interface NumericInputProps {
  // style: React.CSSProperties;
  value: any;
  onChange: (value: any) => any;
  languageRedux: any
}

interface IEditPhoneMailCompany {
  setDataCompany: any;
  dataCompany: any;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, languageRedux } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange((preValue: any) => ({ ...preValue, phone: inputValue }));
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
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
        languageRedux === 1 ?
          company.place_phone :
          companyEn.place_phone
      }
      inputProps={{ maxLength: 10 }}
      size="small"
      sx={{ width: '100%', marginTop: '8px' }}
    />
  );
};

const EditPhoneMailCompany: React.FC<IEditPhoneMailCompany> = (props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { dataCompany, setDataCompany } = props;

  const handleEditCompanyMail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      email: value,
    }));
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
    <div className="edit-phone-mail-company-container">
      <div className="edit-phone-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {
            languageRedux === 1 ?
              company.phone :
              companyEn.phone
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <NumericInput value={dataCompany?.phone} onChange={setDataCompany} languageRedux={languageRedux} />
      </div>
      <div className="edit-mail-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          Email <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.email}
          onChange={handleEditCompanyMail}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={
            languageRedux === 1 ?
              company.place_email :
              companyEn.place_email
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
};

export default memo(EditPhoneMailCompany);
