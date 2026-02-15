import React from "react";

const MessageBubble = ({ message, currentUser }) => {
  const isSender =
    message.sender === currentUser;

  return (
    <div
      className={`flex mb-2 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-3 py-2 rounded max-w-xs wrap-break-word ${
          isSender
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        <div>
          {message.message || message.content}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
