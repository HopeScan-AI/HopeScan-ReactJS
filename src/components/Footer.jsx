import React from "react";
import Spark from "../assets/images/Spark-logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FBIcon from "../assets/icons/FBIcon";
import InstaIcon from "../assets/icons/InstaIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import LinkedInIcon from "../assets/icons/LinkedInIcon";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#1761A0]  py-14  px-2 sm:px-6 lg:px-28">
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <div className="col-span-6 sm:col-span-2">
            <h1 className="text-white text-[30px] font-semibold mb-3">
            {t("footer.title")}
            </h1>
            <h3 className="text-white text-[14px] font-semibold">
            {t("footer.sponsoredBy")}
            </h3>
            <img src={Spark} alt={t("footer.sponsorAlt")} />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-4 grid grid-cols-2  sm:mt-0 mt-6">
          <div className="md:col-span-1 col-span-2">
            <h1 className="text-white text-[15px] font-bold mb-4">
            {t("footer.quickLinks")}
            </h1>
            <div className="grid grid-cols-3 gap-1">
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]" to={"/"}>{t("footer.links.home")}</Link>
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]" to={"/about"}>{t("footer.links.about")}</Link>
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]"  to={"/FAQs"}>{t("footer.links.faqs")} </Link>
              {/* <Link className="text-white text-[13px] transition hover:text-[#D73C96]">{t("footer.links.individuals")}</Link>
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]">{t("footer.links.entities")}</Link>
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]">{t("footer.links.resources")}</Link> */}
              <Link className="text-white text-[13px] transition hover:text-[#D73C96]" to={"/contactus"}>{t("footer.links.contactUs")} </Link>
            </div>
          </div>

          <div className="md:col-span-1 col-span-2 grid grid-cols-2 md:mt-0 mt-6">
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-white text-[15px] font-bold mb-4">
              {t("footer.contactUs")} 
              </h1>
              <div className="flex flex-col gap-1">
                <span className="text-white text-[13px]">info@geocide.com</span>
                <span className="text-white text-[13px]">+970 597232229</span>
              </div>
            </div>
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-white text-[15px] font-bold mb-4">
              {t("footer.followUs")}
              </h1>
              <div className="flex  gap-6">
                <Link className="social-icon"><FBIcon/>  </Link>  
                <Link className="social-icon"><TwitterIcon /></Link>            
                <Link className="social-icon"><InstaIcon /></Link>            
                <Link className="social-icon"><LinkedInIcon /></Link>            
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6 opacity-25"/>

      <div className="flex justify-end">
        <p className="text-white text-[13px]">{t('footer.rights')} <span className="text-[15px]">©</span> 2024 HopeScan</p>
      </div>
    </div>
  );
};

export default Footer;
