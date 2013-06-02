(function($) {
	$(function() {
		var options = $.extend({
			'fieldName': '#s',
			'maxRows': 10,
			'minLength': 4,
		}, SearchAutocomplete);
		$(options.fieldName).autocomplete({
			source: function( request, response ) {
			    $.ajax({
			        url: options.ajaxurl,
			        dataType: "json",
			        data: {
			        	action: 'autocompleteCallback',
			            term: $(options.fieldName).val()
			        },
			        success: function( data ) {
			            response( $.map( data.results, function( item ) {
			                return {
			                	label: item.title,
			                	value: item.title,
			                	url: item.url
			                }
			            }));
			        },
			        error: function(jqXHR, textStatus, errorThrown) {
			        	console.log(jqXHR, textStatus, errorThrown);
			        }
			    });
			},
			minLength: 2,
			search: function(event, ui) {
				$(event.currentTarget).addClass('sa_searching');
			},
			create: function() {
			},
			select: function( event, ui ) {
				location = ui.item.url;
			},
			open: function(event, ui) {
				$(event.target).removeClass('sa_searching');
			},
			close: function() {
			}
		});
	});
})(jQuery);