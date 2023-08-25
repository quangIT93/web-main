import React, { useState, useRef, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';
import { Collapse, Typography } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { getCookie } from 'cookies';

import { CalendarFilterIcon, ArrowFilterIcon } from '#components/Icons';

import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';
import languageApi from 'api/languageApi';
// import { AnyMxRecord } from 'dns';

const { Text } = Typography;

const { Panel } = Collapse;

interface IFilterTimeJob {
  setIsWorkingWeekend: React.Dispatch<React.SetStateAction<number>>;
  setIsRemotely: React.Dispatch<React.SetStateAction<number>>;
  isRemotely: number;
  isWorkingWeekend: number;
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
}

const FilterTimeJob: React.FC<IFilterTimeJob> = (props) => {
  const {
    setIsWorkingWeekend,
    isWorkingWeekend,
    isRemotely,
    setIsRemotely,
    reset,
    setReset,
  } = props;

  // const [selectedValue, setSelectedValue] = useState('')
  // const [inputValue, setInputValue] = useState('')
  // const [checkboxIsWeekend, setCheckboxIsWeekend] = useState(0);
  // const [checksetIsRemotely, setChecksetIsRemotely] = useState(0);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [collapseOpen, setCollapseOpen] = useState(false);
  const collapseRef = useRef<any>(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');

  const is_working_weekend = userFilteredCookies?.is_working_weekend;
  const is_remotely = userFilteredCookies?.is_remotely;

  const [language, setLanguageState] = useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? 'vi' : 'en',
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
    getlanguageApi();
  }, [languageRedux]);

  useEffect(() => {
    if (is_working_weekend) {
      setIsWorkingWeekend(is_working_weekend);
      // setCheckboxIsWeekend(is_working_weekend);
    }

    if (is_remotely) {
      setIsRemotely(is_remotely);
      // setChecksetIsRemotely(is_remotely);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_working_weekend, is_remotely]);

  // const handleRadioChange = (e: any) => {
  //   setSelectedValue(e.target.value)
  // }

  // const handleInputChange = (e: any) => {
  //   setInputValue(e.target.value)
  // }

  // const handleConfirm = (e: any) => {
  //   e.stopPropagation();
  //   // console.log(`Selected value: ${selectedValue}`)
  //   // console.log(`Input value: ${inputValue}`)
  //   setIsWorkingWeekend(checkboxIsWeekend);
  //   setIsRemotely(checksetIsRemotely);
  //   if (
  //     // collapseRef &&
  //     // !collapseRef?.current?.contains(e.target)
  //     e.target.closest('.inputFilterTimeJob') &&
  //     e.target.closest('.submitValue')
  //   ) {
  //     setCollapseOpen(false);
  //   } else if (!e.target.closest('.inputFilterTimeJob')) {
  //     setCollapseOpen(false);
  //   } else if (e.target.closest('.inputFilterTimeJob')) {
  //     setCollapseOpen(true);
  //   }
  // };

  // const handleConfirmCancel = () => {
  //   setIsWorkingWeekend(0);
  //   setIsRemotely(0);
  //   setCheckboxIsWeekend(0);
  //   setChecksetIsRemotely(0);
  // };

  // const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString)
  // }

  // const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString)
  // }

  const handleWeekendChange = (e: any) => {
    if (e.target.checked) {
      setReset(false);
      // setCheckboxIsWeekend(1);
      setIsWorkingWeekend(1);
    } else {
      setReset(false);
      // setCheckboxIsWeekend(0);
      setIsWorkingWeekend(0);
    }
  };

  const handleRemoteChange = (e: any) => {
    if (e.target.checked) {
      setReset(false);
      // setChecksetIsRemotely(1);
      setIsRemotely(1);
    } else {
      setReset(false);
      // setChecksetIsRemotely(0);
      setIsRemotely(0);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (collapseRef && !collapseRef?.current?.contains(e.target)) {
        setCollapseOpen(false);
      } else {
        setCollapseOpen(true);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="filter-input">
      <div className="filter-input_icon">
        <CalendarFilterIcon width={20} height={20} />
      </div>
      <Collapse
        className={`inputFilterTimeJob input-filter_nav ${
          isRemotely || isWorkingWeekend ? 'activeTimeJob' : ''
        }`}
        activeKey={collapseOpen ? '1' : ''}
        ref={collapseRef}
        expandIconPosition="end"
        expandIcon={() => <ArrowFilterIcon width={14} height={10} />}
      >
        <Panel
          header={
            isRemotely || isWorkingWeekend
              ? `${
                  isWorkingWeekend
                    ? languageRedux === 1
                      ? 'Làm việc cuối tuần'
                      : 'Working on the weekend'
                    : ''
                } 
            ${isWorkingWeekend && isRemotely ? '-' : ''}
            
            ${isRemotely ? language?.remote_work : ''}`
              : languageRedux === 1
              ? 'Làm việc từ xa'
              : 'Remote work'
          }
          key="1"
          style={{ fontSize: '12px' }}
        >
          <Text className="title-filter_timeJob">
            {languageRedux === 1 ? 'Thời gian làm việc' : 'Working period'}
          </Text>

          {/* <Radio.Group
          value={selectedValue}
          onChange={handleRadioChange}
          className="inputFilter-grouptimeJob_radio"
        >
          <Radio value="option1">Không thời hạn</Radio>
          <Radio value="option2">Có thời hạn</Radio>
        </Radio.Group>
        <div className="group-input_dateJob">
          <DatePicker onChange={onChangeStartDate} />
          <DatePicker onChange={onChangeEndDate} />
        </div> */}

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              label={language?.working_on_the_weekend}
              control={
                <Checkbox
                  checked={
                    reset ? false : isWorkingWeekend === 0 ? false : true
                  }
                  onChange={handleWeekendChange}
                />
              }
            />
            <FormControlLabel
              label={language?.remote_work}
              control={
                <Checkbox
                  checked={reset ? false : isRemotely === 0 ? false : true}
                  onChange={handleRemoteChange}
                />
              }
            />
          </Box>
          {/* <div className="wrap-button_filter">
            <Button type="default" onClick={handleConfirmCancel}>
              Huỷ
            </Button>
            <Button
              type="primary"
              onClick={handleConfirm}
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

export default FilterTimeJob;
