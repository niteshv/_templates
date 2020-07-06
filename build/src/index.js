//// INDEX
//
// - CSS - Normalize.css
// - JS - Add js class to html
// - Component - Toggle class button
// - Component - Sticky Header
// - Component - Carousels
// - JS - Smooth scroll
// - JS - Load images
// - CSS - All other custom css
// - CSS - IE Fixes
// - CSS - Print styles

// CSS - normalize.css - import vendor css
import 'normalize.css/normalize.css';

// JS - Add js class to html
document.querySelector('html.no-js').className = 'js';

// Component - Toggle class button
import toggleClass from './components/buttons/toggle';
const toggleButton = new toggleClass();
toggleButton.init();

// Component - Sticky Header
import StickyHeader from './components/header/sticky';
const sticky = new StickyHeader();
sticky.init();

// Component - Carousels
import CarouselStart from './components/carousel/carousel';

// JS - Smooth scroll
import SmoothScroll from 'smooth-scroll';
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 400,
    easing: 'easeOutQuad',
    offset: function (anchor, toggle) {
        const headerHeight = document.getElementById('header').getBoundingClientRect().height;
        return headerHeight;
    }
});

// JS - Load images
import LazyLoad from "vanilla-lazyload";
const lazyLoadOptions = {
    use_native: true
};
const pageLazyLoad = new LazyLoad();

// CSS - Import all custom CSS style
import './components/base/typography.scss';
import './components/mixins/scrollbars.scss';
import './components/header/header.scss';
import './components/nav/nav.scss';
import './components/footer/footer.scss';

// CSS - IE Fixes
import './components/ie/ie.scss';

// CSS - Print styles
import './components/base/print.scss';
