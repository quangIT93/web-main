import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { Collapse, Radio, Input, Typography } from 'antd';
// import { useSearchParams } from 'react-router-dom';

import { getCookie } from 'cookies';

//@ts-ignore
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MoneyFilterIcon } from '#components/Icons';
import './style.scss';

import { ArrowFilterIcon } from '#components/Icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import languageApi from 'api/languageApi';

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
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
}

const FilterSalary: React.FC<IFilterSalary> = (props) => {
  const {
    salaryType,
    setTypeMoney,
    setSalaryMax,
    setSalaryMin,
    salaryMax,
    salaryMin,
    reset,
    setReset,
  } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const [inputValueMin, setInputValueMin] = useState<string | null>(null);
  // const [inputValueMax, setInputValueMax] = useState<string | null>(null);

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [language, setLanguageState] = useState<any>();

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

  // const [checkSalary, setCheckSalary] = useState(false);

  const checkSalary = useMemo(() => {
    // Thực hiện các logic bạn cần ở đây
    return false; // Giả sử bạn trả về false, thay bằng logic thật
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const collapseRef = useRef<any>(null);

  // const [searchParams, setSearchParams] = useSearchParams();

  let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');

  const Salary_Max = userFilteredCookies?.salary_max
    ? userFilteredCookies?.salary_max
    : 0;
  const Salary_Min = userFilteredCookies?.salary_min
    ? userFilteredCookies?.salary_min
    : 0;
  const Type_Money = userFilteredCookies?.money_type;
  const [selectedValue, setSelectedValue] = useState<number | null>(Type_Money);

  useEffect(() => {
    if (Type_Money) {
      setTypeMoney(Type_Money);
      setSelectedValue(Type_Money);
    }

    if (Salary_Min && Salary_Min !== 0) {
      setSalaryMin(Salary_Min);
    } else if (Salary_Min === 0) {
      setSalaryMin(0);
    }

    if (Salary_Max) {
      setSalaryMax(Salary_Max);
    } else if (Salary_Max === 0) {
      setSalaryMax(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Salary_Max, Salary_Min, Salary_Max, Type_Money]);

  const handleRadioChange = (e: any) => {
    setReset(false);
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

  // const handleSubmitValue = () => {
  //   // console.log(`Input value: ${inputValue}`)
  //   const reg = /[0-9]+$/;

  //   if (inputValueMin && !inputValueMax && Salary_Max < Number(inputValueMin)) {
  //     setCheckSalary(true);
  //     setTimeout(() => {
  //       setCheckSalary(false);
  //     }, 4000);
  //   } else if (
  //     inputValueMax &&
  //     !inputValueMin &&
  //     Number(inputValueMax) < Salary_Min
  //   ) {
  //     setCheckSalary(true);
  //     setTimeout(() => {
  //       setCheckSalary(false);
  //     }, 4000);
  //   } else if (
  //     inputValueMax &&
  //     inputValueMin &&
  //     Number(inputValueMax) < Number(inputValueMin)
  //   ) {
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
  //       setSalaryMin(0);
  //       setSalaryMax(12000000);
  //     }
  //   }

  //   setTypeMoney(selectedValue);
  // };

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
      // setInputValueMax('0');
      setInputValueMin('0');
    }

    if (!salaryMax && !salaryMin && !Salary_Max && !Salary_Min) {
      setSalaryMax(12000000);
      setSalaryMin(0);
      // setInputValueMax('12000000');
      setInputValueMin('0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryType]);
  // console.log('paramMin', Salary_Min);
  // console.log('paramMax', Salary_Max);
  // console.log('salaryMax', salaryMax);
  // console.log('salaryMin', salaryMin);
  // console.log('inputValueMax', inputValueMax);
  // console.log('inputValueMin', inputValueMin);

  // const handleCancleValue = () => {
  //   // console.log(`Selected value: ${selectedValue}`)
  //   // console.log(`Input value: ${inputValue}`)
  //   setSalaryMax(12000000);
  //   setSalaryMin(0);
  //   setTypeMoney(1);

  //   setInputValueMax('12000000');
  //   setInputValueMin('0');
  //   setSelectedValue(1);
  // };

  // useEffect(() => {
  //   reset && handleCancleValue()
  // }, [reset])

  // console.log("selectedValue", selectedValue);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              : language?.salary
          }
          key="1"
        >
          <Text className="title-filterSalary">
            {language?.salary}
          </Text>
          <Radio.Group
            value={reset ? 1 : selectedValue}
            onChange={handleRadioChange}
            className="inputFilter-groupSalary_radio"
          // defaultValue={Type_Money}
          >
            <Radio value={1}>VND</Radio>
            <Radio value={2}>USD</Radio>
          </Radio.Group>
          <br />
          <Input
            maxLength={selectedValue === 1 ? 11 : 5}
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
              {language?.verify_max_min_salary}
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
