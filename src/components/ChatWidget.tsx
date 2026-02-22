"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const WEBHOOK_URL = "https://n8n.resto.guruweb.com.ar/webhook/c25fc354-2a4e-4831-abdd-85113e39c772/chat";
const SESSION_KEY = "pava_chat_session";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedId = localStorage.getItem(SESSION_KEY);
    if (!storedId) {
      storedId = Math.random().toString(36).substring(7);
      localStorage.setItem(SESSION_KEY, storedId);
    }
    setSessionId(storedId);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: userMessage.text,
          sessionId: sessionId,
          sender: "user",
        }),
      });

      console.log("n8n Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("n8n Error Body:", errorText);
        throw new Error(`Falla en el webhook: ${response.status}`);
      }

      const data = await response.json();
      console.log("n8n Data:", data);

      // Handle common n8n response shapes
      const responseText =
        (Array.isArray(data) ? data[0]?.output : data.output) ||
        data.message ||
        data.response ||
        "Lo siento, no pude procesar tu mensaje.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Ups! Hubo un problema al conectar con el asistente. Por favor, intentá de nuevo más tarde.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#3d2b1f] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Bot size={24} />
                </div>
                <div>
                  <p className="font-semibold">Pone La Pava Bot</p>
                  <p className="text-xs text-white/70">En línea para ayudarte</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              {messages.length === 0 ? (
                <div className="mt-20 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-800">
                    <MessageCircle size={32} />
                  </div>
                  <p className="font-medium text-gray-800">¡Hola! 🧉</p>
                  <p className="px-8 text-sm text-gray-500">
                    ¿En qué puedo ayudarte hoy? Consultanos por stock, envíos o lo que necesites.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                          ? "bg-[#3d2b1f] text-white rounded-tr-none"
                          : "bg-white text-gray-800 shadow-sm ring-1 ring-black/5 rounded-tl-none"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></span>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></span>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t bg-white p-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribí tu mensaje..."
                  className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#3d2b1f]/20 border-none"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3d2b1f] text-white transition-transform active:scale-95 disabled:opacity-50"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3d2b1f] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
