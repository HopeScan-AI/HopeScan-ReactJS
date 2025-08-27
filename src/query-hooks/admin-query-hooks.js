import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";

export const queryKeys = {
  adminUsers: () => ["admin-users"],
  adminUser: (id) => ["admin-user" + id],
  deleteUser: () => ["delete-user"],
  adminProviders: () => ["admin-providers"],
  adminProvider: (id) => ["admin-providers" + id],
  adminPlans:() => ["admin-plans"],
};

export function useAdminAllUsers(enabled = true) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.adminUsers(), // Unique query key for caching
    queryFn: () => sendApiRequest(`user/?${queryString}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

export function useAdminGetUserData(id) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.adminUser(id), // Unique query key for caching
    queryFn: () => sendApiRequest(`user/${id}`, "GET"), // API call to fetch filtered campaigns
    // enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const RemoveUser = async (id) => {
  return sendApiRequest(`user/${id}`, "DELETE", undefined, {});
};
export function useRemoveUser() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: RemoveUser, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: (id) => {
      queryClient.invalidateQueries(queryKeys.adminUsers(id)); // Invalidate queries to refresh data
      console.log(`Remove User Success`); // Success handling (optional)
    },
  });
}

const adminUpdateUser = async ({ id, data }) => {
  console.log(id);
  console.log(data);
  return sendApiRequest(`user/${id}`, "PUT", undefined, data);
};
export function useAdminUpdateUser() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: adminUpdateUser, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminUsers()); // Invalidate queries to refresh data
      console.log(`Update User Success`); // Success handling (optional)
    },
  });
}

const adminCreateUser = async (data) => {
  console.log(data);
  return sendApiRequest(`user/`, "POST", undefined, data);
};
export function useAdminCreateUser() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: adminCreateUser, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminUsers()); // Invalidate queries to refresh data
      console.log(`Create User Success`); // Success handling (optional)
    },
  });
}



export function useAllProviders(enabled = true) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.adminProviders(), // Unique query key for caching
    queryFn: () => sendApiRequest(`provider/?${queryString}`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const removeProvider = async (id) => {
  return sendApiRequest(`provider/${id}`, "DELETE", undefined, {});
};
export function useRemoveProvider() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: removeProvider, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: (id) => {
      queryClient.invalidateQueries(queryKeys.adminProviders()); // Invalidate queries to refresh data
      console.log(`Remove Provider Success`); // Success handling (optional)
    },
  });
}

const updateProvider = async ({ id, data }) => {
  console.log(id);
  console.log(data);
  return sendApiRequest(`provider/${id}`, "PUT", undefined, data);
};
export function useUpdateProvider() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: updateProvider, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminProviders()); // Invalidate queries to refresh data
      queryClient.invalidateQueries(queryKeys.adminProvider(id)); // Invalidate queries to refresh data
      console.log(`Update provider Success`); // Success handling (optional)
    },
  });
}

const createProvider = async (data) => {
  console.log(data);
  return sendApiRequest(`provider/`, "POST", undefined, data);
};
export function useCreateProvider() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: createProvider, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminProviders()); // Invalidate queries to refresh data
      console.log(`Create Provider Success`); // Success handling (optional)
    },
  });
}


export function useAllPlans(enabled = true) {
  // let isAdmin = userRole === ROLE.ADMIN; // Check if user is an admin
  const queryString = [].filter(Boolean).join("&"); // Construct query string based on filters

  const data = useQuery({
    queryKey: queryKeys.adminPlans(), // Unique query key for caching
    queryFn: () => sendApiRequest(`plans/`, "GET"), // API call to fetch filtered campaigns
    enabled, // Enable query based on provided flag
    //keepPreviousData: true, // Keep previous data while fetching new data
  });

  return data;
}

const createPlan = async (data) => {
  console.log(data);
  return sendApiRequest(`plans/`, "POST", undefined, data);
};
export function useCreatePlan() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: createPlan, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminPlans()); // Invalidate queries to refresh data
      console.log(`Create Plan Success`); // Success handling (optional)
    },
  });
}


const updatePlan = async ({ id, data }) => {
  console.log(data);
  return sendApiRequest(`plans/${id}`, "PUT", undefined, data);
};
export function useUpdatePlan() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: updatePlan, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.adminPlans()); // Invalidate queries to refresh data
      console.log(`Update Plan Success`); // Success handling (optional)
    },
  });
}

const removePlan = async (id) => {
  return sendApiRequest(`plans/${id}`, "DELETE", undefined, {});
};
export function useRemovePlan() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: removePlan, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: (id) => {
      queryClient.invalidateQueries(queryKeys.adminPlans()); // Invalidate queries to refresh data
      console.log(`Remove Plan Success`); // Success handling (optional)
    },
  });
}