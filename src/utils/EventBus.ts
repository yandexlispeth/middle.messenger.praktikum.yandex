export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  on(event:string, callback:any) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event:string, callback:any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event:string, ...args:[]) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
