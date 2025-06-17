const MessageCard = ({ message, selectedMessages }) => {
  return (
    <div
      className={`max-w-sm bg-bg-200 flex flex-col gap-4 py-2 px-4 rounded-xl shadow-2xl hover:scale-105 transition duration-400 cursor-pointer ${
        selectedMessages.includes(message.id) ? "bg-primary-100" : ""
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold truncate">
          {message.headers[3].value}
        </div>
        <div className="text-sm opacity-80 truncate">
          {message.headers[5].value}
        </div>
      </div>
      <div className="line-clamp-3">{message.snippet}</div>
    </div>
  );
};

export default MessageCard;
