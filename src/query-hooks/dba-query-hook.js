// query-hooks/myDBAHooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sendApiRequest from "../api";
import { useAuth } from "../contexts/AuthContext";

export const queryKeys = {
  allTables: (skip, limit) => ["myDBA-tables", skip, limit],
  tableData: (tableName, skip, limit) => [
    "myDBA-table-data",
    tableName,
    skip,
    limit,
  ],
};

// List Tables Hook
export function useAllTables(skip = 0, limit = 100, enabled = true) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const queryString = `skip=${skip}&limit=${limit}`;

  return useQuery({
    queryKey: queryKeys.allTables(skip, limit),
    queryFn: () => sendApiRequest(`myDBA/?${queryString}`, "GET"),
    enabled: enabled && isAdmin,
    keepPreviousData: true,
  });
}

// Table Data Hook
export function useTableData(tableName, skip = 0, limit = 10000000, enabled = true) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const queryString = `skip=${skip}&limit=${limit}`;

  return useQuery({
    queryKey: queryKeys.tableData(tableName, skip, limit),
    queryFn: () =>
      sendApiRequest(`myDBA/showTable/${tableName}?${queryString}`, "GET"),
    enabled: enabled && isAdmin && !!tableName,
    keepPreviousData: true,
  });
}

// Delete Table Data Mutation
const deleteTableData = async ({ tableName, skip, limit }) => {
  return sendApiRequest(
    `myDBA/delete/${tableName}?skip=${skip}&limit=${limit}`,
    "GET"
  );
};

export function useDeleteTableData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTableData,
    onError: (err) => console.error("Delete error:", err),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["myDBA-table-data", variables.tableName],
      });
      console.log("Table data deleted successfully");
    },
  });
}

// Export Table Mutation
const exportTable = async (tableName) => {
    const response = await sendApiRequest(
      `myDBA/export/${tableName}`,
      "GET",
      undefined,
      undefined,
      {}, // Headers
      { responseType: "blob" } // Options
    );
    return response;
  };
  
  export function useExportTable() {
    return useMutation({
      mutationFn: exportTable,
      onError: (err) => console.error("Export error:", err),
    });
  }

// Import Table Mutation
const importTable = async (formData) => {
  return sendApiRequest("myDBA/import", "POST", undefined, formData, {
    "Content-Type": "multipart/form-data",
  });
};

export function useImportTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importTable,
    onError: (err) => console.error("Import error:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDBA-tables"] });
      console.log("SQL file imported successfully");
    },
  });
}
