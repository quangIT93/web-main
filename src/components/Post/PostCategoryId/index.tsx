import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Cascader, Divider } from 'antd';
import categoriesApi from '../../../api/categoriesApi';
import './style.scss';

const { SHOW_CHILD } = Cascader;

interface ICategories {
  setCategoriesId: React.Dispatch<React.SetStateAction<string[]>>;
  setFillCate: React.Dispatch<React.SetStateAction<string[]>>;
  categoriesId: string[];
  fillCate: string[];
}

const CheckboxesTags: React.FC<ICategories> = (props) => {
  const { setCategoriesId, categoriesId, fillCate, setFillCate } = props;

  const [dataCategories, setDataCategories] = React.useState<any>(null);
  const [disable, setDisable] = React.useState<Boolean>(false);

  // const dropdownMenuStyle = { maxHeight: '200px', overflowY: 'auto' };

  // console.log("fillCate", fillCate);

  const DropdownRender = (menus: React.ReactNode) => (
    <div style={{ width: '100%' }}>
      {menus}
      <Divider style={{ margin: '8px 5px' }}>
        {disable ? 'Chỉ có thể tối đa 2 danh mục' : ''}
      </Divider>
    </div>
  );

  const onChange = (value: any) => {
    setDisable(false);
    setFillCate(value);
    const secondValues = value?.map((item: any) => item[1]);
    if (secondValues.length <= 2) {
      setCategoriesId(secondValues);
    }
    if (value.length > 1) {
      setDisable(true);
    }
  };

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise();
      if (result) {
        setDataCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fillCate.length >= 2 ? setDisable(true) : setDisable(false);
  }, [fillCate]);

  // React.useEffect(() => {
  //   onChange(categoriesId);
  // }, [setDataCategories]);

  return (
    <Box
      sx={{
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="post_cate"
    >
      <Typography
        sx={{ fontWeight: 600, color: '#000000' }}
        variant="body1"
        component="label"
        htmlFor="jobTitle"
      >
        Danh mục nghề <span style={{ color: 'red' }}>*</span>
      </Typography>
      <Cascader
        defaultValue={fillCate}
        value={fillCate}
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
        dropdownRender={DropdownRender}
        // dropdownStyle={dropdownMenuStyle}
        popupClassName="post-category-drop"
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        size="large"
        className="input-category-post"
        showCheckedStrategy={SHOW_CHILD}
        style={{ borderRadius: '2px' }}
      />
    </Box>
  );
};

export default memo(CheckboxesTags);
