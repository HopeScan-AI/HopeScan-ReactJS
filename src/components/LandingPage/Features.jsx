import React, { useEffect } from "react";
import Feature1 from "../../assets/icons/Feature1";
import Feature2 from "../../assets/icons/Feature2";
import Feature3 from "../../assets/icons/Feature3";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Feature = ({ title, descriptio, icon }) => {
  const { hash } = useLocation();
  const offset = 60; 
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  }, [hash]);
  
  return (
    <div className="md:col-span-1 col-span-3 flex flex-col items-start justify-between px-4 py-4 md:py-0">
      <h3 className="text-white text-[24px] font-semibold leading-7">
        {title}
      </h3>
      <p className="text-white opacity-70 text-[14px] my-3">{descriptio} </p>
      <div className="bg-[rgba(255,255,255,0.13)] p-2 rounded-[6px]">
        {icon}
      </div>
    </div>
  );
};
const Features = () => {
  const { t } = useTranslation();

  return (
    <div
      className="border-t-[1px] border-[rgba(255, 255, 255, 0.24)]"
      style={{
        background:
          " linear-gradient(90.66deg, #163E60 1.75%, #3173AD 47.09%, #2A5D8A 99.43%)",
        // background: "linear-gradient(90deg, #DE6DAF 0%, #D73C96 100%)",
        // background: "#2830CE",
      }}
    >
      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-3 gap-x-9">
          <Feature
            title={t('landingPage.features.firstFeatureTitle')}
            descriptio={
              t('landingPage.features.firstFeatureDesc')
            }
            icon={<Feature1 />}
          />
          <div className="hidden md:block  absolute transform -translate-y-1/2 -translate-x-1/2 top-[50%]  left-1/3 w-px bg-white opacity-15 h-[70%]"></div>

          <div className="block md:hidden col-span-3 h-[1px] bg-white opacity-15 w-full mx-4"></div>
          <Feature
            title={t('landingPage.features.secondFeatureTitle')}
            descriptio={
              t('landingPage.features.secondFeatureTitle')
            }
            icon={<Feature2 />}
          />
          <div className="hidden md:block absolute transform -translate-y-1/2 -translate-x-1/2 top-[50%]  left-2/3 w-px bg-white opacity-15 h-[70%]"></div>
          <div className="block md:hidden col-span-3 h-[1px] bg-white opacity-15 w-full mx-4"></div>

          <Feature
            title={t('landingPage.features.thirdFeatureTitle')}
            descriptio={
              t('landingPage.features.thirdFeatureTitle')
            }
            icon={<Feature3 />}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
