import React, { memo } from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
//@ts-ignore
import { styleLabel } from '../CssEditPost'
import { post } from 'validations/lang/vi/post'
import { postEn } from 'validations/lang/en/post'

interface IEditDescription {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
  language: any;
  languageRedux: any;
}

const EditDescription: React.FC<IEditDescription> = (props) => {
  const { setEditDataPosted, editDataPosted, language, languageRedux } = props

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      description: e.target.value,
    }))
  }
  return (
    <Box sx={{ marginTop: '24px' }}>
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
        value={editDataPosted?.description}
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '4px' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder={
          languageRedux === 1 ?
            post.place_des :
            postEn.place_des
        }
      />
    </Box>
  )
}

export default memo(EditDescription)
