import { useState } from "react";

export interface PageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function useComponentArrayData<T>() {
  const [data, setData] = useState<{
    data: T[];
    meta: PageMeta;
  }>({
    data: [],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  });

  const cleanState = () => {
    setData({
      data: [],
      meta: {
        page: 0,
        take: 0,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
    });
  };
  return { data: data.data, meta: data.meta, setData, cleanState };
}
