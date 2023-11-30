import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface IJobInfoDropDown {
  moveToAppliedJob: () => any;
  moveToSaveJob: () => any;
  moveToRecruimentPost: () => any;
  moveToNewestJob: () => any;
  moveToOpeningPost: () => any;
  moveToHotJob: () => any;
  moveToClosedPost: () => any;
  moveToJobByHotPlace: () => any;
  moveToPostjob: () => any;
  moveToSuggestedJob: () => any;
  moveToCompanyInfor: () => any;
}

const JobInfoDropDown: React.FC<IJobInfoDropDown> = (props) => {
  const {
    moveToAppliedJob,
    moveToSaveJob,
    moveToRecruimentPost,
    moveToNewestJob,
    moveToOpeningPost,
    moveToHotJob,
    moveToClosedPost,
    moveToJobByHotPlace,
    moveToPostjob,
    moveToSuggestedJob,
    moveToCompanyInfor,
  } = props;

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const jobInfo = [
    {
      key: '1',
      label: (
        <a
          style={{ display: roleRedux === 0 ? 'block' : 'none' }}
          onClick={moveToAppliedJob}
        >
          {languageRedux === 1
            ? 'Việc làm đã ứng tuyển'
            : languageRedux === 2
              ? 'Apllied Jobs'
              : languageRedux === 3 && '어플라이드 잡스'}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={roleRedux === 0 ? moveToSaveJob : moveToRecruimentPost}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Các công việc đã lưu'
              : languageRedux === 2
                ? 'Saved jobs'
                : languageRedux === 3 && '저장된 작업'
            : languageRedux === 1
              ? 'Việc làm tuyển dụng đã đăng'
              : languageRedux === 2
                ? 'Recruitment posted'
                : languageRedux === 3 && '게시된 작업'}
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={roleRedux === 0 ? moveToNewestJob : moveToOpeningPost}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Công việc mới nhất'
              : languageRedux === 2
                ? 'Newest jobs'
                : languageRedux === 3 && '최신 작업'
            : languageRedux === 1
              ? 'Bài tuyển dụng đang mở'
              : languageRedux === 2
                ? 'Job posting is opening'
                : languageRedux === 3 && '마감되지 않은 채용공고'}
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={roleRedux === 0 ? moveToHotJob : moveToClosedPost}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Công việc nổi bật'
              : languageRedux === 2
                ? 'Hot jobs'
                : languageRedux === 3 && '핫잡스'
            : languageRedux === 1
              ? 'Bài tuyển dụng đã đóng'
              : languageRedux === 2
                ? 'Job posting is closed'
                : languageRedux === 3 && '채용공고가 마감되었습니다'}
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a onClick={roleRedux === 0 ? moveToJobByHotPlace : moveToPostjob}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Công việc theo chủ đề'
              : languageRedux === 2
                ? 'Job by hot places'
                : languageRedux === 3 && '핫플레이스별작업'
            : languageRedux === 1
              ? 'Đăng bài tuyển dụng'
              : languageRedux === 2
                ? 'Post recruitment posts'
                : languageRedux === 3 && '채용 공고 만들기'}
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a onClick={roleRedux === 0 ? moveToSuggestedJob : moveToCompanyInfor}>
          {roleRedux === 0
            ? languageRedux === 1
              ? 'Công việc gợi ý'
              : languageRedux === 2
                ? 'Suggested jobs'
                : languageRedux === 3 && '추천 직업'
            : languageRedux === 1
              ? 'Thông tin công ty'
              : languageRedux === 2
                ? "Company's information"
                : languageRedux === 3 && '회사 정보'}
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: jobInfo }}
      placement="bottomLeft"
      trigger={['hover']}
    >
      <h3>
        {roleRedux === 0
          ? languageRedux === 1
            ? 'Thông tin việc làm'
            : languageRedux === 2
              ? 'Job information'
              : languageRedux === 3 && '어플라이드 잡스'
          : languageRedux === 1
            ? 'Thông tin tuyển dụng'
            : languageRedux === 2
              ? 'Employment information'
              : languageRedux === 3 && '채용정보'}
      </h3>
    </Dropdown>
  );
};

export default JobInfoDropDown;
