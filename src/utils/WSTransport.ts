import { EventBus } from "./EventBus";

export enum WSTransportEvents {
  Connected = "open",
  Error = "error",
  Message = "message",
  Close = "close",
}

export class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Socket is not connected!");
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  private setupPing() {
    this.pingInterval = window.setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  public close() {
    if (!this.socket) {
      throw new Error("Socket is not connected!");
    }

    this.socket.close();
  }

  public subscribe(socket: WebSocket) {
    socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if(data.type === 'pong') {
        return;
      }
      
      this.emit(WSTransportEvents.Message, data);
    });

    socket.addEventListener("close", () => {this.emit(WSTransportEvents.Close)});
    socket.addEventListener("open", () => {this.emit(WSTransportEvents.Connected)});
    socket.addEventListener("error", () => {this.emit(WSTransportEvents.Error)}); 
  }
}
