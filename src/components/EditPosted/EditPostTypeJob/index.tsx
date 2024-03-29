import React, { useState, memo } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import siteApi from 'api/siteApi';
import { AxiosResponse } from 'axios';

interface IEditPostTypeJob {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  editDataPosted: any;
  language: any;
  languageRedux: any;
}

const styleLabel = {
  fontWeight: 600,
  color: '#000000',
};

const EditPostTypeJob: React.FC<IEditPostTypeJob> = (props) => {
  const { editDataPosted, setEditDataPosted, language, languageRedux } = props;

  const [jobTypes, setJobTypes] = useState<AxiosResponse | null>(null);

  const getTypeJob = async () => {
    const result = await siteApi.getJobType(
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );
    if (result) {
      setJobTypes(result);
    }
  };

  React.useEffect(() => {
    getTypeJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleChaneTypeJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      jobTypeId: Number(e.target.value),
    }));
  };

  return (
    <FormControl sx={{ width: '100%', marginTop: '24px' }}>
      <FormLabel id="editPostTypeJob" sx={styleLabel}>
        {languageRedux === 1
          ? 'Loại công việc'
          : languageRedux === 2
            ? 'Job types'
            : languageRedux === 3
              ? '직업종류'
              : 'Loại công việc'}{' '}
        <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="editPostTypeJob"
        name="editPostTypeJob"
        value={Number(
          !editDataPosted?.jobTypeId
            ? editDataPosted?.job_type?.job_type_id
            : editDataPosted?.jobTypeId,
        )}
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

export default memo(EditPostTypeJob);
