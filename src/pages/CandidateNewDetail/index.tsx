import React, { useEffect, useState } from 'react';

import moment from 'moment';
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
import ItemApply from '../../pages/Profile/components/Item';

import { StarIconBookmark } from '#components/Icons/iconCandidate';

import './style.scss';

const CandidateNewDetail = () => {
  const [candidate, setCandidate] = useState<any>(null);
  const dataCandidates = async () => {
    const id = 'f429b393-8367-4a5d-8b74-48cc3f29c4d8';
    try {
      const result = await profileApi.getProfileByAccountId('vi', id);

      if (result) {
        setCandidate(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('candidate', candidate);

  useEffect(() => {
    dataCandidates();
  }, []);

  return (
    <div className="candidate-new-detail">
      <Navbar />
      <Box sx={{ marginTop: '10px' }} className="containerNewCandidate">
        <div className="candidate-profile-avatar">
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
                  style={{ height: '70px', width: '70px' }}
                  alt="U"
                  src={candidate?.avatarPath ? candidate?.avatarPath : ''}
                />
              </Badge>
              <div style={{ marginLeft: '10px' }}>
                <h2>{candidate?.name ? candidate?.name : 'Chưa cập nhật'}</h2>
              </div>
            </div>
            <div className="buttons-candidate">
              <Button
                type="primary"
                onClick={() => window.open(`/profile/`, '_parent')}
              >
                Unlock Candidates
              </Button>

              <Button
                type="primary"
                onClick={() => window.open(`/profile/`, '_parent')}
              >
                View Resume
              </Button>

              <div className="bookmarkIconStart">
                <StarIconBookmark />
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
              : 'Chưa cập nhật'}
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
            <h3>Thông tin ứng viên</h3>
          </div>
          <div className="info-detail">
            <div className="div-detail-row left">
              <p>Ngày sinh</p>
              <p>Giới tính</p>
              <p>Địa chỉ</p>
            </div>
            <div className="div-detail-row right">
              <p>
                {candidate?.birthdayData
                  ? moment(candidate?.birthdayData)
                      .format('DD/MM/YYYY')
                      .replace(/\d{2}$/, 'xx')
                  : 'Chưa cập nhật'}
              </p>
              <p>
                {candidate?.genderText
                  ? candidate?.genderText === 1
                    ? 'Name'
                    : 'Nữ'
                  : 'Name'}
              </p>
              <p>
                {candidate?.addressText
                  ? candidate?.addressText.fullName
                  : 'Chưa cập nhật'}
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
            <h3>Thông tin liên hệ</h3>
          </div>
          <div className="info-detail">
            <div className="div-detail-row left">
              <p>Số điện thoại</p>
              <p>Email</p>

              <p>Facebook</p>

              <p>LinkedIn</p>
            </div>
            <div className="div-detail-row right">
              <p>
                {candidate?.phoneData ? candidate?.phoneData : 'Chưa cập nhật'}
              </p>
              <p>
                {candidate?.emailData ? candidate?.emailData : 'Chưa cập nhật'}
              </p>

              <p>
                {candidate?.facebookData
                  ? candidate?.facebookData
                  : 'Chưa cập nhật'}
              </p>

              <p>
                {candidate?.linkedinData
                  ? candidate?.linkedinData
                  : 'Chưa cập nhật'}
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
            <h3>Lĩnh vực quan tâm</h3>
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
              : 'Chưa cập nhật'}
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
            <h3>Khu vực làm việc</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profileLocations?.length !== 0
              ? candidate?.profileLocations?.map((item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    {item?.fullName}
                  </Button>
                ))
              : 'Chưa cập nhật'}
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
            <h3>Trình độ học vấn</h3>
          </div>
          {candidate?.profilesEducations?.length !== 0 ? (
            candidate?.profilesEducations?.map(
              (education: any, index: number) => (
                <ItemApply item={education} key={index} />
              ),
            )
          ) : (
            <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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
            <h3>Kinh nghiệm làm việc</h3>
          </div>
          {candidate?.profilesExperiences?.length !== 0 ? (
            candidate?.profilesExperiences?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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
            <h3>Activities</h3>
          </div>
          {candidate?.profileActivities?.length !== 0 ? (
            candidate?.profileActivities?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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
            <h3>Awards</h3>
          </div>
          {candidate?.profileAwards?.length !== 0 ? (
            candidate?.profileAwards?.map((item: any, index: number) => (
              <ItemApply typeItem="experiences" key={index} item={item} />
            ))
          ) : (
            <div style={{ marginTop: '16px' }}>Chưa cập nhật</div>
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
            <h3>Skill</h3>
          </div>
          <Space wrap className="item-info-work">
            {candidate?.profilesSkills?.length !== 0
              ? candidate?.profilesSkills?.map((item: any, index: number) => (
                  <Button key={index} className="btn" type="text">
                    <span>{item.skillName}</span>
                    <span>{item.dataLevel.data}</span>
                  </Button>
                ))
              : 'Chưa cập nhật'}
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
            <h3>Languages</h3>
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
              : 'Chưa cập nhật'}
          </Space>
        </div>
      </Box>
      <Footer />
    </div>
  );
};

export default CandidateNewDetail;
