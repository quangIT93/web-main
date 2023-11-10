import React, { memo } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import siteApi from 'api/siteApi';
import { AxiosResponse } from 'axios';

import './style.scss';

interface IPostTypeJob {
  typeJob: number;
  setTypeJob: React.Dispatch<React.SetStateAction<number>>;
  language: any;
  languageRedux: any;
}
const PostTypeJob: React.FC<IPostTypeJob> = (props) => {
  const { typeJob, setTypeJob, language, languageRedux } = props;
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };
  const [jobTypes, setJobTypes] = React.useState<AxiosResponse | null>(null);

  const getTypeJob = async () => {
    const result = await siteApi.getJobType(languageRedux === 1 ? 'vi' : 'en');
    if (result) {
      setJobTypes(result);
    }
  };

  React.useEffect(() => {
    getTypeJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleChaneTypeJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeJob(Number(e.target.value));
  };
  // console.log('typeJob', typeJob);
  // console.log('jobTypes', jobTypes);

  return (
    <FormControl
      sx={{ width: '100%', marginTop: '24px' }}
      className="post-jobType"
    >
      <FormLabel id="demo-row-radio-buttons-group-label" sx={styleLabel}>
        {language?.job_type1} <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={typeJob}
        onChange={handleChaneTypeJob}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {jobTypes?.data.map((item: any, i: number) => {
          return (
            <FormControlLabel
              key={i}
              value={item.id}
              control={<Radio />}
              label={`${item.name}`}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(PostTypeJob);
