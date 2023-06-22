import React, { useState, memo, ReactNode } from 'react'

import Box from '@mui/material/Box'
import { Cascader, Divider, Typography, Button } from 'antd'

import './style.scss'

import { EnvironmentOutlined } from '@ant-design/icons'

// import api
import locationApi from 'api/locationApi'

const { Text } = Typography
interface Option {
  value: string | number
  label: string
  children?: Option[]
  disableCheckbox?: boolean
}
const { SHOW_CHILD } = Cascader

const DropdownRender = (menus: React.ReactNode) => (
  <div style={{ width: '100%' }}>
    <Text className="title-filter_location">Chọn địa điểm</Text>
    {menus}
    <Divider style={{ margin: 0 }} />
    <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="default" onClick={() => {}}>
        Huỷ
      </Button>
      <Button type="primary" onClick={() => {}}>
        Áp dụng
      </Button>
    </div>
  </div>
)

const FilterLocationNav: React.FC = () => {
  const [dataLocations, setDataLocations] = React.useState<any>(null)
  const [dataDistrict, setDataDistrict] = React.useState<any>(null)
  const [disable, setDisable] = React.useState<Boolean>(false)
  const [locId, setLocId] = useState<string[]>([])
  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation()
      if (result) {
        setDataLocations(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getAllLocaitions()
  }, [])

  console.log('dataLocations', dataLocations)

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

  const onChange = (value: any) => {
    // Xử lý giá trị thay đổi
    setDisable(false)
    const secondValues = value.map((item: any) => item[1])
    console.log('value', value)
    console.log('secondValues', secondValues)
    if (secondValues.length <= 3) {
      setLocId(secondValues)
    }
    if (value.length > 2) {
      setDisable(true)
    }
  }

  return (
    <>
      <Cascader
        multiple
        maxTagCount="responsive"
        size="large"
        placeholder="Chọn địa điểm"
        inputIcon={<EnvironmentOutlined />}
        dropdownRender={DropdownRender}
        options={
          dataLocations
            ? dataLocations.map((dataLocation: any) => ({
                value: dataLocation.province_id,
                label: dataLocation.province_fullName,
                children: dataLocation.districts.map(
                  (child: { district_id: string; district: string }) => {
                    var dis = false
                    if (disable) {
                      dis = true
                      for (const elem of locId) {
                        if (elem === child.district_id) {
                          dis = false
                          break
                        }
                      }
                    }

                    return {
                      value: child.district_id,
                      label: child.district,
                      disabled: dis,
                    }
                  }
                ),
              }))
            : []
        }
        onChange={onChange}
        changeOnSelect
        className="inputFilterLocationNav input-filter_nav"
        showCheckedStrategy={SHOW_CHILD}
      />
    </>
  )
}

export default FilterLocationNav
