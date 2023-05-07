import Block from "../../components/Block";
import Label from "../../components/Label";
import template from "./profileInfoBlock.hbs";

// interface IProfileInfoLabelProps {
//   value: string;
//   class?: string;
// }


interface IProfileInfoBlockProps {
  userName: string;
  userEmail: string;
}

export class ProfileInfoBlock extends Block<IProfileInfoBlockProps> {
  init() {
    this.children.labelName = new Label({
      value: this.props.userName,
      class: "user-data__name",
    });
    this.children.labelEmail = new Label({
      value: this.props.userEmail,
      class: "user-data__email",
    });
  }

  componentDidUpdate(oldProps: IProfileInfoBlockProps, newProps: IProfileInfoBlockProps): boolean {
    if (oldProps.userName !== newProps.userName) {
      (this.children.labelName as Block).setProps({
        value: newProps.userName,
      });
    }
    if (oldProps.userEmail !== newProps.userEmail) {
      (this.children.labelEmail as Block).setProps({
        value: newProps.userEmail,
      });
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
