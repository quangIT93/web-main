import { useState, createContext, ReactNode } from 'react'

export const ChatContext = createContext<{
  userInfoChat: any
  setUserInfoChat: React.Dispatch<React.SetStateAction<any>>
  setSendMessages: React.Dispatch<React.SetStateAction<Message[]>>
  sendMessages: Message[]
  receivedMessages: Message[]
  setReceivedMessages: React.Dispatch<React.SetStateAction<Message[]>>
}>({
  userInfoChat: [],
  setUserInfoChat: () => {},
  sendMessages: [],
  receivedMessages: [],
  setSendMessages: () => {},
  setReceivedMessages: () => {},
})

type ParentComponentProps = {
  children: ReactNode
}

interface Message {
  receiverId: string
  message: string
  // createdAt: number
  type: string
  postId: number
}

const ChatContextProvider = ({ children }: ParentComponentProps) => {
  const [userInfoChat, setUserInfoChat] = useState<any>([])
  const [sendMessages, setSendMessages] = useState<Message[]>([])
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([])

  const valueChatContext = {
    userInfoChat,
    setUserInfoChat,
    sendMessages,
    setSendMessages,
    setReceivedMessages,
    receivedMessages,
  }
  return (
    <ChatContext.Provider value={valueChatContext}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider
