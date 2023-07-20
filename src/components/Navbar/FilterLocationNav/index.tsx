import React, { useState, memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Cascader, Divider, Typography, Button } from 'antd';

import './style.scss';

import { EnvironmentOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

import { AddressFilterIcon, ArrowFilterIcon } from '#components/Icons';

// import api
import locationApi from 'api/locationApi';

// import redux
import { RootState } from 'store';

const { Text } = Typography;
interface DistrictProps {
  setListDis: Function;
}
const { SHOW_CHILD } = Cascader;

const DropdownRender = (menus: React.ReactNode) => (
  <div style={{ width: '100%' }}>
    <Text className="title-filter_location">Chọn địa điểm</Text>
    {menus}
    <Divider style={{ margin: 5 }} />
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

const FilterLocationNav: React.FC<DistrictProps> = ({ setListDis }) => {
  const [dataLocations, setDataLocations] = React.useState<any>(null);
  const [dataDistrict, setDataDistrict] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);
  const [locId, setLocId] = useState<string[]>([]);

  const userProfile = useSelector((state: RootState) => state.profile.profile);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const listLocation = searchParams
    .getAll('dis-ids')
    .map((dis) => dis.split(','));
  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation();
      if (result) {
        setDataLocations(result.data);
      }

      if (location.pathname !== '/search-results' && userProfile) {
        setListDis(
          userProfile?.locations?.map((profile: any) => [
            profile.province_id,
            profile.district_id,
          ]),
        );
      } else {
        setListDis(listLocation);
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
    onChange(listLocation);
  }, [userProfile]);

  const onChange = (value: any) => {
    // Xử lý giá trị thay đổi

    setDisable(false);
    const secondValues = value.map((item: any) => item[1]);

    if (secondValues.length <= 3 && listLocation.length <= 3) {
      setLocId(secondValues);
      setListDis(value);
    }
    if (value.length > 2) {
      setDisable(true);
    }
  };

  if (userProfile || dataLocations) {
    return (
      <div className="filter-input">
        <div className="filter-input_icon">
          <AddressFilterIcon width={20} height={20} />
        </div>
        <Cascader
          multiple
          maxTagCount="responsive"
          size="large"
          placeholder="Chọn địa điểm"
          inputIcon={<EnvironmentOutlined />}
          suffixIcon={<ArrowFilterIcon width={14} height={10} />}
          dropdownRender={DropdownRender}
          defaultValue={
            listLocation.length !== 0
              ? listLocation
              : listLocation.length === 0 &&
                location.pathname === '/search-results'
                ? []
                : userProfile?.locations?.map((profile: any) => [
                  profile.province_id,
                  profile.district_id,
                ])
          }
          options={
            dataLocations
              ? dataLocations.map((dataLocation: any) => ({
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
    );
  } else {
    return <></>;
  }
};

export default memo(FilterLocationNav);
