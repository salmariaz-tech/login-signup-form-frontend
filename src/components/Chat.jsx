import { useState } from "react";

export default function Chat({ name, group, messages, onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl h-[80vh] flex flex-col">
      {/* Chat Header */}
      <div className="bg-purple-600 text-white text-xl font-semibold p-4 rounded-t-xl flex justify-between">
        <span>{group} Group</span>
        <span className="italic">Hi, {name} 👋</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet 😅</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === name
                  ? "bg-purple-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="block text-sm font-semibold">
                {msg.sender}
              </span>
              <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-4 flex items-center gap-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
