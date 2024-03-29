import React from 'react';
import { Select, Space, Radio } from 'antd';
// import { EnvironmentOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
// import { useSearchParams } from 'react-router-dom';
import siteApi from 'api/siteApi';

import { getCookie, setCookie } from 'cookies';
import { PaperFilterIcon, ArrowFilterIcon } from '#components/Icons';

// import redux
import { RootState } from 'store';
import { useSelector } from 'react-redux';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';

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

    // console.log('valueRender Loai cong viec value', value);
    setValueRender(valueRender);

    setValue(value);
    setCookie('userTypejobFiltered', JSON.stringify(valueRender), 365);
  };

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  return (
    <Radio.Group
      style={{ width: '100%' }}
      name="radiogroup"
      onChange={onChange}
      value={jobType ? jobType : undefined}
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
  language: any;
}

const { Option } = Select;
const FilterTypeJob: React.FC<TypeJob> = ({
  setTypeJob,
  valueTypeJob,
  reset,
  setReset,
  language,
}) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const [data, setData] = React.useState()
  const [data, setData] = React.useState<{ id: number; value: string }[]>([
    { id: 0, value: 'Tất cả' },
  ]);
  const [valueRender, setValueRender] = React.useState<any>();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])

  let userFilteredCookies = JSON.parse(
    getCookie('userTypejobFiltered') || '{}',
  );
  const TYPE_JOB = userFilteredCookies?.id;
  // console.log('type', TYPE_JOB);
  const getTypeJob = async () => {
    const result = await siteApi.getJobType(
      languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
    );
    const updatedData = [
      {
        id: 5,
        name:
          languageRedux === 1
            ? 'Tất cả'
            : languageRedux === 2
              ? 'All'
              : languageRedux === 3 && '전부',
      },
      ...result.data,
    ];
    // console.log('updatedData', updatedData);
    if (updatedData) {
      setData(updatedData);
      if (TYPE_JOB) {
        const value = updatedData.find((item: any) => item.id === TYPE_JOB);
        setValueRender(value);
      } else {
        setValueRender({
          id: 5, name: languageRedux === 1
            ? 'Tất cả'
            : languageRedux === 2
              ? 'All'
              : '전부'
        });
      }
    }
  };
  React.useEffect(() => {
    getTypeJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TYPE_JOB, languageRedux]);

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
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={
          reset
            ? languageRedux === 1
              ? 'Loại hình công việc'
              : languageRedux === 2
                ? 'Job type'
                : languageRedux === 3 && '직종'
            : valueRender
              ? valueRender.name
              : undefined
        }
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder={
          languageRedux === 1
            ? 'Loại hình công việc'
            : languageRedux === 2
              ? 'Job type'
              : languageRedux === 3 && '직종'
        }
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="5" label="">
          <div
            style={{
              padding: '10px 0',
              textAlign: 'center',
              borderBottom: '1px solid #ccc',
              marginBottom: '12px',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            {languageRedux === 1
              ? 'Loại hình công việc'
              : languageRedux === 2
                ? 'Job type'
                : languageRedux === 3 && '직종'}
          </div>
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
