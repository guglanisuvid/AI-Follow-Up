import React from "react";

const MessageArea = () => {
  return (
    <textarea
      name="message-area"
      id="message-area"
      placeholder="Paste your original message here..."
      className="h-full w-full bg-bg-300 p-4 rounded-2xl resize-none shadow-2xl border-none outline-none"
    />
  );
};

export default MessageArea;
