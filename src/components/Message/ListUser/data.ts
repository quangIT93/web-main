export const listUser = [
  {
    user_id: '1',
    name: 'Nguyễn Hạo',
    avatar: 'https://thanh-avatar',
    is_sender: false,
    message: 'Đây là 1 đoạn chat',
    type: 'text',
    status: 0,
    post_id: 242,
    post_title: 'Crack win',
    created_at: 1675837375680,
  },
  {
    user_id: '2',
    name: 'Thái Quang',
    avatar: 'https://thanh-avatar',
    is_sender: false,
    message: 'Đây là 1 đoạn chat',
    type: 'text',
    status: 0,
    post_id: 242,
    post_title: 'Crack win',
    created_at: 1675837375680,
  },
  {
    user_id: '3',
    name: 'Trần Thăng',
    avatar: 'https://thanh-avatar',
    is_sender: true,
    message: 'Đây là 1 đoạn chat',
    type: 'text',
    status: 0,
    post_id: 242,
    post_title: 'Crack win',
    created_at: 1675837375680,
  },
  {
    user_id: '4',
    name: 'Võ Thanh',
    avatar: 'https://thanh-avatar',
    is_sender: true,
    message: 'Đây là 1 đoạn chat',
    type: 'text',
    status: 0,
    post_id: 242,
    post_title: 'Crack win',
    created_at: 1675837375680,
  },
  {
    user_id: '5',
    name: 'Nguyễn Bảo',
    avatar: 'https://thanh-avatar',
    is_sender: false,
    message: 'Đây là 1 đoạn chat',
    type: 'text',
    status: 0,
    post_id: 242,
    post_title: 'Crack win',
    created_at: 1675837375680,
  },
]

// list message dựa vào idpost và iduser
export const listMessage = [
  {
    id: 30,
    type: 'text',
    message: '???',
    status: 0,
    created_at: 1675837375679,
    is_sender: false,
    images: null,
  },
  {
    id: 31,
    type: 'image',
    message: null,
    status: 0,
    created_at: 1675837375678,
    is_sender: false,
    images: [
      {
        id: 10,
        image: 'image 1',
      },
      {
        id: 11,
        image: 'image 2',
      },
    ],
  },
]

// count message unread of user
export const countUnRead = {
  quantity: 10,
}
