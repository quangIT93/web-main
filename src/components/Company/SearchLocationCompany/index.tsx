import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import locationApi from 'api/locationApi';
// import redux
import { RootState } from 'store';

import { ArrowFilterIcon } from '#components/Icons';
import { LocationIcon } from '#components/Icons/iconCandidate';
// import ant
import { Button, Cascader, Divider, Typography } from 'antd';

import './style.scss';
interface ISearchLocation {
  setAddresses: any;
  setReset: Function;
  reset: boolean;
  addresses: any;
}

const SearchLocationCompany: React.FC<ISearchLocation> = (props) => {
  const { setAddresses, reset, setReset, addresses } = props;
  // const [dataLocations, setDataLocations] = React.useState<any>(null);
  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const [disable, setDisable] = React.useState<Boolean>(false);

  const { SHOW_CHILD } = Cascader;
  const { Text } = Typography;

  const location = useLocation();

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const onChange = (value: string[][]) => {
    setReset(false);
    setAddresses(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate filter-candidate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Địa điểm'
          : languageRedux === 2
            ? 'Location'
            : languageRedux === 3 && '주소'}
      </Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable
          ? languageRedux === 1
            ? 'Vui lòng chọn địa điểm bạn muốn tìm kiếm.'
            : languageRedux === 2
              ? 'Please select the location you want to search'
              : languageRedux === 3 && '검색하고 싶은 위치를 선택해주세요'
          : ''}
      </Divider>
      {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="default" onClick={() => {}}>
              Huỷ
            </Button>
            <Button type="primary" onClick={() => {}}>
              Áp dụng
            </Button>
          </div> */}
    </div>
  );

  return (
    <div className="wrap-search_company">
      <div
        style={{
          position: 'absolute',
          zIndex: '1',
          top: '10px',
          left: '10px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <LocationIcon />
      </div>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        allowClear
        style={{ width: '100%' }}
        onChange={onChange as any}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        inputIcon={<LocationIcon />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        size="large"
        dropdownRender={DropdownRender}
        value={reset ? [] : addresses}
        options={
          dataLocations
            ? dataLocations?.map((dataLocation: any) => ({
                value: dataLocation.province_id,
                label: dataLocation.province_fullName,
                children: dataLocation.districts.map(
                  (child: { district_id: string; district: string }) => {
                    var dis = false;
                    // if (disable) {
                    //   dis = true;
                    //   for (const elem of locId) {
                    //     if (elem === child.district_id) {
                    //       dis = false;
                    //       break;
                    //     }
                    //   }
                    // }
                    return {
                      value: child.district_id,
                      label: child.district,
                      disabled: dis,
                    };
                  },
                ),
              }))
            : []
        }
        placeholder={
          languageRedux === 1
            ? 'Địa điểm'
            : languageRedux === 2
              ? 'Location'
              : languageRedux === 3 && '주소'
        }
      />
    </div>
  );
};

export default SearchLocationCompany;
