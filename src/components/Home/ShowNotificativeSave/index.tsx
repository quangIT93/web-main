import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
// import './style.scss';
import { RootState } from '../../../store/reducer';
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
  const alert = useSelector((state: any) => state.alertProfile.alert);

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // const alert = false;

  const handleClose = () => dispatch<any>(setAlert(false));

  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={alert}
          autoHideDuration={1000000}
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
            {language?.job_has_been_saved}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowNotificativeSave;
