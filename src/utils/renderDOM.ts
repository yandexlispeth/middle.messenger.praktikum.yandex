import AuthorizationPage from "../pages/Authorization";
import ChatPage from "../pages/Chat";
import ErrorPage from "../pages/ErrorPage";
import RegistrationPage from "../pages/Registration";
import UserChangePasswordPage from "../pages/UserChangePassword";
import UserSettingsPage from "../pages/UserSettings";

export const ROUTES = {
    authorization: AuthorizationPage,
    registration: RegistrationPage,
    chat: ChatPage,
    user_settings:UserSettingsPage,
    user_change_password: UserChangePasswordPage,
    error_page: ErrorPage,
}


export function renderDOM(route: keyof typeof ROUTES, props?:any) {
    console.log("click");
    const root = document.querySelector('#app');

    root.innerHTML = '';

    const PageComponent = ROUTES[route];
    const page = new PageComponent(props);

    root.appendChild(page.element);

    page.dispatchComponentDidMount();
}
