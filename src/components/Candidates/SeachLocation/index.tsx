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
// interface Option {
//   value: string | number;
//   label: string;
//   children?: Option[];
// }
// const options: Option[] = [
//   {
//     label: 'Light',
//     value: 'light',
//     children: new Array(20)
//       .fill(null)
//       .map((_, index) => ({ label: `Number ${index}`, value: index })),
//   },
//   {
//     label: 'Bamboo',
//     value: 'bamboo',
//     children: [
//       {
//         label: 'Little',
//         value: 'little',
//         children: [
//           {
//             label: 'Toy Fish',
//             value: 'fish',
//           },
//           {
//             label: 'Toy Cards',
//             value: 'cards',
//           },
//           {
//             label: 'Toy Bird',
//             value: 'bird',
//           },
//         ],
//       },
//     ],
//   },
// ];

interface ISearchLocation {
  setAddresses: any;
  setReset: Function;
  reset: boolean;
  addresses: any;
}

const SeachLocation: React.FC<ISearchLocation> = (props) => {
  const { setAddresses, reset, setReset, addresses } = props;
  const [dataLocations, setDataLocations] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);

  const { SHOW_CHILD } = Cascader;
  const { Text } = Typography;

  const location = useLocation();

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const getAllLocaitions = async () => {
    try {
      const result = await locationApi.getAllLocation(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setDataLocations(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllLocaitions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3]);

  //   const DropdownRender = (menus: React.ReactNode) => (
  //     <div className="filter-loca-cate">
  //       <Text className="title-filter_location">{language?.select_location}</Text>
  //       {menus}
  //       <Divider style={{ margin: '8px 5px' }}>
  //         {disable ? language?.limit_10_location : ''}
  //       </Divider>
  //       {/* <div style={{ padding: 12, display: 'flex', justifyContent: 'flex-end' }}>
  //         <Button type="default" onClick={() => {}}>
  //           Huỷ
  //         </Button>
  //         <Button type="primary" onClick={() => {}}>
  //           Áp dụng
  //         </Button>
  //       </div> */}
  //     </div>
  //   );

  const onChange = (value: string[][]) => {
    setReset(false);
    setAddresses(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate">
      <Text className="title-filter_location">Địa điểm</Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable ? 'Vui lòng chọn địa điểm bạn muốn tìm kiếm.' : ''}
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
    <div className="wrap-search_candidate">
      <div
        style={{ position: 'absolute', zIndex: '8', top: '10px', left: '10px' }}
      >
        <LocationIcon />
      </div>
      <Cascader
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
        placeholder={languageRedux === 1 ? 'Địa điểm' : 'Location'}
      />
    </div>
  );
};

export default SeachLocation;
