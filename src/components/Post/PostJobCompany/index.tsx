import React, { useState } from 'react'

import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'

import FormValues from '../../../pages/Post/index'

interface PropsPostCompanyJob {
  setFormValues: React.Dispatch<React.SetStateAction<any>>
  setTitleJob: React.Dispatch<React.SetStateAction<any>>
  setCompanyName: React.Dispatch<React.SetStateAction<any>>
}

const PostJobCompany: React.FC<PropsPostCompanyJob> = (props) => {
  const { setFormValues, setTitleJob, setCompanyName } = props

  const handleChangeTitleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleJob(e.target.value)
  }

  const handleChangeCompanyForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value)
  }

  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  }
  return (
    <div className="post-jobCompany">
      <div className="post-titleJob post-title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          Tên công việc *
        </Typography>
        <TextField
          type="text"
          id="jobTitle"
          name="title"
          //   value={formValues.title}
          onChange={handleChangeTitleForm}
          size="small"
          sx={{ width: '100%', marginTop: '4px' }}
          placeholder="Tên công việc"
        />
      </div>
      <div className="post-titleCompany post-title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="company"
        >
          Công ty *:
        </Typography>
        <TextField
          type="text"
          id="company"
          name="company_name"
          // value={formValues.company_name}
          size="small"
          onChange={handleChangeCompanyForm}
          sx={{ width: '100%', marginTop: '4px' }}
          placeholder="Tên công ty"
        />
      </div>
    </div>
  )
}

export default PostJobCompany
