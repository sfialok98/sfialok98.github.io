$(document).ready(function() {


    //Animate on Scroll initialization
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //triggers animation on skill items when they come into view
    $('.skill-item').waypoint(function(direction) {
        var par = this.element;
        var child = $(par).find('.ldBar')[0];
        var value = $(child).data('targetvalue');
        var bar = new ldBar(child);
        bar.set(value);
    }, {
        offset: "90%"
    })

    //scroll-indicator click handler
    //scrolls to skills section
    $('a.scroll-indicator').on('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 55
        }, 1000);
        e.preventDefault();
    });

    //for navbar animation on scroll
    function toggleClasses() {
        var $nav = $("#mainNav");
        $nav.toggleClass("bg-primary", $(document).scrollTop() > $nav.height());
        $nav.toggleClass("mx-lg-5", $(document).scrollTop() <= $nav.height());
        $nav.toggleClass("border-bottom", $(document).scrollTop() <= $nav.height());
    }

    //initialize classes on navbar when page loads
    toggleClasses();

    //scrollbar event for navbar animation
    $(document).scroll(toggleClasses)

    //smooth scrolling
    $('#mainNav a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
            scrollTop: $(hash).offset().top - 55
            }, 800);
        }
    });

    //background zoom effect in home page
    document.body.onscroll = () => {
        const header = document.getElementById('intro');
        const introBackground = document.getElementById('introBackground');
        const dimen = header.getBoundingClientRect();
        const height = dimen.height;
        const top = dimen.top;
        const intersection = height + top;
        if(intersection >= 0) {
            const scale = Math.sqrt(2 - (intersection / height * 1.0));
            introBackground.style.transform = `scale(${scale}, ${scale})`;
        }
    }

    //retry sending message through contact form when sending message fails
    $("#retryForm").on('click', function(e) {
        e.preventDefault();
        $('#contactForm').show();
        $('#errorBlock').hide();
        $("#contactForm").find("#submit").removeAttr('disabled');
    });

    //resending message through contact form
    $("#resendForm").on('click', function(e) {
        e.preventDefault();
        $('#contactForm').show();
        $('#thankyouBlock').hide();
        $("#contactForm").find("#submit").removeAttr('disabled');
    });

    //submit Handler for contact form submission
    $("#contactForm").on('submit', function(e) {
        e.preventDefault();

        $(this).find("#submit").attr('disabled', 'disabled');

        var name = $('#name').val();
        var email = $('#email').val();
        var msg = $('#message').val();
        
        $.ajax({
			url:'https://formspree.io/mdoonypj',
			method:'POST',
			data:{
				name:name,
				_replyto:email,
				 email:email,
				message: msg,
				_subject:'My Form Submission',
			},
			dataType:"json",
			success:function() {
				$('#contactForm').hide();
				$('#thankyouBlock').show();
            },
            error: function() {
                $('#contactForm').hide();
				$('#errorBlock').show();
            }

        });		
        
    });


})
