// import languageApi from 'api/languageApi';
import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
// import nodata from '../../../public/images/history/nodata.png'
import { RootState } from '../../store/reducer/index';
const NoDataComponent: React.FC<any> = (props) => {
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
        src={require('../../img/langdingPage/nodata.png')}
        alt={languageRedux === 1
          ? 'Hình ảnh bị lỗi'
          : languageRedux === 2
            ? 'Image is corrupted'
            : '이미지가 손상되었습니다'}
        width="208px"
        height="245px"
      />
      <p style={{ fontSize: 20, color: 'gray', marginBottom: 20 }}>
        {props.loading === true
          ?
          languageRedux === 1
            ? 'Đang tải dữ liệu...'
            : languageRedux === 2
              ? 'Loading data...'
              : languageRedux === 3 && '로드 중...'
          :
          languageRedux === 1
            ? 'Không có thông tin hiển thị!'
            : languageRedux === 2
              ? 'No display information!'
              : languageRedux === 3 && '표시되는 정보가 없습니다!'
        }
      </p>
    </div>
  );
};

export default NoDataComponent;
