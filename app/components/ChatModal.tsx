"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { X, Send, Bot } from "lucide-react";
import "./ChatModal.css";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Renders assistant text, turning markdown links [label](url) and bare URLs
// into clickable anchors so the concierge can lead visitors straight to a page.
function renderRichText(text: string): React.ReactNode[] {
  const pattern =
    /\[([^\]]+)\]\(([^)\s]+)\)|((?:https?:\/\/|mailto:|tel:)[^\s)]+)/g;
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
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
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
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  // Prevent body scroll when chat modal is open on mobile
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    sendMessage({ text: localInput });
    setLocalInput("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="chat-modal-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="chat-modal-card" data-lenis-prevent>
        <div className="chat-modal-inner">
          {/* Header */}
          <div className="chat-modal-header">
            <div>
              <span className="chat-modal-brand-tag">
                <span className="chat-modal-status-dot" />
                Niena Labs Concierge
              </span>
              <h2 className="chat-modal-heading">
                Deploy intelligence with us
              </h2>
            </div>
            <button
              onClick={onClose}
              className="chat-modal-close-btn"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div className="chat-modal-messages">
            {messages.length === 0 && (
              <div className="chat-empty-state">
                <div className="chat-empty-icon">
                  <Bot size={22} />
                </div>
                <p className="chat-empty-text">
                  Ask about Compound-V, computer vision pipelines, edge compute,
                  or custom deployments for your space.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-bubble ${
                  message.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-assistant"
                }`}
              >
                {message.parts.map((part, i) =>
                  part.type === "text" || part.type === "reasoning" ? (
                    <span key={i}>
                      {message.role === "assistant"
                        ? renderRichText(part.text)
                        : part.text}
                    </span>
                  ) : null
                )}
              </div>
            ))}

            {isLoading && (
              <div className="chat-typing-indicator">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span>Drafting response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-modal-footer">
            <form onSubmit={onSubmit} className="chat-modal-form">
              <input
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Type your message..."
                className="chat-modal-input"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!localInput.trim() || isLoading}
                className="chat-modal-send-btn"
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
