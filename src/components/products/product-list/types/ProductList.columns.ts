import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import { createColumnHelper } from "@tanstack/react-table";
import { TableColumn } from "react-data-table-component";

const columnHelper = createColumnHelper<InventoryInterface>();

export const InventoryColumns = [
  columnHelper.accessor("id", {
    cell: (id) => id.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("ean", {
    cell: (ean) => ean.getValue(),
    header: "EAN",
  }),
  columnHelper.accessor("productName", {
    cell: (productName) => productName.getValue(),
    header: "Producto",
  }),
  columnHelper.accessor("expiresIn", {
    cell: (expiresIn) => expiresIn.getValue(),
    header: "Fecha de caducidad",
  }),
  columnHelper.accessor("state", {
    cell: (state) => state.getValue(),
    header: "Estado",
  }),
];
