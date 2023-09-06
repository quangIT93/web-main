import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';

// data
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/reducer/profileReducer/alertProfileReducer';
// import { RootState } from 'store/reducer';
import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

// import { Input } from 'antd';

// import './style.scss';

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

interface IModalActivity {
    openModalAward: boolean;
    setOpenModalAward: React.Dispatch<React.SetStateAction<boolean>>;
    setAwardValues: React.Dispatch<React.SetStateAction<any>>;
}
const ModalAward: React.FC<IModalActivity> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const language = useSelector((state: RootState) => state.dataLanguage.languages);
    const { openModalAward, setOpenModalAward, setAwardValues } =
        props;
    const [award, setAward] = React.useState({
        title: '',
        company: '',
        description: '',
    })

    const handleClose = () => setOpenModalAward(false);

    const handleOnchangeTitle = (e: any) => {
        setAward((prev: any) => {
            return {
                ...prev,
                title: e.target.value
            }
        })
    }
    const handleOnchangeDescription = (e: any) => {
        setAward((prev: any) => {
            return {
                ...prev,
                description: e.target.value
            }
        })
    }
    const handleOnchangeCompany = (e: any) => {
        setAward((prev: any) => {
            return {
                ...prev,
                company: e.target.value
            }
        })
    }

    const handleSubmit = () => {
        setAwardValues((prev: any) => [
            award,
            ...prev
        ])
        setAward({
            title: '',
            company: '',
            description: '',
        })
        setOpenModalAward(false)
    }

    return (
        <Modal
            open={openModalAward}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-award-container"
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
                            "Thêm thông tin giải thưởng" :
                            "Add Award"
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
                                "Tiêu đề giải thưởng" : "Award Title"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={award.title}
                        onChange={handleOnchangeTitle}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Tiêu đề giải thưởng" : "Award Title"
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
                                "Tên công ty" : "Company"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={award.company}
                        onChange={handleOnchangeCompany}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Tên công ty" : "Company"
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
                                "Miêu tả" : "Description"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={award.description}
                        onChange={handleOnchangeDescription}
                        // onKeyDown={(e: any) => handleKeyPress(e)}
                        // onPressEnter={(e: any) => handleKeyPress(e)}
                        multiline
                        rows={6}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1
                                ? 'Mô tả giải thưởng của bạn'
                                : 'Description your award'
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

export default ModalAward;
