import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import {
  CreateUserInterface,
  UpdateUserInterface,
  User,
  UserInterfaceResponse,
  UserQueryParams,
} from "./interface/user.interface";

export class UserApiHandler {
  data: User[] = [];
  baseUrl: string = "";
  urls = {
    find: (baseURL: string) => `${baseURL}/user`,
    login: (baseURL: string) => `${baseURL}/login`,
    create: (baseURL: string) => `${baseURL}/user`,
    findOne: (baseURL: string, id: number) => `${baseURL}/user/${id}`,
    delete: (baseURL: string, id: number) => `${baseURL}/user/${id}`,
    update: (baseURL: string, id: number) => `${baseURL}/user/${id}`,
  };

  constructor() {
    this.baseUrl = config.api.url;
  }

  async find(
    queryParams: UserQueryParams
  ): Promise<{ data: UserInterfaceResponse; status: number }> {
    const apiHelper = new ApiHelper<UserInterfaceResponse>(
      "GET",
      this.urls.find(this.baseUrl)
    );
    apiHelper.addQueryParams(queryParams);
    return await apiHelper.do();
  }

  async findOne(id: number): Promise<{
    data: User;
    status: number;
  }> {
    const apiHelper = new ApiHelper<User>(
      "GET",
      this.urls.findOne(this.baseUrl, id)
    );
    return await apiHelper.do();
  }

  async login(
    username: string,
    password: string
  ): Promise<{
    data: User;
    status: number;
  }> {
    const apiHelper = new ApiHelper<User>(
      "POST",
      this.urls.login(this.baseUrl)
    );
    apiHelper.addBody({ username, password });
    return await apiHelper.do();
  }

  async create(payload: CreateUserInterface): Promise<{
    data: User;
    status: number;
  }> {
    const apiHelper = new ApiHelper<User>(
      "POST",
      this.urls.create(this.baseUrl)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async update(
    id: number,
    payload: UpdateUserInterface
  ): Promise<{
    data: User;
    status: number;
  }> {
    const apiHelper = new ApiHelper<User>(
      "PUT",
      this.urls.update(this.baseUrl, id)
    );
    apiHelper.addBody(payload);
    return await apiHelper.do();
  }

  async delete(id: number) {
    const apiHelper = new ApiHelper<User>(
      "DELETE",
      this.urls.delete(this.baseUrl, id)
    );
    return await apiHelper.do();
  }
}
