import { cn } from "@/lib/utils";
import { MessageSquare, Minimize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ChatWidget } from './ChatWidget';
import { Button } from './ui/button';

export const ChatFrame = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(true);
  const [shouldRenderChat, setShouldRenderChat] = useState(!isMinimized);
  const chatRef = useRef<HTMLDivElement>(null);

  // Gerenciar o ciclo de vida da animação de abertura
  const handleExpand = () => {
    setIsOpeningAnimation(true);
    setShouldRenderChat(true);
    setIsAnimating(true);
    setIsMinimized(false);
  };

  // Gerenciar o ciclo de vida da animação de fechamento
  const handleMinimize = () => {
    setIsOpeningAnimation(false);
    setIsAnimating(true);
  };

  // Lidar com o final das animações
  const handleAnimationEnd = () => {
    if (!isOpeningAnimation) {
      setIsMinimized(true);
      // Atrasa a remoção da renderização do chat para evitar o glitch visual
      setTimeout(() => {
        setShouldRenderChat(false);
      }, 50);
    }
    setIsAnimating(false);
  };

  // Configurar posicionamento para animações
  useEffect(() => {
    if (isAnimating && chatRef.current) {
      chatRef.current.style.position = 'fixed';
      chatRef.current.style.bottom = '4rem';
      chatRef.current.style.right = '4rem';
    }
  }, [isAnimating]);

  return (
    <div className="fixed bottom-4 right-4">
      {shouldRenderChat ? (
        <div
          ref={chatRef}
          className={cn(
            "bg-white rounded-lg shadow-2xl overflow-hidden",
            isAnimating 
              ? isOpeningAnimation 
                ? "animate-slide-in" 
                : "animate-slide-out"
              : "w-[380px] h-[600px]"
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800 animate-fade-in">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMinimize}
              className="hover:bg-gray-100 transition-transform hover:scale-110"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(600px-65px)]">
            <ChatWidget />
          </div>
        </div>
      ) : null}
      
      {isMinimized && (
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:scale-110 transition-transform"
          onClick={handleExpand}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
