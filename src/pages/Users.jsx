import React, {
  StrictMode,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Dropdown,
  Select,
} from "flowbite-react";

import { capitalize } from "../utils/helper";

import { CircularProgress } from "@mui/material";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useRemoveUser } from "../query-hooks/admin-query-hooks";
import { ToastContainer, toast } from "react-toastify";

import ConfirmDelete from "../assets/icons/ConfirmDelete";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import {
  useAdminAllUsers,
  useAdminUpdateUser,
  useAdminCreateUser,
} from "../query-hooks/admin-query-hooks";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";

const Users = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { data: users, isPending: isPendingUsers } = useAdminAllUsers();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log(users);
    if (users && Array.isArray(users)) {
      setRowData(() => []);
      users?.map((user, i) => {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            "#": i + 1,
            NAME: user.name,
            ID: user.id,
            EMAIL: user.email,
            RULE: user.role,
            "IS VERIFIED": user.is_verified,
            ACTION: user,
          },
        ]);
      });
    }
  }, [users]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "#",
      checkboxSelection: true,
      minWidth: 90,
      flex: 0.4,
      filter: false,
      headerCheckboxSelection: <tr></tr>,
      headerClass: "whitespace-normal",
    },
    {
      field: "NAME",
      checkboxSelection: false,
      minWidth: 180,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "ID",
      checkboxSelection: false,
      minWidth: 120,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "EMAIL",
      checkboxSelection: false,
      minWidth: 200,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "RULE",
      checkboxSelection: false,
      minWidth: 100,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "IS VERIFIED",
      checkboxSelection: false,
      minWidth: 110,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      cellRenderer: (params) => <IsVerified param={params.value} />,
    },
    {
      field: "ACTION",
      minWidth: 120,
      flex: 0.7,
      filter: false,
      sortable: false,
      cellRenderer: (params) => <Action user={params.value} />,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: false,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const gridRef = useRef();

  const onGridReady = true;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const { mutateAsync: mutateAsyncCreateUser } = useAdminCreateUser();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false); // Loader state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [userIsVerified, setUserIsVerified] = useState(false);
  const [addError, setAddError] = useState("");
  const handleOpenAddUserModal = () => setIsAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);

  const handleAddUserFormSubmit = async () => {
    if (!userEmail || !userName || !userPassword) {
      setAddError("Please Fill Required Fields");
      return;
    }
    setAddUserLoading(true);

    const response = await mutateAsyncCreateUser({
      name: userName,
      email: userEmail,
      password: userPassword,
      role: userType,
      is_verified: userIsVerified,
    });

    if (response && response != 404) {
      console.log(response);
      toast.success("User Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Add User Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleCloseAddUserModal();
    setAddUserLoading(false);
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserType("user");
    setUserIsVerified(false);
    setAddError("");
  };

  return (
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>
        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12 mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("users.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("users.home")}</span> >{" "}
                <span>{t("users.theUsers")}</span>
              </p>
            </div>

            <div>
              <button
                className="white-btn w-full sm:w-auto flex items-center"
                onClick={handleOpenAddUserModal}
              >
                <span className="text-[24px] mx-2">+</span>
                {t("users.add")}
              </button>
            </div>
          </div>
          <div className="ag-wrapper h-[707px] sm:h-[669px] overflow-hidden">
            <div className={"ag-theme-quartz "} style={{ height: 600 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 gap-3">
                <div>
                  <p>
                    {t("users.total")}{" "}
                    <span className="mx-1">{users ? users?.length : 0}</span>{" "}
                    {t("users.users")}
                  </p>
                </div>
                <div className="relative search-warper">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder={t("users.search")}
                    onInput={onFilterTextBoxChanged}
                    className="w-full sm:w-72 custom-input"
                  />
                </div>
              </div>

              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                modules={[ClientSideRowModelModule]}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                rowHeight={60}
                headerHeight={55}
                enableClickSelectio={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
                getRowStyle={() => ({
                  maxHeight: "65px",
                  // border: "1px solid #DDDDDD",
                })}
                onGridReady={onGridReady}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isAddUserModalOpen}
        size="md"
        onClose={handleCloseAddUserModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 grid grid-cols-2 gap-x-3">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("users.userModal.title")}
            </h3>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userName" value={t("users.userModal.name")} />
              </div>
              <TextInput
                id="userName"
                placeholder={t("users.userModal.namePlaceholder")}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userEmail" value={t("users.userModal.email")} />
              </div>
              <TextInput
                id="userEmail"
                placeholder="name@company.com"
                type="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="userPassword"
                  value={t("users.userModal.password")}
                />
              </div>
              <TextInput
                id="userPassword"
                type="password"
                placeholder="**********"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userType" value={t("users.userModal.role")} />
              </div>

              <Select
                id="userType"
                value={capitalize(userType)}
                onChange={(event) =>
                  setUserType(event.target.value.toLowerCase())
                }
                required
              >
                <option>User</option>
                <option>Admin</option>
                <option>Annotator</option>
                <option>Institution</option>
              </Select>
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="userType"
                  value={t("users.userModal.isVerified")}
                />
              </div>
              <Select
                id="userIsVerified"
                value={userIsVerified == true ? "True" : "False"}
                onChange={(event) =>
                  setUserIsVerified(event.target.value == "True")
                }
                required
              >
                <option>True</option>
                <option>False</option>
              </Select>
            </div>

            <div className="w-full col-span-2">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleAddUserFormSubmit()}
              >
                {addUserLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("users.userModal.submitting")} </span>
                  </div>
                ) : (
                  t("users.userModal.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{addError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Action = ({ user }) => {
  const { t } = useTranslation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [loading, setLoading] = useState(false); // Loader state

  const { mutateAsync: mutateAsyncRemoveUser } = useRemoveUser();

  const handleOnSubmitDeleteUser = async (id) => {
    setLoading(true);
    const response = await mutateAsyncRemoveUser(id);
    if (response && response != 404) {
      console.log(response);
      toast.success("User Removed Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Remove User Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleCloseDeleteModal();
    console.log(id);
  };

  const { mutateAsync: mutateAsyncUpdateUser } = useAdminUpdateUser();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false); // Loader state
  const [userName, setUserName] = useState(user?.name);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState(user?.role);
  const [userIsVerified, setUserIsVerified] = useState(user?.is_verified);

  const [editError, setEditError] = useState("");
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditUserFormSubmit = async (id) => {
    if (!userEmail || !userName || !userType || !userIsVerified) {
      setEditError("Please Fill Required Fields");
      return;
    }
    setEditLoading(true);

    const response = await mutateAsyncUpdateUser({
      id: id,
      data: {
        name: userName,
        email: userEmail,
        role: userType,
        is_verified: userIsVerified,
        ...(userPassword !== "" && { password: userPassword }),
      },
    });

    if (response && response.ok) {
      console.log(response);
      toast.success("User Edited Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Edit User Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleCloseEditModal();
    console.log(id);
  };
  return (
    <>
      <div className="flex items-center gap-5">
        <button className="border p-1 rounded-md  bg-white hover:bg-blue-400 hover:text-white transition">
          <EditOutlinedIcon
            className="!text-[20px]"
            onClick={handleOpenEditModal}
          />
        </button>
        <button
          className="border p-1 rounded-md  bg-white hover:bg-red-500 hover:text-white transition"
          onClick={handleOpenDeleteModal}
        >
          <DeleteOutlinedIcon className="!text-[20px]" />
        </button>
      </div>
      <Modal
        show={isDeleteModalOpen}
        size="md"
        onClose={handleCloseDeleteModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex flex-col items-center justify-center">
            <ConfirmDelete />
            <h3 className="text-[18px] text-center font-medium text-gray-900 dark:text-white">
              {t("users.deleteUser.title")}
            </h3>

            <p className="text-[14px] text-center  text-gray-500 dark:text-white">
              {t("users.deleteUser.description")}
            </p>

            <div className="">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] "
                onClick={() => handleOnSubmitDeleteUser(user?.id)}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress color="white" size={24} />{" "}
                    {t("users.deleteUser.deleting")}
                  </div>
                ) : (
                  t("users.deleteUser.confirm")
                )}{" "}
              </Button>
            </div>

            <button
              className="text-gray-400 text-[14px] underline"
              onClick={handleCloseDeleteModal}
            >
              {t("users.deleteUser.cancel")}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isEditModalOpen}
        size="md"
        onClose={handleCloseEditModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 grid grid-cols-2 gap-x-3">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
            {t("users.editUser.title")}
            </h3>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userName" value={t("users.editUser.nameLabel")} />
              </div>
              <TextInput
                id="userName"
                placeholder={t("users.editUser.namePlaceholder")}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="custom-input"
                required
              />
            </div >
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userEmail" value={t("users.editUser.emailLabel")} />
              </div>
              <TextInput
                id="userEmail"
                placeholder={t("users.editUser.emailPlaceholder")}
                type="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userPassword" value={t("users.editUser.passwordLabel")} />
              </div>
              <TextInput
                id="userPassword"
                type="password"
                placeholder="**********"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userType" value={t("users.editUser.roleLabel")} />
              </div>

              <Select
                id="userType"
                value={capitalize(userType)}
                onChange={(event) =>
                  setUserType(event.target.value.toLowerCase())
                }
                required
              >
                <option>Admin</option>
                <option>User</option>
                <option>Annotator</option>
                <option>Institution</option>
              </Select>
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="userType" value={t("users.editUser.isVerifiedLabel")} />
              </div>
              <Select
                id="userIsVerified"
                value={userIsVerified == true ? "True" : "False"}
                onChange={(event) =>
                  setUserIsVerified(event.target.value == "True")
                }
                required
              >
                <option>True</option>
                <option>False</option>
              </Select>
            </div>

            <div className="w-full col-span-2">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleEditUserFormSubmit(user?.id)}
              >
                {editLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("users.editUser.submitting")}</span>
                  </div>
                ) : (
                  t("users.editUser.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{editError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const IsVerified = ({ param }) => {
  return (
    <div
      className={`border-[1px] rounded-[4px] px-2 ${
        param
          ? "bg-[#F0FEEB] text-[#58B039] border-[#CCEFC0]"
          : "bg-[#F8F8F9] text-[#464F60] border-[#E6E6E6]"
      }`}
    >
      {param ? "Verified" : "Not Verified"}
    </div>
  );
};
const Rule = ({ param }) => {
  return (
    <div
      className={`bg-[#F3F7FA] text-[#1761A0] border-[1px] rounded-[4px] px-2 border-[#1761A0] border-opacity-[32%]`}
    >
      {param}
    </div>
  );
};

export default Users;
