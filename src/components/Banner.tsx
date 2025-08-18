'use client';

import React, { useEffect, useState, CSSProperties } from 'react';
import './Banner.css';

const images = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${images[index]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-image 1s ease-in-out',
  };

  return (
    <div className="banner-container">
      <div className="banner-slide" style={backgroundStyle}>
        {/* Overlay with semi-transparent white + blur */}
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1>Learn English with Confidence</h1>
          <p>Step-by-step lessons tailored just for you</p>
        </div>
      </div>
    </div>
  );
}
