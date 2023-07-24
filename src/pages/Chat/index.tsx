import React, { useEffect, useRef, useState } from 'react';
import sendIcon from './send.svg';
import { SendIcon } from '#components/Icons';

import './style.scss';

// const generateMessage = () => {
//   const words = [
//     'The sky',
//     'above',
//     'the port',
//     'was',
//     'the color of television',
//     'tuned',
//     'to',
//     'a dead channel',
//     '.',
//     'All',
//     'this happened',
//     'more or less',
//     '.',
//     'I',
//     'had',
//     'the story',
//     'bit by bit',
//     'from various people',
//     'and',
//     'as generally',
//     'happens',
//     'in such cases',
//     'each time',
//     'it',
//     'was',
//     'a different story',
//     '.',
//     'It',
//     'was',
//     'a pleasure',
//     'to',
//     'burn',
//   ];
//   const text = [];
//   let x = 7;
//   while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
//   return text.join(' ');
// };

function Chat() {
  const messageEl = useRef<any>(null);
  const [messages, setMessages] = useState<any>([
    '123213',
    '321321312',
    '31232131',
    '32132131',
    '1232131',
    '2131232',
    '2131232',
    '2131232',
    '2131232',
    '2131232',
  ]);

  useEffect(() => {
    if (messageEl as any) {
      messageEl?.current?.addEventListener('DOMNodeInserted', (event: any) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    const generateDummyMessage = () => {
      setInterval(() => {
        setMessages((prevMsg: any) => [...prevMsg, 'fakfka']);
      }, 2000);
    };
    generateDummyMessage();
  }, []);

  return (
    <div className="Chat">
      <h3>
        Auto scroll to bottom in react chat app -{' '}
        <a href="https://www.cluemediator.com" target="_blank">
          Clue Mediator
        </a>
      </h3>
      <div className="chat">
        <div className="head">ChatBot</div>
        <div className="messages" ref={messageEl}>
          {messages.map((m: any, i: any) => (
            <div key={i} className={`msg${i % 2 !== 0 ? ' dark' : ''}`}>
              {m}
            </div>
          ))}
        </div>
        <div className="footer">
          <input type="text" placeholder="Type here..." />
          <img src={'adsasdsa'} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
