export interface locationProp {
  city: string
  district: string[]
  id: string
}

export const dataLocation: locationProp[] = [
  {
    id: '1',
    city: 'Thành Phố Hồ Chí Minh',
    district: [
      'Quận 1',
      'Quận 2',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 9',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Tân Bình',
      'Tân Phú',
      'Phú Nhuận',
    ],
  },
  {
    id: '1',
    city: 'Hà Nội',
    district: [
      'Hoàng Mai',
      'Long Biên',
      'Thanh Xuân',
      'Bắc Từ Liêm',
      'Ba Đình',
      'Cầu Giấy',
      'Đống Đa',
      'Hai Bà Trưng',
      'Hoàn Kiếm',
      'Hà Đông',
      'Tây Hồ và Nam Từ Liêm',
    ],
  },
  {
    id: '1',
    city: 'Bình Dương',
    district: [
      'Quận 1',
      'Quận 2',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 9',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Tân Bình',
      'Tân Phú',
      'Phú Nhuận',
    ],
  },
]

export interface careerProp {
  career: string
  jobs: string[]
  id: string
}

export const datacareer: careerProp[] = [
  {
    id: '1',
    career: 'Dịch vụ',
    jobs: ['Lễ Tân', 'Nhà Hàng', 'Phục vụ', 'Thu ngân'],
  },
  {
    id: '1',
    career: 'Event',
    jobs: ['Tham gia cùng thần tượng', 'Lễ 8/3'],
  },
  {
    id: '1',
    career: 'Dọn dẹp',
    jobs: ['Nhà ở', 'Khách sạn', 'Khu dân cư', 'Công ty'],
  },
]

const x = 1
