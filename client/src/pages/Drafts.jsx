import { useEffect, useRef, useState } from "react";
import DraftMessageCard from "../components/DraftMessageCard";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

const DraftMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const processedRef = useRef(false);

  useEffect(() => {
    const getDrafts = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      const url = `${
        import.meta.env.VITE_API_URL
      }/api/gmail/get/draft-messages`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });

      if (!res.ok) {
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      setMessages(data.messages);
      setIsLoading(false);
    };

    getDrafts();
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
        Your Draft Messages
      </div>
      <div className="flex justify-center items-start gap-8 flex-wrap py-8 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`relative flex flex-col gap-4 bg-bg-200 rounded-xl shadow-lg`}
          >
            <DraftMessageCard message={message} />
            <div>
              <div className="flex justify-between items-center text-sm py-2 mx-4 border-t-2">
                <span className=" opacity-60">Draft created</span>
                <button className="opacity-80">
                  {new Date(Number(message.date)).toLocaleString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftMessages;
