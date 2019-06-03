import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

const Carousel = () => {
    window.addEventListener('load', () => {
        const flkty = new Flickity('.carousel', {
            // options
            autoPlay: true
        });
    });
}
export default Carousel;