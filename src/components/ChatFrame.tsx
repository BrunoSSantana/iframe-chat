
import React from 'react';
import { ChatWidget } from './ChatWidget';

export const ChatFrame = () => {
  return (
    <div className="fixed bottom-4 right-4 w-[380px] h-[600px] bg-white rounded-lg shadow-2xl">
      <ChatWidget />
    </div>
  );
};
