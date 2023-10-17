import React, { useEffect, useState } from 'react';

import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import {
  setAlertSuccess,
  setAlert,
} from 'store/reducer/profileReducer/alertProfileReducer';
// materi
import { Box, Typography } from '@mui/material';
import { Space, Tooltip } from 'antd';
import { Button, Skeleton } from 'antd';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';
import profileApi from 'api/profileApi';
import candidateSearch from 'api/apiCandidates';

import ItemApply from '../../pages/Profile/components/Item';

import {
  StarIconBookmark,
  StarIconBookmarked,
} from '#components/Icons/iconCandidate';

import './style.scss';
import ModalShowCv from '#components/Profile/ModalShowCv';
import CategoryDropdown from '#components/CategoryDropdown';
import MuiAlert from '@mui/material/Alert';
import { Stack, AlertProps, Snackbar } from '@mui/material';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import ModalUnlockCandidate from './ModalUnlockCandidate';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import ModalMaxUnlock from './ModalMaxUnlock';
import ModalNoneCV from './ModalNoneCv';

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
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
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
        const viewProfile: any = await candidateSearch.postCountShowCandidate(id);
        if (viewProfile.status === 200) {
          if (viewProfile.total === 0) {
            setOpenModalMaxUnlock(true);
            return;
          }
          setTotal(viewProfile.total);
          const result = await profileApi.getProfileByAccountId(
            languageRedux === 1 ? 'vi' : 'en', id);
          if (result) {
            setCandidate(result.data);
          }
        }
      }
    } catch (error) { }
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
    if (candidate.isUnlocked === true && urlPdf !== undefined) {
      setModalShowCvPdf({ open: true, urlPdf });
      return
    } else {
      setOpenModalNoneCv(true)
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
      <Navbar />
      <CategoryDropdown />
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
                  style={{ height: '70px', width: '70px', filter: 'blur(3px)' }}
                  alt={candidate?.avatarPath}
                  src={candidate?.avatarPath ? candidate?.avatarPath : ''}
                />
              </Badge>
              <div style={{ marginLeft: '10px' }}>
                <h2>
                  {candidate?.name ? candidate?.name : language?.unupdated}
                </h2>
              </div>
            </div>
            <div className="buttons-candidate">
              {candidate?.isUnlocked === true ? (
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
              )}

              <Button
                type="primary"
                onClick={(event) => {
                  handleClickItemCv(
                    candidate?.profilesCvs[0]?.pdfURL,
                    candidate?.accountId,
                  );
                }}
              >
                {languageRedux === 1 ? 'Xem hồ sơ' : 'View Resume'}
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
                ? 'Thông tin ứng viên'
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
            <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
            <h3>{language?.working_experience}</h3>
          </div>
          {candidate?.profilesExperiences?.length !== 0 ? (
            candidate?.profilesExperiences?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
            <h3>{languageRedux === 1 ? 'Các hoạt động' : 'Activities'}</h3>
          </div>
          {candidate?.profileActivities?.length !== 0 ? (
            candidate?.profileActivities?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
            <h3>{languageRedux === 1 ? 'Các giải thưởng' : 'Awards'}</h3>
          </div>
          {candidate?.profileAwards?.length !== 0 ? (
            candidate?.profileAwards?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>{language?.unupdated}</div>
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
                    <span>{item.languageName}</span>
                    <span>{item.dataLevel.data}</span>
                  </Button>
                ),
              )
              : language?.unupdated}
          </Space>
        </div>
      </Box>
      <Footer />
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
