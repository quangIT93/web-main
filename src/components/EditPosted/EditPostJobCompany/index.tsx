import React, { useState, memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import './style.scss';

const styleLabel = {
  fontWeight: 600,
  color: '#000000',
};

interface IEditPostJobCompany {
  setEditDataPosted: any;
  editDataPosted: any;
  language: any;
}

const EditPostJobCompany: React.FC<IEditPostJobCompany> = (props) => {
  const { setEditDataPosted, editDataPosted, language } = props;

  const handleEditJobName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      title: value,
    }));
  };

  const handleEditCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      company_name: value,
    }));
  };

  return (
    <div className="edit-post_jobCompany">
      <div className="edit-title_job edit-posted_title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {
            language?.job_title
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={editDataPosted?.title}
          onChange={handleEditJobName}
          size="small"
          sx={{ width: '100%', marginTop: '0.5rem' }}
          placeholder={
            language?.job_title
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
      <div className="edit-title_company edit-posted_title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {
            language?.company
          }{' '}<span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          name="title"
          value={editDataPosted?.company_name}
          onChange={handleEditCompanyName}
          size="small"
          sx={{ width: '100%', marginTop: '0.5rem' }}
          placeholder={
            language?.company
          }
        //   error={titleError} // Đánh dấu lỗi akla
        />
      </div>
    </div>
  );
};

export default memo(EditPostJobCompany);
