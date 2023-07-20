import React, { ReactNode } from 'react';
import { Select, Space, Radio } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { useSearchParams } from 'react-router-dom';
import siteApi from 'api/siteApi';

import { PaperFilterIcon, ArrowFilterIcon } from '#components/Icons';

import './style.scss';

const CustomOption = ({
  data,
  setValue,
  setValueRender,
  jobType,
}: {
  data: any;
  setValue: Function;
  setValueRender: Function;
  jobType: number;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    const valueRender = data.find((item: any) => item.id === value);

    setValueRender(valueRender);

    setValue(value);
  };
  console.log('jobType', jobType);
  return (
    <Radio.Group
      style={{ width: '100%' }}
      name="radiogroup"
      onChange={onChange}
      defaultValue={jobType ? jobType : 5}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {data?.map((value: any, index: number) => {
          return (
            <Radio key={index} style={{ width: '100%' }} value={value.id}>
              {value.name}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

interface TypeJob {
  setTypeJob: Function;
  valueTypeJob: any;
}

const { Option } = Select;
const FilterTypeJob: React.FC<TypeJob> = ({ setTypeJob, valueTypeJob }) => {
  // const [data, setData] = React.useState()
  const [data, setData] = React.useState<{ id: number; name: string }[]>([]);
  const [valueRender, setValueRender] = React.useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const TYPE_JOB = Number(searchParams.get('job-type'));

  const getTypeJob = async () => {
    const result = await siteApi.getJobType();
    const updatedData = [{ id: 5, name: 'Tất cả' }, ...result.data];
    if (updatedData) {
      setData(updatedData);
      console.log('TYPE_JOB', TYPE_JOB);
      console.log('data', data);
      if (TYPE_JOB) {
        const value = updatedData.find((item: any) => item.id === TYPE_JOB);
        setValueRender(value);
      } else {
        setValueRender({ id: 5, name: 'Tất cả' });
      }
    }
  };
  React.useEffect(() => {
    getTypeJob();
  }, []);

  const handleChange = (value1: string) => {};

  return (
    <div className="filter-input">
      <div className="filter-input_icon">
        <PaperFilterIcon width={20} height={20} />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={valueRender ? valueRender.name : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Loai cong viec"
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="5" label="">
          <CustomOption
            jobType={TYPE_JOB}
            data={data}
            setValue={setTypeJob}
            setValueRender={setValueRender}
          />
        </Option>
      </Select>
    </div>
  );
};

export default FilterTypeJob;
