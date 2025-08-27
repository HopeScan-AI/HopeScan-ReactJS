import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigationType
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Cases from "./pages/Cases.jsx";
import Providers from "./pages/Providers.jsx";
import CaseDetails from "./pages/CaseDetails.jsx";
import AllImages from "./pages/AllImages.jsx";
import PendingDiagnoseImages from "./pages/PendingDiagnoseImages.jsx";
import ImagesResults from "./pages/ImagesResults.jsx";
import MyDBA from "./pages/MyDBA.jsx";
import Plans from "./pages/Plans.jsx";
import MyDBATable from "./pages/MyDBATable.jsx";
import DiagnoseImage from "./pages/DiagnoseImage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import FAQs from "./pages/FAQs.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Pricing from "./pages/Pricing.jsx";
import ContactUs from "./pages/ContactUs.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import "./fonts.css";

function App() {
  const queryClient = new QueryClient();
  const { user } = useAuth();



  // const location = useLocation();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div
            className={user ? "flex relative bg-[#F7F7F7] min-h-screen" : ""}
          >
            <div className="w-full">
              <Navbar />

              <div className="mt-[64px] min-h-[57vh]">
              <ScrollToTop />
                <Routes>
                  {/* Home route */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<LandingPage  sectionId="home" />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/FAQs" element={<FAQs />} />
                  <Route path="/howitworks" element={<LandingPage sectionId="howitworks"/>} />
                  <Route path="/pricing" element={<LandingPage sectionId="pricing"/>} />
                  <Route path="/contactus" element={<LandingPage sectionId="contactus"/>} />

                  {/* Login route */}
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="/users" element={<Users />} /> */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: <Navigate to="/dashboard/users" />,
                          annotator: (
                            <Navigate to="/dashboard/hope-images/all-images" />
                          )
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/users"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            // <SideBar>
                            <Users />
                            // </SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/cases"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <Cases />
                            // </SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/cases"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          user: <Cases />,
                          institution: <Cases />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/cases/:id"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <CaseDetails />
                            //</SideBar>
                          ),
  
                        }}
                      />
                    }
                  />
                  <Route
                    path="/cases/:id"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          user: <CaseDetails />,
                          institution: <CaseDetails />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/providers"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          institution: <Providers />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/providers"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <Providers />
                            //</SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/hope-images/all-images"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <AllImages />
                            // </SideBar>
                          ),
                          annotator: (
                            //<SideBar>
                            <AllImages />
                            //</SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/hope-images/pending-diagnose"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <PendingDiagnoseImages />
                            // </SideBar>
                          ),
                          annotator: (
                            // <SideBar>
                            <PendingDiagnoseImages />
                            // </SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/hope-images/images-results"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: (
                            //<SideBar>
                            <ImagesResults />
                            // </SideBar>
                          ),
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/mydba"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: <MyDBA />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/plans"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: <Plans />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/dashboard/myDBA/show/:tableName"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: <MyDBATable />,
                        }}
                      />
                    }
                  />
                  <Route
                    path="/diagnose"
                    element={
                      <ProtectedRoute
                        roleComponents={{
                          admin: <DiagnoseImage />,
                          institution: <DiagnoseImage />,
                          user: <DiagnoseImage />,
                          annotator: <DiagnoseImage />,
                        }}
                      />
                    }
                  />

                  {/* Not Found and Not Authorized pages */}
                  <Route path="*" element={<LandingPage />} />
                  <Route
                    path="/not-authorized"
                    element={<div className="h-[60vh]"> not authorized</div>}
                  />
                </Routes>
              </div>

              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
