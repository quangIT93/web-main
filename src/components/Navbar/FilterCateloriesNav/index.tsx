import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Cascader, Divider, Typography, Button } from 'antd';
import categoriesApi from '../../../api/categoriesApi';
import './style.scss';
import { useSearchParams, useLocation } from 'react-router-dom';

import { RootState } from 'store';
const { Text } = Typography;

interface DistrictProps {
  setListCate: Function;
}
const { SHOW_CHILD } = Cascader;

const DropdownRender = (menus: React.ReactNode) => (
  <div style={{ width: '100%' }}>
    <Text className="title-filter_location">Chọn danh mục nghề nghiệp</Text>
    {menus}
    <Divider style={{ margin: 4 }} />
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

const FilterCateloriesNav: React.FC<DistrictProps> = ({ setListCate }) => {
  const [categoriesId, setCategoriesId] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const listCate = searchParams
    .getAll('categories-ids')
    .map((dis) => dis.split(','))
    .map((category) => category.map(Number));

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise();
      if (result) {
        setDataCategories(result.data);
      }

      if (location.pathname !== '/search-results' && userProfile) {
        setListCate(
          userProfile.categories.map((profile: any) => [
            profile.parent_category_id,
            profile.child_category_id,
          ]),
        );
      } else {
        setListCate(listCate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userProfile = useSelector((state: RootState) => state.profile.profile);
  React.useEffect(() => {
    getCategories();
    // if (listCate.length > 2) {
    //   setDisable(true)
    // }

    onChange(listCate);
  }, [userProfile]);

  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);

  const onChange = (value: any) => {
    setDisable(false);
    const secondValues = value.map((item: any) => item[1]);

    if (secondValues.length <= 3 && listCate.length <= 3) {
      setCategoriesId(secondValues);
      setListCate(value);
    }
    if (value.length > 1) {
      setDisable(true);
    }
  };

  if (userProfile || dataCategories) {
    return (
      <>
        <Cascader
          dropdownRender={DropdownRender}
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
            listCate?.length !== 0
              ? listCate
              : listCate?.length === 0 &&
                location.pathname === '/search-results'
              ? []
              : userProfile?.categories.map((profile: any) => [
                  profile?.parent_category_id,
                  profile?.child_category_id,
                ])
          }
          multiple
          maxTagCount="responsive"
          size="large"
          className="inputCategories input-filter_nav"
          showCheckedStrategy={SHOW_CHILD}
          style={{ width: '100%', borderRadius: '2px' }}
          placeholder="Chọn danh mục ngành nghề"
        />
      </>
    );
  } else {
    return <></>;
  }
};

export default FilterCateloriesNav;
