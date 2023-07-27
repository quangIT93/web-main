import React, { useState, useRef, useEffect, memo } from 'react';
import { Collapse, Radio, Input, Button, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { getCookie } from 'cookies';

import { DownOutlined } from '@ant-design/icons';
import {
  DolaIcon,
  ListCateIcon,
  ListJobIcon,
  LocationIcon,
  ClockDetailPostIcon,
} from '#components/Icons';
//@ts-ignore
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MoneyFilterIcon } from '#components/Icons';
import './style.scss';

import { ArrowFilterIcon } from '#components/Icons';

const { Text } = Typography;

const { Panel } = Collapse;

interface IFilterSalary {
  typeMoney: number | null;
  setTypeMoney: React.Dispatch<React.SetStateAction<number | null>>;
  salaryMin: number | null;
  salaryMax: number | null;
  setSalaryMin: React.Dispatch<React.SetStateAction<number | null>>;
  setSalaryMax: React.Dispatch<React.SetStateAction<number | null>>;
  salaryType: number;
}

const FilterSalary: React.FC<IFilterSalary> = (props) => {
  const {
    salaryType,
    typeMoney,
    setTypeMoney,
    setSalaryMax,
    setSalaryMin,
    salaryMax,
    salaryMin,
  } = props;

  const [inputValueMin, setInputValueMin] = useState<string | null>(null);
  const [inputValueMax, setInputValueMax] = useState<string | null>(null);

  const [collapseOpen, setCollapseOpen] = useState(false);

  const [checkSalary, setCheckSalary] = useState(false);

  const collapseRef = useRef<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');

  const Salary_Max = userFilteredCookies?.salary_max;
  const Salary_Min = userFilteredCookies?.salary_min;
  const Type_Money = userFilteredCookies?.money_type;
  const [selectedValue, setSelectedValue] = useState<number | null>(Type_Money);

  useEffect(() => {
    if (Type_Money) {
      setTypeMoney(Type_Money);
    }

    if (Salary_Min && Salary_Min !== 0) {
      setSalaryMin(Salary_Min);
    } else if (Salary_Min === 0) {
      setSalaryMin(null);
    }

    if (Salary_Max) {
      setSalaryMax(Salary_Max);
    } else if (Salary_Max === 0) {
      setSalaryMax(null);
    }
  }, [Salary_Max, Salary_Min, Salary_Max]);

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
    setTypeMoney(e.target.value);
  };

  const handleInputChangeSalaryMin = (e: any) => {
    // setInputValueMin(e.target.value.replace(',', ''))
    const inputValue = e.target.value.replace(',', '');
    const reg = /[0-9]+$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      // setInputValueMin(inputValue.replace(',', ''));
      setSalaryMin(inputValue.replace(',', ''));
    }
  };

  const handleInputChangeSalaryMax = (e: any) => {
    // setInputValueMax(e.target.value.replace(',', ''))

    const inputValue = e.target.value.replace(',', '');

    const reg = /[0-9]+$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      // setInputValueMax(inputValue.replace(',', ''));
      setSalaryMax(inputValue.replace(',', ''));
    }
  };

  const handleSubmitValue = () => {
    // console.log(`Input value: ${inputValue}`)
    const reg = /[0-9]+$/;

    if (inputValueMin && !inputValueMax && Salary_Max < Number(inputValueMin)) {
      setCheckSalary(true);
      setTimeout(() => {
        setCheckSalary(false);
      }, 4000);
    } else if (
      inputValueMax &&
      !inputValueMin &&
      Number(inputValueMax) < Salary_Min
    ) {
      setCheckSalary(true);
      setTimeout(() => {
        setCheckSalary(false);
      }, 4000);
    } else if (
      inputValueMax &&
      inputValueMin &&
      Number(inputValueMax) < Number(inputValueMin)
    ) {
      setCheckSalary(true);
      setTimeout(() => {
        setCheckSalary(false);
      }, 4000);
    } else {
      if (inputValueMax) {
        const inputValue = inputValueMax?.replace(',', '');
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMax(Number(inputValue.replace(',', '')));
        }
      } else if (Salary_Max) {
        const inputValue = Salary_Max.toString()?.replace(',', '');
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMax(Number(inputValue.replace(',', '')));
        }
      } else {
        setSalaryMax(0);
      }

      if (inputValueMin) {
        const inputValue = inputValueMin?.replace(',', '');
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMin(Number(inputValue.replace(',', '')));
        }
      } else if (Salary_Min) {
        const inputValue = Salary_Min.toString()?.replace(',', '');
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
          setSalaryMin(Number(inputValue.replace(',', '')));
        }
      } else {
        setSalaryMin(0);
      }

      if (!salaryMax && !salaryMin) {
        setSalaryMin(0);
        setSalaryMax(12000000);
      }
    }

    setTypeMoney(selectedValue);
  };

  // useEffect(() => {
  //   const reg = /[0-9]+$/;

  //   if (inputValueMin && !inputValueMax && Salary_Max < Number(inputValueMin)) {
  //     console.log('vô');
  //     setCheckSalary(true);
  //     setTimeout(() => {
  //       setCheckSalary(false);
  //     }, 4000);
  //   } else if (
  //     inputValueMax &&
  //     !inputValueMin &&
  //     Number(inputValueMax) < Salary_Min
  //   ) {
  //     console.log('vô');
  //     setCheckSalary(true);
  //     setTimeout(() => {
  //       setCheckSalary(false);
  //     }, 4000);
  //   } else if (
  //     inputValueMax &&
  //     inputValueMin &&
  //     Number(inputValueMax) < Number(inputValueMin)
  //   ) {
  //     console.log('vô');
  //     setCheckSalary(true);
  //     setTimeout(() => {
  //       setCheckSalary(false);
  //     }, 4000);
  //   } else {
  //     if (inputValueMax) {
  //       const inputValue = inputValueMax?.replace(',', '');
  //       if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
  //         setSalaryMax(Number(inputValue.replace(',', '')));
  //       }
  //     } else if (Salary_Max) {
  //       const inputValue = Salary_Max.toString()?.replace(',', '');
  //       if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
  //         setSalaryMax(Number(inputValue.replace(',', '')));
  //       }
  //     } else {
  //       setSalaryMax(0);
  //     }

  //     if (inputValueMin) {
  //       const inputValue = inputValueMin?.replace(',', '');
  //       if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
  //         setSalaryMin(Number(inputValue.replace(',', '')));
  //       }
  //     } else if (Salary_Min) {
  //       const inputValue = Salary_Min.toString()?.replace(',', '');
  //       if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
  //         setSalaryMin(Number(inputValue.replace(',', '')));
  //       }
  //     } else {
  //       setSalaryMin(0);
  //     }

  //     if (!salaryMax && !salaryMin) {
  //       setSalaryMin(6000000);
  //       setSalaryMax(12000000);
  //     }
  //   }
  // }, [inputValueMax, inputValueMin]);

  useEffect(() => {
    if (salaryType === 6) {
      setSalaryMax(0);
      setSalaryMin(0);
      setInputValueMax('0');
      setInputValueMin('0');
    }

    if (!salaryMax && !salaryMin && !Salary_Max && !Salary_Min) {
      setSalaryMax(12000000);
      setSalaryMin(0);
      setInputValueMax('12000000');
      setInputValueMin('0');
    }
  }, [salaryType]);
  // console.log('paramMin', Salary_Min);
  // console.log('paramMax', Salary_Max);
  // console.log('salaryMax', salaryMax);
  // console.log('salaryMin', salaryMin);
  // console.log('inputValueMax', inputValueMax);
  // console.log('inputValueMin', inputValueMin);

  const handleCancleValue = () => {
    // console.log(`Selected value: ${selectedValue}`)
    // console.log(`Input value: ${inputValue}`)
    setSalaryMax(12000000);
    setSalaryMin(0);
    setTypeMoney(1);

    setInputValueMax('12000000');
    setInputValueMin('0');
    setSelectedValue(1);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        // collapseRef &&
        // !collapseRef?.current?.contains(e.target)
        e.target.closest('.inputFilterSalary') &&
        e.target.closest('.submitValue')
      ) {
        setCollapseOpen(false);
      } else if (!e.target.closest('.inputFilterSalary')) {
        setCollapseOpen(false);
      } else if (e.target.closest('.inputFilterSalary')) {
        setCollapseOpen(true);
      }
    };
    // \ant-collapse-header

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="filter-input">
      <div className="filter-input_icon">
        <MoneyFilterIcon width={20} height={20} />
      </div>
      <Collapse
        className={`inputFilterSalary input-filter_nav ${inputValueMin || salaryMax ? 'activeSalary' : ''
          }`}
        activeKey={collapseOpen ? '1' : ''}
        ref={collapseRef}
        expandIconPosition="end"
        expandIcon={(panelProps) => <ArrowFilterIcon width={14} height={10} />}
      >
        <Panel
          header={
            salaryMax || salaryMin
              ? `${new Intl.NumberFormat('en-US').format(
                Number(salaryMin?.toString().replace(',', '')),
              )} - ${new Intl.NumberFormat('en-US').format(
                Number(salaryMax?.toString().replace(',', '')),
              )}`
              : `Mức lương`
          }
          key="1"
        >
          <Text className="title-filterSalary">Mức lương</Text>
          <Radio.Group
            value={selectedValue}
            onChange={handleRadioChange}
            className="inputFilter-groupSalary_radio"
          // defaultValue={Type_Money}
          >
            <Radio value={1}>VND</Radio>
            <Radio value={2}>USD</Radio>
          </Radio.Group>
          <br />
          <Input
            maxLength={11}
            // value={inputValueMin ? inputValueMin : Salary_Min ? Salary_Min : ''}
            value={
              // inputValueMin || inputValueMin === ''
              //   ? new Intl.NumberFormat('en-US').format(
              //       Number(inputValueMin.toString().replace(',', '')),
              //     )
              //   :
              salaryMin
                ? new Intl.NumberFormat('en-US').format(
                  Number(salaryMin.toString().replace(',', '')),
                )
                : new Intl.NumberFormat('en-US').format(
                  Number(salaryMin?.toString().replace(',', '')),
                )
            }
            onChange={handleInputChangeSalaryMin}
            className="input-text_salary"
            placeholder="Lương tối thiểu"
            disabled={salaryType === 6}
          />
          <Input
            maxLength={selectedValue === 1 ? 11 : 5}
            // value={inputValueMax ? inputValueMax : Salary_Max ? Salary_Max : ''}
            value={
              // inputValueMax || inputValueMax === ''
              //   ? new Intl.NumberFormat('en-US').format(
              //       Number(inputValueMax.toString().replace(',', '')),
              //     )
              //   :
              salaryMax
                ? new Intl.NumberFormat('en-US').format(
                  Number(salaryMax.toString().replace(',', '')),
                )
                : new Intl.NumberFormat('en-US').format(
                  Number(salaryMax?.toString().replace(',', '')),
                )
            }
            onChange={handleInputChangeSalaryMax}
            className="input-text_salary"
            placeholder="Lương tối đa"
            disabled={salaryType === 6}
          />
          {checkSalary ? (
            <i style={{ color: 'red', marginBottom: '24px' }}>
              Tiền tối thiểu không được lớn hơn tiền tối đa
            </i>
          ) : (
            <></>
          )}
          {/* <div className="wrap-button_filter">
            <Button type="default" onClick={handleCancleValue}>
              Đặt lại
            </Button>
            <Button
              type="primary"
              onClick={handleSubmitValue}
              className="submitValue"
            >
              Áp dụng
            </Button>
          </div> */}
        </Panel>
      </Collapse>
    </div>
  );
};

export default memo(FilterSalary);
