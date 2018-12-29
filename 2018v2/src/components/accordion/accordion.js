// accordion
$('.acc-link').on('click', function () {
    $(this).parent().find('.acc-content').toggleClass('acc-content-open');
    $(this).parent().toggleClass('acc-link-open');
    return false;
});