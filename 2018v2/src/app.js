$(document).ready(function () {

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

    @@include('./components/nav/nav.js')
    @@include('./components/accordion/accordion.js')

});
