import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { setAlertCancleSave } from 'store/reducer/alertReducer';
import { RootState } from '../../store/reducer';

import './style.scss';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';
import languageApi from 'api/languageApi';

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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const cancleSave = useSelector((state: any) => state.showAlert.cancalAlert);
  const [language, setLanguageState] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLanguageState(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi();
  }, [languageRedux]);

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
            {languageRedux === 1 ? 'Đã bỏ lưu thành công!' : 'Unsaved this job'}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowCancleSave;
