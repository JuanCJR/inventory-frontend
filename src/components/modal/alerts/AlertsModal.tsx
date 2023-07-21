"use client";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./AlertsModal.module.css";
import {
  InventoryInterface,
  InventoryQueryParams,
} from "@/api/inventory/interface/inventory.interface";
import { Inventory } from "@/api/inventory/Inventory";
import { UseRefreshControlProps } from "@/app/states/useRefreshControl";
import { FiCamera, FiFlag } from "react-icons/fi";
import { useComponentArrayData } from "@/states/useComponentArrayData";
import { ResponsiveDataTable } from "@/components/responsive-table/ResponsiveTable";
import { AlertListColums } from "@/components/products/alert-list/types/AlertList.columns";
interface AlertsModalProps extends UseRefreshControlProps {}

export const AlertsModal = (props: AlertsModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refresh, handleSetRefresh } = props;
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
    <div>
      <IconButton
        bg={"white"}
        aria-label="verify product"
        className={styles.alertModalButton}
        icon={<FiFlag color={"#75c2f9"} />}
        onClick={onOpen}
      />

      {/*   Modal  */}
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Alertas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ResponsiveDataTable
              data={productListState.data}
              columns={AlertListColums}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
