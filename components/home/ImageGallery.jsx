import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

import Image1 from '../../public/background.jpg';
import Image2 from '../../public/background.jpg';
import Image3 from '../../public/background.jpg';

import Image4 from '../../public/background.jpg';
import Image5 from '../../public/background.jpg';
import Image6 from '../../public/background.jpg';
import Image7 from '../../public/background.jpg';
import Image8 from '../../public/background.jpg';

export default function ImageGallery() {
  const images = [
    Image1,Image2,Image3,Image4,Image5,Image6,Image8,Image7
  ];

  return ( 
     <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Simien-Mountains-landscapes.jpeg')" }}
    >
      <div className="relative w-48 h-72 transform-style-preserve-3d animate-bg-gallery">
        {images.map((src, index) => (
          <span
            key={index}
            className="absolute inset-0 transform-origin-center transform-style-preserve-3d"
            style={{
              '--i': index + 1,
              transform: `rotateY(calc(var(--i) * 45deg)) translateZ(16rem)`
            }}
          >
            <Image
              src={src}
              alt={`Image ${index}`}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
