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
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { useEffect, useState } from "react";
import { StoreApiHandler } from "@/api/store/store.api";

export default function UpdateStorePage({
  params,
}: {
  params: { id: string };
}) {
  const [store, setStore] = useState({
    name: "",
  });
  const storeApiHandler = new StoreApiHandler();
  const toast = useToast();
  const router = useRouter();

  const fetchData = async () => {
    const data = await storeApiHandler.findOne(Number(params.id));
    setStore((state) => ({ ...state, name: data.data.name }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await storeApiHandler.update(Number(params.id), store);
    if (status !== 200) {
      toast({
        title: "Error",
        description: "Error al actualizar la tienda",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Tienda actualizada",
        description: "La tienda se actualizo correctamente",
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
          Actualizar la nueva tienda {params.id}
        </Heading>
      </HStack>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormControl isRequired>
          <FormLabel>Nombre de la tienda</FormLabel>
          <Input
            onChange={(e) => onChangeSimpleValue(e, "name", setStore)}
            defaultValue={store.name}
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
