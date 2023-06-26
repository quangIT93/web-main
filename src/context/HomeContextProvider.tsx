import { useState, createContext, ReactNode } from 'react'

export const HomeContext = createContext<{
  openModalLogin: boolean
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>
}>({
  openModalLogin: false,
  setOpenModalLogin: () => {},
})

type ParentComponentProps = {
  children: ReactNode
}
const HomeContextProvider = ({ children }: ParentComponentProps) => {
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)

  const valueHomeContext = {
    openModalLogin,
    setOpenModalLogin,
  }
  return (
    <HomeContext.Provider value={valueHomeContext}>
      {children}
    </HomeContext.Provider>
  )
}

export default HomeContextProvider
