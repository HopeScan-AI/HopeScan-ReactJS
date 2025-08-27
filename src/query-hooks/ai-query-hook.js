import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";
import { useAuth } from "../contexts/AuthContext";

const aiDiagnoseUrl = async (data) => {
  console.log(data);
  return sendApiRequest(`ai/classify-url`, "POST", undefined, data);
};
export function useAiDiagnoseUrl() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: aiDiagnoseUrl, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      console.log(`Image Diagnosed Successfully`); // Success handling (optional)
    },
  });
}

const aiDiagnose = async (data) => {
  console.log(data);
  return sendApiRequest(`ai/classify`, "POST", undefined, data, {
    "Content-Type": "multipart/form-data",
  });
};
export function useAiDiagnose() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: aiDiagnose, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      console.log(`Image Diagnosed Successfully`); // Success handling (optional)
    },
  });
}
