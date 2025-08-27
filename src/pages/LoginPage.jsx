import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext"; // Import the authentication context
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth(); // Get the login function from the AuthContext
  const [error, setError] = useState(""); // For handling login errors
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Redirect back to the protected route or default to '/'

  useEffect(() => {
    if (user) navigate(from);
  }, [user]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // Call the login function from AuthContext to handle the login
    const { status, user } = await login(email, password);
    if (status == 201 || status == 204) {
      // If login is successful, redirect to the dashboard
      setError("");

      // Add a short delay before navigating
      setTimeout(() => {
        navigate(from); // Redirect to the page they tried to access
      }, 2000); // 500 ms delay, adjust as needed

      navigate(from); // Redirect to the page they tried to access
    } else if (status == 404) {
      setError("Incorrect Email or Password");
    } else {
      setError("Log in Error, Please try again.");
    }
  };

  return user ? null : (
    <div className="login-container">
      <div className="left-section">
        <div className="bg-left-section ">
          <svg
            viewBox="0 0 1136 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // preserveAspectRatio="none"
            preserveAspectRatio="xMidYMid slice"
            className="overflow-visible"
          >
            <g>
              <path
                d="M1136 0H-4V899.379H468.019C488.5 899.379 576.301 871.879 647.879 763.912C759.974 594.833 742.65 314.732 885.316 146.671C982.571 32.1049 1088.61 0 1136 0Z"
                fill="#FFA301"
              />
            </g>

            <g
              transform="translate(0, 0) scale(1)"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="645"
                cy="657"
                r="148.5"
                fill="#FFF1D8"
                stroke="#FFA200"
              />
              <path
                d="M668.307 608.753H589.011V630.769H668.307V608.753Z"
                fill="#FFA301"
              />
              <path
                d="M699.102 718.846V740.867H668.825V740.632C668.696 740.717 668.567 740.79 668.421 740.867H589V718.846H699.102Z"
                fill="#FFA301"
              />
              <path
                d="M699.102 608.74C699.102 669.552 649.8 718.846 589 718.846V696.826C600.573 696.84 612.035 694.57 622.73 690.148C633.425 685.726 643.142 679.237 651.325 671.053C659.509 662.87 665.997 653.153 670.42 642.458C674.842 631.763 677.112 620.301 677.098 608.728L699.102 608.74Z"
                fill="#FFA301"
              />
              <path
                d="M688.092 573C691.515 573 694.798 574.36 697.219 576.781C699.64 579.201 701 582.484 701 585.908C701 589.331 699.64 592.614 697.219 595.035C694.798 597.455 691.515 598.815 688.092 598.815C684.669 598.815 681.386 597.455 678.965 595.035C676.544 592.614 675.185 589.331 675.185 585.908C675.185 582.484 676.544 579.201 678.965 576.781C681.386 574.36 684.669 573 688.092 573Z"
                fill="#FFA301"
              />
            </g>
          </svg>
        </div>
      </div>
      <form className="right-section flex flex-col items-center">
        <div className="flex flex-col justify-center items-center mb-7">
          <h1 className="login-title">Welcome to</h1>
          <img src={xx} alt="xx Logo" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="campaign.organizer@gmail.com"
          required
          className="login-input"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="************"
          required
          className="login-input"
        />
        <div className="flex justify-start  flex-col w-full">
          <span className="text-[#f00] text-[14px] mb-3">{error}</span>
          <button
            type="submit"
            onClick={handleSubmitLogin}
            className="w-full h-[50px] bg-[#FFA301] text-[#30303C]"
          >
            LOGIN
          </button>
          <div className="mt-[50px]">
            <a href="#" className="text-[#FFA301] underline">
              Forgot password?
            </a>
            <p className="text-[#FFA301]">
              Don’t have an account?{" "}
              <a href="" className="underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
