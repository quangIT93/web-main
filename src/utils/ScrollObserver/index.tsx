import React from 'react'

interface ScrollValue {
  scrollY: number
}

interface Props {
  children: React.ReactNode
}

export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 })

const ScrollObserver: React.FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = React.useState<number>(0)

  const handleScrollWindow = () => {
    setScrollY(window.scrollY)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollWindow)

    return () => window.removeEventListener('scroll', handleScrollWindow)
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollObserver
