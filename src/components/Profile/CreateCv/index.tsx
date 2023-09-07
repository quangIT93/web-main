import React from 'react';

import './style.scss';

import { Button } from 'antd';
import { CreateCvIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Box } from '@mui/material';

const CreateCv: React.FC = () => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const [height, setHeight] = React.useState(0);

    const handleMoveToCreateCv = () => {
        window.open('/templates-cv', '_parent');
    };

    return (
        <div className="create-cv-container">
            {/* <Button
                type="primary"
                className="create-cv-btn"
                shape="circle"
                icon={<CreateCvIcon />}
                onClick={handleMoveToCreateCv}
            >
                <h3>
                    {
                        languageRedux === 1 ?
                            "Xem CV của bạn" :
                            "Preview Your Resume"
                    }
                </h3>
            </Button> */}
            <Box
                className="iconDiv"
                sx={{
                    '&:after': {
                        content: languageRedux === 1 ?
                            '"Xem CV của bạn"' :
                            '"Preview Your Resume"'
                    },
                    '&:hover': {
                        width: languageRedux === 1 ?
                            '194px' : '233px'
                    }
                }}
                onClick={handleMoveToCreateCv}
            >
                <div className="iconSVG">
                    <CreateCvIcon width={32} height={32} />
                </div>
            </Box>
        </div>
    );
};

export default CreateCv;
