import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// import { NumberOutlined } from '@ant-design/icons';
import Skeleton from '@mui/material/Skeleton';

// import component

// import redux
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
// import api
import categoriesApi from '../../../api/categoriesApi';
import postApi from 'api/postApi';
import './style.scss';

// import context
import { HomeValueContext } from 'context/HomeValueContextProvider';
import { IvalueJobChild } from 'context/HomeValueContextProvider';
import { home } from 'validations/lang/vi/home';
import { homeEn } from 'validations/lang/en/home';

const BreadcrumbsCpn: React.FC = () => {
  // Contexts
  const {
    setChildCateloriesArray,

    valueJobChild,
  }: {
    navTouchCatelory: boolean;
    setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>;
    childCateloriesArray: number[];
    valueJobChild: IvalueJobChild;
    setValueJobChild: React.Dispatch<React.SetStateAction<IvalueJobChild>>;
  } = useContext(HomeValueContext);

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [checked, setChecked] = React.useState(true)
  const [childCatelories, setChildCatelories] = React.useState<any>(null);

  const [checkedItems, setCheckedItems] = useState<any>(null);

  const [arrayChild, setArrayChild] = useState<any>([]);

  // state redux
  const { postNewest } = useSelector((state: RootState) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const MAX_CHECKED_ITEMS = 3;

  const [checkItemsCount, setCheckItemsCount] = React.useState<number>(0);

  const { setPostNewest } = bindActionCreators(actionCreators, dispatch);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.isPropagationStopped();
    setOpen(!open);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked)
  // }

  const getAllChildCategoriesById = async () => {
    try {
      // setIsLoading(true);
      const result = await categoriesApi.getAllChildCategories(
        valueJobChild?.id,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        // setIsLoading(false);
        setChildCatelories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getAllChildCategoriesById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueJobChild?.id, languageRedux]);

  useEffect(() => {
    setCheckedItems(
      childCatelories?.map((childCatelorie: any) => ({
        id: childCatelorie.id,
        name: childCatelorie.name,
        checked: false,
      })),
    );
  }, [childCatelories]);

  useEffect(() => {
    setArrayChild([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('categories-id')]);

  const handleClickChoose = async () => {
    setOpen(false);

    const array = checkedItems
      .map((checkedItem: any) => {
        if (checkedItem?.checked === true) {
          return { id: checkedItem?.id, name: checkedItem?.name };
        }
        return null;
      })
      .filter((filterArrayId: any | null) => filterArrayId !== null);

    setArrayChild(array);

    setChildCateloriesArray(
      array.map((arr: { id: number; name: string }) => arr.id),
    );
    const thersholdId =
      postNewest.data.posts[postNewest.data.posts.length - 1].id;

    try {
      const result = await postApi.getPostNewest(
        Number(valueJobChild?.id),
        array.map((arr: { id: number; name: string }) => arr.id),
        null,
        9,
        thersholdId,
        languageRedux === 1 ? 'vi' : 'en',
      );
      if (result) {
        setPostNewest(result);
        // setOpenBackdrop(false)
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // handle limit checkbox
  useEffect(() => {
    if (checkedItems) {
      const checkedCount: number = Object.values(
        checkedItems as { id: number; name: string; checked: boolean }[],
      ).filter((item: { id: number; name: string; checked: boolean }) => {
        return item.checked === true;
      }).length;
      setCheckItemsCount(checkedCount);
    }
  }, [checkedItems]);

  // handle Close checkbox breadcrumb
  // useEffect(() => {
  //   if (childCateloriesArray?.length !== checkedItems?.length && open === false)
  //     setCheckedItems(childCateloriesArray)
  // }, [open])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCheckedItems((prevCheckedItems: any) => {
      const updatedCheckedItems = [...prevCheckedItems];
      const itemIndex = updatedCheckedItems.findIndex(
        (item) => item.id === parseInt(name),
      );

      if (itemIndex !== -1) {
        updatedCheckedItems[itemIndex] = {
          ...updatedCheckedItems[itemIndex],
          checked,
        };
      }

      return updatedCheckedItems;
    });
  };

  const handleOutsideClick = (event: any) => {
    if (
      !event.target.closest('.collapse-breadcrumbs') &&
      !event.target.closest('.button-breadcrumb') &&
      !event.target.closest('.icon-breadcrumb')
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbs = [
    <Typography
      key="2"
      color="text.primary"
      sx={{
        // position: 'relative',
        cursor: 'pointer',
        padding: '4px 12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #0D99FF',
        color: '#0D99FF',
        background: '#ffffff',
      }}
    >
      {valueJobChild?.parentName}
    </Typography>,
    valueJobChild?.id === 1 ? (
      <React.Fragment key="3"></React.Fragment>
    ) : (
      <div
        key="3"
        style={{
          position: 'relative',
        }}
        className="button-breadcrumb"
        onClick={(e) => handleClick(e)}
      >
        <Typography
          color="text.primary"
          sx={{
            cursor: 'pointer',
            padding: '4px 12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #0D99FF',
            color: '#0D99FF',
            background: '#ffffff',
          }}
        >
          {arrayChild?.length === 0
            ? languageRedux === 1
              ? home.all
              : homeEn.all
            : arrayChild?.map(
                (value: { id: number; name: string }, index: number) => (
                  <div key={index}>
                    {value.name} {index !== arrayChild.length - 1 ? '/ ' : ''}
                  </div>
                ),
              )}
          {open ? (
            <ExpandLess className="icon-breadcrumb" />
          ) : (
            <ExpandMore className="icon-breadcrumb" />
          )}
        </Typography>
      </div>
    ),
  ];

  return (
    <Stack
      className="bread-crumb-container"
      spacing={2}
      sx={{
        marginTop: '192px',
        // marginTop: navTouchCatelory ? '170px' : '24px',
        // position: 'relative',
        position: 'fixed',
        // sua
        // top: '-60px',
        zIndex: '1',
        background: '#ffffff',
        padding: '16px 180px ',
        left: 0,
        right: 0,
        borderBottom: '1px solid #e5e5e5',
        '@media (max-width: 767px)': {
          marginTop: '180px',
        },
      }}
    >
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={34} />
      ) : (
        <Breadcrumbs separator="" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      )}
      <Collapse
        in={open}
        // timeout="auto"
        // unmountOnExit
        unmountOnExit
        className="collapse-breadcrumbs"
      >
        <Typography className="header-breabcrumb_text">
          {languageRedux === 1 ? 'Danh sách' : 'List'}
        </Typography>
        <Box padding={0} className="box-breadcrumbs">
          <FormGroup>
            {childCatelories?.map((childCatelorie: any, index: number) => (
              <FormControlLabel
                key={index}
                sx={{
                  padding: '4px 24px',
                }}
                control={
                  <Checkbox
                    key={index}
                    checked={
                      checkedItems
                        ? checkedItems[index]?.checked || false
                        : false
                    }
                    onChange={handleCheckboxChange}
                    name={childCatelorie?.id.toString()}
                    value={childCatelorie?.name.toString()}
                    disabled={
                      checkedItems
                        ? !checkedItems[index]?.checked &&
                          checkItemsCount >= MAX_CHECKED_ITEMS
                        : false
                    }
                  />
                }
                label={childCatelorie?.name}
              />
            ))}
          </FormGroup>
        </Box>
        <div className="wrapBtn-breadcrumb_nav">
          <button
            type="submit"
            className="btn-breadcrumb_nav"
            onClick={handleClickChoose}
          >
            {languageRedux === 1 ? 'Chọn' : 'Select'}
          </button>
        </div>
      </Collapse>
      {/* <Stack
        spacing={2}
        sx={{
          marginTop: '238px',
          // marginTop: navTouchCatelory ? '170px' : '24px',
          // position: 'relative',
          position: 'fixed',
          // sua
          top: '-23px',
          zIndex: '1',
          background: '#ffffff',
          padding: '16px 8px ',
          left: 180,
          right: 180,
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <Breadcrumbs separator="" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>

        <Collapse
          in={open}
          // timeout="auto"
          // unmountOnExit
          unmountOnExit
          className="collapse-breadcrumbs"
        >
          <Typography className="header-breabcrumb_text">Danh sách</Typography>
          <Box padding={0} className="box-breadcrumbs">
            <FormGroup>
              {childCatelories?.map((childCatelorie: any, index: number) => (
                <FormControlLabel
                  key={index}
                  sx={{
                    padding: '4px 24px',
                  }}
                  control={
                    <Checkbox
                      key={index}
                      checked={
                        checkedItems
                          ? checkedItems[index]?.checked || false
                          : false
                      }
                      onChange={handleCheckboxChange}
                      name={childCatelorie?.id.toString()}
                      value={childCatelorie?.name.toString()}
                      disabled={
                        checkedItems
                          ? !checkedItems[index]?.checked &&
                          checkItemsCount >= MAX_CHECKED_ITEMS
                          : false
                      }
                    />
                  }
                  label={childCatelorie?.name}
                />
              ))}
            </FormGroup>
          </Box>
          <div className="wrapBtn-breadcrumb_nav">
            <button
              type="submit"
              className="btn-breadcrumb_nav"
              onClick={handleClickChoose}
            >
              Chọn
            </button>
          </div>
        </Collapse>
      </Stack> */}
    </Stack>
  );
};

export default BreadcrumbsCpn;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import Link, { LinkProps } from '@mui/material/Link';
// import ListItem, { ListItemProps } from '@mui/material/ListItem';
// import Collapse from '@mui/material/Collapse';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import {
//   Link as RouterLink,
//   Route,
//   Routes,
//   MemoryRouter,
//   useLocation,
// } from 'react-router-dom';

// interface ListItemLinkProps extends ListItemProps {
//   to: string;
//   open?: boolean;
// }

// const breadcrumbNameMap: { [key: string]: string } = {
//   '/inbox': 'Inbox',
//   '/inbox/important': 'Important',
//   '/trash': 'Trash',
//   '/spam': 'Spam',
//   '/drafts': 'Drafts',
// };

// function ListItemLink(props: ListItemLinkProps) {
//   const { to, open, ...other } = props;
//   const primary = breadcrumbNameMap[to];

//   let icon = null;
//   if (open != null) {
//     icon = open ? <ExpandLess /> : <ExpandMore />;
//   }

//   return (
//     <li>
//       <ListItem button component={RouterLink as any} to={to} {...other}>
//         <ListItemText primary={primary} />
//         {icon}
//       </ListItem>
//     </li>
//   );
// }

// interface LinkRouterProps extends LinkProps {
//   to: string;
//   replace?: boolean;
// }

// function LinkRouter(props: LinkRouterProps) {
//   return <Link {...props} component={RouterLink as any} />;
// }

// function Page() {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <Breadcrumbs aria-label="breadcrumb">
//       <LinkRouter underline="hover" color="inherit" to="/">
//         Home
//       </LinkRouter>
//       {pathnames.map((_value, index) => {
//         const last = index === pathnames.length - 1;
//         const to = `/${pathnames.slice(0, index + 1).join('/')}`;

//         return last ? (
//           <Typography color="text.primary" key={to}>
//             {breadcrumbNameMap[to]}
//           </Typography>
//         ) : (
//           <LinkRouter underline="hover" color="inherit" to={to} key={to}>
//             {breadcrumbNameMap[to]}
//           </LinkRouter>
//         );
//       })}
//     </Breadcrumbs>
//   );
// }

// export default function RouterBreadcrumbs() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   return (
//     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
//         <Routes>
//           <Route path="*" element={<Page />} />
//         </Routes>
//         <Box
//           sx={{
//             bgcolor: 'background.paper',
//             mt: 1,
//           }}
//           component="nav"
//           aria-label="mailbox folders"
//         >
//           <List>
//             <ListItemLink to="/inbox" open={open} onClick={handleClick} />
//             <Collapse component="li" in={open} timeout="auto" unmountOnExit>
//               <List disablePadding>
//                 <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
//               </List>
//             </Collapse>
//             <ListItemLink to="/trash" />
//             <ListItemLink to="/spam" />
//           </List>
//         </Box>
//       </Box>
//     </MemoryRouter>
//   );
// }
