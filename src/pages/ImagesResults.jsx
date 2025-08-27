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

import { useImagesResults } from "../query-hooks/images-query-hooks";
import { useTranslation } from "react-i18next";

const ImagesResults = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const [imagesPerPage, setImagesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [numOfPages, setNumOfPages] = useState(1);
  const [numOfRecords, setNumOfRecordss] = useState(numOfPages * imagesPerPage);

  useEffect(() => {
    setNumOfRecordss(numOfPages * imagesPerPage);
  }, [numOfPages, imagesPerPage]);
  const { data: results, isPending: isPendingResults } =
    useImagesResults();
    // currentPage,
    // imagesPerPage
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log(results);
    console.log(results?.data);
    if (results && results?.pages) {
      setNumOfPages(results?.pages);
    }

    if (results && results?.data && Array.isArray(results?.data)) {
      setRowData(() => []);
      results?.data?.map((row, i) => {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            "#": i + 1,
            "IMAGE NAME": row.name,
            "OLD DIAGNOSE": capitalize(row.old_diagnose),
            NORMAL:
              row?.doctore_diagnose?.filter(
                (row) => row?.diagnose == "normal"
              )[0]?.diagnose == "normal"
                ? "1"
                : "0",
            BENIGN:
              row?.doctore_diagnose?.filter(
                (row) => row?.diagnose == "benign"
              )[0]?.diagnose == "benign"
                ? "1"
                : "0",
            MALIGNANT:
              row?.doctore_diagnose?.filter(
                (row) => row?.diagnose == "malignant"
              )[0]?.diagnose == "malignant"
                ? "1"
                : "0",
            DISCARD:
              row?.doctore_diagnose?.filter(
                (row) => row?.diagnose == "discard"
              )[0]?.diagnose == "discard"
                ? "1"
                : "0",
            ACTION: row?.doctore_diagnose,
          },
        ]);
      });
    }
  }, [results]);

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
      field: "IMAGE NAME",
      checkboxSelection: false,
      minWidth: 180,
      flex: 1,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },

    {
      field: "OLD DIAGNOSE",
      checkboxSelection: false,
      minWidth: 150,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "NORMAL",
      checkboxSelection: false,
      minWidth: 120,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "BENIGN",
      checkboxSelection: false,
      minWidth: 120,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "MALIGNANT",
      checkboxSelection: false,
      minWidth: 120,
      flex: 0.6,
      filter: true,
      headerCheckboxSelection: false,
      headerClass: "whitespace-normal",
    },
    {
      field: "DISCARD",
      checkboxSelection: false,
      minWidth: 120,
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
      cellRenderer: (params) => <Action data={params.value} />,
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

  useEffect(() => {
    if (gridRef.current?.api) {
      if (isPendingResults) {
        gridRef.current.api.showLoadingOverlay();
      } else {
        gridRef.current.api.hideOverlay();
      }
    }
  }, [isPendingResults]);

  // Custom Pagination Display: "1 to 10 of {TOTAL_RECORDS}. Page 1 of {TOTAL_PAGES}"
  const paginationNumberFormatter = () => {
    const startRow = (currentPage - 1) * imagesPerPage + 1;
    const endRow = Math.min(startRow + imagesPerPage - 1, numOfRecords);
    return `${startRow} to ${endRow} of ${numOfRecords}`;
  };

  const onGridReady = true;

  const onPaginationChanged = (params) => {
    if (params.api) {
      const newPageSize = params.api.paginationGetPageSize();
      console.log(newPageSize);
      setImagesPerPage(newPageSize);

      const newPage = params.api.paginationGetCurrentPage() + 1;
      setCurrentPage(newPage);
    }
  };

    const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setGridOption(
        "quickFilterText",
        document.getElementById("filter-text-box").value
      );
    }, []);
    
  return (
    <>
      <div className="relative flex">
        <div className="pink-banner"></div>

        <div className=" px-2 lg:px-28 mb-12 w-full">
          <div className="mt-12 mb-8 relative z-5 flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-white font-semibold">
                {t("results.title")}
              </h2>
              <p className="text-[14px] text-white  font-medium">
                <span>{t("results.home")}</span> >{" "}
                <span>{t("results.dashboard")}</span> >{" "}
                <span>{t("results.results")}</span>
              </p>
            </div>

            <div>
              {/* <button
        className="white-btn w-full sm:w-auto flex items-center"
        //   onClick={handleOpenAddUserModal}
      >
        <span className="text-[24px] mx-2">+</span>Add User
      </button> */}
            </div>
          </div>
          <div className="ag-wrapper h-[707px] sm:h-[669px] overflow-hidden">
            <div className={"ag-theme-quartz "} style={{ height: 600 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 gap-3">
                <div>
                  <p>
                    {t("results.total")}{" "}
                    <span className="mx-1">{(results && results?.data && Array.isArray(results?.data))? results?.data?.length:0 }</span>{" "}
                    {t("results.images")}
                  </p>
                </div>
                <div className="relative search-warper">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder={t("results.search")}
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
                // onPaginationChanged={onPaginationChanged}
                // paginationNumberFormatter={paginationNumberFormatter} // Custom pagination format
                // onPageSizeChanged={onPageSizeChanged}

                // paginationNumberFormatter={(params) =>
                //   `Page ${params.value} of ${numOfPages}`
                // }

              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { Table } from "flowbite-react";

const Action = ({ data }) => {
  const { t } = useTranslation();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const handleOpenViewModal = () => setIsViewModalOpen(true);
  const handleCloseViewModal = () => setIsViewModalOpen(false);

  // console.log(data);

  return (
    <>
      <div className="flex items-center gap-5 ">
        <button className="border p-1 rounded-md  bg-white hover:bg-blue-400 hover:text-white transition">
          <RemoveRedEyeOutlined
            className="!text-[20px]"
            onClick={handleOpenViewModal}
          />
        </button>
      </div>
      <Modal
        show={isViewModalOpen}
        size="md"
        onClose={handleCloseViewModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex flex-col items-center justify-center">
            <h3 className="text-[18px] text-center font-medium text-gray-900 dark:text-white">
              {t("results.detailsModal.title")}
            </h3>

            <div className="overflow-x-auto w-full">
              <Table className="diagnose-table">
                <Table.Head>
                  <Table.HeadCell>
                    {" "}
                    {t("results.detailsModal.user")}
                  </Table.HeadCell>
                  <Table.HeadCell>
                    {" "}
                    {t("results.detailsModal.diagnose")}
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                  {data?.map((row, i) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{row?.user}</Table.Cell>
                      <Table.Cell>
                        {t(`results.detailsModal.${row?.diagnose}`)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImagesResults;
