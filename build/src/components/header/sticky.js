import _ from 'lodash';

class StickyHeader {
    constructor() {
        this.scrollpos = window.scrollY;
        this.header = document.querySelector("header#header");
        this.footer = document.querySelector("footer#footer");
    }
    init() {
        window.onscroll = _.throttle(() => {
            this.scrollpos = window.scrollY;
            if (this.scrollpos >= this.header.offsetHeight) {
                // add class
                this.header.classList.add("js-is-sticky");
                this.footer.classList.add("js-is-sticky");
            }
            else {
                // remove class
                this.header.classList.remove("js-is-sticky");
                this.footer.classList.remove("js-is-sticky");
            }
        }, 100);
    }
}
export default StickyHeader;