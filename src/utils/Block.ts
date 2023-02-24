import { EventBus } from "./EventBus";

export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update",
      FLOW_CWU: "flow:component-will-unmount"
    };
  
  _element = null;
  _meta = null;
  
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
  
    this.props = this._makePropsProxy(props);
  
    this.eventBus = () => eventBus;
  
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }
  
  init() {
    this._createResources();

    this.init();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }
  
  _componentDidMount() {
    this.componentDidMount();
  }
  
  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}
  
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  
  _componentDidUpdate(oldProps, newProps) {
    if(this.componentDidUpdate(oldProps, newProps)  {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  
  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }
  
  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
  
    Object.assign(this.props, nextProps);
  };


  
  get element():Node {
    return this._element;
  }
  
  private _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.append(block);
    this._addEvents();
    
  }
  
  // Может переопределять пользователь, необязательно трогать
  render() {}
  
  getContent() {
    return this.element;
  }
  
    _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    
    props = new Proxy(props,  {
      set(target, key, value) {
        self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
      },
    
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  
    return props;
  }
  
  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  compile(template, context){}
  
  show() {
     
  }
  
  hide() { 
  }
  }
