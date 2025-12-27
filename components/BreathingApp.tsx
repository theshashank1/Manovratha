
import React, { useEffect, useRef, useState } from 'react';

const BreathingApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [phaseText, setPhaseText] = useState('START');
  
  // Fix: explicitly type refs as mutable or nullable
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const minRadius = 50;
  const maxRadius = 120;
  const duration = 4000;

  const draw = (ctx: CanvasRenderingContext2D, currentRadius: number, color: string) => {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Outer glow
    const gradient = ctx.createRadialGradient(centerX, centerY, currentRadius * 0.5, centerX, centerY, currentRadius * 1.5);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Solid circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, currentRadius * 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const animate = (timestamp: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (!isBreathing) {
      draw(ctx, minRadius, 'rgba(56, 178, 172, 0.3)');
      return;
    }

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    let phase: 'inhale' | 'hold_in' | 'exhale' | 'hold_out' = 'inhale';
    const totalCycle = duration * 4;
    const cycleProgress = elapsed % totalCycle;

    if (cycleProgress < duration) {
      phase = 'inhale';
      setPhaseText('INHALE');
    } else if (cycleProgress < duration * 2) {
      phase = 'hold_in';
      setPhaseText('HOLD');
    } else if (cycleProgress < duration * 3) {
      phase = 'exhale';
      setPhaseText('EXHALE');
    } else {
      phase = 'hold_out';
      setPhaseText('HOLD');
    }

    const phaseProgress = (cycleProgress % duration) / duration;
    let currentR = minRadius;
    let color = 'rgba(56, 178, 172, 0.5)';

    if (phase === 'inhale') {
      currentR = minRadius + (maxRadius - minRadius) * (1 - Math.pow(1 - phaseProgress, 3));
      color = 'rgba(56, 178, 172, 0.8)';
    } else if (phase === 'hold_in') {
      currentR = maxRadius;
      color = 'rgba(56, 178, 172, 0.8)';
    } else if (phase === 'exhale') {
      currentR = maxRadius - (maxRadius - minRadius) * (1 - Math.pow(1 - phaseProgress, 3));
      color = 'rgba(66, 153, 225, 0.6)';
    } else {
      currentR = minRadius;
      color = 'rgba(66, 153, 225, 0.6)';
    }

    draw(ctx, currentR, color);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isBreathing]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72 flex items-center justify-center">
        <canvas ref={canvasRef} width="300" height="300" className="block"></canvas>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl tracking-widest pointer-events-none text-white drop-shadow-md">
          {phaseText}
        </div>
      </div>
      <button 
        onClick={() => {
          setIsBreathing(!isBreathing);
          if (!isBreathing) {
            startTimeRef.current = performance.now();
          } else {
            setPhaseText('START');
          }
        }}
        className="mt-8 bg-teal-600 hover:bg-teal-500 text-white px-8 py-2 rounded-full transition shadow-lg shadow-teal-900/50"
      >
        {isBreathing ? 'Stop Exercise' : 'Start Exercise'}
      </button>
    </div>
  );
};

export default BreathingApp;
