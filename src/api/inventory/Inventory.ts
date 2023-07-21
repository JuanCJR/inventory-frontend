import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import {
  CreateInventoryPayload,
  InventoryInterface,
  InventoryInterfaceResponse,
  InventoryQueryParams,
  UpdateInventoryPayload,
} from "./interface/inventory.interface";

export class Inventory {
  data: InventoryInterface[] = [];
  baseUrl: string = "";
  urls = {
    find: (baseURL: string) => `${baseURL}/`,
    findOne: (baseURL: string, id: number) => `${baseURL}/${id}`,
    findByEan: (baseURL: string, ean: string) => `${baseURL}/ean/${ean}`,
    create: (baseURL: string) => `${baseURL}/`,
    delete: (baseURL: string, id: number) => `${baseURL}/${id}`,
    update: (baseURL: string, id: number) => `${baseURL}/${id}`,
  };

  constructor() {
    this.baseUrl = config.api.url;
  }

  async find(
    queryParams: InventoryQueryParams
  ): Promise<{ data: InventoryInterfaceResponse; status: number }> {
    const apiHelper = new ApiHelper<InventoryInterfaceResponse>(
      "GET",
      this.urls.find(this.baseUrl)
    );
    apiHelper.addQueryParams(queryParams);
    return await apiHelper.do();
  }

  async findOne(id: number): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "GET",
      this.urls.findOne(this.baseUrl, id)
    );
    return await apiHelper.do();
  }

  async findByEan(ean: string): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "GET",
      this.urls.findByEan(this.baseUrl, ean)
    );
    return await apiHelper.do();
  }

  async create(payload: CreateInventoryPayload): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "POST",
      this.urls.create(this.baseUrl)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async update(
    id: number,
    payload: UpdateInventoryPayload
  ): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "PUT",
      this.urls.update(this.baseUrl, id)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async delete(id: number) {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "DELETE",
      this.urls.delete(this.baseUrl, id)
    );
    return await apiHelper.do();
  }
}
