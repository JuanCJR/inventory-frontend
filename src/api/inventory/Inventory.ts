import ApiHelper from "../ApiHelper";
import {
  CreateInventoryPayload,
  InventoryInterface,
  UpdateInventoryPayload,
} from "./interface/inventory.interface";

export class Inventory {
  data: InventoryInterface[] = [];
  urls = {
    find: `/`,
    findOne: (id: number) => `/${id}`,
    create: `/`,
    delete: (id: number) => `/${id}`,
    update: (id: number) => `/${id}`,
  };

  async find(): Promise<{ data: InventoryInterface[]; status: number }> {
    const apiHelper = new ApiHelper<InventoryInterface[]>(
      "GET",
      this.urls.find
    );
    return await apiHelper.do();
  }

  async findOne(id: number): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "GET",
      this.urls.findOne(id)
    );
    return await apiHelper.do();
  }

  async create(payload: CreateInventoryPayload): Promise<{
    data: InventoryInterface;
    status: number;
  }> {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "POST",
      this.urls.create
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
      this.urls.update(id)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async delete(id: number) {
    const apiHelper = new ApiHelper<InventoryInterface>(
      "DELETE",
      this.urls.delete(id)
    );
    return await apiHelper.do();
  }
}
