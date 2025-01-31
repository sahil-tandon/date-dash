'use client';

import React from 'react';

type HeartProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Heart = ({ className = '', style = {} }: HeartProps) => {
  return (
    <div className={`absolute ${className}`} style={style}>
      <div className="relative">
        {/* Left side */}
        <div className="absolute animate-heartbeat" style={{ transformOrigin: 'right' }}>
          <div 
            className="absolute w-5 h-5 bg-red-500 rounded-full" 
            style={{ 
              left: '-20.7px',
              borderRadius: '50% 50% 0 50%',
              transformOrigin: 'right'
            }}
          />
          <div 
            className="absolute h-0 w-0"
            style={{
              left: '-15px',
              top: '19px',
              borderBottom: '10px solid transparent',
              borderRight: '15px solid rgb(239, 68, 68)'
            }}
          />
        </div>
        
        {/* Right side */}
        <div className="animate-heartbeat" style={{ transformOrigin: 'left' }}>
          <div 
            className="absolute w-5 h-5 bg-red-700 rounded-full" 
            style={{ 
              left: '-0.26px',
              borderRadius: '50% 50% 50% 0',
              transformOrigin: 'left'
            }}
          />
          <div 
            className="absolute h-0 w-0"
            style={{
              top: '19px',
              left: '-0.26px',
              borderBottom: '10px solid transparent',
              borderLeft: '15px solid rgb(185, 28, 28)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const FloatingHearts = () => {
  return (
    <div className="absolute z-10 inset-0 pointer-events-none">
      {/* First heart */}
      <Heart 
        className="animate-float-up-medium"
        style={{ 
          left: '15dvw', 
          bottom: '0',
          animationDelay: '3.5s'
        }}
      />
      
      {/* Second heart */}
      <Heart 
        className="animate-float-up-slow"
        style={{ 
          left: '30dvw', 
          bottom: '0',
          animationDelay: '4.5s'
        }}
      />

      {/* Second heart */}
      <Heart 
        className="animate-float-up-slow"
        style={{ 
          left: '45dvw', 
          bottom: '0',
          animationDelay: '2s'
        }}
      />

      <Heart 
        className="animate-float-up-medium"
        style={{ 
          left: '60dvw', 
          bottom: '0',
          animationDelay: '6s'
        }}
      />

      <Heart 
        className="animate-float-up-medium"
        style={{ 
          left: '75dvw', 
          bottom: '0',
          animationDelay: '9s'
        }}
      />

      <Heart 
        className="animate-float-up-slow"
        style={{ 
          left: '90dvw', 
          bottom: '0',
          animationDelay: '4s'
        }}
      />
    </div>
  );
};

export default FloatingHearts;