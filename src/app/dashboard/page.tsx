"use client";
import { ProductList } from "@/components/products/product-list/ProductList";
import styles from "./page.module.css";
import { AlertList } from "@/components/products/alert-list";
import { FlexSection } from "@/components/section/FlexSection";
import { AddProductModal } from "@/components/modal/add-product/AddProductModal";
import { useRefreshControl } from "../states/useRefreshControl";
export default function Dashboard() {
  const { refresh, handleSetRefresh } = useRefreshControl();
  return (
    <div className={styles.dashboard_container}>
      <ProductList refresh={refresh} handleSetRefresh={handleSetRefresh} />
      <AlertList />

      <FlexSection>
        <div
          style={{
            marginRight: "auto",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "4rem",
            height: "50px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={{ textAlign: "center" }}>Verificar</div>
        </div>
        <AddProductModal
          refresh={refresh}
          handleSetRefresh={handleSetRefresh}
        />
      </FlexSection>
    </div>
  );
}
