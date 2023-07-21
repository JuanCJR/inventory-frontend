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
        }
      }
    }
    load();
  }, [productCode]);

  return (
    <React.Fragment>
      <IconButton
        aria-label="verify product"
        className={styles.verifyProductModalButton}
        icon={<FiCamera />}
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
              <form>
                <FormControl
                  isDisabled
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "ean", setProduct);
                  }}
                >
                  <FormLabel>EAN</FormLabel>
                  <Input type="text" defaultValue={product.ean} />
                </FormControl>

                <FormControl
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "productName", setProduct);
                  }}
                >
                  <FormLabel>Nombre del Producto</FormLabel>
                  <Input type="text" defaultValue={product.productName} />
                </FormControl>

                <FormControl
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "expiresIn", setProduct);
                  }}
                >
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <Input type="date" defaultValue={product.expiresIn} />
                </FormControl>

                <FormControl
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "state", setProduct);
                  }}
                >
                  <FormLabel>Estado</FormLabel>
                  <Input type="text" defaultValue={product.state} />
                </FormControl>

                <Button variant={"outline"} colorScheme="blue" type="submit">
                  Actualizar
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
