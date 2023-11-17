import React, { memo } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './style.scss';
interface IStyleWork {
  isWorkingWeekend: number;
  isRemotely: number;
  setIsWorkingWeekend: React.Dispatch<React.SetStateAction<number>>;
  setIsRemotely: React.Dispatch<React.SetStateAction<number>>;
  language: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyleWork: React.FC<IStyleWork> = (props) => {
  const {
    isWorkingWeekend,
    isRemotely,
    setIsWorkingWeekend,
    setIsRemotely,
    language,
    setIsValidSubmit
  } = props;

  const handleWeekendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setIsWorkingWeekend(1);
    setIsWorkingWeekend(0);
    setIsValidSubmit(false)
  };

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return setIsRemotely(1);
    setIsRemotely(0);
    setIsValidSubmit(false)
  };
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      className="post-styleWork"
    >
      <FormControlLabel
        label={language?.working_on_the_weekend}
        control={
          <Checkbox
            checked={isWorkingWeekend === 0 ? false : true}
            onChange={handleWeekendChange}
          />
        }
      />
      <FormControlLabel
        label={language?.remote_work}
        control={
          <Checkbox
            checked={isRemotely === 0 ? false : true}
            onChange={handleRemoteChange}
          />
        }
      />
    </Box>
  );
};

export default memo(StyleWork);
