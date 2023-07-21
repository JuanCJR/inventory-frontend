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
import styles from "./AddProductModal.module.css";
import { Scanner } from "@/components/scanner/Scanner";
import { CreateInventoryPayload } from "@/api/inventory/interface/inventory.interface";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { Inventory } from "@/api/inventory/Inventory";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";
import { FiPlus } from "react-icons/fi";

interface AddProductModalProps extends UseRefreshControlProps {}

export const AddProductModal = (props: AddProductModalProps) => {
  const { refresh, handleSetRefresh } = props;
  const toast = useToast();

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
    daysBeforeRemove: 0,
  });

  useEffect(() => {
    setProduct((prev) => ({ ...prev, ean: productCode }));
  }, [productCode]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inventory = new Inventory();
    const result = await inventory.create(product);
    if (result.status !== 201) {
      toast({
        position: "top",
        title: `El producto ya se encuentra registrado.`,
        variant: "solid",
        isClosable: true,
        status: "error",
      });
    } else {
      toast({
        position: "top",
        title: `Producto registrado con exito`,
        variant: "solid",
        isClosable: true,
        status: "success",
      });
      handleSetRefresh();
      onClose();
    }
  };

  return (
    <React.Fragment>
      <IconButton
        bg={"white"}
        aria-label="add product"
        className={styles.AddProductModalButton}
        icon={<FiPlus color={"#75c2f9"} />}
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

                <FormControl
                  isRequired
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeSimpleValue(e, "daysBeforeRemove", setProduct);
                  }}
                >
                  <FormLabel>Retirar antes de(dias)</FormLabel>
                  <Input type="number" />
                </FormControl>

                <Button variant={"outline"} colorScheme="blue" type="submit">
                  Guardar
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
