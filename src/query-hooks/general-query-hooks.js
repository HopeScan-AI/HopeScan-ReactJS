import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";

export const queryKeys = {
  allNotifications: () => ["all-notifications"],
  respondInvitation: (id) => ["respond-invitation" + id],
};

export function useAllNotifications(enabled = true) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.allNotifications(), // Unique query key for caching
    queryFn: () => sendApiRequest(`notification/?${queryString}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const markNotificationAsRead = async (id) => {
  return sendApiRequest(`notification/${id}/mark-read`, "POST", undefined, {});
};
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: markNotificationAsRead, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.allNotifications()); // Invalidate queries to refresh data
      console.log(`Notification Marked As Read Success`); // Success handling (optional)
    },
  });
}

const respondInvitation = async (data) => {
  return sendApiRequest(
    `provider/respond-invitation`,
    "POST",
    undefined,
    data
  );
};
export function useRespondInvitation() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: respondInvitation, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.allNotifications()); // Invalidate queries to refresh data
      console.log(`Respond Invitation Success`); // Success handling (optional)
    },
  });
}

