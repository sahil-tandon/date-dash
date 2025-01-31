"use client";

import React from 'react';
import { CloudLayers } from 'react-clouds';

export const CloudBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <CloudLayers
        height="100vh"
        backgroundColor="#ff758f"
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
              initialX:0.1,
            },
          },
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
          {
            size: 120,
            color: '#fff0f3',
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
        }}
      />
    </div>
  );
};