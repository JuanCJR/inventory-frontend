import { Store } from "@/api/store/interface/store.interface";
import { StoreApiHandler } from "@/api/store/store.api";
import { User } from "@/api/user/interface/user.interface";
import { UserApiHandler } from "@/api/user/user.api";
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

const columnHelper = createColumnHelper<User>();

export const UserColumns = [
  columnHelper.accessor("id", {
    cell: (id) => id.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("username", {
    cell: (username) => username.getValue(),
    header: "Nombre de usuario",
  }),
  columnHelper.accessor("store", {
    cell: (store) => store.getValue().name,
    header: "Tienda",
  }),
  columnHelper.accessor("id", {
    cell: (id) => <UserOptiones id={id.getValue()} />,
    header: "Opciones",
  }),
];

const UserOptiones = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <HStack>
      <Button
        colorScheme={"blue"}
        size={"sm"}
        onClick={() => router.push(`/users/update/${id}`)}
      >
        Editar
      </Button>
      <DeleteUserModal id={id} />
    </HStack>
  );
};

const DeleteUserModal = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userApiHandler = new UserApiHandler();
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    const { status } = await userApiHandler.delete(id);
    if (status === 200) {
      toast({
        title: "Usuario eliminada",
        description: "El usuario se eliminó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: "Error al eliminar el usuario",
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
