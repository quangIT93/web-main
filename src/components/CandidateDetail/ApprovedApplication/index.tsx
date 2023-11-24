import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import appplicationApi from 'api/appplication';
import { Box, Typography, Modal } from '@mui/material';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface IApprovalApplication {
  setStatusApplication: React.Dispatch<React.SetStateAction<number>>;
}
const ApprovedApplication: React.FC<IApprovalApplication> = (props) => {
  const { setStatusApplication } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const [OpenRecruit, setOpenRecruit] = useState(false);

  const handleClose = () => setOpenRecruit(false);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  // const handleClickApproveApplication = async () => {
  //   const candidateId = parseInt(searchParams.get('application_id') ?? '')

  //   try {
  //     const result = await appplicationApi.updateApplication(candidateId, 3)
  //     if (result) {
  //       setStatusApplication(3)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleClickPassRecruitment = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');

    try {
      const result = await appplicationApi.updateApplication(candidateId, 4);
      if (result) {
        setStatusApplication(4);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        name="submitApply"
        type="primary"
        style={{
          backgroundColor: '#0D99FF',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
        }}
        onClick={() => setOpenRecruit(true)}
      >
        {languageRedux === 1
          ? 'Xác nhận tuyển ứng viên'
          : languageRedux === 2
            ? 'Confirm recruitment of candidates'
            : languageRedux === 3 && '후보자 모집 확인'}
      </Button>
      <Modal
        open={OpenRecruit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {languageRedux === 1
              ? 'Xác nhận tuyển ?'
              : languageRedux === 2
                ? 'Confirmed recruitment ?'
                : languageRedux === 3 && '채용 확정 ?'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {languageRedux === 1
              ? 'Hãy đảm bảo bạn và ứng viên đã liên hệ và sẽ làm việc cùng nhau.'
              : languageRedux === 2
                ? 'Make sure you and the candidate have made contact and will work together.'
                : languageRedux === 3 &&
                  '귀하와 후보자가 기꺼이 연락하고 함께 일할 의향이 있는지 확인하십시오.'}
          </Typography>
          <div className="button-modal_reject">
            <Button
              type="default"
              danger
              onClick={() => setOpenRecruit(false)}
              name="cancleApprovedApply"
            >
              {languageRedux === 1
                ? 'Huỷ'
                : languageRedux === 2
                  ? 'Cancel'
                  : languageRedux === 3 && '취소'}
            </Button>
            <Button
              type="primary"
              onClick={handleClickPassRecruitment}
              name="submitApprovedApply"
            >
              {languageRedux === 1
                ? 'Đồng ý'
                : languageRedux === 2
                  ? 'Ok'
                  : languageRedux === 3 && '동의하다'}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ApprovedApplication;
