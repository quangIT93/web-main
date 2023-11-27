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
  const { setIsPeriodDate, isPeriodDate, language, setIsValidSubmit, languageRedux } = props;

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
        {
          languageRedux === 1
            ? "Thời gian làm việc"
            : languageRedux === 2
              ? "Working period"
              : languageRedux === 3
                ? '근무 기간'
                : "Thời gian làm việc"
        } <span style={{ color: 'red' }}>*</span>
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
          label={
            languageRedux === 1
              ? "Không thời hạn"
              : languageRedux === 2
                ? "Indefinite"
                : languageRedux === 3
                  ? '무기한'
                  : "Không thời hạn"
          }
          htmlFor="limited-time-radio1"
        />
        <FormControlLabel
          value={1}
          control={<Radio id="limited-time-radio" />}
          label={
            languageRedux === 1
              ? "Có thời hạn"
              : languageRedux === 2
                ? "Fixed - term"
                : languageRedux === 3
                  ? '마감일이 있습니다'
                  : "Có thời hạn"
          }
          htmlFor="limited-time-radio"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default memo(PostPeriodDate);
