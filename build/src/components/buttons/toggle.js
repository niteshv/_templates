// Toggle class based on data attributes
// data-class="" = Class name
// data-class-target="" = ID of target

export default class {
    constructor() {
        this.buttons = document.querySelectorAll('[data-class]');
        this.body = document.getElementById("body");
    }
    closeHeaderOverlays() {
        // // Nav
        this.body.classList.remove("js-nav-open");
        // Search
        this.body.classList.remove("js-search-open");
        // Overlays
        const openOverlay = document.querySelector(".actions button.open.js-active");
        if (openOverlay) {
            openOverlay.classList.remove("js-active");
        }
        this.body.classList.remove("js-overlay-open");
    }
    init() {
        this.buttons.forEach((button) => {
            const dataClass = button.getAttribute('data-class');
            const target = button.getAttribute('data-class-target');
            const targetClass = document.getElementById(target);
            const removeOthers = button.hasAttribute('data-class-closeall');
            button.addEventListener('click', () => {
                if (this.body.classList.contains(dataClass)) {
                    targetClass.classList.remove(dataClass);
                } else {
                    if (removeOthers) {
                        this.closeHeaderOverlays();
                    }
                    targetClass.classList.add(dataClass);
                }
            });
        });
    }
}
