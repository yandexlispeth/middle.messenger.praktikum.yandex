import template from './index.hbs';
import { AuthorizationPage } from './pages/Authorization';
import { ChatPage } from './pages/Chat';
import { RegistrationPage } from './pages/Registration';
import { UserChangePasswordPage } from './pages/UserChangePassword';
import { UserSettingsPage } from './pages/UserSettings';



// function render(html:string) {
//     const app = document.querySelector('#app');

//     app.innerHTML = html;
// }

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');
    
    // const auth = new AuthorizationPage();
    // root.append(auth.getContent()!);
    // auth.dispatchComponentDidMount();
    
    // const register = new RegistrationPage();
    // root.append(register.getContent()!);
    // register.dispatchComponentDidMount();


    // const user_settings = new UserSettingsPage();
    // root.append(user_settings.getContent()!);
    // user_settings.dispatchComponentDidMount();

    // const user_change_password = new UserChangePasswordPage();
    // root.append(user_change_password.getContent()!);
    // user_change_password.dispatchComponentDidMount();

    // const chat = new ChatPage();
    // root.append(chat.getContent()!);
    // chat.dispatchComponentDidMount();

    
    // const context = {title: "Warm Lamp Chat"};
    // const html = template(context);
    // render(html);

    // const button = new Button({
    //     label: "Click me",
    //     events: {
    //         click: () => console.log("Clicked!"),
    //     }
    // });

    // const input = new Input({
    //     type: "text",
    //     name: "message",
    //     placeholder: "Поиск",
    //     events: {
    //         click: () => console.log("Clicked!"),
    //     }
    // });

    // root!.appendChild(button.element!);
    // root!.appendChild(input.element!);
});
