import React from 'react';

import './style.scss';
import { Button, Modal, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { CandidateIcon, RecruiterIcon } from '#components/Icons';
import { setRole } from 'store/reducer/roleReducer';

interface IModalSelectRole {
  openModalSelectRole: boolean;
  setOpenModalSelectRole: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalUpdateInfo: React.Dispatch<React.SetStateAction<boolean>>;
  // setRole: React.Dispatch<React.SetStateAction<any>>;
}

const ModalSelectRole: React.FC<IModalSelectRole> = (props) => {
  const {
    openModalSelectRole,
    setOpenModalSelectRole,
    setOpenModalUpdateInfo,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [role, setRoleId] = React.useState(0);
  const dispatch = useDispatch();

  const onChangeRole = (e: any) => {
    setRoleId(e.target.value);
  };
  const handleCancel = () => {
    setOpenModalSelectRole(false);
  };

  const handleSubmit = () => {
    // setRole(role)
    dispatch<any>(setRole(role));
    setOpenModalUpdateInfo(true);
    handleCancel();
  };

  return (
    <Modal
      width={614}
      centered
      title={
        <h3
          style={{
            fontFamily: 'Roboto',
            fontSize: '24px',
            // fontWeight: '700',
            lineHeight: '24px',
            letterSpacing: '0em',
            textAlign: 'left',
          }}
        >
          {languageRedux === 1
            ? 'Chọn CV/Hồ sơ  để xin việc'
            : 'Choose CV/Resume to apply for a job'}
        </h3>
      }
      footer={null}
      //   open={openModalSelectRole}
      open={true}
      // onCancel={handleCancel}
      closable={false}
      className="modal-select-role-container"
    >
      <p
        style={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '400',
          letterSpacing: '0.5px',
          textAlign: 'left',
        }}
      >
        {languageRedux === 1
          ? 'Chọn vai trò của bạn để HiJob có thể hỗ trợ bạn tốt hơn trong việc tìm việc làm, tìm ứng viên tiềm năng hoặc các tính năng hỗ trợ khác.'
          : 'Select your role so HiJob can better assist you in finding jobs, potential candidates or other support features.'}
      </p>
      <div className="modal-select-role-bottom">
        <div className="select-role">
          <Radio.Group
            onChange={onChangeRole}
            value={role}
            style={{ width: '100%' }}
          >
            <Space
              className="select-role-content"
              direction="horizontal"
              size={49}
              align="center"
            >
              <Space
                className="role-item"
                direction="vertical"
                size={24}
                align="center"
              >
                <RecruiterIcon />
                <Radio value={1}>
                  {languageRedux === 1 ? 'Người tuyển dụng' : 'Recruiter'}
                </Radio>
              </Space>
              <Space
                className="role-item"
                direction="vertical"
                size={24}
                align="center"
              >
                <CandidateIcon />
                <Radio value={0}>
                  {languageRedux === 1 ? 'Ứng viên' : 'Candidate'}
                </Radio>
              </Space>
            </Space>
          </Radio.Group>
        </div>
        <Button type="primary" shape="round" onClick={handleSubmit}>
          {languageRedux === 1 ? 'Xác nhận' : 'Confirm'}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalSelectRole;
