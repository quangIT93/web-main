import React from 'react';

import './style.scss';

import { Button } from 'antd';
import { CreateCvIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Box } from '@mui/material';

interface ICreateCv {
  role: any;
}

const CreateCv: React.FC<ICreateCv> = (props) => {
  const { role } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [height, setHeight] = React.useState(0);
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const handleMoveToCreateCv = () => {
    window.open('/templates-cv', '_parent');
  };

  return (
    <div
      className="create-cv-container"
      style={{
        display: role === 0 ? 'block' : 'none',
      }}
    >
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
            content:
              languageRedux === 1
                ? '"Tạo mới CV"'
                : '"Create a new CV"',
          },
          '&:hover': {
            width: languageRedux === 1 ? '194px' : '230px',
          },
          bottom: role === 0 ? '140px' : '',
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
