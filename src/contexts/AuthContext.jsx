
import { createContext, useState, useEffect, useContext } from "react";
import { setAuthenticationHeaders, API_BASE_URL} from "../api/send-api-request";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  // let storedUser = "";
  // let storedToken = "";
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          const userInfo = JSON.parse(storedUser);
          setAuthenticationHeaders({
            Authorization: storedToken ? `Bearer ${storedToken}` : "",
          });
          setUser(userInfo);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
      setLoading(false); // Set loading to false once user data is loaded
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      // API call to authenticate the user
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      const { access_token, user } = response.data; // the API returns { user, accessToken }

      // Store user and token in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);

      // Set axios authorization headers
      setAuthenticationHeaders({
        ["Authorization"]: access_token ? "Bearer " + access_token : "",
      });

      // Set the user in state
      setUser(JSON.stringify(user));
      
      return { status: response.status, user };
    } catch (error) {
      // Handle error scenarios
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error response data:", error.response.data);
        return { status: error.response.status, user: null };
      } else if (error.request) {
        console.error("No response received:", error.request);
        return { status: 404, user: null };
      } else {
        console.error("Error during request setup:", error.message);
        return { status: 500, user: null };
      }
    }
  };

  const logout = async () => {
    // Clear the user and token from localStorage and state
    const token = localStorage.getItem("token")
    console.log(token)

    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {headers:{
        Authorization: token ? `Bearer ${token}` : "",
      }}
    );
    console.log(response);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // Return loading state in the context value
  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
