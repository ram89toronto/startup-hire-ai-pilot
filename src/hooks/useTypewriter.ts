
import { useState, useEffect } from 'react';

export const useTypewriter = (
  text: string,
  speed: number = 50,
  onComplete: () => void = () => {}
) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!text) return;
    setDisplayText(''); 
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        onComplete();
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, onComplete]);

  return displayText;
};
