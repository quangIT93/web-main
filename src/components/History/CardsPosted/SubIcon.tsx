import React from 'react'
import {
  MoreOutlined,
  CloseSquareOutlined,
  EditOutlined,
} from '@ant-design/icons'

import postApi from 'api/postApi'

interface ISubicon {
  postId: number
  setStatus: React.Dispatch<React.SetStateAction<number>>
}
const SubIcon: React.FC<ISubicon> = (props) => {
  const { postId, setStatus } = props
  const [accepted, setAccepted] = React.useState('')
  const [closed, setClosed] = React.useState('')

  const handleClickClosePost = async () => {
    try {
      const result = await postApi.updateStatusPost(postId, 3)
      if (result) {
        console.log('xoá thành công', result)
        setStatus(3)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickEditPost = async () => {
    try {
      const result = await postApi.updateStatusPost(postId, 1)
      if (result) {
        console.log('xoá thành công', result)
        setStatus(1)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="subs-icon_moreOutlined">
      <div
        className="sub-icon_moreOutlined sub-edit_post"
        onClick={handleClickEditPost}
      >
        <EditOutlined />
        Chỉnh sửa bài tuyển dụng
      </div>
      <div
        className="sub-icon_moreOutlined sub-close_post"
        onClick={handleClickClosePost}
      >
        <CloseSquareOutlined />
        Đóng bài tuyển dụng
      </div>
    </div>
  )
}

export default SubIcon
