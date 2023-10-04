import React from 'react';
import Box from '@mui/material/Box';

import ItemCadidate from '#components/Candidates/ItemCadidate';

import { FireIcon } from '#components/Icons';
import candidateSearch from 'api/apiCandidates';
const NewestGigWorker = () => {
  const [listData, setListData] = React.useState<any>([]);
  const [addresses, setAddresses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [educations, setEducations] = React.useState<number | undefined>(
    undefined,
  );
  const [gender, setGender] = React.useState(1);
  const [ageMin, setAgeMin] = React.useState(1);
  const [ageMax, setAgeMax] = React.useState(60);
  const [page, setPage] = React.useState<any>('0');
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
      console.log(result);
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
      className="hot-job-container"
      id="hot-job-container"
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <FireIcon width={25} height={25} />
          <h2>West Gig Worker</h2>
        </div>
        <div>
          <span
            onClick={() => window.open('/candidatesAll')}
            style={{ cursor: 'pointer' }}
          >
            Xem tất cả
          </span>
        </div>
      </div>

      <div
        className="list-candidate"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {listData?.map((item: any) => {
          return <ItemCadidate item={item} />;
        })}
      </div>
    </Box>
  );
};

export default NewestGigWorker;
