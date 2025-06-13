import LastContact from "../components/LastContact";
import MessageArea from "../components/MessageArea";
import RecipientTypeDropdown from "../components/RecipientTypeDropdown";
import ToneDropdown from "../components/ToneDropdown";

const Message = () => {
  return (
    <form action="" className="w-full h-full">
      <div className="h-full w-full flex gap-8 p-8">
        <div className="h-full w-full flex-3/4">
          <MessageArea />
        </div>
        <div className="w-full flex-1/4 flex flex-col gap-16">
          <div className="w-full flex flex-col gap-8">
            <RecipientTypeDropdown />
            <ToneDropdown />
            <LastContact />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border-1 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 border-none outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Message;
