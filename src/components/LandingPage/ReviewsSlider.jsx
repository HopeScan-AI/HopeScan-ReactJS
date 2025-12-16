import React, { useRef, useEffect } from "react";

import Qutes from "../../assets/icons/Qutes";

import NextArrow from "../../assets/icons/NextArrow";
import PrevArrow from "../../assets/icons/PrevArrow";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import { useTranslation } from "react-i18next";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "@headlessui/react";

const ReviewsSlider = () => {
  const { t } = useTranslation();
  
  const reviews = [
    {
      starts: 5,
      message:
        "HopeScan, as a decision-support tool, helps us triage mammograms quickly and identify cases that need urgent review. It doesn’t replace the radiologist’s role, but it definitely streamlines the workflow and strengthens diagnostic confidence.",
      author: "Dr. Nora",
      profession: "Radiology Specialist, Gaza",
      image: "",
    },
    {
      starts: 5,
      message:
        "If applied in our clinics, I expect HopeScan will improve referrals and reduce unnecessary follow-ups. What matters most to me is that its outputs are clear, reviewable, and support medical reasoning — which this system provides.",
      author: "Dr. Hossam",
      profession: "Women’s Health Physician, Ramallah",
      image: "",
    },
    {
      starts: 5,
      message:
        "The system helps us know which images need to be read first, so we can organize our workday better. I also appreciate that it focuses heavily on privacy — that’s essential for the women we serve.",
      author: "Rana",
      profession: "Mammogram Technician, Khan Younis",
      image: "",
    },
    {
      starts: 5,
      message:
        "I felt that this technology brings reassurance and speed without compromising privacy. If clinics use HopeScan with proper explanation, it makes the follow-up decision much easier for us as women.",
      author: "Sara",
      profession: "Participant in Awareness Campaign, Deir al-Balah",
      image: "",
    },
    {
      starts: 5,
      message:
        "For successful adoption, we’re interested in clear options for hosting, backup, and maintenance, along with compliance standards. With those in place and a solid support system, I truly believe the tool can be sustainable.",
      author: "Layan",
      profession: "Doctor",
      image: "",
    },
    {
      starts: 5,
      message:
        "These reviews can be posted on the compan’s website, a third party review platform social media. They typically include the customers",
      author: "Sally Ahmed",
      profession: "Doctor",
      image: "",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    className: "center",
    centerPadding: "60px",
    swipeToSlide: true,

    centerMode: false,
    pauseOnHover: true,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      const swiper = document.querySelector(".swiper").swiper;

      // Link the navigation buttons to Swiper
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;

      // Initialize and update Swiper navigation
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="py-10 bg-[#FAFAFF]">
      <h3 className="text-black text-[42px] font-bold text-center py-8">
        {t('landingPage.reviews.title')}
      </h3>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={false}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={true}
        speed={500}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          10: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 4, spaceBetween: 20 },
        }}

        className="p-4 pb-20"
      >

        {reviews.map((item, index) => (
          <SwiperSlide key={index} className=" bg-white p-8 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition">
            <div>
              <svg
                width="85"
                height="20"
                viewBox="0 0 85 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.04894 2.92705C9.3483 2.00574 10.6517 2.00574 10.9511 2.92705L12.0206 6.21885C12.1545 6.63087 12.5385 6.90983 12.9717 6.90983H16.4329C17.4016 6.90983 17.8044 8.14945 17.0207 8.71885L14.2205 10.7533C13.87 11.0079 13.7234 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.388 16.2812L10.5878 14.2467C10.2373 13.9921 9.7627 13.9921 9.41221 14.2467L6.61204 16.2812C5.82833 16.8506 4.77385 16.0844 5.0732 15.1631L6.14277 11.8713C6.27665 11.4593 6.12999 11.0079 5.7795 10.7533L2.97933 8.71885C2.19562 8.14945 2.59839 6.90983 3.56712 6.90983H7.02832C7.46154 6.90983 7.8455 6.63087 7.97937 6.21885L9.04894 2.92705Z"
                  fill="#ED9D00"
                />
                <path
                  d="M25.0489 2.92705C25.3483 2.00574 26.6517 2.00574 26.9511 2.92705L28.0206 6.21885C28.1545 6.63087 28.5385 6.90983 28.9717 6.90983H32.4329C33.4016 6.90983 33.8044 8.14945 33.0207 8.71885L30.2205 10.7533C29.87 11.0079 29.7234 11.4593 29.8572 11.8713L30.9268 15.1631C31.2261 16.0844 30.1717 16.8506 29.388 16.2812L26.5878 14.2467C26.2373 13.9921 25.7627 13.9921 25.4122 14.2467L22.612 16.2812C21.8283 16.8506 20.7739 16.0844 21.0732 15.1631L22.1428 11.8713C22.2766 11.4593 22.13 11.0079 21.7795 10.7533L18.9793 8.71885C18.1956 8.14945 18.5984 6.90983 19.5671 6.90983H23.0283C23.4615 6.90983 23.8455 6.63087 23.9794 6.21885L25.0489 2.92705Z"
                  fill="#ED9D00"
                />
                <path
                  d="M42.0489 2.92705C42.3483 2.00574 43.6517 2.00574 43.9511 2.92705L45.0206 6.21885C45.1545 6.63087 45.5385 6.90983 45.9717 6.90983H49.4329C50.4016 6.90983 50.8044 8.14945 50.0207 8.71885L47.2205 10.7533C46.87 11.0079 46.7234 11.4593 46.8572 11.8713L47.9268 15.1631C48.2261 16.0844 47.1717 16.8506 46.388 16.2812L43.5878 14.2467C43.2373 13.9921 42.7627 13.9921 42.4122 14.2467L39.612 16.2812C38.8283 16.8506 37.7739 16.0844 38.0732 15.1631L39.1428 11.8713C39.2766 11.4593 39.13 11.0079 38.7795 10.7533L35.9793 8.71885C35.1956 8.14945 35.5984 6.90983 36.5671 6.90983H40.0283C40.4615 6.90983 40.8455 6.63087 40.9794 6.21885L42.0489 2.92705Z"
                  fill="#ED9D00"
                />
                <path
                  d="M58.0489 2.92705C58.3483 2.00574 59.6517 2.00574 59.9511 2.92705L61.0206 6.21885C61.1545 6.63087 61.5385 6.90983 61.9717 6.90983H65.4329C66.4016 6.90983 66.8044 8.14945 66.0207 8.71885L63.2205 10.7533C62.87 11.0079 62.7234 11.4593 62.8572 11.8713L63.9268 15.1631C64.2261 16.0844 63.1717 16.8506 62.388 16.2812L59.5878 14.2467C59.2373 13.9921 58.7627 13.9921 58.4122 14.2467L55.612 16.2812C54.8283 16.8506 53.7739 16.0844 54.0732 15.1631L55.1428 11.8713C55.2766 11.4593 55.13 11.0079 54.7795 10.7533L51.9793 8.71885C51.1956 8.14945 51.5984 6.90983 52.5671 6.90983H56.0283C56.4615 6.90983 56.8455 6.63087 56.9794 6.21885L58.0489 2.92705Z"
                  fill="#ED9D00"
                />
                <path
                  d="M74.0489 2.92705C74.3483 2.00574 75.6517 2.00574 75.9511 2.92705L77.0206 6.21885C77.1545 6.63087 77.5385 6.90983 77.9717 6.90983H81.4329C82.4016 6.90983 82.8044 8.14945 82.0207 8.71885L79.2205 10.7533C78.87 11.0079 78.7234 11.4593 78.8572 11.8713L79.9268 15.1631C80.2261 16.0844 79.1717 16.8506 78.388 16.2812L75.5878 14.2467C75.2373 13.9921 74.7627 13.9921 74.4122 14.2467L71.612 16.2812C70.8283 16.8506 69.7739 16.0844 70.0732 15.1631L71.1428 11.8713C71.2766 11.4593 71.13 11.0079 70.7795 10.7533L67.9793 8.71885C67.1956 8.14945 67.5984 6.90983 68.5671 6.90983H72.0283C72.4615 6.90983 72.8455 6.63087 72.9794 6.21885L74.0489 2.92705Z"
                  fill="#ED9D00"
                />
              </svg>

              <p className="mt-4 text-[16px] text-[#000] font-semibold italic">
                {item.message}
              </p>

              <div className="flex justify-between mt-6">
                <div className="flex gap-4 ">
                  {/* <img
                    src=""
                    alt=""
                    className="w-[45px] h-[45px] bg-[#E8E8E8] rounded-full cover"
                  /> */}
                  <div className="w-[0.2px] bg-[#D73C96]"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] text-[#000] font-semibold">
                      {item.author}
                    </span>
                    <span className="text-[14px] text-[#9D9D9D] font-medium">
                      {item.profession}
                    </span>
                  </div>
                </div>
                <div>
                  <Qutes />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
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
      </Swiper>
    </div>
  );
};

export default ReviewsSlider;
