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
} from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import styles from "./AddProductModal.module.css";
import { Scanner } from "@/components/scanner/Scanner";
import { CreateInventoryPayload } from "@/api/inventory/interface/inventory.interface";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { Inventory } from "@/api/inventory/Inventory";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";

interface AddProductModalProps extends UseRefreshControlProps {}

export const AddProductModal = (props: AddProductModalProps) => {
  const { refresh, handleSetRefresh } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addManually, setAddManually] = useState(false);
  const handleChangeAddManually = () => setAddManually(!addManually);
  const [productCode, setProductCode] = useState("");
  const handleChangeCode = (newProductCode: string) =>
    setProductCode(newProductCode);

  const [product, setProduct] = useState<CreateInventoryPayload>({
    ean: "",
    productName: "",
    expiresIn: "",
  });

  useEffect(() => {
    setProduct((prev) => ({ ...prev, ean: productCode }));
  }, [productCode]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inventory = new Inventory();
    const result = await inventory.create(product);
    handleSetRefresh();
    onClose();
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="add product"
        className={styles.AddProductModalButton}
        icon={<AddIcon />}
        onClick={onOpen}
      />

      {/*   Modal  */}
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Agregar Producto</ModalHeader>
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
              <form onSubmit={onSubmit}>
                <FormControl
                  isDisabled={addManually ? false : true}
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "ean", setProduct);
                  }}
                >
                  <FormLabel>EAN</FormLabel>
                  <Input type="text" defaultValue={productCode} />
                </FormControl>

                <FormControl
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "productName", setProduct);
                  }}
                >
                  <FormLabel>Nombre del Producto</FormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "expiresIn", setProduct);
                  }}
                >
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <Input type="date" />
                </FormControl>

                <Button variant={"outline"} colorScheme="blue" type="submit">
                  Continuar
                </Button>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              w={"100%"}
              onClick={handleChangeAddManually}
              isDisabled={addManually}
            >
              Agregar manualmente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
