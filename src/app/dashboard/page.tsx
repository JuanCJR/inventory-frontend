import { ProductList } from "@/components/products/product-list/ProductList";
import styles from "./page.module.css";
import { AlertList } from "@/components/products/alert-list";
export default function Dashboard() {
  return (
    <div className={styles.dashboard_container}>
      <ProductList />
      <AlertList />

      <div style={{ display: "flex", width: "100vw", marginTop: "18px" }}>
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
        <div
          style={{
            marginLeft: "auto",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "4rem",
            height: "50px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          Agregar
        </div>
      </div>
    </div>
  );
}
