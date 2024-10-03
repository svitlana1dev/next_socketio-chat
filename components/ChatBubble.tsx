import React, { useState } from "react";
import DeleteIcon from "./DeleteIcon";

interface Props {
  message: {
    id: string;
    user: string;
    text: string;
  };
  isAuthor: boolean;
  onDelete: (id: string) => void;
}

const ChatBubble: React.FC<Props> = ({ message, isAuthor, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);

  const toggleDeleteIcon = () => {
    setShowDelete((currentState) => !currentState);
  };

  const handleOnClickDelete = () => {
    onDelete(message.id);
  };

  return (
    <div className={`flex flex-col ${isAuthor ? "items-end" : "items-start"}`}>
      <div
        className={`flex ${
          isAuthor ? "items-baseline" : "items-center flex-row-reverse"
        } gap-2`}
        onMouseEnter={toggleDeleteIcon}
        onMouseLeave={toggleDeleteIcon}
      >
        {showDelete && (
          <p
            className="text-white cursor-pointer"
            onClick={handleOnClickDelete}
          >
            <DeleteIcon />
          </p>
        )}
        <div>
          {!isAuthor && <span className="text-white">{message.user}:</span>}
          <div
            className={`bg-white py-4 px-6 mb-4 rounded chat-bubble ${
              isAuthor ? "chat-bubble--right" : "chat-bubble--left"
            }`}
          >
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
