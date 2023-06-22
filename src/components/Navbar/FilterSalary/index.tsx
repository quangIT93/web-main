import React, { useState } from 'react'
import { Collapse, Radio, Input, Button, Typography } from 'antd'

import './style.scss'

const { Text } = Typography

const { Panel } = Collapse

const FilterSalary = () => {
  const [selectedValue, setSelectedValue] = useState('option1')
  const [inputValue, setInputValue] = useState('')

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleConfirm = () => {
    console.log(`Selected value: ${selectedValue}`)
    console.log(`Input value: ${inputValue}`)
  }

  return (
    <Collapse
      className={`inputFilterSalary input-filter_nav ${
        inputValue ? 'activeSalary' : ''
      }`}
    >
      <Panel
        header={inputValue ? `${inputValue} - ${inputValue}` : `Mức lương`}
        key="1"
      >
        <Text className="title-filterSalary">Mức lương</Text>
        <Radio.Group
          value={selectedValue}
          onChange={handleRadioChange}
          className="inputFilter-groupSalary_radio"
        >
          <Radio value="option1">VND</Radio>
          <Radio value="option2">USD</Radio>
        </Radio.Group>
        <br />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="input-text_salary"
          placeholder="Lương tối thiểu"
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="input-text_salary"
          placeholder="Lương tối đa"
        />
        <div className="wrap-button_filter">
          <Button type="default" onClick={handleConfirm}>
            Huỷ
          </Button>
          <Button type="primary" onClick={handleConfirm}>
            Áp dụng
          </Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export default FilterSalary
