import React, { useState } from 'react'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'
import '../styles/header.css'
import '../styles/mediaQuerys/mediaHeader.css'

const slide_uno = require('../images/slider_uno-001.jpg')
const slide_dos = require('../images/slider_dos-001.jpg')
const slide_tres = require('../images/slider_tres-001.jpg')

const items = [ 
  {src: slide_uno, caption:"Primera hamburguesa vegana simil carne"}, 
  {src: slide_dos, caption:"Helados veganos sabor chocolate y dulce de leche" }, 
  {src: slide_tres, caption:"Alfajores de maicena con dulce de leche de almendras" } 
]

const Carrousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="carrusel" style={{backgroundImage: `url(${item.src})`}} alt={item.altText} ></div>
        <CarouselCaption className="tituloC"  />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Carrousel;