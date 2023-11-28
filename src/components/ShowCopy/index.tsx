import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import languageApi from 'api/languageApi';
import { setShowCopy } from 'store/reducer/alertReducer';
import { RootState } from '../../store/reducer';
import './style.scss';
import { postDetail } from 'validations/lang/vi/postDetail';
import { postDetailEn } from 'validations/lang/en/postDetail';

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
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  // const { setShowNofySave, showNofySave } = props;
  const dispatch = useDispatch();
  const showCopy = useSelector((state: any) => state.showAlert.showCopy);
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])
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
          <Alert
            onClose={handleClose}
            sx={{ width: '100%', backgroundColor: '#000000' }}
          >
            {languageRedux === 1
              ? 'Bạn đã lưu thành công liên kết'
              : languageRedux === 2
                ? 'You have successfully saved the link'
                : '링크를 성공적으로 저장했습니다.'}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowCopy;
