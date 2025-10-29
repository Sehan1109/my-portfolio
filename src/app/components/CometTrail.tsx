'use client';

import React, { useState, useEffect, useRef } from 'react';

// Define the shape of a single particle object
interface Particle {
  id: number;
  x: number;
  y: number;
}

const CometTrail: React.FC = () => {
  // Tell useState it will hold an array of Particle objects
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Tell useRef it will hold a number
  const lastMoveTime = useRef<number>(0);
  const throttleInterval = 25; 

  // Type the event 'e' as a native MouseEvent
  const addParticle = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTime.current < throttleInterval) {
      return;
    }
    lastMoveTime.current = now;

    const newParticle: Particle = {
      id: now,
      x: e.clientX,
      y: e.clientY,
    };

    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 750); 
  };

  useEffect(() => {
    window.addEventListener('mousemove', addParticle);
    return () => {
      window.removeEventListener('mousemove', addParticle);
    };
  }, []); // Empty dependency array is correct

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="comet-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default CometTrail;