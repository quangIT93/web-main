import React, { memo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost';

import './style.scss';
interface IPostPeriodDate {
  setIsPeriodDate: React.Dispatch<React.SetStateAction<number>>;
  isPeriodDate: number;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostPeriodDate: React.FC<IPostPeriodDate> = (props) => {
  const { setIsPeriodDate, isPeriodDate, language , setIsValidSubmit} = props;

  const handleChangePeriodDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('thoi gian lam viec', e.target.value);
    setIsPeriodDate(Number(e.target.value));
    setIsValidSubmit(false);
  };

  return (
    <FormControl sx={{ marginTop: '24px' }} className="post-periodDate">
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        component="legend"
        sx={styleLabel}
      >
        {language?.working_time} <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChangePeriodDate}
        value={isPeriodDate}
      >
        <FormControlLabel
          value={0}
          control={<Radio id="limited-time-radio1" />}
          label={language?.indefinite_term}
          htmlFor="limited-time-radio1"
        />
        <FormControlLabel
          value={1}
          control={<Radio id="limited-time-radio" />}
          label={language?.fixed_term}
          htmlFor="limited-time-radio"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default memo(PostPeriodDate);
