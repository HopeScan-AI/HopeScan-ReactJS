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
import { ToastContainer, toast } from "react-toastify";

import ConfirmDelete from "../assets/icons/ConfirmDelete";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import { useAuth } from "../contexts/AuthContext";

import {
  useAllProviders,
  useUpdateProvider,
  useCreateProvider,
  useRemoveProvider,
} from "../query-hooks/admin-query-hooks";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";

const Providers = () => {
  const location = useLocation();
  const { data: providers, isPending: isPendingProviders } = useAllProviders();
  const [rowData, setRowData] = useState([]);
  const { t } = useTranslation();
  const { setUser } = useAuth();

  useEffect(() => {
    console.log(providers);
    if (providers && Array.isArray(providers)) {
      setRowData(() => []);
      providers?.map((provider, i) => {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            "#": i + 1,
            NAME: provider?.provider.name,
            ID: provider?.provider_id,
            EMAIL: provider?.provider?.email,
            STATUS: provider?.status,
            ACTION: provider,
          },
        ]);
      });
    }
  }, [providers]);

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
      minWidth: 80,
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
    // {
    //   field: "RULE",
    //   checkboxSelection: false,
    //   minWidth: 100,
    //   flex: 0.6,
    //   filter: true,
    //   headerCheckboxSelection: false,
    //   headerClass: "whitespace-normal",
    //   cellRenderer: (params) => <Rule param={params.value} />,
    // },
    {
      field: "STATUS",
      checkboxSelection: false,
      minWidth: 110,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      cellRenderer: (params) => <Status param={params.value} />,
    },
    {
      field: "ACTION",
      minWidth: 120,
      flex: 0.7,
      filter: false,
      sortable: false,
      cellRenderer: (params) => <Action provider={params.value} />,
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

  const { mutateAsync: mutateAsyncCreateProvider } = useCreateProvider();

  const [isAddProviderModalOpen, setIsAddProviderModalOpen] = useState(false);
  const [addProviderLoading, setAddProviderLoading] = useState(false); // Loader state
  const [providerEmail, setProviderEmail] = useState("");
  const [addError, setAddError] = useState("");
  const handleOpenAddProviderModal = () => setIsAddProviderModalOpen(true);
  const handleCloseAddProviderModal = () => {
    setIsAddProviderModalOpen(false);
    setAddError("");
  };

  const handleAddProviderFormSubmit = async () => {
    if (!providerEmail) {
      setAddError("Please Fill Provider Email");
      return;
    }
    setAddProviderLoading(true);

    const response = await mutateAsyncCreateProvider({
      user_email: providerEmail,
    });
    console.log(response);
    if (response && response != 404 && response != 400) {
      console.log(response);
      toast.success("Provider Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCloseAddProviderModal();
    } else {
      toast.error("Add Provider Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAddError("Somthin Went Wron, Please Try Again Later.");
    }

    if (response == 400) {
      setAddError("Provider Already Added.");
    }
    setAddProviderLoading(false);
    setProviderEmail("");

    setProviderIsVerified(false);
  };

  return (
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>
        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12 mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("providers.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("providers.home")}</span> >{" "}
                <span>{t("providers.theProviders")}</span>
              </p>
            </div>

            <div>
              <button
                className="white-btn w-full sm:w-auto flex items-center"
                onClick={handleOpenAddProviderModal}
              >
                <span className="text-[24px] mx-2">+</span>
                {t("providers.add")}
              </button>
            </div>
          </div>
          <div className="ag-wrapper h-[707px] sm:h-[669px] overflow-hidden">
            <div className={"ag-theme-quartz "} style={{ height: 600 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 gap-3">
                <div>
                  <p>
                  {t('providers.total')}{" "}
                    <span className="mx-1">
                      {providers ? providers?.length : 0}
                    </span>{" "}
                    {t('providers.providers')}
                  </p>
                </div>
                <div className="relative search-warper">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder={t('providers.search')}
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
        show={isAddProviderModalOpen}
        size="md"
        onClose={handleCloseAddProviderModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {t('providers.providerModal.title')}
            </h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="providerEmail" value={t('providers.providerModal.email')} />
              </div>
              <TextInput
                id="providerEmail"
                placeholder={t('providers.providerModal.emailPlaceholder')} 
                type="email"
                value={providerEmail}
                onChange={(event) => setProviderEmail(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleAddProviderFormSubmit()}
              >
                {addProviderLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t('providers.providerModal.submitting')}</span>
                  </div>
                ) : (
                  t('providers.providerModal.submit')
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

const Action = ({ provider }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [loading, setLoading] = useState(false); // Loader state

  const { mutateAsync: mutateAsyncRemoveProvider } = useRemoveProvider();

  const handleOnSubmitDeleteProvider = async (id) => {
    setLoading(true);
    const response = await mutateAsyncRemoveProvider(id);
    if (response && response.ok) {
      console.log(response);
      toast.success("Provider Removed Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // remove provider from local storage
      setUser((prevUser) => ({
        ...prevUser,
        providers: prevUser.providers.filter((provider) => provider.provider_id !== id),
      }));

    } else {
      toast.error("Remove Provider Failed", {
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

  const { mutateAsync: mutateAsyncUpdateProvider } = useUpdateProvider();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false); // Loader state
  const [providerName, setProviderName] = useState(provider?.name);
  const [providerEmail, setProviderEmail] = useState(provider?.email);
  const [providerPassword, setProviderPassword] = useState("");
  const [providerType, setProviderType] = useState(provider?.role);
  const [providerIsVerified, setProviderIsVerified] = useState(
    provider?.is_verified
  );

  const [editError, setEditError] = useState("");
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditUserFormSubmit = async (id) => {
    if (
      !providerEmail ||
      !providerName ||
      !providerType ||
      providerIsVerified
    ) {
      setEditError("Please Fill Required Fields");
      return;
    }
    setEditLoading(true);

    const response = await mutateAsyncUpdateUser({
      id: id,
      data: {
        name: providerName,
        email: providerEmail,
        role: providerType,
        is_verified: providerIsVerified,
        ...(providerPassword !== "" && { password: providerPassword }),
      },
    });

    if (response && response != 404) {
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
        {/* <button className="border p-1 rounded-md  bg-white hover:bg-blue-400 hover:text-white transition">
          <EditOutlinedIcon
            className="!text-[20px]"
            onClick={handleOpenEditModal}
          />
        </button> */}
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
              Are you sure you want to delete this Provider?
            </h3>

            <p className="text-[14px] text-center  text-gray-500 dark:text-white">
              This action can’t be undone
            </p>

            <div className="">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] "
                onClick={() => handleOnSubmitDeleteProvider(provider?.id)}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress color="white" size={24} /> Deleting
                    Provider
                  </div>
                ) : (
                  "Ok, Got it"
                )}{" "}
              </Button>
            </div>

            <button
              className="text-gray-400 text-[14px] underline"
              onClick={handleCloseDeleteModal}
            >
              Cancel
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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Provider
            </h3>
            {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="ProviderName" value="Your Name" />
                </div>
                <TextInput
                  id="userName"
                  placeholder="User Name"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  className="custom-input"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="userEmail" value="Your email" />
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="userPassword" value="Your password" />
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="userType" value="User Role" />
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="userType" value="Is Verified" />
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
              </div> */}

            <div className="w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleEditProviderFormSubmit(provider?.id)}
              >
                {editLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>Submit</span>
                  </div>
                ) : (
                  "Submit"
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

const Status = ({ param }) => {
  return (
    <div
      className={`border-[1px] rounded-[4px] px-2 ${
        param == "accepted"
          ? "bg-[#F0FEEB] text-[#58B039] border-[#CCEFC0]"
          : "bg-[#F8F8F9] text-[#464F60] border-[#E6E6E6]"
      }`}
    >
      {capitalize(param)}
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

export default Providers;
