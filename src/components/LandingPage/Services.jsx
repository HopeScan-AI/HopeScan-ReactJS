import React from 'react'
import Service1 from "../../assets/images/AI-Mammography.svg";
import Service2 from "../../assets/images/Clear-Actionable.svg";
import Service3 from "../../assets/images/Multi-User-Management.svg";
import Service4 from "../../assets/images/Full-Data-Security.svg";
import Service01 from "../../assets/images/For-Individuals.svg";
import Service02 from "../../assets/images/For-Healthcare.svg";
import Service03 from "../../assets/images/For-Medical.svg";
import { useTranslation } from "react-i18next";

function Services() {
  const { t } = useTranslation();

  return (
    <div className='bg-[#F7F7F7]  px-2 sm:px-6 lg:px-28 py-16 w-full'>
        {/* <div className='grid grid-cols-2 justify-center items-start gap-12'>
           <h3 className='col-span-2 md:col-span-1 text-[36px] text-black font-bold leading-10'>{t('landingPage.services.title')}</h3> 
           <p className='col-span-2 md:col-span-1 text-[18px] text-black opacity-[28%] font-medium w-[80%]'>{t('landingPage.services.description')}</p>
        </div> */}
        <h3 className='col-span-2 md:col-span-1 text-[36px] text-black font-bold leading-10 center-text'>{t('landingPage.services.title')}</h3> 
        <div className='grid grid-cols-3 mt-16'>
            <div className='service-card col-span-3 sm:col-span-2 lg:col-span-1 p-8 border sm:border-r-0  border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0  lg:border-b-[1px] '>
                <img src={Service01} className="service0-img" alt="" />
                <span className='text-[24px] font-bold center-text service0-title'>{t('landingPage.services0.service1')}</span>
                {/* <Service1/> */}
            </div>
            <div className='service-card col-span-3 sm:col-span-2 lg:col-span-1 p-8 border sm:border-r-0  border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0  lg:border-b-[1px] '>
                <img src={Service02} className="service0-img" alt="" />
                <span className='text-[24px] font-bold center-text service0-title'>{t('landingPage.services0.service2')}</span>
                {/* <Service1/> */}
            </div>
            <div className='service-card col-span-3 sm:col-span-2 lg:col-span-1 p-8 border sm:border-r-0  border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0  lg:border-b-[1px] '>
                <img src={Service03} className="service0-img" alt="" />
                <span className='text-[24px] font-bold center-text service0-title'>{t('landingPage.services0.service3')}</span>
                {/* <Service1/> */}
            </div>
        </div>
        <div className='grid grid-cols-4 mt-16'>
            <div className='service-card col-span-4 sm:col-span-2 lg:col-span-1 p-8 border sm:border-r-0  border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0  lg:border-b-[1px] '>
                <img src={Service1} className="service-img" alt="" />
                <span className='text-[24px] font-bold center-text service-title'>{t('landingPage.services.service1')}</span>
                {/* <Service1/> */}
            </div>
            <div className='service-card col-span-4 sm:col-span-2 lg:col-span-1 p-8 border lg:border-r-0 border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0  lg:border-b-[1px]  '>
                <img src={Service2} className="service-img" alt="" />
                <span className='text-[20px] font-bold center-text service-title'>{t('landingPage.services.service2')}</span>
                {/* <Service2/> */}
            </div>
            <div className='service-card col-span-4 sm:col-span-2 lg:col-span-1 p-8 border sm:border-r-0 border-opacity-[37%] flex flex-col justify-between gap-12 border-b-0 sm:border-b-[1px] '>
                <img src={Service3} className="service-img" alt="" />
                <span className='text-[20px] font-bold center-text service-title'>{t('landingPage.services.service3')}</span>
                {/* <Service3/> */}
            </div>
            <div className='service-card col-span-4 sm:col-span-2 lg:col-span-1 p-8 border border-opacity-[37%] flex flex-col justify-between gap-12 ='>
                <img src={Service4} className="service-img" alt="" />
                <span className='text-[20px] font-bold center-text service-title'>{t('landingPage.services.service4')}</span>
                {/* <Service4/> */}
            </div>
        </div>
    </div>
  )
}

export default Services
