import Block from './components/Block';
import AuthorizationPage from './pages/Authorization';
import ChatPage from './pages/Chat';
import RegistrationPage from './pages/Registration';
import UserChangePasswordPage from './pages/UserChangePassword';

import Router from './utils/router';
import AuthController from "./controllers/AuthController";
import {UserSettingsPage} from "./pages/UserSettings";

export enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
  Password = '/password'
}

window.addEventListener('DOMContentLoaded', async () => {
    // const root = document.querySelector('#app');

    // const home_page = new ChatPage();
    // root?.append(home_page.getContent()!);
    // home_page.dispatchComponentDidMount();

    const router = Router;

    router
        .use(Routes.Index, AuthorizationPage as typeof Block)
        .use(Routes.Register, RegistrationPage as typeof Block)
        .use(Routes.Profile, UserSettingsPage as typeof Block)
        .use(Routes.Messenger, ChatPage as typeof Block)
        .use(Routes.Password, UserChangePasswordPage as typeof Block);

    let is_protected = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Register:
            is_protected = false;
            break;
    }


    // router.go('/messenger');
    //   .use('/register', RegistrationPage)
    //   .use('/profile', ProfilePage);

    // eslint-disable-next-line no-debugger
    // debugger;
    try {
        await AuthController.fetchUser();

        Router.start();

        if (is_protected) {
            Router.go(Routes.Messenger)
        }
    } catch (e) {
        console.log("E", e);
        Router.start();
        // if (is_protected) {
            Router.go(Routes.Index);
        // }
    }
})
