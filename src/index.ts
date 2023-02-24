// import template from './template.hbs';

import Button from "./components/Button";


// function render(html) {
//     const app = document.querySelector('#app');

//     app.innerHTML = html;
// }

window.addEventListener('DOMContentLoaded', () => {
    const root:HTMLElement|null = document.querySelector('#app');
    // const context = {title: "Warm lamp chat"};
    // const html = template(context);
    // render(html);

    const button = new Button({
        label: "Click me",
        events: {
            click: () => console.log("Clicked!"),
        }
    });

    root!.appendChild(button.element);
});
