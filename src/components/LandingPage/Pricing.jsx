import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigationType } from "react-router-dom";
import { Button } from "flowbite-react";
import { useAllPlans } from "../../query-hooks/admin-query-hooks";

const Pricing = () => {
  const images = [];
  const { t } = useTranslation();
  const { data: plans, isPending: isPendingPlacns } = useAllPlans();


  useEffect(() => {
    console.log(plans);
    plans?.map((item) => {
      console.log(item);
    });
  }, [plans]);
  const navigationType = useNavigationType(); // Detects push, replace, or pop navigation

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0); // Only reset if a full navigation happens
    }
  }, [navigationType]);

  return (
    <>
    { (plans && Array.isArray(plans) && plans.length > 0) &&
      <div className="relative  px-2 sm:px-6 lg:px-28 py-16 w-full">
        {/* <div className="pink-banner"></div> */}
        <div className="mb-12 flex justify-center items-center">
          <h2 className="text-[32px] text-black font-semibold text-center">
            {t("pricing.title")}
          </h2>
          {/* <p className="text-[24px] text-white  font-medium">
                {t("pricing.subTitle")}
                </p> */}
        </div>
        <div className="m-2 flex gap-4 "></div>
        {/* grid grid-cols-1 md:grid-cols-3 */}
        <div className="w-full  flex flex-row flex-wrap justify-center gap-6 ">
          {/* {Object.entries(groupedPlans || {}).map(([userType, plans]) => ( */}
          {plans?.map((item, index) => (
            <div
              key={index}
              className="subscription-card  w-[100%] md:w-[48.5%]  lg:w-[31.3%] object-cover p-2 rounded-[32px] border border-[#E2E7EB] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center"
            >
              <div className="w-full h-[440px] p-6 rounded-md border-none flex flex-col justify-between">
                <div
                  dangerouslySetInnerHTML={{ __html: item?.icon }}
                  className="flex items-center justify-center rounded-[16px] w-[68px] h-[68px] bg-[#DE6DAF]"
                >
                 
                </div>
                <div>
                  <h3 className="text-black text-[24px] font-semibold  mb-2">
                    {/* {t("pricing.t1")} */}
                    {item?.name}
                  </h3>
                  <p className="text-[#4A5460] text-[18px] mb-6">
                    {item?.num_of_providers == 0
                      ? t("pricing.slogon")
                      : t("pricing.upTo", {count: item?.num_of_providers})}
                  </p>
                  <div className="text-[#4A4C43] font-medium text-[18px] flex flex-col ">
                    {/* <p>{plans[0]?.image_price} USD - Mamogram Image</p> */}
                    <hr/>
                    {item?.plan_type?.sort((a, b) => a.price - b.price)?.map((type, i) => (
                      <div key={`${index}-${i}`}>
                        <p  className="my-2">
                          {type?.price} {t("pricing.usd")} - {type?.period =="0"?t("pricing.mamogramImage"):type?.period} {type?.period == "0"?"": (type?.period=="1"? t("pricing.month"):t("pricing.months"))} 
                        </p>
                        {i < item?.plan_type?.length - 1 && <hr  />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full text-center">
                  <button className="rounded-[8px] py-2 bg-white text-[#4A5460] border border-[#4A5460] enabled:hover:border-[#DE6DAF] enabled:hover:text-[#fff]  enabled:hover:bg-[#DE6DAF] w-full !transition-all !duration-200">
                    {t("pricing.subscribe")}
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
}
      <div></div>
    </>
  );
};

export default Pricing;
