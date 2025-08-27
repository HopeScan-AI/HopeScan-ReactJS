// /auth/signup

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";

export const queryKeys = {
  //   adminUsers: () => ["admin-suers"],
};

const SignUp = async (data) => {
  return sendApiRequest(`auth/signup`, "POST", undefined, data);
};
export function useSignUp() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: SignUp, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      console.log(`Sign Up Success`); // Success handling (optional)
    },
  });
}

const sendVerificationCode = async (data) => {
  return sendApiRequest(`auth/send-verification-code`, "POST", undefined, data);
};
export function useSendVerificationCode() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: sendVerificationCode, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      console.log(`Verification Code Sent Success`); // Success handling (optional)
    },
  });
}


const VerifyEmail = async (data) => {
  return sendApiRequest(`auth/verify-code`, "POST", undefined, data);
};
export function useVerifyEmail() {
  const queryClient = useQueryClient(); // React Query's query client instance
  return useMutation({
    mutationFn: VerifyEmail, // Function to be called for the mutation
    onError: (err) => console.log("The error", err), // Error handling
    onSuccess: () => {
      console.log(`Verify Email Success`); // Success handling (optional)
    },
  });
}
