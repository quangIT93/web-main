// import languageApi from 'api/languageApi';
import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
// import nodata from '../../../public/images/history/nodata.png'
import { RootState } from '../../store/reducer/index';
const NoCompanyData: React.FC<any> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const language = useSelector(
  //   (state: RootState) => state.dataLanguage.languages,
  // );
  // const [language, setLanguage] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguage(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);
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
        src={require('../../img/langdingPage/no_company.png')}
        alt="ảnh bị lỗi"
        width="208px"
        height="245px"
      />
      <p style={{ fontSize: 20, color: 'gray', marginTop: 20 }}>
        {props.loading === true
          ? languageRedux === 1
            ? 'Đang tải dữ liệu'
            : 'Loading data...'
          : languageRedux === 1
            ? 'Bạn chưa lưu công ty nào'
            : "You haven't saved any companies"}
      </p>
    </div>
  );
};

export default NoCompanyData;
