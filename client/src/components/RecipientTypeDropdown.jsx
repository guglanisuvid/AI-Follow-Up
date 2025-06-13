import { RECIPIENT_TYPE } from "../constants/formOptions";

const RecipientTypeDropdown = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="recipient-type">Select Recipient Type</label>
      <select
        name="recipient-type"
        id="recipient-type"
        defaultValue=""
        className="w-full py-2 px-4 border-1 rounded-lg outline-none"
      >
        {RECIPIENT_TYPE.map((type) => (
          <option
            key={type}
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

export default RecipientTypeDropdown;
