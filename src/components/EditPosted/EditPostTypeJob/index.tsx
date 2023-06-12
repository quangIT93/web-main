import React, { useState, useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import siteApi from 'api/siteApi'
import { AxiosResponse } from 'axios'

interface IEditPostTypeJob {}

const styleLabel = {
  fontWeight: 600,
  color: '#000000',
}

const EditPostTypeJob: React.FC<IEditPostTypeJob> = (props) => {
  const [jobTypes, setJobTypes] = useState<AxiosResponse | null>(null)
  const [typeJob, setTypeJob] = useState<number>(1)

  const getTypeJob = async () => {
    const result = await siteApi.getJobType()
    if (result) {
      setJobTypes(result)
    }
  }

  React.useEffect(() => {
    getTypeJob()
  }, [])

  return (
    <FormControl sx={{ width: '100%', marginTop: '24px' }}>
      <FormLabel id="editPostTypeJob" sx={styleLabel}>
        Loại công việc *:
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="editPostTypeJob"
        name="editPostTypeJob"
        // value={typeJob}
        // onChange={handleChaneTypeJob}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '12px',
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
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default EditPostTypeJob
