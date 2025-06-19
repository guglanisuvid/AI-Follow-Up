import { useEffect, useRef, useState } from "react";
import MessageCard from "../components/MessageCard";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

const LabelledMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const processedRef = useRef(false);

  useEffect(() => {
    const getLabelledMessages = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      const url = `${
        import.meta.env.VITE_API_URL
      }/api/gmail/get/labelled-messages`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get labelled messages");
      }

      const data = await res.json();

      setMessages(data.messages);
      setIsLoading(false);
    };

    getLabelledMessages();

    // handling the request and filling the messages usestate correctly.
  }, []);

  if (isloading)
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="text-lg font-semibold py-2 border-b-2">
        Your Labelled Messages
      </div>
      <div className="flex justify-center items-start gap-8 flex-wrap py-8 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`relative flex flex-col gap-4 bg-bg-200 rounded-xl shadow-lg cursor-pointer`}
          >
            <MessageCard message={message} />
            <div className="flex justify-between items-center text-sm py-2 mx-4 border-t-2">
              <span className=" opacity-60">Follow-Up scheduled.</span>
              <button className="opacity-80 cursor-pointer hover:underline underline-offset-4 hover:text-primary-200">
                See Details
              </button>
            </div>
            <div className="absolute top-2 right-2 text-2xl">
              <BiErrorCircle className="text-primary-200" />
              <BiCheckCircle className="text-primary-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelledMessages;
