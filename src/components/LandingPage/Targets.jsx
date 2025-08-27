import React from "react";
import targets_image from "../../assets/images/targets_image.png";
import HealthcareProviders from "../../assets/icons/HealthcareProviders";
import MedicalEntities from "../../assets/icons/MedicalEntities";
import Individuals from "../../assets/icons/Individuals";
import { useTranslation } from "react-i18next";

const Targets = () => {
    const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2 md:col-span-1 ">
        <img src={targets_image} className="h-[100%] object-cover" alt="" />
      </div>
      <div className="col-span-2 md:col-span-1 py-8 px-8 md:py-16 md:px-14  leading-8">
        <h3 className="text-[32px] font-medium">
          {t('landingPage.targets.title')}
        </h3>

        <div className="py-8 flex flex-col gab-4">
          <div className="flex gap-4 border-b-[1px] py-8">
            <div className="pr-8 border-r-[1px] flex justify-center items-center">
              <Individuals />
            </div>
            <div className="ml-2">
              <h4 className="target-head">
              {t('landingPage.targets.firstTargetTitle')}
              </h4>
              <p className="target-sub">
              {t('landingPage.targets.firstTargetDesc')}
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-b-[1px] py-8">
            <div className="pr-8 border-r-[1px] flex justify-center items-center">
              <HealthcareProviders />
            </div>
            <div className="ml-2">
              <h4 className="target-head">
              {t('landingPage.targets.secondTargetTitle')}
              </h4>
              <p className=" target-sub">
                {t('landingPage.targets.secondTargetDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-b-[1px] py-8">
            <div className="pr-8 border-r-[1px] flex justify-center items-center">
              <MedicalEntities />
            </div>
            <div className="ml-2">
              <h4 className="target-head">
              {t('landingPage.targets.thirdTargetTitle')}
              </h4>
              <p className="target-sub">
              {t('landingPage.targets.thirdTargetDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Targets;
