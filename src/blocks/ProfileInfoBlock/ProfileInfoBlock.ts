import Block from "../../components/Block";
import Label from "../../components/Label";
import template from "./profileInfoBlock.hbs";
import Avatar from "../../components/Avatar";


interface IProfileInfoBlockProps {
  avatar: string | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
}

export class ProfileInfoBlock extends Block<IProfileInfoBlockProps> {
  init() {
    this.children.Avatar = new Avatar({
      src: this.props.avatar
    })
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

    if(oldProps.avatar !== newProps.avatar) {
      (this.children.Avatar as Block).setProps({
        src: newProps.avatar,
      });
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
