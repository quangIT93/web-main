import React, { useEffect } from 'react';

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
  CateIcon,
  IconBellSaveNewestCompany,
} from '#components/Icons';

import { Space, Tooltip } from 'antd';

// import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';
import female_null_avatar from '../../../../img/female_null_avatar.png';
import { RootState } from 'store';
import apiCompanyV3 from 'api/apiCompanyV3';
// import ShowNotificativeSave from '#components/ShowNotificativeSave';
interface Iprops {
  item: any;
  index: number;
  saveCompanyList: boolean;
  setSaveCompanyList: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyViewCardHistory: React.FC<Iprops> = (props) => {
  const { item, index, saveCompanyList, setSaveCompanyList } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();
  const [inforCompany, setInforCompany] = React.useState<any>(item);
  const [checkBookMark, setCheckBookMark] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.open(`/detail-company?companyId=${id}`, '_parent');
  };

  useEffect(() => {
    setInforCompany(item);
  }, [item]);

  const handleSaveCompany = async (e: any) => {
    try {
      e.stopPropagation();
      // console.log('props.item ', props.item);
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
        return;
      }
      if (props.item.isBookmarked) {
        const result = await apiCompanyV3.postBookmarkCompany(inforCompany?.id);
        props.item.isBookmarked = false;
        if (result) {
          setCheckBookMark(!checkBookMark);
          dispatch<any>(setAlertCancleSave(true));
        }
      } else {
        const result = await apiCompanyV3.postBookmarkCompany(inforCompany?.id);
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

  console.log('props.item.bookmarked = ', props.item);

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
          handleClickItem(e, inforCompany?.id);
        }}
        className="company-card-history-container"
        key={index}
      >
        <ul className="div-card-company-history_content">
          <ImageListItem
            key={inforCompany?.logoPath}
            sx={{
              flex: 1,
              display: 'flex',
              // justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <img
              src={inforCompany?.logoPath}
              srcSet={inforCompany?.logoPath}
              alt={inforCompany?.name}
              loading="lazy"
              style={{
                width: '76px',
                height: '76px',
                // borderRadius: 10,
              }}
            />
            <div className="div-card-company-history_info">
              {/* {' '} */}
              <div className="div-card-company-history_info__title">
                <Tooltip placement="top" title={inforCompany?.name}>
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
                      color: '#575757',
                    }}
                  >
                    {inforCompany?.name}
                  </Typography>
                </Tooltip>
                <div onClick={(e: any) => handleSaveCompany(e)}>
                  {props.item.isBookmarked ? (
                    <IconBellSaveNewestCompany width={24} height={24} />
                  ) : (
                    <IconBellNewestCompany width={24} height={24} />
                  )}
                </div>
              </div>
              <div className="div-card-company-history_info__bot">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    maxWidth: '100px',
                  }}
                >
                  <LocationHomeIcon />
                  <Tooltip
                    placement="top"
                    title={
                      inforCompany?.companyLocation?.district?.province
                        ?.fullName
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {
                        inforCompany?.companyLocation?.district?.province
                          ?.fullName
                      }
                    </Typography>
                  </Tooltip>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    maxWidth: '100px',
                  }}
                >
                  <CateIcon />
                  <Tooltip
                    placement="top"
                    title={
                      languageRedux === 1
                        ? `${inforCompany?.amountPost} vị trí tuyển dụng`
                        : `${inforCompany?.amountPost} apllication position`
                    }
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        maxWidth: '100px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginLeft: '4px',
                      }}
                    >
                      {languageRedux === 1
                        ? `${inforCompany?.amountPost} vị trí tuyển dụng`
                        : `${inforCompany?.amountPost} apllication position`}
                    </Typography>
                  </Tooltip>
                </div>
              </div>
            </div>
          </ImageListItem>
        </ul>
      </Card>
    </>
  );
};

export default CompanyViewCardHistory;
