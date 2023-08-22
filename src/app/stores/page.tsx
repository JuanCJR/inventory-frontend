"use client";
import { Store, StoreQueryParams } from "@/api/store/interface/store.interface";
import { StoreApiHandler } from "@/api/store/store.api";
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
import { FiTruck } from "react-icons/fi";
import { StoreColumns } from "./store.interface";
import { useRouter } from "next/navigation";

export default function StoresPage() {
  const router = useRouter();
  const storesState = useComponentArrayData<Store>();
  const storeApiHandler = new StoreApiHandler();
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
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
          Lista de tiendas
        </Heading>
      </HStack>
      <Box w={"100%"}>
        <ResponsiveDataTable data={storesState.data} columns={StoreColumns} />
      </Box>

      <Box w={"100%"}>
        <Button onClick={() => router.push("/stores/add")} w={"100%"}>
          Crear nueva tienda
        </Button>
      </Box>
    </VStack>
  );
}
