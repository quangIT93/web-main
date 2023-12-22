import React from 'react';
import Box from '@mui/material/Box';

import ItemCadidate from '#components/Candidates/ItemCadidate';
import ModalNoteWorker from './ModalNoteWorker';

import { FireIcon, ArrowrightIcon, IconNewestWorker } from '#components/Icons';
import candidateSearch from 'api/apiCandidates';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import './style.scss';
import { Skeleton } from 'antd';

const NewestGigWorker = () => {
  const [listData, setListData] = React.useState<any>([]);
  const [addresses, setAddresses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [educations, setEducations] = React.useState<number | undefined>(
    undefined,
  );
  const [gender, setGender] = React.useState(undefined);
  const [ageMin, setAgeMin] = React.useState(18);
  const [ageMax, setAgeMax] = React.useState(60);
  const [page, setPage] = React.useState<any>('0');
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [loading, setLoading] = React.useState<any>(false);
  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);

  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const getAllCandidates = async () => {
    try {
      setLoading(true);
      const logout = localStorage.getItem('accessToken');

      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        // !logout
        //   ? 6
        //   // : profileV3.length !== 0 && profileV3?.typeRoleData === 0
        //   // ? 6
        //   : profileV3.length === 0
        //     ? 6
        //     : 18,
        18,
        page,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (result) {
        setLoading(false);

        setListData(result.data.cvFilters);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getAllCandidates();
  }, [languageRedux]);

  const handleChangeRouteNewestWorker = () => {
    // if (profileV3?.typeRoleData === 1) {
    window.open('/candidatesAll', '_parent');
    // } else {
    //   setOpenModalNoteWorker(true);
    //   window.open('/page-cv', '_parent');
    // }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
        position: 'relative',
        paddingBottom: '28px',
      }}
      className="list-candidate-container"
      id="list-candidate-container"
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
          <IconNewestWorker width={25} height={25} />
          <h2 className="title_home">
            {languageRedux === 1
              ? 'Ứng viên mới nhất'
              : languageRedux === 2
              ? 'Newest workers'
              : languageRedux === 3 && '최신 지원자'}
          </h2>
        </div>
        {/* {profileV3?.typeRoleData === 1 ? (
          <div
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
              {languageRedux === 1
                        ? 'Xem tất cả'
                        : languageRedux === 2
                          ? 'View all'
                          : languageRedux === 3 && '모두보기'}
            </p>
            <ArrowrightIcon width={20} height={20} />
          </div>
        ) : (
          <></>
        )} */}
      </div>

      <Skeleton loading={loading} active>
        <div className="list-candidate-home">
          {listData?.map((item: any, index: number) => {
            return <ItemCadidate item={item} key={index} />;
          })}
        </div>
        {/* {profileV3?.typeRoleData === 1 ? ( */}
        <div
          className="view-all-down"
          onClick={handleChangeRouteNewestWorker}
          style={{
            display: !listData || listData.length === 0 ? 'none' : 'flex',
          }}
        >
          <p style={{ cursor: 'pointer' }}>
            {languageRedux === 1
              ? 'Xem tất cả'
              : languageRedux === 2
              ? 'View all'
              : languageRedux === 3 && '모두보기'}
          </p>
          <ArrowrightIcon width={20} height={20} />
        </div>
        {/* ) : (
          <></>
        )} */}
      </Skeleton>
      <ModalNoteWorker
        openModalNoteWorker={openModalNoteWorker}
        setOpenModalNoteWorker={setOpenModalNoteWorker}
      />
    </Box>
  );
};

export default NewestGigWorker;
