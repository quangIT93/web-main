import React, { useState } from 'react'
import { Collapse, Radio, Input, Button } from 'antd'

import './style.scss'

const { Panel } = Collapse

const FilterSalary = () => {
  const [selectedValue, setSelectedValue] = useState('')
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
        <Radio.Group value={selectedValue} onChange={handleRadioChange}>
          <Radio value="option1">VND</Radio>
          <Radio value="option2">USD</Radio>
        </Radio.Group>
        <br />
        <Input value={inputValue} onChange={handleInputChange} />
        <Input value={inputValue} onChange={handleInputChange} />

        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Panel>
    </Collapse>
  )
}

export default FilterSalary
