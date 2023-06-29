import React, { useState, memo } from 'react'

import Box from '@mui/material/Box'
import { Cascader, Divider, Typography, Button } from 'antd'
import categoriesApi from '../../../api/categoriesApi'
import './style.scss'
import { useSearchParams } from 'react-router-dom'

const { Text } = Typography

interface DistrictProps {
  setListCate: Function
}
const { SHOW_CHILD } = Cascader

const DropdownRender = (menus: React.ReactNode) => (
  <div style={{ width: '100%' }}>
    <Text className="title-filter_location">Chọn danh mục nghề nghiệp</Text>
    {menus}
    <Divider style={{ margin: 4 }} />
    {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="default" onClick={() => {}}>
        Huỷ
      </Button>
      <Button type="primary" onClick={() => {}}>
        Áp dụng
      </Button>
    </div> */}
  </div>
)

const FilterCateloriesNav: React.FC<DistrictProps> = ({ setListCate }) => {
  const [categoriesId, setCategoriesId] = useState<string[]>([])

  const [searchParams, setSearchParams] = useSearchParams()
  const listCate = searchParams
    .getAll('categories-ids')
    .map((dis) => dis.split(','))
    .map((category) => category.map(Number))

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise()
      if (result) {
        setDataCategories(result.data)
      }
      console.log(listCate)
      setListCate(listCate)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getCategories()
    if (listCate.length >= 2) {
      setDisable(true)
    }
  }, [])

  const [dataCategories, setDataCategories] = React.useState<any>(null)
  const [disable, setDisable] = React.useState<Boolean>(false)

  const onChange = (value: any) => {
    setDisable(false)
    const secondValues = value.map((item: any) => item[1])
    console.log('value', value)
    console.log('secondValues', secondValues)
    console.log('listCate', listCate)
    if (secondValues.length <= 3 && listCate.length <= 3) {
      setCategoriesId(secondValues)
      setListCate(value)
    }
    if (value.length > 1) {
      setDisable(true)
    }
  }

  return (
    <>
      <Cascader
        dropdownRender={DropdownRender}
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
        defaultValue={listCate}
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
