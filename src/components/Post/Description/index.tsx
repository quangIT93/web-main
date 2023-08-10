import React, { memo } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost';

import './style.scss';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';
interface IDescription {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  language: any;
  languageRedux: any;
}

const Description: React.FC<IDescription> = (props) => {
  const { setDescription, description, language, languageRedux } = props;
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  return (
    <Box sx={{ marginTop: '24px' }} className="description-post">
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="startTime"
      >
        {
          language?.job_description
        }{' '}
        <span style={{ color: 'red' }}>*</span>
      </Typography>
      <TextField
        // className={classes.textarea}
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '0.5rem' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder={
          languageRedux === 1 ?
            post.place_des :
            postEn.place_des
        }
        value={description}
      />
    </Box>
  );
};

export default memo(Description);
