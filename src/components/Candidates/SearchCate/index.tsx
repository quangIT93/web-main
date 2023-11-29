import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import categoriesApi from 'api/categoriesApi';
// import redux
import { RootState } from 'store';

import { ArrowFilterIcon } from '#components/Icons';
import { CateIcon } from '#components/Icons/iconCandidate';
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

interface ISearchCate {
  setCategories: any;
  setReset: Function;
  reset: boolean;
  categories: any;
}

const SearchCate: React.FC<ISearchCate> = (props) => {
  const { setCategories, reset, setReset, categories } = props;

  const [dataCategories, setDataCategories] = React.useState<any>(null);
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
  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (dataCategories === null) {
      getCategories();
    }
    // if (listCate.length > 2) {
    //   setDisable(true)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3, languageRedux]);

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
    setCategories(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate filter-candidate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Ngành nghề'
          : languageRedux === 2
            ? 'Career'
            : languageRedux === 3 && '직업'}
      </Text>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable
          ? languageRedux === 1
            ? 'Vui lòng chọn ngành nghề bạn muốn tìm kiếm.'
            : languageRedux === 2
              ? 'Please select the job you want to search for'
              : languageRedux === 3 && '검색하고 싶은 직업을 선택해주세요'
          : 'Vui lòng chọn ngành nghề bạn muốn tìm kiếm.'}
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
        <CateIcon />
      </div>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        style={{ width: '100%' }}
        onChange={onChange as any}
        multiple
        maxTagCount="responsive"
        showCheckedStrategy={SHOW_CHILD}
        inputIcon={<CateIcon />}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        size="large"
        dropdownRender={DropdownRender}
        value={reset ? [] : categories}
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
        placeholder={
          languageRedux === 1
            ? 'Ngành nghề'
            : languageRedux === 2
              ? 'Career'
              : languageRedux === 3 && '직업'
        }
      />
    </div>
  );
};

export default SearchCate;
