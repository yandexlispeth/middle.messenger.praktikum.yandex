import Button from "../../components/Button";
import Form from "../../components/Form";
import Label from "../../components/Label";
import Block from "../../utils/Block";
import template from "./user_settings.hbs";

export class UserSettingsPage extends Block {

  init() {
    this.children.labelUserName = new Label({ text: "Алина", class: "user-data__name" });
    this.children.labelEmail = new Label({ text: "alinamalina@gmail.com", class: "user-data__email"});
    this.children.btnChangePswd = new Button({ label: "Изменить пароль" });
    this.children.formUserSettings = new Form({
      fields: [
        {
          type: "text",
          name: "email",
          placeholder: "Почта",
          // className: "user-settings__field"
        },
        {
          type: "text",
          name: "login",
          placeholder: "Логин",
          // className: "user-settings__field"
        },
        {
          type: "text",
          name: "display_name",
          placeholder: "Ник",
          // className: "user-settings__field"
        },
        {
          type: "text",
          name: "phone",
          placeholder: "Телефон",
          // className: "user-settings__field"
        },
        {
          type: "text",
          name: "first_name",
          placeholder: "Имя",
          // className: "user-settings__field"
        },
        {
          type: "text",
          name: "second_name",
          placeholder: "Фамилия",
          // className: "user-settings__field"
        },
      ],
      buttons: {
        label: "Сохранить изменения",
      },
      class: "input-fields__container"
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
