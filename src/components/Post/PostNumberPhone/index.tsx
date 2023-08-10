import React, { memo } from 'react';
import { Box } from '@mui/material';

import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import { Input } from 'antd';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

interface IPhoneNumber {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  language: any;
  languageRedux: any;
}

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
  languageRedux: any;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, languageRedux } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/(\d+)/, '$1'));
  };
  return (
    <Input
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={languageRedux === 1 ?
        post.place_phone :
        postEn.place_phone}
      maxLength={11}
    />
  );
};
const PostNumberPhone: React.FC<IPhoneNumber> = (props) => {
  const { setPhoneNumber, phone, language, languageRedux } = props;
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };

  // const handleChangeNumber = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setPhoneNumber(e.target.value.replace('d', ''));
  // };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="company"
      >
        {
          language?.contact_phone_number
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
        value={phone}
        onChange={setPhoneNumber}
        languageRedux={languageRedux}
      />
      {/* <Input
        value={`${phone}d`}
        onChange={handleChangeNumber}
      /> */}
    </Box>
  );
};

export default memo(PostNumberPhone);
