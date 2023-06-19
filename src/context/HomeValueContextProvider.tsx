import React, { ReactNode, useState } from 'react'

export const HomeValueContext = React.createContext<{
  childCateloriesArray: number[]
  setChildCateloriesArray: React.Dispatch<React.SetStateAction<number[]>>
}>({
  childCateloriesArray: [],
  setChildCateloriesArray: () => {},
})

type ParentComponentProps = {
  children: ReactNode
}

const HomeValueContextProvider = ({ children }: ParentComponentProps) => {
  const [childCateloriesArray, setChildCateloriesArray] = useState<number[]>([])

  const homeValueContextData = {
    childCateloriesArray,
    setChildCateloriesArray,
  }

  return (
    <HomeValueContext.Provider value={homeValueContextData}>
      {children}
    </HomeValueContext.Provider>
  )
}

export default HomeValueContextProvider
