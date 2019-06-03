class Nav {
    constructor(container) {
        this.container = document.getElementById('nav-primary');
        this.button = document.getElementById('nav-button');
    }
    init() {
        this.button.addEventListener('click', evt => {
            this.container.classList.toggle('active');
        });
    }
}
export default Nav;