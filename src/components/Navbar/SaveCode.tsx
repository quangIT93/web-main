import React, { useState } from 'react'
// @ts-ignore
// import { Link } from 'react-router-dom'

// @ts-ignore
import { Logo, ArrowdownIcon, ArrowrightIcon } from '#components'
// @ts-ignore
import { BellIcon, ChatIcon, SearchIcon, EditIcon } from '#components'
// @ts-ignore

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'

import { Collapse } from '@mui/material'

import Badge from '@mui/material/Badge'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Link from '@mui/material/Link'

import AdsClickIcon from '@mui/icons-material/AdsClick'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import {
  Container,
  hoverButton,
  Wrapper,
  SearchContainer,
  Language,
  Center,
  Input,
  Left,
  Right,
  MenuItem,
  Div,
} from './Css'

import { accent, boxSX, collapse } from './Css'

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}
const buttons = [
  <Button
    key="one"
    style={{
      marginLeft: '8px',
      width: '120px',
      border: '1px solid black',
      padding: '12px',
    }}
  >
    Đăng nhập
  </Button>,
  <Button
    key="two"
    style={{
      marginLeft: '8px',
      width: '120px',
      border: '1px solid black',
      padding: '12px',
    }}
  >
    Đăng ký
  </Button>,
]
// import './style.scss'
const preventDefault = (event: React.SyntheticEvent) => event.preventDefault()
const Navbar: React.FC = () => {
  const [hidenNavPost, setHiddenNavPost] = useState('')
  const handleNavPost = () => {
    if (!hidenNavPost) {
      setHiddenNavPost('hidenNavPost')
      document.body.style.overflow = 'hidden'
    } else {
      setHiddenNavPost('')
      document.body.style.overflow = 'scroll'
    }
  }
  const [openLogin, setOpenLogin] = React.useState(false)
  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [value, setValue] = React.useState(0)

  const handleClick = () => {
    setOpenLogin(!openLogin)
  }

  const handleClickInput = () => {
    setOpenCollapse(!openCollapse)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo />
          <SearchContainer onClick={handleClickInput}>
            {/* <Input placeholder="Search" /> */}
            <SearchIcon
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            />
          </SearchContainer>
        </Left>
        {/* <List sx={{ display: 'flex', height: '88px', padding: '0' }}>
          <ListItemButton sx={hoverButton}>
            <ListItemIcon>
              <Badge badgeContent={4} sx={boxSX}>
                <ShoppingCartIcon sx={accent} />
              </Badge>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={hoverButton}>
            <ListItemIcon>
              <Badge badgeContent={4} sx={boxSX}>
                <ShoppingCartIcon sx={accent} />
              </Badge>
            </ListItemIcon>
          </ListItemButton>
        </List> */}
        {/* <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </Box> */}
        <Right>
          {/* <Button
            variant="contained"
            startIcon={<AdsClickIcon />}
            style={{ marginRight: '25px' }}
            sx={boxSX}
            onClick={handleClick}
          >
            Hãy nhấn vào
            {open ? <ExpandLess /> : <ExpandMore />}
            <Collapse in={open} timeout="auto" unmountOnExit sx={collapse}>
              <Div>adjklasdjkla</Div>
            </Collapse>
          </Button> */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup sx={{ margin: '0' }}>
              {buttons}

              <Button
                variant="contained"
                style={{
                  marginLeft: '16px',
                  borderRadius: '30px',
                  width: '80px',
                  background: 'white',
                }}
                onClick={handleClick}
              >
                <Person2OutlinedIcon
                  // fontSize="large"
                  sx={{
                    fontSize: '40px',
                    borderRadius: '50%',
                    background: 'blue',
                    padding: '4px',
                    color: 'white',
                  }}
                />
                {openLogin ? (
                  <ExpandLess sx={{ color: '#000' }} />
                ) : (
                  <ExpandMore sx={{ color: '#000' }} />
                )}
                <Collapse
                  in={openLogin}
                  timeout="auto"
                  unmountOnExit
                  sx={collapse}
                >
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'red',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <Person2OutlinedIcon
                        component="div"
                        id="nested-list-subheader"
                      >
                        Nested List Items
                      </Person2OutlinedIcon>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>
                        <Person2OutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                      {openLogin ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openLogin} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                          <ListItemText primary="Starred" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </Button>
            </ButtonGroup>
          </Box>
        </Right>
      </Wrapper>
      <Collapse
        in={openCollapse}
        timeout="auto"
        unmountOnExit
        sx={{
          backgroundColor: '#ccc',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Div>adjklasdjkla</Div>
      </Collapse>
    </Container>
  )
}

export default Navbar
