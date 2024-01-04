import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { Collapse, Radio, Input, Typography } from 'antd';
// import { useSearchParams } from 'react-router-dom';

import { getCookie, setCookie } from 'cookies';

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
import { CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

const { Panel } = Collapse;

interface IFilterSalary {
  typeMoney: number | null;
  setTypeMoney: React.Dispatch<React.SetStateAction<number | null>>;
  salaryMin: number;
  salaryMax: number;
  setSalaryMin: React.Dispatch<React.SetStateAction<number>>;
  setSalaryMax: React.Dispatch<React.SetStateAction<number>>;
  salaryType: number;
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterSalaryHotJob: React.FC<IFilterSalary> = (props) => {
  const {
    typeMoney,
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

  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  // const [checkSalary, setCheckSalary] = useState(false);

  const checkSalary = useMemo(() => {
    // Thực hiện các logic bạn cần ở đây
    if (salaryMax !== 0 && salaryMin !== 0) return salaryMax < salaryMin;

    return false; // Giả sử bạn trả về false, thay bằng logic thật
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryMin, salaryMax]);

  const collapseRef = useRef<any>(null);

  // const [searchParams, setSearchParams] = useSearchParams();

  let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');

  const Salary_Max =
    // userFilteredCookies?.salary_max
    //     ? userFilteredCookies?.salary_max
    //     :
    0;
  const Salary_Min =
    // userFilteredCookies?.salary_min
    //     ? userFilteredCookies?.salary_min
    //     :
    0;
  const Type_Money = userFilteredCookies?.money_type;
  const [selectedValue, setSelectedValue] = useState<number | undefined>(1);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<
    number | undefined
  >(1);

  useEffect(() => {
    if (typeMoney) {
      setTypeMoney(typeMoney);
      setSelectedValue(typeMoney);
    }

    if (Salary_Min && Salary_Min !== 0) {
      setSalaryMin(Number(Salary_Min));
    } else if (Salary_Min === 0) {
      setSalaryMin(0);
    }

    if (Salary_Max) {
      setSalaryMax(Number(Salary_Max));
    } else if (Salary_Max === 0) {
      setSalaryMax(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Salary_Max, Salary_Min, Salary_Max, Type_Money, typeMoney]);

  const handleRadioChange = (e: any) => {
    setReset(false);
    setSelectedValue(e.target.value);
    setTypeMoney(e.target.value);
  };

  const handleSelectSalaryRange = (e: any) => {
    setCollapseOpen(false);
    window.scrollTo({ top: 0 });
    setReset(false);
    switch (e.target.value) {
      case 1:
        setSalaryMin(Number('0'));
        setSalaryMax(Number('0'));
        break;
      case 2:
        setSalaryMin(Number('0'));
        setSalaryMax(Number('10000000'));
        break;
      case 3:
        setSalaryMin(Number('10000000'));
        setSalaryMax(Number('15000000'));
        break;
      case 4:
        setSalaryMin(Number('15000000'));
        setSalaryMax(Number('20000000'));
        break;
      case 5:
        setSalaryMin(Number('20000000'));
        setSalaryMax(Number('25000000'));
        break;
      case 6:
        setSalaryMin(Number('25000000'));
        setSalaryMax(Number('30000000'));
        break;
      case 7:
        setSalaryMin(Number('30000000'));
        setSalaryMax(Number('50000000'));
        break;
      case 8:
        setSalaryMin(Number('50000000'));
        setSalaryMax(Number('0'));
        break;
      case 9:
        setSalaryMin(Number('0'));
        setSalaryMax(Number('300'));
        break;
      case 10:
        setSalaryMin(Number('300'));
        setSalaryMax(Number('500'));
        break;
      case 11:
        setSalaryMin(Number('500'));
        setSalaryMax(Number('700'));
        break;
      case 12:
        setSalaryMin(Number('700'));
        setSalaryMax(Number('1000'));
        break;
      case 13:
        setSalaryMin(Number('1000'));
        setSalaryMax(Number('0'));
        break;

      default:
        break;
    }
    setSelectedSalaryRange(e.target.value);
  };

  const handleInputChangeSalaryMin = (e: any) => {
    // setInputValueMin(e.target.value.replace(',', ''))
    const inputValue = e.target.value.replace(',', '');
    const reg = /[0-9]+$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      // setInputValueMin(inputValue.replace(',', ''));
      setSalaryMin(Number(inputValue.replace(',', '')));
    }
    if (
      inputValue !== '10000000' ||
      inputValue !== '15000000' ||
      inputValue !== '20000000' ||
      inputValue !== '25000000' ||
      inputValue !== '30000000' ||
      inputValue !== '50000000' ||
      inputValue !== '300' ||
      inputValue !== '500' ||
      inputValue !== '700' ||
      inputValue !== '1000'
    ) {
      setSelectedSalaryRange(undefined);
    }
  };

  const handleInputChangeSalaryMax = (e: any) => {
    // setInputValueMax(e.target.value.replace(',', ''))

    const inputValue = e.target.value.replace(',', '');

    const reg = /[0-9]+$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      // setInputValueMax(inputValue.replace(',', ''));
      setSalaryMax(Number(inputValue.replace(',', '')));
    }

    if (
      inputValue !== '10000000' ||
      inputValue !== '15000000' ||
      inputValue !== '20000000' ||
      inputValue !== '25000000' ||
      inputValue !== '30000000' ||
      inputValue !== '50000000' ||
      inputValue !== '300' ||
      inputValue !== '500' ||
      inputValue !== '700' ||
      inputValue !== '1000'
    ) {
      setSelectedSalaryRange(undefined);
    }
  };

  useEffect(() => {
    if (salaryType === 6) {
      setSalaryMax(0);
      setSalaryMin(0);
      // setInputValueMax('0');
      setInputValueMin('0');
    }

    if (!salaryMax && !salaryMin && !Salary_Max && !Salary_Min) {
      setSalaryMax(0);
      setSalaryMin(0);
      // setInputValueMax('12000000');
      setInputValueMin('0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryType]);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        // collapseRef &&
        // !collapseRef?.current?.contains(e.target)
        e.target.closest('.inputFilterSalaryHotJob') &&
        e.target.closest('.submitValue')
      ) {
        setCollapseOpen(false);
      } else if (!e.target.closest('.inputFilterSalaryHotJob')) {
        setCollapseOpen(false);
      } else if (e.target.closest('.inputFilterSalaryHotJob')) {
        setCollapseOpen(true);
      } else if (e.target.closest('.hotjob-inputFilter-groupSalary_radio')) {
        setCollapseOpen(true);
      }
    };
    // \ant-collapse-header

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (Number(salaryMin) === 0 && Number(salaryMax) === 0) {
      setSelectedSalaryRange(1);
    } else if (Number(salaryMin) === 0 && Number(salaryMax) === 10000000) {
      setSelectedSalaryRange(2);
    } else if (
      Number(salaryMin) === 10000000 &&
      Number(salaryMax) === 15000000
    ) {
      setSelectedSalaryRange(3);
    } else if (
      Number(salaryMin) === 15000000 &&
      Number(salaryMax) === 20000000
    ) {
      setSelectedSalaryRange(4);
    } else if (
      Number(salaryMin) === 20000000 &&
      Number(salaryMax) === 25000000
    ) {
      setSelectedSalaryRange(5);
    } else if (
      Number(salaryMin) === 25000000 &&
      Number(salaryMax) === 30000000
    ) {
      setSelectedSalaryRange(6);
    } else if (
      Number(salaryMin) === 30000000 &&
      Number(salaryMax) === 50000000
    ) {
      setSelectedSalaryRange(7);
    } else if (Number(salaryMin) === 50000000 && Number(salaryMax) === 0) {
      setSelectedSalaryRange(8);
    } else if (Number(salaryMin) === 0 && Number(salaryMax) === 300) {
      setSelectedSalaryRange(9);
    } else if (Number(salaryMin) === 300 && Number(salaryMax) === 500) {
      setSelectedSalaryRange(10);
    } else if (Number(salaryMin) === 500 && Number(salaryMax) === 700) {
      setSelectedSalaryRange(11);
    } else if (Number(salaryMin) === 700 && Number(salaryMax) === 1000) {
      setSelectedSalaryRange(12);
    } else if (Number(salaryMin) === 1000 && Number(salaryMax) === 0) {
      setSelectedSalaryRange(13);
    }
  }, [salaryMin, salaryMax]);

  const options = [
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Tất cả mức lương'
              : languageRedux === 2
                ? 'All salary'
                : '모두'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 1,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Dưới 10 triệu'
              : languageRedux === 2
                ? 'Under 10 million'
                : '1.000 만동 이하'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 2,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '10 - 15 triệu'
              : languageRedux === 2
                ? '10 - 15 million'
                : '1.000 ~ 1.500 만동'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 3,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '15 - 20 triệu'
              : languageRedux === 2
                ? '15 - 20 million'
                : '1.500 ~ 2.000 만동'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 4,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '20 - 25 triệu'
              : languageRedux === 2
                ? '20 - 25 million'
                : '2.000 ~ 2.500 만동'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 5,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '25 - 30 triệu'
              : languageRedux === 2
                ? '25 - 30 million'
                : '2.500 ~ 3.000 만동'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 6,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '30 - 50 triệu'
              : languageRedux === 2
                ? '30 - 50 million'
                : '3.000 ~ 5.000 만동'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 7,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Trên 50 triệu'
              : languageRedux === 2
                ? 'Over 50 million'
                : '5.000 만동 이상'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 8,
    },
  ];

  const optionsUsd = [
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Tất cả mức lương'
              : languageRedux === 2
                ? 'All salary'
                : '모두'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 1,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Dưới 300'
              : languageRedux === 2
                ? 'Under 300'
                : '300 이하'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 9,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '300 - 500'
              : languageRedux === 2
                ? '300 - 500'
                : '300 - 500'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 10,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '500 - 700'
              : languageRedux === 2
                ? '500 - 700'
                : '500 - 700'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 11,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? '700 - 1000'
              : languageRedux === 2
                ? '700 - 1000'
                : '700 - 1000'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 12,
    },
    {
      label: (
        <div className="radio-salary-range">
          <p>
            {languageRedux === 1
              ? 'Trên 1000'
              : languageRedux === 2
                ? 'Over 1000'
                : '1.000 이상'}
          </p>
          <CheckOutlined className={'radio_checked_ic'} />
        </div>
      ),
      value: 13,
    },
  ];

  return (
    <div className="filter-input-hotjob">
      <div className="filter-input_icon">
        <MoneyFilterIcon width={16} height={16} />
      </div>
      <Collapse
        className={`inputFilterSalaryHotJob input-filter_nav ${inputValueMin || salaryMax ? 'activeSalaryHotJob' : ''
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
              )} - ${salaryMax !== 0 && salaryMin !== 50000000
                ? new Intl.NumberFormat('en-US').format(
                  Number(salaryMax?.toString().replace(',', '')),
                )
                : salaryMax !== 0 && salaryMin !== 1000
                  ? new Intl.NumberFormat('en-US').format(
                    Number(salaryMax?.toString().replace(',', '')),
                  )
                  : languageRedux === 1
                    ? 'Đến'
                    : languageRedux === 2
                      ? 'To'
                      : languageRedux === 3 && '까지'
              }`
              : languageRedux === 1
                ? 'Mức lương'
                : languageRedux === 2
                  ? 'Salary'
                  : languageRedux === 3 && '샐러리/급여'
          }
          key="1"
        >
          <Text className="title-filterSalary">
            {languageRedux === 1
              ? 'Mức lương'
              : languageRedux === 2
                ? 'Salary'
                : languageRedux === 3 && '샐러리/급여'}
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
              {languageRedux === 1
                ? 'Lương tối thiểu không được lớn hơn lương tối đa'
                : languageRedux === 2
                  ? 'Minimum cannot be greater than maximum'
                  : '최소 금액은 최대 금액보다 클 수 없습니다.'}
            </i>
          ) : (
            <></>
          )}
          <Radio.Group
            value={reset ? 1 : selectedSalaryRange}
            onChange={handleSelectSalaryRange}
            className="hotjob-inputFilter-groupSalary_radio"
            options={selectedValue === 1 ? options : optionsUsd}
            optionType="button"
          ></Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default memo(FilterSalaryHotJob);
