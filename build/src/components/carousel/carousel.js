import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

const Carousel = () => {
    const carouselItem = document.querySelector('[data-carousel]');
    window.addEventListener('load', () => {
        const flkty = new Flickity( carouselItem, {
            // options
            autoPlay: true
        });
    });
}
export default Carousel;