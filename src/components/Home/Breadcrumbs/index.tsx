import React, { useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'

import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import Checkbox from '@mui/material/Checkbox'
import { NumberOutlined } from '@ant-design/icons'

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

const BreadcrumbsCpn: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
      sx={{
        border: '1px solid #ccc',
        padding: '4px 12px',
        borderRadius: '12px',
        '&:hover': {
          background: '#e8f5ff',
          textDecoration: 'none',
        },
      }}
    >
      Home
    </Link>,
    <Typography
      key="3"
      color="text.primary"
      onClick={handleClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid #ccc',
        padding: '4px 12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Tất cả
      {open ? <ExpandLess /> : <ExpandMore />}
    </Typography>,
  ]

  return (
    <Stack spacing={2} sx={{ margin: '24px', position: 'relative' }}>
      <Breadcrumbs separator="" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Collapse
        in={open}
        // timeout="auto"
        // unmountOnExit
        unmountOnExit
        sx={{
          position: 'absolute',
          top: '100%',
          left: '84px',
          background: '#ccc',
          zIndex: 1,
          borderRadius: '12px',
          padding: '4px 24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          padding={0}
        >
          {/* <ul
            className="list-locations"
            style={{
              height: '300px',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              overflowY: 'scroll',
              margin: '0 24px',
            }}
          >
            {dataLocation.map((location: locationProp, index1) => (
              <li
                key={index1}
                style={{
                  padding: '4px 0 24px',
                  listStyle: 'none',
                }}
                className="list-location"
              >
                <h4
                  style={{
                    padding: '6px 0',
                    borderBottom: '1px solid #ccc',
                    color: '#1b87f5 ',
                  }}
                >
                  {location.city}
                </h4>
                {location.district.map((name: string, index2) => (
                  <label
                    key={index2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px',
                      borderBottom: '1px solid #ccc',
                    }}
                    htmlFor={name}
                  >
                    {name}
                    <input
                      type="checkbox"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '4px',
                      }}
                      id={name}
                      value={name}
                      onChange={(e) =>
                        handleOnChangeCheckboxPosition(index1, e)
                      }
                      checked={checkedState.includes(name) ? true : false}
                    />
                  </label>
                ))}
              </li>
            ))}
          </ul> */}
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </Collapse>
    </Stack>
  )
}

export default BreadcrumbsCpn

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
