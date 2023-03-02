import AuthorizationPage from "../pages/Authorization";
import ChatPage from "../pages/Chat";
import RegistrationPage from "../pages/Registration";
import UserChangePasswordPage from "../pages/UserChangePassword";
import UserSettingsPage from "../pages/UserSettings";

export const ROUTES = {
    authorization: AuthorizationPage,
    registration: RegistrationPage,
    chat: ChatPage,
    user_settings:UserSettingsPage,
    user_change_password: UserChangePasswordPage,
}


export function renderDOM(route: keyof typeof ROUTES) {
    const root = document.querySelector('#app');

    root.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent({});

    root.appendChild(page.element);

    page.dispatchComponentDidMount();
}
