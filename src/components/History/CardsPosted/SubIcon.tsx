import React from 'react';
import {
  MoreOutlined,
  CloseSquareOutlined,
  EditOutlined,
} from '@ant-design/icons';

import postApi from 'api/postApi';

interface ISubicon {
  postId: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  status: number;
}
const SubIcon: React.FC<ISubicon> = (props) => {
  const { postId, setStatus, status } = props;
  const [accepted, setAccepted] = React.useState('');
  const [closed, setClosed] = React.useState('');

  const handleClickClosePost = async () => {
    try {
      const result = await postApi.updateStatusPost(postId, 3);
      if (result) {
        setStatus(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditPost = async () => {
    // const result = await postApi.updateStatusPost(postId, 1);
    window.open(`/edit-posted/?postId=${postId}`, '_blank');
  };

  const handleClickOpenPost = async () => {
    try {
      const result = await postApi.updateStatusPost(postId, 3);
      if (result) {
        setStatus(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.lo

  return (
    <div className="subs-icon_moreOutlined">
      <div
        className="sub-icon_moreOutlined sub-edit_post"
        onClick={handleClickEditPost}
        style={
          status !== 3 ? { cursor: 'not-allowed', background: '#aaa' } : {}
        }
      >
        <EditOutlined />
        Chỉnh sửa bài tuyển dụng
      </div>

      <div
        className="sub-icon_moreOutlined sub-close_post"
        onClick={status !== 3 ? handleClickClosePost : () => {}}
        style={
          status === 3 ? { cursor: 'not-allowed', background: '#aaa' } : {}
        }
      >
        <CloseSquareOutlined />
        {status === 3 ? '     Đóng bài tuyển dụng' : 'Bài tuyển dụng đã đóng'}
      </div>

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
