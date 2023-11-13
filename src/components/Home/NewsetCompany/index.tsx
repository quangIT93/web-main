import React from 'react';
import Box from '@mui/material/Box';

import ItemCadidate from '#components/Candidates/ItemCadidate';

import {
  FireIcon,
  ArrowrightIcon,
  IconNewestWorker,
  IconNewestCompany,
} from '#components/Icons';
import candidateSearch from 'api/apiCandidates';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import './style.scss';
import { Skeleton } from 'antd';
import CompanyCard from '#components/Company/CompanyCard';
import apiCompanyV3 from 'api/apiCompanyV3';

const NewestCompany = () => {
  const [listData, setListData] = React.useState<any>([]);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [loading, setLoading] = React.useState<any>(false);
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const getNewestCompany = async () => {
    try {
      setLoading(true);
      const result = await apiCompanyV3.filterCompany(
        [],
        [],
        undefined,
        12,
        0,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setLoading(false);
        setListData(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    getNewestCompany();
  }, [languageRedux]);

  const handleChangeRouteNewestWorker = () => {
    window.open('/companyAll', '_parent');
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '28px',
      }}
      className="list-company-container"
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 0 16px',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <IconNewestCompany width={25} height={25} />
          <h2>{languageRedux === 1 ? 'Công ty mới nhất' : 'Newest company'}</h2>
        </div>
        {/* {profileV3?.typeRoleData === 1 ? ( */}
        {/* <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        cursor: 'pointer',
                        color: '#0d99ff',
                    }}
                    onClick={handleChangeRouteNewestWorker}
                >
                    <p style={{ cursor: 'pointer' }}>
                        {languageRedux === 1 ? 'Xem tất cả' : 'View all'}
                    </p>
                    <ArrowrightIcon width={20} height={20} />
                </div> */}
        {/* ) : (
                    <></>
                )} */}
      </div>

      <Skeleton loading={loading} active>
        <div className="list-company-home">
          {listData?.companies?.map((item: any, index: number) => {
            return (
              <CompanyCard
                item={item}
                key={index}
                checkBookMark={checkBookMark}
                setCheckBookMark={setCheckBookMark}
              />
            );
          })}
        </div>
      </Skeleton>
      <div
        className="view-all-down"
        onClick={handleChangeRouteNewestWorker}
        style={{
          display: !listData || listData.length === 0 ? 'none' : 'flex',
        }}
      >
        <p style={{ cursor: 'pointer' }}>
          {languageRedux === 1 ? 'Xem tất cả' : 'View all'}
        </p>
        <ArrowrightIcon width={20} height={20} />
      </div>
    </Box>
  );
};

export default NewestCompany;
