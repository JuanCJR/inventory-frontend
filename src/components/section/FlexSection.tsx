import React from "react";
import styles from "./FlexSection.module.css";
export const FlexSection = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.flexSection}>{children}</section>;
};
