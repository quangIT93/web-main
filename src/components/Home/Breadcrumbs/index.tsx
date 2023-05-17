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

interface PropsBreadcrums {
  valueJob: string
}

const BreadcrumbsCpn: React.FC<PropsBreadcrums> = (props) => {
  const { valueJob } = props
  const [open, setOpen] = React.useState(false)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.isPropagationStopped()
    setOpen(!open)
  }

  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const breadcrumbs = [
    <Typography
      key="3"
      color="text.primary"
      onClick={handleClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        padding: '4px 12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #0D99FF',
        color: '#0D99FF',
      }}
    >
      {valueJob}
    </Typography>,
    <Typography
      key="3"
      color="text.primary"
      onClick={handleClick}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        padding: '4px 12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #0D99FF',
        color: '#0D99FF',
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
        ></Box>
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
