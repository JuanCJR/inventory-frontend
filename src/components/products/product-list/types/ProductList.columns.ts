import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import { createColumnHelper } from "@tanstack/react-table";

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
  columnHelper.accessor("removeDate", {
    cell: (removeDate) => removeDate.getValue(),
    header: "Fecha de retiro",
  }),
  columnHelper.accessor("state", {
    cell: (state) => state.getValue(),
    header: "Estado",
  }),
  columnHelper.accessor("leftDaysToRemove", {
    cell: (leftDaysToRemove) => leftDaysToRemove.getValue(),
    header: "Retirar en (días)",
  }),
  columnHelper.accessor("daysBeforeRemove", {
    cell: (daysBeforeRemove) => daysBeforeRemove.getValue(),
    header: "Regla de Retiro (dias)",
  }),
];
