import React from 'react';
import Box from '@mui/material/Box';

import ItemCadidate from '#components/Candidates/ItemCadidate';

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
  const [gender, setGender] = React.useState(1);
  const [ageMin, setAgeMin] = React.useState(18);
  const [ageMax, setAgeMax] = React.useState(60);
  const [page, setPage] = React.useState<any>('0');
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const getAllCandidates = async () => {
    try {
      const result = await candidateSearch.getCandidates(
        addresses,
        categories,
        educations,
        gender,
        ageMin,
        ageMax,
        18,
        page,
        'vi',
      );

      if (result) {
        setListData(result.data.cvFilters);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getAllCandidates();
  }, []);

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
            {languageRedux === 1 ? 'Newest gig worker' : 'Ứng viên mới mới'}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            cursor: 'pointer',
            color: '#0d99ff',
          }}
        >
          <p
            onClick={() => window.open('/candidatesAll', '_parent')}
            style={{ cursor: 'pointer' }}
          >
            Xem tất cả
          </p>
          <ArrowrightIcon width={20} height={20} />
        </div>
      </div>

      <div className="list-candidate-home">
        {listData?.map((item: any, index: number) => {
          return <ItemCadidate item={item} key={index} />;
        })}
      </div>
    </Box>
  );
};

export default NewestGigWorker;
