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
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Description: React.FC<IDescription> = (props) => {
  const {
    setDescription,
    description,
    language,
    languageRedux,
    setIsValidSubmit,
  } = props;
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setIsValidSubmit(false);
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
        id="post_job_description"
      />
      <div className="wrap-noti_input ">
        {description.length > 4000 ? (
          <span className="helper-text">
            {languageRedux === 1
              ? 'Mô tả không được vượt quá 4000 ký tự'
              : languageRedux === 2
                ? 'Description cannot exceed 4000 characters'
                : languageRedux === 3 && '설명은 4,000자를 초과할 수 없습니다'}
          </span>
        ) : description.length === 0 ? (
          <span className="helper-text">
            {languageRedux === 1
              ? 'Mô tả được để trống'
              : languageRedux === 2
                ? 'Description cannot be blank'
                : languageRedux === 3 && '설명은 비워둘 수 없습니다.'}
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
