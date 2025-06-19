const MessageCard = ({ message }) => {
  return (
    <div className={`max-w-sm w-full flex flex-col gap-4 py-2 px-4`}>
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold truncate">
          {message.headers[3].value}
        </div>
        <div className="text-sm opacity-80 truncate">
          {message.headers[5].value}
        </div>
        <div className="text-[12px] opacity-40 truncate">
          {message.headers[1].value}
        </div>
      </div>
      <div className="line-clamp-3">{message.snippet}</div>
    </div>
  );
};

export default MessageCard;
