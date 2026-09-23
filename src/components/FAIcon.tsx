import React from 'react';

interface FAIconProps {
  name: string; // e.g., "fa-regular fa-car", "fa-solid fa-check", "fa-regular fa-shield-halved"
  className?: string;
  size?: number; // default 18px (within 16-22px range)
  color?: string;
}

export const FAIcon: React.FC<FAIconProps> = ({
  name,
  className = '',
  size = 18,
  color,
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        fontSize: `${size}px`,
        width: `${size + 4}px`,
        height: `${size + 4}px`,
        color: color || undefined,
      }}
      aria-hidden="true"
    >
      <i className={name}></i>
    </span>
  );
};
