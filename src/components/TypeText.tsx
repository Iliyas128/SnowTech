import { useTypeAnimation } from '@/hooks/useTypeAnimation';

interface TypeTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypeText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete 
}: TypeTextProps) => {
  const { displayedText } = useTypeAnimation({ 
    text, 
    speed, 
    delay,
    onComplete 
  });

  return (
    <span className={className}>
      {displayedText}
    </span>
  );
};

