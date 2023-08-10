import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { CheckedBlueIcon } from '#components/Icons';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { Button } from 'antd';
import './style.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: 'none',
  // boxShadow: 24,
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface IPropModalNoteCreatePost {
  openModalNoteCreatePost: boolean;
  setOpenModalNoteCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  language: any;
}

const ModalNoteCreatePost: React.FC<IPropModalNoteCreatePost> = (props) => {
  const { openModalNoteCreatePost, setOpenModalNoteCreatePost, language } = props;

  const handleClose = () => setOpenModalNoteCreatePost(false);

  return (
    <div>
      <Modal
        open={openModalNoteCreatePost}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="wrap-guide">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '30px',
              transform: 'translateY(-50%)',
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 className="title-post_guide">
            {
              language?.instructions_for_creating_valid_articles
            }
          </h2>
          <div className="wrap-imagePost_guide">
            <img
              src="./images/guide.png"
              alt=""
              style={{ width: '103px', height: '150px' }}
            />
          </div>
          <div className="wrap-textPost_guide">
            <p>
              {
                language?.your_post_will_be_moderated
              }
            </p>
          </div>
          <div className="wrap-list_guide">
            <ul>
              <li>
                <CheckedBlueIcon />
                {
                  language?.enter_your_company_name_correctly
                }
              </li>
              <li>
                <CheckedBlueIcon />
                {
                  language?.check_the_address_carefully
                }
              </li>
              <li>
                <CheckedBlueIcon />
                {
                  language?.add_images_for_candidates
                }
              </li>
              <li>
                <CheckedBlueIcon />
                {
                  language?.properly_categorize
                }
              </li>
              <li>
                <CheckedBlueIcon />
                {
                  language?.leave_your_contact_phone_number
                }
              </li>
              <li>
                <CheckedBlueIcon />
                {
                  language?.you_can_post_up_to_1_articles_a_day
                }
              </li>
            </ul>
          </div>
          <Button
            block
            style={{ marginTop: '12px' }}
            type="primary"
            onClick={handleClose}
          >
            {
              language?.i_got_it
            }
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNoteCreatePost;
