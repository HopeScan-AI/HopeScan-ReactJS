import React, { useState } from "react";
import { useAiDiagnose } from "../query-hooks/ai-query-hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

const DiagnoseImage = () => {
  const { t } = useTranslation();

  const { mutateAsync: mutateAsyncAiDiagnose } = useAiDiagnose();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
      setUploadImageError(null); // Clear any previous errors
    }
  };

  // Handle image upload and classification
  const handleUploadImageSubmit = async () => {
    if (!imageFile) {
      setUploadImageError("Please select an image to upload.");
      return;
    }

    // Convert file to FormData (backend expects multipart/form-data)
    const formData = new FormData();
    formData.append("image", imageFile); // Use 'image' as the key to match the backend

    setUploadImageLoading(true);
    try {
      const response = await mutateAsyncAiDiagnose(formData);
      console.log("Classification response:", response);

      if (response && response.ok) {
        const res = await response.json();
        setClassificationResult(res.classification); // Set the classification result
        toast.success("Image classified successfully!", {
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
        throw new Error("Classification failed");
      }
    } catch (error) {
      console.error("Error classifying image:", error);
      toast.error("Failed to classify image. Please try again.", {
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
    }
  };

  return (
    <div
      className=" p-6 bg-white rounded-lg shadow-md my-28 mx-2 lg:mx-40 flex flex-col justify-start items-center
    "
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {t("diagnose.title")}
      </h1>

      {/* Image Upload Section */}
      <div className="mb-6 w-full flex flex-wrap justify-between gap-4">
        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block  text-sm text-gray-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploadImageError && (
          <p className="text-sm text-red-500 mt-2">{uploadImageError}</p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUploadImageSubmit}
          disabled={uploadImageLoading || !imageFile}
          className="px-4 py-2 bg-[#DE6DAF] text-white rounded-md hover:bg-[#c25293] transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {/* {uploadImageLoading ? t('diagnose.submitting') : t('diagnose.submit')} */}

          {uploadImageLoading ? (
            <div className="flex items-center justify-center gap-1">
              <CircularProgress color="white" size={24} />{" "}
              <span>{t("diagnose.submitting")}</span>
            </div>
          ) : (
            t("diagnose.submit")
          )}
        </button>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="flex gap-12 flex-wrap w-full">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {t("diagnose.imagePreview")}
            </h2>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full md:max-w-[400px] w-[400px] h-[400px] object-cover rounded-lg shadow-sm"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {t("diagnose.result")}
            </h2>
            <p className="text-gray-600">
              {classificationResult
                ? `${t(`diagnose.${classificationResult.split("-")[0]}`)} ${
                    classificationResult.split("-")[1] || ""
                  }`
                : t("diagnose.notDiagnosed")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnoseImage;
