import React from 'react';
import { Select, Space, Radio } from 'antd';
// import { EnvironmentOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import siteApi from 'api/siteApi';
// import { useSearchParams } from 'react-router-dom';

import { getCookie, setCookie } from 'cookies';

import { ClockFilterIcon, ArrowFilterIcon } from '#components/Icons';

// import redux
import { RootState } from 'store';
import { useSelector } from 'react-redux';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import languageApi from 'api/languageApi';

import './style.scss';

const CustomOption = ({
  data,
  setValue,
  setValueRender,
  // salaryType,
  SALARY_TYPE,
}: {
  data: any;
  setValue: Function;
  setValueRender: Function;
  salaryType: number;
  SALARY_TYPE: number;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
    const valueRender = data.find((item: any) => item.id === value);
    setValueRender(valueRender);
    setCookie('userTypeSalaryFiltered', JSON.stringify(valueRender), 365);
  };

  return (
    <Radio.Group
      style={{ width: '100%' }}
      name="radiogroup"
      onChange={onChange}
      value={SALARY_TYPE}
    // defaultValue={SALARY_TYPE}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {data?.map((value: any, index: number) => {
          return (
            <Radio key={index} style={{ width: '100%' }} value={value.id}>
              {value.value}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

interface SalaryFilter {
  setSalaryType: Function;
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
}

const { Option } = Select;
const FilterTypeSalary: React.FC<SalaryFilter> = ({
  setSalaryType,
  reset,
  setReset,
}) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = React.useState();
  const [valueRender, setValueRender] = React.useState<any>();
  const [language, setLanguageState] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setLanguageState(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi()
  }, [languageRedux])

  let userFilteredCookies = JSON.parse(
    getCookie('userTypeSalaryFiltered') || '{}',
  );

  const SALARY_TYPE = userFilteredCookies.id;

  const getTypeSalary = async () => {
    const result = await siteApi.getSalaryType(
      languageRedux == 1 ? "vi" : "en"
    );

    if (result) {
      setData(result.data);
      if (SALARY_TYPE) {
        const value = result.data.find((item: any) => item.id === SALARY_TYPE);
        setValueRender(value);
      }
    }
  };
  React.useEffect(() => {
    getTypeSalary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SALARY_TYPE, languageRedux]);

  const handleChange = (value1: string) => {
    setReset(false);
  };

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
        value={reset ? language?.month : valueRender ? valueRender.value : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder={language?.job_type}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="1" label={language?.job_type}>
          <CustomOption
            salaryType={SALARY_TYPE}
            data={data}
            setValue={setSalaryType}
            setValueRender={setValueRender}
            SALARY_TYPE={SALARY_TYPE}
          />
        </Option>
      </Select>
    </div>
  );
};

export default FilterTypeSalary;
