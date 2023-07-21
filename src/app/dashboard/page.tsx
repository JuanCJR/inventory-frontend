"use client";
import { ProductList } from "@/components/products/product-list/ProductList";
import styles from "./page.module.css";
import { AlertList } from "@/components/products/alert-list/AlertList";
import { FlexSection } from "@/components/section/FlexSection";
import { AddProductModal } from "@/components/modal/add-product/AddProductModal";
import { VerifyProductModal } from "@/components/modal/verify-product/VerifyProductModal";
import { AlertsModal } from "@/components/modal/alerts/AlertsModal";

import { useRefreshControl } from "../states/useRefreshControl";
export default function Dashboard() {
  const { refresh, handleSetRefresh } = useRefreshControl();
  return (
    <div className={styles.dashboard_container}>
      <ProductList refresh={refresh} handleSetRefresh={handleSetRefresh} />
      <AlertList refresh={refresh} handleSetRefresh={handleSetRefresh} />

      <FlexSection>
        <VerifyProductModal />

        <AlertsModal refresh={refresh} handleSetRefresh={handleSetRefresh} />

        <AddProductModal
          refresh={refresh}
          handleSetRefresh={handleSetRefresh}
        />
      </FlexSection>
    </div>
  );
}
