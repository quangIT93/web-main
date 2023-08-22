import languageApi from 'api/languageApi';
import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
// import nodata from '../../../public/images/history/nodata.png'
import { RootState } from '../../store/reducer/index';
const NoDataComponent: React.FC = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const [language, setLanguage] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setLanguage(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi()
  }, [languageRedux])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        flexDirection: 'column',
      }}
    >
      {/* <FundFilled style={{ fontSize: 100, color: "gray" }} /> */}
      <img
        style={{ marginTop: '10rem' }}
        src={require('../../img/langdingPage/nodata.png')}
        alt="ảnh bị lỗi"
        width="208px"
        height="245px"
      />
      <p style={{ fontSize: 20, color: 'gray', marginBottom: 20 }}>
        {
          language?.history_page?.no_job_page
        }
      </p>
    </div>
  );
};

export default NoDataComponent;
