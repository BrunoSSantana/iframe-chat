
import React, { useState } from 'react';
import { ChatWidget } from './ChatWidget';
import { Minimize2 } from 'lucide-react';
import { Button } from './ui/button';

export const ChatFrame = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {!isMinimized ? (
        <div className="w-[380px] h-[600px] bg-white rounded-lg shadow-2xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
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
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg"
          onClick={() => setIsMinimized(false)}
        >
          Abrir Chat
        </Button>
      )}
    </div>
  );
};
