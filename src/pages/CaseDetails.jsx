import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCasesDetails,
  useUploadCaseImage,
  useCasesImages,
  useTransferCase,
} from "../query-hooks/cases-query-hooks";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";

import { capitalize, formatDate } from "../utils/helper";

import img from "../assets/images/targets_image.png";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { Button, Label, Modal, TextInput } from "flowbite-react";

// // If you want you can use SCSS instead of css
// import 'lightgallery/scss/lightgallery.scss';
// import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const CaseDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: caseDetails, isPending: isPendingCaseDetails } =
    useCasesDetails(id);
  const { data: caseImages, isPending: isPendingCaseImages } =
    useCasesImages(id);

  const { mutateAsync: mutateAsyncTransferCase } = useTransferCase();

  useEffect(() => {
    console.log(caseDetails);
  }, [caseDetails]);
  useEffect(() => {
    console.log(caseImages);
  }, [caseImages]);

  const { mutateAsync: mutateAsyncUploadCaseImage } = useUploadCaseImage();
  const [imageFile, setImageFile] = useState(null);
  const [diagnose, setDiagnose] = useState("");
  const [comments, setComments] = useState("");
  const [uploadImageError, setUploadImageError] = useState(null);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [uploadedImageDiagnose, setUploadedImageDiagnose] = useState("");

  const handleUploadImageSubmit = async () => {
    if (!imageFile) {
      setUploadImageError("Please Select Image to Upload");
      return;
    }
    // Convert file to FormData, backend expects form data not json as multipart
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("diagnose", diagnose || "");
    formData.append("comments", comments || "");

    setUploadImageLoading(true);
    try {
      const response = await mutateAsyncUploadCaseImage({
        caseId: id,
        data: formData,
      });
      console.log(response);

      if (response && response.ok) {
        toast.success("Image Uploaded Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const res = await response.json();

        setUploadedImageDiagnose(res?.diagnose);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Image Upload Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setUploadImageLoading(false);
      // handleCloseAddImageModal();
    }
  };


  // `onDrop` function will be called when files are dropped
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the dropped files
    console.log("Files dropped:", acceptedFiles);
    // You can process files here or save them to state
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"], // Accept only images (example)
      },
      multiple: false, // Allow multiple file uploads
    });

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

  const handleOpenAddImageModal = () => setIsAddImageModalOpen(true);
  const handleCloseAddImageModal = () => {
    setIsAddImageModalOpen(false);
    setImageFile(null);
    setDiagnose("");
    setUploadImageError(null);
    setUploadImageLoading(false);
    setUploadedImageDiagnose("");
  };
  const handleOnClickAddImage = () => {
    handleOpenAddImageModal();
  };
  const [isTransferCaseModalOpen, setIsTransferCaseModalOpen] = useState(false);
  const [transferError, setTransferError] = useState("");
  const [isTransferCaseLoading, setIsTransferCaseLoading] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");
  const handleOpenTransferCaseModal = () => setIsTransferCaseModalOpen(true);
  const handleCloseTransferCaseModal = () => {
    setIsTransferCaseModalOpen(false);
  };
  const handleOnClickTransferCase = () => {
    handleOpenTransferCaseModal();
  };
  const handleTransferCaseFormSubmit = async () => {

    if (!transferEmail) {
      setTransferError("Please Fill The new Owner Email");
      return;
    }

    setIsTransferCaseLoading(true);
    const response = await mutateAsyncTransferCase({
      email: transferEmail,
      case_id: id,
    });

    if (response && response.ok) {
      console.log(response);
      toast.success("Case Transfered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if(user.role == 'user')
        navigate('/cases')
      else navigate('/dashboard/cases')
    } else {
      toast.error("Failed: Email not registered", {
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
    setTransferEmail("");
    setTransferError("");
    setIsTransferCaseLoading(false);
    handleCloseTransferCaseModal();
  };
  return (
    <>
      <div className="relative flex">
        <div className="pink-banner">
          
        </div>
        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12  mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {caseDetails?.name} {t("caseDetails.caseDetails")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("caseDetails.home")}</span> >{" "}
                <span>{t("caseDetails.cases")}</span> >{" "}
                <span>{caseDetails?.name}</span>
              </p>
            </div>
          </div>
          <div className="ag-wrapper p-12">
            <div className="flex justify-between flex-col md:flex-row gap-6 ">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col  items-start ">
                  <p className="text-[16px] text-[#de6daf] ">
                    {t("caseDetails.name")}
                  </p>
                  <p className="text-[28px] text-gray-700 font-medium leading-none">
                    {caseDetails?.name}
                  </p>
                </div>
                <div className="flex flex-col  items-start ">
                  <p className="text-[16] text-[#de6daf]">
                    {t("caseDetails.createDate")}
                  </p>
                  <p className="text-[28px] text-gray-700 font-medium leading-none">
                    {caseDetails?.created_at
                      ? formatDate(caseDetails?.created_at)
                      : ""}
                  </p>
                </div>
                <div className="flex flex-col  items-start">
                  <p className="text-[16] text-[#de6daf]">
                    {t("caseDetails.comments")}
                  </p>
                  <p className="text-[28px] text-gray-700 font-medium leading-none">
                    {caseDetails?.comments}
                  </p>
                </div>
              </div>
              <div className="flex h-[70px]  gap-2">
                <button
                  className="bg-[#de6daf] hover:bg-[#D73C96] transition text-[white] p-2  rounded-lg text-[20px] w-full md:w-auto mb-5"
                  onClick={handleOnClickTransferCase}
                >
                  {t("caseDetails.transfer")}
                </button>

                <button
                  className="bg-[#de6daf] hover:bg-[#D73C96] transition text-[white] p-2  rounded-lg text-[20px] w-full md:w-auto mb-5"
                  onClick={handleOnClickAddImage}
                >
                  {t("caseDetails.add")}
                </button>
              </div>
            </div>
            <div className="flex flex-col  items-start mt-6">
              <p className="text-[16] text-[#de6daf] mb-2">
                {t("caseDetails.images")}
              </p>
              <LightGallery
                licenseKey="0000-0000-000-0000" // Disables warning for free version
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="gap-3 w-full  grid gird-cols-1 md:grid-cols-3 lg:grid-cols-4 "
              >
                {caseImages?.map((image, i) => (
                  <a
                    href={`data:image/${
                      image?.file_name.split(".")[1]
                    };base64,${image?.image}`}
                    className="flex flex-col w-full gab-2 justify-center items-center"
                  >
                    <img
                      alt={image?.file_name}
                      className="rounded-lg w-full h-[300px] object-cover"
                      src={`data:image/${
                        image?.file_name.split(".")[1]
                      };base64,${image?.image}`}
                    />
                    <p className="py-2">
                      {t(`caseDetails.${image?.diagnose.split("-")[0]}`) +
                        " " +
                        (image?.diagnose?.split("-")[1] || "")}
                    </p>
                  </a>
                ))}
              </LightGallery>
            </div>
          </div>
        </div>
      </div>


      <Modal
        show={isAddImageModalOpen}
        size="md"
        onClose={handleCloseAddImageModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {!imageFile && (
            <div
              {...getRootProps()}
              className={`p-6 border-2 border-dashed rounded-lg transition-colors duration-300 ${
                isDragActive
                  ? "border-blue-600 bg-blue-100"
                  : "border-pink-500 bg-pink-100"
              }`}
            >
              <input
                {...getInputProps()}
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setImageFile(e.target.files[0]); // Update state with the selected file
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center text-gray-600 text-center">
                {isDragActive ? (
                  <p className="text-lg font-medium">Drop the files here...</p>
                ) : (
                  <>
                    <p className="text-lg font-medium">
                      Drag & drop an image here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to select an image
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Preview Selected Image */}
          {imageFile && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-700 text-center">
                {imageFile.name}
              </p>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-2 w-full h-64 object-cover rounded-lg shadow-md"
              />

              {uploadedImageDiagnose && (
                <p className="mt-3">
                  {`${t(`caseDetails.${uploadedImageDiagnose.split("-")[0]}`)}  ${uploadedImageDiagnose.split("-")[1]}`}
                </p>
              )}

              {!uploadedImageDiagnose && (
                <button
                  className="bg-[#de6daf] p-2 px-4 text-white rounded-lg mt-4 w-full sm:w-auto flex items-center hover:!shadow-lg transition-all"
                  onClick={handleUploadImageSubmit}
                >
                  {uploadImageLoading ? (
                    <div className="flex items-center justify-center gap-1">
                      <CircularProgress color="white" size={24} /> Upload Image
                    </div>
                  ) : (
                    "+ Diagnose Image"
                  )}{" "}
                </button>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={isTransferCaseModalOpen}
        size="md"
        onClose={handleCloseTransferCaseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 grid grid-cols-2 gap-x-3">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("caseDetails.transferModal.title")}
            </h3>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="userEmail"
                  value={t("caseDetails.transferModal.newEmail")}
                />
              </div>
              <TextInput
                id="transferEmail"
                placeholder={t("caseDetails.transferModal.newEmailPlaceholder")}
                value={transferEmail}
                onChange={(event) => setTransferEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="w-full col-span-2">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleTransferCaseFormSubmit()}
              >
                {isTransferCaseLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("caseDetails.transferModal.submitting")} </span>
                  </div>
                ) : (
                  t("caseDetails.transferModal.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{transferError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CaseDetails;
