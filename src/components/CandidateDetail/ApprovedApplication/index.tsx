import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import appplicationApi from 'api/appplication'
import { Box, Typography, Modal } from '@mui/material'
import { Button } from 'antd'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
}

interface IApprovalApplication {
  setStatusApplication: React.Dispatch<React.SetStateAction<number>>
}
const ApprovedApplication: React.FC<IApprovalApplication> = (props) => {
  const { setStatusApplication } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const [OpenRecruit, setOpenRecruit] = useState(false)

  const handleClose = () => setOpenRecruit(false)

  const handleClickApproveApplication = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '')
    console.log('approved appli')
    try {
      const result = await appplicationApi.updateApplication(candidateId, 3)
      if (result) {
        console.log('Duyệt hồ sơ', result)
        setStatusApplication(3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickPassRecruitment = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '')
    console.log('approved appli')
    try {
      const result = await appplicationApi.updateApplication(candidateId, 4)
      if (result) {
        console.log('Duyệt hồ sơ', result)
        setStatusApplication(4)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: '#0D99FF',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
        }}
        onClick={() => setOpenRecruit(true)}
      >
        Xác nhận tuyển ứng viên
      </Button>
      <Modal
        open={OpenRecruit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận tuyển?
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            Hãy đảm bảo bạn và ứng viên đã liên hệ và sẽ làm việc cùng nhau.
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenRecruit(false)}>
              Huỷ
            </Button>
            <Button type="primary" onClick={handleClickPassRecruitment}>
              Đồng ý
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ApprovedApplication
