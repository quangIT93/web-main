import React from 'react';
import Box from '@mui/material/Box';

import ItemCadidate from '#components/Candidates/ItemCadidate';
import ModalNoteWorker from './ModalNoteWorker';

import { FireIcon, ArrowrightIcon } from '#components/Icons';
import candidateSearch from 'api/apiCandidates';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer/index';
import './style.scss';

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

  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);

  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const getAllCandidates = async () => {
    try {
      const logout = localStorage.getItem('accessToken');
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        !logout ? 6 : profileV3?.typeRoleData === 0 ? 6 : 18,
        page,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (result) {
        setListData(result.data.cvFilters);
      }
    } catch (error) { }
  };

  React.useEffect(() => {
    getAllCandidates();
  }, [languageRedux]);

  const handleChangeRouteNewestWorker = () => {
    if (profileV3?.typeRoleData === 1) {
      window.open('/candidatesAll', '_parent');
    } else {
      console.log(profileV3);
      setOpenModalNoteWorker(true);
      window.open('/page-cv', '_parent');
    }
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
          <FireIcon width={25} height={25} />
          <h2>
            {languageRedux === 1 ? 'Ứng viên mới nhất' : 'Newest workers'}
          </h2>
        </div>
        {profileV3?.typeRoleData === 1 ? (
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
              {languageRedux === 1 ? 'Xem tất cả' : 'View all'}
            </p>
            <ArrowrightIcon width={20} height={20} />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="list-candidate-home">
        {listData?.map((item: any, index: number) => {
          return <ItemCadidate item={item} key={index} />;
        })}
      </div>
      <ModalNoteWorker
        openModalNoteWorker={openModalNoteWorker}
        setOpenModalNoteWorker={setOpenModalNoteWorker}
      />
    </Box>
  );
};

export default NewestGigWorker;
