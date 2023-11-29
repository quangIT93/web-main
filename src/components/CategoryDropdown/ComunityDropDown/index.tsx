import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ICvDropDown {
  moveToWorkingStory: () => any;
  moveToHijobNews: () => any;
  moveToPostArticle: () => any;
  moveToSavedArticle: () => any;
}

const ComunityDropDown: React.FC<ICvDropDown> = (props) => {
  const {
    moveToWorkingStory,
    moveToHijobNews,
    moveToPostArticle,
    moveToSavedArticle,
  } = props;

  const roleRedux = useSelector((state: RootState) => state.changeRole.role);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const comunity = [
    {
      key: '1',
      label: (
        <a onClick={moveToWorkingStory}>
          {languageRedux === 1
            ? 'Câu chuyện việc làm'
            : languageRedux === 2
              ? 'Working story'
              : languageRedux === 3 && '워킹스토리'}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={moveToHijobNews}>
          {languageRedux === 1
            ? 'Tin tức'
            : languageRedux === 2
              ? 'News'
              : languageRedux === 3 && '뉴스'}
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={moveToPostArticle}>
          {languageRedux === 1
            ? 'Đăng bài viết mới'
            : languageRedux === 2
              ? 'Post new articles'
              : languageRedux === 3 && '새로운 글을 게시합니다'}
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={moveToSavedArticle}>
          {languageRedux === 1
            ? 'Bài viết đã lưu'
            : languageRedux === 2
              ? 'Saved post'
              : languageRedux === 3 && '저장된게시물'}
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: comunity }}
      placement="bottomLeft"
      trigger={['hover']}
    >
      <h3>
        {languageRedux === 1
          ? 'Cộng đồng'
          : languageRedux === 2
            ? 'Community'
            : languageRedux === 3 && '공동체'}
      </h3>
    </Dropdown>
  );
};

export default ComunityDropDown;
