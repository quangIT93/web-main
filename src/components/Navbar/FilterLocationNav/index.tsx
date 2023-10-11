import React, { useState, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import Box from '@mui/material/Box';
import { Cascader, Divider, Typography } from 'antd';

import './style.scss';

import { EnvironmentOutlined } from '@ant-design/icons';
// import { useSearchParams } from 'react-router-dom';

import { AddressFilterIcon, ArrowFilterIcon } from '#components/Icons';
import { getCookie } from 'cookies';
// import api
import locationApi from 'api/locationApi';

import { setLocationApi } from 'store/reducer/locationReducer';

// import redux
import { RootState } from 'store';
// import { message } from 'antd';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';

const { Text } = Typography;
interface DistrictProps {
  listDis: [];
  setListDis: Function;
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
  language: any;
}
const { SHOW_CHILD } = Cascader;

// const DropdownRender = (menus: React.ReactNode) => (
//   <div style={{ width: '100%' }}>
//     <Text className="title-filter_location">Chọn địa điểm</Text>
//     {menus}
//     <Divider style={{ margin: '8px 5px' }} >
//       {disable ? 'Chỉ có thể tối đa 10 địa điểm' : ''}
//     </Divider>
//     {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
//       <Button type="default" onClick={() => {}}>
//         Huỷ
//       </Button>
//       <Button type="primary" onClick={() => {}}>
//         Áp dụng
//       </Button>
//     </div> */}
//   </div>
// );

const FilterLocationNav: React.FC<DistrictProps> = ({
  listDis,
  setListDis,
  reset,
  setReset,
  language,
}) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  // const [dataLocations, setDataLocations] = React.useState<any>(null);
  // const [dataDistrict, setDataDistrict] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);
  const [locId, setLocId] = useState<string[]>([]);
  // const [messageApi, contextHolder] = message.useMessage();

  const userProfile = useSelector((state: RootState) => state.profile.profile);

  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );

  const dispatch = useDispatch();

  // const [listLocation];

  // const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  // let userFilteredCookies = JSON.parse(getCookie('userFiltered') || '{}');
  // const listLocation = userFilteredCookies?.list_dis;

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
      <Text className="title-filter_location">{language?.select_location}</Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable ? language?.limit_10_location : ''}
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

  const listLocation: any = useRef<any>(
    JSON.parse(getCookie('userFiltered') || '{}')?.list_dis
      ? JSON.parse(getCookie('userFiltered') || '{}')?.list_dis
      : userProfile?.locations?.map((profile: any) => [
          profile?.province_id,
          profile?.district_id,
        ]),
  );

  // console.log('cookies', JSON.parse(getCookie('userFiltered') || '{}'));
  // console.log('userFilteredCookies', valueDistrict.current);
  //  searchParams
  //   .getAll('dis-ids')
  //   .map((dis) => dis.split(','));

  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        // setDataLocations(result.data);
        dispatch(setLocationApi(result));
      }

      if (
        location?.pathname !== '/search-results' &&
        userProfile &&
        listLocation.current?.length === 0
      ) {
        setListDis(
          userProfile?.locations?.map((profile: any) => [
            profile?.province_id,
            profile?.district_id,
          ]),
        );
      } else {
        setListDis(listLocation.current);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllLocaitions();

    // if (listLocation.length > 3) {
    //   setDisable(true)
    // }
    onChange(listLocation.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const onChange = (value: any) => {
    // Xử lý giá trị thay đổi

    setReset(false);
    setDisable(false);
    const secondValues = value?.map((item: any) => item[1]);

    if (secondValues?.length <= 10) {
      setLocId(secondValues);
      setListDis(value);
    }

    if (value?.length > 9) {
      setDisable(true);
    }
  };

  if (userProfile || dataLocations) {
    return (
      <>
        {/* {contextHolder} */}
        <div className="filter-input">
          <div className="filter-input_icon">
            <AddressFilterIcon width={20} height={20} />
          </div>
          <Cascader
            multiple
            maxTagCount="responsive"
            size="large"
            placeholder={language?.select_location}
            inputIcon={<EnvironmentOutlined />}
            suffixIcon={<ArrowFilterIcon width={14} height={10} />}
            dropdownRender={DropdownRender}
            value={reset ? [] : listDis}
            defaultValue={
              listLocation.current?.length !== 0 &&
              listLocation.current !== undefined
                ? listLocation.current
                : listLocation.current?.length === 0 &&
                  location?.pathname === '/search-results'
                ? []
                : userProfile?.locations?.map((profile: any) => [
                    profile?.province_id,
                    profile?.district_id,
                  ])
            }
            options={
              dataLocations
                ? dataLocations?.map((dataLocation: any) => ({
                    value: dataLocation.province_id,
                    label: dataLocation.province_fullName,
                    children: dataLocation.districts.map(
                      (child: { district_id: string; district: string }) => {
                        var dis = false;
                        if (disable) {
                          dis = true;
                          for (const elem of locId) {
                            if (elem === child.district_id) {
                              dis = false;
                              break;
                            }
                          }
                        }
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
            onChange={onChange}
            changeOnSelect
            className="inputFilterLocationNav input-filter_nav"
            showCheckedStrategy={SHOW_CHILD}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default memo(FilterLocationNav);
