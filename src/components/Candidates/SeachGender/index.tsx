import React from 'react';

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
  typeAcademic,
  setValueRender,
}: {
  academicType: any;
  typeAcademic: number;
  setTypeAcademic: any;
  setValueRender: Function;
}) => {
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    // console.log('valueRender Loai cong viec', valueRender);
    // console.log('valueRender Loai cong viec value', value);
    const valueRender = academicType.find((item: any) => item.id === value);
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
    </div>
  );
};

const SeachGender = () => {
  const [academicType, setAcademicType] = React.useState([]);
  const [reset, setReset] = React.useState(false);

  const { Option } = Select;

  const [typeAcademic, setTypeAcademic] = React.useState(1);

  const [valueRender, setValueRender] = React.useState<any>();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);

  const gender = [
    {
      id: 1,
      data: 'male',
    },
    {
      id: 0,
      data: 'female',
    },
  ];

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
  const handleChange = (value1: string) => {
    setReset(false);
  };
  return (
    <div className="filter-candidate">
      <div className="filter-input_candidate">
        <PaperFilterIcon width={20} height={20} />
      </div>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={valueRender ? valueRender.data : undefined}
        className="inputTypeSalary input-filter_nav"
        size="large"
        placeholder="Giới tính"
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
      >
        <Option className="type-salary" value="5" label="">
          <CustomOption
            academicType={gender}
            setTypeAcademic={setTypeAcademic}
            typeAcademic={typeAcademic}
            setValueRender={setValueRender}
          />
        </Option>
      </Select>
    </div>
  );
};

export default SeachGender;
