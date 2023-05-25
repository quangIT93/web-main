import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  // boxShadow: 24,
  outline: 'none',
  borderRadius: '10px',
  p: 4,
}

interface IModalPost {
  openModalPost: boolean
  setOpenModalPost: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalPost: React.FC<IModalPost> = (props) => {
  const { openModalPost, setOpenModalPost } = props
  const handleClose = () => setOpenModalPost(false)

  return (
    <div>
      <Modal
        open={openModalPost}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: 'center', color: '#0d99ff' }}
          >
            Đã đăng tuyển thành công!
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ margin: '24px 0' }}
          >
            Bạn có thể theo dõi bài đăng tuyển của mình thông qua:
          </Typography>
          {/* <h4
            style={{ color: '#0d99ff ', textAlign: 'center', margin: '12px' }}
          >
            TẢI ỨNG DỤNG HIJOB
          </h4> */}
          <div
            className="div-img-footer"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <img
              alt="ảnh lỗi"
              src={require('../../../img/langdingPage/QRcode-ggplay.png')}
            />
            <img
              style={{ marginLeft: 10 }}
              alt="ảnh lỗi"
              src={require('../../../img/langdingPage/QRcode-appstore.png')}
            />
          </div>
          <div className="div-link-app">
            <Link
              to="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
              target="_blank"
            >
              <img
                id="img-gallery"
                alt="lỗi ảnh"
                src={require('../../../img/langdingPage/image 43.png')}
              />
            </Link>
            <Link
              to="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
              target="_blank"
            >
              <img
                alt="lỗi ảnh"
                src={require('../../../img/langdingPage/image 43.png')}
              />
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalPost
