// CSS - normalize.css - import vendor css
import 'normalize.css/normalize.css';

// Navigation menu button
import Navigation from './components/nav/nav';
const nav = new Navigation();
nav.init();

// Carousels
import CarouselStart from './components/carousel/carousel';
const carousels = document.querySelectorAll('[data-carousel]');
for (let carouselEl of carousels) {
  const carousel = new CarouselStart(carouselEl);
  carousel.init();
}

// CSS - Import all custom CSS styles - should be after all vendor css
import '../src/styles.scss';

console.log("test");