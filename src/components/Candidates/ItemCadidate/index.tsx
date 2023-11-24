import React from 'react';

import moment from 'moment';
// import icon
// @ts-ignore
import {
  PersonIcon,
  SchoolIcon,
  LocationIcon,
  CateIcon,
  CalendarIcon,
  GenderIcon,
  CandidateHijob,
} from '#components/Icons/iconCandidate';
import { Tooltip } from 'antd';
import './style.scss';
import candidateSearch from 'api/apiCandidates';
import { useSelector } from 'react-redux';
// import redux
import { RootState } from 'store';
import { Link } from 'react-router-dom';
// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';
import male_null_avatar from '../../../img/male_null_avatar.png';
import female_null_avatar from '../../../img/female_null_avatar.png';
import ModalLogin from '#components/Home/ModalLogin';
import ModalNoteWorker from '#components/Home/NewestGigWorker/ModalNoteWorker';
import ModalNotRecruitment from '../ModalNotRecruitment';
import { IconEmail, PhoneIcon } from '#components/Icons';
interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const { item } = props;
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);
  const [openModalNotRecruitment, setOpenModalNotRecruitment] =
    React.useState(false);
  const handleClickItemCandidate = async (accountId: any) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    try {
      // const result = await candidateSearch.postCountShowCandidate(
      //   item.accountId,
      // );

      // if (result) {
      // }
      if (profileV3.typeRoleData === 1) {
        localStorage.setItem('candidateId', accountId);
        window.open('/candidate-new-detail');
      } else {
        // console.log(profileV3);
        // setOpenModalNoteWorker(true);
        setOpenModalNotRecruitment(true);
        // window.open('/page-cv');
        return;
      }
    } catch (error) {
      if (profileV3.typeRoleData === 0) {
        window.open('/', '_parent');
      }
    }
  };

  return (
    <>
      <div
        className="item-candidate"
        onClick={() => {
          handleClickItemCandidate(item.accountId);
        }}
      >
        <div className="item-candidate-content">
          <div className="wrap-img_candidate">
            <img
              src={
                item?.imageData?.avatar
                  ? item?.imageData?.avatar
                  : item.genderData === 'Nam' || item.genderData === 'Male'
                    ? male_null_avatar
                    : female_null_avatar
              }
              style={{
                filter: item?.imageData?.avatar ? 'blur(3px)' : 'none',
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
                  {moment(new Date(item?.birthdayData))
                    .format('yyyy')
                    .replace(/\d{2}$/, 'xx')}
                </span>
              </div>
              <div className="wrap-name-age_item">
                <span className="icon-age_item-candidate">
                  <GenderIcon />
                </span>
                <span>{item.genderData}</span>
              </div>
            </div>
          </div>
          <div className="info-candidate">
            <div className="info-candidate_item">
              <p>{item.name}</p>
              {/* <CandidateHijob /> */}
            </div>
            <ul>
              {/* <li style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="item-birthday item-infoUser">
              <span>
                <PersonIcon />
              </span>
              <span>
                {moment(new Date(item?.birthdayData))
                  .format('yyyy')
                  .replace(/\d{2}$/, 'xx')}
              </span>
            </div>
            <div className="item-gender item-infoUser">
              <span>
                <GenderIcon />
              </span>
              <span>{item.genderData}</span>
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
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'
                  }
                >
                  <span className="text-info-candidate">
                    {item?.hideEmail
                      ? item.hideEmail
                      : languageRedux === 1
                        ? 'Thông tin chưa cập nhật'
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'}
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
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'
                  }
                >
                  <span className="text-info-candidate">
                    {item?.hidePhone
                      ? item.hidePhone
                      : languageRedux === 1
                        ? 'Thông tin chưa cập nhật'
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'}
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
                    item?.categoriesData?.length !== 0
                      ? item.categoriesData?.map((value: any) => {
                          return `${value.fullName}, `;
                        })
                      : languageRedux === 1
                        ? 'Thông tin chưa cập nhật'
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'
                  }
                >
                  <span className="text-info-candidate">
                    {item.categoriesData.length !== 0
                      ? item.categoriesData.map((value: any) => {
                          return `${value.fullName}, `;
                        })
                      : languageRedux === 1
                        ? 'Thông tin chưa cập nhật'
                        : languageRedux === 2
                          ? 'Not updated information'
                          : languageRedux === 3 && '업데이트되지 않은 정보'}
                  </span>
                </Tooltip>
              </li>
            </ul>
            <h2>
              {item?.introduction
                ? item.introduction
                : languageRedux === 1
                  ? 'Thông tin chưa cập nhật'
                  : languageRedux === 2
                    ? 'Not updated information'
                    : languageRedux === 3 && '업데이트되지 않은 정보'}
            </h2>
          </div>
        </div>
      </div>
      <ModalLogin
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />
      <ModalNoteWorker
        openModalNoteWorker={openModalNoteWorker}
        setOpenModalNoteWorker={setOpenModalNoteWorker}
      />
      <ModalNotRecruitment
        openModalNotRecruitment={openModalNotRecruitment}
        setOpenModalNotRecruitment={setOpenModalNotRecruitment}
      />
    </>
  );
};

export default ItemCadidate;
