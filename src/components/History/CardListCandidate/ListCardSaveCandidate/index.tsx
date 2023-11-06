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

import { LocationHomeIcon, DolaIcon, SaveIconFill, IconEmail, PhoneIcon } from '#components/Icons';

import { CandidateHijob } from '#components/Icons/iconCandidate';

import { Space, Tooltip } from 'antd';
import male_null_avatar from '../../../../img/male_null_avatar.png';
import female_null_avatar from '../../../../img/female_null_avatar.png';
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
  GenderFemaleIcon,
} from '#components/Icons/iconCandidate';
interface IitemNewJob {
  item: any;
  handleDeleteBookmark: (event: any, index: number, bookmarkId: number) => any;
  index: number;
  language: any;
  languageRedux: any;
  hanhleClicKCandleSaveCandidate: Function;
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
  const {
    language,
    languageRedux,
    item,
    index,
    hanhleClicKCandleSaveCandidate,
  } = props;
  const [error, setError] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    localStorage.setItem('candidateId', id);
    window.open(`/candidate-new-detail`, '_parent');
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px 16px',
          cursor: 'pointer',
          margin: '10px 0',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <div
          className="item-candidate-history"
          //   onClick={() => handleClickItemCandidate(item.accountId)}
          onClick={(e) => {
            e.stopPropagation();
            handleClickItem(e, props.item?.profileData?.accountId);
          }}
        >
          <div className="item-candidate-content-history">
            <div className="wrap-img_candidate">
              <img
                src={
                  item?.profileData?.imageData
                    ? item?.profileData?.imageData?.avatar
                    : item?.profileData.genderData === 'Nam' || item.genderData === 'Male'
                      ? male_null_avatar
                      : female_null_avatar
                }
                style={{
                  filter: item?.profileData?.imageData?.avatar
                    ? 'blur(3px)'
                    : 'none',
                }}
                alt=""
                className="img-candidate"
              />
              <div className="wrap-name-age">
                <div className="wrap-name-age_item">
                  <span className="icon-age_item-candidate">
                    <PersonIcon />
                  </span>
                  <span>
                    {moment(new Date(item?.profileData?.birthdayData))
                      .format('yyyy')
                      .replace(/\d{2}$/, 'xx')}
                  </span>
                </div>
                <div className="wrap-name-age_item">
                  <span className="icon-age_item-candidate">
                    <GenderIcon />
                  </span>
                  <span>{item?.profileData?.genderData}</span>
                </div>
              </div>
            </div>
            <div className="info-candidate">
              <h3>{item?.profileData?.name}</h3>
              <ul>
                {/* <li style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              </li> */}
                <li>
                  <span className="icon-info-candidate">
                    <IconEmail width={16} height={16} />
                  </span>
                  <Tooltip
                    placement="top"
                    title={
                      item?.hideEmail
                        ? item.hideEmail
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'
                    }
                  >
                    <span className="text-info-candidate">
                      {item?.hideEmail
                        ? item.hideEmail
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'}
                    </span>
                  </Tooltip>
                </li>
                <li>
                  <span className="icon-info-candidate">
                    <PhoneIcon width={16} height={16} />
                  </span>
                  <Tooltip
                    placement="top"
                    title={
                      item?.hidePhone
                        ? item.hidePhone
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'
                    }
                  >
                    <span className="text-info-candidate">
                      {item?.hidePhone
                        ? item.hidePhone
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'}
                    </span>
                  </Tooltip>
                </li>
                <li>
                  <span className="icon-info-candidate">
                    <CateIcon />
                  </span>
                  <Tooltip
                    placement="top"
                    title={
                      item?.profileData?.childCategoriesData?.length !== 0
                        ? item?.profileData?.childCategoriesData?.map(
                          (value: any) => {
                            return `${value.fullName}, `;
                          },
                        )
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'
                    }
                  >
                    <span className="text-info-candidate">
                      {item?.profileData?.childCategoriesData?.length !== 0
                        ? item?.profileData?.childCategoriesData?.map(
                          (value: any) => {
                            return `${value.fullName}, `;
                          },
                        )
                        : languageRedux === 1
                          ? 'Thông tin chưa cập nhật'
                          : 'Not updated information'}
                    </span>
                  </Tooltip>
                </li>
              </ul>
              <h2>
                {item?.introduction
                  ? item.introduction
                  : languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'}
              </h2>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            right: '32px',
            top: '12px',
          }}
          onClick={(e) =>
            hanhleClicKCandleSaveCandidate(
              e,
              props?.item?.profileData?.accountId,
            )
          }
        >
          <SaveIconFill width={24} height={24} />
        </div>
      </Card>
    </>
  );
};

export default ListCardSaveCandidate;
