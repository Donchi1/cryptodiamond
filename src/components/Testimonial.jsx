import React, { useRef } from "react";
import Slider from "react-slick";
import * as Icons from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "../utils/testimonialData";
import avater from "/avatar.png";
import { useEffect } from "react";
import { useState } from "react";

const Next = ({ className, onClick, style, dont }) => {
  return (
    <div
      className={`${
        dont && "hidden"
      } absolute -right-14 top-[10%]  text-white text-lg  `}
    >
      <button
        onClick={onClick}
        className="border-[#f75616] border px-3 py-2 rounded-sm hover:bg-transparent hover:border hover:border-[#f75616] transition-color ease-linear duration-500"
      >
        <Icons.FaChevronRight />
      </button>
    </div>
  );
};
const Prev = ({ className, onClick, style, dont }) => (
  <div className={`${dont && "hidden"} absolute -left-14 text-white text-lg `}>
    <button
      onClick={onClick}
      className="border-[#f75616]  border px-3 py-2 rounded-sm hover:bg-transparent hover:border hover:border-[#f75616] transition-color ease-linear duration-500"
    >
      <Icons.FaChevronLeft />
    </button>
  </div>
);

function Testimonial() {
  const slide1Ref = useRef();
  const slide2Ref = useRef();
  const [navs, setNavs] = useState({
    nav1: null,
    nav2: null,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setNavs({ ...navs, nav1: slide1Ref.current, nav2: slide2Ref.current });
  }, []);
  return (
    <section className="w-full ">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex flex-col justify-center text-center items-center mb-20">
          <h6 className="primary-text font-ubuntu text-2xl">Testimonial</h6>
          <h6 className="text-white font-[500] capitalize text-4xl">
            What Users Say About Us
          </h6>
          <p className="text-lg text-white">
            We are doing really good at this market and here are the words we
            loved to get from a few of our users.
          </p>
        </div>

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={1}
          infinite
          arrows={false}
          initialSlide={0}
          speed={2500}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          ref={slide1Ref}
          asNavFor={navs.nav2}
          easing="linear"
          className="lg:w-[60%] mx-auto w-[100%]  "
        >
          {data.map((each, index) => (
            <div
              className=" bg-primary2 p-6 relative lg:mb-20 mb-8"
              key={index}
            >
              <div className="absolute hidden lg:block -bottom-20 right-[50%] w-0 h-0 border-l-[50px] border-r-[50px] border-l-transparent border-r-transparent  border-t-[90px] border-[#202b5d]"></div>
              <div className="flex gap-8">
                <div className="rounded-full border-[4px] w-[100px] h-[100px] border-primary ">
                  <img src={avater} alt="..." className=" w-full" />
                </div>

                <div className="text-white flex-1">
                  <h6 className="h6 mb-5 primary-text font-bold text-2xl uppercase">
                    {" "}
                    {each.name}
                  </h6>

                  <p>{each.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={3}
          infinite
          nextArrow={<Next />}
          prevArrow={<Prev />}
          initialSlide={0}
          speed={2500}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          ref={slide2Ref}
          easing="linear"
          asNavFor={navs.nav1}
          afterChange={(i) => setCurrentSlide(i)}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,

                arrows: false,
              },
            },
          ]}
          className="lg:w-[60%] w-[100%] mx-auto my-14 lg:my-32  pb-24"
        >
          {data.map((each, index) => (
            <div className="testimonial-item" key={index}>
              <div
                className={`${
                  currentSlide + 1 === index &&
                  "rounded-full w-[90px] text-center h-[40px] border-[1px] border-dashed border-red-500 border flex items-center justify-center"
                }`}
              >
                <h6 className=" text-white font-bold font-xl">
                  {" "}
                  {each.country}
                </h6>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonial;
