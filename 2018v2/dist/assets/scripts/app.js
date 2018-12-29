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

    //mobile menu button
$('.button-menu').on('click', function () {
    $(this).toggleClass('active');
    $(this).parent().find('nav').toggleClass('active');
});
    // accordion
$('.acc-link').on('click', function () {
    $(this).parent().find('.acc-content').toggleClass('acc-content-open');
    $(this).parent().toggleClass('acc-link-open');
    return false;
});

});
