import Message from "../blocks/Message";
import store from "../utils/Store";
import { WSTransport, WSTransportEvents } from "../utils/WSTransport";

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.getSocket(id)) {
      return;
    }

    const { user } = store.getState();
    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${user?.data?.id}/${id}/${token}`
    );
    this.subscribe(wsTransport, id);
    this.sockets.set(id, wsTransport);
    await wsTransport.connect();

    this.fetchOldMessages(id);
  }

  public sendMessage(id: number, message: string) {
    const socket = this.getSocket(id);

    if (!socket) {
      throw new Error("Channel is closed");
    }

    socket?.send({ type: "message", content: message });
  }

  public getSocket(id: number) {
    const transport = this.sockets.get(id);

    return transport;
  }

  public fetchOldMessages(id: number) {
    const socket = this.getSocket(id);

    if (!socket) {
      throw new Error("Channel is closed");
    }

    socket.send({ content: "0", type: "get old" });
  }

  public closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: Message | Message[]) {
    console.log("onMessage");
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      store.set(`messages.${id}`, messages);
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    if (this.getSocket(id)) {
      this.sockets.delete(id);
    }
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) =>
      this.onMessage(id, message)
    );
    transport.on(WSTransportEvents.Close, (id: number) => this.onClose(id));
  }
}
const messages_controller = new MessagesController();
//@ts-ignore
window.messagesController = messages_controller;
export default messages_controller;
