import React, { useEffect } from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';

// data
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { Input } from 'antd';

import './style.scss';

// const { TextArea } = Input;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 840,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    p: 4,
    '@media (max-width: 399px)': {
        width: 360,
    },
    '@media (max-width: 375px)': {
        width: 300,
    },

    '@media (min-width: 400px) and (max-width: 639px)': {
        width: 410,
    },

    '@media (min-width: 640px) and (max-width: 839px)': {
        width: 640,
    },
};

// const styleChildBox = {
//   marginBottom: '12px',
// };

interface IModalInternship {
    openModalEditActivity: boolean;
    setOpenModalActivity: React.Dispatch<React.SetStateAction<boolean>>;
    setActivityValues: React.Dispatch<React.SetStateAction<any>>;
    activityId: any;
    activityValues: any;
}
const ModalEditActivity: React.FC<IModalInternship> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const { openModalEditActivity, setOpenModalActivity, setActivityValues, activityId, activityValues } =
        props;
    const [activity, setActivity] = React.useState({
        title: '',
        employer: '',
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
        description: '',
    })

    const handleGetInternship = async () => {
        if (activityId !== null && activityValues.length > 0) {
            setActivity(activityValues.at(activityId))
        }
    }

    useEffect(() => {
        handleGetInternship()
    }, [])

    const handleClose = () => setOpenModalActivity(false);

    const handleOnchangeTitle = (e: any) => {
        setActivity((prev: any) => {
            return {
                ...prev,
                title: e.target.value
            }
        })
    }
    const handleOnchangeDescription = (e: any) => {
        setActivity((prev: any) => {
            return {
                ...prev,
                description: e.target.value
            }
        })
    }
    const handleOnchangeEmployer = (e: any) => {
        setActivity((prev: any) => {
            return {
                ...prev,
                employer: e.target.value
            }
        })
    }
    const handleOnchangeStartDate = (newValue: any, e: any) => {
        setActivity((prev: any) => {
            return {
                ...prev,
                startDate: new Date(newValue._d).getTime()
            }
        })
    }
    const handleOnchangeEndDate = (newValue: any, e: any) => {
        setActivity((prev: any) => {
            return {
                ...prev,
                endDate: new Date(newValue._d).getTime()
            }
        })
    }

    const handleSubmit = () => {
        activityValues.splice(activityId, 1, activity)
        setActivityValues(activityValues)
        setOpenModalActivity(false)
    }

    return (
        <Modal
            open={openModalEditActivity}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-activity-container"
        >
            <Box sx={style}
                className="Modal-personnal-info">
                <div
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        cursor: 'pointer',
                        // border: '1px solid',
                        borderRadius: '50%',
                        padding: '1px',
                    }}
                    onClick={handleClose}
                >
                    <CloseOutlined style={{ fontSize: '30px' }} />
                </div>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    align="center"
                    sx={{ marginBottom: '12px' }}
                >
                    {
                        languageRedux === 1 ?
                            "Sửa thông tin thực tập" :
                            "Edit Internship"
                    }
                </Typography>
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography
                        // sx={styleLabel}
                        variant="body1"
                        component="label"
                        htmlFor="nameProfile"
                    >
                        {
                            languageRedux === 1 ?
                                "Tiêu đề công việc" : "Job Title"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={activity.title}
                        onChange={handleOnchangeTitle}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Tiêu đề công việc" : "Job Title"
                        }
                    // error={titleError} // Đánh dấu lỗi
                    />
                </Box>
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography
                        // sx={styleLabel}
                        variant="body1"
                        component="label"
                        htmlFor="nameProfile"
                    >
                        {
                            languageRedux === 1 ?
                                "Nhà tuyển dụng" : "Employer"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={activity.employer}
                        onChange={handleOnchangeEmployer}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Nhà tuyển dụng" : "Employer"
                        }
                    // error={titleError} // Đánh dấu lỗi
                    />
                </Box>
                <Box sx={{ marginBottom: '12px' }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer
                            components={['DatePicker']}
                        //   sx={{ display: 'flex' }}
                        >
                            <div className="activity-time-wraper">
                                <Typography
                                    // sx={styleLabel}
                                    variant="body1"
                                    component="label"
                                    htmlFor="nameProfile"
                                >
                                    {
                                        languageRedux === 1 ?
                                            "Ngày bắt đầu" : "Start date"
                                    }{' '}
                                    <span className="color-asterisk">*</span>
                                </Typography>
                                <DatePicker
                                    value={moment(activity.startDate)}
                                    onChange={handleOnchangeStartDate}
                                    views={['year', 'month']}
                                    openTo="month"
                                    format="MM/YYYY"
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginBottom: '12px' }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer
                            components={['DatePicker']}
                        //   sx={{ display: 'flex' }}
                        >
                            <div className="activity-time-wraper">
                                <Typography
                                    // sx={styleLabel}
                                    variant="body1"
                                    component="label"
                                    htmlFor="nameProfile"
                                >
                                    {
                                        languageRedux === 1 ?
                                            "Ngày kết thúc" : "End date"
                                    }{' '}
                                    <span className="color-asterisk">*</span>
                                </Typography>
                                <DatePicker
                                    value={moment(activity.endDate)}
                                    onChange={handleOnchangeEndDate}
                                    views={['year', 'month']}
                                    openTo="month"
                                    format="MM/YYYY"
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography
                        // sx={styleLabel}
                        variant="body1"
                        component="label"
                        htmlFor="nameProfile"
                    >
                        {
                            languageRedux === 1 ?
                                "Miêu tả" : "Description"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={activity.description}
                        onChange={handleOnchangeDescription}
                        // onKeyDown={(e: any) => handleKeyPress(e)}
                        // onPressEnter={(e: any) => handleKeyPress(e)}
                        multiline
                        rows={6}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1
                                ? 'Mô tả quá trình thực tập của bạn'
                                : 'Description your activity'
                        }
                    // error={titleError} // Đánh dấu lỗi
                    />
                </Box>
                <Button
                    variant="contained" fullWidth
                    onClick={handleSubmit}
                >
                    {language?.profile_page?.save_info}
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalEditActivity;
