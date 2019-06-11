//// INDEX
// - CSS - Variables
// - CSS - Normalize.css
// - Component - Navigation menu button
// - Component - Sticky Header
// - Component - Carousels
// - CSS - All other custom css

// CSS - Variables
import './components/variables.scss';

// CSS - normalize.css - import vendor css
import 'normalize.css/normalize.css';

// Component - Navigation menu button
import Navigation from './components/nav/nav';
const nav = new Navigation();
nav.init();

// Component - Sticky Header
import stickybits from 'stickybits';
const stickybit = stickybits('#header', { useStickyClasses: true });

// Component - Carousels
import CarouselStart from './components/carousel/carousel';
const carousels = document.querySelectorAll('[data-carousel]');
for (let carouselEl of carousels) {
  const carousel = new CarouselStart(carouselEl);
  carousel.init();
}

// CSS - Import all custom CSS styles - should be after all vendor css
import './components/base/typography.scss';
import './components/header/header.scss';
import './components/nav/nav.scss';
import './components/footer/footer.scss';

// CSS - Print styles
import './components/base/print.scss';
