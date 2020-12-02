// Toggle class based on data attributes

// data-toggle-class="" = Class to apply
// data-toggle-target="" = ID of target
// data-toggle-target="parent" = target parent of button
// data-toggle-remove = classe to remove

export default class toggleClass {
	constructor() {
		this.buttons = document.querySelectorAll('[data-toggle-class]');
		this.body = document.getElementById("body");
	}
	init() {
		this.buttons = Array.prototype.slice.call(this.buttons);

		this.buttons.forEach((button) => {
			const dataClass = button.getAttribute('data-toggle-class');
			const target = button.getAttribute('data-toggle-target');
			let targetID = document.getElementById(target);
			const removeClass = button.getAttribute('data-toggle-remove');

			button.addEventListener('click', () => {
				if (target === "parent") {
					targetID = button.parentElement;
				}
				if (targetID.classList.contains(dataClass)) {
					targetID.classList.remove(dataClass);
				} else {
					targetID.classList.add(dataClass);
				}
				if (removeClass) {
					targetID.classList.remove(removeClass);
				}
			});

		});
	}
}
