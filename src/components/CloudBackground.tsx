"use client";

import React from 'react';
import { CloudLayers } from 'react-clouds';
import { Heart } from './Heart';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">

      <div className="absolute inset-0 z-30 pointer-events-none">
        <Heart 
          className="animate-float-up-slow"
          style={{ left: '15dvw', bottom: '0', animationDelay: '3s' }}
        />
        <Heart 
          className="animate-float-up-fastest"
          style={{ left: '75dvw', bottom: '0', animationDelay: '7s' }}
        />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <Heart 
          className="animate-float-up-fast"
          style={{ left: '30dvw', bottom: '0', animationDelay: '14s' }}
        />
        <Heart 
          className="animate-float-up-slowest"
          style={{ left: '60dvw', bottom: '0', animationDelay: '5s' }}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Heart 
          className="animate-float-up-faster"
          style={{ left: '45dvw', bottom: '0', animationDelay: '4s' }}
        />
        <Heart 
          className="animate-float-up-slower"
          style={{ left: '90dvw', bottom: '0', animationDelay: '12s' }}
        />
      </div>

      <CloudLayers
        height="100vh"
        backgroundColor="transparent"
        shadowOpacity={0.15}
        layers={[
          {
            size: 90,
            color: '#ffb3c1',
            bottomOffset: 120,
            randomization: {
              xMin: 0.4,
              xMax: 0.8,
              yMin: 0.2,
              yMax: 0.6,
              initialX: 0.1,
            },
          },
        ]}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 15,
        }}
      />

      <CloudLayers
        height="100vh"
        backgroundColor="transparent"
        shadowOpacity={0.15}
        layers={[
          {
            size: 100,
            color: '#ffccd5',
            bottomOffset: 70,
            randomization: {
              xMin: 0.4,
              xMax: 0.8,
              yMin: 0.2,
              yMax: 0.6,
              initialX: 0.8,
            },
          },
        ]}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 25,
        }}
      />

      <CloudLayers
        height="100vh"
        backgroundColor="transparent"
        shadowOpacity={0.15}
        layers={[
          {
            size: 120,
            color: '#ffffff',
            bottomOffset: 10,
            randomization: {
              xMin: 0.4,
              xMax: 0.8,
              yMin: 0.2,
              yMax: 0.6,
              initialX: 0.2,
            },
          }
        ]}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 35,
        }}
      />
    </div>
  );
};

export default CloudBackground;