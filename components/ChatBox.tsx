import React, { useEffect, useRef, useState } from "react";
import socket from "../lib/socket";
import ChatBubble from "./ChatBubble";

interface Props {
  username: string;
}

type Message = {
  id: string;
  user: string;
  text: string;
};

const ChatBox: React.FC<Props> = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newId, setNewId] = useState(1);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const container = messagesRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = { id: newId + username, user: username, text: message };
      setNewId((currentId) => currentId + 1);
      socket.emit("message", msg);
      setMessage("");
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleOnDelete = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  return (
    <div>
      <div
        ref={messagesRef}
        className="max-h-[75vh] overflow-auto custom-scroll"
      >
        {messages.map((msg, index) => {
          const isAuthor = username === msg.user;

          return (
            <ChatBubble
              key={index + msg.user}
              message={msg}
              isAuthor={isAuthor}
              onDelete={handleOnDelete}
            />
          );
        })}
      </div>
      <form onSubmit={handleOnSubmit} className="flex mt-6">
        <input
          type="text"
          value={message}
          onChange={handleOnChange}
          placeholder="Type a message..."
          className="w-full p-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={sendMessage}
          className="bg-mainColor text-white uppercase p-2 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
