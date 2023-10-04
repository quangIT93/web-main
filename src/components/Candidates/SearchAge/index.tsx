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
  Input,
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
  const [valueMinAge, setValueMinAge] = React.useState(0);
  const [valueMaxAge, setValueMaxAge] = React.useState(0);

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
      <Input placeholder="Please enter item" />
      <div className="title-candidate">
        <h3>Độ tuổi</h3>
      </div>
      <div className="input-age">
        <div className="block-input_age"></div>

        <div className="block-input_age">
          <input
            type="number"
            name=""
            id=""
            className="input-item_age"
            value={valueMaxAge}
          />
        </div>
      </div>
    </div>
  );
};

interface ISeachAge {
  setAgeMin: any;
  setAgeMax: any;
  ageMax: number;
  ageMin: number;
  setReset: Function;
  reset: boolean;
}

const SeachAge: React.FC<ISeachAge> = (props) => {
  const { setAgeMin, setAgeMax, ageMax, ageMin, reset, setReset } = props;
  const [academicType, setAcademicType] = React.useState([]);

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
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const [valueMinAge, setValueMinAge] = React.useState(0);
  const [valueMaxAge, setValueMaxAge] = React.useState(0);
  const selectRef = React.useRef<any>(null);
  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      const element = document.querySelector('.wrap-radio_candidateAge');
      if (
        (selectRef.current && !selectRef.current?.contains(event.target)) ||
        (element && !element.contains(event.target))
      ) {
        setIsSelectOpen(false); // Đóng Select khi click bên ngoài
      }
      const element1 = document.querySelector('.wrap-radio_candidateAge');

      console.log(element1?.contains(event.target));

      if (
        (selectRef.current && selectRef.current?.contains(event.target)) ||
        (element && element.contains(event.target))
      ) {
        // Đóng Select khi click bên ngoài
        setIsSelectOpen(true);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSelectOpen]);

  return (
    <div className="filter-candidate" ref={selectRef}>
      <div className="filter-input_candidate">
        <PaperFilterIcon width={20} height={20} />
      </div>
      <Select
        // ref={selectRef}
        style={{ width: 120 }}
        onChange={handleChange}
        optionLabelProp="label"
        value={reset && ageMax && ageMin ? undefined : `${ageMin} - ${ageMax}`}
        className=""
        size="large"
        placeholder="Độ tuổi"
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        open={isSelectOpen}
        dropdownRender={(menu) => (
          <div className="wrap-radio_candidateAge">
            {/* {menu} */}
            <div className="title-search_age">
              <h3>Độ tuổi</h3>
            </div>

            <Divider style={{ margin: '8px 0' }} />
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 0',
                justifyContent: 'center',
              }}
            >
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="Please enter item"
                  type="number"
                  defaultValue="0"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                  // ref={inputRef}
                  value={ageMin}
                  max={100}
                  onChange={(e) => {
                    setReset(false);
                    setAgeMin(e.target.value);
                  }}
                />
                {/* <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button> */}
              </Space>
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="Please enter item"
                  type="number"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                  defaultValue={60}
                  // ref={inputRef}
                  value={ageMax}
                  max={100}
                  onChange={(e) => {
                    setAgeMax(e.target.value);
                    setReset(false);
                  }}
                />
                {/* <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button> */}
              </Space>
            </div>
          </div>
        )}
      >
        {/* <Option className="type-salary" value="5" label="">
          <CustomOption
            academicType={gender}
            setTypeAcademic={setTypeAcademic}
            typeAcademic={typeAcademic}
            setValueRender={setValueRender}
          />
        </Option> */}
      </Select>
    </div>
  );
};

export default SeachAge;
