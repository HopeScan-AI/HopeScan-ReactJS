import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
  Dropdown,
  Select,
} from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useNavigationType } from "react-router-dom";

const ContactUs = () => {
  const { t } = useTranslation();
  const navigationType = useNavigationType(); // Detects push, replace, or pop navigation

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0); // Only reset if a full navigation happens
    }
  }, [navigationType]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="px-2 lg:px-28 flex bg-[#DE6DAF] justify-center py-16">
      <div className="w-full grid grid-cols-2">
        <div className="col-span-2 md:col-span-1 py-8">
          <h1 className="font-semibold text-[26px] text-white mb-2">
          {t("contactus.title")}
          </h1>
          <p className="font-light text-[14px] text-white mb-5">
          {t("contactus.description")}
          </p>
          <h3 className="font-medium text-[18px] text-white mb-3">
          {t("contactus.contactData")}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-center ">
              <div className="bg-white flex justify-center items-center p-4 rounded-[20px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.75 13.75C23.75 9.37501 20.625 6.25001 16.25 6.25001"
                    stroke="#DE6DAF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.75 13.75C28.75 6.25001 23.75 1.25002 16.25 1.25002"
                    stroke="#DE6DAF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.93337 1.73608C3.87219 0.936305 5.32562 -0.0502529 6.89411 0.00199051L6.94011 0.00352242L6.98587 0.00843219C7.85556 0.101752 8.64508 0.535802 9.32157 1.18911L9.32578 1.19318C9.78893 1.64467 10.6064 2.59993 11.3171 3.52606C11.6773 3.99535 12.0293 4.48204 12.308 4.91777C12.447 5.13519 12.5771 5.35437 12.6829 5.562C12.7783 5.74924 12.8927 6.00101 12.9489 6.26913C13.2446 7.64256 12.6248 8.72436 12.2761 9.33302C12.2624 9.35683 12.2492 9.37992 12.2365 9.40227L12.2077 9.45271C12.1063 9.62794 11.9769 9.82346 11.8646 9.99322L11.8522 10.012C11.6159 10.3691 11.4106 10.684 11.2793 10.9648C11.2414 11.0458 11.218 11.1073 11.2038 11.1508C11.6799 12.278 12.3473 13.3949 13.1556 14.44C14.1296 15.601 15.6285 17.0412 16.3906 17.578C17.162 18.1214 17.9586 18.5764 18.7681 18.9263C18.8186 18.9114 18.8923 18.8846 18.9915 18.8388C19.2865 18.7024 19.6133 18.4915 19.9726 18.2563L19.9893 18.2454C20.1475 18.1418 20.3268 18.0245 20.4868 17.9312L20.4956 17.9261L20.5471 17.8972C20.5686 17.8851 20.5907 17.8727 20.6135 17.8598C21.2324 17.5107 22.3135 16.901 23.7002 17.1917L23.7032 17.1923L23.6971 17.1911L23.7002 17.1917C23.9639 17.2463 24.2139 17.3577 24.401 17.451C24.6069 17.5537 24.8253 17.6802 25.0427 17.8157C25.4785 18.0873 25.9667 18.4305 26.4387 18.7825C27.3652 19.4736 28.3287 20.2738 28.7893 20.7382L28.7854 20.7343L28.7933 20.7423L28.7893 20.7382C29.4446 21.3899 29.9218 22.1922 29.9943 23.1279L29.996 23.1502L29.9969 23.1725C30.0611 24.712 29.1001 26.1259 28.3094 27.0452C27.5079 27.9771 26.5926 28.7279 26.1141 29.0301C25.9931 29.1066 26.1988 28.9695 26.1141 29.0301C24.212 30.3906 21.8335 30.2235 19.3945 29.1259C19.3367 29.0999 19.4438 29.146 19.3945 29.1259C16.7867 28.0636 13.7822 25.9005 10.9635 23.3753C9.95725 22.4738 8.01859 20.5737 7.40805 19.8748C7.41217 19.8793 7.41629 19.8838 7.42041 19.8882L7.39467 19.8595C7.39906 19.8645 7.40352 19.8697 7.40805 19.8748C4.56471 16.7927 2.09271 13.4075 0.894085 10.5697C0.867468 10.5066 0.918759 10.6223 0.894085 10.5697C0.315515 9.33646 0 8.12607 0 6.98238C0 5.8429 0.322221 4.79228 0.961125 3.88526C0.947264 3.90768 0.934322 3.92938 0.92236 3.95029L0.992889 3.84065C0.982215 3.85548 0.971627 3.87035 0.961125 3.88526C1.11096 3.64297 1.36814 3.3173 1.65537 2.99255C1.98949 2.61481 2.42771 2.16684 2.93337 1.73608ZM18.7007 18.9417L18.7042 18.9413L18.7007 18.9417ZM11.1852 11.2231L11.1855 11.2202L11.1852 11.2231ZM3.09422 5.18914C3.09191 5.1926 3.0926 5.19128 3.0926 5.19128L3.0602 5.24794L3.02207 5.30092C2.68161 5.77402 2.5 6.3248 2.5 6.98238C2.5 7.67529 2.69481 8.52759 3.16653 9.52729L3.17802 9.55163L3.18845 9.57644C4.2216 12.035 6.48306 15.1872 9.25736 18.1925L9.27044 18.2067L9.28309 18.2212C9.77845 18.7922 11.6501 20.6339 12.6317 21.5133C15.3786 23.9741 18.1388 25.9196 20.3564 26.8183L20.3794 26.8276L20.4021 26.8379C22.4541 27.766 23.7949 27.6275 24.6815 26.981L24.7252 26.9491L24.7716 26.9211C24.9665 26.8033 25.7221 26.2195 26.414 25.415C27.1341 24.5778 27.5091 23.8176 27.4998 23.3006C27.4809 23.1303 27.3813 22.8631 27.0242 22.5087L27.0162 22.5008C26.6891 22.1702 25.8405 21.4551 24.944 20.7864C24.503 20.4575 24.0756 20.1588 23.7204 19.9374C23.5424 19.8264 23.3964 19.7436 23.2851 19.6881C23.2162 19.6538 23.1786 19.639 23.1671 19.6345C22.7705 19.558 22.4451 19.6986 21.7713 20.077L21.7375 20.0959C21.6413 20.1524 21.5174 20.2331 21.3415 20.3482L21.3133 20.3667C20.9873 20.5801 20.5181 20.8873 20.0404 21.1081C19.6195 21.3027 18.8227 21.6134 18.0173 21.3213L17.9906 21.3116L17.9645 21.3008C16.9119 20.8642 15.9028 20.2923 14.9509 19.6218C13.9447 18.913 12.2768 17.286 11.2232 16.0263L11.2084 16.0087L11.1943 15.9905C10.2199 14.7342 9.40134 13.3592 8.82297 11.9356L8.81625 11.9191L8.81 11.9023C8.51102 11.1015 8.82442 10.3127 9.01465 9.9059C9.23164 9.44182 9.53482 8.9837 9.74777 8.66191C9.75431 8.65204 9.76075 8.6423 9.76711 8.63268C9.89489 8.43953 9.98256 8.30613 10.0421 8.2036L10.0645 8.16425C10.4508 7.48659 10.5817 7.17647 10.5081 6.81035C10.5035 6.79892 10.4888 6.76256 10.4552 6.69669C10.3992 6.58669 10.3152 6.44192 10.2019 6.26478C9.97588 5.91143 9.67043 5.48668 9.33384 5.04808C8.65253 4.16029 7.92096 3.31561 7.5828 2.98541C7.23064 2.64592 6.95074 2.53111 6.76231 2.50005C6.20314 2.50559 5.40588 2.91393 4.55457 3.63915C4.15269 3.98151 3.7977 4.34391 3.52797 4.64886C3.39358 4.8008 3.28459 4.9337 3.20482 5.03727C3.13554 5.12722 3.10262 5.17655 3.09422 5.18914Z"
                    fill="#DE6DAF"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-white">
                <span className="font-medium"> {t("contactus.contactDataPhone")}</span>
                <span>+91 234 56677</span>
              </div>
            </div>
            <div className="flex gap-5 items-center ">
              <div className="bg-white flex justify-center items-center p-4 rounded-[20px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 33 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5312 29.8203C13.1743 29.8203 10.5397 29.6543 8.46763 29.2322C6.4024 28.8114 4.96482 28.1497 3.93739 27.2079C1.88194 25.3237 1.125 22.0006 1.125 15.7812C1.125 13.3085 1.24253 11.2773 1.52414 9.60442C2.81385 10.8477 4.29966 12.1967 5.88383 13.4379C8.87515 15.7815 12.7132 18.1484 16.5312 18.1484C20.3493 18.1484 24.1873 15.7815 27.1787 13.4379C28.7628 12.1967 30.2486 10.8477 31.5384 9.60443C31.82 11.2773 31.9375 13.3085 31.9375 15.7812C31.9375 22.0006 31.1806 25.3237 29.1251 27.2079C28.0977 28.1497 26.6601 28.8114 24.5949 29.2322C22.5228 29.6543 19.8882 29.8203 16.5312 29.8203ZM29.6114 4.85556C28.1085 6.36764 26.2554 8.14689 24.2588 9.71113C22.8276 10.8325 21.415 11.7678 20.0844 12.4193C18.7461 13.0746 17.5487 13.4141 16.5312 13.4141C15.5138 13.4141 14.3164 13.0746 12.9781 12.4193C11.6475 11.7678 10.2349 10.8325 8.80367 9.71113C6.80712 8.14688 4.95403 6.36764 3.45109 4.85556C4.35341 3.81157 5.61492 3.07407 7.42882 2.57661C9.62772 1.97356 12.573 1.74219 16.5312 1.74219C20.4895 1.74219 23.4348 1.97356 25.6337 2.57661C27.4476 3.07407 28.7091 3.81157 29.6114 4.85556Z"
                    stroke="#DE6DAF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-white">
                <span className="font-medium">{t("contactus.contactDataEmail")}</span>
                <span>info@hopescan.com</span>
              </div>
            </div>
            <div className="flex gap-5 items-center ">
              <div className="bg-white flex justify-center items-center p-4 rounded-[20px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 27 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0125 29.578L11.0108 29.5766C9.56952 28.3928 8.21349 27.1109 6.95257 25.7376C4.01598 22.5249 1 18.0411 1 13.125C1 11.5327 1.31362 9.95604 1.92296 8.48496C2.5323 7.01389 3.42542 5.67724 4.55133 4.55133C5.67724 3.42542 7.01389 2.5323 8.48496 1.92296C9.95604 1.31362 11.5327 1 13.125 1C14.7173 1 16.294 1.31362 17.765 1.92296C19.2361 2.5323 20.5728 3.42542 21.6987 4.55133C22.8246 5.67724 23.7177 7.01389 24.327 8.48496C24.9364 9.95603 25.25 11.5327 25.25 13.125C25.25 18.0411 22.234 22.5264 19.2976 25.7374C18.0369 27.1099 16.6814 28.3923 15.2411 29.5751C14.5551 30.1337 13.85 30.6683 13.1271 31.178C12.3969 30.6628 11.691 30.1379 11.0125 29.578ZM9.0665 17.1835C10.1429 18.2599 11.6028 18.8646 13.125 18.8646C14.6472 18.8646 16.1071 18.2599 17.1835 17.1835C18.2599 16.1071 18.8646 14.6472 18.8646 13.125C18.8646 11.6028 18.2599 10.1429 17.1835 9.0665C16.1071 7.99012 14.6472 7.38542 13.125 7.38542C11.6028 7.38542 10.1429 7.99012 9.0665 9.0665C7.99012 10.1429 7.38542 11.6028 7.38542 13.125C7.38542 14.6472 7.99012 16.1071 9.0665 17.1835Z"
                    stroke="#DE6DAF"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-white">
                <span className="font-medium">{t("contactus.contactDataAddress")}</span>
                <span>Alnasr strt. Gaza, Palestine</span>
              </div>
            </div>

          </div>
        </div>

        <div className="col-span-2 md:col-span-1 object-cover bg-white rounded-[35px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
        
          <div className="w-full py-8 px-10 rounded-md border-none flex flex-col gap-2">
          <h1 className="text-start w-full font-semibold text-[24px]">
          {t("contactus.contactForm")}
          </h1>

            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" value={t("contactus.name")} />
              </div>
              <TextInput
                id="name"
                placeholder={t("contactus.namePlaceholder")}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="userName" value={t("contactus.email")} />
              </div>
              <TextInput
                id="email"
                placeholder={t("contactus.emailPlaceholder")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="phone" value={t("contactus.phone")} />
              </div>
              <TextInput
                id="phone"
                placeholder={t("contactus.phonePlaceholder")}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="message" value={t("contactus.message")} />
              </div>
              <Textarea
                id="message"
                placeholder={t("contactus.messagePlaceholder")}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="w-full text-center mt-2">
              <Button className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full">
                {t("contactus.send")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
