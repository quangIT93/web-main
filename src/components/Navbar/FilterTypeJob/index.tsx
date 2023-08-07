import React from 'react';
import { Select, Space, Radio } from 'antd';
// import { EnvironmentOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
// import { useSearchParams } from 'react-router-dom';
import siteApi from 'api/siteApi';

import { getCookie, setCookie } from 'cookies';
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

    // console.log('valueRender Loai cong viec', valueRender);
    console.log('valueRender Loai cong viec value', value);
    setValueRender(valueRender);

    setValue(value);
    setCookie('userTypejobFiltered', JSON.stringify(valueRender), 365);
  };

  return (
    <Radio.Group
      style={{ width: '100%' }}
      name="radiogroup"
      onChange={onChange}
      value={jobType ? jobType : 5}
    // defaultValue={jobType ? jobType : 5}
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
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
}

const { Option } = Select;
const FilterTypeJob: React.FC<TypeJob> = ({
  setTypeJob,
  valueTypeJob,
  reset,
  setReset,
}) => {
  // const [data, setData] = React.useState()
  const [data, setData] = React.useState<{ id: number; name: string }[]>([]);
  const [valueRender, setValueRender] = React.useState<any>();
  // const [searchParams, setSearchParams] = useSearchParams();

  let userFilteredCookies = JSON.parse(
    getCookie('userTypejobFiltered') || '{}',
  );
  const TYPE_JOB = userFilteredCookies?.id;
  // console.log('type', TYPE_JOB);
  const getTypeJob = async () => {
    const result = await siteApi.getJobType("vi");
    const updatedData = [{ id: 5, name: 'Tất cả' }, ...result.data];
    // console.log('updatedData', updatedData);
    if (updatedData) {
      setData(updatedData);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TYPE_JOB]);

  const handleChange = (value1: string) => {
    setReset(false);
  };
  // console.log(`TYPEJOB`, TYPE_JOB);
  return (
    <div className="filter-input">
      <div className="filter-input_icon">
        <PaperFilterIcon width={20} height={20} />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={reset ? 'Tất cả' : valueRender ? valueRender.name : undefined}
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
