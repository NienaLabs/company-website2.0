"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { messages, status, sendMessage } = useChat();
  const [localInput, setLocalInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isOpen) {
      // Use a small delay to ensure the DOM has updated with the last message chunk
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    sendMessage({ text: localInput });
    setLocalInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      style={{
        position: "fixed",
        bottom: "100px",
        right: "32px",
        width: "380px",
        height: "600px",
        maxHeight: "calc(100vh - 120px)",
        backgroundColor: "var(--surface)", // Abyss equivalent
        border: "1px solid rgba(255,176,32,0.15)", // Border gold faint
        borderRadius: "4px",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 12px 40px rgba(12,13,16, 0.8)",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,176,32,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "var(--surface-2)" // Void equivalent
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,176,32,0.6)", textTransform: "uppercase", marginBottom: "4px" }}>
            Niena Labs Concierge
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "20px", color: "var(--text-primary)" }}>
            How can we build together?
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          &times;
        </button>
      </div>

      {/* Chat History */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontSize: "15px", fontStyle: "italic", marginTop: "auto", marginBottom: "auto" }}>
            Ask about our services, philosophy, or process...
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: message.role === "user" ? "rgba(255,176,32,0.08)" : "transparent",
              border: message.role === "user" ? "1px solid rgba(255,176,32,0.2)" : "none",
              borderLeft: message.role === "assistant" ? "2px solid #c9a84c" : "none",
              padding: message.role === "user" ? "12px 16px" : "4px 0 4px 16px",
              borderRadius: "3px",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: message.role === "user" ? "var(--text-primary)" : "rgba(232,223,200,0.8)",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {message.parts.map((part, i) => (
              part.type === "text" || part.type === "reasoning" ? (
                <span key={i}>{part.text}</span>
              ) : null
            ))}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: "flex-start", paddingLeft: "16px", borderLeft: "2px solid #c9a84c", fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-secondary)", fontStyle: "italic" }}>
            Drafting response...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,176,32,0.1)", backgroundColor: "var(--surface-2)" }}>
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              background: "rgba(12,13,16, 0.5)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "10px 14px",
              borderRadius: "3px",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(255,176,32,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.05)")}
          />
          <button
            type="submit"
            disabled={!localInput.trim() || isLoading}
            style={{
              background: "var(--amber)",
              color: "var(--surface-2)",
              border: "none",
              borderRadius: "3px",
              padding: "0 16px",
              fontFamily: "var(--font-display)",
              fontSize: "11px", fontWeight: 600,
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: localInput.trim() && !isLoading ? "pointer" : "default",
              opacity: localInput.trim() && !isLoading ? 1 : 0.5,
              transition: "opacity 0.2s ease"
            }}
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
