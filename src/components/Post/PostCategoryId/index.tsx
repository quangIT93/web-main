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

const { SHOW_CHILD } = Cascader

const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
      disableCheckbox: true,
    })),
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

interface ICategories {
  setCategoriesId: React.Dispatch<React.SetStateAction<string[]>>
  categoriesId: string[]
}

const CheckboxesTags: React.FC<ICategories> = (props) => {
  const { setCategoriesId, categoriesId } = props

  const [dataCategories, setDataCategories] = React.useState<any>(null)
  const [disable, setDisable] = React.useState<Boolean>(false)
  const onChange = (value: any) => {
    setDisable(false)
    const secondValues = value.map((item: any) => item[1])
    console.log('value', value)
    console.log('secondValues', secondValues)
    if (secondValues.length <= 2) {
      setCategoriesId(secondValues)
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
  }, [])

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
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
              value: parentCategory.parent_category_id,
              label: parentCategory.parent_category,
              children: parentCategory.childs.map((child: any) => {
                var dis = false;
                //check id child  when disable = true 
                if (disable) {
                  dis = true
                  for (const elem of categoriesId) {
                    if (elem === child.id) {
                      dis = false
                      break;
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
        style={{ width: '100%', borderRadius: '2px' }}
      />
    </Box>
  )
}

export default CheckboxesTags
