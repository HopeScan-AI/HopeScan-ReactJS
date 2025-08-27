import React, { useEffect, useState } from "react";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
  //   BiBuoy
} from "react-icons/hi";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

// import {
//   Button,
//   Checkbox,
//   Label,
//   Modal,
//   TextInput,
//   Dropdown,
//   Select,
// } from "flowbite-react";

import {
  useAllImages,
  useMakeDiagnose,
} from "../query-hooks/images-query-hooks";
import { useAiDiagnoseUrl } from "../query-hooks/ai-query-hook";

import { Radio, Label, Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

const options = [
  { label: " Normal", value: "normal" },
  { label: " Benign", value: "benign" },
  { label: " Malignant", value: "malignant" },
  { label: " Discard", value: "discard" },
];
const AllImages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const imagesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  // let currentPage = 1;
  let totalImages = 0;
  let totalPages = 0;

  let skip = (currentPage - 1) * imagesPerPage;
  const limit = imagesPerPage;

  useEffect(() => {
    skip = (currentPage - 1) * imagesPerPage;
    console.log(skip);
  }, [currentPage]);

  const { mutateAsync: mutateAsyncMakeDiagnose } = useMakeDiagnose();
  const { mutateAsync: mutateAsyncAiDiagnoseUrl } = useAiDiagnoseUrl();
  const { data: images, isPending: isPendingImages } = useAllImages(
    skip,
    limit
  );
  useEffect(() => {
    totalImages = images?.total;
    totalPages = Math.ceil(totalImages / imagesPerPage);
  }, images);
  const [diagnoses, setDiagnoses] = useState({});

  useEffect(() => {
    images?.map((image) => {
      setDiagnoses((prev) => ({ ...prev, [image?.image_id]: image?.diagnose }));
    });
  }, [images]);

  //   images?.reduce((acc, image) => ({ ...acc, [image.image_id]: image.diagnose || "" }), {})

  const handleRadioChange = (imageId, value) => {
    setDiagnoses((prev) => ({ ...prev, [imageId]: value }));
    sendToBackend(imageId, value);
  };
  const sendToBackend = (imageId, diagnosis) => {
    console.log(
      `Performing request: Image ID ${imageId}, Diagnosis: ${diagnosis}`
    );
    mutateAsyncMakeDiagnose({
      image_drive_id: imageId,
      diagnose: diagnosis,
    });
  };

  const [isWaitingDiagnose, setIsWaitingDiagnose] = useState(false);

  const [aiDiagnoses, setAiDiagnoses] = useState({});

  const [loadingDiagnoses, setLoadingDiagnoses] = useState({}); // Store loading states per image

  // const handleOnClickAiDiagnose = async (imgUrl) => {
  //   setIsWaitingDiagnose(true);
  //   const response = await mutateAsyncAiDiagnoseUrl({
  //     image_url: imgUrl,
  //   });
  //   if (response) {
  //     const res = await response.json();
  //     console.log('$$$$$', response)
  //     console.log('$$$$$', res)
  //     alert(res.classification);
  //   }
  //   setIsWaitingDiagnose(false);
  // };

  const handleOnClickAiDiagnose = async (imageId, imageUrl) => {
    try {
      // Set loading to true for this specific image
      setLoadingDiagnoses((prev) => ({ ...prev, [imageId]: true }));

      const response = await mutateAsyncAiDiagnoseUrl({ image_url: imageUrl });
      if (response) {
        const res = await response.json();

        // Save diagnosis result
        setAiDiagnoses((prev) => ({ ...prev, [imageId]: res.classification }));
      }
    } catch (error) {
      console.error("Diagnosis failed", error);
    } finally {
      // Set loading to false for this specific image
      setLoadingDiagnoses((prev) => ({ ...prev, [imageId]: false }));
    }
  };

  const handleOnClickNext = () => {
    setCurrentPage(currentPage + 1);
    console.log("===", currentPage);
  };
  const handleOnClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  function getDirectGoogleDriveUrl(url) {
    if (url.includes("drive.google.com")) {
      try {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
          return `https://drive.google.com/uc?id=${match[1]}`;
        }
      } catch (error) {
        console.error("Invalid Google Drive URL format:", error);
      }
    }
    return url; // Return the original URL if it's not a Google Drive link
  }

  return (
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>
        <div className="mb-8 relative z-5 w-full">
          <div className=" px-2 lg:px-28 mb-12 w-full">
            <div className="mt-12 mb-x8 relative z-5 flex justify-between items-center flex-wrap ">
              <div>
                <h2 className="text-[32px] text-white font-semibold">
                  {t("allImages.title")}
                </h2>
                <p className="text-[14px] text-white  font-medium">
                  <span>{t("allImages.home")}</span> >{" "}
                  <span>{t("allImages.dashboard")}</span> >{" "}
                  <span>{t("allImages.allImages")}</span>
                </p>
              </div>
              <div className="m-2 flex gap-4 ">
                <Button
                  className="white-btn sm:w-auto flex items-center !w-24"
                  onClick={handleOnClickPrev}
                  disabled={currentPage == 1}
                >
                  {t("allImages.preivious")}
                </Button>
                <Button
                  className="white-btn sm:w-auto flex items-center !w-24"
                  onClick={handleOnClickNext}
                >
                  {t("allImages.next")}
                </Button>
              </div>
            </div>
          </div>

          <div className="px-2 lg:px-28  grid grid-cols-1 lg:grid-cols-3 flex-wrap justify-center gap-6  mb-24">
            {isPendingImages ? (
              <div className="w-full object-cover m-2 bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center">
                <Skeleton height={430} width="100%" className="rounded-md" />

                <div className="mt-5 flex justify-between gap-5 p-3 rounded-lg">
                  {["normal", "benign", "malignant", "discard"].map((value) => (
                    <div key={value} className="flex items-center gap-1">
                      <Skeleton circle={true} height={20} width={20} />
                      <Skeleton width={60} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              images?.map((image) => (
                <div
                  key={image.image_id}
                  className="w-full object-cover bg-white p-2 rounded-[12px] shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition flex flex-col items-center"
                >
                  <iframe
                    src={`https://drive.google.com/file/d/${image.image_id}/preview`}
                    title={image.name}
                    className="w-full h-[430px] object-contain rounded-md border-none"
                  ></iframe>

                  <div className="mt-5 flex justify-between gap-5 p-3  rounded-lg  flex-wrap">
                    {["normal", "benign", "malignant", "discard"].map(
                      (value) => (
                        <Label key={value} className="flex items-center gap-1">
                          <Radio
                            name={`image-${image.image_id}`}
                            value={value}
                            checked={diagnoses?.[image?.image_id] === value}
                            onChange={() =>
                              handleRadioChange(image?.image_id, value)
                            }
                            className=" checked:bg-[#DE6DAF] focus:ring-0"
                          />
                          {t(`allImages.${value}`)}
                          {/* {value.charAt(0).toUpperCase() + value.slice(1)} */}
                        </Label>
                      )
                    )}
                  </div>
                  {user.role == 'admin' && <div className="flex justify-between flex-wrap items-center w-full px-4 my-2">
                    <button
                      className="bg-[#DE6DAF] text-white rounded-md p-2"
                      onClick={() =>
                        handleOnClickAiDiagnose(
                          image.image_id,
                          getDirectGoogleDriveUrl(
                            `https://drive.google.com/file/d/${image.image_id}/preview`
                          )
                        )
                      }
                    >
                      {loadingDiagnoses[image.image_id] ? (
                        <div className="flex items-center justify-center gap-2">
                          <CircularProgress color="white" size={24} />
                          {t("allImages.diagnoseing")}
                        </div>
                      ) : (
                        t("allImages.diagnose")
                      )}
                    </button>
                    <span>
                      {aiDiagnoses[image.image_id]
                        ? t(
                            `allImages.${
                              aiDiagnoses[image.image_id].split("-")[0]
                            }`
                          ) +
                            "  " +
                            aiDiagnoses[image.image_id].split("-")[1] || ""
                        : "Not Diagnosed"}
                    </span>
                  </div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllImages;
