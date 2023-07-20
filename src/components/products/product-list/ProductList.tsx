"use client";
import { ResponsiveDataTable } from "@/components/responsive-table/ResponsiveTable";
import styles from "./ProductList.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import {
  InventoryInterface,
  InventoryQueryParams,
} from "@/api/inventory/interface/inventory.interface";
import { useEffect, useState } from "react";
import { Inventory } from "@/api/inventory/Inventory";
import { InventoryColumns } from "./types/ProductList.columns";
const data = [
  { id: 1, codigo: "ABC123", nombre: "Producto 1", estado: "Activo" },
  { id: 2, codigo: "XYZ456", nombre: "Producto 2", estado: "Inactivo" },
];

export const ProductList = () => {
  const productListState = useComponentArrayData<InventoryInterface>();
  const inventory = new Inventory();
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(1);
  };

  const fetchData = async (page: number) => {
    setLoadingData(true);
    setLoading(false);
    setOpenPage(true);

    let queryParams: InventoryQueryParams = {
      page,
      take: perPage,
    };

    const response = await inventory.find(queryParams);
    if (response.status !== 200) {
      productListState.cleanState();
      setTotalRows(0);
    } else {
      productListState.setData((state) => ({
        ...state,
        data: response.data.data,
        meta: response.data.meta,
      }));
      setTotalRows(response.data.meta.itemCount);
    }

    setLoadingData(false);
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
  };
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoadingData(true);
    const queryParams: InventoryQueryParams = {
      page,
      take: newPerPage,
    };

    const response = await inventory.find(queryParams);

    productListState.setData((state) => ({
      ...state,
      data: response.data.data,
    }));
    setPerPage(newPerPage);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className={styles.product_list}>
      <div className={styles.product_list_title}>
        <Heading size={"lg"}>Lista de Productos</Heading>
      </div>

      <ResponsiveDataTable
        responsive
        data={productListState.data}
        columns={InventoryColumns}
        dense={false}
        progressPending={loadingData}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />

      {/* <TableContainer>
        <Table variant="simple" className={styles.responsive}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Código</Th>
              <Th>Nombre</Th>
              <Th>Fecha de Expiración</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td data-label="ID">1</Td>
              <Td data-label="Código">1</Td>
              <Td data-label="Nombre">1</Td>
              <Td data-label="Fecha de Expiración">1</Td>
              <Td data-label="Estado">1</Td>
            </Tr>
            <Tr>
              <Td data-label="ID">1</Td>
              <Td data-label="Código">1</Td>
              <Td data-label="Nombre">1</Td>
              <Td data-label="Fecha de Expiración">1</Td>
              <Td data-label="Estado">1</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer> */}
    </div>
  );
};