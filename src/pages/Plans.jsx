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
  Textarea,
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

import {
  useAllPlans,
  useCreatePlan,
  useUpdatePlan,
  useRemovePlan,
} from "../query-hooks/admin-query-hooks";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";

const Plans = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { user } = useAuth();

  const { data: plans, isPending: isPendingPlans } = useAllPlans();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log(plans);
    if (plans && Array.isArray(plans)) {
      setRowData(() => []);
      plans?.map((p, i) => {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            "#": i + 1,
            TITLE: p?.name,
            ICON: p?.icon,
            "CREATE DATE": p && p.created_at ? formatDate(p?.created_at) : "",
            "NUMBER OF PROVIDERS": p?.num_of_providers,
            "IMAGE COST": p?.plan_type?.find((p) => p.name === "single")?.price,
            "#1 OFFER PRICE": p?.plan_type?.find((p) => p.name === "firstOffer")
              ?.price,
            "#1 OFFER PERIOD": p?.plan_type?.find(
              (p) => p.name === "firstOffer"
            )?.period,
            "#2 OFFER PRICE": p?.plan_type?.find(
              (p) => p.name === "secondOffer"
            )?.price,
            "#2 OFFER PERIOD": p?.plan_type?.find(
              (p) => p.name === "secondOffer"
            )?.period,
            ACTION: p,
          },
        ]);
      });
    }
  }, [plans]);

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
      field: "TITLE",
      checkboxSelection: false,
      minWidth: 160,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "ICON",
      checkboxSelection: false,
      minWidth: 90,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",

      cellRenderer: (params) => <Icon param={params.value} />,
      // cellRenderer: (params) =>   <div
      //     dangerouslySetInnerHTML={{ __html: params?.value }}
      //     className="flex items-center justify-center rounded-[16px] w-[68px] h-[68px] bg-[#DE6DAF]"
      //   >
      //     {" "}
      //   </div>,
    },
    {
      field: "NUMBER OF PROVIDERS",
      checkboxSelection: false,
      minWidth: 140,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "IMAGE COST",
      checkboxSelection: false,
      minWidth: 150,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "#1 OFFER PRICE",
      checkboxSelection: false,
      minWidth: 120,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "#1 OFFER PERIOD",
      checkboxSelection: false,
      minWidth: 130,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "#2 OFFER PRICE",
      checkboxSelection: false,
      minWidth: 130,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
    },
    {
      field: "#2 OFFER PERIOD",
      checkboxSelection: false,
      minWidth: 130,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
      // cellRenderer: (params) => <Rule param={params.value} />,
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
      field: "ACTION",
      minWidth: 180,
      flex: 0.7,
      filter: false,
      sortable: false,
      cellRenderer: (params) => <Action planObj={params.value} />,
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

  const { mutateAsync: mutateAsyncCreatePlan } = useCreatePlan();

  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [addPlanLoading, setAddPlanLoading] = useState(false); // Loader state

  const [planTitleEn, setPlanTitleEn] = useState("");
  const [planTitleAr, setPlanTitleAr] = useState("");

  const [offerOnePrice, setOfferOnePrice] = useState("");
  const [offerOneMonths, setOfferOneMonths] = useState("");

  const [offerTowPrice, setOfferTowPrice] = useState("");
  const [offerTowMonths, setOfferTowMonths] = useState("");

  const [numOfProviders, setNumOfProviders] = useState("");
  const [singleImagePrice, setSingleImagePrice] = useState("");

  const [planIcon, setPlanIcon] = useState("");

  const [addPlanError, setAddPlanError] = useState("");
  const handleOpenAddPlanModal = () => setIsAddPlanModalOpen(true);
  const handleCloseAddPlanModal = () => setIsAddPlanModalOpen(false);

  const handleAddPlanFormSubmit = async () => {
    if (
      !planTitleEn ||
      !planTitleAr ||
      numOfProviders == null ||
      numOfProviders == undefined ||
      !singleImagePrice ||
      !offerOnePrice ||
      !offerOneMonths ||
      !offerTowPrice ||
      !offerTowMonths ||
      !planIcon
    ) {
      setAddPlanError("Please Fill All Plan Fields");
      return;
    }

    setAddPlanLoading(true);
    const response = await mutateAsyncCreatePlan({
      name: planTitleEn,
      icon: planIcon,
      num_of_providers: numOfProviders,
      plan_type: [
        {
          name: "single",
          period: 0,
          price: singleImagePrice,
        },
        {
          name: "firstOffer",
          period: offerOneMonths,
          price: offerOnePrice,
        },
        {
          name: "secondOffer",
          period: offerTowMonths,
          price: offerTowPrice,
        },
      ],
    });

    if (response && response.ok) {
      console.log(response);
      toast.success("Plan Created Successfully", {
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
      toast.error("Plan Creation Failed", {
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

    setAddPlanError("");
    setAddPlanLoading(false);
    handleCloseAddPlanModal();

    setPlanTitleEn("");
    setPlanTitleAr("");
    setNumOfProviders("");
    setSingleImagePrice("");
    setOfferOnePrice("");
    setOfferOneMonths("");
    setOfferTowPrice("");
    setOfferTowMonths("");

    setPlanIcon("");
  };

  return (
    <div className="plans">
      <div className="relative flex ">
        <div className="pink-banner"></div>
        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12 mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("plans.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("plans.home")}</span> >{" "}
                <span>{t("plans.thePlans")}</span>
              </p>
            </div>

            <div>
              <button
                className="white-btn w-full sm:w-auto flex items-center"
                onClick={handleOpenAddPlanModal}
              >
                <span className="text-[24px] mx-2">+</span>
                {t("plans.add")}
              </button>
            </div>
          </div>
          <div className="ag-wrapper h-[707px] sm:h-[669px] overflow-hidden">
            <div className={"ag-theme-quartz "} style={{ height: 600 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 gap-3">
                <div>
                  <p>
                    {t("plans.total")}{" "}
                    <span className="mx-1">{plans ? plans?.length : 0}</span>{" "}
                    {t("plans.plans")}
                  </p>
                </div>
                <div className="relative search-warper">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder={t("plans.search")}
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
        show={isAddPlanModalOpen}
        size="md"
        onClose={handleCloseAddPlanModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 gap-x-3 grid grid-cols-2 plans ">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("plans.planModal.modalTitle")}
            </h3>
            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.titleEn")}
                value={planTitleEn}
                onChange={(event) => setPlanTitleEn(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.titleAr")}
                value={planTitleAr}
                onChange={(event) => setPlanTitleAr(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.numOfProviders")}
                value={numOfProviders}
                onChange={(event) => setNumOfProviders(event.target.value)}
                className="custom-input"
                type="number"
                min={0}
                required
              />
            </div>
            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.singleImagePrice")}
                value={singleImagePrice}
                onChange={(event) => setSingleImagePrice(event.target.value)}
                className="custom-input"
                type="number"
                min={0}
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer1months")}
                value={offerOneMonths}
                onChange={(event) => setOfferOneMonths(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer1price")}
                value={offerOnePrice}
                onChange={(event) => setOfferOnePrice(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer2months")}
                value={offerTowMonths}
                onChange={(event) => setOfferTowMonths(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer2price")}
                value={offerTowPrice}
                onChange={(event) => setOfferTowPrice(event.target.value)}
                className="custom-input"
                requiredw
              />
            </div>

            <div className="col-span-2">
              <Textarea
                placeholder={t("plans.planModal.icon")}
                value={planIcon}
                onChange={(event) => setPlanIcon(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-2 w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleAddPlanFormSubmit()}
              >
                {addPlanLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("plans.planModal.submitting")}</span>
                  </div>
                ) : (
                  t("plans.planModal.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{addPlanError}</p>
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
const Icon = ({ param }) => {
  return (
    // <div
    //   className={`bg-[#F3F7FA] text-[#1761A0] border-[1px] rounded-[4px] px-2 border-[#1761A0] border-opacity-[32%]`}
    // >
    //   {param}
    // </div>
    <div
      dangerouslySetInnerHTML={{ __html: param }}
      className="flex items-center justify-center rounded-[5px] w-[40px] h-[40px] bg-[#DE6DAF]"
    ></div>
  );
};

const Action = ({ planObj }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [loading, setLoading] = useState(false); // Loader state

  const { mutateAsync: mutateAsyncRemovePlan } = useRemovePlan();

  const handleOnSubmitDeletePlan = async (id) => {
    setLoading(true);
    const response = await mutateAsyncRemovePlan(id);
    if (response && response != 404) {
      console.log(response);
      toast.success("Plan Removed Successfully", {
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
      toast.error("Remove Plan Failed", {
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

  const { mutateAsync: mutateAsyncUpdatePlan } = useUpdatePlan();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false); // Loader state

  const [planTitleEn, setPlanTitleEn] = useState(planObj?.name);
  const [planTitleAr, setPlanTitleAr] = useState("");

  const [offerOnePrice, setOfferOnePrice] = useState(
    planObj?.plan_type?.find((p) => p.name === "firstOffer")?.price
  );
  const [offerOneMonths, setOfferOneMonths] = useState(
    planObj?.plan_type?.find((p) => p.name === "firstOffer")?.period
  );

  const [offerTowPrice, setOfferTowPrice] = useState(
    planObj?.plan_type?.find((p) => p.name === "secondOffer")?.price
  );
  const [offerTowMonths, setOfferTowMonths] = useState(
    planObj?.plan_type?.find((p) => p.name === "secondOffer")?.period
  );

  const [numOfProviders, setNumOfProviders] = useState(
    planObj?.num_of_providers
  );
  const [singleImagePrice, setSingleImagePrice] = useState(
    planObj?.plan_type?.find((p) => p.name === "single")?.price
  );

  const [planIcon, setPlanIcon] = useState(planObj?.icon);

  const [planEditError, setPlanEditError] = useState("");
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditPlanFormSubmit = async (id) => {
    console.log(singleImagePrice);
    if (
      !planTitleEn ||
      !planTitleAr ||
      !offerOnePrice ||
      !offerOneMonths ||
      !offerTowPrice ||
      !offerTowMonths ||
      numOfProviders == null ||
      numOfProviders == undefined ||
      !singleImagePrice ||
      !planIcon
    ) {
      setPlanEditError("Please Fill All Plan Fields");
      return;
    }
    setEditLoading(true);

    const response = await mutateAsyncUpdatePlan({
      id: id,
      data: {
        name: planTitleEn,
        icon: planIcon,
        num_of_providers: numOfProviders,
        plan_type: [
          {
            name: "single",
            period: 0,
            price: singleImagePrice,
          },
          {
            name: "firstOffer",
            period: offerOneMonths,
            price: offerOnePrice,
          },
          {
            name: "secondOffer",
            period: offerTowMonths,
            price: offerTowPrice,
          },
        ],
      },
    });
    console.log(response);

    if (response && response.ok) {
      console.log(response);
      toast.success("Plan Edited Successfully", {
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
      toast.error("Edit Plan Failed", {
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
    setPlanEditError("");
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-5 ">
        <button
          onClick={() => handleOpenEditModal}
          className="border p-1 rounded-md  bg-white hover:bg-blue-400 hover:text-white transition"
        >
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
          <div className="space-y-6 flex flex-col items-center justify-center plans ">
            <ConfirmDelete />
            <h3 className="text-[18px] text-center font-medium text-gray-900 dark:text-white">
              {t("plans.deleteCase.title")}
            </h3>

            <p className="text-[14px] text-center  text-gray-500 dark:text-white">
              {t("plans.deleteCase.description")}
            </p>

            <div className="">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] "
                onClick={() => handleOnSubmitDeletePlan(planObj?.id)}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress color="white" size={24} />
                    {t("plans.deleteCase.deleting")}
                  </div>
                ) : (
                  t("plans.deleteCase.confirm")
                )}{" "}
              </Button>
            </div>

            <button
              className="text-gray-400 text-[14px] underline"
              onClick={handleCloseDeleteModal}
            >
              {t("plans.deleteCase.cancel")}
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
          <div className="space-y-6 gap-x-3 grid grid-cols-2 plans ">
            <h3 className="col-span-2 text-xl font-medium text-gray-900 dark:text-white">
              {t("plans.editPlan.modalTitle")}
            </h3>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.titleEn")}
                value={planTitleEn}
                onChange={(event) => setPlanTitleEn(event.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.titleAr")}
                value={planTitleAr}
                onChange={(event) => setPlanTitleAr(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.numOfProviders")}
                value={numOfProviders}
                onChange={(event) => setNumOfProviders(event.target.value)}
                className="custom-input"
                type="number"
                min={0}
                required
              />
            </div>
            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.singleImagePrice")}
                value={singleImagePrice}
                onChange={(event) => setSingleImagePrice(event.target.value)}
                className="custom-input"
                type="number"
                min={0}
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer1months")}
                value={offerOneMonths}
                onChange={(event) => setOfferOneMonths(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer1price")}
                value={offerOnePrice}
                onChange={(event) => setOfferOnePrice(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer2months")}
                value={offerTowMonths}
                onChange={(event) => setOfferTowMonths(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-1">
              <TextInput
                placeholder={t("plans.planModal.offer2price")}
                value={offerTowPrice}
                onChange={(event) => setOfferTowPrice(event.target.value)}
                className="custom-input"
                requiredw
              />
            </div>

            <div className="col-span-2">
              <Textarea
                placeholder={t("plans.planModal.icon")}
                value={planIcon}
                onChange={(event) => setPlanIcon(event.target.value)}
                className="custom-input"
                required
              />
            </div>

            <div className="col-span-2 w-full">
              <Button
                className="bg-[#DE6DAF] enabled:hover:bg-[#b4578d] w-full"
                onClick={() => handleEditPlanFormSubmit(planObj?.id)}
              >
                {editLoading ? (
                  <div className="flex items-center justify-center gap-1">
                    <CircularProgress color="white" size={24} />{" "}
                    <span>{t("plans.editPlan.submitting")}</span>
                  </div>
                ) : (
                  t("plans.editPlan.submit")
                )}{" "}
              </Button>
              <p className="text-red-500 text-[14px] !my-3">{planEditError}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Plans;
