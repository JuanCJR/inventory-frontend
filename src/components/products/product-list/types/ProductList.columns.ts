import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import { TableColumn } from "react-data-table-component";

export const InventoryColumns: TableColumn<InventoryInterface>[] = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    wrap: true,
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "EAN",
    selector: (row) => row.ean,
    sortable: true,
    wrap: true,
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "Nombre",
    selector: (row) => row.productName,
    sortable: true,
    wrap: true,
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "Fecha de vencimiento",
    selector: (row) => row.expiresIn,
    sortable: true,
    wrap: true,
    style: {
      cursor: "pointer",
    },
  },
  {
    name: "Estado",
    selector: (row) => row.state,
    sortable: true,
    wrap: true,
    style: {
      cursor: "pointer",
    },
  },
];
