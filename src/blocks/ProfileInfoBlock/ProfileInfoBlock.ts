import Block from "../../components/Block";
import Label from "../../components/Label";
import Button from "../../components/Button";
import template from "./profileInfoBlock.hbs";

interface IProfileInfoLabelProps {
  value: string;
  class?: string;
}

interface IProfileInfoButtonProps {
  label: string;
  events?: {
    click: () => void;
  };
}

interface IProfileInfoBlockProps {
  labelUserName: IProfileInfoLabelProps;
  labelEmail: IProfileInfoLabelProps;
  button: IProfileInfoButtonProps;
}

export class ProfileInfoBlock extends Block<IProfileInfoBlockProps> {
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
      events: this.props.button.events,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
