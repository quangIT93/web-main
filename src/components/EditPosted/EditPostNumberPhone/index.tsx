import React, { useState, memo } from 'react';
import { Box } from '@mui/material';

import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import { Input } from 'antd';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

interface NumericInputProps {
  style: React.CSSProperties;
  value: any;
  onChange: (value: any) => any;
  languageRedux: any;
  language: any;
}

interface IEditPostNumberPhone {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  editDataPosted: any;
  language: any;
  languageRedux: any;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, languageRedux } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange((preValue: any) => ({ ...preValue, phoneNumber: inputValue }));
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
      phoneNumber: valueTemp.replace(/(\d+)/, '$1'),
    }));
  };
  return (
    <Input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={
        languageRedux === 1
          ? "Số điện thoại liên hệ"
          : languageRedux === 2
            ? "Contact phone number"
            : '연락 전화번호'
      }
      maxLength={16}
      id="edit_post_phone"
    />
  );
};

const EditPostNumberPhone: React.FC<IEditPostNumberPhone> = (props) => {
  const { setEditDataPosted, editDataPosted, language, languageRedux } = props;

  // const [phone, setPhoneNumber] = useState<string>('');
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="company"
      >
        {
          languageRedux === 1
            ? "Số điện thoại liên hệ"
            : languageRedux === 2
              ? "Contact phone number"
              : '연락 전화번호'
        }{' '}
        <span style={{ color: 'red' }}>*</span>
      </Typography>
      <NumericInput
        style={{
          width: '100%',
          height: 40,
          marginTop: '0.5rem',
          fontStyle: 'normal',
          font: 'inherit',
          letterSpacing: 'inherit',
          color: 'rgba(0, 0, 0, 0.87)',
          fontWeight: '400',
          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
        }}
        value={editDataPosted.phoneNumber}
        onChange={setEditDataPosted}
        languageRedux={languageRedux}
        language={language}
      />
      {/* <Input
    value={`${phone}d`}
    onChange={handleChangeNumber}
  /> */}
    </Box>
  );
};

export default memo(EditPostNumberPhone);
