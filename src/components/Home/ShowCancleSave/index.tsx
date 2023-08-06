import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

// import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
import { setAlertCancleSave } from 'store/reducer/alertReducer';

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

const ShowCancleSave: React.FC = () => {
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const cancleSave = useSelector((state: any) => state.showAlert.alert);

  // const alert = false;

  const handleClose = () => dispatch<any>(setAlertCancleSave(false));
  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={cancleSave}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%', backgroundColor: '#000000' }}
          >
            Bạn đã xóa thành công!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowCancleSave;
