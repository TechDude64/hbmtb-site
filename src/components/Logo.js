import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../hbmtb.jpg';

const LogoImage = ({ className = '' }) => (
  <img 
    src={logoImage} 
    alt="HBMTB Logo" 
    className={`${className} object-contain`}
  />
);

export const Logo = ({ size = 'md', onClick, className = '' }) => {
  const navigate = useNavigate();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      navigate('/');
    }
  };

  return (
    <div 
      className={`${sizeClasses[size]} cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={handleClick}
      aria-label="HBMTB Logo - Return to Home"
    >
      <LogoImage className="w-full h-full" />
    </div>
  );
};

export default Logo;
