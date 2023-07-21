import { Meta } from "@/api/interfaces/api.interface";

export interface InventoryInterface {
  id: number;
  ean: string;
  productName: string;
  expiresIn: string;
  state: string;
  daysBeforeRemove: number;
  leftDaysToRemove: number;
  removeDate: string;
}

export interface CreateInventoryPayload {
  ean: string;
  productName: string;
  expiresIn: string;
  daysBeforeRemove: number;
}

export interface UpdateInventoryPayload {
  ean?: string;
  productName?: string;
  expiresIn?: Date;
  state?: string;
}

export interface InventoryQueryParams {
  page: number;
  take: number;
}

export interface InventoryInterfaceResponse {
  data: InventoryInterface[];
  meta: Meta;
}
