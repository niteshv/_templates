// CSS - normalize.css - import vendor css
import 'normalize.css/normalize.css';

// CSS - Carousel - import vendor css
import 'flickity/dist/flickity.min.css';
// JS - Carousel import JS
import CarouselStart from './components/carousel/carousel';
CarouselStart();

// CSS - Import all custom CSS styles - should be after all vendor css
import '../src/styles.scss';

console.log("test");