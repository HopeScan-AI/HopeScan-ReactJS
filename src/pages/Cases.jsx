import React, {
  StrictMode,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Dropdown,
  Select,
} from "flowbite-react";
import sendApiRequest from "../api";

import { capitalize, formatDate } from "../utils/helper";

import { CircularProgress } from "@mui/material";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useRemoveUser } from "../query-hooks/admin-query-hooks";
import { ToastContainer, toast } from "react-toastify";

import ConfirmDelete from "../assets/icons/ConfirmDelete";
import { useTranslation } from "react-i18next";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import {
  useAllUserCases,
  useCreateCase,
  useRemoveCase,
  useUpdateCase,
  useAllProviders,
} from "../query-hooks/cases-query-hooks";

import { useAdminGetUserData } from "../query-hooks/admin-query-hooks";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";

const Cases = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { user } = useAuth();

  const { data: cases, isPending: isPendingCases } = useAllUserCases();

  //   const [providers, setProviders] = useState([]);
  //   console.log(providers);
  //   const { data: providersData, isPending: isPendingProvidersData } =
  //     useAllProviders();

  //   useEffect(() => {
  //     setProviders(providersData);
  //   }, [providersData]);
  //   console.log(providers);

  //   const getUserData = async (id) => {
  //     const { data: user, isPending: isPendingUser } = useAdminGetUserData(id);
  //     return user;
  //   }

  //   function getProviderIdByName(name) {
  //     const providerObj = providers?.find(
  //       (provider) => provider?.provider?.name === name
  //     );
  //     return providerObj ? providerObj?.provider_id : null; // Return provider_id or null if not found
  //   }

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log(cases);
    if (cases && Array.isArray(cases)) {
      setRowData(() => []);
      cases?.map((c, i) => {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            "#": i + 1,
            NAME: c.name,
            ID: c.id,
            "CREATE DATE": c ? formatDate(c?.created_at) : "",
            PROVIDER: c?.creator?.name,
            INSTITUTION: c?.owner?.name,
            COMMENTS: c.comments,
            ACTION: c,
          },
        ]);
      });
    }
  }, [cases]);

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
      field: "CREATE DATE",
      checkboxSelection: false,
      minWidth: 160,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "PROVIDER",
      checkboxSelection: false,
      minWidth: 160,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "INSTITUTION",
      checkboxSelection: false,
      minWidth: 160,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "COMMENTS",
      checkboxSelection: false,
      minWidth: 160,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "ACTION",
      minWidth: 180,
      flex: 0.7,
      filter: false,
      sortable: false,
      cellRenderer: (params) => <Action caseObj={params.value} />,
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

  const { mutateAsync: mutateAsyncCreateCase } = useCreateCase();

  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = useState(false);
  const [addCaseLoading, setAddCaseLoading] = useState(false); // Loader state
  const [caseName, setCaseName] = useState("");
  const [caseDate, setCaseDate] = useState("");
  const [caseComments, setCaseComments] = useState("");
  const [caseOwner, setCaseOwner] = useState("");
  const [caseProvider, setCaseProvider] = useState("");
  const [addCaseError, setAddCaseError] = useState("");
  const handleOpenAddCaseModal = () => setIsAddCaseModalOpen(true);
  const handleCloseAddCaseModal = () => setIsAddCaseModalOpen(false);

  const handleAddCaseFormSubmit = async () => {
    if (!caseName || !caseDate || !caseOwner) {
      setAddCaseError("Please Fill All Case Fields");
      return;
    }

    setAddCaseLoading(true);
    const response = await mutateAsyncCreateCase({
      name: caseName,
      create_date: caseDate,
      comments: caseComments,
      owner_id: caseOwner,
      provider_id: caseProvider,
    });

    if (response && response.ok) {
      console.log(response);
      toast.success("Case Created Successfully", {
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
      toast.error("Case Creation Failed", {
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
    setCaseName("");
    setCaseComments("");
    setCaseDate("");
    setCaseOwner("");
    setCaseProvider("");
    setAddCaseError("");
    setAddCaseLoading(false);
    handleCloseAddCaseModal();
  };

  return (
    <div className="">
      <div className="relative flex ">
        <div className="pink-banner"></div>
        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12 mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("cases.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("cases.home")}</span> >{" "}
                <span>{t("cases.theCases")}</span>
              </p>
            </div>

            <div>
              <button
                className="white-btn w-full sm:w-auto flex items-center"
                onClick={handleOpenAddCaseModal}
              >
                <span className="text-[24px] mx-2">+</span>
                {t("cases.add")}
              </button>
            </div>
          </div>
          <div className="ag-wrapper h-[707px] sm:h-[669px] overflow-hidden">
            <div className={"ag-theme-quartz "} style={{ height: 600 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 gap-3">
                <div>
                  <p>
                    {t("cases.total")}{" "}
                    <span className="mx-1">{cases ? cases?.length : 0}</span>{" "}
                    {t("cases.cases")}
                  </p>
                </div>
                <div className="relative search-warper">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder={t("cases.search")}
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
        show={isAddCaseModalOpen}
        size="md"
        onClose={handleCloseAddCaseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 gap-x-3 grid grid-cols-2">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("cases.caseModal.title")}
            </h3>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="caseName" value={t("cases.caseModal.name")} />
              </div>
              <TextInput
                id="caseName"
                placeholder={t("cases.caseModal.name")}
                value={caseName}
                onChange={(event) => setCaseName(event.target.value)}
                onChange={(event) => setCaseName(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="caseDate" value={t("cases.caseModal.date")} />
              </div>
              <TextInput
                id="caseDate"
                type="date"
                value={caseDate}
                onChange={(event) => setCaseDate(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseComments"
                  value={t("cases.caseModal.comments")}
                />
              </div>
              <TextInput
                id="caseComments"
                placeholder={t("cases.caseModal.commentsPlaceholder")}
                value={caseComments}
                onChange={(event) => {
                  setCaseComments(event.target.value);
                }}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <div className="mb-2 block">
                <Label htmlFor="caseOwner" value={t("cases.caseModal.owner")} />
              </div>

              <Select
                id="caseOwner"
                value={caseOwner}
                onChange={(event) => {
                  setCaseOwner(event.target.value);
                }}
                required
              >
                {/* Placeholder option */}
                <option key={0} value="" disabled>
                  {t("cases.caseModal.ownerSelect")}
                </option>{" "}
                <option key={user?.id} value={user?.id}>
                  {user?.name}
                </option>{" "}
                {user?.owners?.map((owner) => (
                  <option key={owner?.owner_id} value={owner?.owner_id}>
                    {owner?.owner_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="col-span-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseProvider"
                  value={t("cases.caseModal.provider")}
                />
              </div>

              <Select
                id="caseProvider"
                value={caseProvider}
                onChange={(event) => {
                  setCaseProvider(event.target.value);
                }}
                required
              >
                {/* Placeholder option */}
                <option key={0} value="" disabled>
                  {t("cases.caseModal.providerSelect")}
                </option>{" "}
                <option key={user?.id} value={user?.id}>
                  {user?.name}
                </option>{" "}
                {user?.providers?.map((provider) => (
                  <option
                    key={provider?.provider_id}
                    value={provider?.provider_id}
                  >
                    {provider?.provider_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="col-span-2 w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleAddCaseFormSubmit()}
              >
                {addCaseLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("cases.caseModal.submitting")}</span>
                  </div>
                ) : (
                  t("cases.caseModal.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{addCaseError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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

const Action = ({ caseObj }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [loading, setLoading] = useState(false); // Loader state

  const { mutateAsync: mutateAsyncRemoveCase } = useRemoveCase();

  const handleOnSubmitDeleteCase = async (id) => {
    setLoading(true);
    const response = await mutateAsyncRemoveCase(id);
    if (response && response != 404) {
      console.log(response);
      toast.success("Case Removed Successfully", {
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
      toast.error("Remove Case Failed", {
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
  };

  const { mutateAsync: mutateAsyncUpdateCase } = useUpdateCase();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false); // Loader state
  const [caseName, setCaseName] = useState(caseObj?.name);
  const [caseComments, setCaseComments] = useState(caseObj?.comments);
  const [caseOwner, setCaseOwner] = useState(caseObj?.owner?.id);
  const [caseProvider, setCaseProvider] = useState(caseObj?.creator?.id);

  const [caseEditError, setCaseEdirError] = useState("");
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditCaseFormSubmit = async (id) => {
    if (!caseName || !caseOwner || !caseProvider) {
      setCaseEdirError("Please Fill All Case Fields");
      return;
    }
    setEditLoading(true);

    const response = await mutateAsyncUpdateCase({
      id: id,
      data: {
        name: caseName,
        comments: caseComments,
        owner: caseOwner.toString(),
        provider: caseProvider.toString(),
      },
    });
    console.log(response);

    if (response && response.ok) {
      console.log(response);
      toast.success("Case Edited Successfully", {
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
      toast.error("Edit Case Failed", {
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
    setEditLoading(false);
    handleCloseEditModal();
    setCaseEdirError("");
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-5 ">
        <button className="border p-1 rounded-md  bg-white hover:bg-blue-400 hover:text-white transition">
          <RemoveRedEyeOutlined
            className="!text-[20px]"
            onClick={() =>
              user.role == "admin"
                ? navigate(`/dashboard/cases/${caseObj?.id}`)
                : navigate(`/cases/${caseObj?.id}`)
            }
          />
        </button>

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
              {t("cases.deleteCase.title")}
            </h3>

            <p className="text-[14px] text-center  text-gray-500 dark:text-white">
              {t("cases.deleteCase.description")}
            </p>

            <div className="">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] "
                onClick={() => handleOnSubmitDeleteCase(caseObj?.id)}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress color="white" size={24} />
                    {t("cases.deleteCase.deleting")}
                  </div>
                ) : (
                  t("cases.deleteCase.confirm")
                )}{" "}
              </Button>
            </div>

            <button
              className="text-gray-400 text-[14px] underline"
              onClick={handleCloseDeleteModal}
            >
              {t("cases.deleteCase.cancel")}
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
          <div className="space-y-6 gap-x-3 grid grid-cols-2">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("cases.editCase.title")}
            </h3>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseName"
                  value={t("cases.editCase.nameLabel")}
                />
              </div>
              <TextInput
                id="caseName"
                placeholder={t("cases.editCase.nameLabel")}
                value={caseName}
                onChange={(event) => setCaseName(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseComment"
                  value={t("cases.editCase.commentLabel")}
                />
              </div>
              <TextInput
                id="caseComment"
                placeholder={t("cases.editCase.commentLabel")}
                value={caseComments}
                onChange={(event) => setCaseComments(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseOwner"
                  value={t("cases.editCase.ownerLabel")}
                />
              </div>

              <Select
                id="caseOwner"
                value={caseOwner}
                onChange={(event) => {
                  setCaseOwner(event.target.value);
                }}
                required
              >
                {/* Placeholder option */}
                <option key={0} value="" disabled>
                  {t("cases.editCase.ownerSelect")}
                </option>{" "}
                <option key={user?.id} value={user?.id}>
                  {user?.name}
                </option>{" "}
                {user?.owners?.map((owner) => (
                  <option key={owner?.owner_id} value={owner?.owner_id}>
                    {owner?.owner_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="col-span-1">
              <div className="mb-2 block">
                <Label
                  htmlFor="caseProvider"
                  value={t("cases.editCase.providerLabel")}
                />
              </div>

              <Select
                id="caseProvider"
                value={caseProvider}
                onChange={(event) => {
                  setCaseProvider(event.target.value);
                }}
                required
              >
                {/* Placeholder option */}
                <option key={0} value="" disabled>
                  {t("cases.editCase.providerSelect")}
                </option>{" "}
                <option key={user?.id} value={user?.id}>
                  {user?.name}
                </option>{" "}
                {user?.providers?.map((provider) => (
                  <option
                    key={provider?.provider_id}
                    value={provider?.provider_id}
                  >
                    {provider?.provider_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="col-span-2 w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleEditCaseFormSubmit(caseObj?.id)}
              >
                {editLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span> {t("cases.editCase.submitting")}</span>
                  </div>
                ) : (
                  t("cases.editCase.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{caseEditError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cases;
