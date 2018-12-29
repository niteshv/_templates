var $slider = $('section.slider .slider');
var $slidercount = $('.slider-count');
var $sliderprogress = $('.slider-progress');

$(document).ready(function () {

    // window width
    var windoww = $(window).width();
    // run on window re-size
    $(window).bind("resize", function () {
        var windoww = $(window).width();
    });

    //add class for links opening in new window
    $('a[target="_blank"]').addClass('newwindow');

    // accordion
    $('.acc-link').on('click', function () {
        $(this).parent().find('.acc-content').toggleClass('acc-content-open');
        $(this).parent().toggleClass('acc-link-open');
        return false;
    });

    //mobile button
    $('.button-menu').on('click', function () {
        $(this).toggleClass('active');
        $(this).parent().find('nav').toggleClass('active');
    });

    // smooth scroll to
    $('a[href^="#"]').on("click", function () {
        var target = $($(this).attr("href"));
        if (target.length && $(this).attr("href") != '#top') {
            $("html, body").animate({
                scrollTop: target.offset().top
            }, 500);
        } else {
            $("html, body").animate({
                scrollTop: 0
            }, 500);
        }
    });

    $slider.on('init reInit',
        function(event, slick, currentSlide, nextSlide) {
            //progress bar
            var calc = (1 / (slick.slideCount)) * 100;
            $sliderprogress.css('width', calc + '%');
            // label
            var i = (nextSlide ? nextSlide : 0) + 1;
            $slidercount.text(i + ' of ' + slick.slideCount);
    });
    $slider.on('beforeChange',
        function(event, slick, currentSlide, nextSlide) {
            //progress bar
            var calc = ((nextSlide + 1) / (slick.slideCount)) * 100;
            $sliderprogress.css('width', calc + '%');
            // label
            var i = (nextSlide ? nextSlide : 0) + 1;
            $slidercount.text(i + ' of ' + slick.slideCount);
    });
    $slider.slick({
        slide: 'article',
        autoplay: false,
        dots: true,
        rows: 0
    });

});