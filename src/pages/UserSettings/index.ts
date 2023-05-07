import Form from "../../components/Form";
import ProfileInfoBlock from "../../blocks/ProfileInfoBlock";
import Block from "../../components/Block";
import template from "./user_settings.hbs";
import Button from "../../components/Button";
import Router from "../../utils/Router";
import router from "../../utils/Router";
import {Routes} from "../..";
import {withStore} from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import {IUser} from "../../api/AuthApi";
import Link from "../../components/Link";

interface IUserSettingsPageBase {
    first_name:string;
    email:string;
}
class UserSettingsPageBase extends Block<IUserSettingsPageBase> {
    init() {
        this.children.btnBack = new Link({
            label: "Назад",
            events: {
                click: (() => router.back())
            },
            // class: "user-settings__btnback"
        });
        this.children.profileInfoBlock = new ProfileInfoBlock({
            userName: this.props.first_name,
            userEmail: this.props.email,
        });

        this.children.btnChangePassword = new Button({
            label: "Изменить пароль",
            events: {
                click: () => Router.go(Routes.Password)
            },
        });

        this.children.btnLogout = new Button({
            label: "Выход из профиля",
            events: {
                click: () => AuthController.logout()
            }
        })

        this.children.formUserSettings = new Form({
            fields: [
                {
                    input: {
                        type: "text",
                        name: "email",
                        placeholder: "Почта",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "login",
                        placeholder: "Логин",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "display_name",
                        placeholder: "Ник",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "phone",
                        placeholder: "Телефон",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "first_name",
                        placeholder: "Имя",
                    },
                },
                {
                    input: {
                        type: "text",
                        name: "second_name",
                        placeholder: "Фамилия",
                    },
                },
            ],
            buttons: {
                label: "Сохранить изменения",
                events: {
                    click: (e) => {
                        e.preventDefault();
                        this.saveForm();
                    }
                }
            },
            class: "user_settings_form",
        });
    }

    componentDidUpdate(oldProps: IUserSettingsPageBase, newProps: IUserSettingsPageBase) {
        if (oldProps.first_name !== newProps.first_name) {
            (this.children.profileInfoBlock as Block).setProps({
                userName: newProps.first_name
            });
        }
        if (oldProps.email !== newProps.email) {
            (this.children.profileInfoBlock as Block).setProps({
                userEmail: newProps.email
            });
        }
        return true;
    }

    saveForm() {
        const data = (this.children.formUserSettings as Form).getValues();
        UserController.change_profile(data as IUser).then(() => {
            this.dispatchComponentDidMount();
        });
        (this.children.formUserSettings as Form).reset();
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const UserSettingsPage = withStore((state) => {
    return {...state.user?.data} || {};
})(UserSettingsPageBase as typeof Block)
