import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import {
  CreateStoreInterface,
  Store,
  StoreInterfaceResponse,
  StoreQueryParams,
  UpdateStoreInterface,
} from "./interface/store.interface";

export class StoreApiHandler {
  data: Store[] = [];
  baseUrl: string = "";
  urls = {
    find: (baseURL: string) => `${baseURL}/store`,
    findOne: (baseURL: string, id: number) => `${baseURL}/store/${id}`,
    create: (baseURL: string) => `${baseURL}/store`,
    delete: (baseURL: string, id: number) => `${baseURL}/store/${id}`,
    update: (baseURL: string, id: number) => `${baseURL}/store/${id}`,
  };

  constructor() {
    this.baseUrl = config.api.url;
  }

  async find(
    queryParams: StoreQueryParams
  ): Promise<{ data: StoreInterfaceResponse; status: number }> {
    const apiHelper = new ApiHelper<StoreInterfaceResponse>(
      "GET",
      this.urls.find(this.baseUrl)
    );
    apiHelper.addQueryParams(queryParams);
    return await apiHelper.do();
  }

  async findOne(id: number): Promise<{
    data: Store;
    status: number;
  }> {
    const apiHelper = new ApiHelper<Store>(
      "GET",
      this.urls.findOne(this.baseUrl, id)
    );
    return await apiHelper.do();
  }

  async create(payload: CreateStoreInterface): Promise<{
    data: Store;
    status: number;
  }> {
    const apiHelper = new ApiHelper<Store>(
      "POST",
      this.urls.create(this.baseUrl)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async update(
    id: number,
    payload: UpdateStoreInterface
  ): Promise<{
    data: Store;
    status: number;
  }> {
    const apiHelper = new ApiHelper<Store>(
      "PUT",
      this.urls.update(this.baseUrl, id)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async delete(id: number) {
    const apiHelper = new ApiHelper<Store>(
      "DELETE",
      this.urls.delete(this.baseUrl, id)
    );
    return await apiHelper.do();
  }
}
