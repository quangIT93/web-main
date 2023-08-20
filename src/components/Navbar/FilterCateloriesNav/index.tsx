import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

// import Box from '@mui/material/Box';
import { Cascader, Divider, Typography } from 'antd';
import categoriesApi from '../../../api/categoriesApi';
import './style.scss';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getCookie } from 'cookies';
import { RootState } from 'store';
import { BagFilterIcon, ArrowFilterIcon } from '#components/Icons';

import { homeEn } from 'validations/lang/en/home';
import { home } from 'validations/lang/vi/home';

const { Text } = Typography;

interface DistrictProps {
  listCateProps: [];
  setListCate: Function;
  reset: Boolean;
  setReset: React.Dispatch<React.SetStateAction<Boolean>>;
}
const { SHOW_CHILD } = Cascader;

// const DropdownRender = (menus: React.ReactNode) => (
//   <div style={{ width: '100%' }}>
//     <Text className="title-filter_location">Chọn danh mục nghề nghiệp</Text>
//     {menus}
//     <Divider style={{ margin: 4 }} />
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

const FilterCateloriesNav: React.FC<DistrictProps> = ({
  listCateProps,
  setListCate,
  reset,
  setReset,
}) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [categoriesId, setCategoriesId] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const userProfile = useSelector((state: RootState) => state.profile.profile);

  const DropdownRender = (menus: React.ReactNode) => (
    <div style={{ width: '520px' }} className="filter-loca-cate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn danh mục nghề nghiệp'
          : 'Select career categories'}
      </Text>
      {menus}
      <Divider style={{ margin: 4 }}>
        {disable
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 10 danh mục'
            : 'Can only max 10 categories'
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

  const listCate: any = useRef<any>(
    JSON.parse(getCookie('userFiltered') || '{}')?.list_cate
      ? JSON.parse(getCookie('userFiltered') || '{}')?.list_cate
      : userProfile?.categories.map((profile: any) => [
          profile?.parent_category_id,
          profile?.child_category_id,
        ]),
  );

  searchParams
    .getAll('categories-ids')
    .map((dis) => dis.split(','))
    .map((category) => category.map(Number));

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise(
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setDataCategories(result.data);
      }

      if (
        location?.pathname !== '/search-results' &&
        userProfile &&
        listCate?.current?.length === 0
      ) {
        setListCate(
          userProfile.categories.map((profile: any) => [
            profile.parent_category_id,
            profile.child_category_id,
          ]),
        );
      } else {
        setListCate(listCate?.current);
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
    onChange(listCate?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);

  const onChange = (value: any) => {
    setReset(false);
    setDisable(false);
    const secondValues = value?.map((item: any) => item[1]);

    if (secondValues?.length <= 10) {
      setCategoriesId(secondValues);
      setListCate(value);
    }
    if (value?.length > 9) {
      setDisable(true);
    }
  };

  if (userProfile || dataCategories) {
    return (
      <div className="filter-input">
        <div className="filter-input_icon">
          <BagFilterIcon width={20} height={20} />
        </div>
        <Cascader
          // open
          dropdownRender={DropdownRender}
          suffixIcon={<ArrowFilterIcon width={14} height={10} />}
          options={
            dataCategories
              ? dataCategories.map((parentCategory: any) => ({
                  value: parentCategory.parent_category_id,
                  label: parentCategory.parent_category,
                  children: parentCategory.childs.map((child: any) => {
                    var dis = false;
                    //check id child  when disable = true
                    if (disable) {
                      dis = true;
                      for (const elem of categoriesId) {
                        if (elem === child.id) {
                          dis = false;
                          break;
                        }
                      }
                    }
                    return {
                      value: child.id,
                      label: child.name,
                      disabled: dis,
                    };
                  }),
                }))
              : []
          }
          onChange={onChange}
          defaultValue={
            listCate?.current?.length !== 0
              ? listCate?.current
              : listCate?.current?.length === 0 &&
                location?.pathname === '/search-results'
              ? []
              : userProfile?.categories.map((profile: any) => [
                  profile?.parent_category_id,
                  profile?.child_category_id,
                ])
          }
          value={reset ? [] : listCateProps}
          multiple
          maxTagCount="responsive"
          size="large"
          className="inputCategories input-filter_nav"
          showCheckedStrategy={SHOW_CHILD}
          style={{ width: '100%', borderRadius: '2px' }}
          placeholder={
            languageRedux === 1
              ? 'Chọn danh mục nghề nghiệp'
              : 'Select career categories'
          }
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default FilterCateloriesNav;
