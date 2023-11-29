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
              : languageRedux === 2
                ? 'Create a new CV'
                : languageRedux === 3 && '새 CV 만들기'
            : languageRedux === 1
              ? 'Danh sách ứng viên mới nhất'
              : languageRedux === 2
                ? 'Newest candidate list'
                : languageRedux === 3 && '최신 인재 정보'}
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
              : languageRedux === 2
                ? 'CV management'
                : languageRedux === 3 && 'CV관리'
            : languageRedux === 1
              ? 'Tìm kiếm ứng viên'
              : languageRedux === 2
                ? 'Search for candidate'
                : languageRedux === 3 && '인재 검색'}
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
              : languageRedux === 2
                ? 'Instructions for creating a CV'
                : languageRedux === 3 && 'CV 작성 안내'
            : languageRedux === 1
              ? 'Danh sách ứng viên đã lưu'
              : languageRedux === 2
                ? 'Saved candidate list'
                : languageRedux === 3 && '저장한 인재'}
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
            : languageRedux === 2
              ? 'Resume & CV'
              : languageRedux === 3 && '이력서 & CV'
          : languageRedux === 1
            ? 'Chi tiết thông tin ứng viên'
            : languageRedux === 2
              ? 'Detailed candidate information'
              : languageRedux === 3 && '자세한 인재 정보'}
      </h3>
    </Dropdown>
  );
};

export default CvDropDown;
