import React, { memo } from 'react';
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost';
import { AxiosResponse } from 'axios';
import siteApi from 'api/siteApi';

import './style.scss';

interface ISalaryType {
  salaryType: number;
  setSalaryType: React.Dispatch<React.SetStateAction<number>>;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
const SalaryType: React.FC<ISalaryType> = (props) => {
  const {
    salaryType,
    setSalaryType,
    language,
    languageRedux,
    setIsValidSubmit,
  } = props;
  const handleChangeSalaryType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryType(Number(e.target.value));
    setIsValidSubmit(false);
  };

  const [salary, setSalary] = React.useState<AxiosResponse | null>(null);

  // call api get salaryType
  const getSalaryType = async () => {
    const result = await siteApi.getSalaryType(
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );
    if (result) {
      setSalary(result);
    }
  };

  React.useEffect(() => {
    getSalaryType();
  }, [languageRedux]);

  return (
    <Box sx={{ marginTop: '24px' }} className="post-salaryType">
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="demo-row-radio-buttons-group-label" sx={styleLabel}>
          {language?.job_type} <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={salaryType}
          onChange={handleChangeSalaryType}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {salary?.data.map((item: any, i: number) => {
            return (
              <FormControlLabel
                key={i}
                value={item.id}
                control={<Radio />}
                label={`${item.value}`}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default memo(SalaryType);
