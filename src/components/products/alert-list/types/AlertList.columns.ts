import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<InventoryInterface>();

export const AlertListColums = [
  columnHelper.accessor("productName", {
    cell: (productName) => productName.getValue(),
    header: "Producto",
  }),
  columnHelper.accessor("state", {
    cell: (state) => state.getValue(),
    header: "Estado",
  }),
  columnHelper.accessor("leftDaysToRemove", {
    cell: (leftDaysToRemove) => leftDaysToRemove.getValue(),
    header: "Retirar en (días)",
  }),
  columnHelper.accessor("ean", {
    cell: (ean) => ean.getValue(),
    header: "EAN",
  }),
];
