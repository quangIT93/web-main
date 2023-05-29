import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Cascader } from 'antd'
import categoriesApi from '../../../api/categoriesApi'

import './style.scss'

interface Option {
  value: string | number
  label: string
  children?: Option[]
  disableCheckbox?: boolean
}
const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20)
      .fill(null)
      .map((_, index) => ({ label: `Number ${index}`, value: index })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
            disableCheckbox: true,
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
]
const data = [
  {
    parent_category_id: 2,
    parent_category: 'Văn phòng',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/van-phong.png',
    childs: [
      { id: 354, name: 'Chăm sóc khách hàng' },
      { id: 396, name: 'Kế toán' },
      { id: 397, name: 'Nhân sự (HR)' },
      // Other child options
    ],
  },
  {
    parent_category_id: 3,
    parent_category: 'Khách sạn/Nhà hàng',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
    childs: [
      { id: 384, name: 'Đầu bếp' },
      { id: 359, name: 'Lễ tân' },
      { id: 179, name: 'Nhân viên buồng phòng' },
      // Other child options
    ],
  },
  {
    parent_category_id: 4,
    parent_category: 'IT/Lập trình viên',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/lap-trinh.png',
    childs: [
      { id: 442, name: 'Chuyên viên hỗ trợ' },
      { id: 447, name: 'Chuyên Viên Phát Triển Game' },
      { id: 401, name: 'Cyber security specialist' },
      // Other child options
    ],
  },
  // Other parent categories
]

interface ICategories {
  setCategoriesId: React.Dispatch<React.SetStateAction<string[]>>
  categoriesId: string[]
}

const CheckboxesTags: React.FC<ICategories> = (props) => {
  const { setCategoriesId, categoriesId } = props

  const [dataCategories, setDataCategories] = React.useState<any>(null)
  const onChange = (value: any) => {
    const secondValues = value.map((item: any) => item[1])
    console.log('value', value)
    console.log('secondValues', secondValues)
    if (secondValues.length <= 2) {
      setCategoriesId(secondValues)
    }
  }

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise()
      if (result) {
        setDataCategories(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getCategories()
  }, [])
  console.log('categoriesId', categoriesId)
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={{ fontWeight: 600, color: '#000000' }}
        variant="body1"
        component="label"
        htmlFor="jobTitle"
      >
        Danh mục nghề *:
      </Typography>
      <Cascader
        style={{ width: '100%', borderRadius: '2px' }}
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
                value: parentCategory.parent_category_id,
                label: parentCategory.parent_category,
                children: parentCategory.childs.map((child: any) => ({
                  value: child.id,
                  label: child.name,
                })),
              }))
            : []
        }
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        size="large"
        className="inputCategories"
      />
    </Box>
  )
}

export default CheckboxesTags
