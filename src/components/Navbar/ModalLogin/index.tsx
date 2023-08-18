import React from 'react';

// import component Material
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '576px',
  // height: '568px',
  bgcolor: '#ffffff',
  borderRadius: '20px',
  border: 'none',
  outline: 'none',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
  p: 4,

  '@media (max-width: 600px)': {
    width: '400px',
  },

  '@media (max-width: 400px)': {
    width: '360px',
  },

  '@media (max-width: 280px)': {
    width: '280px',
  },
};

interface PropsModalLogin {
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalLoginNav: React.FC<PropsModalLogin> = (props) => {
  const { openModalLogin, setOpenModalLogin } = props;

  const handleClose = () => setOpenModalLogin(false);
  return (
    <Modal
      open={openModalLogin}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 100000 }}
    >
      <Box sx={style}></Box>
    </Modal>
  );
};

export default ModalLoginNav;
