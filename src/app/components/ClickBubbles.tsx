'use client';

import React, { useState, useEffect } from 'react';

// Define the shape of a single bubble object
interface Bubble {
  id: number;
  x: number;
  y: number;
  // We add random properties for our CSS
  size: number;
  duration: number;
  translateX: number;
  translateY: number;
}

// Helper function to get a random number in a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Config ---
const BUBBLE_COUNT = 6; // How many bubbles to spawn on click

const ClickBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const addBubble = (e: MouseEvent) => {
    const newBubbles: Bubble[] = [];

    // Create a batch of new bubbles
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const newBubble: Bubble = {
        id: Math.random(), // Use random id for a unique key
        x: e.clientX,
        y: e.clientY,
        size: random(10, 30),        // Random size (10px to 30px)
        duration: random(0.75, 1.5), // Random duration (0.75s to 1.5s)
        translateX: random(-40, 40), // Random horizontal drift (-40px to 40px)
        translateY: random(-80, -20), // Random upward drift (-80px to -20px)
      };
      newBubbles.push(newBubble);
    }
    
    // Update state once with all new bubbles
    setBubbles(prev => [...prev, ...newBubbles]);

    // Set a timer to remove each bubble after its animation
    newBubbles.forEach(bubble => {
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== bubble.id));
      }, bubble.duration * 1000); // duration is in seconds
    });
  };

  useEffect(() => {
    window.addEventListener('click', addBubble);
    return () => {
      window.removeEventListener('click', addBubble);
    };
  }, []); 

  return (
    <>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            // Apply all our random properties as inline styles
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            // Pass random values to CSS as custom properties
            '--translateX': `${bubble.translateX}px`,
            '--translateY': `${bubble.translateY}px`,
          }}
        />
      ))}
    </>
  );
};

export default ClickBubbles;