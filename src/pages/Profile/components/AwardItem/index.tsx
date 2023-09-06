import React, { useState } from 'react';
// @ts-ignore

import { Space } from 'antd';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import './style.scss';

import { PencilIcon, DeleteIcon } from '#components/Icons';
import moment from 'moment';
import languageApi from 'api/languageApi';


import { RootState } from '../../../../store/reducer/index';
import { useSelector } from 'react-redux';
import ModalInternship from '#components/Profile/ModalInternship';
import ModalEditInternship from '#components/Profile/ModalEditInternship';
import ModalEditActivity from '#components/Profile/ModalEditAcivity';
import ModalEditAward from '#components/Profile/ModalEditAward';
interface IInternshipProps {
    index: number;
    item?: {
        title: String,
        company: String,
        description: String,
    };
    awardValues: any;
    setAwardValues: React.Dispatch<React.SetStateAction<any>>;
}

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const AwardItem: React.FC<IInternshipProps> = (props) => {
    const {
        index,
        item,
        awardValues,
        setAwardValues,
    } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const [internshipId, setInternshipId] = useState<any>();
    const [activityId, setActivityId] = useState<any>();
    const [openModalEditAward, setOpenModalEditAward] = useState(false);
    console.log("index", index);


    const handleUpdateAward = (id?: number | null) => {
        setOpenModalEditAward(true)
        setActivityId(index)
    }

    const handleDeleteAward = (id: number) => {
        setAwardValues(awardValues.filter((value: any, index: any) => {
            return index !== id
        }))
    }

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
                    <Space size={4} direction="vertical" style={{ marginLeft: 10 }}>
                        <h3>{item?.title}</h3>
                        <p>{item?.company}</p>

                        <div
                            style={{
                                whiteSpace: 'pre-wrap',
                                marginTop: '15px',
                                color: '#575757',
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
                        () => handleUpdateAward(index)
                    }
                    style={{ cursor: 'pointer' }}
                >
                    <div className="edit-icon">
                        <PencilIcon width={15} height={15} />
                    </div>

                    <p style={{ color: '#0D99FF', fontSize: '14px' }}>
                        {
                            language?.edit
                        }
                    </p>
                </Space>
                <Space
                    onClick={
                        // typeItem === 'experiences'
                        //   ? () => handleDeleteExperience(item?.id)
                        //   : () => handleDeleteEducation(item?.id)
                        () => handleDeleteAward(index)
                    }
                    style={{ cursor: 'pointer', marginRight: '16px' }}
                >
                    <div className="edit-icon">
                        <DeleteIcon width={15} height={15} />
                    </div>
                    <p style={{ color: '#575757', fontSize: '14px' }}>
                        {
                            language?.profile_page?.delete
                        }
                    </p>
                </Space>
            </div>
            <ModalEditAward
                openModalEditAward={openModalEditAward}
                setOpenModalEditAward={setOpenModalEditAward}
                setAwardValues={setAwardValues}
                awardId={internshipId}
                awardValues={awardValues}
            />
        </div>
    );
};

export default AwardItem;
