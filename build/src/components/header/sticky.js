import _ from 'lodash';

class StickyHeader {
    constructor() {
        this.scrollpos = window.scrollY;
        this.header = document.getElementById("header");
        this.body = document.getElementById("body");
    }
    init() {
        window.onscroll = _.throttle(() => {
            this.scrollpos = window.scrollY;
            if (this.scrollpos >= this.header.offsetHeight) {
                // add class
                this.body.classList.add("js-header-sticky");
            }
            else {
                // remove class
                this.body.classList.remove("js-header-sticky");
            }
        }, 50);
    }
}
export default StickyHeader;