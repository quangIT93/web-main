import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TreeSelect } from 'antd';
import Button from '@mui/material/Button';
import './style.scss';

import { CloseOutlined } from '@ant-design/icons';

// data
import profileApi from 'api/profileApi';
import categoriesApi from '../../../api/categoriesApi';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';

import { setProfileV3 } from 'store/reducer/profileReducerV3';
import { setProfileMeInformationV3 } from 'store/reducer/profileMeInformationReducerV3';
import { setAlertEditInfo } from 'store/reducer/profileReducer/alertProfileReducer';
const { SHOW_PARENT } = TreeSelect;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 375px)': {
    width: 300,
  },

  '@media (min-width: 400px) and (max-width: 639px)': {
    width: 410,
  },

  '@media (min-width: 640px) and (max-width: 839px)': {
    width: 640,
  },
};
interface ICategories {
  child_category_id: number;
  parent_category_id: number;
  parent_category: string;
  child_category: string;
}

interface IModalProfileCareerObjectice {
  openModalCareerObjective: boolean;
  setOpenModalCareerObjective: React.Dispatch<React.SetStateAction<boolean>>;
  categories: ICategories[];
}

const ModalProfileCareerObjectice: React.FC<IModalProfileCareerObjectice> = (
  props,
) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalCareerObjective, setOpenModalCareerObjective, categories } =
    props;
  const [value, setValue] = useState(
    categories && categories?.map((v: any, i) => v.id.toString()),
  );

  const [dataCategories, setDataCategories] = React.useState<any>(null);
  // const [originalValue, setOriginalValue] = useState<string[]>([]);
  // const [checkClick, setCheckList] = React.useState<boolean>(false);
  // const [childValue, setChildValue] = React.useState<string[]>([]);
  const [treeData, setTransformedData] = React.useState<any>(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    handleSubmit();
    setOpenModalCareerObjective(false);
  };
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

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
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);
  // const onChange = (newValue: string[] | any) => {
  //   setValue(newValue);
  // };

  React.useEffect(() => {
    if (dataCategories) {
      const transformedData = dataCategories.map((item: any) => {
        return {
          title: item?.parent_category,
          value: item?.parent_category_id.toString(),
          key: item?.parent_category_id.toString(),
          children: item.childs.map((child: any) => {
            return {
              title: child.name,
              value: child.id.toString(),
              key: child.id.toString(),
            };
          }),
        };
      });

      setTransformedData(transformedData);
    }
  }, [dataCategories]);

  React.useEffect(() => {
    setValue(categories?.map((v: any, i) => v.id.toString()) || []);
    // setOriginalValue(
    //   categories?.map((v, i) => v.child_category_id.toString()) || [],
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleSubmit = async () => {
    try {
      if (value.length > 10) {
        message.error(languageRedux === 1 ?
          "Chỉ được chọn tối đa 10 lĩnh vực quan tâm" :
          languageRedux === 2 ?
            "Only select up to 10 areas of interest" :
            "관심분야는 최대 10개까지만 선택할 수 있습니다.");
        return;
      }
      const result = await profileApi.updateProfileCareer(
        value.map((v: any) => parseInt(v.value)),
      );
      if (result) {
        const getProfileV3 = await profileApi.getProfileInformationV3(
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        if (getProfileV3) {
          await dispatch(setProfileMeInformationV3(getProfileV3) as any);
          dispatch(setAlertEditInfo(true));
          setOpenModalCareerObjective(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTreeNode = (data: any) => {
    return data?.map((node: any) => {
      if (node.children) {
        return {
          ...node,
          disableCheckbox: true,
          selectable: true,
          checkable: false,

          // Set the value of disableCheckbox
        };
      }

      // console.log('nodeeeeeeeeeeeeeee', node);
      return node.children;
      // <TreeNode key={node.value} value={node.value} title={node.title} />
    });
  };

  const tProps: any = {
    // treeData,
    // open: true,
    treeCheckStrictly: true,
    treeData: renderTreeNode(treeData),
    showCheckbox: true, // Ẩn checkbox cho tất cả các nút
    // treeCheckStrictly: true,
    // treeDefaultExpandAll: true,
    // showSearch: true, // Chỉ cho phép chọn các nút lá
    showSearch: false,
    value,
    treeCheckable: true,
    onChange: (newValue: string[]) => setValue(newValue),
    // treeCheckStrictly: true,
    // Enable strict checking
    // Disable the "All" checkbox at the root level
    showCheckedStrategy: SHOW_PARENT,
    // treeDefaultExpandAll,
    placeholder: languageRedux === 1
      ? 'Lĩnh vực quan tâm'
      : languageRedux === 2
        ? 'Career objective'
        : '관심 분야',
    style: {
      width: '100%',
      zIndex: '1302 !important',
      margin: '12px auto',
    },
    size: 'Giờ làm việc large',
    treeIcon: false,
    className: 'tree-modal_category',
    // dropdownRender: CustomRenderCatelory,
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Modal
      open={openModalCareerObjective}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onKeyDown={handleKeyDown}
    >
      <Box sx={style}>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            cursor: 'pointer',
            // border: '1px solid',
            borderRadius: '50%',
            padding: '1px',
          }}
          onClick={handleClose}
        >
          <CloseOutlined style={{ fontSize: '30px' }} />
        </div>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          {languageRedux === 1
            ? 'Lĩnh vực quan tâm'
            : languageRedux === 2
              ? 'Career objective'
              : '관심 분야'}
        </Typography>

        <TreeSelect {...tProps} />
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {languageRedux === 1
            ? 'Lưu thông tin'
            : languageRedux === 2
              ? 'Save information'
              : languageRedux === 3 &&
              '정보 저장'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileCareerObjectice;
