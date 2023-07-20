"use client";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.css";
export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Heading size={"lg"}>Control de Vencimiento</Heading>
    </div>
  );
};
