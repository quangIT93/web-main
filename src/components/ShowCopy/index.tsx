import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { setShowCopy } from 'store/reducer/alertReducer';

import './style.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// interface IShowNotificativeSave {
//   showNofySave: boolean;
//   setShowNofySave: React.Dispatch<React.SetStateAction<boolean>>;
// }

const ShowCopy: React.FC = () => {
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const showCopy = useSelector((state: any) => state.showAlert.showCopy);

  // const alert = false;

  const handleClose = () => dispatch<any>(setShowCopy(false));
  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={showCopy}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleClose} sx={{ width: '100%' }}>
            Bạn đã lưu thành công liên kết
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowCopy;
