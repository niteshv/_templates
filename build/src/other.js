// Component - Toggle class button
import toggleClass from './components/buttons/toggle';
const toggleButton = new toggleClass();
toggleButton.init();

// Component - Sticky Header
import stickyHeader from './components/header/sticky';
const sticky = new stickyHeader();
sticky.init();

// Component - Carousels
import CarouselStart from './components/carousel/carousel';

// On scroll 
import throttle from 'lodash/throttle';
window.onscroll = throttle(() => {
	// Sticky header
	sticky.manageClasses();
}, 50);

// CSS - Import all custom CSS style
import './components/footer/footer.scss';

// CSS - IE Fixes
import './components/ie/ie.scss';

// CSS - Print styles
import './components/base/print.scss';
