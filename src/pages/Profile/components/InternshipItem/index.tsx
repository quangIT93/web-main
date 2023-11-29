import React, { useState } from 'react';
// @ts-ignore

import { Space, message } from 'antd';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import './style.scss';

import { PencilIcon, DeleteIcon } from '#components/Icons';
import moment from 'moment';
import languageApi from 'api/languageApi';

import { RootState } from '../../../../store/reducer/index';
import { useDispatch, useSelector } from 'react-redux';
import ModalInternship from '#components/Profile/ModalInternship';
import ModalEditInternship from '#components/Profile/ModalEditInternship';
import ModalEditActivity from '#components/Profile/ModalEditAcivity';
import apiCv from 'api/apiCv';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';
import ModalDeleteActivities from '#components/Profile/ModalDeleteActivities';
interface IInternshipProps {
  typeItem?: any;
  index: number;
  item?: {
    id: any;
    title: String;
    organization: String;
    startDate: any;
    endDate: any;
    description: String;
  };
  internshipValues: any;
  setInternshipValues: React.Dispatch<React.SetStateAction<any>>;
  activityValue: any;
  setActivityValues: React.Dispatch<React.SetStateAction<any>>;
}

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const InternshipItem: React.FC<IInternshipProps> = (props) => {
  const {
    typeItem,
    index,
    item,
    internshipValues,
    setInternshipValues,
    activityValue,
    setActivityValues,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [internshipId, setInternshipId] = useState<any>();
  const [activityId, setActivityId] = useState<any>();
  const [openModalEditInternship, setOpenModalEditInternship] = useState(false);
  const [openModalEditActiviy, setOpenModalEditActiviy] = useState(false);
  const [openModalDeleteActivities, setOpenModalDeleteActivities] =
    useState(false);
  // console.log("index", index);
  const dispatch = useDispatch();

  const handlleUpdateInternship = (id?: number | null) => {
    if (typeItem === 1) {
      setOpenModalEditInternship(true);
      setInternshipId(item?.id);
    } else {
      setOpenModalEditActiviy(true);
      setActivityId(item?.id);
    }
  };

  // console.log("active", activityValue);
  const handleDeleteInternship = async () => {
    setOpenModalDeleteActivities(true);
  };

  // console.log('item?.start_date', item?.start_date);
  return (
    <div className="internship-item" key={index}>
      <div className="div-item-left">
        <div className="div-time-line">
          <div
            style={{
              height: '10px',
              width: '10px',
              borderRadius: '10px',
              backgroundColor: '#0D99FF',
            }}
          ></div>
          <div
            style={{ width: '3px', height: '100%', backgroundColor: '#0D99FF' }}
          ></div>
        </div>
        <div className="div-info-item">
          <Space
            size={4}
            direction="vertical"
            style={{ marginLeft: 10, wordBreak: 'break-word' }}
          >
            <h3>{item?.title}</h3>
            <p>{item?.organization}</p>
            <p>
              {`${moment(item?.startDate).format('MM/YYYY')}`} - {` `}
              {`${moment(item?.endDate).format('MM/YYYY')}`}
            </p>

            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: '15px',
                color: '#575757',
                wordBreak: 'break-all',
              }}
            >
              {item?.description}
            </div>
          </Space>
        </div>
      </div>
      <div className="div-item-right">
        <Space
          onClick={
            // typeItem === 'experiences'
            //   ? () => handleUpdateExperience(item?.id)
            //   : () => handleUpdateEducation(item?.id)
            () => handlleUpdateInternship()
          }
          style={{ cursor: 'pointer' }}
        >
          <div className="edit-icon">
            <PencilIcon width={15} height={15} />
          </div>

          <p style={{ color: '#0D99FF', fontSize: '14px' }}>{languageRedux === 1
            ? 'Sửa'
            : languageRedux === 2
              ? 'Edit'
              : '고치다'}</p>
        </Space>
        <Space
          onClick={
            // typeItem === 'experiences'
            //   ? () => handleDeleteExperience(item?.id)
            //   : () => handleDeleteEducation(item?.id)
            () => handleDeleteInternship()
          }
          style={{ cursor: 'pointer', marginRight: '16px' }}
        >
          <div className="edit-icon">
            <DeleteIcon width={15} height={15} />
          </div>
          <p style={{ color: '#575757', fontSize: '14px' }}>
            {languageRedux === 1
              ? 'Xóa'
              : languageRedux === 2
                ? 'Delete'
                : '삭제'}
          </p>
        </Space>
      </div>
      {/* <ModalEditInternship
        openModalEditInternship={openModalEditInternship}
        setOpenModalEditInternship={setOpenModalEditInternship}
        setInternshipValues={setInternshipValues}
        internshipId={internshipId}
        internshipValues={internshipValues}
      /> */}
      <ModalEditActivity
        openModalEditActivity={openModalEditActiviy}
        setOpenModalEditActiviy={setOpenModalEditActiviy}
        setActivityValues={setActivityValues}
        activityId={activityId}
        activityValue={activityValue}
      />
      <ModalDeleteActivities
        openModalDeleteActivities={openModalDeleteActivities}
        setOpenModalDeleteActivities={setOpenModalDeleteActivities}
        activitiesId={[activityValue?.id]}
        activityValue={activityValue}
        deleteAll={false}
      />
    </div>
  );
};

export default InternshipItem;
