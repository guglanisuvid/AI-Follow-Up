import React from "react";

const DraftMessageCard = ({ message }) => {
  return (
    <div className={`max-w-sm w-full flex flex-col gap-4 py-2 px-4`}>
      <div>{message.snippet}</div>
    </div>
  );
};

export default DraftMessageCard;
