import Flickity from 'flickity';

const Carousel = () => {
    window.addEventListener('load', () => {
        const flkty = new Flickity('.carousel', {
            // options
            autoPlay: true
        });
    });
}
export default Carousel;