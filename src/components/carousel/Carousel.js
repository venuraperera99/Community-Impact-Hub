import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
      ,console.log(currentIndex)
      
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="prevButton">
        Prev
      </button>
      <div className="carouselItems" style={{'--currentIndex': currentIndex}}>
        {items.map((item, index) => (
          <div
            key={index}
            className={index === currentIndex ? 'slide active' : 'slide'}
          >
            <div className="card">
              <div className="cardContent">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="nextButton">
        Next
      </button>
    </div>
  );
};

export default Carousel;
