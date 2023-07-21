"use client";
import { ProductList } from "@/components/products/product-list/ProductList";
import styles from "./page.module.css";
import { AlertList } from "@/components/products/alert-list";
import { FlexSection } from "@/components/section/FlexSection";
import { AddProductModal } from "@/components/modal/add-product/AddProductModal";
import { VerifyProductModal } from "@/components/modal/verify-product/VerifyProductModal";

import { useRefreshControl } from "../states/useRefreshControl";
export default function Dashboard() {
  const { refresh, handleSetRefresh } = useRefreshControl();
  return (
    <div className={styles.dashboard_container}>
      <ProductList refresh={refresh} handleSetRefresh={handleSetRefresh} />
      <AlertList />

      <FlexSection>
        <VerifyProductModal />
        <AddProductModal
          refresh={refresh}
          handleSetRefresh={handleSetRefresh}
        />
      </FlexSection>
    </div>
  );
}
