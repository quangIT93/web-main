import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ICvDropDown {
  moveToCreateCv: () => any;
  moveToCadidateList: () => any;
  moveToCvManage: () => any;
  moveToSearchCandidate: () => any;
  moveToIntroductionCv: () => any;
  moveToSavedCandidateList: () => any;
}

const CvDropDown: React.FC<ICvDropDown> = (props) => {
  const {
    moveToCreateCv,
    moveToCadidateList,
    moveToCvManage,
    moveToSearchCandidate,
    moveToIntroductionCv,
    moveToSavedCandidateList,
  } = props;

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const cv = [
    {
      key: '1',
      label: (
        <a onClick={roleRedux === 0 ? moveToCreateCv : moveToCadidateList}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Tạo mới CV'
              : 'Create a new CV'
            : languageRedux === 1
            ? 'Danh sách nhân tài mới nhất'
            : 'Newest talent list'}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={roleRedux === 0 ? moveToCvManage : moveToSearchCandidate}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Quản lý CV'
              : 'CV management'
            : languageRedux === 1
            ? 'Tìm kiếm nhân tài'
            : 'Search for talent'}
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          onClick={
            roleRedux === 0 ? moveToIntroductionCv : moveToSavedCandidateList
          }
        >
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Hướng dẫn tạo CV'
              : 'Instructions for creating a CV'
            : languageRedux === 1
            ? 'Danh sách nhân tài đã lưu'
            : 'Saved talent list'}
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items: cv }} placement="bottomLeft" trigger={['hover']}>
      <h3>
        {roleRedux === 0
          ? languageRedux === 1
            ? 'Hồ sơ & CV'
            : 'Resume & CV'
          : languageRedux === 1
          ? 'Thông tin nhân tài'
          : 'Talent information'}
      </h3>
    </Dropdown>
  );
};

export default CvDropDown;
