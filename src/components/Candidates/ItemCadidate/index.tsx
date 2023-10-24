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
interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const { item } = props;
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const roleRedux = useSelector(
    (state: RootState) => state.changeRole.role,
  );
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [openModalNoteWorker, setOpenModalNoteWorker] = React.useState(false);
  const [openModalNotRecruitment, setOpenModalNotRecruitment] = React.useState(false);
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
      if (roleRedux === 1) {
        localStorage.setItem('candidateId', accountId);
        window.open('/candidate-new-detail');
      } else {
        console.log(profileV3);
        // setOpenModalNoteWorker(true);
        setOpenModalNotRecruitment(true)
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
                <SchoolIcon />
              </span>
              <Tooltip
                placement="top"
                title={
                  item?.profilesEducationsData?.length !== 0
                    ? item.profilesEducationsData?.map((value: any) => {
                      return `${value.data}, `;
                    })
                    : languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.profilesEducationsData.length !== 0
                    ? item.profilesEducationsData.map(
                      (value: any, index: number) => {
                        return `${value.data}, `;
                      },
                    )
                    : languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <LocationIcon />
              </span>
              <Tooltip
                placement="top"
                title={
                  item?.profilesLocationsData?.length !== 0
                    ? item.profilesLocationsData?.map((value: any) => {
                      return `${value.fullName}, `;
                    })
                    : languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.profilesLocationsData.length !== 0
                    ? item.profilesLocationsData.map((loc: any) => {
                      return `${loc.fullName}, `;
                    })
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
                  item?.categoriesData?.length !== 0
                    ? item.categoriesData?.map((value: any) => {
                      return `${value.fullName}, `;
                    })
                    : languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'
                }
              >
                <span className="text-info-candidate">
                  {item.categoriesData.length !== 0
                    ? item.categoriesData.map((value: any) => {
                      return `${value.fullName}, `;
                    })
                    : languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <CalendarIcon />
              </span>
              <span className="text-info-candidate">
                {moment(new Date(item?.updatedAt)).format('DD/MM/yyyy')}
              </span>
            </li>
          </ul>
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
