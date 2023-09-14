import { Inventory } from "@/api/inventory/Inventory";
import { InventoryInterface } from "@/api/inventory/interface/inventory.interface";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

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
  columnHelper.accessor("quantity", {
    cell: (quantity) => quantity.getValue(),
    header: "Cantidad",
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

  columnHelper.accessor("id", {
    cell: (id) => <ProductOptions id={id.getValue()} />,
    header: "Opciones",
  }),
];

const ProductOptions = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inventory = new Inventory();
  const toast = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const { status } = await inventory.delete(id);
    if (status === 200) {
      toast({
        title: "Producto eliminado",
        description: "El producto se eliminó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Error al eliminar el producto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Fragment>
      <Button colorScheme={"red"} size={"sm"} onClick={onOpen}>
        Eliminar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Usuario</ModalHeader>
          <ModalBody>
            <p>¿Está seguro que desea eliminar el usuario {id}?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme={"red"}
              onClick={async () => {
                await handleDelete();
              }}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
