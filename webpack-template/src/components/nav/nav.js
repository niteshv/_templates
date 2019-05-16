//mobile menu button
$('.button-menu').on('click', function () {
    $(this).toggleClass('active');
    $(this).parent().find('nav').toggleClass('active');
});