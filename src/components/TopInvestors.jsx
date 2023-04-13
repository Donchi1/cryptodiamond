import React from "react";
import * as Icons from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "../utils/testimonialData";
import formatCurrency from "../utils/converter";

const Next = ({ className, onClick, style, dont }) => {
  return (
    <div
      className={`${
        dont && "hidden"
      } absolute right-0 top-[20rem]  text-white text-lg  `}
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
  <div
    className={`${
      dont && "hidden"
    } absolute top-[20rem] right-14 text-white text-lg `}
  >
    <button
      onClick={onClick}
      className="border-[#f75616]  border px-3 py-2 rounded-sm hover:bg-transparent hover:border hover:border-[#f75616] transition-color ease-linear duration-500"
    >
      <Icons.FaChevronLeft />
    </button>
  </div>
);

function TopInvestors() {
  return (
    <section className="w-full lg:mt-28 mt-40  mb-20">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex flex-col justify-center items-center mb-20">
          <h3 className="primary-text font-ubuntu text-2xl">Investors</h3>
          <h6 className="text-white font-[500] capitalize text-4xl">
            Top Investors
          </h6>
          <p className="text-center mt-6 mb-10 text-white ">
            We have a great team including developers, designers, and Traders.
            The Team always working hard to give you the maximum profit.
          </p>
        </div>

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={4}
          infinite
          initialSlide={0}
          speed={1500}
          nextArrow={<Next />}
          prevArrow={<Prev />}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          className="mb-20 lg:mb-0 pb-28 lg:pb-0"
          responsive={[
            {
              breakpoint: 768,
              settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
              },
            },
          ]}
        >
          {data.map((each, index) => (
            <div
              className="bg-primary2 shadow-lg rounded-lg px-4 w-full lg:!w-[95%] "
              key={index}
            >
              <div className="mt-4">
                <img
                  className="w-[100px] h-[100px] rounded-full mx-auto"
                  src={each.img}
                  alt="Image Missing"
                />
              </div>

              <p className="text-center mt-4 text-white text-xl font-[500]">
                {each.name}{" "}
              </p>
              <hr className=" my-8 " />
              <p className="primary-text uppercase mb-10 text-center lg:text-left">
                Invest amount : {formatCurrency(each.amount)}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TopInvestors;
