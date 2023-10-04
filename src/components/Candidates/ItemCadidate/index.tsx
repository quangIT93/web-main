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
  console.log('props', props);

  return (
    <div className="item-candidate">
      <div className="wrap-img_candidate">
        <img src="./images/image 50.png" alt="" className="img-candidate" />
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
                {moment(new Date(item?.updatedAt))
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
                return `${loc.full_name}, `;
              })}
            >
              <span
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  width: '160px',
                  wordBreak: 'break-all',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item.profilesLocationsData.map((loc: any) => {
                  return `${loc.full_name}, `;
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
