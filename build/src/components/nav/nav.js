class Nav {
    constructor(container) {
        this.body = document.getElementById("body");
        this.button = document.getElementById('nav-button');
    }
    init() {
        this.button.addEventListener('click', evt => {
            this.body.classList.toggle("js-nav-open");
        });
    }
}
export default Nav;