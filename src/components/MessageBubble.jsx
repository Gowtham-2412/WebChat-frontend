const MessageBubble = ({ message, currentUser }) => {
  const senderId = message.sender ?? message.user ?? message.sender_id;
  const displayName =
    message.sender_username || message.username || String(senderId);
  const isSender =
    senderId === currentUser || displayName === currentUser;

  // const initials = displayName ? displayName.charAt(0).toUpperCase() : "?";

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
    <div className={`mb-4 flex ${isSender ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[80%] rounded-3xl px-4 py-3 shadow-lg ring-1 ${
          isSender
            ? "rounded-br-md bg-sky-400 text-slate-950 ring-sky-300/20"
            : "rounded-bl-md bg-slate-900/85 text-slate-100 ring-white/8"
        }`}
      >
        {!isSender && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {displayName}
          </div>
        )}
        <div className="whitespace-pre-wrap wrap-break-word leading-7">
          {message.message || message.content}
        </div>
        {timeText && (
          <div className={`mt-2 text-xs ${isSender ? "text-slate-700" : "text-slate-500"}`}>
            {timeText}
          </div>
        )}
      </div>

    </div>
  );
};

export default MessageBubble;
