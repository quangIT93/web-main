import React, { memo } from 'react';
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { Input, Space } from 'antd'
// import Typography from '@mui/material/Typography'
import { styleLabel } from '#components/Post/CssPost';

interface IPostSalaryType {
  setMoneyType: React.Dispatch<React.SetStateAction<any>>;
  moneyType: number;
  salaryType?: number;
  language: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  languageRedux: any;
}

const PostSalaryType: React.FC<IPostSalaryType> = (props) => {
  const {
    moneyType,
    setMoneyType,
    salaryType,
    language,
    setIsValidSubmit,
    languageRedux,
  } = props;

  const handleChangeMoneyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyType(Number(e.target.value));
    setIsValidSubmit(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <FormControl sx={{ marginTop: '24px' }}>
        <FormLabel
          id="radioButton"
          component="legend"
          sx={{
            ...styleLabel,
            opacity: salaryType === 6 ? 0.5 : 1, // Thiết lập opacity thành 0.5 nếu salaryType === 6
          }}
        >
          {languageRedux === 1
            ? 'Mức lương'
            : languageRedux === 2
              ? 'Salary'
              : '샐러리/급여'}{' '}
          <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="radioButton"
          name="radioButton"
          onChange={handleChangeMoneyType}
          value={moneyType}
        >
          <FormControlLabel
            value={1}
            control={
              <Radio
                id="createPostVND"
                disabled={salaryType === 6}
                sx={{ color: salaryType === 6 ? 'gray' : 'inherit' }}
              />
            }
            label="VND"
            htmlFor="createPostVND"
          />
          <FormControlLabel
            value={2}
            control={
              <Radio
                id="createPostUSD"
                disabled={salaryType === 6}
                sx={{ color: salaryType === 6 ? 'gray' : 'inherit' }}
              />
            }
            label="USD"
            htmlFor="createPostUSD"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default memo(PostSalaryType);
