"use client";
import { useState } from "react";

export interface UseRefreshControlProps {
  refresh: boolean;
  handleSetRefresh: () => void;
}

export const useRefreshControl = (): UseRefreshControlProps => {
  const [refresh, setRefresh] = useState(false);
  const handleSetRefresh = () => setRefresh((state) => !state);

  return { refresh, handleSetRefresh };
};
