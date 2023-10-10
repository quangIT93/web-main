import React from 'react';
import languageApi from 'api/languageApi';
import { Button } from 'antd';
import { RootState } from '../../../store/reducer';
import { useSelector } from 'react-redux';
const RejectedApplication: React.FC = () => {
  // const [language, setLanguageState] = React.useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
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
  return (
    <>
      <Button
        name="RejectedApplication"
        type="primary"
        style={{
          backgroundColor: '#bd3131',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
          cursor: 'default',
        }}
      >
        {language?.rejected}
      </Button>
    </>
  );
};

export default RejectedApplication;
