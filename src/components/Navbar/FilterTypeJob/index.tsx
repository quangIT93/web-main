import React, { ReactNode } from 'react'
import { Select, Space, Radio } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd';
import siteApi from 'api/siteApi'

import './style.scss'

const CustomOption = ({
  data,
  setValue,

}: {
  data: any
  setValue: Function

}) => {

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);

    const valueRender = data.find((item: any) => item.id == value)

    setValue(valueRender)
  };

  return (
    <Radio.Group style={{ width: "100%", }} name="radiogroup" onChange={onChange} >
      <Space direction="vertical" style={{ width: "100%" }}>
        {
          data?.map((value: any, index: number) => {
            return <Radio key={index} style={{ width: "100%" }} value={value.id}>{value.name}</Radio>
          })
        }
      </Space>
    </Radio.Group>
  )
}

interface TypeJob {
  setTypeJob: Function
  valueTypeJob: any
}


const { Option } = Select
const FilterTypeJob: React.FC<TypeJob> = ({ setTypeJob, valueTypeJob }) => {


  const [data, setData] = React.useState()



  const getTypeJob = async () => {
    const result = await siteApi.getJobType()
    console.log(result)

    if (result) {
      setData(result.data)
    }
  }
  React.useEffect(() => {
    getTypeJob()
  }, [])


  const handleChange = (value1: string) => {

  }
  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={valueTypeJob ? valueTypeJob.name : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Loai cong viec"
      >
        <Option className='type-salary' value="1" label="Jack">
          <CustomOption data={data} setValue={setTypeJob} />
        </Option>
      </Select>
    </>
  )
}

export default FilterTypeJob
