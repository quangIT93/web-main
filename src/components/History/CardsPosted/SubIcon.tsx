import React from 'react';
import {
  MoreOutlined,
  CloseSquareOutlined,
  EditOutlined,
} from '@ant-design/icons';

import postApi from 'api/postApi';
import { postDetail } from 'validations/lang/vi/postDetail';
import { postDetailEn } from 'validations/lang/en/postDetail';
import ModalClosePost from '../ModalClosePost';

interface ISubicon {
  postId: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  status: number;
  language: any;
  languageRedux: any;
}
const SubIcon: React.FC<ISubicon> = (props) => {
  const { postId, setStatus, status, language, languageRedux } = props;
  // const [accepted, setAccepted] = React.useState('');
  // const [closed, setClosed] = React.useState('');
  const [openModalClosePost, setOpenModalClosePost] = React.useState(false);

  const handleClickClosePost = async () => {
    // try {
    //   const result = await postApi.updateStatusPost(postId, 3);
    //   if (result) {
    //     setStatus(3);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    setOpenModalClosePost(true)
  };

  const handleClickEditPost = async () => {
    // const result = await postApi.updateStatusPost(postId, 1);
    window.open(`/edit-posted?postId=${postId}`, '_parent');
  };

  // const handleClickOpenPost = async () => {
  //   try {
  //     const result = await postApi.updateStatusPost(postId, 1);
  //     if (result) {
  //       setStatus(1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.lo

  return (
    <div className="subs-icon_moreOutlined">
      <div
        className="sub-icon_moreOutlined sub-edit_post"
        onClick={status !== 3 ? handleClickEditPost : () => { }}
        style={
          status === 3 ? { cursor: 'not-allowed', background: '#aaa' } : {}
        }
      >
        <EditOutlined />
        {
          languageRedux === 1
            ? 'Sửa'
            : languageRedux === 2
              ? 'Edit'
              : '고치다'
        }
      </div>

      <div
        className="sub-icon_moreOutlined sub-close_post"
        onClick={status !== 3 ? handleClickClosePost : () => { }}
        style={
          status === 3 ? { cursor: 'not-allowed', background: '#aaa' } : {}
        }
      >
        <CloseSquareOutlined />
        {status === 3 ?
          languageRedux === 1
            ? 'Bài tuyển dụng đã đóng'
            : languageRedux === 2
              ? 'The job posting is closed"'
              : '채용 공고가 마감되었습니다' :
          languageRedux === 1
            ? 'Đóng bài tuyển dụng'
            : languageRedux === 2
              ? 'Close job posting"'
              : '채용 공고 닫기'}
      </div>

      <ModalClosePost
        openModalClosePost={openModalClosePost}
        setOpenModalClosePost={setOpenModalClosePost}
        postId={postId}
        setStatus={setStatus}
      />

      {/* {status === 3 ? (
        <div
          className="sub-icon_moreOutlined sub-open_post"
          onClick={handleClickOpenPost}
        >
          <CloseSquareOutlined />
          Mở bài tuyển dụng
        </div>
      ) : status === 1 ? (
        <div
          className="sub-icon_moreOutlined sub-close_post"
          onClick={handleClickClosePost}
        >
          <CloseSquareOutlined />
          Đóng bài tuyển dụng
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default SubIcon;
