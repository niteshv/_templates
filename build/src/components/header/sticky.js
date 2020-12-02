
export default class stickyHeader {
	constructor() {
		this.scrollpos = window.scrollY;
		this.header = document.getElementById("header");
		this.body = document.getElementById("body");
	}
	manageClasses() {
		this.scrollpos = window.scrollY;
		if (this.scrollpos >= (this.header.offsetHeight)) {
			this.body.classList.add("js-header-sticky");
		}
		else {
			this.body.classList.remove("js-header-sticky");
		}
	}
	init() {
		this.manageClasses();
	}
}