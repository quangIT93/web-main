import React from "react";
import { Box, TextField, Modal, Typography, MenuItem, Button } from '@mui/material';
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface IModalSkills {
    openModallanguages: boolean;
    setOpenModallanguages: React.Dispatch<React.SetStateAction<boolean>>;
    setLanguageValues: React.Dispatch<React.SetStateAction<any>>;
}

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

const ModalLanguages: React.FC<IModalSkills> = (props) => {
    const { openModallanguages, setOpenModallanguages, setLanguageValues } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const languageData = useSelector((state: RootState) => state.dataLanguage.languages);
    const [language, setLanguage] = React.useState<any>();
    const [level, setLevel] = React.useState<any>(1);

    const handleOnchangeSkill = (e: any) => {
        setLanguage(e.target.value)
    }
    const handleOnchangeLevel = (e: any) => {
        setLevel(e.target.value)
    }

    const handleSubmit = () => {
        setLanguageValues((prev: any) => [
            {
                language: language,
                level: level
            },
            ...prev
        ])
        setLanguage('')
        setLevel(1)
    }

    const handleClose = () => {
        setOpenModallanguages(false);
    }

    return (
        <Modal
            open={openModallanguages}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                            "Thêm ngoại ngữ" :
                            "Add languages"
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
                                "Ngoại ngữ" : "Languages"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        type="text"
                        id="skill"
                        name="skill"
                        value={language}
                        onChange={handleOnchangeSkill}
                        size="small"
                        sx={{ width: '100%', marginTop: '4px' }}
                        placeholder={
                            languageRedux === 1 ?
                                "Ngoại ngữ" : "Languages"
                        }
                    // error={titleError} // Đánh dấu lỗi
                    />
                </Box>
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography
                        // sx={styleLabel}
                        variant="body1"
                        component="label"
                        htmlFor="sex"
                    >
                        {
                            languageRedux === 1 ?
                                "Cấp độ" :
                                "Level"
                        }{' '}
                        <span className="color-asterisk">*</span>
                    </Typography>
                    <TextField
                        select
                        id="level"
                        value={level}
                        defaultValue={1}
                        onChange={handleOnchangeLevel}
                        variant="outlined"
                        placeholder={
                            languageRedux === 1 ?
                                "Tháng/ Năm" :
                                "Month/ Year"
                        }
                        size="small"
                        sx={{ width: '100%' }}
                        error={!level} // Đánh dấu lỗi
                    >
                        <MenuItem value={1}>
                            {languageRedux === 1 ? "Sơ cấp" : "Primary"}
                        </MenuItem>
                        <MenuItem value={2}>
                            {languageRedux === 1 ? "Trung cấp" : "Intermediate"}
                        </MenuItem>
                        <MenuItem value={3}>
                            {languageRedux === 1 ? "Trình độ cao" : "High - level"}
                        </MenuItem>
                        <MenuItem value={4}>
                            {languageRedux === 1 ? "Thành thạo" : "Native"}
                        </MenuItem>
                    </TextField>
                </Box>
                <Button
                    variant="contained" fullWidth
                    onClick={handleSubmit}
                >
                    {languageData?.profile_page?.save_info}
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalLanguages;