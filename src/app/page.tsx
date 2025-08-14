"use client";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);

  const generateEmail = async () => {
    const res = await fetch("/api/generate", { method: "POST" });
    const data = await res.json();
    setEmail(data.address);
    setToken(data.token);
  };

  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?token=${token}`);
    const data = await res.json();
    setMessages(data["hydra:member"]);
  };

  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">TempMailr</h1>
      {!email ? (
        <button
          onClick={generateEmail}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Temp Email
        </button>
      ) : (
        <>
          <p className="text-lg">Your Email: <strong>{email}</strong></p>
          <button
            onClick={fetchMessages}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Refresh Inbox
          </button>

          <ul className="mt-5 w-full max-w-md">
            {messages.map((msg: any) => (
              <li key={msg.id} className="border p-3 rounded mb-2">
                <strong>{msg.from.address}</strong>
                <p>{msg.subject}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
