import React, { ReactNode, useState } from 'react'

export const HomeValueContext = React.createContext<{
  childCateloriesArray: number[]
  openCollapseFilter: boolean
  setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>
  setOpenCollapseFilter: React.Dispatch<React.SetStateAction<boolean>>
  heightNavbar: number
  setHeightNavbar: React.Dispatch<React.SetStateAction<number>>
  openModalLoginNavbar: boolean
  setOpenModalLoginNavbar: React.Dispatch<React.SetStateAction<boolean>>
}>({
  childCateloriesArray: [],
  setChildCateloriesArray: () => {},
  openCollapseFilter: false,
  setOpenCollapseFilter: () => {},
  heightNavbar: 0,
  setHeightNavbar: () => {},
  openModalLoginNavbar: false,
  setOpenModalLoginNavbar: () => {},
})

type ParentComponentProps = {
  children: ReactNode
}

const HomeValueContextProvider = ({ children }: ParentComponentProps) => {
  const [childCateloriesArray, setChildCateloriesArray] = useState<number[]>([])

  const [openCollapseFilter, setOpenCollapseFilter] = useState<boolean>(false)

  const [heightNavbar, setHeightNavbar] = useState<number>(0)

  const [openModalLoginNavbar, setOpenModalLoginNavbar] = useState(false)

  const homeValueContextData = {
    childCateloriesArray,
    setChildCateloriesArray,
    setOpenCollapseFilter,
    openCollapseFilter,
    setHeightNavbar,
    heightNavbar,
    setOpenModalLoginNavbar,
    openModalLoginNavbar,
  }

  return (
    <HomeValueContext.Provider value={homeValueContextData}>
      {children}
    </HomeValueContext.Provider>
  )
}

export default HomeValueContextProvider
