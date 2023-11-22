import React, { useEffect, useState } from 'react';

import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import {
  setAlertSuccess,
  setAlert,
} from 'store/reducer/profileReducer/alertProfileReducer';
// materi
import { Box } from '@mui/material';
import { Space, Popover, Button } from 'antd';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

// @ts-ignore
import profileApi from 'api/profileApi';
import candidateSearch from 'api/apiCandidates';

import ItemApply from '../../pages/Profile/components/Item';

import {
  StarIconBookmark,
  StarIconBookmarked,
} from '#components/Icons/iconCandidate';

import './style.scss';
import ModalShowCv from '#components/Profile/ModalShowCv';
import MuiAlert from '@mui/material/Alert';
import { Stack, AlertProps, Snackbar } from '@mui/material';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import ModalUnlockCandidate from './ModalUnlockCandidate';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import ModalMaxUnlock from './ModalMaxUnlock';
import ModalShowAvatar from './ModalShowAvatar';
import ModalNoneCV from './ModalNoneCv';
import { MessageOutlined } from '@ant-design/icons';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CandidateNewDetail = () => {
  const [candidate, setCandidate] = useState<any>([]);
  const [bookmarkCandidate, setBookmarkCandidate] = useState<any>(0);
  const [total, setTotal] = useState<any>(0);
  const [openModalMaxUnlock, setOpenModalMaxUnlock] = useState<any>(false);
  const [openModalNoneCv, setOpenModalNoneCv] = useState<any>(false);
  const [openModalShowAvatar, setOpenModalShowAvatar] = useState<any>(false);
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [modalShowCvPDF, setModalShowCvPdf] = React.useState<{
    open: boolean;
    urlPdf: string;
  }>({
    open: false,
    urlPdf: '',
  });
  const alertSuccess = useSelector(
    (state: any) => state.alertProfile.alertSuccess,
  );

  const alert = useSelector((state: any) => state.alertProfile.alert);
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const dispatch = useDispatch();

  const dataCandidates = async () => {
    const id = localStorage.getItem('candidateId');
    try {
      if (id) {
        const result = await profileApi.getProfileByAccountId(
          languageRedux === 1 ? 'vi' : 'en',
          id,
        );

        if (result) {
          setCandidate(result.data);
        }
      } else {
        setCandidate([]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    dataCandidates();

    // if (profileV3.typeRoleData !== 1) {
    //   window.open('/', '_parent');
    // }
  }, [languageRedux]);

  const handleUnLockCandidate = async (accountId: string) => {
    const id = localStorage.getItem('candidateId');
    try {
      if (id) {
        const viewProfile: any = await candidateSearch.postCountShowCandidate(
          id,
        );
        if (viewProfile.status === 200) {
          setTotal(viewProfile.total);
          const result = await profileApi.getProfileByAccountId(
            languageRedux === 1 ? 'vi' : 'en',
            id,
          );
          if (result) {
            setCandidate(result.data);
          }
        }
      }
    } catch (error: any) {
      // console.log(error.response);
      error?.response?.data?.message === 'Not enough points' &&
        setOpenModalMaxUnlock(true);
      return;
    }
  };

  const handleClickBookmarkCandidate = async (accountId: string) => {
    try {
      const result = await candidateSearch.postBookmarkCandidate(accountId);
      if (result) {
        dataCandidates();
        if (result.status === 200) {
          dispatch<any>(setAlert(true));
        } else {
          dispatch<any>(setAlertSuccess(true));
        }
      }
    } catch (error) { }
  };

  React.useEffect(() => {
    if (profileV3.length !== 0 && profileV3.typeRoleData === 0) {
      window.open('/', '_parent');
    }
  }, [profileV3]);

  const getBookMark = async () => {
    try {
      const resultBookmark = await candidateSearch.getBookmarkCandidate(
        0,
        1,
        languageRedux === 1 ? 'vi' : 'en',
      );

      if (resultBookmark) {
        setBookmarkCandidate(resultBookmark.data.total);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getBookMark();
  }, []);

  const handleClickItemCv = async (urlPdf: string, id: string) => {
    if (candidate.isUnlocked === false) {
      setOpenModalNoneCv(true);
      return;
    }
    if (candidate.isUnlocked === true && urlPdf !== undefined) {
      setModalShowCvPdf({ open: true, urlPdf });
      return;
    } else {
      // setOpenModalNoneCv(true);
    }
  };

  const handleCloseAlertCv = () => dispatch<any>(setAlertSuccess(false));
  const handleCancleSave = () => dispatch<any>(setAlert(false));

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    // document.title =
    //   language?.company_page?.title_page;
    if (candidate.length !== 0) {
      document.title =
        languageRedux === 1
          ? `HiJob - ${candidate && candidate?.name}`
          : `HiJob - ${candidate && candidate?.name}`;
      logEvent(analytics, 'screen_view' as string, {
        // screen_name: screenName as string,
        page_title: '/candidate-new-detail' as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, candidate]);

  return (
    <div className="candidate-new-detail">
      {/* <Navbar />
      <CategoryDropdown /> */}
      <Box className="containerNewCandidate">
        <div className="candidates-profile-avatar">
          <div className="candidate-profile-avatar">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar
                  onClick={() => {
                    candidate?.isUnlocked === true &&
                      candidate?.avatarPath &&
                      setOpenModalShowAvatar(true);
                  }}
                  style={{
                    height: '70px',
                    width: '70px',
                    filter: `${candidate?.isUnlocked === false ? 'blur(3px)' : ''
                      }`,
                    cursor: `${candidate?.isUnlocked === true && candidate?.avatarPath
                        ? 'pointer'
                        : ''
                      }`,
                  }}
                  alt={candidate?.avatarPath}
                  src={candidate?.avatarPath ? candidate?.avatarPath : ''}
                />
              </Badge>
              <div style={{ marginLeft: '10px' }}>
                <h2>
                  {candidate?.name ? candidate?.name : language?.unupdated}
                </h2>
                <p style={{ lineHeight: '30px' }}>
                  {candidate?.jobTypeName !== null
                    ? candidate?.jobTypeName
                    : language?.unupdated}
                </p>
              </div>
            </div>
            <div className="buttons-candidate">
              {/* {candidate?.isUnlocked === true ? (
                <Button
                  type="primary"
                  disabled={candidate && candidate?.isUnlocked}
                  // onClick={() => handleUnLockCandidate(candidate?.accountId)}
                  style={{ backgroundColor: 'transparent', color: 'black' }}
                >
                  {languageRedux === 1
                    ? 'Mở khóa ứng viên'
                    : 'Unlock Candidates'}
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={candidate && candidate?.isUnlocked}
                  onClick={() => handleUnLockCandidate(candidate?.accountId)}
                >
                  {languageRedux === 1
                    ? 'Mở khóa ứng viên'
                    : 'Unlock Candidates'}
                </Button>
              )} */}

              {/* test */}
              {/* <Button
                type="primary"
                ghost
                className="btn-mess"
                icon={<MessageOutlined />}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}

                // onClick={() => {
                //   console.log(post?.data);
                // }}
              ></Button> */}
              {candidate?.isUnlocked === false && (
                <Popover
                  placement="bottom"
                  color="black"
                  content={
                    languageRedux === 1 ? (
                      <p style={{ color: '#fff' }}>
                        Dùng 1 lượt/Point để xem thông tin liên hệ của ứng viên
                        này
                      </p>
                    ) : (
                      <p style={{ color: '#fff' }}>
                        Use 1 turn/Point to view candidate contact information
                      </p>
                    )
                  }
                >
                  <Button
                    type="primary"
                    disabled={candidate && candidate?.isUnlocked}
                    onClick={() => handleUnLockCandidate(candidate?.accountId)}
                    style={{ backgroundColor: '#252525', color: '#fff' }}
                  >
                    <div className="contentBtn">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 8.28644H16.5V6.03644C16.5 4.84296 16.0259 3.69837 15.182 2.85446C14.3381 2.01054 13.1935 1.53644 12 1.53644C10.8065 1.53644 9.66193 2.01054 8.81802 2.85446C7.97411 3.69837 7.5 4.84296 7.5 6.03644V8.28644H4.5C4.10218 8.28644 3.72064 8.44447 3.43934 8.72578C3.15804 9.00708 3 9.38861 3 9.78644V20.2864C3 20.6843 3.15804 21.0658 3.43934 21.3471C3.72064 21.6284 4.10218 21.7864 4.5 21.7864H19.5C19.8978 21.7864 20.2794 21.6284 20.5607 21.3471C20.842 21.0658 21 20.6843 21 20.2864V9.78644C21 9.38861 20.842 9.00708 20.5607 8.72578C20.2794 8.44447 19.8978 8.28644 19.5 8.28644ZM9 6.03644C9 5.24079 9.31607 4.47773 9.87868 3.91512C10.4413 3.35251 11.2044 3.03644 12 3.03644C12.7956 3.03644 13.5587 3.35251 14.1213 3.91512C14.6839 4.47773 15 5.24079 15 6.03644V8.28644H9V6.03644ZM19.5 20.2864H4.5V9.78644H19.5V20.2864Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>
                        {languageRedux === 1
                          ? 'Mở khóa ứng viên'
                          : 'Unlock Candidates'}
                      </div>
                    </div>
                  </Button>
                </Popover>
              )}

              {candidate?.isUnlocked === true && (
                <Button
                  type="primary"
                  disabled={candidate && candidate?.isUnlocked}
                  // onClick={() => handleUnLockCandidate(candidate?.accountId)}
                  style={{ background: '#AAAAAA', color: '#fff' }}
                >
                  <div className="contentBtn">
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 8.28644H16.5V6.03644C16.5 4.84296 16.0259 3.69837 15.182 2.85446C14.3381 2.01054 13.1935 1.53644 12 1.53644C10.8065 1.53644 9.66193 2.01054 8.81802 2.85446C7.97411 3.69837 7.5 4.84296 7.5 6.03644V8.28644H4.5C4.10218 8.28644 3.72064 8.44447 3.43934 8.72578C3.15804 9.00708 3 9.38861 3 9.78644V20.2864C3 20.6843 3.15804 21.0658 3.43934 21.3471C3.72064 21.6284 4.10218 21.7864 4.5 21.7864H19.5C19.8978 21.7864 20.2794 21.6284 20.5607 21.3471C20.842 21.0658 21 20.6843 21 20.2864V9.78644C21 9.38861 20.842 9.00708 20.5607 8.72578C20.2794 8.44447 19.8978 8.28644 19.5 8.28644ZM9 6.03644C9 5.24079 9.31607 4.47773 9.87868 3.91512C10.4413 3.35251 11.2044 3.03644 12 3.03644C12.7956 3.03644 13.5587 3.35251 14.1213 3.91512C14.6839 4.47773 15 5.24079 15 6.03644V8.28644H9V6.03644ZM19.5 20.2864H4.5V9.78644H19.5V20.2864Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div>
                      {languageRedux === 1
                        ? 'Mở khóa ứng viên'
                        : 'Unlock Candidates'}
                    </div>
                  </div>
                </Button>
              )}

              <Button
                type="primary"
                onClick={(event) => {
                  handleClickItemCv(
                    candidate?.profilesCvs.filter((value: any) => {
                      if (value.status === 1) {
                        return value.pdfURL;
                      }
                    })[0].pdfURL,
                    candidate?.accountId,
                  );
                }}
              >
                {candidate?.isUnlocked === true
                  ? candidate?.profilesCvs[0]?.pdfURL !== undefined
                    ? languageRedux === 1
                      ? 'Xem hồ sơ'
                      : 'Have a resume'
                    : languageRedux === 1
                      ? 'Không có hồ sơ'
                      : 'Not have a resume'
                  : languageRedux === 1
                    ? 'Xem hồ sơ'
                    : 'View resume'}
              </Button>

              <div
                className="bookmarkIconStart"
                onClick={() =>
                  handleClickBookmarkCandidate(candidate?.accountId)
                }
              >
                {candidate?.isBookmarked ? (
                  <StarIconBookmarked />
                ) : (
                  <StarIconBookmark />
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              marginTop: '20px',
              overflowWrap: 'break-word',
              color: '#575757',
              fontSize: '14px',
            }}
          >
            {candidate?.introduction
              ? candidate?.introduction
              : language?.unupdated}
          </div>
        </div>
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>
              {languageRedux === 1
                ? 'Thông tin cá nhân'
                : 'Candidate information'}
            </h3>
          </div>
          <div className="info-detail">
            <div className="div-detail-row left">
              <p>{language?.date_of_birth}</p>
              <p>{language?.sex}</p>
              <p>{language?.location}</p>
            </div>
            <div className="div-detail-row right">
              <p>
                {!candidate?.isUnlocked
                  ? moment(candidate?.birthdayData)
                    .format('DD/MM/YYYY')
                    .replace(/\d{2}$/, 'xx')
                  : candidate?.isUnlocked
                    ? moment(candidate?.birthdayData).format('DD/MM/YYYY')
                    : language?.unupdated}
              </p>
              <p>
                {candidate?.genderText
                  ? candidate?.genderText
                  : language?.unupdated}
              </p>
              <p>
                {candidate?.addressText
                  ? candidate?.addressText.fullName
                  : language?.unupdated}
              </p>
            </div>
          </div>
        </div>

        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{language?.contact_information}</h3>
          </div>
          <div className="info-detail">
            <div className="div-detail-row left">
              <p>{language?.phone_number}</p>
              <p>Email</p>

              <p>Facebook</p>

              <p>LinkedIn</p>
            </div>
            <div className="div-detail-row right">
              <p>
                {candidate?.phoneData
                  ? candidate?.phoneData
                  : language?.unupdated}
              </p>
              <p>
                {candidate?.emailData
                  ? candidate?.emailData
                  : language?.unupdated}
              </p>

              <p>
                {candidate?.facebookData
                  ? candidate?.facebookData
                  : language?.unupdated}
              </p>

              <p>
                {candidate?.linkedinData
                  ? candidate?.linkedinData
                  : language?.unupdated}
              </p>
            </div>
          </div>
        </div>
        {/* 
      <div className="candidate-profile-info">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>CV/ Resume</h3>
        </div>
        <Space wrap className="item-info-work">
          {dataCandidate?.cvUrlPath ? (
            <CVItem
              url={dataCandidate?.cvUrlPath}
              open={open}
              setOpen={setOpen}
              isProfile={false}
              language={language}
            />
          ) : (
            <>{language?.unupdated}</>
          )}
        </Space>
      </div> */}

        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{language?.career_objective}</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profileCategories?.length !== 0
              ? candidate?.profileCategories?.map(
                (item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    {item.parentCategory.fullName}
                    {'/ '}
                    {item.fullName}
                  </Button>
                ),
              )
              : language?.unupdated}
          </Space>
        </div>
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{language?.working_location}</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profileLocations?.length !== 0
              ? candidate?.profileLocations?.map((item: any, index: number) => (
                <Button key={index} className="btn" type="text">
                  {item?.fullName}
                  {', '}
                  {item.province.fullName}
                </Button>
              ))
              : language?.unupdated}
          </Space>
        </div>

        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{language?.education}</h3>
          </div>
          {candidate?.profilesEducations?.length !== 0 ? (
            candidate?.profilesEducations?.map(
              (education: any, index: number) => (
                <ItemApply item={education} key={index} />
              ),
            )
          ) : (
            <div style={{ marginTop: '16px', fontSize: '14px' }}>
              {language?.unupdated}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          ></div>
        </div>

        {/* Work experience */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{language?.working_experience}</h3>
          </div>
          {candidate?.profilesExperiences?.length !== 0 ? (
            candidate?.profilesExperiences?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px', fontSize: '14px' }}>
              {language?.unupdated}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          ></div>
        </div>

        {/* Skills */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Kỹ năng' : 'Skills'}</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profilesSkills?.length !== 0
              ? candidate?.profilesSkills?.map((item: any, index: number) => (
                <Button key={index} className="btn" type="text">
                  <span>{item.skillName}</span>
                  <span>{item.dataLevel.data}</span>
                </Button>
              ))
              : language?.unupdated}
          </Space>
        </div>

        {/* Languages */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Ngoại ngữ' : 'Languages'}</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profilesLanguages?.length !== 0
              ? candidate?.profilesLanguages?.map(
                (item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    <h3>{item.languageName}</h3>
                    <span>{item.dataLevel.data}</span>
                  </Button>
                ),
              )
              : language?.unupdated}
          </Space>
        </div>

        {/* Activities */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Các hoạt động' : 'Activities'}</h3>
          </div>
          {candidate?.profileActivities?.length !== 0 ? (
            candidate?.profileActivities?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px', fontSize: '14px' }}>
              {language?.unupdated}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          ></div>
        </div>

        {/* Reference */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Người giới thiệu' : 'References'}</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profilesReferences?.length !== 0
              ? candidate?.profilesReferences?.map((item: any) => (
                <Button key={item.id} className="btn" type="text">
                  <h3>{item.fullName}</h3>
                  <span>{item.phone}</span>
                  <span>{item.email}</span>
                  <span>{item.description}</span>
                </Button>
              ))
              : language?.unupdated}
          </Space>
        </div>

        {/* Award */}
        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Các giải thưởng' : 'Awards'}</h3>
          </div>
          {candidate?.profileAwards?.length !== 0 ? (
            candidate?.profileAwards?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px', fontSize: '14px' }}>
              {language?.unupdated}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          ></div>
        </div>

        <div className="candidate-profile-info">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h3>{languageRedux === 1 ? 'Sở thích' : 'Hobbies'}</h3>
          </div>
          <Space
            wrap
            className="item-info-work"
            style={{ width: '100%' }}
            direction="vertical"
          >
            {candidate?.profileHobbies ? (
              <p className="textArea">
                {candidate?.profileHobbies.description}
              </p>
            ) : (
              language?.unupdated
            )}
          </Space>
        </div>
      </Box>
      {/* <Footer /> */}
      <ModalShowCv
        modalShowCvPDF={modalShowCvPDF}
        setModalShowCvPdf={setModalShowCvPdf}
      />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={alertSuccess}
          autoHideDuration={3000}
          onClose={handleCloseAlertCv}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlertCv}
            severity="success"
            sx={{ width: '100%', backgroundColor: '#000000' }}
          >
            {languageRedux === 1
              ? 'Bạn đã lưu ứng viên thành công !'
              : 'You have successfully saved the candidate!'}
          </Alert>
        </Snackbar>
      </Stack>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={handleCancleSave}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCancleSave}
            severity="success"
            sx={{ width: '100%', backgroundColor: '#000000' }}
          >
            {languageRedux === 1
              ? 'Bạn đã hủy lưu ứng viên thành công!'
              : 'You have successfully unsaved the candidate!'}
          </Alert>
        </Snackbar>
      </Stack>

      <ModalMaxUnlock
        openModalMaxUnlock={openModalMaxUnlock}
        setOpenModalMaxUnlock={setOpenModalMaxUnlock}
      />

      <ModalShowAvatar
        openModalShowAvatar={openModalShowAvatar}
        setOpenModalShowAvatar={setOpenModalShowAvatar}
        image={candidate?.avatarPath ? candidate?.avatarPath : ''}
      />
      <ModalNoneCV
        openModalNoneCv={openModalNoneCv}
        setOpenModalNoneCv={setOpenModalNoneCv}
        unLock={candidate.isUnlocked}
        urlPdf={candidate?.profilesCvs?.at(0)?.pdfURL}
      />
      {/* <ModalUnlockCandidate /> */}
    </div>
  );
};

export default CandidateNewDetail;
