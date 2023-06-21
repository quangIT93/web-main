import React, { useState } from 'react'
import { Collapse, Radio, Input, Button, Checkbox } from 'antd'

import './style.scss'

const { Panel } = Collapse

const FilterTimeJob = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState([])
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

  const handleCheckboxChange = (checkedValues: any) => {
    setCheckboxValues(checkedValues)
  }

  return (
    <Collapse
      className={`inputFilterTimeJob input-filter_nav ${
        inputValue ? 'activeTimeJob' : ''
      }`}
    >
      <Panel
        header={
          inputValue ? `${inputValue} - ${inputValue}` : `Thời gian làm việc`
        }
        key="1"
      >
        <Radio.Group value={selectedValue} onChange={handleRadioChange}>
          <Radio value="option1">Không thời hạn</Radio>
          <Radio value="option2">Có thời hạn</Radio>
        </Radio.Group>
        <br />
        <Input value={inputValue} onChange={handleInputChange} />
        <Input value={inputValue} onChange={handleInputChange} />

        <Checkbox.Group
          onChange={handleCheckboxChange}
          className="filter-job_checkboxGroup"
        >
          <Checkbox value="checkbox1">Làm việc cuối tuần </Checkbox>
          <Checkbox value="checkbox2">Làm việc từ xa</Checkbox>
        </Checkbox.Group>
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Panel>
    </Collapse>
  )
}

export default FilterTimeJob
