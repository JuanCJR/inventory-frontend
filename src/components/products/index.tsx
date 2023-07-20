"use client";
import styles from "./index.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
const data = [
  { id: 1, codigo: "ABC123", nombre: "Producto 1", estado: "Activo" },
  { id: 2, codigo: "XYZ456", nombre: "Producto 2", estado: "Inactivo" },
];

export const ProductList = () => {
  return (
    <div className={styles.product_list}>
      <div className={styles.product_list_title}>
        <Heading size={"lg"}>Lista de Productos</Heading>
      </div>

      <TableContainer>
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
      </TableContainer>
    </div>
  );
};
