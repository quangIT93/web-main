import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
//import scss
import './style.scss';

//MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

import { setAlertCancleSave, setAlertSave } from 'store/reducer/alertReducer';

import {
  LocationHomeIcon,
  IconBellNewestCompany,
  IconBellSaveNewestCompany,
} from '#components/Icons';

import { Space, Tooltip } from 'antd';

// import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';
import female_null_avatar from '../../../img/female_null_avatar.png';
import ModalLogin from '../../../components/Home/ModalLogin';
import { CateIcon } from '#components/Icons/iconCandidate';
import apiCompanyV3 from 'api/apiCompanyV3';
import { RootState } from 'store';
// import ShowNotificativeSave from '#components/ShowNotificativeSave';
interface Iprops {
  item: any;
  key: any;
  checkBookMark: boolean;
  setCheckBookMark: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyCard: React.FC<Iprops> = (props) => {
  const dispatch = useDispatch();
  // const [checkBookMark, setCheckBookMark] = React.useState(true);
  const { checkBookMark, setCheckBookMark } = props;
  const [error, setError] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/detail-company?companyId=${props.item.id}`, '_parent');
  };

  const handleImageError = () => {
    setError(true);
  };

  const handleSaveCompany = async (e: any, id: any) => {
    try {
      e.stopPropagation();
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
        return;
      }

      if (props.item?.isBookmarked) {
        const result = await apiCompanyV3.postBookmarkCompany(id);
        props.item.isBookmarked = false;
        if (result) {
          setCheckBookMark(!checkBookMark);
          dispatch<any>(setAlertCancleSave(true));
        }
      } else {
        const result = await apiCompanyV3.postBookmarkCompany(id);
        props.item.isBookmarked = true;
        if (result) {
          dispatch<any>(setAlertSave(true));
          setCheckBookMark(!checkBookMark);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: '100%',
          display: 'flex',
          padding: '12px',
          cursor: 'pointer',
          '&:hover': {
            background: '#E7E7ED',
            transition: 'all 0.3s linear',
          },
          boxShadow: 'none',
          borderRadius: '5px',
          justifyContent: 'space-between',
          overflow: 'unset',
        }}
        onClick={(e) => {
          handleClickItem(e, props.item?.id);
        }}
        className="company-card-container"
      >
        <ul className="div-card-company_content">
          <ImageListItem
            key={props.item?.logoPath}
            sx={{
              flex: 1,
              display: 'flex',
              // justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <img
              src={
                props.item?.logoPath ? props.item?.logoPath : female_null_avatar
              }
              srcSet={
                props.item?.logoPath ? props.item?.logoPath : female_null_avatar
              }
              alt={props.item?.title}
              loading="lazy"
              style={{
                width: '76px',
                height: '76px',
                // borderRadius: 10,
              }}
            />
            <div className="div-card-company_info">
              {/* {' '} */}
              <div className="div-card-company_info__title">
                <Tooltip placement="top" title={props.item?.name}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: '16px',
                      margin: 0,
                      width: '100%',
                      fontWeight: '700',
                      lineheight: '20px',
                    }}
                  >
                    {props.item?.name}
                  </Typography>
                </Tooltip>
                <div
                  onClick={(e: any) => handleSaveCompany(e, props?.item?.id)}
                  style={{
                    display:
                      localStorage.getItem('accountId') ===
                        props?.item?.accountId
                        ? 'none'
                        : 'flex',
                  }}
                >
                  {props.item?.isBookmarked ? (
                    <IconBellSaveNewestCompany width={24} height={24} />
                  ) : (
                    <IconBellNewestCompany width={24} height={24} />
                  )}
                </div>
              </div>
              <div className="div-card-company_info__bot">
                <div className="div-card-company_info__bot__item">
                  <div className="info-bot-icon">
                    <LocationHomeIcon />
                  </div>
                  <Tooltip
                    placement="top"
                    title={
                      props.item?.companyLocation?.district?.province?.fullName
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {
                        props.item?.companyLocation?.district?.province
                          ?.fullName
                      }
                    </Typography>
                  </Tooltip>
                </div>
                <div className="div-card-company_info__bot__item">
                  <div className="info-bot-icon">
                    <CateIcon />
                  </div>
                  <Tooltip
                    placement="top"
                    title={
                      languageRedux === 1
                        ? `${props.item.amountPost} vị trí tuyển dụng`
                        : languageRedux === 2
                          ? `${props.item.amountPost} recruitment position`
                          : `${props.item.amountPost} 개인 사용자`
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {languageRedux === 1
                        ? `${props.item.amountPost} tin tuyển dụng`
                        : languageRedux === 2
                          ? `${props.item.amountPost} opening jobs`
                          : `${props.item.amountPost} 등록 채용공고`}
                    </Typography>
                  </Tooltip>
                </div>
              </div>
            </div>
          </ImageListItem>
        </ul>
      </Card>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
    </>
  );
};

export default CompanyCard;
