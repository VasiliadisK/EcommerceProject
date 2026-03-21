import { createContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getLoggedInUser, logout as logoutRequest } from "../http/authRequests";
import { queryClient } from "../http/queryClient";

import Spinner from "../components/sharedComponents/utilComponents/Spinner";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => {
      return getLoggedInUser();
    },
    retry: false,
  });

  const loggedInUser = data?.data ?? null;
  console.log(loggedInUser);

  const login = (userData) => {
    queryClient.setQueryData(["loggedInUser"], { data: userData });
  };

  const { mutate: logout } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.setQueryData(["loggedInUser"], null);
    },
  });

  const authContext = {
    loggedInUser,
    loggedInUsername: loggedInUser?.userName,
    loggedInRole: loggedInUser?.role,
    isAdmin: () => loggedInUser?.role === "ADMIN",
    isLoggedIn: loggedInUser !== null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {isLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}