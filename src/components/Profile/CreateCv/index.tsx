import React from 'react';

import './style.scss';

import { Button } from 'antd';
import { CreateCvIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Box } from '@mui/material';
import ModalCheckInfo from '../ModalCheckInfo';

interface ICreateCv {
  role: any;
}

const CreateCv: React.FC<ICreateCv> = (props) => {
  const { role } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [height, setHeight] = React.useState(0);
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const profileV3More = useSelector(
    (state: RootState) => state.dataProfileInformationMoreV3.data,
  );
  const [openModalCheckInfo, setOpenModalCheckInfo] = React.useState(false);
  const [typeOfModalCheckInfo, setTypeOfModalCheckInfo] = React.useState<any>('');

  const handleMoveToCreateCv = () => {
    window.open('/templates-cv', '_parent');
  };

  const moveToCreateCV = () => {
    if (
      profileV3.name === 'Your name' ||
      profileV3.phone === '' ||
      profileV3.birthday === null ||
      profileV3.addressText === null ||
      profileV3.jobTypeName === null ||
      profileV3.jobTypeName === 'null' ||
      profileV3.avatarPath === null ||
      profileV3.email === null ||
      profileV3.introduction === null
    ) {
      setOpenModalCheckInfo(true);
      setTypeOfModalCheckInfo('upInfo');
      return;
    }
    if (
      profileV3More.profilesJobType === null ||
      profileV3More.profilesEducations.length === 0 ||
      profileV3More.profilesExperiences.length === 0 ||
      profileV3More.profilesSkills.length === 0 ||
      profileV3More.profilesLanguages.length === 0 ||
      profileV3More.profileHobbies === null ||
      profileV3More.profilesReferences.length === 0 ||
      profileV3More.profileActivities.length === 0 ||
      profileV3More.profileAwards.length === 0
    ) {
      setOpenModalCheckInfo(true);
      setTypeOfModalCheckInfo('upInfoMore');
      return;
    }
    window.open('/templates-cv', '_parent');
  }

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
            content: languageRedux === 1 ? '"Tạo mới CV"' : '"Create a new CV"',
          },
          '&:hover': {
            width: languageRedux === 1 ? '194px' : '230px',
          },
          bottom: role === 0 ? '140px' : '',
        }}
        onClick={moveToCreateCV}
      >
        <div className="iconSVG">
          <CreateCvIcon width={32} height={32} />
        </div>
      </Box>
      <ModalCheckInfo
        openModalCheckInfo={openModalCheckInfo}
        setOpenModalCheckInfo={setOpenModalCheckInfo}
        type={typeOfModalCheckInfo}
      />
    </div>
  );
};

export default CreateCv;
