import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";

export const queryKeys = {
  allImages: (skip, limit) => ["all-images", skip, limit],
  noDiagnoseImages: (skip, limit) => ["no-diagnose-images", skip, limit],
  imagesResults: (page, limit) => ["images-results", page, limit],
  //   respondInvitation: (id) => ["respond-invitation" + id],
};

const isEmpty = (value) => {
  return value === undefined || value === null || value.length === 0;
};

export function useAllImages(skip, limit) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const skipString = !isEmpty(skip) ? `skip=${skip}` : "";
  const limitString = !isEmpty(limit) ? `limit=${limit}` : "";

  const queryString = [skipString, limitString].filter(Boolean).join("&"); // Construct query string based on parameters

  const data = useQuery({
    queryKey: queryKeys.allImages(skipString, limitString), // Unique query key for caching
    queryFn: () => sendApiRequest(`drive-images/get?${queryString}`, "GET"), // API call to fetch filtered campaigns
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}
export function useNoDiagnoseImages(skip, limit) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const skipString = !isEmpty(skip) ? `skip=${skip}` : "";
  const limitString = !isEmpty(limit) ? `limit=${limit}` : "";


  const queryString = [skipString, limitString].filter(Boolean).join("&"); // Construct query string based on parameters

  const data = useQuery({
    queryKey: queryKeys.noDiagnoseImages(skipString, limitString), // Unique query key for caching
    queryFn: () => sendApiRequest(`drive-images/get_no_diagnose?${queryString}`, "GET"), // API call to fetch filtered campaigns
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

export function useImagesResults(page, limit) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const pageString = !isEmpty(page) ? `page=${page}` : "";
  const limitString = !isEmpty(limit) ? `limit=${limit}` : "";

  const queryString = [pageString, limitString].filter(Boolean).join("&"); // Construct query string based on parameters

  const data = useQuery({
    queryKey: queryKeys.imagesResults(pageString, limitString), // Unique query key for caching
    queryFn: () => sendApiRequest(`drive-images/results/data?${queryString}`, "GET"), // API call to fetch filtered campaigns
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const makeDiagnose = async (data) => {
  console.log(data);
  return sendApiRequest(
    `drive-images/create-doctor-diagnose`,
    "POST",
    undefined,
    data
  );
};
export function useMakeDiagnose() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: makeDiagnose, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      //   queryClient.invalidateQueries(queryKeys.allImages()); // Invalidate queries to refresh data
      console.log(`Make Diagnose Success`); // Success handling (optional)
    },
  });
}

