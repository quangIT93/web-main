import React, { useState } from 'react';
import { Select, Button } from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import type { SelectProps } from 'antd';
import searchApi from 'api/searchApi';
import './style.scss';
import { Spin } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { SearchIcon, FilterIcon, LightFilterIcon } from '../../Icons/index';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';

let timeout: ReturnType<typeof setTimeout> | null;
// let currentValue: string | undefined;

// fetch data keywords
// const fetch = (
//   value: string | undefined,
//   callback: Function,
//   // setFetching: Function
// ) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }

//   currentValue = value;
//   var response: any = null;

//   const fake = async () => {
//     const array: any[] = [];

//     callback([]);

//     // check login user
//     if (localStorage.getItem('accessToken')) {
//       const result = await searchApi.getHistoryKeyWord(20);
//       if (result) {
//         response = result.data.listHistorySearch;
//       }
//     } else {
//       const result = await searchApi.getSuggestKeyWord(20);
//       if (result) {
//         response = result.data;
//       }
//     }
//     console.log('response', response);
//     // filter keywords
//     if (response) {
//       if (currentValue === value) {
//         response?.forEach((item: any) => {
//           if (
//             item.keyword
//               .toLocaleLowerCase()
//               .includes(value?.toLocaleLowerCase())
//           ) {
//             array.push({
//               value: item.keyword,
//               text: item.keyword,
//             });
//           }
//         });
//         // setFetching(false)
//         callback(array);
//       }
//     }
//   };

//   // check value search then fetching data
//   if (value !== '') {
//     // setFetching(true)
//     timeout = setTimeout(fake, 300);
//   } else {
//     searchApi.getSuggestKeyWord(10).then((result) => {
//       const data = result.data.map((item: any) => ({
//         value: item.keyword,
//         text: item.keyword,
//       }));
//       callback(data);
//     });
//   }
// };

interface SearchProps {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchIcon: (event: any, params: string | undefined) => any;
  openCollapseFilter: boolean;
  checkSearch: boolean;
}

const SearchInput: React.FC<SearchProps> = ({
  value,
  setValue,
  setOpenCollapseFilter,
  openCollapseFilter,
  handleSearchIcon,
  checkSearch,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<SelectProps['options']>([]);
  // const [fetching, setFet] = useState(false)
  const [loading, setLoading] = useState(false);

  const [dataHistory, setDataHistory] = React.useState<any>([]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const QUERY = searchParams.get('q');
  const handleSearch = async (newValue: string | undefined) => {
    // fetch(
    //   newValue,
    //   setData,
    //   // , setFet
    // );
    // console.log('search', newValue);
    setValue(newValue);
  };

  // React.useEffect(() => {
  //   if (currentValue) {
  //     setValue(currentValue);
  //   }
  // }, [currentValue]);
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

  const getDataSearch = async () => {
    try {
      const resultHistory = await searchApi.getHistoryKeyWord(10);
      const resultSuggest = await searchApi.getSuggestKeyWord(10);
      if (resultHistory && resultSuggest) {
        setDataHistory(resultHistory.data);
        setDataSuggest(resultSuggest.data);
      }
    } catch (error) {
      console.log('error');
    }
  };

  React.useEffect(() => {
    getDataSearch();
  }, [value]);

  const handleChange = (newValue: string) => {
    // setOpenDropdown(true);
    // setValue(newValue);
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
  };

  const handleOnFocus = () => {
    console.log('fcccccccccuss');
    // setOpenDropdown(true);
    // disableScroll()
    // getSuggestKeyWord();
  };

  const handleOnBlur = () => {
    // console.log('bbbbbbbbblur');
    // setOpenDropdown(false);
    // Xử lý logic khác (nếu có)
    setValue(value);
    // enableScroll();
  };

  // handle press enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (QUERY && !value) {
        window.open(
          `/search-results?q=${encodeURIComponent(`${QUERY}`)}`,
          '_parent',
        );
        // handleSearchIcon(e, QUERY);
      } else
        window.open(
          `/search-results?q=${encodeURIComponent(`${value}`)}`,
          '_parent',
        );
      // handleSearchIcon(e, value);
    }
  };

  const handleClickItem = (e: any, value: string) => {
    setValue(value);
    e.stoppropagation();

    // console.log('curent', currentValue);
    // setOpenDropdown(false);

    // fetch(
    //   value,
    //   setData,
    //   // , setFet
    // );
  };

  const handleClearItem = () => {
    getSuggestKeyWord();

    setValue('');
  };

  const handleDeleteKeyword = () => {};

  const handleDeleteHistoryKeyword = async (e: any, keyword: string) => {
    // e.stoppropagation();
    try {
      const result = await searchApi.deleteKeywordSearch(keyword);
      if (result) {
        // console.log('xóa thành công');d

        getDataSearch();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const dropdownRender: any = ['1'].map((d: any, index: number) => (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      {/* {d.value} */}

      <div className="items-history items-search_keyword">
        <h4>Từ khóa</h4>
        <div className="wrap-items-history wrap-items-search">
          {dataSuggest.map((suggest: any) => (
            <div className="item-history item-search">
              <span
                className="item-search_text"
                onClick={(e) => handleClickItem(e, suggest.keyword)}
              >
                {suggest.keyword}
              </span>
              {/* <CloseOutlined onClick={handleDeleteKeyword}/> */}
            </div>
          ))}
        </div>
      </div>
      <div className="items-history items-search_keyword">
        <h4>Tìm kiếm gần đây</h4>
        <div className="wrap-items-history wrap-items-search">
          {dataHistory?.listHistorySearch?.map((history: any) => (
            <div className="item-history item-search">
              <span
                className="item-search_text"
                onClick={(e) => handleClickItem(e, history.keyword)}
              >
                {history.keyword}
              </span>

              <CloseOutlined
                onClick={(e) => handleDeleteHistoryKeyword(e, history.keyword)}
                style={{ fontSize: '16px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  console.log('dataHíto', dataSuggest);

  return (
    <div className="search-input-wrapper">
      <Select
        showSearch
        autoClearSearchValue
        optionFilterProp="children"
        size="large"
        value={value}
        searchValue={value}
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
        onBlur={handleOnBlur}
        removeIcon={<CloseOutlined />}
        menuItemSelectedIcon={<CheckOutlined />}
        dropdownRender={() => dropdownRender}
        onClear={handleClearItem}
        // open={openDropdown}
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
        {checkSearch && openCollapseFilter === false ? (
          <LightFilterIcon width={20} height={20} />
        ) : (
          <FilterIcon width={20} height={20} />
        )}
      </Button>
    </div>
  );
};

export default React.memo(SearchInput);
