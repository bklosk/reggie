"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { Send, Square, Search, ExternalLink, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { UIMessage } from "ai";

const SUGGESTIONS = [
  "What are the latest SEC enforcement actions?",
  "GDPR compliance updates for SaaS companies",
  "Recent EPA regulations on emissions",
  "SOX audit requirements for public companies",
];

function SourcePill({ url, title }: { url: string; title?: string }) {
  let displayName: string;
  try {
    displayName = title || new URL(url).hostname.replace("www.", "");
  } catch {
    displayName = title || url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
    >
      <ExternalLink size={11} />
      <span className="max-w-[180px] truncate">{displayName}</span>
    </a>
  );
}

function MessageContent({ text }: { text: string }) {
  return (
    <div className="prose prose-sm prose-gray max-w-none prose-headings:font-serif prose-headings:font-medium prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-teal-700 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-teal-900 prose-pre:rounded-xl prose-pre:bg-gray-100 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  const textParts = message.parts.filter((p) => p.type === "text");
  const sourceParts = message.parts.filter((p) => p.type === "source-url") as Array<{
    type: "source-url";
    url: string;
    title?: string;
  }>;
  const isSearching = message.parts.some(
    (p) =>
      p.type.startsWith("tool-") &&
      "state" in p &&
      p.state !== "output-available" &&
      p.state !== "done" &&
      p.state !== "output-error"
  );

  const text = textParts.map((p) => p.text).join("");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] ${
          isUser
            ? "rounded-2xl rounded-br-md bg-[#111827] px-5 py-3 text-white"
            : "w-full"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{text}</p>
        ) : (
          <div className="space-y-3">
            {isSearching && !text && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 size={14} className="animate-spin" />
                <span>Searching regulatory sources...</span>
              </div>
            )}
            {text && <MessageContent text={text} />}
            {sourceParts.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sourceParts.map((source, i) => (
                  <SourcePill key={i} url={source.url} title={source.title} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchView() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, stop } = useChat();

  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || isStreaming) return;
    setInput("");
    sendMessage({ text: value });
  }

  const hasMessages = messages.length > 0;

  return (
    <motion.div
      key="search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      {!hasMessages ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-32">
          <div className="w-full max-w-2xl text-center">
            <div className="mb-2 inline-flex items-center justify-center rounded-full bg-[#111827] p-3">
              <Search className="text-white" size={24} />
            </div>
            <h1 className="mb-3 font-serif text-4xl font-medium">
              Search Regulations
            </h1>
            <p className="mb-10 text-gray-500 text-lg">
              Ask anything about regulatory compliance. Answers are grounded in
              real-time web sources.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSubmit(suggestion)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4">
          <div className="mx-auto max-w-3xl space-y-6 py-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl pb-2 pt-3">
        <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg transition-shadow focus-within:shadow-xl">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask about regulations, compliance, enforcement..."
            rows={1}
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          {isStreaming ? (
            <button
              onClick={stop}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-gray-600 transition hover:bg-gray-300"
            >
              <Square size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-white transition hover:bg-[#1f2937] disabled:opacity-30 disabled:hover:bg-[#111827]"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
