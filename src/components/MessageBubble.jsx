import React from "react";

const MessageBubble = ({ message, currentUser }) => {
  const senderId = message.sender ?? message.user ?? message.sender_id;
  const displayName =
    message.sender_username || message.username || String(senderId);
  const isSender = senderId === currentUser;

  const initials = displayName ? displayName.charAt(0).toUpperCase() : "?";

  const timeText = (() => {
    const t = message.timestamp || message.created_at || message.createdAt;
    if (!t) return "";
    try {
      return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  })();

  return (
    <div className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}>
      {!isSender && (
        <div className="flex-none w-9 h-9 mr-2 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-semibold shadow-sm">
          {initials}
        </div>
      )}

      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] wrap-break-word shadow-sm ${
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 border rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.message || message.content}</div>
        {timeText && (
          <div className={`text-xs mt-1 ${isSender ? "text-blue-100" : "text-gray-400"}`}>
            {timeText}
          </div>
        )}
      </div>

      {isSender && (
        <div className="flex-none w-9 h-9 ml-2 rounded-full bg-blue-400 text-white flex items-center justify-center font-semibold shadow-sm">
          {initials}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
