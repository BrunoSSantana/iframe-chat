
import React, { useState, useRef, useEffect } from 'react';
import { ChatWidget } from './ChatWidget';
import { Minimize2, SendHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from "@/lib/utils";

export const ChatFrame = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    setIsAnimating(true);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Position the element at the button's position before animation starts
  useEffect(() => {
    if (isAnimating && chatRef.current) {
      chatRef.current.style.position = 'fixed';
      chatRef.current.style.bottom = '4rem';
      chatRef.current.style.right = '4rem';
    }
  }, [isAnimating]);

  return (
    <div className="fixed bottom-4 right-4">
      {!isMinimized ? (
        <div
          ref={chatRef}
          className={cn(
            "bg-white rounded-lg shadow-2xl overflow-hidden",
            isAnimating ? "animate-scale-in" : "w-[380px] h-[600px]"
          )}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMinimize}
              className="hover:bg-gray-100"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(600px-65px)]">
            <ChatWidget />
          </div>
        </div>
      ) : (
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:scale-110 transition-transform"
          onClick={handleExpand}
        >
          <SendHorizontal className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
