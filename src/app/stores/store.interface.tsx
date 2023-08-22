import { Store } from "@/api/store/interface/store.interface";
import { StoreApiHandler } from "@/api/store/store.api";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const columnHelper = createColumnHelper<Store>();

export const StoreColumns = [
  columnHelper.accessor("id", {
    cell: (id) => id.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: (ean) => ean.getValue(),
    header: "Nombre",
  }),
  columnHelper.accessor("id", {
    cell: (id) => <StoreOptiones id={id.getValue()} />,
    header: "Opciones",
  }),
];

const StoreOptiones = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <HStack>
      <Button
        colorScheme={"blue"}
        size={"sm"}
        onClick={() => router.push(`/stores/update/${id}`)}
      >
        Editar
      </Button>
      <DeleteStoreModal id={id} />
    </HStack>
  );
};

const DeleteStoreModal = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const storeApiHandler = new StoreApiHandler();
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    const { status } = await storeApiHandler.delete(id);
    if (status === 200) {
      toast({
        title: "Tienda eliminada",
        description: "La tienda se eliminó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Error al eliminar la tienda",
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
          <ModalHeader>Eliminar Tienda</ModalHeader>
          <ModalBody>
            <p>¿Está seguro que desea eliminar la tienda {id}?</p>
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
