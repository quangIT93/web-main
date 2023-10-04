import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// import redux
import { RootState } from 'store';

import { EnvironmentOutlined } from '@ant-design/icons';

import { PaperFilterIcon, ArrowFilterIcon } from '#components/Icons';

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

const CustomOption = ({
  academicType,
  setTypeAcademic,
  setEducations,
  typeAcademic,
  setValueRender,
  reset,
}: {
  academicType: any;
  typeAcademic: number | null;
  setEducations: Function;
  setTypeAcademic: any;
  setValueRender: Function;
  reset: boolean;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    // console.log('valueRender Loai cong viec', valueRender);
    // console.log('valueRender Loai cong viec value', value);
    const valueRender = academicType.find((item: any) => item.id === value);
    console.log('valueRender Loai cong viec value', valueRender);
    setEducations(value);
    if (valueRender) {
      setValueRender(valueRender);
    }
    setTypeAcademic(value);
  };

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  return (
    <div className="wrap-radio_candidate">
      <div className="title-candidate">
        <h3> Trình độ học vấn</h3>
      </div>
      <Radio.Group
        style={{ width: '100%' }}
        name="radiogroup"
        onChange={onChange}
        value={typeAcademic && reset ? undefined : typeAcademic}
        // defaultValue={jobType ? jobType : 5}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {academicType?.map((value: any, index: number) => {
            console.log(value.id);

            return (
              <Radio key={index} style={{ width: '100%' }} value={value.id}>
                {value.data}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

interface ISeachEducation {
  setEducations: any;
  setReset: Function;
  reset: boolean;
}

const SeachEducation: React.FC<ISeachEducation> = (props) => {
  const { setEducations, setReset, reset } = props;
  const [academicType, setAcademicType] = React.useState([]);

  const { Option } = Select;

  const [typeAcademic, setTypeAcademic] = React.useState(null);
  const [valueRender, setValueRender] = React.useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const academicTypesFnc = async () => {
    try {
      const result = await candidateSearch.getAcademicTypes('vi');
      if (result) {
        setAcademicType(result.data);
      }
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  React.useEffect(() => {
    academicTypesFnc();
  }, []);

  const onChange = (value: string[][]) => {
    console.log(value);
  };
  const handleChange = (value1: number) => {
    setReset(false);
  };

  useEffect(() => {
    if (reset) {
      setValueRender(null);
    }
  }, [reset]);

  console.log('reset', reset);
  console.log('valueRnder', valueRender);

  return (
    <div className="filter-candidate">
      <div className="filter-input_candidate">
        <PaperFilterIcon width={20} height={20} />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={reset && valueRender ? undefined : valueRender?.data}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Trình độ học vấn"
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value={valueRender?.id} label="">
          <CustomOption
            academicType={academicType}
            setTypeAcademic={setTypeAcademic}
            setEducations={setEducations}
            typeAcademic={typeAcademic}
            setValueRender={setValueRender}
            reset={reset}
          />
        </Option>
      </Select>
    </div>
  );
};

export default SeachEducation;
