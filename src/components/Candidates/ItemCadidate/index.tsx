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
interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const { item } = props;
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const handleClickItemCandidate = async (accountId: any) => {
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
    <div
      // to="/sdasdasdasdasd"
      className="item-candidate"
      onClick={() => handleClickItemCandidate(item.accountId)}
    >
      <div className="wrap-img_candidate">
        <img src={item?.imageData?.avatar} alt="" className="img-candidate" />
      </div>
      <div className="info-candidate">
        <div className="info-candidate_item">
          <p>{item.name}</p>
          {/* <CandidateHijob /> */}
        </div>
        <ul>
          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </li>
          <li>
            <span>
              <SchoolIcon />
            </span>
            {item.profilesEducationsData.length !== 0
              ? item.profilesEducationsData.map((value: any, index: number) => {
                  return <span key={index}>{value.data}</span>;
                })
              : 'Chưa cập nhật'}
          </li>
          <li>
            <span>
              <LocationIcon />
            </span>
            <Tooltip
              placement="top"
              title={item.profilesLocationsData.map((loc: any) => {
                return `${loc.fullName}, `;
              })}
            >
              <span className="text-info-candidate">
                {item.profilesLocationsData.length !== 0
                  ? item.profilesLocationsData.map((loc: any) => {
                      return `${loc.fullName}, `;
                    })
                  : 'Chưa cập nhật'}
              </span>
            </Tooltip>
          </li>
          <li>
            <span>
              <CateIcon />
            </span>
            <span className="text-info-candidate">
              {item.categoriesData.length !== 0
                ? item.categoriesData.map((value: any) => {
                    return `${value.fullName}, `;
                  })
                : 'Chưa cập nhật'}
            </span>
          </li>
          <li>
            <span>
              <CalendarIcon />
            </span>
            <span>
              {moment(new Date(item?.updatedAt)).format('DD/MM/yyyy')}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ItemCadidate;
