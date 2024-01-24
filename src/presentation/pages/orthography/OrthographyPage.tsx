import { useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components'

interface Messages {
  text: string;
  isGtp: boolean;
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGtp: false }]);

    setIsLoading(false);
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          {/* Welcome */}
          <GptMessage text="Welcome, you can write your text in Spanish, I help you with corrections" />
          {
            messages.map((message, index) => (
              message.isGtp ? <GptMessage key={index} text='This is from OpenAI' />
                : <MyMessage key={index} text={message.text} />
            ))
          }

          {
            isLoading && (
              <TypingLoader className="fade-in" />
            )
          }
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Write your text here!'
        disableCorrections={true}
      ></TextMessageBox>
    </div>
  )
}
