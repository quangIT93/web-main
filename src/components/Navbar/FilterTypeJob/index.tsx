import React, { ReactNode } from 'react'
import { Select } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'

import './style.scss'

const CustomOption = ({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: ReactNode
}) => (
  <div>
    <input type="radio" id={value} value={value} name="option" />
    <label htmlFor={value}>{label}</label>
    {children}
  </div>
)

const { Option } = Select

const FilterTypeJob = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Select
        // defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        className="inputTypeJobNav input-filter_nav"
        size="large"
        placeholder="Loại công việc"
      >
        <Option value="jack" label="Jack">
          <CustomOption label="Jack" value="jack" children={null} />
        </Option>
        <Option value="lucy" label="Lucy">
          <CustomOption label="Lucy" value="lucy" children={null} />
        </Option>
        <Option value="Yiminghe" label="yiminghe">
          <CustomOption label="yiminghe" value="Yiminghe" children={null} />
        </Option>
        <Option value="disabled" label="Disabled" disabled>
          <CustomOption label="Disabled" value="disabled" children={null} />
        </Option>
      </Select>
    </>
  )
}

export default FilterTypeJob
