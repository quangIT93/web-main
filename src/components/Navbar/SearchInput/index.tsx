import React, { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import apiTotalJob from 'api/apiTotalJob';
import searchApi from 'api/searchApi';
// import { Spin } from 'antd';
import { RootState } from '../../../store/reducer';
import { HomeValueContext } from 'context/HomeValueContextProvider';
// import context
// import jsonp from 'fetch-jsonp';
// import qs from 'qs';
import { SearchIcon, FilterIcon, LightFilterIcon } from '../../Icons/index';
import { Select, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import './style.scss';

interface SearchProps {
  value: string | undefined | null;
  setValue: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchIcon: (event: any, params: string | undefined | null) => any;
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
  const {
    setSearch,
    search,
  }: {
    setSearch: React.Dispatch<React.SetStateAction<boolean>>;
    search: boolean;
  } = useContext(HomeValueContext);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<SelectProps['options']>([]);
  // const [fetching, setFet] = useState(false)
  const [loading, setLoading] = useState(false);

  const [dataHistory, setDataHistory] = React.useState<any>([]);
  const [dataSuggest, setDataSuggest] = React.useState<any>([]);
  // const [openDropdown, setOpenDropdown] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [totalJob, setTotalJob] = React.useState<number>(0);

  // const language = useSelector(
  //   (state: RootState) => state.dataLanguage.languages,
  // );

  // const [openModalLogin, setOpenModalLogin] = React.useState(false);
  // const inputRef = useRef<InputRef>(null);

  // console.log("dataNotification", dataNotification);

  const QUERY = searchParams.get('q');
  const location = useLocation();
  const handleSearch = async (newValue: string | undefined) => {
    // fetch(
    //   newValue,
    //   setData,
    //   // , setFet
    // );
    // console.log('search', newValue);

    setValue(newValue);
    // console.log('coloe', newValue);
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
    const accessToken = localStorage.getItem('accessToken');
    accessToken && setIsLogin(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getSuggestKeyWord = async () => {
  //   try {
  //     var response = null;
  //     setLoading(true);
  //     if (localStorage.getItem('accessToken')) {
  //       const result = await searchApi.getHistoryKeyWord(10, 'vi');
  //       if (result) {
  //         response = result.data.listHistorySearch;
  //       }
  //     } else {
  //       const result = await searchApi.getSuggestKeyWord(10, 'vi');
  //       if (result) {
  //         response = result.data;
  //       }
  //     }
  //     if (response) {
  //       const data = response.map((item: any) => ({
  //         value: item.keyword,
  //         text: item.keyword,
  //       }));

  //       setData(data);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // React.useEffect(() => {
  // getSuggestKeyWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getDataSearch = async () => {
    try {
      const resultSuggest = await searchApi.getSuggestKeyWord(
        10,
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      let resultHistory;
      if (localStorage.getItem('accessToken')) {
        resultHistory = await searchApi.getHistoryKeyWord(
          10,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        resultHistory && setDataHistory(resultHistory.data);
      }
      // if (resultHistory || resultSuggest) {
      //   setDataHistory(resultHistory.data);
      //   setDataSuggest(resultSuggest.data);
      // }
      resultSuggest && setDataSuggest(resultSuggest.data);

      // console.log('resultSuggest effective', resultSuggest);
    } catch (error) {
      console.log('error get history', error);
    }
  };

  // console.log('resultSuggest', dataSuggest.data);
  // console.log('value', value);

  React.useEffect(() => {
    getDataSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (newValue: string) => {
    // setOpenDropdown(true);
    // setValue(newValue);
    // console.log('cakakak');
  };

  // const disableScroll = () => {
  //   document.body.style.overflow = 'hidden';
  // };

  // const enableScroll = () => {
  //   document.body.style.overflow = '';
  // };

  const handleOnFocus = () => {
    // console.log('fcccccccccuss');
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
  // console.log('value', value);
  // handle press enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleSearchIcon(e, value);

      if (location.pathname !== '/search-results') {
        window.open(
          `/search-results?${
            value !== 'undefined' ? `q=${encodeURIComponent(value as any)}` : ``
          }`,
        );
      } else {
        setSearchParams({
          q: value ? `${value}` : '',
        });
        setSearch(!search);
        setOpenCollapseFilter(false);
        // window.open(`/search-results`, "_self")
      }
    }
  };

  const handleClickItem = (e: any, value: string) => {
    setValue(value);
    window.open(
      `/search-results?q=${encodeURIComponent(`${value}`)}`,
      '_parent',
    );
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
    // getSuggestKeyWord();
    getDataSearch();
    setValue('');
  };

  // const handleDeleteKeyword = () => {};

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

  const getTotalUserSearch = async () => {
    try {
      const result = await apiTotalJob.getTotalJob(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setTotalJob(result?.data?.total);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getTotalUserSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <h4>
          {languageRedux === 1
            ? 'Từ khóa phổ biến'
            : languageRedux === 2
            ? 'Popular keywords'
            : languageRedux === 3 && '인기 키워드'}
        </h4>
        <div className="wrap-items-history wrap-items-search">
          {dataSuggest?.map((suggest: any, index: number) => (
            <div className="item-history item-search" key={index}>
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
      <div
        className="items-history items-search_keyword"
        style={{
          display: isLogin ? 'block' : 'none',
        }}
      >
        <h4>
          {languageRedux === 1
            ? 'Tìm kiếm gần đây'
            : languageRedux === 2
            ? 'Recently Search'
            : languageRedux === 3 && '최근 검색'}
        </h4>
        <div className="wrap-items-history wrap-items-search">
          {dataHistory?.listHistorySearch?.map(
            (history: any, index: number) => (
              <div className="item-history item-search" key={index}>
                <span
                  className="item-search_text"
                  onClick={(e) => handleClickItem(e, history.keyword)}
                >
                  {history.keyword}
                </span>

                <CloseOutlined
                  onClick={(e) =>
                    handleDeleteHistoryKeyword(e, history.keyword)
                  }
                  style={{ fontSize: '16px' }}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  ));
  return (
    <div className="search-input-wrapper">
      <Select
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        labelInValue
        showSearch
        autoClearSearchValue
        optionFilterProp="children"
        size="large"
        value={value !== '' ? value : undefined}
        searchValue={(value as string) || null || undefined}
        defaultValue={QUERY ? QUERY : null}
        // defaultValue={null}
        placeholder={
          languageRedux === 1
            ? `Tìm kiếm hơn ${totalJob.toLocaleString(
                'en-US',
              )} công việc tại Việt Nam`
            : languageRedux === 2
            ? `Search more than ${totalJob.toLocaleString(
                'en-US',
              )} jobs in Vietnam`
            : languageRedux === 3
            ? `더 검색 ${totalJob.toLocaleString('en-US')} 베트남의 작업`
            : ''
        }
        // placeholder={
        //   language?.search_over +
        //   ` ${totalJob.toLocaleString('en-US')} ` +
        //   language?.jobs_in_vietnam
        // }
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
        style={
          location.pathname === '/' ? { width: '500px' } : { width: '400px' }
        }
      />

      <Button
        className="search-input-wrapper-iconSearch"
        shape="circle"
        onClick={(event) => handleSearchIcon(event, value)}
        name="search-input-wrapper-iconSearch"
      >
        <SearchIcon width={24} height={24} />
      </Button>
      <Button
        className="search-input-wrapper-iconFilter"
        shape="circle"
        onClick={() => {
          setOpenCollapseFilter(!openCollapseFilter);
        }}
        name="search-input-wrapper-iconFilter"
      >
        {checkSearch ? (
          <LightFilterIcon width={20} height={20} />
        ) : (
          <FilterIcon width={20} height={20} />
        )}
      </Button>
    </div>
  );
};

export default React.memo(SearchInput);
