import React from "react";

const LastContact = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="last-contact">Select Days Since Last Contact</label>
      <input
        type="number"
        name="last-contact"
        id="last-contact"
        min={0}
        max={60}
        placeholder="Maximum 60 days"
        className="w-full py-2 px-4 border-1 rounded-lg outline-none"
      />
    </div>
  );
};

export default LastContact;
