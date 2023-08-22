import { Meta } from "@/api/interfaces/api.interface";

export interface Store {
  id: number;
  name: string;
}

export interface StoreInterfaceResponse {
  data: Store[];
  meta: Meta;
}

export interface StoreQueryParams {
  page: number;
  take: number;
}

export interface CreateStoreInterface {
  name: string;
}

export interface UpdateStoreInterface {
  name?: string;
}
