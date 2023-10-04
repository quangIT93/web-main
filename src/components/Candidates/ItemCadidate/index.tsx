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
} from '#components/Icons/iconCandidate';
import { Tooltip } from 'antd';
import './style.scss';

interface ICadidate {
  item: any;
}

const ItemCadidate: React.FC<ICadidate> = (props) => {
  const { item } = props;
  const handleClickItemCandidate = (accountId: any) => {};
  console.log('item', item);

  return (
    <div
      className="item-candidate"
      onClick={() => handleClickItemCandidate(item.accountId)}
    >
      <div className="wrap-img_candidate">
        <img src={item?.imageData?.avatar} alt="" className="img-candidate" />
      </div>
      <div className="info-candidate">
        <h3>{item.name}</h3>
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
            <span>Dai hoc</span>
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
              <span className="location-item">
                {item.profilesLocationsData.map((loc: any) => {
                  return `${loc.fullName}, `;
                })}
              </span>
            </Tooltip>
          </li>
          <li>
            <span>
              <CateIcon />
            </span>
            <span>Design</span>
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
