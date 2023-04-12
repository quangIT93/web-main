import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className="logo">
        <img src="/images/logo.png" />
      </div>
    </Link>
  )
}

export default Logo
