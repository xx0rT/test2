import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  animationDuration: number;
  fontSize: number;
  opacity: number;
  delay: number;
  emoji: string;
}

const leafEmojis = ['🍂', '🍁'];

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const newLeaves: Leaf[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 5 + 8,
        fontSize: Math.random() * 16 + 18,
        opacity: Math.random() * 0.3 + 0.6,
        delay: Math.random() * 4,
        emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
      }));
      setLeaves(newLeaves);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-leaf-fall"
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.delay}s`,
            fontSize: `${leaf.fontSize}px`,
            opacity: leaf.opacity,
            top: '-50px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          }}>
          {leaf.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes leafFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(20px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(20px);
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(0);
          }
        }
        .animate-leaf-fall {
          animation: leafFall ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
