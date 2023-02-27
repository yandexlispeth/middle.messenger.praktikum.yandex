import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = nanoid(6);
  protected props: any;
  public children: Record<string, Block | Block[]>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { props: any };

  /** JSDoc
   * @param {Object} propsWithChildren
   *
   * @returns {void}
   */
  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this.children = children;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((el) => el instanceof Block)) {
        children[key] = value;
      } else {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (child) => `<div data-id="${child.id}"></div>`
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((child) => {
          const stub = temp.content.querySelector(`[data-id="${child.id}"]`);

          if (!stub) {
            return;
          }

          stub.replaceWith(child.getContent()!);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
          return;
        }

        stub.replaceWith(component.getContent()!);
      }
    });

    return temp.content;
  }

  protected componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          ch.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log("render");
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    console.log("newElement", newElement);

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    console.log("_ELEMENT", this._element);

    // this._removeEvents();

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;

    props = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        }
        return true;
      },

      deleteProperty() {
        throw new Error("нет доступа");
      },
    });
    return props;
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
