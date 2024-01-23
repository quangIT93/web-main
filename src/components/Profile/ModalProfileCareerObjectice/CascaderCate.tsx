import { ArrowFilterIcon } from '#components/Icons';
import { Box } from '@mui/material';
import { Cascader, Divider, Typography } from 'antd';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
//@ts-ignores
import { TypeCategories } from '../dto/TypeCategories';
const { Text } = Typography;
const { SHOW_CHILD } = Cascader;

interface PCascaderCate {
  dataCategories: TypeCategories[];
  listCateProps: [];
  setListCate: Function;
}

const CascaderCate: React.FC<PCascaderCate> = (props) => {
  const { dataCategories, listCateProps, setListCate } = props;
  const location = useLocation();
  const [disable, setDisable] = React.useState<Boolean>(false);
  const [categoriesId, setCategoriesId] = React.useState<string[]>([]);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const userProfile = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );
  const listCate: any = useRef<any>(
    userProfile?.profileCategories.map((profile: any) => [
      profile?.parentCategory?.id,
      profile?.id,
    ]),
  );
  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-loca-cate filter_cate">
      <Text className="title-filter_location">
        {languageRedux === 1
          ? 'Chọn danh mục nghề nghiệp'
          : languageRedux === 2
          ? 'Select a career category'
          : languageRedux === 3 && '카테고리를 선택합니다'}
      </Text>
      {menus}
      <Divider style={{ margin: 4 }}>
        {false
          ? languageRedux === 1
            ? 'Chỉ có thể tối đa 3 danh mục'
            : languageRedux === 2
            ? 'Only up to 10 categories can be'
            : languageRedux === 3 && '최대 10개의 카테고리만 가능합니다'
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
    setDisable(false);
    const secondValues = value?.map((item: any) => item[1]);

    if (secondValues?.length <= 10) {
      setCategoriesId(secondValues);
      setListCate(value);
    }
    if (value?.length >= 10) {
      setDisable(true);
    }
  };

  return (
    <Box sx={{ margin: '12px 0' }} className="box_cascader">
      <Cascader
        open
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        dropdownRender={DropdownRender}
        suffixIcon={<ArrowFilterIcon width={14} height={10} />}
        options={
          dataCategories
            ? dataCategories.map((parentCategory: any) => ({
                value: parentCategory.parent_category_id,
                label: parentCategory.parent_category,
                // disabled:
                //   cateId.length < 2
                //     ? false
                //     : cateId.length <= 2 &&
                //       cateId.includes(parentCategory.parent_category_id)
                //     ? false
                //     : true,
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
              location?.pathname === '/profile'
            ? []
            : userProfile?.profileCategories.map((profile: any) => [
                profile?.parentCategory?.id,
                profile?.id,
              ])
        }
        value={listCateProps}
        multiple
        maxTagCount="responsive"
        size="large"
        className="inputCategories input-filter_nav"
        showCheckedStrategy={SHOW_CHILD}
        style={{ width: '100%', borderRadius: '2px' }}
        placeholder={
          languageRedux === 1
            ? 'Chọn danh mục nghề nghiệp'
            : languageRedux === 2
            ? 'Select a career category'
            : languageRedux === 3 && '카테고리를 선택합니다'
        }
      />
    </Box>
  );
};

export default CascaderCate;
