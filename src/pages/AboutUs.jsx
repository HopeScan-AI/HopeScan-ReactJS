import { useTranslation } from "react-i18next";
import AboutImg from "../assets/images/about.png";
import AboutWhy from "../assets/images/about-why.png";
import AboutFeat from "../assets/images/about-feat.png";
import GoalIcon from "../assets/icons/GoalIcon";
import MissionIcon from "../assets/icons/MissionIcon";
import PieChart60 from "../assets/icons/PieChart60";
import AboutFeat1 from "../assets/icons/AboutFeat1";
import AboutFeat2 from "../assets/icons/AboutFeat2";
import AboutFeat3 from "../assets/icons/AboutFeat3";
const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <div className="relative flex h-[140px]">
        <div className="pink-banner-centered h-[140px]"></div>
        <div className="flex items-center px-2 lg:px-28  w-full h-full">
          <div className=" relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("about.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("about.home")}</span> > <span>{t("about.title")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" px-2 py-12 lg:px-28  w-full grid grid-cols-2 gap-12 lg:gap-20 ">
      <div className=" block lg:hidden col-span-2 ">
          <img
            className="rounded-2xl w-full max-h-[400px] object-cover"
            src={AboutImg}
          />
        </div>
        <div className="col-span-2 lg:col-span-1  ">
          <h2 className="text-[#D73C96] text-[18px] font-medium"> {t("about.ourStory")}</h2>
          <h1 className="text-[#14253B] text-[32px] font-semibold mb-4">
          {t("about.header")}
          </h1>
          <p className="text-[#64748B] text-[15px] font-regular ">
          {t("about.aboutPara")}
          </p>

          <div className="flex gap-4 justify-start items-start my-8">
            <div>
              <GoalIcon />
            </div>

            <div className="gap-2 flex-col flex">
              <h3 className="text-[#14253B] text-[18px] font-semibold">
                
                {t("about.ourGoal")}
              </h3>
              <p className="text-[#64748B] text-[15px] font-regular">
              {t("about.goal")}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-start items-start my-8">
            <div>
              <MissionIcon />
            </div>

            <div className="gap-2 flex-col flex">
              <h3 className="text-[#14253B] text-[18px] font-semibold">
                {t("about.ourMission")}
              </h3>
              <p className="text-[#64748B] text-[15px] font-regular">
              {t("about.mission")}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:!block col-span-1 ">
          <img
            className="rounded-2xl w-full max-h-[400px] object-cover"
            src={AboutImg}
          />
        </div>
        
      </div>

      <div className="grid grid-cols-2  my-6 gap-8 lg:gap-0">
        <img
          className="col-span-2 lg:col-span-1 w-full h-full object-cover"
          src={AboutWhy}
          alt=""
        />
        <div className="col-span-2 lg:col-span-1  px-2  lg:px-28 flex flex-col justify-center">
          <h2 className="text-[#14253B] text-[26px] font-semibold mb-6">
            {t("about.whyGaza")}
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <p className="text-[#000] text-[15px] font-medium">
                
                {t("about.over")}
              </p>
              <div className="flex gap-4 items-center">
                <PieChart60 />
                <span className="text-[#14253B] text-[40px] font-bold">
                  60%
                </span>
              </div>
              <p className="text-[#14253B] text-[15px] font-medium">
              {t("about.percentageStr")}
                
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[#14253B] text-[15px] font-regular">
              
              {t("about.whyGazaPara")}

              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="  w-full relative">
        <div className="about-feat-bg w-0 lg:w-full"></div>

        <div className="px-2 py-12 lg:px-28 flex flex-col justify-center items-center relative z-10 ">
          <h1 className="text-[#14253B] font-semibold text-[36px] text-center">
            
            {t("about.unique")}
          </h1>
          <div className="grid grid-cols-3 py-12 gap-10 ">
            <div className="col-span-3 lg:col-span-1 flex flex-col gap-8 justify-start items-center">
              <AboutFeat1 />
              <p className="text-[#2F2E41] text-[20px] font-semibold text-center ">
                {t("about.feat1")}
              </p>
            </div>
            <div className="col-span-3 lg:col-span-1 flex flex-col gap-8 justify-start items-center">
              <AboutFeat2 />
              <p className="text-[#2F2E41] text-[20px] font-semibold text-center ">
                {t("about.feat2")}
              </p>
            </div>
            <div className="col-span-3 lg:col-span-1 flex flex-col gap-8 justify-start items-center">
              <AboutFeat3 />
              <p className="text-[#2F2E41] text-[20px] font-semibold text-center">
              {t("about.feat3")}              </p>
            </div>
          </div>
          {/* <img src={AboutFeat} className="w-full" alt="" /> */}
        </div>
      </div>

      {/* <div className=" px-2 py-12 lg:px-28  w-full  flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-[18px]">
            Our Story – Born in Crisis, Built for Hope.
          </h1>
        </div>

        <div>
          <h1 className="font-bold text-[18px]">Why Gaza? Why Now?</h1>
          <p className="font-light text-[16px]">
            In Gaza, over 60% of breast cancer cases are detected in late
            stages. Screening delays, limited equipment, and overstretched staff
            turn detection into a race against time. HopeScan brings global
            innovation born from local urgency.
          </p>
        </div>
        <div>
          <h1 className="font-bold text-[18px]">What Makes HopeScan Unique:</h1>

          <div className="font-light text-[16px] px-4">
            <p>- Built with local developers and doctors, not just for them.</p>
            <p>- Trained on real Gaza patient data. </p>
            <p>
              - Prioritizes equity in health AI, not just technical performance.{" "}
            </p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-[18px]">Our Mission? </h1>
          <p className="font-light text-[16px]">
            To empower healthcare workers with timely, accurate breast cancer
            detection—without invasive procedures or the need to travel abroad.
            We aim to support healthcare workers, reduce the burden on the
            healthcare system, and provide an effective, accessible tool that
            can be integrated into any medical center across the Strip.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default AboutUs;
