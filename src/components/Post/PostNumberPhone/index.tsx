import React, { memo } from 'react';
import { Box } from '@mui/material';

import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
import { Input } from 'antd';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

import './style.scss';

interface IPhoneNumber {
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NumericInputProps {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
  languageRedux: any;
  language: any;
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange, languageRedux, language } = props;
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
      placeholder={
        languageRedux === 1
          ? "Số điện thoại liên hệ"
          : languageRedux === 2
            ? "Contact phone number"
            : '연락 전화번호'
      }
      maxLength={11}
      id="post_job_phone"
    />
  );
};
const PostNumberPhone: React.FC<IPhoneNumber> = (props) => {
  const { setPhoneNumber, phone, language, languageRedux, setIsValidSubmit } =
    props;
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };
  let regexCheckPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  // const handleChangeNumber = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setPhoneNumber(e.target.value.replace('d', ''));
  // };

  return (
    <Box sx={{ marginTop: '24px' }} className="modal-person numberPhone-post">
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
        } <span style={{ color: 'red' }}>*</span>
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
        onChange={(value) => {
          setIsValidSubmit(false);
          return setPhoneNumber(value);
        }}
        languageRedux={languageRedux}
        language={language}
      />
      <div className="wrap-noti_input">
        {regexCheckPhone.test(phone) === false ? (
          <span className="helper-text">
            {languageRedux === 1
              ? 'Số điện thoại không đúng định dạng'
              : languageRedux === 2
                ? 'The phone number is not in the correct format'
                : languageRedux === 3 &&
                '전화 번호의 형식이 올바르지 않습니다.'}
          </span>
        ) : phone && phone.length === 0 ? (
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
        <span className="number-text">{`${phone ? phone.length : '0'
          }/11`}</span>
      </div>
      {/* <Input
        value={`${phone}d`}
        onChange={handleChangeNumber}
      /> */}
    </Box>
  );
};

export default memo(PostNumberPhone);
