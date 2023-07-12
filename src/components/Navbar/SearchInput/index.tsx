import React, { useState } from 'react';
import { Select, Button } from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import type { SelectProps } from 'antd';
import searchApi from 'api/searchApi';
import './style.scss';
import { Spin } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { SearchIcon, FilterIcon } from '../../Icons/index';

import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string | undefined;

// fetch data keywords
const fetch = (
  value: string | undefined,
  callback: Function,
  // setFetching: Function
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  currentValue = value;
  var response: any = null;

  const fake = async () => {
    const array: any[] = [];

    callback([]);

    // check login user
    if (localStorage.getItem('accessToken')) {
      const result = await searchApi.getHistoryKeyWord(20);
      if (result) {
        response = result.data.listHistorySearch;
      }
    } else {
      const result = await searchApi.getSuggestKeyWord(20);
      if (result) {
        response = result.data;
      }
    }

    // filter keywords
    if (response) {
      if (currentValue === value) {
        response?.forEach((item: any) => {
          if (
            item.keyword
              .toLocaleLowerCase()
              .includes(value?.toLocaleLowerCase())
          ) {
            array.push({
              value: item.keyword,
              text: item.keyword,
            });
          }
        });
        // setFetching(false)
        callback(array);
      }
    }
  };

  // check value search then fetching data
  if (value !== '') {
    // setFetching(true)
    timeout = setTimeout(fake, 300);
  } else {
    searchApi.getSuggestKeyWord(10).then((result) => {
      const data = result.data.map((item: any) => ({
        value: item.keyword,
        text: item.keyword,
      }));
      callback(data);
    });
  }
};

interface SearchProps {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchIcon: (event: any, params: string | undefined) => any;
  openCollapseFilter: boolean;
}

const SearchInput: React.FC<SearchProps> = ({
  value,
  setValue,
  setOpenCollapseFilter,
  openCollapseFilter,
  handleSearchIcon,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<SelectProps['options']>([]);
  // const [fetching, setFet] = useState(false)
  const [loading, setLoading] = useState(false);
  const QUERY = searchParams.get('q');
  const handleSearch = async (newValue: string | undefined) => {
    fetch(
      newValue,
      setData,
      // , setFet
    );
    console.log('newValue1111', newValue);
  };

  console.log('value', value);

  React.useEffect(() => {
    if (currentValue) {
      console.log('ádadasd', currentValue);
      setValue(currentValue);
    }
  }, [currentValue]);
  // console.log('value', value)
  // console.log('currentValue', currentValue)
  // get keyWords suggests
  React.useEffect(() => {
    setValue(QUERY as any);
  }, []);

  const getSuggestKeyWord = async () => {
    try {
      var response = null;
      setLoading(true);
      if (localStorage.getItem('accessToken')) {
        const result = await searchApi.getHistoryKeyWord(10);
        if (result) {
          response = result.data.listHistorySearch;
        }
      } else {
        const result = await searchApi.getSuggestKeyWord(10);
        if (result) {
          response = result.data;
        }
      }
      if (response) {
        const data = response.map((item: any) => ({
          value: item.keyword,
          text: item.keyword,
        }));

        setData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getSuggestKeyWord();
  }, []);

  const handleChange = (newValue: string) => {
    console.log('newValue', newValue);
    setValue(newValue);
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
  };

  const handleOnFocus = () => {
    // console.log('fcccccccccuss')
    // disableScroll()
    getSuggestKeyWord();
  };

  // const handleOnBlur = () => {
  //   console.log('bbbbbbbbblur')
  //   // Xử lý logic khác (nếu có)
  //   enableScroll()
  // }

  // handle press enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (QUERY && !currentValue && !value) {
        window.open(
          `/search-results?q=${encodeURIComponent(`${QUERY}`)}`,
          '_parent',
        );
      } else
        window.open(
          `/search-results?q=${encodeURIComponent(`${currentValue}`)}`,
          '_parent',
        );
    }
  };

  const handleClickItem = (value: string) => {
    setValue(currentValue);
    fetch(
      value,
      setData,
      // , setFet
    );
  };

  const handleClearItem = () => {
    getSuggestKeyWord();
  };

  const dropdownRender: any = (data || []).map((d: any, index: number) => (
    <div
      key={index}
      style={{ display: 'flex', justifyContent: 'space-between' }}
      onClick={() => handleClickItem(d.value)}
    >
      {d.value}
      <CloseOutlined />
    </div>
  ));

  return (
    <div className="search-input-wrapper">
      <Select
        showSearch
        autoClearSearchValue
        optionFilterProp="children"
        size="large"
        value={value}
        defaultValue={QUERY ? QUERY : null}
        // defaultValue={null}
        placeholder="Tìm kiếm công việc"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        loading={loading}
        // notFoundContent={fetching ? <Spin size="small" /> : null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
        className="search-input-nav"
        virtual={true}
        onFocus={handleOnFocus}
        onInputKeyDown={handleKeyPress}
        allowClear={true}
        // onBlur={handleOnBlur}
        removeIcon={<CloseOutlined />}
        menuItemSelectedIcon={<Spin size="small">dec</Spin>}
        // dropdownRender={() => dropdownRender}
        onClear={handleClearItem}
      />

      <Button
        className="search-input-wrapper-iconSearch"
        shape="circle"
        onClick={(event) => handleSearchIcon(event, value)}
      >
        <SearchIcon width={18} height={18} />
      </Button>

      <Button
        className="search-input-wrapper-iconFilter"
        shape="circle"
        onClick={() => setOpenCollapseFilter(!openCollapseFilter)}
      >
        <FilterIcon width={20} height={20} />
      </Button>
    </div>
  );
};

export default React.memo(SearchInput);
