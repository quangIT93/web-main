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
import './style.scss';
interface ISearchCate {
  setCategories: any;
  setReset: Function;
  reset: boolean;
  categories: any;
  typeModal: number;
}

const FilterCategoryTemplate: React.FC<ISearchCate> = (props) => {
  const { setCategories, reset, setReset, categories, typeModal } = props;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileV3, languageRedux]);

  const onChange = (value: string[][]) => {
    setReset(false);
    setCategories(
      value !== undefined ? value : [],
    );
    // console.log(value);
  };

  const DropdownRender = (menus: React.ReactNode) => (
    <div className="filter-cate-template filter-template">
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
              ? 'Please select the profession you want to search for'
              : languageRedux === 3
                ? '검색하고 싶은 직업을 선택해주세요.'
                : 'Vui lòng chọn ngành nghề bạn muốn tìm kiếm.'
          : ''}
      </Divider>
    </div>
  );

  return (
    <div className="wrap-filter-cate-template">
      <div className="filter-cate-template-icon">
        <CateIcon />
      </div>
      <Cascader
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        style={{ width: '100%' }}
        onChange={onChange as any}
        // multiple
        allowClear={true}
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
              children: typeModal === 1 ?
                parentCategory.childs.map((child: any) => {
                  var dis = false;
                  //check id child  when disable = true

                  return {
                    value: child.id,
                    label: child.name,
                    disabled: dis,
                  };
                }) : [],
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

export default FilterCategoryTemplate;
