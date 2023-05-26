import ChatApi from "../api/ChatApi";
import store from "../utils/Store";

class ChatsController {
  private api: ChatApi;

  constructor() {
    this.api = new ChatApi();
  }

  async create(title: string) {
    await this.api.create(title);
    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();
    try {
      store.set("chats", chats);
    } catch (e) {
      console.log(e);
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
    console.log("SelectChat", id);
    store.set("selectedChat", id);
    console.log(store.getState());
  }
}

export default new ChatsController();
