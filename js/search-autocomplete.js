(function($) {
	$(function() {
		var options = $.extend({
			'fieldName': '#s',
			'maxRows': 10,
			'minLength': 4
		}, SearchAutocomplete);

		options.fieldName = $('<div />').html(options.fieldName).text();

		$(options.fieldName).autocomplete({
			source: function( request, response ) {
			    $.ajax({
			        url: options.ajaxurl,
			        dataType: "json",
			        data: {
			        	action: 'autocompleteCallback',
			            term: this.term
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
			delay: options.delay,
			minLength: options.minLength,
			autoFocus: ( options.autoFocus === 'true' ),
			search: function(event, ui) {
				$(event.currentTarget).addClass('sa_searching');
			},
			create: function() {
			},
			select: function( event, ui ) {
				if ( ui.item.url !== '#' ) {
					location = ui.item.url;
				} else {
					return true;
				}
			},
			open: function(event, ui) {
				var acData = $(this).data('uiAutocomplete');
				acData
						.menu
						.element
						.find('a')
						.each(function () {
							var $self = $( this ),
								keywords = $.trim( acData.term ).split( ' ' ).join('|');
							$self.html($self.text().replace(new RegExp("(" + keywords + ")", "gi"), '<span class="sa-found-text">$1</span>'));
						});
				$(event.target).removeClass('sa_searching');
			},
			close: function() {
			}
		});
	});
})(jQuery);