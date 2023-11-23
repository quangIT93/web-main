import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// import redux
import { RootState } from 'store';

import { EnvironmentOutlined } from '@ant-design/icons';

import { ArrowFilterIcon } from '#components/Icons';
import { PersonIcon } from '#components/Icons/iconCandidate';
import candidateSearch from 'api/apiCandidates';

// import ant
import {
  Button,
  Cascader,
  Divider,
  Typography,
  Select,
  Space,
  Radio,
} from 'antd';
import type { RadioChangeEvent } from 'antd';

import './style.scss';
import apiCompany from 'api/apiCompany';

const CustomOption = ({
  sizeType,
  setTypeSizeCompany,
  setSize,
  typeSizeCompany,
  setValueRender,
  reset,
}: {
  sizeType: any;
  typeSizeCompany: number | null;
  setSize: Function;
  setTypeSizeCompany: any;
  setValueRender: Function;
  reset: boolean;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    // console.log('valueRender Loai cong viec', valueRender);
    // console.log('valueRender Loai cong viec value', value);
    const valueRender = sizeType.find((item: any) => item.id === value);

    setSize(value);
    if (valueRender) {
      setValueRender(valueRender);
    }
    setTypeSizeCompany(value);
  };

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  return (
    <div className="wrap-radio_company">
      <div className="title-company">
        <h3>{languageRedux === 1 ? 'Quy mô công ty' : "Company's size"}</h3>
      </div>
      <Radio.Group
        style={{ width: '100%' }}
        name="radiogroup"
        onChange={onChange}
        value={typeSizeCompany && reset ? undefined : typeSizeCompany}
        // defaultValue={jobType ? jobType : 5}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {sizeType?.map((value: any, index: number) => {
            return (
              <Radio key={index} style={{ width: '100%' }} value={value.id}>
                {value.nameText}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

interface ISeachEducation {
  setSize: any;
  setReset: Function;
  reset: boolean;
}

const SearchSizeCompany: React.FC<ISeachEducation> = (props) => {
  const { setSize, setReset, reset } = props;
  const [sizeType, setSizeType] = React.useState<any>([]);

  const { Option } = Select;

  const [typeSizeCompany, setTypeSizeCompany] = React.useState(null);
  const [valueRender, setValueRender] = React.useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const getSizeCompany = async () => {
    try {
      const result = await apiCompany.getAllSizesCompany(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setSizeType(result);
      }
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  React.useEffect(() => {
    getSizeCompany();
  }, [languageRedux]);

  const onChange = (value: string[][]) => {};
  const handleChange = (value1: number) => {
    setReset(false);
  };

  useEffect(() => {
    if (reset) {
      setValueRender(null);
    }
  }, [reset]);

  return (
    <div className="filter-size-company">
      <div className="filter-input_size_company">
        <PersonIcon />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={reset && valueRender ? undefined : valueRender?.nameText}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder={languageRedux === 1 ? 'Quy mô công ty' : "Company's size"}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        // open={true}
        // onMouseLeave={set}
      >
        <Option className="type-salary" value={valueRender?.id} label="">
          <div className="sssssssssssssssssssssssssss">
            <CustomOption
              sizeType={sizeType}
              setTypeSizeCompany={setTypeSizeCompany}
              setSize={setSize}
              typeSizeCompany={typeSizeCompany}
              setValueRender={setValueRender}
              reset={reset}
            />
          </div>
        </Option>
      </Select>
    </div>
  );
};

export default SearchSizeCompany;
