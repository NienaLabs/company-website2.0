"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/Card";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Renders assistant text, turning markdown links [label](url) and bare URLs
// into clickable anchors so the concierge can lead visitors straight to a page.
function renderRichText(text: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|((?:https?:\/\/|mailto:|tel:)[^\s)]+)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1] ?? match[3];
    const url = match[2] ?? match[3];
    const isExternal = /^(https?:|mailto:|tel:)/.test(url);

    nodes.push(
      <a
        key={`lnk-${key++}`}
        href={url}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{ color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: "2px", fontWeight: 600 }}
      >
        {label}
      </a>
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
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
    <Card
      variant="glass"
      data-lenis-prevent
      style={{
        position: "fixed",
        bottom: "100px",
        right: "32px",
        width: "380px",
        height: "600px",
        maxHeight: "calc(100vh - 120px)",
        zIndex: 9998,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
        {/* Header */}
        <div
          style={{
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--amber)", textTransform: "uppercase", marginBottom: "4px" }}>
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
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 0", display: "flex", flexDirection: "column", gap: "24px" }}>
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
              background: message.role === "user" ? "var(--surface-3)" : "transparent",
              border: message.role === "user" ? "1px solid var(--border)" : "none",
              borderLeft: message.role === "assistant" ? "2px solid var(--amber)" : "none",
              padding: message.role === "user" ? "12px 16px" : "4px 0 4px 16px",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: message.role === "user" ? "var(--text-primary)" : "var(--text-secondary)",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {message.parts.map((part, i) => (
              part.type === "text" || part.type === "reasoning" ? (
                <span key={i}>{message.role === "assistant" ? renderRichText(part.text) : part.text}</span>
              ) : null
            ))}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: "flex-start", paddingLeft: "16px", borderLeft: "2px solid var(--amber)", fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-secondary)", fontStyle: "italic" }}>
            Drafting response...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--amber)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            type="submit"
            disabled={!localInput.trim() || isLoading}
            style={{
              background: "var(--amber)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              padding: "0 16px",
              fontFamily: "var(--font-display)",
              fontSize: "11px",
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
    </Card>
  );
}
