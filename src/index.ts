import Block from './components/Block';
import AuthorizationPage from './pages/Authorization';
import ChatPage from './pages/Chat';
import RegistrationPage from './pages/Registration';
import UserChangePasswordPage from './pages/UserChangePassword';
import UserSettingsPage from './pages/UserSettings';
import Router  from './utils/router';

export enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
  Password = '/password'
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');

    const home_page = new ChatPage();
    root?.append(home_page.getContent()!);
    home_page.dispatchComponentDidMount();

    const router = Router;

  router
      .use(Routes.Index, AuthorizationPage as typeof Block)
      .use(Routes.Register, RegistrationPage as typeof Block)
      .use(Routes.Profile, UserSettingsPage as typeof Block)
      .use(Routes.Messenger, ChatPage as typeof Block)
      .use(Routes.Password, UserChangePasswordPage as typeof Block)

    // router.go('/messenger');
    //   .use('/register', RegistrationPage)
    //   .use('/profile', ProfilePage);

//   try {
//     await AuthController.fetchUser();

//     router.go('/profile');
//   } catch (e) {
//     console.log('Error fetching user', e);
//     router.go('/signin');
//   }

  router.start();
  router.go('/profile');
})
