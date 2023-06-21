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

const FilterCateloriesNav = () => {
  const [categoriesId, setCategoriesId] = useState<string[]>([])

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

  return (
    <>
      <Cascader
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
        className="inputCategories input-filter_nav"
        showCheckedStrategy={SHOW_CHILD}
        style={{ width: '100%', borderRadius: '2px' }}
        placeholder="Chọn danh mục ngành nghề"
      />
    </>
  )
}

export default FilterCateloriesNav
