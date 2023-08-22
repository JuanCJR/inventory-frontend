"use client";
import {
  VStack,
  HStack,
  Icon,
  Heading,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiTruck } from "react-icons/fi";
import { StoreColumns } from "../store.interface";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { useState } from "react";
import { StoreApiHandler } from "@/api/store/store.api";

export default function CreateStorePage() {
  const [newStore, setNewStore] = useState({
    name: "",
  });
  const storeApiHandler = new StoreApiHandler();
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await storeApiHandler.create(newStore);
    if (status !== 201) {
      toast({
        title: "Error",
        description: "Error al crear la tienda",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Tienda creada",
        description: "La tienda se creó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/stores");
    }
  };

  return (
    <VStack
      w={"100%"}
      minW={"150px"}
      h={"80vh"}
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
      p={"18px"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <HStack>
        <Icon as={FiTruck} boxSize={8} color={"#75c2f9"} />

        <Heading color={"#75c2f9"} size={"lg"} mb={2}>
          Crear nueva tienda
        </Heading>
      </HStack>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormControl isRequired>
          <FormLabel>Nombre de la tienda</FormLabel>
          <Input
            onChange={(e) => onChangeSimpleValue(e, "name", setNewStore)}
          />
        </FormControl>
        <Box w={"100%"} mt={4}>
          <Button type="submit" w={"100%"}>
            Guardar
          </Button>
        </Box>
      </form>
    </VStack>
  );
}
