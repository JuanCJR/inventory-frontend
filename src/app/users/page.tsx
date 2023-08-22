"use client";

import { ResponsiveDataTable } from "@/components/responsive-table/ResponsiveTable";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTruck, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { UserColumns } from "./users.interface";
import { User, UserQueryParams } from "@/api/user/interface/user.interface";
import { UserApiHandler } from "@/api/user/user.api";

export default function UsersPage() {
  const router = useRouter();
  const UsersState = useComponentArrayData<User>();
  const userApiHandler = new UserApiHandler();
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const fetchData = async (page: number) => {
    setLoadingData(true);
    setLoading(false);
    setOpenPage(true);

    let queryParams: UserQueryParams = {
      page,
      take: perPage,
    };

    const response = await userApiHandler.find(queryParams);
    if (response.status !== 200) {
      UsersState.cleanState();
      setTotalRows(0);
    } else {
      UsersState.setData((state) => ({
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
          Lista de Usuarios
        </Heading>
      </HStack>
      <Box w={"100%"}>
        <ResponsiveDataTable data={UsersState.data} columns={UserColumns} />
      </Box>

      <Box w={"100%"}>
        <Button onClick={() => router.push("/users/add")} w={"100%"}>
          Crear nuevo usuario
        </Button>
      </Box>
    </VStack>
  );
}
