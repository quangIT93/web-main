import React, { ReactNode } from 'react'
import { Select, Space, Radio } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'
import siteApi from 'api/siteApi'
import { useSearchParams } from 'react-router-dom'

import { ClockFilterIcon, ArrowFilterIcon } from '#components/Icons'

import './style.scss'

const CustomOption = ({
  data,
  setValue,
  setValueRender,
  salaryType,
}: {
  data: any
  setValue: Function
  setValueRender: Function
  salaryType: number
}) => {
  console.log('Custom option', data)
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value)
    const valueRender = data.find((item: any) => item.id == value)
    setValueRender(valueRender)
  }

  return (
    <Radio.Group
      style={{ width: '100%' }}
      name="radiogroup"
      onChange={onChange}
      defaultValue={salaryType}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {data?.map((value: any, index: number) => {
          return (
            <Radio key={index} style={{ width: '100%' }} value={value.id}>
              {value.value}
            </Radio>
          )
        })}
      </Space>
    </Radio.Group>
  )
}

interface SalaryFilter {
  setSalaryType: Function
}

const { Option } = Select
const FilterTypeSalary: React.FC<SalaryFilter> = ({ setSalaryType }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = React.useState()
  const [valueRender, setValueRender] = React.useState<any>()

  const SALARY_TYPE = Number(searchParams.get('sal-type'))

  const getTypeSalary = async () => {
    const result = await siteApi.getSalaryType()

    if (result) {
      setData(result.data)
      if (SALARY_TYPE) {
        const value = result.data.find((item: any) => item.id === SALARY_TYPE)
        setValueRender(value)
      }
    }
  }
  React.useEffect(() => {
    getTypeSalary()
  }, [])

  const handleChange = (value1: string) => { }
  return (
    <div className="filter-input">
      <div className="filter-input_icon">
        <ClockFilterIcon width={20} height={20} />
      </div>
      <Select
        // defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={valueRender ? valueRender.value : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Trả lương theo"
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="1" label="Jack">
          <CustomOption
            salaryType={SALARY_TYPE}
            data={data}
            setValue={setSalaryType}
            setValueRender={setValueRender}
          />
        </Option>
      </Select>
    </div>
  )
}

export default FilterTypeSalary
