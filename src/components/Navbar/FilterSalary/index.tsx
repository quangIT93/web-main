import React, { useState, useRef, useEffect, memo } from 'react'
import { Collapse, Radio, Input, Button, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'

//@ts-ignore
import 'intl'
import 'intl/locale-data/jsonp/en'

import './style.scss'

const { Text } = Typography

const { Panel } = Collapse

interface IFilterSalary {
  typeMoney: number | null
  setTypeMoney: React.Dispatch<React.SetStateAction<number | null>>
  salaryMin: number | null
  salaryMax: number | null
  setSalaryMin: React.Dispatch<React.SetStateAction<number | null>>
  setSalaryMax: React.Dispatch<React.SetStateAction<number | null>>
  salaryType: number
}

const FilterSalary: React.FC<IFilterSalary> = (props) => {
  const {
    salaryType,
    typeMoney,
    setTypeMoney,
    setSalaryMax,
    setSalaryMin,
    salaryMax,
    salaryMin,
  } = props

  const [selectedValue, setSelectedValue] = useState<number | null>(1)
  const [inputValueMin, setInputValueMin] = useState<string | null>(null)
  const [inputValueMax, setInputValueMax] = useState<string | null>(null)

  const [collapseOpen, setCollapseOpen] = useState(false)

  const [checkSalary, setCheckSalary] = useState(false)

  const collapseRef = useRef<any>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const Salary_Max = Number(searchParams.get('salary_max'))
  const Salary_Min = Number(searchParams.get('salary_min'))
  const Type_Money = Number(searchParams.get('money_type'))

  useEffect(() => {
    if (Type_Money) {
      setTypeMoney(Type_Money)
    }

    if (Salary_Min && Salary_Min !== 0) {
      setSalaryMin(Salary_Min)
    } else if (Salary_Min === 0) {
      setSalaryMin(null)
    }

    if (Salary_Max) {
      setSalaryMax(Salary_Max)
    } else if (Salary_Max === 0) {
      setSalaryMax(null)
    }
  }, [Salary_Max, Salary_Min, Salary_Max])

  console.log('moneyType', typeMoney)
  console.log('max', salaryMax)
  console.log('min', salaryMin)
  console.log('min', Salary_Min)

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value)
  }

  const handleInputChangeSalaryMin = (e: any) => {
    // setInputValueMin(e.target.value.replace(',', ''))
    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setInputValueMin(inputValue.replace(',', ''))
    }
  }

  const handleInputChangeSalaryMax = (e: any) => {
    // setInputValueMax(e.target.value.replace(',', ''))
    const inputValue = e.target.value.replace(',', '')
    const reg = /[0-9]+$/

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setInputValueMax(inputValue.replace(',', ''))
    }
  }

  const handleSubmitValue = () => {
    console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    const reg = /[0-9]+$/

    console.log('dieu kien', Number(inputValueMax) > Number(inputValueMin))
    if (Number(inputValueMax) < Number(inputValueMin)) {
      setCheckSalary(true)
      setTimeout(() => {
        setCheckSalary(false)
      }, 4000)
    } else {
      if (inputValueMax) {
        const inputValue = inputValueMax?.replace(',', '')
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMax(Number(inputValue.replace(',', '')))
        }
      } else if (Salary_Max) {
        const inputValue = Salary_Max.toString()?.replace(',', '')
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMax(Number(inputValue.replace(',', '')))
        }
      } else {
        setSalaryMax(0)
      }
      if (inputValueMin) {
        const inputValue = inputValueMin?.replace(',', '')
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMin(Number(inputValue.replace(',', '')))
        }
      } else if (Salary_Min) {
        const inputValue = Salary_Min.toString()?.replace(',', '')
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMin(Number(inputValue.replace(',', '')))
        }
      } else {
        setSalaryMin(0)
      }

      if (!salaryMax && !salaryMin) {
        setSalaryMin(6000000)
        setSalaryMax(12000000)
      }
    }

    setTypeMoney(selectedValue)
  }

  useEffect(() => {
    if (salaryType === 6) {
      setSalaryMax(0)
      setSalaryMin(0)
      setInputValueMax('0')
      setInputValueMin('0')
    }

    if (!salaryMax && !salaryMin) {
      setSalaryMax(12000000)
      setSalaryMin(6000000)
      setInputValueMax('12000000')
      setInputValueMin('6000000')
    }
  }, [salaryType])

  const handleCancleValue = () => {
    // console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    setSalaryMax(12000000)
    setSalaryMin(6000000)
    setTypeMoney(1)

    setInputValueMax('12000000')
    setInputValueMin('6000000')
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
  console.log('salaryType', salaryType)
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
          maxLength={11}
          // value={inputValueMin ? inputValueMin : Salary_Min ? Salary_Min : ''}
          value={
            inputValueMin
              ? new Intl.NumberFormat('en-US').format(
                  Number(inputValueMin.toString().replace(',', ''))
                )
              : Salary_Min
              ? new Intl.NumberFormat('en-US').format(
                  Number(Salary_Min.toString().replace(',', ''))
                )
              : new Intl.NumberFormat('en-US').format(
                  Number('6000000'.replace(',', ''))
                )
          }
          onChange={handleInputChangeSalaryMin}
          className="input-text_salary"
          placeholder="Lương tối thiểu"
          disabled={salaryType === 6}
        />
        <Input
          maxLength={selectedValue === 1 ? 11 : 5}
          // value={inputValueMax ? inputValueMax : Salary_Max ? Salary_Max : ''}
          value={
            inputValueMax
              ? new Intl.NumberFormat('en-US').format(
                  Number(inputValueMax.toString().replace(',', ''))
                )
              : Salary_Max
              ? new Intl.NumberFormat('en-US').format(
                  Number(Salary_Max.toString().replace(',', ''))
                )
              : new Intl.NumberFormat('en-US').format(
                  Number('12000000'.replace(',', ''))
                )
          }
          onChange={handleInputChangeSalaryMax}
          className="input-text_salary"
          placeholder="Lương tối đa"
          disabled={salaryType === 6}
        />
        {checkSalary ? (
          <i style={{ color: 'red', marginBottom: '24px' }}>
            Tiền tối thiểu không được lớn hơn tiền tối đa
          </i>
        ) : (
          <></>
        )}
        <div className="wrap-button_filter">
          <Button type="default" onClick={handleCancleValue}>
            Đặt lại
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
