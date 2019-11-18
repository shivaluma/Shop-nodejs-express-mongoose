jQuery(function($) {
    $('#contactform').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "Please enter your email"
            },
            message: {
                required: "Please enter your message"
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"external/form/contact-form.php",
                success: function() {
                      $('#success').fadeIn();
            $( '#contactform' ).each(function(){this.reset();});
                },
                error: function() {
                    $('#contactform').fadeTo( "slow", 1, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
    $('#newsletterform').validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"external/form/newsletter-form.php",
                success: function() {
                      $('#success').fadeIn();
            $('#newsletterform').each(function(){this.reset();});
                },
                error: function() {
                    $('#newsletterform').fadeTo( "slow", 1, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
});