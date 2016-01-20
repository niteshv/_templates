$(document).ready(function () {

	// window width
    //var windoww = $(window).width();
    // run on window re-size
    //$(window).bind("resize", function () {
    //    var windoww = $(window).width();
    //});

    //add class for links opening in new window
    $('a[target="_blank"]').addClass('newwindow');
    //var nw = "<span class='newwindow-icon'></span>";
    //$(".newwindow").append(nw);

    // accordion
    $('.acc-link').on('click', function () {
        $(this).parent().find('.acc-content').toggleClass('acc-content-open');
        $(this).parent().toggleClass('acc-link-open');
        return false;
    });

    //mobile button 
    $('#mobilemenu').on('click', function () {
        $(this).toggleClass('active');
        $(this).parent().find('.nav-primary').toggleClass('active');
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

});