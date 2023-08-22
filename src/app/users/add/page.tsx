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
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiTruck } from "react-icons/fi";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { useEffect, useState } from "react";
import { StoreApiHandler } from "@/api/store/store.api";
import { Store, StoreQueryParams } from "@/api/store/interface/store.interface";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import { UserApiHandler } from "@/api/user/user.api";
import { CreateUserInterface } from "@/api/user/interface/user.interface";

export default function CreateStorePage() {
  const [newUser, setNewUser] = useState<CreateUserInterface>({
    username: "",
    password: "",
    store_id: 0,
  });
  const storeApiHandler = new StoreApiHandler();
  const storesState = useComponentArrayData<Store>();
  const userApiHandler = new UserApiHandler();
  const [perPage, setPerPage] = useState(1000);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const fetchData = async (page: number) => {
    setLoadingData(true);
    setLoading(false);
    setOpenPage(true);

    let queryParams: StoreQueryParams = {
      page,
      take: perPage,
    };

    const response = await storeApiHandler.find(queryParams);
    if (response.status !== 200) {
      storesState.cleanState();
      setTotalRows(0);
    } else {
      storesState.setData((state) => ({
        ...state,
        data: response.data.data,
        meta: response.data.meta,
      }));
      setTotalRows(response.data.meta.itemCount);
    }

    setLoadingData(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await userApiHandler.create(newUser);
    if (status !== 201) {
      toast({
        title: "Error",
        description: "Error al crear el Usuario",
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
      router.push("/users");
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
          Crear nuevo Usuario
        </Heading>
      </HStack>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            onChange={(e) => onChangeSimpleValue(e, "username", setNewUser)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            onChange={(e) => onChangeSimpleValue(e, "password", setNewUser)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tienda</FormLabel>
          <Select
            onChange={(e) => {
              let id = e.target.value;
              setNewUser((state) => ({ ...state, store_id: Number(id) }));
            }}
          >
            <option value={0}>Selecciona una tienda</option>
            {storesState.data.map((store) => (
              <option value={store.id}>{store.name}</option>
            ))}
          </Select>
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
