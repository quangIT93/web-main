import React, { useState, memo } from 'react'
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

const { SHOW_CHILD } = Cascader

interface IPostCategoryIds {
  selectedOptions: Option[]
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>
}

// const options: Option[] = [
//   {
//     id: '1',
//     name: 'Khách sạn 1',
//     default_post_image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
//     image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
//   },
//   {
//     id: '2',
//     name: 'Khách sạn 2',
//     default_post_image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
//     image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
//   },
//   {
//     id: '3',
//     name: 'Khách sạn 3',
//     default_post_image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
//     image:
//       'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
//   },
// ]

interface IEditPostCategoryId {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  editDataPosted: any
  dataPost: any
}

const EditPostCategoryId: React.FC<IEditPostCategoryId> = (props) => {
  const { setEditDataPosted, editDataPosted, dataPost } = props

  const [categoriesId, setCategoriesId] = React.useState<string[]>(
    dataPost?.map((cata: any) => cata.child_category_id)
  )

  const [dataCategories, setDataCategories] = React.useState<any>(null)
  const [disable, setDisable] = React.useState<Boolean>(false)

  const [defaultValue, setDefaultValue] = React.useState<number[]>([])

  const onChange = (value: any) => {
    setDisable(false)
    const secondValues = value.map((item: any) => item[1])

    if (secondValues.length <= 2) {
      setCategoriesId(secondValues)

      setEditDataPosted((preValue: any) => ({
        ...preValue,
        categoryIds: secondValues,
      }))
    }
    if (value.length > 1) {
      setDisable(true)
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
    const array = dataPost?.map((cata: any) => [
      cata.parent_category_id,
      cata.child_category_id,
    ])
    if (dataPost.length === 2) {
      setDisable(true)
    }
    setDefaultValue(array)
  }, [])

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography 
        sx={{ fontWeight: 600, color: '#000000'}}
        variant="body1"
        component="label"
        htmlFor="jobTitle"
      >
        Danh mục nghề <span style={{ color: 'red'}}>*</span>
      </Typography>
      <Cascader
        defaultValue={dataPost?.map((cata: any) => [
          cata.parent_category_id,
          cata.child_category_id,
        ])}
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
              value: parentCategory.parent_category_id,
              label: parentCategory.parent_category,
              children: parentCategory.childs.map((child: any) => {
                var dis = false
                //check id child  when disable = true
                if (disable) {
                  dis = true
                  for (const elem of categoriesId) {
                    if (elem === child.id) {
                      dis = false
                      break
                    }
                  }
                }
                return {
                  value: child.id,
                  label: child.name,
                  disabled: dis,
                }
              }),
            }))
            : []
        }
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        size="large"
        className="inputCategories"
        showCheckedStrategy={SHOW_CHILD}
        style={{ width: '100%', borderRadius: '2px'}}
      />
    </Box>
  )
}

export default memo(EditPostCategoryId)
