import HomePage from './pages/HomePage';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');

    const home_page = new HomePage();
    root.append(home_page.getContent()!);
    home_page.dispatchComponentDidMount();
})
