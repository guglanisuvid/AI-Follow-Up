import { useRef, useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const processedRef = useRef(false);

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
    };

    getSentMessages();
  }, []);

  return (
    <div>
      <div className="flex gap-4 justify-between items-center py-2 border-b-2">
        <div className="text-lg font-semibold">
          Pick all the messages you want to follow up on.
        </div>
        {selectedMessages.length ? (
          <div className="flex gap-4 items-center">
            <span>{selectedMessages.length} selected</span>
            <button className="bg-primary-100 py-1 px-3 border-2 rounded-lg">
              Confirm
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-start gap-8 flex-wrap py-8 overflow-auto">
        {messages.map((message) => (
          <div
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
