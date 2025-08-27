import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const FAQs = () => {
  const { t } = useTranslation();

  const questions = [
    {
      question: t("faqs.q1"),
      answer: t("faqs.a1"),
    },
    {
      question: t("faqs.q2"),
      answer: t("faqs.a2"),
    },
    {
      question: t("faqs.q3"),
      answer: t("faqs.a3"),
    },
  ];

  return (
    <>
      <div className="relative flex h-[140px]">
        <div className="pink-banner-centered h-[140px]"></div>
        <div className="flex items-center px-2 lg:px-28  w-full h-full">
          <div className=" relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("faqs.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("faqs.home")}</span> > <span>{t("faqs.title")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" px-2 py-12 lg:px-28  w-full flex flex-col gap-8">
        <Accordion collapseAll className="mb-24">
          {questions?.map((item, index) => (
            <AccordionPanel key={index}>
              <AccordionTitle>{item?.question}</AccordionTitle>
              <AccordionContent>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {item?.answer}
                </p>
              </AccordionContent>
            </AccordionPanel>
          ))}
          {/* <AccordionPanel>
            <AccordionTitle>What is Flowbite?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components
                built on top of Tailwind CSS including buttons, dropdowns,
                modals, navbars, and more.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to&nbsp;
                <a
                  href="https://flowbite.com/docs/getting-started/introduction/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  get started&nbsp;
                </a>
                and start developing websites even faster with components on top
                of Tailwind CSS.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>Is there a Figma file available?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is first conceptualized and designed using the Figma
                software so everything you see in the library has a design
                equivalent in our Figma file.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the
                <a
                  href="https://flowbite.com/figma/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Figma design system
                </a>
                based on the utility classes from Tailwind CSS and components
                from Flowbite.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>
              What are the differences between Flowbite and Tailwind UI?
            </AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main difference is that the core components from Flowbite
                are open source under the MIT license, whereas Tailwind UI is a
                paid product. Another difference is that Flowbite relies on
                smaller and standalone components, whereas Tailwind UI offers
                sections of pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite
                Pro, and even Tailwind UI as there is no technical reason
                stopping you from using the best of two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionPanel> */}
        </Accordion>
      </div>
    </>
  );
};

export default FAQs;
