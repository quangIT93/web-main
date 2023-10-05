import React from 'react';

// import { useDispatch } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageListItem from '@mui/material/ImageListItem';

//ANT

import { LocationHomeIcon, DolaIcon, SaveIconFill } from '#components/Icons';

import { Space, Tooltip } from 'antd';

import moment from 'moment';
import { historyVi } from 'validations/lang/vi/history';
import { historyEn } from 'validations/lang/en/history';
// import bookMarkApi from 'api/bookMarkApi';

// import HomeValueContextProvider, {
//   HomeValueContext,
// } from 'context/HomeValueContextProvider';
import {
  PersonIcon,
  SchoolIcon,
  LocationIcon,
  CateIcon,
  CalendarIcon,
  GenderIcon,
} from '#components/Icons/iconCandidate';
interface IitemNewJob {
  item: any;
  handleDeleteBookmark: (event: any, index: number, bookmarkId: number) => any;
  index: number;
  language: any;
  languageRedux: any;
}

const ListCardSaveCandidate: React.FC<IitemNewJob> = (props) => {
  // const {
  //   setOpenNotificate,
  //   openNotificate,
  // }: {
  //   setOpenNotificate: React.Dispatch<React.SetStateAction<boolean>>;
  //   openNotificate: boolean;
  // } = React.useContext(HomeValueContext);
  // const dispatch = useDispatch();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const { language, languageRedux, item, index } = props;
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    localStorage.setItem('candidateId', id);
    window.open(`/candidate-new-detail`, '_parent');
  };

  const handleImageError = () => {
    setError(true);
  };
  console.log('item', item);

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          margin: '10px 0',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
        }}
        onClick={(e) => {
          handleClickItem(e, props.item?.profileData?.accountId);
        }}
      >
        <div
          className="item-candidate-history"
          //   onClick={() => handleClickItemCandidate(item.accountId)}
        >
          <div className="wrap-img_candidate">
            <img
              src={item?.profileData?.imageData}
              alt=""
              className="img-candidate"
            />
          </div>
          <div className="info-candidate">
            <h3>{item?.profileData?.name}</h3>
            <ul>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-birthday item-infoUser">
                  <span>
                    <PersonIcon />
                  </span>
                  <span>
                    {moment(new Date(item?.profileData?.birthdayData))
                      .format('yyyy')
                      .replace(/\d{2}$/, 'xx')}
                  </span>
                </div>
                <div className="item-gender item-infoUser">
                  <span>
                    <GenderIcon />
                  </span>
                  <span>{item?.profileData?.genderData}</span>
                </div>
              </li>
              <li>
                <span>
                  <SchoolIcon />
                </span>
                {item?.profileData?.profilesEducationsData?.length !== 0
                  ? item?.profileData?.profilesEducationsData?.map(
                      (value: any) => {
                        return <span>{value.data}</span>;
                      },
                    )
                  : 'Chưa cập nhật'}
              </li>
              <li>
                <span>
                  <LocationIcon />
                </span>
                <Tooltip
                  placement="top"
                  title={
                    item?.profileData?.profilesLocationsData?.length !== 0
                      ? item.profilesLocationsData?.map((loc: any) => {
                          return `${loc.full_name}, `;
                        })
                      : ''
                  }
                >
                  <span className="text-info-candidate">
                    {item?.profileData?.profilesLocationsData?.length !== 0
                      ? item?.profileData?.profilesLocationsData?.map(
                          (loc: any) => {
                            return `${loc.full_name}, `;
                          },
                        )
                      : 'Chưa cập nhật'}
                  </span>
                </Tooltip>
              </li>
              <li>
                <span>
                  <CateIcon />
                </span>
                <span className="text-info-candidate">
                  {item?.profileData?.childCategoriesData?.length !== 0
                    ? item?.profileData?.childCategoriesData?.map(
                        (value: any) => {
                          return `${value.fullName}, `;
                        },
                      )
                    : 'Chưa cập nhật'}
                </span>
              </li>
              <li>
                <span>
                  <CalendarIcon />
                </span>
                <span>
                  {moment(new Date(item?.profileData?.updatedAt)).format(
                    'DD/MM/yyyy',
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ListCardSaveCandidate;
