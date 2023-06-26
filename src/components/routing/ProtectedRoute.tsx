import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Navbar from '../Navbar'

const ProtectedRoute = () => {
  //   const {
  //     authState: { authLoading, isAuthenticated },
  //   } = useContext(AuthContext)
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const authLoading = false
  const isAuthenticated = true
  if (authLoading)
    return (
      <>
        <Backdrop
          sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress sx={{ color: 'red' }} />
        </Backdrop>
      </>
    )

  return isAuthenticated ? (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  )
}

export default ProtectedRoute
