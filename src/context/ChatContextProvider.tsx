import { useState, createContext, ReactNode } from 'react'

export const ChatContext = createContext<{
  userInfoChat: any
  setUserInfoChat: React.Dispatch<React.SetStateAction<any>>
}>({
  userInfoChat: [],
  setUserInfoChat: () => {},
})

type ParentComponentProps = {
  children: ReactNode
}
const ChatContextProvider = ({ children }: ParentComponentProps) => {
  const [userInfoChat, setUserInfoChat] = useState<any>([])

  const valueChatContext = {
    userInfoChat,
    setUserInfoChat,
  }
  return (
    <ChatContext.Provider value={valueChatContext}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider
