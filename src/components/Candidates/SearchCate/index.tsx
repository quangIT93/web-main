import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import categoriesApi from 'api/categoriesApi';
// import redux
import { RootState } from 'store';

import { EnvironmentOutlined } from '@ant-design/icons';
import { AddressFilterIcon, ArrowFilterIcon } from '#components/Icons';

// import ant
import { Button, Cascader, Divider, Typography } from 'antd';

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

const SearchCate = () => {
  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);

  const { SHOW_CHILD } = Cascader;
  const { Text } = Typography;

  const location = useLocation();

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getCategories();
    // if (listCate.length > 2) {
    //   setDisable(true)
    // }
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
    console.log(value);
  };

  return (
    <>
      <Cascader
        style={{ width: '100%' }}
        onChange={onChange as any}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        inputIcon={<EnvironmentOutlined />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
                value: parentCategory.parent_category_id,
                label: parentCategory.parent_category,
                children: parentCategory.childs.map((child: any) => {
                  var dis = false;
                  //check id child  when disable = true

                  return {
                    value: child.id,
                    label: child.name,
                    disabled: dis,
                  };
                }),
              }))
            : []
        }
        placeholder="Ngành nghể"
      />
    </>
  );
};

export default SearchCate;
