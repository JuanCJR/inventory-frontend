import { Center, Heading, Text, useColorMode } from "@chakra-ui/react";
import DataTable, { TableProps, TableStyles } from "react-data-table-component";
import {
  customStyles,
  paginationComponentOptions,
} from "./responsiveTableDefiniton";
import { LoadingData } from "../loading/LoadingPage";

interface ResponsiveDataTableProps extends TableProps<any> {
  height?: string;
  customTableStyles?: TableStyles;
  dense?: boolean;
  onRowClicked?: (row: any, e: React.MouseEvent<Element, MouseEvent>) => void;
}

export const ResponsiveDataTable = (props: ResponsiveDataTableProps) => {
  const { colorMode } = useColorMode();

  const tableStyles = { ...customStyles, ...props.customTableStyles };
  return (
    <DataTable
      className="scroll"
      theme={colorMode === "dark" ? "dark" : "default"}
      dense={props.dense}
      title={props.title}
      paginationComponentOptions={paginationComponentOptions}
      columns={props.columns}
      data={props.data}
      progressPending={props.progressPending}
      progressComponent={<LoadingData />}
      fixedHeader={true}
      fixedHeaderScrollHeight={props.height ? props.height : "400px"}
      pagination
      paginationServer
      paginationTotalRows={props.paginationTotalRows}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      onChangePage={props.onChangePage}
      onRowClicked={props.onRowClicked}
      responsive
      highlightOnHover
      customStyles={tableStyles}
      noDataComponent={
        <Center>
          <Heading size={"sm"}>No se han encontrado registros.</Heading>
        </Center>
      }
    />
  );
};
