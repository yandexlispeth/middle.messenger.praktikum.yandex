import BaseAPI from "./BaseApi";
import { IUser } from "./AuthApi";

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

export default class UserApi extends BaseAPI {
  constructor() {
    super("/user");
  }

  changeProfile(data: IUser): Promise<IUser> {
    return this.http.put("/profile", data);
  }

  changePassword(data: IUserChangePassword): Promise<boolean> {
    return this.http.put("/password", data);
  }

  updateAvatar(file: FormData): Promise<IUser> {
    return this.http.put("/profile/avatar", file);
  }

  searchUser(login: string): Promise<IUser[]> {
    return this.http.post("/search", { login: login });
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
