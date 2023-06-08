import { IUser } from "../api/AuthApi";
import ChatApi from "../api/ChatApi";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private api: ChatApi;

  constructor() {
    this.api = new ChatApi();
  }

  async create(title: string) {
    await this.api
      .create(title)
      .then((res: any) => store.set("selectedChat", res.id));
    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();
    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set("chats", chats);
  }

  addUserToChat(id: number, user_id: number) {
    this.api.addUsers(id, [user_id]);
  }

  deleteUserFromChat(id: number, user_id: number) {
    this.api.deleteUsers(id, [user_id]);
  }

  async getUsersFromChat(id: number): Promise<IUser[] | undefined> {
    try {
      return await this.api.getUsersFromChat(id).then((response) => {
        return response;
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  async delete(id: number) {
    await this.api.delete(id);
    await this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }
}

const controller = new ChatsController();

export default controller;
