import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
  useNavigationType
} from "react-router-dom";
import { Button } from "flowbite-react";
const Pricing = () => {
  const images = [];
  const { t } = useTranslation();

  const navigationType = useNavigationType(); // Detects push, replace, or pop navigation

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0); // Only reset if a full navigation happens
    }
  }, [navigationType]);

  return (
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>
        <div className="mb-8 relative z-5 w-full">
          <div className=" px-2 lg:px-28 mb-12 w-full">
            <div className="mt-12 mb-x8 relative z-5 flex justify-between items-center flex-wrap ">
              <div>
                <h2 className="text-[32px] text-white font-semibold">
                  {t("pricing.title")}
                </h2>
                <p className="text-[24px] text-white  font-medium">
                {t("pricing.subTitle")}
                </p>
              </div>
              <div className="m-2 flex gap-4 "></div>
            </div>
          </div>

          <div className="px-2 xl:px-28  grid grid-cols-1 md:grid-cols-3 flex-wrap justify-center gap-6  mb-24">
            <div className="w-full object-cover bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
              <div className="w-full h-[440px] p-6 rounded-md border-none flex flex-col justify-between">
                <div>
                  <h3 className="text-black text-[24px] font-bold text-center mb-6">
                    {t("pricing.t1")}
                  </h3>
                  <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col gap-2 text-center">
                    <p> {t("pricing.t1_1")}</p>
                    <p> {t("pricing.t1_2")}</p>
                    <p> {t("pricing.t1_3")}</p>
                  </div>
                </div>
                <div className="w-full text-center">
                  <Button className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full">
                    {t("pricing.subscribe")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full object-cover bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
              <div className="w-full h-[440px] p-6 rounded-md border-none flex flex-col justify-between">
                <div>
                  <h3 className="text-black text-[24px] font-bold text-center mb-6">
                    {t("pricing.t2")}
                  </h3>
                  <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col gap-2 text-center ">
                    <p> {t("pricing.t2_1")}</p>
                    <p> {t("pricing.t2_2")}</p>
                    <p> {t("pricing.t2_3")}</p>
                  </div>
                </div>
                <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col gap-2 text-center">
                  <p>{t("pricing.t2_note")}</p>
                </div>
                <div className="w-full text-center">
                  <Button className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full">
                    {t("pricing.subscribe")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full object-cover bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
              <div className="w-full h-[440px] p-6 rounded-md border-none flex flex-col justify-between">
                <div>
                  <h3 className="text-black text-[24px] font-bold text-center mb-6">
                    {t("pricing.t3")}
                  </h3>
                  <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col gap-2  text-center ">
                    <p> {t("pricing.t3_1")}</p>
                    <p> {t("pricing.t3_2")}</p>
                    <p> {t("pricing.t3_3")}</p>
                  </div>
                </div>
                <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col gap-2 text-center">
                  <p>{t("pricing.t3_note")}</p>
                </div>
                <div className="w-full text-center">
                  <Button className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full">
                    {t("pricing.subscribe")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
