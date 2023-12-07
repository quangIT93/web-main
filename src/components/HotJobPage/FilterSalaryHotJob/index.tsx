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
        if (salaryMax !== 0 && salaryMin !== 0)
            return salaryMax < salaryMin

        return false // Giả sử bạn trả về false, thay bằng logic thật
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
    const [selectedValue, setSelectedValue] = useState<number | null>(1);

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

    const handleInputChangeSalaryMin = (e: any) => {
        // setInputValueMin(e.target.value.replace(',', ''))
        const inputValue = e.target.value.replace(',', '');
        const reg = /[0-9]+$/;

        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            // setInputValueMin(inputValue.replace(',', ''));
            setSalaryMin(Number(inputValue.replace(',', '')));
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
                            )} - ${new Intl.NumberFormat('en-US').format(
                                Number(salaryMax?.toString().replace(',', '')),
                            )}`
                            : languageRedux === 1 ?
                                "Mức lương" :
                                languageRedux === 2 ?
                                    "Salary" :
                                    languageRedux === 3 &&
                                    "샐러리/급여"
                    }
                    key="1"
                >
                    <Text className="title-filterSalary">
                        {
                            languageRedux === 1 ?
                                "Mức lương" :
                                languageRedux === 2 ?
                                    "Salary" :
                                    languageRedux === 3 &&
                                    "샐러리/급여"
                        }
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
                            {languageRedux === 1 ?
                                "Lương tối thiểu không được lớn hơn lương tối đa" :
                                languageRedux === 2 ?
                                    "Minimum cannot be greater than maximum" :
                                    "최소 금액은 최대 금액보다 클 수 없습니다."}
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

export default memo(FilterSalaryHotJob);
