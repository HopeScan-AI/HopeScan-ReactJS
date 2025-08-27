import React, { useEffect, useState } from "react";
import useActiveSection from "../hooks/useActiveSection"; // Import the custom hook

// import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useLocation, NavLink } from "react-router-dom";
import {
  capitalize,
  // Modal,
  // Box,
  // Typography,
  // Button,
  // IconButton,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ToastContainer, toast } from "react-toastify";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Tabs } from "flowbite-react";

import CloseIcon from "@mui/icons-material/Close";

import { useTranslation } from "react-i18next";

import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";

import {
  useSignUp,
  useVerifyEmail,
  useSendVerificationCode,
} from "../query-hooks/auth-query-hooks";
import {
  useAllNotifications,
  useMarkNotificationAsRead,
  useRespondInvitation,
} from "../query-hooks/general-query-hooks";
import UserImagePlaceholder from "../assets/images/user_image.jpeg";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { selectedLanguage, switchLanguage } from "../i18n";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    ></span>

    {icon}
  </button>
);

const Navbar = ({ sectionId }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // console.log(location);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const { user, login, logout } = useAuth();

  const { data: notifications, isPending: isPendingNotifications } =
    useAllNotifications();
  // console.log(notifications);
  if (notifications && !Array.isArray(notifications)) {
    notifications?.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  const { mutateAsync: mutateAsyncMarkNotificationAsRead } =
    useMarkNotificationAsRead();
  const { mutateAsync: mutateAsyncRespondInvitation } = useRespondInvitation();

  const handleOnClickNotification = async (id) => {
    const response = await mutateAsyncMarkNotificationAsRead(id);
    if (response) {
      console.log(response);
      console.log(id);
    }
  };
  const [loadingAccept, setLoadingAccept] = useState(false);

  const respondInvitaion = async (invitation, action) => {
    setLoadingAccept(true);
    const response = await mutateAsyncRespondInvitation(
      // parseInt(
      //   url.split("/")[url.split("/").length - 1]
      // )
      {
        // user_id: invitation?.user_id,
        // provider_id: parseInt(invitation?.action_url?.split("/")[invitation?.action_url?.split("/")?.length - 1]) ,
        user_id: parseInt(
          invitation?.action_url?.split("/")[
            invitation?.action_url?.split("/")?.length - 1
          ]
        ),
        provider_id: invitation?.user_id,
        action: action,
      }
    );
    if (response && response != 404) {
      console.log(response);
      toast.success("Invitation Responded Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Responding Invitation Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoadingAccept(false);
    console.log("responded");

    const markReadResponse = await mutateAsyncMarkNotificationAsRead(
      invitation?.id
    );
    if (response && response != 404) console.log("notification marked read");
  };

  let navigation = [
    { name: t("navbar.home"), href: "/home", section: "home", current: true },
    {
      name: t("navbar.about"),
      href: "/about",
      section: "about",
      current: false,
    },
    {
      name: t("navbar.howitworks"),
      href: "/howitworks",
      section: "howitworks",
      current: false,
    },
    {
      name: t("navbar.pricing"),
      href: "/pricing",
      section: "pricing",
      current: false,
    },
    {
      name: t("navbar.contactus"),
      href: "/contactus",
      section: "contactus",
      current: false,
    },
  ];

  // if (user) navigation.push({ name: t("navbar.diagnose"), href: "/diagnose", current: false });
  if (user?.role == "user" || user?.role == "institution")
    navigation.push({
      name: t("navbar.dashboardLinks.cases"),
      href: "/cases",
      current: false,
    });
  if (user?.role == "institution")
    navigation.push({
      name: t("navbar.dashboardLinks.providers"),
      href: "/providers",
      current: false,
    });

  if (user?.role == "admin" || user?.role == "annotator") {
    navigation.push({
      name: t("navbar.dashboard"),
      href: "/dashboard",
      current: false,
    });
  }

  if (location?.pathname?.split("/")[1] == "dashboard") {
    navigation = [];
    if (user?.role == "admin") {
      navigation.push({
        name: t("navbar.dashboardLinks.users"),
        href: "/dashboard/users",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.cases"),
        href: "/dashboard/cases",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.providers"),
        href: "/dashboard/providers",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.allImages"),
        href: "/dashboard/hope-images/all-images",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.pendingDiagnose"),
        href: "/dashboard/hope-images/pending-diagnose",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.results"),
        href: "/dashboard/hope-images/images-results",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.plans"),
        href: "/dashboard/plans",
        current: false,
      });
      navigation.push({
        name: "My DBA",
        href: "/dashboard/mydba",
        current: false,
      });
    }
    if (user?.role == "annotator") {
      navigation.push({
        name: t("navbar.dashboardLinks.allImages"),
        href: "/dashboard/hope-images/all-images",
        current: false,
      });
      navigation.push({
        name: t("navbar.dashboardLinks.pendingDiagnose"),
        href: "/dashboard/hope-images/pending-diagnose",
        current: false,
      });
    }
    // if (user?.role == "institution") {
    //   navigation.push({
    //     name: t("navbar.dashboardLinks.cases"),
    //     href: "/dashboard/cases",
    //     current: false,
    //   });
    //   navigation.push({
    //     name: t("navbar.dashboardLinks.providers"),
    //     href: "/dashboard/providers",
    //     current: false,
    //   });
    // }
    if (user?.role == "user") {
      navigation.push({
        name: t("navbar.dashboardLinks.cases"),
        href: "/cases",
        current: false,
      });
    }
  }

  const sections = ["", "home", "about", "howitworks", "pricing", "contactus"]; // Section IDs from LandingPage
  const activeSection = useActiveSection(sections);
  // console.log(sections);
  useEffect(() => {
    if (location.pathname) {
      const sectionId = location.pathname.split("/")[1]; // Extract the section name (e.g., "about")
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          setTimeout(() => {
            window.scrollTo({ top: element.offsetTop - 60, behavior: "smooth" })
            // element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }
  }, [location]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

  const handleSubmitLogin = async () => {
    setLoading(true); // Start loader
    try {
      setError("");
      const { status } = await login(email, password);
      if (status === 201 || status === 200) {
        setTimeout(() => {
          // navigate(from); // Redirect after a delay
          handleCloseLoginModal();
          window.location.reload();
        }, 1000);
      } else if (status === 401) {
        setError("Incorrect Email or Password");
      } else {
        setError("Log In Error, Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleSubmitLogin();
    } else {
      setError("Please fill out all fields");
    }
  };
  const handleSubmitLogout = async () => {
    await logout();
    // window.location.reload();
  };

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const handleOpenSignupModal = () => setIsSignupModalOpen(true);
  const handleCloseSignupModal = () => setIsSignupModalOpen(false);

  const [emailSignup, setEmailSignup] = useState("");
  const [nameSignup, setNameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

  const [institutionEmailSignup, setInstitutionEmailSignup] = useState("");
  const [institutionPasswordSignup, setInstitutionPasswordSignup] =
    useState("");
  const [institutionNameSignup, setInstitutionNameSignup] = useState("");

  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false); // Loader state

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    if (emailSignup && passwordSignup && nameSignup) {
      handleSubmitSignup();
    } else {
      setSignupError("Please fill out all fields");
    }
  };
  const handleInstitutionSignupFormSubmit = (e) => {
    e.preventDefault();
    if (
      institutionEmailSignup &&
      institutionPasswordSignup &&
      institutionNameSignup
    ) {
      handleSubmitInstitutionSignup();
    } else {
      setSignupError("Please fill out all fields");
    }
  };
  const { mutateAsync: mutateAsyncSignUp } = useSignUp();
  const { mutateAsync: mutateAsyncSendVerificationCode } =
    useSendVerificationCode();
  const { mutateAsync: mutateAsyncVerifyEmail } = useVerifyEmail();

  const handleSubmitSignup = async () => {
    setSignupLoading(true);

    const response = await mutateAsyncSignUp({
      name: nameSignup,
      email: emailSignup,
      password: passwordSignup,
      role: "user",
    });

    if (response && response != 404) {
      console.log("signup respose: ", response);
      setSignupLoading(false);
      // handleSendVerificationCode(emailSignup);
      // setEmailCode(emailSignup);
      // handleSwitchToCodeModal();
      handleSwitchToLoginModal();
      toast.success("Signed Up Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Sign Up Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSubmitInstitutionSignup = async () => {
    setSignupLoading(true);

    const response = await mutateAsyncSignUp({
      name: institutionNameSignup,
      email: institutionEmailSignup,
      password: institutionPasswordSignup,
      role: "institution",
    });

    if (response && response != 404) {
      console.log("signup respose: ", response);
      setSignupLoading(false);
      // handleSendVerificationCode(emailSignup);
      // setEmailCode(institutionEmailSignup);
      // handleSwitchToCodeModal();
      // handleCloseSignupModal();
      handleSwitchToLoginModal();
      toast.success("Signed Up Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Sign Up Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const handleOpenCodeModal = () => setIsCodeModalOpen(true);
  const handleCloseCodeModal = () => setIsCodeModalOpen(false);

  const [emailCode, setEmailCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);

  const handleCodeFormSubmit = (e) => {
    e.preventDefault();
    if (verificationCode && emailCode) {
      handleSubmitVrtify();
    } else {
      setCodeError("Please fill out all fields");
    }
  };

  const handleSendVerificationCode = async (email) => {
    setSendCodeLoading(true);
    const response = await mutateAsyncSendVerificationCode({
      email: email,
    });

    if (response && response != 404) {
      console.log("signup respose: ", response);
      toast.success("Verification Code Sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Failed Sending Verification Code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setSendCodeLoading(false);
  };
  const handleSubmitVrtify = async () => {
    setCodeLoading(true);

    const response = await mutateAsyncVerifyEmail({
      email: emailCode,
      code: verificationCode,
    });

    if (response && response != 404) {
      console.log("verify respose: ", response);
      setCodeLoading(false);
      handleCloseCodeModal();
      toast.success("Email Verfied Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Verification Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSwitchToLoginModal = () => {
    handleCloseSignupModal();
    handleOpenLoginModal();
  };
  const handleSwitchToSignupModal = () => {
    handleCloseLoginModal();
    handleOpenSignupModal();
  };
  const handleSwitchToCodeModal = () => {
    handleCloseSignupModal();
    handleCloseLoginModal();
    handleOpenCodeModal();
    handleOpenCodeModal();
  };

  const handleOnClickSwitchLanguage = () => {
    switchLanguage();
    window.location.reload();
  };
  let isThereAnyActiveSection = false;
  return (
    <Disclosure
      as="nav"
      className="bg-[#F7F7F7] border-b-[1px] border-b-[#808080] border-opacity-[24%] fixed top-0 left-0 w-full z-50 "
    >
      <div className="  px-2 xl:px-28">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#DE6DAF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
            <button
              className="!bg-transparent text-[#DE6DAF] hover:text-[#f1b1d6] p-0 lg:hidden mx-4"
              onClick={handleOnClickSwitchLanguage}
            >
              {selectedLanguage == "en" ? "Ar" : "En"}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex shrink-0 items-center">
              {/* <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            /> */}
              <NavLink
                to={"/home"}
                className="text-black font-extrabold hidden sm:block"
              >
                HopeScan
              </NavLink>
            </div>
            <div className="hidden lg:mx-6 lg:block">
              <div className="flex gap-3">
                {/* {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        `${
                          isActive ? "opacity-100 after:absolute" : "opacity-60"
                        }`,
                        "hover:opacity-100 text-black  py-2 text-[14px] !px-1 transition-[0.5]",
                        "relative  hover:after:absolute after:bottom-[-14px] after:left-0 after:w-full after:h-[1px] after:bg-[#DE6DAF]"
                      )
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.name}
                  </NavLink>
                ))} */}
                {navigation.map((item) => {
                  const isActiveSection = activeSection === item.section;
                  isThereAnyActiveSection =
                    isThereAnyActiveSection || isActiveSection;
                  // console.log("---", activeSection);
                  // console.log(item.name, isActiveSection);
                  // console.log(item.name, isThereAnyActiveSection);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          `${
                            isActiveSection
                              ? "opacity-100 after:absolute"
                              : !isThereAnyActiveSection && isActive
                              ? "opacity-100 after:absolute"
                              : "opacity-60"
                          }`,
                          "hover:opacity-100 text-black py-2 !px-1 transition-[0.5] navLink",
                          "relative hover:after:absolute after:bottom-[-14px] after:left-0 after:w-full after:h-[1px] after:bg-[#DE6DAF]"
                        )
                      }
                      // aria-current={({ isActive }) =>
                      //   isActive ? "page" : undefined
                      // }
                    >
                      {item.name}
                    </NavLink>
                  );
                })}

                {/* 
                {navigation.map((item) =>
                    <NavLink
                      key={item.name}
                      to={item.href}
                      // onClick={() => handleClickSectionLink(item.name)}
                      className={({ isActive }) =>
                        classNames(
                          `${
                            activeSection === item.section  
                              ? "opacity-100 after:absolute"
                              : (isActive? "opacity-100 after:absolute" : "opacity-60")
                          }`,
                          "hover:opacity-100 text-black  py-2 text-[14px] !px-1 transition-[0.5]",
                          "relative  hover:after:absolute after:bottom-[-14px] after:left-0 after:w-full after:h-[1px] after:bg-[#DE6DAF]"
                        )
                      }
                      aria-current={({ isActive }) =>
                        isActive ? "page" : undefined
                      }
                    >
                      {item.name}
                    </NavLink>
                  )} */}
                {/* {navigation.map((item) =>
                  item.href.startsWith("/") ? ( // If it's a separate page
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => handleClickSectionLink(item.name)}
                      className={({ isActive }) =>
                        classNames(
                          `${
                            isActive
                              ? "opacity-100 after:absolute"
                              : "opacity-60"
                          }`,
                          "hover:opacity-100 text-black  py-2 text-[14px] !px-1 transition-[0.5]",
                          "relative  hover:after:absolute after:bottom-[-14px] after:left-0 after:w-full after:h-[1px] after:bg-[#DE6DAF]"
                        )
                      }
                      aria-current={({ isActive }) =>
                        isActive ? "page" : undefined
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    // If it's an in-page section
                    <button
                      key={item.name}
                      onClick={handleClickSectionLink(item.href.substring(0))}
                      // onClick={() => handleScroll(item.href.substring(1))}
                      // className={
                      //   activeSection === item.href.substring(1)
                      //     ? "text-blue-600 font-bold"
                      //     : "text-gray-600"
                      // }
                      className={`${
                        activeSection === item.href.substring(1)
                          ? "opacity-100 after:absolute"
                          : "opacity-60"
                      } hover:opacity-100 text-black py-2 text-[14px] !px-1 transition-[0.5] 
                      relative hover:after:absolute after:bottom-[-14px] after:left-0 after:w-full after:h-[1px] after:bg-[#DE6DAF]`}
                    >
                      {item.name}
                    </button>
                  )
                )} */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:mx-6 lg:pr-0">
            {!user && (
              <div>
                <NavLink
                  key="login"
                  onClick={handleOpenLoginModal}
                  className={({ isActive }) =>
                    classNames(
                      "text-black opacity-60 hover:opacity-100 py-2 text-[14px] px-3"
                    )
                  }
                >
                  {t("navbar.login")}
                </NavLink>
                <span className="text-black opacity-60">|</span>
                <NavLink
                  key="signup"
                  onClick={handleOpenSignupModal}
                  className={({ isActive }) =>
                    classNames(
                      "text-black opacity-60 hover:opacity-100 py-2 text-[14px] px-3"
                    )
                  }
                >
                  {t("navbar.signup")}
                </NavLink>
              </div>
            )}
            <button
              className="!bg-transparent text-[#DE6DAF] hover:text-[#f1b1d6] p-0 hidden lg:block"
              onClick={handleOnClickSwitchLanguage}
            >
              {selectedLanguage == "en" ? "Ar" : "En"}
            </button>

            {/* Notification dropdown */}
            {user && (
              <Menu as="div" className="relative  z-10 notifications-menu">
                <div>
                  <MenuButton className="text-[#DE6DAF]  hover:text-[#b4578d] relative flex items-center rounded-full  text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <BellIcon aria-hidden="true" className="size-6" />
                    <span className="absolute -inset-1.5" />
                    <span className="absolute flex justify-center items-center top-[-2px] right-[0px] p-1 rounded-full w-[15px] h-[15px] text-[10px] bg-[#DE6DAF] leading-none text-white">
                      {
                        notifications?.filter((n) => n?.is_read === false)
                          ?.length
                      }
                    </span>
                    {/* <span className="sr-only">Open user menu</span> */}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in !max-h-[300px] overflow-y-scroll"
                >
                  {notifications?.length == 0 && (
                    <MenuItem>
                      <span className="p-2">{t("navbar.noNotifications")}</span>
                    </MenuItem>
                  )}
                  {notifications?.map((notification) => (
                    <MenuItem
                      className={
                        notification?.is_read ? "bg-gray-300" : "bg-white"
                      }
                      key={notification?.id}
                    >
                      <div className="p-2">
                        <h3 className="text-[16px]">{notification?.title}</h3>
                        <div className="flex  gap-3 ">
                          <p className="text-[12px] text-gray-600">
                            {notification?.message}
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            {!notification?.is_read && (
                              <>
                                <button
                                  className="text-[12px] text-[white] rounded-lg bg-[#7ede61] hover:bg-[#5eb644] transition p-2 h-fit"
                                  onClick={() =>
                                    respondInvitaion(notification, "accepted")
                                  }
                                >
                                  {loadingAccept ? (
                                    <div className="flex items-center justify-center gap-1">
                                      <CircularProgress
                                        color="white"
                                        size={24}
                                      />{" "}
                                      <span>Accepting</span>
                                    </div>
                                  ) : (
                                    "Accept"
                                  )}
                                </button>
                                <button
                                  className="text-[12px] text-[white] rounded-lg bg-[#f83d88] hover:bg-[#a3295a] transition p-2 h-fit"
                                  onClick={() =>
                                    respondInvitaion(notification, "declined")
                                  }
                                >
                                  {loadingAccept ? (
                                    <div className="flex items-center justify-center gap-1">
                                      <CircularProgress
                                        color="white"
                                        size={24}
                                      />{" "}
                                      <span>Rejecting</span>
                                    </div>
                                  ) : (
                                    "Reject"
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      onClick={handleOnClickNotification}
                    >
                      Notification 1
                    </a> */}
                    </MenuItem>
                  ))}

                  {/* {
                        "action_url": "/provider/join-institution/1",
                        "created_at": "Mon, 10 Feb 2025 17:39:26 GMT",
                        "id": 29,
                        "is_read": false,
                        "message": "Institution Admin is inviting you to join them",
                        "title": "Invite to institution",
                        "user_id": 10
                      } */}
                </MenuItems>
              </Menu>
            )}

            {/* Profile dropdown */}
            {user && (
              <Menu as="div" className="relative ml-3 z-10-">
                <div>
                  <MenuButton className="text-[#DE6DAF] hover:text-[#b4578d] relative flex items-center rounded-full  text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <KeyboardArrowDownIcon className=" t mr-2" />

                    <span className="absolute -inset-1.5" />

                    <span className="sr-only">Open user menu</span>
                    <span className="mx-2 text-[16px]">{user?.name}</span>

                    <img
                      alt=""
                      src={user?.imgUrl ? user?.imgUrl : UserImagePlaceholder}
                      className="size-10 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Settings
                    </a>
                  </MenuItem> */}
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      onClick={handleSubmitLogout}
                    >
                      {t("navbar.signout")}
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                "block rounded-md px-3 py-2 text-base font-medium",
                item.current
                  ? "bg-[#DE6DAF] text-white"
                  : " hover:bg-[#DE6DAF]  hover:text-white"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>

      <Modal
        show={isLoginModalOpen}
        size="md"
        onClose={handleCloseLoginModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("navbar.loginModal.title")}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value={t("navbar.loginModal.email")} />
              </div>
              <TextInput
                id="email"
                placeholder={t("navbar.loginModal.emailPlaceholder")}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value={t("navbar.loginModal.password")}
                />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="**********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2  custom-input">
                <Checkbox id="remember" className="checked:!bg-[#DE6DAF]" />
                <Label htmlFor="remember">
                  {t("navbar.loginModal.remember")}{" "}
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-[#DE6DAF] hover:underline dark:text-cyan-500"
              >
                {t("navbar.loginModal.lostPassword")}
              </a>
            </div>
            <div className="w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={handleFormSubmit}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("navbar.loginModal.logingIn")}</span>
                  </div>
                ) : (
                  t("navbar.loginModal.submitLogin")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{error}</p>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              {t("navbar.loginModal.notRegistered")}
              <a
                href="#"
                className="text-[rgb(222,109,175)] hover:underline dark:[#DE6DAF]"
                onClick={handleSwitchToSignupModal}
              >
                {t("navbar.loginModal.createAccount")}
              </a>
            </div>
            {/* <div className="!mt-1 flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not Verified?&nbsp;
              <a
                href="#"
                className="text-[rgb(222,109,175)] hover:underline dark:[#DE6DAF]"
                onClick={null}
              >
                Verify account
              </a>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isSignupModalOpen}
        size="md"
        onClose={handleCloseSignupModal}
        popup
      >
        <Modal.Header className="bg-[#DE6DAF] text-[#fff]" />
        <Modal.Body className="bg-[#DE6DAF]">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white dark:text-white">
              {t("navbar.signupModal.title")}
            </h3>
          </div>
        </Modal.Body>
        <Modal.Body className="p-0">
          <div className="space-y-6">
            <Tabs variant="underline" className="custom-tab ">
              <Tabs.Item active title={t("navbar.signupModal.individulTab")}>
                <div className="space-y-6  px-6">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="text"
                        value={t("navbar.signupModal.name")}
                      />
                    </div>
                    <TextInput
                      id="signupName"
                      placeholder={t("navbar.signupModal.namePlaceholder")}
                      value={nameSignup}
                      onChange={(event) => setNameSignup(event.target.value)}
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email"
                        value={t("navbar.signupModal.email")}
                      />
                    </div>
                    <TextInput
                      id="signupEmail"
                      placeholder={t("navbar.signupModal.emailPlaceholder")}
                      type="email"
                      value={emailSignup}
                      onChange={(event) => setEmailSignup(event.target.value)}
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password"
                        value={t("navbar.signupModal.password")}
                      />
                    </div>
                    <TextInput
                      id="signupPassword"
                      type="password"
                      placeholder="**********"
                      value={passwordSignup}
                      onChange={(event) =>
                        setPasswordSignup(event.target.value)
                      }
                      className="custom-input"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Button
                      className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                      onClick={handleSignupFormSubmit}
                    >
                      {signupLoading ? (
                        <div className="flex items-center justify-center gap-1">
                          <CircularProgress color="white" size={24} />{" "}
                          <span>{t("navbar.signupModal.signingUp")}</span>
                        </div>
                      ) : (
                        t("navbar.signupModal.submitSignup")
                      )}{" "}
                    </Button>
                    <p className="text-red-500 text-[14px] !my-3">
                      {signupError}
                    </p>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title={t("navbar.signupModal.institutionTab")}>
                <div className="space-y-6 px-6">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="text"
                        value={t("navbar.signupModal.institutionName")}
                      />
                    </div>
                    <TextInput
                      id="signupInstitutionName"
                      placeholder={t(
                        "navbar.signupModal.institutionNamePlaceholder"
                      )}
                      value={institutionNameSignup}
                      onChange={(event) =>
                        setInstitutionNameSignup(event.target.value)
                      }
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email"
                        value={t("navbar.signupModal.institutionEmail")}
                      />
                    </div>
                    <TextInput
                      id="signupInstitutionEmail"
                      placeholder={t(
                        "navbar.signupModal.institutionEmailPlaceholder"
                      )}
                      type="email"
                      value={institutionEmailSignup}
                      onChange={(event) =>
                        setInstitutionEmailSignup(event.target.value)
                      }
                      className="custom-input"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password"
                        value={t("navbar.signupModal.institutionPassword")}
                      />
                    </div>
                    <TextInput
                      id="signupInstitutionPassword"
                      type="password"
                      placeholder="**********"
                      value={institutionPasswordSignup}
                      onChange={(event) =>
                        setInstitutionPasswordSignup(event.target.value)
                      }
                      className="custom-input"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Button
                      className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                      onClick={handleInstitutionSignupFormSubmit}
                    >
                      {signupLoading ? (
                        <div className="flex items-center justify-center gap-1">
                          <CircularProgress color="white" size={24} />{" "}
                          <span>{t("navbar.signupModal.signingUp")} </span>
                        </div>
                      ) : (
                        t("navbar.signupModal.submitSignup")
                      )}{" "}
                    </Button>
                    <p className="text-red-500 text-[14px] !my-3">
                      {signupError}
                    </p>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>

            <div className="w-full flex items-center justify-center flex-col !my-3">
              <p>
                {t("navbar.signupModal.haveAccount")}
                <a
                  href="#"
                  className="text-[#DE6DAF] hover:underline dark:[#DE6DAF]"
                  onClick={handleSwitchToLoginModal}
                >
                  {t("navbar.signupModal.logInHere")}
                </a>
              </p>
              {/* <p>
                Have a verification code?{" "}
                <a
                  href="#"
                  className="text-[#DE6DAF] hover:underline dark:[#DE6DAF]"
                  onClick={handleSwitchToCodeModal}
                >
                  Verify Here
                </a>
              </p> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isCodeModalOpen}
        size="md"
        onClose={handleCloseCodeModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("navbar.verificationModal.title")}
            </h3>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value={t("navbar.verificationModal.email")}
                />
              </div>
              <TextInput
                id="codeEmail"
                type="email"
                placeholder="name@company.com"
                value={emailCode}
                onChange={(event) => setEmailCode(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="verificationCode"
                  value={t("navbar.verificationModal.codeLabel")}
                />
              </div>
              <TextInput
                id="verificationCode"
                placeholder="XXXXXX"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={handleCodeFormSubmit}
              >
                {codeLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    {" "}
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("navbar.verificationModal.verifying")}</span>
                  </div>
                ) : (
                  t("navbar.verificationModal.submitVerify")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{codeError}</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col">
              <p>
                didn't get verification code?{" "}
                {sendCodeLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    {" "}
                    <CircularProgress color="white" size={24} />{" "}
                    <a
                      href="#"
                      className="text-[#DE6DAF] hover:underline dark:[#DE6DAF]"
                      onClick={() => handleSendVerificationCode(emailCode)}
                    >
                      {t("navbar.verificationModal.sending")}
                    </a>
                  </div>
                ) : (
                  <a
                    href="#"
                    className="text-[#DE6DAF] hover:underline dark:[#DE6DAF]"
                    onClick={() => handleSendVerificationCode(emailCode)}
                  >
                    {t("navbar.verificationModal.resend")}
                  </a>
                )}{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Disclosure>
  );
};

export default Navbar;
