import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
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

const ShowNotificativeSave: React.FC = () => {
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alertProfile.alert);

  // const alert = false;

  const handleClose = () => dispatch<any>(setAlert(false));
  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Bạn đã Lưu thành công!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowNotificativeSave;
