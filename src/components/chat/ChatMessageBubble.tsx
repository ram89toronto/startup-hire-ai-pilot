
import React from "react";
import { User, Bot, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { useTypewriter } from "@/hooks/useTypewriter";

interface ChatMessageBubbleProps {
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  animate?: boolean;
  isStreaming?: boolean;
  onStreamComplete?: () => void;
}

export function ChatMessageBubble({
  type,
  content,
  timestamp,
  animate = true,
  isStreaming = false,
  onStreamComplete = () => {},
}: ChatMessageBubbleProps) {
  const displayedContent =
    type === "assistant" && isStreaming
      ? useTypewriter(content, 20, onStreamComplete)
      : content;
  const showCursor =
    type === "assistant" &&
    isStreaming &&
    displayedContent.length < content.length;

  const alignment =
    type === "user"
      ? "justify-end text-right"
      : "justify-start text-left";
  const bubbleStyle =
    type === "user"
      ? "bg-slate-100 text-slate-900 rounded-br-xl rounded-t-xl rounded-bl-md"
      : "bg-purple-600 text-white rounded-bl-xl rounded-t-xl rounded-br-md";
  const messageContainer =
    type === "user" ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className={clsx(
        "flex items-end gap-2 w-full group",
        messageContainer,
        alignment,
        animate && "animate-fade-in"
      )}
      aria-live="polite"
    >
      {/* Avatar */}
      <Avatar className="w-8 h-8 shadow">
        {type === "user" ? (
          <AvatarFallback>
            <User className="w-4 h-4 text-slate-400" aria-label="You" />
          </AvatarFallback>
        ) : (
          <AvatarFallback>
            <Bot className="w-4 h-4 text-purple-500" aria-label="Assistant" />
          </AvatarFallback>
        )}
      </Avatar>
      {/* Message bubble */}
      <div className="flex flex-col max-w-xs sm:max-w-md md:max-w-lg">
        <div
          className={clsx(
            "px-4 py-2 text-sm shadow transition-colors relative focus:outline-none focus:ring-2",
            bubbleStyle
          )}
          tabIndex={0}
          aria-label={
            type === "user" ? "Your message" : "Assistant message"
          }
        >
          {/* Three-dot menu (hidden for system) */}
          {type !== "system" && (
            <button
              className={clsx(
                "absolute",
                type === "user" ? "left-1 top-2" : "right-1 top-2",
                "opacity-70 hover:opacity-100 transition-opacity p-1 rounded focus-visible:ring-2 bg-white/30"
              )}
              aria-label="More options"
              tabIndex={0}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
          <span className="break-words whitespace-pre-wrap leading-relaxed block">
            {displayedContent}
            {showCursor && (
              <span className="inline-block w-0.5 h-4 bg-white/70 animate-pulse ml-1 translate-y-0.5" />
            )}
          </span>
        </div>
        <span className="text-xs text-slate-400 mt-1 ml-2 mr-2" aria-label="Timestamp">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
