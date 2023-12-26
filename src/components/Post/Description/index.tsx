import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost';

import './style.scss';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';
import { FillDataPost } from '#components/Icons';
import ModalFillDescriptTemplate from '../ModalFillDescriptTemplate';
import ModalPreviewDescriptTemplate from '../ModalPreviewDescriptTemplate';
interface IDescription {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  oldDescription: any;
}

const Description: React.FC<IDescription> = (props) => {
  const {
    setDescription,
    description,
    language,
    languageRedux,
    setIsValidSubmit,
    oldDescription
  } = props;
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setIsValidSubmit(false);
  };
  const [openModalFillDescriptTemplate, setOpenModalFillDescriptTemplate] = useState<boolean>(false);
  const [openModalPreviewDescriptTemplate, setOpenModalPreviewDescriptTemplate] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<number>(1);
  // const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <Box sx={{ marginTop: '24px' }} className="description-post modal-person">
      <div className="description-post-title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="startTime"
        >
          {
            languageRedux === 1
              ? "Mô tả công việc"
              : languageRedux === 2
                ? "Job description"
                : '업무 설명서'
          } <span style={{ color: 'red' }}>*</span>
        </Typography>
        <div className='description_template' onClick={
          () => setOpenModalFillDescriptTemplate(true)
        }>
          <FillDataPost />
        </div>
      </div>
      <TextField
        // className={classes.textarea}
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '0.5rem' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder={
          languageRedux === 1
            ? "Mô tả công việc"
            : languageRedux === 2
              ? "Job description"
              : '업무 설명서'
        }
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
              ? 'Mô tả không được để trống'
              : languageRedux === 2
                ? 'Description cannot be blank'
                : languageRedux === 3 && '설명은 비워둘 수 없습니다.'}
          </span>
        ) : (
          <></>
        )}
        <span className="number-text">{`${description.length}/4000`}</span>
      </div>
      <ModalFillDescriptTemplate
        openModalFillDescriptTemplate={openModalFillDescriptTemplate}
        setOpenModalFillDescriptTemplate={setOpenModalFillDescriptTemplate}
        setOpenModalPreviewDescriptTemplate={setOpenModalPreviewDescriptTemplate}
        setDescription={setDescription}
        oldDescription={oldDescription}
        typeModal={1}
        setTemplateId={setTemplateId}
      />
      <ModalPreviewDescriptTemplate
        openModalPreviewDescriptTemplate={openModalPreviewDescriptTemplate}
        setOpenModalPreviewDescriptTemplate={setOpenModalPreviewDescriptTemplate}
        typeModal={1}
        templateId={templateId}
      />
    </Box>
  );
};

export default memo(Description);
