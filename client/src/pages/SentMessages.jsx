import { useRef, useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const processedRef = useRef(false);

  const handleConfirmClick = async () => {
    try {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/api/gmail/add-label`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify({ messageIds: selectedMessages }),
      });

      if (!res.ok) {
        throw new Error("Failed to add label to messages.");
      }

      setMessages(
        messages.filter((message) => !selectedMessages.includes(message.id))
      );
      setSelectedMessages([]);
      setIsLoading(false);
    } catch (error) {
      throw new Error("Failed to confirm messages", error);
    }
  };

  useEffect(() => {
    const getSentMessages = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      const url = `${import.meta.env.VITE_API_URL}/api/gmail/get/sent-messages`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get sent messages");
      }

      const data = await res.json();

      setMessages(data.messages);
      setIsLoading(false);
    };

    getSentMessages();
  }, []);

  if (isloading)
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="flex gap-4 justify-between items-center py-2 border-b-2">
        <div className="text-lg font-semibold">
          Pick all the messages you want to follow up on.
        </div>
        {selectedMessages.length ? (
          <div className="flex gap-4 items-center">
            <span>{selectedMessages.length} selected</span>
            <button
              onClick={() => handleConfirmClick()}
              className="bg-primary-100 py-1 px-3 rounded-lg shadow-lg border-none outline-none cursor-pointer hover:scale-105 transition duration-200"
            >
              Confirm
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-start gap-8 flex-wrap py-8 overflow-auto">
        {messages.map((message) => (
          <div
            className={`bg-bg-200 rounded-xl shadow-lg hover:scale-105 transition duration-400 cursor-pointer ${
              selectedMessages.includes(message.id) ? "bg-primary-100" : ""
            }`}
            key={message.id}
            onClick={() =>
              setSelectedMessages((prev) =>
                prev.includes(message.id)
                  ? prev.filter((id) => id !== message.id)
                  : [...prev, message.id]
              )
            }
          >
            <MessageCard
              message={message}
              selectedMessages={selectedMessages}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentMessages;
