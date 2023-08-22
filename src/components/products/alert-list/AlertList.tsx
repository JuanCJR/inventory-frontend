import { Inventory } from "@/api/inventory/Inventory";
import {
  InventoryInterface,
  InventoryQueryParams,
} from "@/api/inventory/interface/inventory.interface";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import { useEffect, useState } from "react";
import styles from "./AlertList.module.css";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";
import { Heading, Icon } from "@chakra-ui/react";
import { FiFlag } from "react-icons/fi";
import { ResponsiveDataTable } from "@/components/responsive-table/ResponsiveTable";
import { AlertListColums } from "./types/AlertList.columns";

interface AlertListProps extends UseRefreshControlProps {
  id: string;
}

export const AlertList = (props: AlertListProps) => {
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

    const response = await inventory.findAlerts(queryParams);
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

    const response = await inventory.findAlerts(queryParams);

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
    <div className={styles.alert_list}>
      <div className={styles.alert_list_title}>
        <div>
          <Icon as={FiFlag} boxSize={8} color={"#75c2f9"} />
        </div>
        <Heading size={"lg"} mb={2} color={"#75c2f9"}>
          Alertas
        </Heading>
      </div>

      <ResponsiveDataTable
        data={productListState.data}
        columns={AlertListColums}
      />
    </div>
  );
};
