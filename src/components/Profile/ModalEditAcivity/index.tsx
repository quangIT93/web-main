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
import apiCv from 'api/apiCv';
import { message } from 'antd';
import profileApi from 'api/profileApi';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

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
    setOpenModalEditActiviy: React.Dispatch<React.SetStateAction<boolean>>;
    setActivityValues: React.Dispatch<React.SetStateAction<any>>;
    activityId: any;
    activityValue: any;
}
const ModalEditActivity: React.FC<IModalInternship> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const { openModalEditActivity, setOpenModalEditActiviy, setActivityValues, activityId, activityValue } =
        props;
    const [activity, setActivity] = React.useState({
        id: activityValue?.id,
        title: activityValue?.title,
        organization: activityValue?.organization,
        startDate: activityValue?.startDate,
        endDate: activityValue?.endDate,
        description: activityValue?.description,
    })

    const dispatch = useDispatch()

    const handleClose = () => setOpenModalEditActiviy(false);

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
                organization: e.target.value
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

    const validValue = () => {

        if (activity.title.trim().length > 250 || activity.title.trim().length === 0) {
            return {
                messageError: languageRedux === 1 ?
                    "Độ dài tiêu đề phải lớn hơn 0 và nhỏ hơn 250" :
                    "Title length must be greater than 0 and less than 250",
                checkForm: false
            }
        }

        if (activity.organization.trim().length > 250 || activity.organization.trim().length === 0) {
            return {
                messageError: languageRedux === 1 ?
                    "Độ dài nhà tuyển dụng phải lớn hơn 0 và nhỏ hơn 250" :
                    "Employer length must be greater than 0 and less than 250",
                checkForm: false
            }
        }

        if (activity.description.trim().length > 1000 || activity.description.trim().length === 0) {
            return {
                messageError: languageRedux === 1 ?
                    "Độ dài mô tả phải lớn hơn 0 và nhỏ hơn 1000" :
                    "Description length must be greater than 0 and less than 1000",
                checkForm: false
            }
        }

        return {
            messageError: '',
            checkForm: true
        }
    }

    const handleSubmit = async () => {
        try {
            const { messageError, checkForm } = validValue()
            if (checkForm) {
                const result = await apiCv.putProifileActivities(
                    activity.title.trim(),
                    activity.organization.trim(),
                    activity.description.trim(),
                    activity.startDate,
                    activity.endDate,
                    activity.id
                )
                if (result) {
                    const resultProfile = await profileApi.getProfileV3(
                        languageRedux === 1 ? 'vi' : 'en',
                    );

                    resultProfile &&
                        dispatch(setProfileV3(resultProfile));
                    message.success(
                        languageRedux === 1 ?
                            "Cập nhật thông tin thành công !" :
                            "Update information successfully !"
                    )
                    // activityValue.splice(activityId, 1, activity)
                    // setActivityValues(activityValue)
                    setOpenModalEditActiviy(false)
                }
            } else {
                message.error(messageError)
            }
        } catch (error) {
            console.log(error)
        }
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
                            "Sửa thông tin hoạt động" :
                            "Edit Activity"
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
                                "Tiêu đề hoạt động" : "Function Title"
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
                                "Tiêu đề hoạt động" : "Function Title"
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
                        value={activity.organization}
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
                                "Mô tả" : "Description"
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
