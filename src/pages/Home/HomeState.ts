import { useState } from 'react'

export const useHomeState = () => {
  const [openCollapse, setOpenCollapse] = useState(false)
  const [height, setHeight] = useState<number>(0)
  const [openModalLogin, setOpenModalLogin] = useState(false)

  return {
    openCollapse,
    setOpenCollapse,
    height,
    setHeight,
    openModalLogin,
    setOpenModalLogin,
  }
}
