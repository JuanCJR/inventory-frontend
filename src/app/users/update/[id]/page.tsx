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
import { FiTruck, FiUser } from "react-icons/fi";
import { onChangeSimpleValue } from "@/common/inputHandlers";
import { useEffect, useState } from "react";
import { StoreApiHandler } from "@/api/store/store.api";
import { UserApiHandler } from "@/api/user/user.api";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import { Store, StoreQueryParams } from "@/api/store/interface/store.interface";

export default function UpdateStorePage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState({
    username: "",
    store_id: 0,
  });
  const storeApiHandler = new StoreApiHandler();
  const storesState = useComponentArrayData<Store>();
  const userApiHandler = new UserApiHandler();
  const toast = useToast();
  const router = useRouter();
  const [perPage, setPerPage] = useState(1000);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const fetchData = async () => {
    setLoadingData(true);
    setLoading(false);
    setOpenPage(true);

    let queryParams: StoreQueryParams = {
      page: 1,
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

    const { status, data } = await userApiHandler.findOne(Number(params.id));
    setUser((state) => ({
      ...state,
      username: data.username,
      store_id: data.store.id,
    }));

    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status } = await userApiHandler.update(Number(params.id), user);
    if (status !== 200) {
      toast({
        title: "Error",
        description: "Error al actualizar el usuario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Usuario actualizado",
        description: "El usuario se actualizo correctamente",
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
        <Icon as={FiUser} boxSize={8} color={"#75c2f9"} />

        <Heading color={"#75c2f9"} size={"lg"} mb={2}>
          Actualizar el usuario {params.id}
        </Heading>
      </HStack>

      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            onChange={(e) => onChangeSimpleValue(e, "username", setUser)}
            defaultValue={user.username}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tienda</FormLabel>
          <Select
            onChange={(e) => {
              let newId = Number(e.target.value);
              setUser((state) => ({
                ...state,
                store_id: newId,
              }));
            }}
          >
            <option value={user.store_id}>
              {storesState.data.find((item) => item.id === user.store_id)?.name}
            </option>
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
