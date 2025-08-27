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
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>
        <div className="mb-8 relative z-5 w-full">
          <div className=" px-2 lg:px-28 mb-12 w-full">
            <div className="mt-12 mb-x8 relative z-5 flex justify-between items-center flex-wrap ">
              <div>
                <h2 className="text-[32px] text-white font-semibold">
                  {t("contactus.learnmore")}
                </h2>
                <p className="text-[24px] text-white  font-medium">
                  {t("contactus.contactus")}
                </p>
              </div>
              <div className="m-2 flex gap-4 "></div>
            </div>
          </div>

          <div className="px-2 lg:px-28 flex justify-center mb-24">
            <div className="w-[90%] md:w-[60%] object-cover bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
              <div className="w-full p-6 rounded-md border-none flex flex-col gap-6">
                <div>
                  {/* <div className="mb-2 block">
                      <Label
                        htmlFor="userName"
                        value={t("users.userModal.name")}
                      />
                    </div> */}
                  <TextInput
                    //   id="userName"
                    placeholder={t("contactus.name")}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="custom-input"
                    required
                  />
                </div>
                <div>
                  {/* <div className="mb-2 block">
                      <Label
                        htmlFor="userName"
                        value={t("users.userModal.name")}
                      />
                    </div> */}
                  <TextInput
                    //   id="userName"
                    placeholder={t("contactus.email")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="custom-input"
                    required
                  />
                </div>
                <div>
                  {/* <div className="mb-2 block">
                      <Label
                        htmlFor="userName"
                        value={t("users.userModal.name")}
                      />
                    </div> */}
                  <TextInput
                    //   id="userName"
                    placeholder={t("contactus.subject")}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="custom-input"
                    required
                  />
                </div>
                <div>
                  {/* <div className="mb-2 block">
                      <Label
                        htmlFor="userName"
                        value={t("users.userModal.name")}
                      />
                    </div> */}
                  <Textarea
                    //   id="userName"
                    placeholder={t("contactus.message")}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="custom-input"
                    required
                  />
                </div>
                <div className="w-full text-center">
                  <Button className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full">
                    {t("contactus.send")}
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

export default ContactUs;
