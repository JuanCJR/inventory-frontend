export interface InventoryInterface {
  id: number;
  ean: string;
  productName: string;
  expiresIn: Date;
  state: string;
}

export interface CreateInventoryPayload {
  ean: string;
  productName: string;
  expiresIn: Date;
}

export interface UpdateInventoryPayload {
  ean?: string;
  productName?: string;
  expiresIn?: Date;
  state?: string;
}
