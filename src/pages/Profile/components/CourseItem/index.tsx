import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';

import './style.scss';
import { DeleteIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import moment from 'moment';

interface ICourseItem {
  item: {
    title: any;
    startDate: any;
    endDate: any;
  };
  index: number;
  setCourseValues: React.Dispatch<React.SetStateAction<any>>;
  courseValues: any;
}

const CourseItem: React.FC<ICourseItem> = (props) => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const { item, index, setCourseValues, courseValues } = props;

  const handleDeleteCourse = (id: number) => {
    setCourseValues(
      courseValues.filter((value: any, index: any) => {
        return index !== id;
      }),
    );
    console.log(id);
  };
  return (
    <div className="skill-item-container">
      <div className="div-item-left">
        <div className="div-info-item">
          <Space
            size={4}
            direction="vertical"
            style={{
              padding: '8px 12px',
              border: '0.5px solid #aaaaaa',
              borderRadius: '10px',
              wordBreak: 'break-word',
            }}
          >
            <h3>{item?.title}</h3>
            <p>
              {`${moment(item?.startDate).format('MM/YYYY')}`} - {` `}
              {`${moment(item?.endDate).format('MM/YYYY')}`}
            </p>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={() => handleDeleteCourse(index)}
          style={{ cursor: 'pointer', marginRight: '16px' }}
        >
          <div className="edit-icon">
            <DeleteIcon width={15} height={15} />
          </div>
          <p style={{ color: '#575757', fontSize: '14px' }}>
            {language?.profile_page?.delete}
          </p>
        </Space>
      </div>
    </div>
  );
};

export default CourseItem;
