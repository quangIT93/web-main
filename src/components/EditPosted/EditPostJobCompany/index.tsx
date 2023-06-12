import React, { useState } from 'react'
// import component UI
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import './style.scss'

const styleLabel = {
  fontWeight: 600,
  color: '#000000',
}

interface IEditPostJobCompany {
  companyName: string
  title: string
}

const EditPostJobCompany: React.FC<IEditPostJobCompany> = (props) => {
  const { companyName, title } = props

  const [companyEditName, setCompanyEditName] = useState(companyName)
  const [companyEditTitle, setCompanyEditTitle] = useState(title)

  console.log('company', companyName)
  console.log('title', title)

  return (
    <div className="edit-post_jobCompany">
      <div className="edit-title_job edit-posted_title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          Tên công việc *
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={companyEditTitle}
          //   onChange={handleChangeTitleForm}
          size="small"
          sx={{ width: '100%', marginTop: '4px' }}
          placeholder="Tên công việc"
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
          Tên công việc *
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          name="title"
          value={companyEditName}
          //   onChange={handleChangeTitleForm}
          size="small"
          sx={{ width: '100%', marginTop: '4px' }}
          placeholder="Tên công việc"
          //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  )
}

export default EditPostJobCompany
