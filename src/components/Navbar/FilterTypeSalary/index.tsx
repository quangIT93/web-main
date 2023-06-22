import React, { ReactNode } from 'react'
import { Select, Space, Radio } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd';
import siteApi from 'api/siteApi'

import './style.scss'

const CustomOption = ({
  data,
  setValue,
  setValueRender,
}: {
  data: any
  setValue: Function
  setValueRender: Function
}) => {
  console.log('Custom option', data)
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue(value)
    const valueRender = data.find((item: any) => item.id == value)
    setValueRender(valueRender)
  };

  return (
    <Radio.Group style={{ width: "100%", }} name="radiogroup" onChange={onChange} >
      <Space direction="vertical" style={{ width: "100%" }}>
        {
          data?.map((value: any, index: number) => {
            return <Radio key={index} style={{ width: "100%" }} value={value.id}>{value.value}</Radio>
          })
        }
      </Space>
    </Radio.Group>
  )
}

interface SalaryFilter {
  setSalaryType: Function
}


const { Option } = Select
const FilterTypeSalary: React.FC<SalaryFilter> = ({ setSalaryType }) => {


  const [data, setData] = React.useState()
  const [valueRender, setValueRender] = React.useState<any>()


  const getTypeSalary = async () => {
    const result = await siteApi.getSalaryType()

    if (result) {
      setData(result.data)
    }
  }
  React.useEffect(() => {
    getTypeSalary()
  }, [])


  const handleChange = (value1: string) => {

  }
  return (
    <>
      <Select
        // defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={valueRender ? valueRender.value : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Trả lương theo"
      >
        <Option className='type-salary' value="1" label="Jack">
          <CustomOption data={data} setValue={setSalaryType} setValueRender={setValueRender} />
        </Option>
      </Select>
    </>
  )
}

export default FilterTypeSalary
