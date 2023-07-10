import React, { useState } from 'react';
import { Box, TextField, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
// data
import profileApi from 'api/profileApi';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/index';
import { CloseOutlined } from '@ant-design/icons';

import {
  getProfile,
  resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';
import './style.scss';

interface InfoContact {
  phone: string;
  email: string;
  facebook: string;
  linkedin: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 840,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

const styleChildBox = {
  marginBottom: '12px',
};

interface IModalProfileContact {
  openModalContact: boolean;
  setOpenModalContact: React.Dispatch<React.SetStateAction<boolean>>;
  profile: any;
}

const ModalProfileContact: React.FC<IModalProfileContact> = (props) => {
  const { openModalContact, setOpenModalContact, profile } = props;
  const [phone, setPhone] = useState(profile?.phone ? profile?.phone : '');
  const [email, setEmail] = useState(profile?.email ? profile?.email : '');
  const [fb, setFB] = useState(profile?.facebook ? profile?.facebook : '');
  const [linkIn, setLinkIn] = useState(
    profile?.linkedin ? profile?.linkedin : '',
  );

  const handleClose = () => setOpenModalContact(false);
  const dispatch = useDispatch();
  const { setProfileUser } = bindActionCreators(actionCreators, dispatch);

  const handleSetPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSetFB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFB(e.target.value);
  };

  const handleLinkIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkIn(e.target.value);
  };

  // handle update information contact
  const handleSubmit = async () => {
    try {
      const info: InfoContact = {
        phone: phone,
        email: email,
        facebook: fb,
        linkedin: linkIn,
      };

      const result = await profileApi.updateContact(info);
      if (result) {
        setOpenModalContact(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal
      open={openModalContact}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
    >
      <Box sx={style}>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            cursor: 'pointer',
            // border: '1px solid',
            borderRadius: '50%',
            padding: '1px',
          }}
          onClick={handleClose}
        >
          <CloseOutlined style={{ fontSize: '30px' }} />
        </div>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: '12px' }}
        >
          Thông tin liên hệ
        </Typography>
        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Số điện thoại *
          </Typography>
          <TextField
            type="number"
            id="nameProfile"
            name="title"
            value={phone}
            onChange={handleSetPhone}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Số điện thoại"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Email *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={email}
            onChange={handleSetEmail}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Email"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Link Facebook *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={fb}
            onChange={handleSetFB}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Facebook"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Box sx={styleChildBox}>
          <Typography
            // sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="nameProfile"
          >
            Link Linkedin *
          </Typography>
          <TextField
            type="text"
            id="nameProfile"
            name="title"
            value={linkIn}
            onChange={handleLinkIn}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Linkedin"
            // error={titleError} // Đánh dấu lỗi
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileContact;
