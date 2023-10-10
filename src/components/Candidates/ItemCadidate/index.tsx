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

import male_null_avatar from '../../../img/male_null_avatar.png';
import ModalLogin from '#components/Home/ModalLogin';
interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const { item } = props;
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleClickItemCandidate = async (accountId: any) => {
    if (!localStorage.getItem('accessToken')) {
      setOpenModalLogin(true);
      return;
    }
    try {
      const result = await candidateSearch.postCountShowCandidate(
        item.accountId,
      );

      if (result) {
        localStorage.setItem('candidateId', accountId);
        window.open('/candidate-new-detail');
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
        onClick={() => handleClickItemCandidate(item.accountId)}
      >
        <div className="wrap-img_candidate">
          <img
            src={
              item?.imageData?.avatar
                ? item?.imageData?.avatar
                : male_null_avatar
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
              {item.profilesEducationsData.length !== 0 ? (
                item.profilesEducationsData.map((value: any, index: number) => {
                  return (
                    <span className="text-info-candidate" key={index}>
                      {value.data}
                    </span>
                  );
                })
              ) : (
                <span className="text-info-candidate">
                  {languageRedux === 1
                    ? 'Thông tin chưa cập nhật'
                    : 'Not updated information'}
                </span>
              )}
            </li>
            <li>
              <span className="icon-info-candidate">
                <LocationIcon />
              </span>
              <Tooltip
                placement="top"
                title={item.profilesLocationsData.map((loc: any) => {
                  return `${loc.fullName}, `;
                })}
              >
                <span className="text-info-candidate">
                  {item.profilesLocationsData.length !== 0 ? (
                    item.profilesLocationsData.map((loc: any) => {
                      return `${loc.fullName}, `;
                    })
                  ) : (
                    <span className="text-info-candidate">
                      {languageRedux === 1
                        ? 'Thông tin chưa cập nhật'
                        : 'Not updated information'}
                    </span>
                  )}
                </span>
              </Tooltip>
            </li>
            <li>
              <span className="icon-info-candidate">
                <CateIcon />
              </span>
              <span className="text-info-candidate">
                {item.categoriesData.length !== 0 ? (
                  item.categoriesData.map((value: any) => {
                    return `${value.fullName}, `;
                  })
                ) : (
                  <span className="text-info-candidate">
                    {languageRedux === 1
                      ? 'Thông tin chưa cập nhật'
                      : 'Not updated information'}
                  </span>
                )}
              </span>
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
    </>
  );
};

export default ItemCadidate;
