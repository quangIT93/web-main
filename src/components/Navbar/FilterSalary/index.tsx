import React, { useState, useRef, useEffect, memo } from 'react'
import { Collapse, Radio, Input, Button, Typography } from 'antd'

//@ts-ignore
import 'intl'
import 'intl/locale-data/jsonp/en'

import './style.scss'

const { Text } = Typography

const { Panel } = Collapse

interface IFilterSalary {
  typeMoney: number
  setTypeMoney: React.Dispatch<React.SetStateAction<number>>
  salaryMin: number | null
  salaryMax: number | null
  setSalaryMin: React.Dispatch<React.SetStateAction<number | null>>
  setSalaryMax: React.Dispatch<React.SetStateAction<number | null>>
}

const FilterSalary: React.FC<IFilterSalary> = (props) => {
  const {
    typeMoney,
    setTypeMoney,
    setSalaryMax,
    setSalaryMin,
    salaryMax,
    salaryMin,
  } = props

  const [selectedValue, setSelectedValue] = useState<number>(1)
  const [inputValueMin, setInputValueMin] = useState<string | null>(null)
  const [inputValueMax, setInputValueMax] = useState<string | null>(null)

  const [collapseOpen, setCollapseOpen] = useState(false)

  const collapseRef = useRef<any>(null)

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value)
  }

  const handleInputChangeSalaryMin = (e: any) => {
    setInputValueMin(e.target.value.replace(',', ''))
    const reg = /[0-9]+$/
  }

  const handleInputChangeSalaryMax = (e: any) => {
    setInputValueMax(e.target.value.replace(',', ''))
    const reg = /[0-9]+$/
  }

  const handleSubmitValue = () => {
    console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    setSalaryMax(Number(inputValueMax))
    setSalaryMin(Number(inputValueMin))
    setTypeMoney(selectedValue)
  }

  const handleCancleValue = () => {
    // console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    setSalaryMax(null)
    setSalaryMin(null)
    setTypeMoney(1)

    setInputValueMax('')
    setInputValueMin('')
    setSelectedValue(1)
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!collapseRef.current.contains(e.target)) {
        setCollapseOpen(false)
      } else {
        setCollapseOpen(true)
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <Collapse
      className={`inputFilterSalary input-filter_nav ${
        inputValueMin || salaryMax ? 'activeSalary' : ''
      }`}
      activeKey={collapseOpen ? '1' : ''}
      ref={collapseRef}
    >
      <Panel
        header={
          salaryMax || salaryMin
            ? `${new Intl.NumberFormat('en-US').format(
                Number(salaryMin?.toString().replace(',', ''))
              )} - ${new Intl.NumberFormat('en-US').format(
                Number(salaryMax?.toString().replace(',', ''))
              )}`
            : `Mức lương`
        }
        key="1"
      >
        <Text className="title-filterSalary">Mức lương</Text>
        <Radio.Group
          value={selectedValue}
          onChange={handleRadioChange}
          className="inputFilter-groupSalary_radio"
        >
          <Radio value={1}>VND</Radio>
          <Radio value={2}>USD</Radio>
        </Radio.Group>
        <br />
        <Input
          value={inputValueMin ?? ''}
          onChange={handleInputChangeSalaryMin}
          className="input-text_salary"
          placeholder="Lương tối thiểu"
        />
        <Input
          value={inputValueMax ?? ''}
          onChange={handleInputChangeSalaryMax}
          className="input-text_salary"
          placeholder="Lương tối đa"
        />
        <div className="wrap-button_filter">
          <Button type="default" onClick={handleCancleValue}>
            Huỷ
          </Button>
          <Button type="primary" onClick={handleSubmitValue}>
            Áp dụng
          </Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export default memo(FilterSalary)
