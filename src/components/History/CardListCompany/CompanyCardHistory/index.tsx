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
  // CateIcon,
  IconBellSaveNewestCompany,
} from '#components/Icons';

import { Space, Tooltip } from 'antd';

// import moment from 'moment';
import bookMarkApi from 'api/bookMarkApi';
import female_null_avatar from '../../../../img/female_null_avatar.png';
import { RootState } from 'store';
import apiCompanyV3 from 'api/apiCompanyV3';
import { CateIcon } from '#components/Icons/iconCandidate';
// import ShowNotificativeSave from '#components/ShowNotificativeSave';
interface Iprops {
  item: any;
  index: number;
  saveCompanyList: boolean;
  setSaveCompanyList: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyCardHistory: React.FC<Iprops> = (props) => {
  const { item, index, saveCompanyList, setSaveCompanyList } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();
  const [checkBookMark, setCheckBookMark] = React.useState(true);
  const [inforCompany, setInforCompany] = React.useState<any>(item);
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
      if (!localStorage.getItem('accessToken')) {
        setOpenModalLogin(true);
        return;
      }
      const result = await apiCompanyV3.postBookmarkCompany(inforCompany?.id);
      if (result) {
        setSaveCompanyList(!saveCompanyList);
        dispatch<any>(setAlertCancleSave(true));
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
                  {inforCompany?.isBookmarked ? (
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
                        ? `${inforCompany?.amountPost} tin tuyển dụng`
                        : languageRedux === 2
                          ? `${inforCompany?.amountPost} opening jobs`
                          : `${inforCompany?.amountPost} 등록 채용공고`
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
                        : languageRedux === 2
                          ? `${inforCompany?.amountPost} recruitment position`
                          : `${inforCompany?.amountPost} 개인 사용자`}
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

export default CompanyCardHistory;
