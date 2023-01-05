import React, { useState } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import Testimonial from '../Testimonial';
export default function TestimonialSlider() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const testimonialData = [
    {
      testimonialThumb:'/images/testimonial_1.jpeg',
      testimonialText:'I wish I would have thought of it first. Creative agency is the most tech valuable business resource we have ever purchased. Dude your stuff  is the bomb! eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt to the explicabo.',
      avatarName:'Ahon Monsery',
      avatarDesignation:'CEO AT TECH',
      ratings:'4'
    },
    {
      testimonialThumb:'/images/testimonial_2.jpeg',
      testimonialText:'I wish I would have thought of it first. Creative agency is the most tech valuable business resource we have ever purchased. Dude your stuff  is the bomb! eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt to the explicabo.',
      avatarName:'Ahon Monsery',
      avatarDesignation:'CEO AT TECH',
      ratings:'5'
    },
    {
      testimonialThumb:'/images/testimonial_3.jpeg',
      testimonialText:'I wish I would have thought of it first. Creative agency is the most tech valuable business resource we have ever purchased. Dude your stuff  is the bomb! eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt to the explicabo.',
      avatarName:'Ahon Monsery',
      avatarDesignation:'CEO AT TECH',
      ratings:'4.5'
    },
    {
      testimonialThumb:'/images/testimonial_1.jpeg',
      testimonialText:'I wish I would have thought of it first. Creative agency is the most tech valuable business resource we have ever purchased. Dude your stuff  is the bomb! eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt to the explicabo.',
      avatarName:'Ahon Monsery',
      avatarDesignation:'CEO AT TECH',
      ratings:'3.5'
    }
  ]
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );
  return (
    <>
      <div className='cs-gradient_bg_1 cs-shape_wrap_3 cs-parallax'>
        <div className="cs-height_130 cs-height_lg_80"></div>
        <div className="cs-shape_3 cs-to_up"><img src="/images/shape_1.svg" alt="Shape" /></div>
        <div className="container">
          <div className="cs-testimonial_slider">
            <div className="cs-testimonial_slider_left">
              <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                centerMode={true}
                centerPadding='0px' 
                arrows={false}
              >
                {testimonialData.map((item,index)=>(
                  <div className='slider-nav_item' key={index}>
                    <div className="cs-rotate_img">
                      <div className="cs-rotate_img_in">
                        <img src={item.testimonialThumb} alt="Thumb" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="cs-testimonial_slider_right">
              <Slider 
                asNavFor={nav2} 
                ref={(slider1) => setNav1(slider1)} 
                prevArrow={<SlickArrowLeft />}
                nextArrow={<SlickArrowRight />}
                className='cs-arrow_style1'
              >
                {testimonialData.map((item,index)=>(
                  <div key={index}>
                    <Testimonial 
                      testimonialText={item.testimonialText}
                      avatarName={item.avatarName} 
                      avatarDesignation={item.avatarDesignation} 
                      ratings={item.ratings}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="cs-height_130 cs-height_lg_80"></div>
      </div>
    </>
  );
}
