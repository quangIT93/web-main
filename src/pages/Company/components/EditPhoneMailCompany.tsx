import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import { Input } from 'antd';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};
interface NumericInputProps {
  // style: React.CSSProperties;
  value: any;
  onChange: (value: any) => any;
}

interface IEditPhoneMailCompany {
  setDataCompany: any;
  dataCompany: any;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props;

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
      placeholder="Nhập số điện thoại"
      inputProps={{ maxLength: 16 }}
      size="small"
      sx={{ width: '100%', marginTop: '8px' }}
    />
  );
};

const EditPhoneMailCompany: React.FC<IEditPhoneMailCompany> = (props) => {
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
          Số điện thoại <span style={{ color: 'red' }}>*</span>
        </Typography>
        <NumericInput value={dataCompany?.phone} onChange={setDataCompany} />
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
          placeholder="Nhập email công ty"
          //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
};

export default memo(EditPhoneMailCompany);
