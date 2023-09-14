"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Td,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import styles from "./VerifyProductModal.module.css";
import { Scanner } from "@/components/scanner/Scanner";
import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { Inventory } from "@/api/inventory/Inventory";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";
import { FiCamera } from "react-icons/fi";

export const VerifyProductModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productCode, setProductCode] = useState("");
  const toast = useToast();
  const inventory = new Inventory();
  const handleChangeCode = (newProductCode: string) =>
    setProductCode(newProductCode);

  const [product, setProduct] = useState<InventoryInterface>({
    id: 0,
    ean: "",
    productName: "",
    expiresIn: "",
    state: "",
    daysBeforeRemove: 0,
    leftDaysToRemove: 0,
    removeDate: "",
    quantity: 0,
  });
  useEffect(() => {
    async function load() {
      if (productCode !== "") {
        setProduct((prev) => ({ ...prev, ean: productCode }));
        const productResult = await inventory.findByEan(productCode);
        if (productResult.status !== 200) {
          toast({
            position: "top",
            title: `Producto no encontrado.`,
            variant: "solid",
            isClosable: true,
            status: "error",
          });
          setProduct((state) => ({
            ...state,
            id: 0,
            ean: "",
            productName: "",
            expiresIn: "",
            state: "",
          }));
        } else {
          toast({
            position: "top",
            title: `Producto encontrado.`,
            variant: "solid",
            isClosable: true,
            status: "success",
          });
          setProduct((state) => ({ ...state, ...productResult.data }));
          console.log(productResult.data);
        }
      }
    }
    load();
  }, [productCode]);

  return (
    <React.Fragment>
      <IconButton
        bg={"white"}
        aria-label="verify product"
        className={styles.verifyProductModalButton}
        icon={<FiCamera color={"#75c2f9"} />}
        onClick={onOpen}
      />

      {/*   Modal  */}
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Verficiación de Producto
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className={styles.modalBodyBox}>
              <Scanner handleChangeCode={handleChangeCode} />
            </Box>

            <Box className={styles.productScannedBox}>
              <p>
                Producto <span>{productCode}</span> escaneado
              </p>
            </Box>

            {/* Add product form */}
            <Box className={styles.productScannedForm}>
              <Table>
                <Tr>
                  <Th>ID</Th>
                  <Td>{product.id}</Td>
                </Tr>
                <Tr>
                  <Th>EAN</Th>
                  <Td>{product.ean}</Td>
                </Tr>
                <Tr>
                  <Th>Nombre</Th>
                  <Td>{product.productName}</Td>
                </Tr>
                <Tr>
                  <Th>Cantidad</Th>
                  <Td>{product.quantity}</Td>
                </Tr>
                <Tr>
                  <Th>Fecha de Expiración</Th>
                  <Td>{product.expiresIn}</Td>
                </Tr>

                <Tr>
                  <Th>Fecha de Retiro</Th>
                  <Td>{product.removeDate}</Td>
                </Tr>

                <Tr>
                  <Th>Regla de Retiro (dias)</Th>
                  <Td>{product.daysBeforeRemove}</Td>
                </Tr>
                <Tr>
                  <Th>Retirar en</Th>
                  <Td>{product.leftDaysToRemove} dias</Td>
                </Tr>
                <Tr>
                  <Th>Estado</Th>
                  <Td>{product.state}</Td>
                </Tr>
              </Table>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
