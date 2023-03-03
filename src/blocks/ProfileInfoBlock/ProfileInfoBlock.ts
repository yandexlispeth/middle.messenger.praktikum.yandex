import Block from "../../components/Block";
import Label from "../../components/Label";
import Button from "../../components/Button";
import template from "./profileInfoBlock.hbs";

interface IProfileInfoLabel {
  value: string;
  class?: string;
}

interface IProfileInfoButton {
  label: string;
  events? : {
    click: () => void
  }
}

interface IProfileInfoBlock {
  labelUserName: IProfileInfoLabel;
  labelEmail: IProfileInfoLabel;
  button: IProfileInfoButton;
}

export class ProfileInfoBlock extends Block {
  constructor(props: IProfileInfoBlock) {
    super(props);
  }

  init() {
    this.children.labelUserName = new Label({
      value: this.props.labelUserName.value,
      class: "user-data__name",
    });
    this.children.labelEmail = new Label({
      value: this.props.labelEmail.value,
      class: "user-data__email",
    });
    this.children.btnChangePswd = new Button({
      label: this.props.button.label,
      events: this.props.button.events
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
