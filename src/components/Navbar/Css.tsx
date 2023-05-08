import styled from '@emotion/styled'
import { colors } from '@mui/material'

export const accent = {
  color: 'black',
} // #e040fb (alternative method)

export const Container = styled('div')({
  minHeight: '88px',
  boxShadow: '1px 1px 5px black',
  padding: '0px 180px',
  zIndex: '10',
  position: 'fixed',
  width: '100%',
  top: '0',
  left: '0',
  right: '0',
  background: 'white',
})

export const Wrapper = styled('div')({
  //   padding: '10px 20px',

  minHeight: '88px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const Left = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  height: '70px',
})

export const SearchContainer = styled('div')({
  border: '0.5px solid lightgray',
  display: 'flex',
  alignItems: 'center',
  marginLeft: '25px',
  padding: '10px 10px 10px 15px',
  borderRadius: '20px',
  width: '400px',
  justifyContent: 'space-between',
  cursor: 'pointer',
  background: '#fff',
  boxShadow: '1px 1px 2px black',
  color: '#979797',
  fontSize: '12px',
  '&:hover': {
    background: '#e8f5ff',
  },
})

export const Input = styled.input({
  border: 'none',
  outline: 'none',
  paddingLeft: '10px',
  width: '100%',
})

export const Right = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

export const boxSX = {
  position: 'relative',

  color: 'black',
  '&:hover': {
    color: 'red',
  },
}

export const collapse = {
  position: 'absolute',
  top: '100%',
  backgroundColor: '#ccc',
}

export const Center = styled('div')({
  flex: 1,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ItemCenter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '4px',
  cursor: 'pointer',
  padding: '12px',
})

export const NavSearch = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 0',
})

export const InputSearh = styled.input({
  width: '320px',
  padding: '12px',
  borderRadius: '12px',
  outline: 'none',
  border: '1px solid #ccc',
})

export const NavSearchButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const SearchButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '24px',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '20px',
  width: '120px',
  textAlign: 'center',
})

export const NavFilter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingBottom: '24px',
})

export const ChoosesCarreer = styled('div')({
  border: '1px solid #ccc',
  minWidth: '260px',
  padding: '8px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
})

export const WrapChooseLocation = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
})

export const SubNavChoosesCarreer = styled('div')({
  position: 'absolute',
  top: '100%',
  background: '#ccc',
  padding: '12px 24px',
  minWidth: '360px',
  borderRadius: '12px',
  maxHeight: '400px',
  overflow: 'hidden',
})

export const SubNavCarreerUl = styled('ul')({})
export const SubNavCarreerLi = styled('li')({})

export const Div = styled('div')({
  height: '100px',
})

export const MenuItem = styled('div')({
  fontSize: '14px',
  cursor: 'pointer',
  marginRight: '25px',
  textAlign: 'center',
})
export const Language = styled.span({
  fontSize: '14px',
  cursor: 'pointer',
})
export const hoverButton = {
  '&:hover': {
    background: '$primary',
  },
}
