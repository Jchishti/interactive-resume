// File: src/AnimatedStripes.tsx
import React from 'react';

const AnimatedStripes: React.FC = () => {
  return (
    <div className="animated-stripes-container">
      {/* Cyan stripes */}
      <div className="stripe stripe-cyan stripe-1" />
      <div className="stripe stripe-cyan stripe-4" />
      
      {/* Magenta stripes */}
      <div className="stripe stripe-magenta stripe-2" />
      <div className="stripe stripe-magenta stripe-5" />
      
      {/* Yellow stripes */}
      <div className="stripe stripe-yellow stripe-3" />
      <div className="stripe stripe-yellow stripe-6" />
    </div>
  );
};

export default AnimatedStripes;
