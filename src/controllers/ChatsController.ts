import ChatApi from "../api/ChatApi";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private api: ChatApi;

  constructor() {
    this.api = new ChatApi();
  }

  async create(title: string) {
    await this.api.create(title).then((res:any) => store.set("selectedChat", res.id));
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

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
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
