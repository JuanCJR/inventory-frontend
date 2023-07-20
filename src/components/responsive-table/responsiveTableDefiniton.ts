import { createTheme, TableStyles } from "react-data-table-component";
export const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos",
};

export const customStyles: TableStyles = {
  contextMenu: {
    style: {
      backgroundColor: "#ED8936",
      fontSize: "18px",
      fontWeight: 400,
      color: "white",
      paddingLeft: "16px",
      paddingRight: "8px",
      transform: "translate3d(0, -100%, 0)",
      transitionDuration: "125ms",
      transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
      willChange: "transform",
      borderRadius: "6px",
    },
    activeStyle: {
      transform: "translate3d(0, 0, 0)",
    },
  },
  rows: {
    style: {
      fontSize: "16px",
      minHeight: "60px", // override the row height
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#EDF2F7",
      },
    },
  },
  headCells: {
    style: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      lineHeight: "1rem",
      fontSize: "0.75rem",
      //  color: '#4A5568',
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      // paddingLeft: '6px', // override the cell padding for data cells
      // paddingRight: '6px',
    },
  },
  headRow: {
    style: {
      minHeight: "52px",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: "#EDF2F7",
    },
  },
};

createTheme("dark", {
  ...customStyles,
  background: {
    default: "#171923",
  },
});
