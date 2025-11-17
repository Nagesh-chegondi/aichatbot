"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#EEF2FF] to-white flex flex-col items-center">
      
      {/* TOP NAV */}
      <header className="w-full py-4 border-b bg-white/60 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-2 font-medium text-gray-700">
          <span className="text-2xl">🧠</span>
          <span>Gemini-Inspired AI</span>
          <span className="ml-auto text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            Model: Custom
          </span>
        </div>
      </header>

      {/* CHAT CONTAINER */}
      <div className="w-full max-w-4xl flex-1 overflow-y-auto px-4 py-6 space-y-6">

        {messages.map((msg, i) => (
          <div key={i} className="w-full">
            {/* USER */}
            {msg.role === "user" ? (
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md max-w-[80%]">
                  {msg.text}
                </div>
              </div>
            ) : (
              // BOT
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  G
                </div>
                <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl shadow-sm max-w-[85%] leading-relaxed text-gray-800">
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={scrollRef} />
      </div>

      {/* INPUT BAR */}
      <div className="w-full max-w-4xl px-4 py-4 bg-white border-t sticky bottom-0 backdrop-blur-md">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message AI..."
            className="flex-1 border border-gray-300 px-4 py-3 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium px-6 py-3 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
