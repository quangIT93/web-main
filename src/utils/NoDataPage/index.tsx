import languageApi from 'api/languageApi';
import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
// import nodata from '../../../public/images/history/nodata.png'
import { RootState } from '../../store/reducer/index';
const NoDataComponent: React.FC = () => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
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
          languageRedux === 1 ?
            "Chưa tìm thấy công việc" :
            "Job not found"
        }
      </p>
    </div>
  );
};

export default NoDataComponent;
