import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/LandingPage/Header";
import Features from "../components/LandingPage/Features";
import Targets from "../components/LandingPage/Targets";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Services from "../components/LandingPage/Services";
import ReviewsSlider from "../components/LandingPage/ReviewsSlider";
import InfoSection from "../components/LandingPage/InfoSection";
import Pricing from "../components/LandingPage/Pricing";
import ContactUs from "../components/LandingPage/ContactUs";
import { useNavigationType } from "react-router-dom";
const LandingPage = ({ sectionId }) => {
  const navigationType = useNavigationType(); // Detects push, replace, or pop navigation

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0); // Only reset if a full navigation happens
    }
  }, [navigationType]);

  useEffect(() => {
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // window.scrollTo({ top: element.offsetTop - 60, behavior: "smooth" });
        }
      }, 1000); // Timeout ensures page is loaded first
    }
  }, [sectionId]);

  return (
    <>
      <div id="home">
        <Header />
      </div>
      {/* <div> */}
        {/* <Features /> */}
        {/* <Targets /> */}
        {/* <InfoSection /> */}
      {/* </div> */}
      <div id="howitworks">
        <HowItWorks />
      </div>
      <Services />
      <ReviewsSlider />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="contactus">
        <ContactUs />
      </div>
      
    </>
  );
};

export default LandingPage;
