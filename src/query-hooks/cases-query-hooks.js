import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";
import { useAuth } from "../contexts/AuthContext";

export const queryKeys = {
  allUserCases: () => ["all-user-cases"],
  caseDetails: (id) => ["case-details" + id],
  caseImages: (id) => ["case-images" + id],
  allProviders: () => ["all-providers"],
};

export function useAllUserCases(enabled = true) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.allUserCases(), // Unique query key for caching
    queryFn: () => sendApiRequest(`case/?${queryString}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}
export function useCasesDetails(id, enabled = true) {
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters
  const data = useQuery({
    queryKey: queryKeys.caseDetails(id), // Unique query key for caching
    queryFn: () => sendApiRequest(`case/${id}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const createCase = async (data) => {
  console.log(data);
  return sendApiRequest(`case/`, "POST", undefined, data);
};
export function useCreateCase() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: createCase, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.allUserCases()); // Invalidate queries to refresh data
      console.log(`Create Case Success`); // Success handling (optional)
    },
  });
}
const updateCase = async ({ id, data }) => {
  console.log(data);
  return sendApiRequest(`case/${id}`, "PUT", undefined, data);
};
export function useUpdateCase() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: updateCase, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.allUserCases()); // Invalidate queries to refresh data
      console.log(`Update Case Success`); // Success handling (optional)
    },
  });
}

const removeCase = async (id) => {
  return sendApiRequest(`case/${id}`, "DELETE", undefined, {});
};
export function useRemoveCase() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: removeCase, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: (id) => {
      queryClient.invalidateQueries(queryKeys.allUserCases()); // Invalidate queries to refresh data
      console.log(`Remove Case Success`); // Success handling (optional)
    },
  });
}

export function useAllProviders() {
  const { user } = useAuth();

  const enabled = user?.role == "admin" || user?.role == "institution";
  // const enabled = false;
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.allProviders(), // Unique query key for caching
    queryFn: () => sendApiRequest(`provider/?${queryString}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const uploadCaseImage = async ({ caseId, data }) => {
  return sendApiRequest(`images/upload/${caseId}`, "POST", undefined, data, {"Content-Type": "multipart/form-data"});
};
export function useUploadCaseImage() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: uploadCaseImage, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: (caseId) => {
      queryClient.invalidateQueries(queryKeys.caseDetails(caseId)); // Invalidate queries to refresh data
      console.log(`Image Upload Success`); // Success handling (optional)
    },
  });
}

export function useCasesImages(id, enabled = true) {
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters
  const data = useQuery({
    queryKey: queryKeys.caseImages(id), // Unique query key for caching
    queryFn: () => sendApiRequest(`images/${id}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}



const transferCase = async (data) => {
  console.log(data);
  return sendApiRequest(`case/change_owner`, "POST", undefined, data);
};
export function useTransferCase() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: transferCase, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.allUserCases()); // Invalidate queries to refresh data
      console.log(`Case Transfered Successfully`); // Success handling (optional)
    },
  });
}