import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { setAlertSave } from 'store/reducer/alertReducer';
import './style.scss';
import { RootState } from '../../store/reducer';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';

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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.showAlert.alert);

  // const alert = false;

  const handleClose = () => dispatch<any>(setAlertSave(false));
  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              width: '100%',
              backgroundColor: '#000000',
            }}
          >
            {languageRedux === 1
              ? home.job_has_been_saved
              : homeEn.job_has_been_saved}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowNotificativeSave;
