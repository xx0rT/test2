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

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const leafEmojis = ['🍂', '🍁'];

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 4 + 6,
      fontSize: Math.random() * 15 + 15,
      opacity: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
      emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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
          animation: leafFall linear infinite;
        }
      `}</style>
    </div>
  );
}
