import React, { useState, useEffect } from 'react';
import './certificate.css';

const certificates = [
  {
    id: 1,
    image: './images/supervised.png',
    link:'https://www.coursera.org/account/accomplishments/verify/3VXZF58EYKMR',
  },
  {
    id: 2,
    image: './images/Excel.png',
    link:'https://www.coursera.org/account/accomplishments/verify/CVL3U8PS8XBE',
  },
  {
    id: 3,
    image: './images/datasciencemethodology.png',
    link:'https://www.coursera.org/account/accomplishments/verify/9FA7AQBB3CFZ',
  },
  {
    id: 4,
    image: './images/cpp.png',
    link:'https://www.codecademy.com/profiles/HassaneSkikri/certificates/b74a2390dfc4127fa5d43fe147425ad0',
  },
  {
    id: 5,
    image: './images/python.png',
    link:'https://www.codecademy.com/profiles/HassaneSkikri/certificates/6c152bd262967f8c941c9707ed636bda',
  },
  {
    id: 6,
    image: './images/sql.png',
    link:'https://www.codecademy.com/profiles/HassaneSkikri/certificates/042a4e5884e3eb6ea1f2a12be6abb851',
  },
  {
    id: 7,
    image: './images/professional.png',
    link:'https://www.codecademy.com/profiles/HassaneSkikri/certificates/8e9e59de3f924b33ad2371faf667129b',
  },
];



const Certificate = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  const getLeftImageIndex = () => {
    return currentIndex === 0
      ? certificates.length - 1
      : currentIndex - 1;
  };

  const getRightImageIndex = () => {
    return (currentIndex + 1) % certificates.length;
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>


    <h1 className='title'>Certificates</h1>
    <div className="certificate-slider">
      <button className="prev-btn" onClick={prevSlide}>
        &lt;
      </button>

      <div className="certificate-cards">
        <div
          className="certificate-card left-card"
          style={{ backgroundImage: `url(${certificates[getLeftImageIndex()].image})`, zIndex: 1 }}
        ></div>

        <div className="certificate-card main-card" style={{ zIndex: 2 }}>
          <a href={certificates[currentIndex].link}>
          <img
            src={certificates[currentIndex].image}
            alt={`Certificate ${currentIndex + 1}`}
            className="certificate-image"
          />
          </a>
        </div>

        <div
          className="certificate-card right-card"
          style={{ backgroundImage: `url(${certificates[getRightImageIndex()].image})`, zIndex: 1 }}
        ></div>
      </div>

      <button className="next-btn" onClick={nextSlide}>
        &gt;
      </button>
    </div>
    </div>
  );
};

export default Certificate;