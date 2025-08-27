import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
  //   BiBuoy
} from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

import { NavLink } from "react-router-dom";
const SideBar = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {user?.role == "admin"&& (
              <Sidebar.Item href="#" icon={HiUser}>
                <NavLink to={"/dashboard/users"}>Users</NavLink>
              </Sidebar.Item>
            )}
            {(user?.role == "admin"  || user?.role == "user" || user?.role == "institution" ) && <Sidebar.Item href="#" icon={HiTable}>
              <NavLink to={"/dashboard/cases"}>Cases</NavLink>
            </Sidebar.Item>}

           { (user?.role == "admin"  ||  user?.role == "institution" ) &&  <Sidebar.Item href="#" icon={HiShoppingBag}>
              <NavLink to={"/dashboard/providers"}>Providers</NavLink>
            </Sidebar.Item>}

            {/* <Sidebar.Item href="#" icon={HiInbox}>
                <Link to={"/dashboard/hope-images"}>Hope Images</Link>
              </Sidebar.Item> */}
           {(user?.role == "admin" || user?.role == "annotator" ) && <Sidebar.Collapse open={true} icon={HiInbox} label="Hope Images">
              <Sidebar.Item href="#">
                <NavLink to={"/dashboard/hope-images/all-images"}>
                  All Images
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item href="#">
                <NavLink to={"/dashboard/hope-images/pending-diagnose"}>
                  Pending Diagnose
                </NavLink>
              </Sidebar.Item>
              <Sidebar.Item to={"#"}>
                <NavLink to={"/dashboard/hope-images/images-results"}>
                  Results
                </NavLink>
              </Sidebar.Item>
            </Sidebar.Collapse>}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="w-full relative">{children}</div>
    </div>
  );
};

export default SideBar;
