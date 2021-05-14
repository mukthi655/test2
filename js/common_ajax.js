$(document).ready(function(e){
	// $('#csm-ajax-form').addClass('csm-ajax-form'); //backward compatability
	$(document).on('submit', '.csm-ajax-form', function(e){
		e.preventDefault();
		var ajax_save_form = $(this);
        var formaction = ajax_save_form.attr('action');
        
		$('.successformdiv').html('');
        $('.errormessageformdiv').html('');
		jQuery.ajax({
			enctype: 'multipart/form-data',
			url: formaction,
			data: new FormData(this),
			method:'post',
			dataType: 'json', 
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			beforeSend: function() {
				// $(form).find('._with_data_modal_body').val();
				// Recaptcha.reload();
				$(ajax_save_form).find('._no_data_modal_body').html('<span style="color:#ff0000;">Please wait while form is submitting... <img src="https://www.cybersolutionindia.com//images/loading.gif"><span>');
				$(':input[type="submit"]').prop('disabled', true);
                
			},
			success : function(response) {
				if(response.status) {
					
					$(ajax_save_form).find('._no_data_modal_body').html('');
					$(ajax_save_form).find('._with_data_modal_body').html(response.message);
					$(':input[type="submit"]').prop('disabled', false);
					if(response.redirect_url)
						window.setTimeout(function(){

							// Move to a new location or you can do something else
							window.location.href = response.redirect_url;
					
						}, 2000);
					// ajax_save_form[0].reset();
					grecaptcha.reset();
				} else {   
					grecaptcha.reset();
					$(ajax_save_form).find('._no_data_modal_body').html(response.message);
					$(':input[type="submit"]').prop('disabled', false);
				}
			}
        });
        
    });
});    

