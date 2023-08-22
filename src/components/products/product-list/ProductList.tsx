"use client";
import { ResponsiveDataTable } from "@/components/responsive-table/ResponsiveTable";
import styles from "./ProductList.module.css";
import { Icon } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import {
  InventoryInterface,
  InventoryQueryParams,
} from "@/api/inventory/interface/inventory.interface";
import { useEffect, useState } from "react";
import { Inventory } from "@/api/inventory/Inventory";
import { InventoryColumns } from "./types/ProductList.columns";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";
import { FiList } from "react-icons/fi";

interface ProductListProps extends UseRefreshControlProps {
  id: string;
}

export const ProductList = (props: ProductListProps) => {
  const { refresh, handleSetRefresh, id } = props;
  const productListState = useComponentArrayData<InventoryInterface>();
  const inventory = new Inventory();
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isOpenPage, setOpenPage] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(1);
  };

  const fetchData = async (page: number) => {
    setLoadingData(true);
    setLoading(false);
    setOpenPage(true);

    let queryParams: InventoryQueryParams = {
      page,
      take: perPage,
      store_id: Number(id),
    };

    const response = await inventory.find(queryParams);
    if (response.status !== 200) {
      productListState.cleanState();
      setTotalRows(0);
    } else {
      productListState.setData((state) => ({
        ...state,
        data: response.data.data,
        meta: response.data.meta,
      }));
      setTotalRows(response.data.meta.itemCount);
    }

    setLoadingData(false);
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
  };
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoadingData(true);
    const queryParams: InventoryQueryParams = {
      page,
      take: newPerPage,
    };

    const response = await inventory.find(queryParams);

    productListState.setData((state) => ({
      ...state,
      data: response.data.data,
    }));
    setPerPage(newPerPage);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchData(1);
      handleSetRefresh();
    }
  }, [refresh]);

  return (
    <div className={styles.product_list}>
      <div className={styles.product_list_title}>
        <div>
          <Icon as={FiList} boxSize={8} color={"#75c2f9"} />
        </div>
        <Heading color={"#75c2f9"} size={"lg"} mb={2}>
          Lista de Productos
        </Heading>
      </div>

      <ResponsiveDataTable
        data={productListState.data}
        columns={InventoryColumns}
      />
    </div>
  );
};
