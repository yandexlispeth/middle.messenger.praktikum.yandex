import BaseAPI from "./BaseApi";

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
  status:string;
}

export default class AuthApi extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signup(data: ISignUpData) {
    return this.http.post("/signup", data);
  }

  signin(data: ISignInData) {
    return this.http.post("/signin", data);
  }

  logout() {
    return this.http.post("/logout");
  }

  getUser() {
    return this.http.get<IUser>("/user");
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
