import React from "react";
import { TONE_OPTIONS } from "../constants/formOptions";

const ToneDropdown = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="tone-type">Select Message Tone</label>
      <select
        name="tone-type"
        id="tone-type"
        defaultValue=""
        className="w-full py-2 px-4 border-1 rounded-lg outline-none"
      >
        {TONE_OPTIONS.map((type, index) => (
          <option
            key={index}
            value={type}
            className="text-text-100 bg-bg-300 border-none outline-none"
          >
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToneDropdown;
