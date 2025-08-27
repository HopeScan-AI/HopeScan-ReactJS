import React from "react";
import { useTranslation } from "react-i18next";

const InfoSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className=" relative bg-gray-100">
        <div className="container mx-auto  py-8 px-8 md:py-16 md:px-14">
          <h1 className="text-black text-[42px] font-bold text-center mb-4">
            {t("landingPage.infoSection.whyChoose")}
          </h1>
          <p className="text-[#4A4C43] font-medium text-[20px] text-justify">
            {t("landingPage.infoSection.whyChoosePara")}
          </p>
        </div>
      </div>
      <div
        className=" relative"
        style={{
          background:
            " linear-gradient(319.57deg, #DE6DAF 8.93%, #D73C90 87.89%)",
        }}
      >
        <div className="container mx-auto py-8 px-8 md:py-16 md:px-14 ">
          <h1 className="text-white text-[42px] font-bold text-center mb-4">
            {t("landingPage.infoSection.highlights")}
          </h1>
          <ul className="text-white font-medium text-[20px] text-justify list-disc">
            <li>{t("landingPage.infoSection.h1")}</li>
            <li>{t("landingPage.infoSection.h2")}</li>
            <li>{t("landingPage.infoSection.h3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
