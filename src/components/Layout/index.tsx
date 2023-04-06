import React from 'react'
import './style.scss'

interface Props {
  Navbar?: React.FC
  children: React.ReactElement
}

const Layout: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>
}

export default Layout
