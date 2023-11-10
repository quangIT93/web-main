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

  // const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <Box sx={{ marginTop: '24px' }} className="description-post modal-person">
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="startTime"
      >
        {language?.job_description} <span style={{ color: 'red' }}>*</span>
      </Typography>
      <TextField
        // className={classes.textarea}
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '0.5rem' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder={language?.post_page?.place_des}
        value={description}
      />
      <div className="wrap-noti_input ">
        {description.length > 4000 ? (
          <span className="helper-text">
            {languageRedux === 1
              ? 'Mô tả không được vượt quá 4000 ký tự'
              : 'Description cannot exceed 4000 characters'}
          </span>
        ) : description.length === 0 ? (
          <span className="helper-text">
            {languageRedux === 1
              ? 'Mô tả được để trống'
              : 'Description cannot be blank'}
          </span>
        ) : (
          <></>
        )}
        <span className="number-text">{`${description.length}/4000`}</span>
      </div>
    </Box>
  );
};

export default memo(Description);
