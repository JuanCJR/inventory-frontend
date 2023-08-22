import { Meta } from "@/api/interfaces/api.interface";
import { Store } from "@/api/store/interface/store.interface";

export interface UserQueryParams {
  page: number;
  take: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  store: Store;
}

export interface UserInterfaceResponse {
  data: User[];
  meta: Meta;
}

export interface CreateUserInterface {
  username: string;
  password: string;
  store_id: number;
}

export interface UpdateUserInterface {
  username?: string;
  password?: string;
  store_id?: number;
}
