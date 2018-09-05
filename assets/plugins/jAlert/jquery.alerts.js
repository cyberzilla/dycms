// jQuery Alert Dialogs Plugin
//
// Version 1.3.0
//
// Original Source : Visit http://abeautifulsite.net/notebook/87 for more information
// Thanks To
// Rajkumar (For 1.2.0 Version)
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//		jCustomConfirm (message,[title,okButtonTitle,cancelButtonTitle,callback])
//		jCustomPopup(content,[title,okButtonTitle,cancelButtonTitle,callback[bool,data]]) //support form submit with validation
//
// History:
//      Rajkumar History
//      1.00 - Released (29 December 2008)
//	    1.01 - Fixed bug where unbinding would destroy all resize events
//      1.1.1 - Added Custom Confirm Dialog!(29 Jan 2016)
//      1.2.0 - Added Theme support!
//
//			Abu Dzakiyyah History
//			1.3.0 - Added Custom Popup
//						- Added Form Validator (require jquery validation)
//						- Structure & CSS Modification (required bootstrap and fontawesome)
//						- Remove Image File (Change to FontAwesome)
//
// License:
//
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC.
//
(function($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: 0.5,                // transparency level of overlay
		theme: '_blue',                          // Set theme color
		overlayColor: '#000',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs

		// Public methods
		alert: function(message, title, callback) {
			if( title === null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		confirm: function(message, title, callback) {
			if( title === null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},

		customConfirm: function(message, title, okButton, cancelButton, callback) {
			if( title === null ) title = 'Confirm';
			if(okButton!==undefined || okButton!==null) $.alerts.okButton = '&nbsp;'+okButton+'&nbsp';
			if(cancelButton!==undefined || cancelButton!==null) $.alerts.cancelButton = '&nbsp;'+cancelButton+'&nbsp';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
				// Once we give Custom Button Name, it will replace for all types.
				// So we need to reset it to stock value!
				$.alerts.okButton = '&nbsp;OK&nbsp';
				$.alerts.cancelButton = '&nbsp;Cancel&nbsp';
			});
		},

		prompt: function(message, value, title, callback) {
			if( title === null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},

		customPopup: function(content, title, okButton, cancelButton, callback) {
			if( title === null ) title = 'Custom Popup';
			if(okButton!==undefined || okButton!==null) $.alerts.okButton = '&nbsp;'+okButton+'&nbsp';
			if(cancelButton!==undefined || cancelButton!==null) $.alerts.cancelButton = '&nbsp;'+cancelButton+'&nbsp';
			$.alerts._show(title, content, null, 'customPopup', function(result,data) {
				if( callback ) callback(result,data);
				$.alerts.okButton = '&nbsp;OK&nbsp';
				$.alerts.cancelButton = '&nbsp;Cancel&nbsp';
			});
		},

		// Private methods
		_validateForm: function(){
			$.validator.setDefaults({
				highlight: function(element) {
					$(element).closest('.form-group').addClass('has-error');
				},
				unhighlight: function(element) {
					$(element).closest('.form-group').removeClass('has-error');
				},
				errorElement: 'span',
				errorClass: 'help-block',
				errorPlacement: function(error, element) {
					if(element.parent('.input-group').length) {
						error.insertAfter(element.parent());
					} else {
						error.insertAfter(element);
					}
				}
		  });
			//Additional
			$(".phone").numeric({allow:"+"});
		},

		_show: function(title, msg, value, type, callback) {

			$.alerts._hide();
			$.alerts._overlay('show');

			if(type!=="customPopup"){
				$("BODY").append(
					'<div id="popup_container">' +
						'<h1 id="popup_title'+$.alerts.theme+'"></h1>' +
						'<div id="popup_content'+$.alerts.theme+'">' +
							'<div id="popup_message" class="text-justify"></div>' +
					'</div>' +
					'</div>');
			}else{
				$("BODY").append(
				  '<div id="popup_container">' +
				    '<h1 id="popup_title'+$.alerts.theme+'"></h1>' +
				    '<div id="popup_content'+$.alerts.theme+'">' +
				      '<div id="popup_body"></div>' +
					'</div>' +
				  '</div>');
				$("#popup_body").html(msg);
			}

			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);

			// IE6 Fix
			var pos = 'fixed';

			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});

			$("#popup_title"+$.alerts.theme).text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );

			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});

			$.alerts._reposition();
			$.alerts._maintainPosition(true);

			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input class="btn btn-primary btn-flat btn-sm" type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div><div class="icon_alert"><i class="fa fa-info-circle"></i></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="btn btn-default btn-flat btn-sm"/> <input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn btn-primary btn-flat btn-sm"/></div><div class="icon_alert"><i class="fa fa-question-circle"></i></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" id="popup_prompt" class="form-control input-sm"/><div class="icon_alert"><i class="fa fa-info-circle"></i></div>').after('<div id="popup_panel"><input class="btn btn-default btn-flat btn-sm" type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /> <input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn btn-primary btn-flat btn-sm"/></div>');
					//$("#popup_prompt").width( $("#popup_message").width() ); disable width popup_prompt
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;

				case "customPopup":
					$("#popup_body").after('<div id="popup_panel"><input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" class="btn btn-default btn-flat btn-sm"/> <input type="button" value="' + $.alerts.okButton + '" id="popup_ok" class="btn btn-primary btn-flat btn-sm"/></div><div class="close button-close"><i class="fa fa-times-circle"><div>');
					//validate form
					var frm = $("#popup_body").find("form");
					$.alerts._validateForm();
					frm.validate();

					$(".button-close").click(function(){
						$.alerts._hide();
					});

					$("#popup_ok").click(function(e){
						e.preventDefault();
						if(frm.valid()===true){
							//if form valid
							if( callback ) callback(true,frm.serialize());
							$.alerts._hide();
						}
					});

					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});

				break;
			}

			// Make draggable
			if( $.alerts.draggable ) {
			    $.alerts._draggable("#popup_container");
			    $("#popup_title"+$.alerts.theme).css({ cursor: 'move' });
			}
		},

		_draggable : function(elem){
		    var $this = $(elem),
		    $handle = $this.find("#popup_title"+$.alerts.theme),
            ns = 'draggable_'+(Math.random()+'').replace('.',''),
            mm = 'mousemove.'+ns,
            mu = 'mouseup.'+ns,
            $w = $(window),
            isFixed = ($this.css('position') === 'fixed'),
            adjX = 0, adjY = 0;

            $handle.mousedown(function(ev){
                var pos = $this.offset();
                if (isFixed) {
                    adjX = $w.scrollLeft(); adjY = $w.scrollTop();
                }
                var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
                $this.data(ns,{ x : ox, y: oy });
                $w.on(mm, function(ev){
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (isFixed) {
                        adjX = $w.scrollLeft(); adjY = $w.scrollTop();
                    }
                    var offset = $this.data(ns);
                    $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
                });
                $w.on(mu, function(){
                    $w.off(mm + ' ' + mu).removeData(ns);
                });
            });
            return this;
		},

		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},

		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},

		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;

			// IE6 fix
			//if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();

			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},

		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}

	};

	// Shortcut functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	};

	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};

	jCustomConfirm = function(message, title, okButton, cancelButton, callback) {
		$.alerts.customConfirm(message, title, okButton, cancelButton, callback);
	};

	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

	jCustomPopup = function(content, title, okButton, cancelButton, callback) {
		$.alerts.customPopup(content, title, okButton, cancelButton, callback);
	};

})(jQuery);
