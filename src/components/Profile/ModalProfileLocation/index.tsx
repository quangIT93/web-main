import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CloseOutlined } from '@ant-design/icons';

import { TreeSelect } from 'antd';

import { message } from 'antd';

// data
import profileApi from 'api/profileApi';
import { useDispatch } from 'react-redux';

// data
import locationApi from '../../../api/locationApi';

import {
  getProfile,
  // resetProfileState,
} from 'store/reducer/profileReducer/getProfileReducer';

import { RootState } from '../../../store/reducer/index';
import { useSelector } from 'react-redux';
import { profileVi } from 'validations/lang/vi/profile';
import { profileEn } from 'validations/lang/en/profile';
import languageApi from 'api/languageApi';

import './style.scss';
import { setProfileV3 } from 'store/reducer/profileReducerV3';

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

interface IModalProfileLocation {
  openModalLocation: boolean;
  setOpenModalLocation: React.Dispatch<React.SetStateAction<boolean>>;
  locations: number[];
}

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const ModalProfileLocation: React.FC<IModalProfileLocation> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const { openModalLocation, setOpenModalLocation, locations } = props;
  // const [dataAllLocation, setDataAllLocation] = React.useState<any>(null);
  // const [open, setOpen] = React.useState<any>([]);
  const [treeData, setTransformedData] = React.useState<any>(null);

  const dataAllLocation = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? 'vi' : 'en',
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

  const [value, setValue] = React.useState(locations?.map((v: any, i) => v.id));

  // const [location, setLocation] = React.useState<any>(
  //   locations?.map((v: any, i) => v.district),
  // );

  // const [locationId, setLocationId] = React.useState<any>(
  //   locations?.map((v: any, i) => v.district_id),
  // );

  const dispatch = useDispatch();

  const handleClose = () => {
    handleSubmit();
    setOpenModalLocation(false);
  };
  // const allLocation = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation(
  //       languageRedux === 1 ? 'vi' : 'en',
  //     );

  //     if (allLocation) {
  //       setDataAllLocation(allLocation.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  // allLocation();
  // getAllLocations()
  // delete param when back to page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

  React.useEffect(() => {
    if (dataAllLocation.length !== 0) {
      const transformedData = dataAllLocation.map((item: any) => {
        return {
          title: item?.province_name,
          value: item?.province_id,
          key: item?.province_id,
          children: item.districts.map((child: any) => {
            return {
              title: child.district,
              value: child.district_id,
              key: child.district_id,
            };
          }),
        };
      });

      setTransformedData(transformedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAllLocation]);

  useEffect(() => {
    setValue(locations?.map((v: any, i) => v.id) || []);

    if (dataAllLocation && dataAllLocation.length > 0) {
      // setOpen(Array(dataAllLocation.length).fill(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAllLocation]);

  // console.log('dataAllLocation', dataAllLocation)

  // const handleClickProvince = (event: any, index: number) => {
  //   event.stopPropagation();
  //   const newOpen = open.map((value: boolean, i: number) =>
  //     i === index ? !value : false,
  //   );
  //   setOpen(newOpen);
  // };

  // const handleClickDistrict = (value: any) => {
  //   setLocation((prevValues: number[]) => {
  //     if (prevValues.includes(value.district)) {
  //       // Nếu giá trị đã tồn tại, xoá nó khỏi
  //       const newValues = prevValues.filter((item) => item !== value.district);
  //       return newValues;
  //     } else {
  //       // Nếu giá trị chưa tồn tại, thêm nó vào mảng
  //       const newValues = [...prevValues, value.district];
  //       return newValues;
  //     }
  //   });

  //   setLocationId((prevValuesId: number[]) => {
  //     if (prevValuesId.includes(value.district_id)) {
  //       // Nếu giá trị đã tồn tại, xoá nó khỏi
  //       const newValues = prevValuesId.filter(
  //         (item: number) => item !== value.district_id,
  //       );
  //       return newValues;
  //     } else {
  //       // Nếu giá trị chưa tồn tại, thêm nó vào mảng
  //       const newValues = [...prevValuesId, value.district_id];
  //       return newValues;
  //     }
  //   });
  // };

  // const renderOptions = () => {
  //   return dataAllLocation?.map((item: any, index: number) => (
  //     <div key={index}>
  //       <ListItemButton onClick={(event) => handleClickProvince(event, index)}>
  //         <ListItemText primary={item.province_fullName} />
  //         {open[index] ? <ExpandLess /> : <ExpandMore />}
  //       </ListItemButton>
  //       <Collapse in={open[index]} timeout="auto" unmountOnExit>
  //         {item.districts.map((v: any, i: number) => (
  //           <MenuItem
  //             key={i}
  //             value={v.district}
  //             onClick={() => handleClickDistrict(v)}
  //           >
  //             <Checkbox checked={location?.indexOf(v.district) > -1} />
  //             <ListItemText primary={v.district} />
  //           </MenuItem>
  //         ))}
  //       </Collapse>
  //     </div>
  //   ));
  // };

  const handleSubmit = async () => {
    try {
      if (value.length > 10) {
        message.error(language?.limit_10_location);

        setValue(locations?.map((v: any, i) => v.id));
        return;
      }
      const result = await profileApi.updateProfileLocation(
        value,
        // locationId,
      );
      if (result) {
        const getProfileV3 = await profileApi.getProfileV3(
          languageRedux === 1 ? 'vi' : 'en',
        );
        await dispatch(setProfileV3(getProfileV3) as any);
        setOpenModalLocation(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTreeNode = (data: any) => {
    return (
      data &&
      data?.map((node: any) => {
        if (node.children) {
          return {
            ...node,
            disableCheckbox: true,
            selectable: true,
            checkable: false,

            // Set the value of disableCheckbox
          };
        }

        // console.log('node location', node);
        return node.children;
        // <TreeNode key={node.value} value={node.value} title={node.title} />
      })
    );
  };

  const tProps: any = {
    // treeData,
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
    placeholder: language?.working_location,
    style: {
      width: '100%',
      zIndex: '1302',
      margin: '12px auto',
    },
    className: 'modal-localtion_profile',
    size: 'Giờ làm việc large',
    treeIcon: false,
    // dropdownRender: CustomRenderCatelory,
  };

  return (
    <Modal
      open={openModalLocation}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
          {language?.working_location}
        </Typography>

        {/* <FormControl sx={{ width: '100%', margin: '12px auto' }} size="small">
          <Select
            multiple
            displayEmpty
            value={location}
            input={<OutlinedInput placeholder="Quận, Tỉnh/Thành Phố" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <p style={{ color: ' #aaaaaa', padding: '4px 0' }}>
                    Quận, Tỉnh/Thành Phố
                  </p>
                );
              } else {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value: string, i: number) => (
                      <Chip key={i} label={value} />
                    ))}
                  </Box>
                );
              }
            }}
            MenuProps={MenuProps}
          >
            {renderOptions()}
          </Select>
        </FormControl> */}
        <TreeSelect {...tProps} />

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {language?.profile_page?.save_info}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProfileLocation;
