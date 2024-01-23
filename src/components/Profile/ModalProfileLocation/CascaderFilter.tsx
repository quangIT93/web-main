import { Box } from '@mui/material';
import { Cascader, Divider, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowFilterIcon } from '#components/Icons';
import { RootState } from 'store';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
const { Text } = Typography;

interface DistrictProps {
  listDis: [any];
  setListDis: Function;
}

const CascaderFilter: React.FC<DistrictProps> = (props) => {
  const { listDis, setListDis } = props;
  const [disable, setDisable] = React.useState<Boolean>(false);
  const [locId, setLocId] = useState<string[]>([]);
  const [proviId, setProviId] = useState<string[]>([]);

  const location = useLocation();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );

  const dataLocations = useSelector(
    (state: RootState) => state.dataLocation.data,
  );

  const userProfile = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  const listLocation: any = useRef<any>(
    userProfile?.profileLocations?.map((profile: any) => [
      profile?.province?.id,
      profile?.id,
    ]),
  );

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn địa điểm'
          : languageRedux === 2
          ? 'Select location'
          : languageRedux === 3 && '위치를  선택합니다'}
      </Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {proviId.length === 2
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 10 khu vực'
            : languageRedux === 2
            ? 'Only up to 10 areas can be'
            : languageRedux === 3 && '최대 10개 영역까지만 가능합니다'
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

  const onChange = (value: any) => {
    // Xử lý giá trị thay đổi

    setDisable(false);
    const secondValues = value?.map((item: any) => item[1]);
    const provinceValues = value?.map((item: any) => item[0]);
    const uniqueArr = [...new Set(provinceValues)] as string[];
    // console.log('value', value);

    if (uniqueArr?.length <= 3) {
      setLocId(secondValues);
      setListDis(value);
      setProviId(uniqueArr);
    }

    if (uniqueArr?.length >= 3) {
      setDisable(true);
    }
  };

  React.useEffect(() => {
    onChange(listLocation.current);
  }, [languageRedux]);

  return (
    <Box sx={{ margin: '12px 0' }}>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        multiple
        maxTagCount="responsive"
        size="large"
        placeholder={
          languageRedux === 1
            ? 'Chọn địa điểm'
            : languageRedux === 2
            ? 'Select location'
            : languageRedux === 3 && '위치를  선택합니다'
        }
        inputIcon={<EnvironmentOutlined />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        dropdownRender={DropdownRender}
        value={listDis.length !== (0 as any) ? listDis : []}
        defaultValue={
          listLocation.current?.length !== 0 &&
          listLocation.current !== undefined &&
          userProfile.length !== 0
            ? listLocation.current
            : listLocation.current?.length === 0 &&
              location?.pathname === '/profile'
            ? []
            : userProfile?.profileLocations?.map((profile: any) => [
                profile?.province?.id,
                profile?.id,
              ])
        }
        options={
          dataLocations
            ? dataLocations?.map((dataLocation: any) => ({
                value: dataLocation.province_id,
                label: dataLocation.province_fullName,
                disabled:
                  proviId.length < 3
                    ? false
                    : proviId.length <= 3 &&
                      proviId.includes(dataLocation.province_id)
                    ? false
                    : true,
                children: dataLocation.districts.map(
                  (child: { district_id: string; district: string }) => {
                    // var dis = false;
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
                      // disabled: dis,
                    };
                  },
                ),
              }))
            : []
        }
        onChange={onChange}
        changeOnSelect
        className="inputFilterLocationNav input-filter_nav"
        showCheckedStrategy={Cascader.SHOW_CHILD}
      />
    </Box>
  );
};

export default CascaderFilter;
