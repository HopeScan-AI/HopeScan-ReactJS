import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import header_mask from "../../assets/images/header_mask.png";
import header_image from "../../assets/images/header_image.png";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Qutes from "../../assets/icons/Qutes";

import NextArrow from "../../assets/icons/NextArrow";
import PrevArrow from "../../assets/icons/PrevArrow";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Header = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const offset = 0;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  }, [hash]);

  const slides = [
    {
      heroTitle: t("landingPage.header.slide1.heroTitle"),
      title: t("landingPage.header.slide1.title"),
      subtitle: t("landingPage.header.slide1.subtitle"),
      img: slide1,
    },
    {
      heroTitle: t("landingPage.header.slide2.heroTitle"),
      title: t("landingPage.header.slide2.title"),
      subtitle: t("landingPage.header.slide2.subtitle"),
      img: slide2,
    },
    {
      heroTitle: t("landingPage.header.slide3.heroTitle"),
      title: t("landingPage.header.slide3.title"),
      subtitle: t("landingPage.header.slide3.subtitle"),
      img: slide3,
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      const swiper = document.querySelector(".swiper")?.swiper;
      if (!swiper) return;

      // Link the navigation buttons to Swiper
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;

      // Initialize and update Swiper navigation
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      pagination={{
        el: ".custom-header-slider",
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} ticket-bullet cursor-pointer"></span>`;
        },
      }}
      slidesPerView={1}
      onSwiper={(swiper) => {}}
      onSlideChange={() => {}}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      loop={true}
      speed={500}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      className=""
    >
      {slides.map((slide, index) => (
        <SwiperSlide className="transition flex flex-col  h-[800px] " key={index}>
          <div className=" bg-[#F7F7F7]  py-10 pb-24 md:pb-10  px-2 sm:px-6 lg:px-28">
            <div className="grid grid-cols-2 container ">
              <div className="col-span-2 xl:col-span-1 mb-16 xl:mb-0 ">
                <h4 className="text-black font-bold text-[28px]  py-4 fontbold leading-tight">
                  {slide.heroTitle}
                </h4>
                <h4 className="text-black text-[24px]  py-4 fontbold leading-tight">
                  {slide.title}
                </h4>
                <p className="text-gray-700 text-[20px]  py-4 font-normal font- leading-tight">
                  {slide.subtitle}
                </p>
                {/* <Link
                  to={"/pricing"}
                  className="action-botton flex items-center gap-1 w-fit mb-4 !bg-[#DE6DAF] text-white px-3 py-2 rounded-[5px]"
                >
                  <span> {t("landingPage.header.actionButton")} </span>
                  <span className="bounce-botton">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8137 2.00001C16.8137 1.17159 16.1421 0.500012 15.3137 0.500012H1.81371C0.985281 0.500012 0.313709 1.17159 0.313709 2.00001C0.313709 2.82844 0.985281 3.50001 1.81371 3.50001H13.8137V15.5C13.8137 16.3284 14.4853 17 15.3137 17C16.1421 17 16.8137 16.3284 16.8137 15.5V2.00001ZM5.06066 14.3744L16.3744 3.06067L14.253 0.939352L2.93934 12.2531L5.06066 14.3744Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </Link> */}
              </div>
            </div>
          </div>

          <div
            style={{ backgroundImage: `url(${header_mask})` }}
            className="bg-cover bg-center  min-h-[500px] w-full  relative"
          >
            <img src={slide.img} className="header-img" alt="" />
          </div>
        </SwiperSlide>
      ))}

      <div className="custom-header-slider flex justify-start gap-2 px-2 sm:px-6 lg:px-28 left-auto !top-[450px] "></div>

      {/*
      <div
        ref={prevRef}
        className="absolute left-1/2 bottom-[0px] transform -translate-x-[120%] z-10 cursor-pointer"
      >
        <PrevArrow />
      </div>
      <div
        ref={nextRef}
        className="absolute right-1/2 bottom-[0px] transform -translate-x-[-120%] z-10 cursor-pointer"
      >
        <NextArrow />
      </div>
      */}
    </Swiper>
  );
};

export default Header;
