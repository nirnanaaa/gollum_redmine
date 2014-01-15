//
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);
(function($) {

  var Placeholder = {
   
     _PLACEHOLDERS : [],
   
    _p : function( $field ) {
    
       this.fieldObject = $field; 
       this.placeholderText = $field.val();
       var placeholderText = $field.val();
     
       $field.addClass('ph');
     
       $field.blur(function() {
         if ( $(this).val() == '' ) {
           $(this).val( placeholderText );
           $(this).addClass('ph');
         }
       });
     
       $field.focus(function() {
         $(this).removeClass('ph');
         if ( $(this).val() == placeholderText ) {
           $(this).val('');
         } else {
           $(this)[0].select();
         }
       });
     
     },
   
     add : function( $field ) {
       Placeholder._PLACEHOLDERS.push( new Placeholder._p( $field ) );
     },
   
     clearAll: function() {
       for ( var i=0; i < Placeholder._PLACEHOLDERS.length; i++ ) {
         if ( Placeholder._PLACEHOLDERS[i].fieldObject.val() == 
              Placeholder._PLACEHOLDERS[i].placeholderText ) {
           Placeholder._PLACEHOLDERS[i].fieldObject.val('');
         }
       }
     },
   
     exists : function() {
       return ( _PLACEHOLDERS.length );
     }
   
 };
 
 $.GollumPlaceholder = Placeholder;
 
})(jQuery);
/**
  *  gollum.dialog.js
  *
  *  Used for dialogs. Duh.
  *
  */

(function($) {

  var Dialog = {

    debugOn: false,
    markupCreated: false,
    markup: '',

    attachEvents: function( evtOK ) {
      $('#gollum-dialog-action-ok').click(function( e ) {
        Dialog.eventOK( e, evtOK );
      });
      $('#gollum-dialog-action-cancel').click( Dialog.eventCancel );
      $('#gollum-dialog-dialog input[type="text"]').keydown(function( e ) {
        if ( e.keyCode == 13 ) {
          Dialog.eventOK( e, evtOK );
        }
      });
    },

    detachEvents: function() {
      $('#gollum-dialog-action-ok').unbind('click');
      $('#gollum-dialog-action-cancel').unbind('click');
    },

    createFieldMarkup: function( fieldArray ) {
      var fieldMarkup = '<fieldset>';
      for ( var i=0; i < fieldArray.length; i++ ) {
        if ( typeof fieldArray[i] == 'object' ) {
          fieldMarkup += '<div class="field">';
          switch ( fieldArray[i].type ) {

          // only text is supported for now
          case 'text':
            fieldMarkup += Dialog.createFieldText( fieldArray[i] );
            break;

          default:
            break;

          }
          fieldMarkup += '</div>';
        }

      }
      fieldMarkup += '</fieldset>';
      return fieldMarkup;
    },

    createFieldText: function( fieldAttributes ) {
      var html = '';

      if ( fieldAttributes.name ) {
        html += '<label';
        if ( fieldAttributes.id ) {
          html += ' for="' + fieldAttributes.name + '"';
        }
        html += '>' + fieldAttributes.name + '</label>';
      }

      html += '<input type="text"';

      if ( fieldAttributes.id ) {
        html += ' name="' + fieldAttributes.id + '"'
        if ( fieldAttributes.type == 'code' ) {
          html+= ' class="code"';
        }
        html += ' id="gollum-dialog-dialog-generated-field-' +
          fieldAttributes.id + '">';
      }

      return html;
    },

    createMarkup: function( title, body ) {
      Dialog.markupCreated = true;
      if ($.facebox) {
        return '<div id="gollum-dialog-dialog">' +
               '<div id="gollum-dialog-dialog-title"><h4>' +
               title +'</h4></div>' +
               '<div id="gollum-dialog-dialog-body">' + body + '</div>' +
               '<div id="gollum-dialog-dialog-buttons">' +
               '<a href="#" title="Cancel" id="gollum-dialog-action-cancel" ' +
               'class="gollum-minibutton">Cancel</a>' +
               '<a href="#" title="OK" id="gollum-dialog-action-ok" '+
               'class="gollum-minibutton">OK</a>' +
               '</div>' +
               '</div>';
      } else {
        return '<div id="gollum-dialog-dialog">' +
               '<div id="gollum-dialog-dialog-inner">' +
               '<div id="gollum-dialog-dialog-bg">' +
               '<div id="gollum-dialog-dialog-title"><h4>' +
               title +'</h4></div>' +
               '<div id="gollum-dialog-dialog-body">' + body + '</div>' +
               '<div id="gollum-dialog-dialog-buttons">' +
               '<a href="#" title="Cancel" id="gollum-dialog-action-cancel" ' +
               'class="minibutton">Cancel</a>' +
               '<a href="#" title="OK" id="gollum-dialog-action-ok" '+
               'class="minibutton">OK</a>' +
               '</div>' +
               '</div>' +
               '</div>' +
               '</div>';
      }
    },

    eventCancel: function( e ) {
      e.preventDefault();
      debug('Cancelled dialog.');
      Dialog.hide();
    },

    eventOK: function( e, evtOK ) {
      e.preventDefault();

      var results = [];
      // get the results from each field and build them into the object
      $('#gollum-dialog-dialog-body input').each(function() {
        results[$(this).attr('name')] = $(this).val();
      });

      // pass them to evtOK if it exists (which it should)
      if ( evtOK &&
           typeof evtOK == 'function' ) {
        evtOK( results );
      }
      Dialog.hide();
    },

    hide: function() {
      if ( $.facebox ) {
        Dialog.markupCreated = false;
        $(document).trigger('close.facebox');
        Dialog.detachEvents();
      } else {
        if ( $.browser.msie ) {
          $('#gollum-dialog-dialog').hide().removeClass('active');
          $('select').css('visibility', 'visible');
        } else {
          $('#gollum-dialog-dialog').animate({ opacity: 0 }, {
            duration: 200,
            complete: function() {
              $('#gollum-dialog-dialog').removeClass('active');
            }
          });
        }
      }
    },

    init: function( argObject ) {
      var title = '';
      var body = '';

      // bail out if necessary
      if ( !argObject ||
           typeof argObject != 'object' ) {
        debug('Editor Dialog: Cannot init; invalid init object');
        return;
      }

      if ( argObject.body && typeof argObject.body == 'string' ) {
        body = '<p>' + argObject.body + '</p>';
      }

      // alright, build out fields
      if ( argObject.fields && typeof argObject.fields == 'object' ) {
        body += Dialog.createFieldMarkup( argObject.fields );
      }

      if ( argObject.title && typeof argObject.title == 'string' ) {
        title = argObject.title;
      }

      if ( Dialog.markupCreated ) {
        if ($.facebox) {
          $(document).trigger('close.facebox');
        } else {
          $('#gollum-dialog-dialog').remove();
        }
      }

      Dialog.markup = Dialog.createMarkup( title, body );

      if ($.facebox) {
        $(document).bind('reveal.facebox', function() {
          if ( argObject.OK &&
               typeof argObject.OK == 'function' ) {
            Dialog.attachEvents( argObject.OK );
            $($('#facebox input[type="text"]').get(0)).focus();
          }
        });
      } else {
        $('body').append( Dialog.markup );
        if ( argObject.OK &&
             typeof argObject.OK == 'function' ) {
          Dialog.attachEvents( argObject.OK );
        }
      }

      Dialog.show();
    },

    show: function() {
      if ( !Dialog.markupCreated ) {
        debug('Dialog: No markup to show. Please use init first.');
      } else {
        debug('Showing dialog');
        if ($.facebox) {
          $.facebox( Dialog.markup );
        } else {
          if ( $.browser.msie ) {
            $('#gollum-dialog.dialog').addClass('active');
            Dialog.position();
            $('select').css('visibility', 'hidden');
          } else {
            $('#gollum-dialog.dialog').css('display', 'none');
            $('#gollum-dialog-dialog').animate({ opacity: 0 }, {
              duration: 0,
              complete: function() {
                $('#gollum-dialog-dialog').css('display', 'block');
                Dialog.position(); // position this thing
                $('#gollum-dialog-dialog').animate({ opacity: 1 }, {
                duration: 500
                });
              }
            });
          }
        }
      }
    },

    position: function() {
      var dialogHeight = $('#gollum-dialog-dialog-inner').height();
      $('#gollum-dialog-dialog-inner')
        .css('height', dialogHeight + 'px')
        .css('margin-top', -1 * parseInt( dialogHeight / 2 ));
    }
  };

  if ($.facebox) {
    $(document).bind('reveal.facebox', function() {
      $('#facebox img.close_image').remove();
    });
  }

  var debug = function(m) {
    if ( Dialog.debugOn
         && typeof console != 'undefined' ) {
      console.log( m );
    }
  };

  $.GollumDialog = Dialog;

})(jQuery);

/**
 *  gollum.editor.js
 *  A jQuery plugin that creates the Gollum Editor.
 *
 *  Usage:
 *  $.GollumEditor(); on DOM ready.
 */
(function($) {

  // Editor options
  var DefaultOptions = {
    MarkupType: 'markdown',
    EditorMode: 'code',
    NewFile: false,
    HasFunctionBar: true,
    Debug: false,
    NoDefinitionsFor: []
  };
  var ActiveOptions = {};

  /**
   *  $.GollumEditor
   *
   *  You don't need to do anything. Just run this on DOM ready.
   */
  $.GollumEditor = function( IncomingOptions ) {
    
    ActiveOptions = $.extend( DefaultOptions, IncomingOptions );
    debug('GollumEditor loading');

    if ( EditorHas.baseEditorMarkup() ) {
      
      if ( EditorHas.titleDisplayed() ) {
        $('#gollum-editor-title-field').addClass('active');
      }
      
      if ( EditorHas.editSummaryMarkup() ) {
        $.GollumEditor.Placeholder.add($('#gollum-editor-edit-summary input'));
        $('#gollum-editor form[name="gollum-editor"]').submit(function( e ) {
          e.preventDefault();
          $.GollumEditor.Placeholder.clearAll();
          debug('submitting');
          $(this).unbind('submit');
          $(this).submit();
        });
      }

      if ( EditorHas.collapsibleInputs() ) {
        $('#gollum-editor .collapsed a.button, ' +
          '#gollum-editor .expanded a.button').click(function( e ) {
          e.preventDefault();
          $(this).parent().toggleClass('expanded');
          $(this).parent().toggleClass('collapsed');
        });
      }

      if ( EditorHas.previewButton() ) {
        var formAction =
        $('#gollum-editor #gollum-editor-preview').click(function() {
          // make a dummy form, submit to new target window
          // get form fields
          var oldAction = $('#gollum-editor form').attr('action');
          var $form = $($('#gollum-editor form').get(0));
          $form.attr('action', this.href || '/preview');
          $form.attr('target', '_blank');
          $form.submit();


          $form.attr('action', oldAction);
          $form.removeAttr('target');
          return false;
        });
      }

      // Initialize the function bar by loading proper definitions
      if ( EditorHas.functionBar() ) {

        var htmlSetMarkupLang =
          $('#gollum-editor-body').attr('data-markup-lang');

        if ( htmlSetMarkupLang ) {
          ActiveOptions.MarkupType = htmlSetMarkupLang;
        }

        // load language definition
        LanguageDefinition.setActiveLanguage( ActiveOptions.MarkupType );
        if ( EditorHas.formatSelector() ) {
          FormatSelector.init(
            $('#gollum-editor-format-selector select') );
        }

        if ( EditorHas.help() ) {
          $('#gollum-editor-help').hide();
          $('#gollum-editor-help').removeClass('jaws');
        }

      }
      // EditorHas.functionBar
    }
    // EditorHas.baseEditorMarkup
  };



  /**
   *  $.GollumEditor.defineLanguage
   *  Defines a set of language actions that Gollum can use.
   *  Used by the definitions in langs/ to register language definitions.
   */
  $.GollumEditor.defineLanguage = function( language_name, languageObject ) {
    if ( typeof languageObject == 'object' ) {
      LanguageDefinition.define( language_name, languageObject );
    } else {
      debug('GollumEditor.defineLanguage: definition for ' + language_name +
            ' is not an object');
    }
  };


  /**
   *  debug
   *  Prints debug information to console.log if debug output is enabled.
   *
   *  @param  mixed  Whatever you want to dump to console.log
   *  @return void
   */
  var debug = function(m) {
    if ( ActiveOptions.Debug &&
         typeof console != 'undefined' ) {
      console.log( m );
    }
  };



  /**
   *  LanguageDefinition
   *  Language definition file handler
   *  Loads language definition files as necessary.
   */
  var LanguageDefinition = {

    _ACTIVE_LANG: '',
    _LOADED_LANGS: [],
    _LANG: {},

    /**
     *  Defines a language
     *
     *  @param name string  The name of the language
     *  @param name object  The definition object
     */
    define: function( name, definitionObject ) {
      LanguageDefinition._ACTIVE_LANG = name;
      LanguageDefinition._LOADED_LANGS.push( name );
      if ( typeof $.GollumEditor.WikiLanguage == 'object' ) {
        var definition = {};
        $.extend(definition, $.GollumEditor.WikiLanguage, definitionObject);
        LanguageDefinition._LANG[name] = definition;
      } else {
        LanguageDefinition._LANG[name] = definitionObject;
      }
    },

    getActiveLanguage: function() {
      return LanguageDefinition._ACTIVE_LANG;
    },

    setActiveLanguage: function( name ) {
      if ( !LanguageDefinition.isLoadedFor(name) ) {
        LanguageDefinition._ACTIVE_LANG = null;
        LanguageDefinition.loadFor( name, function(x, t) {
          if ( t != 'success' ) {
            debug('Failed to load language definition for ' + name);
            // well, fake it and turn everything off for this one
            LanguageDefinition.define( name, {} );
          }

          // update features that rely on the language definition
          if ( EditorHas.functionBar() ) {
            FunctionBar.refresh();
          }

          if ( LanguageDefinition.isValid() && EditorHas.formatSelector() ) {
            FormatSelector.updateSelected();
          }

        } );
      } else {
        LanguageDefinition._ACTIVE_LANG = name;
        FunctionBar.refresh();
      }
    },


    /**
     *  gets a definition object for a specified attribute
     *
     *  @param  string  attr    The specified attribute.
     *  @param  string  specified_lang  The language to pull a definition for.
     *  @return object if exists, null otherwise
     */
    getDefinitionFor: function( attr, specified_lang ) {
      if ( !specified_lang ) {
        specified_lang = LanguageDefinition._ACTIVE_LANG;
      }

      if ( LanguageDefinition.isLoadedFor(specified_lang) &&
           LanguageDefinition._LANG[specified_lang][attr] &&
           typeof LanguageDefinition._LANG[specified_lang][attr] == 'object' ) {
        return LanguageDefinition._LANG[specified_lang][attr];
      }

      return null;
    },


    /**
     *  loadFor
     *  Asynchronously loads a definition file for the current markup.
     *  Definition files are necessary to use the code editor.
     *
     *  @param  string  markup_name  The markup name you want to load
     *  @return void
     */
    loadFor: function( markup_name, on_complete ) {
      // Keep us from hitting 404s on our site, check the definition blacklist
      if ( ActiveOptions.NoDefinitionsFor.length ) {
        for ( var i=0; i < ActiveOptions.NoDefinitionsFor.length; i++ ) {
          if ( markup_name == ActiveOptions.NoDefinitionsFor[i] ) {
            // we don't have this. get out.
            if ( typeof on_complete == 'function' ) {
              on_complete( null, 'error' );
              return;
            }
          }
        }
      }

      // attempt to load the definition for this language      
      var script_uri = '/plugin_assets/gollum/javascripts/gollum_editor/langs/' + markup_name + '.js';
      $.ajax({
                url: script_uri,
                dataType: 'script',
                complete: function( xhr, textStatus ) {
                  if ( typeof on_complete == 'function' ) {
                    on_complete( xhr, textStatus );
                  }
                }
            });
    },


    /**
     *  isLoadedFor
     *  Checks to see if a definition file has been loaded for the
     *  specified markup language.
     *
     *  @param  string  markup_name   The name of the markup.
     *  @return boolean
     */
    isLoadedFor: function( markup_name ) {
      if ( LanguageDefinition._LOADED_LANGS.length === 0 ) {
        return false;
      }

      for ( var i=0; i < LanguageDefinition._LOADED_LANGS.length; i++ ) {
        if ( LanguageDefinition._LOADED_LANGS[i] == markup_name ) {
          return true;
        }
      }
      return false;
    },

    isValid: function() {
      return ( LanguageDefinition._ACTIVE_LANG &&
               typeof LanguageDefinition._LANG[LanguageDefinition._ACTIVE_LANG] ==
               'object' );
    }

  };


  /**
   *  EditorHas
   *  Various conditionals to check what features of the Gollum Editor are
   *  active/operational.
   */
  var EditorHas = {


    /**
     *  EditorHas.baseEditorMarkup
     *  True if the basic editor form is in place.
     *
     *  @return boolean
     */
    baseEditorMarkup: function() {
      return ( $('#gollum-editor').length &&
               $('#gollum-editor-body').length );
    },


    /**
     *  EditorHas.collapsibleInputs
     *  True if the editor contains collapsible inputs for things like the
     *  sidebar or footer, false otherwise.
     *
     *  @return boolean
     */
    collapsibleInputs: function() {
      return $('#gollum-editor .collapsed, #gollum-editor .expanded').length;
    },


    /**
     *  EditorHas.formatSelector
     *  True if the editor has a format selector (for switching between
     *  language types), false otherwise.
     *
     *  @return boolean
     */
    formatSelector: function() {
      return $('#gollum-editor-format-selector select').length;
    },


    /**
     *  EditorHas.functionBar
     *  True if the Function Bar markup exists.
     *
     *  @return boolean
     */
    functionBar: function() {
      return ( ActiveOptions.HasFunctionBar &&
               $('#gollum-editor-function-bar').length );
    },


    /**
     *  EditorHas.ff4Environment
     *  True if in a Firefox 4.0 Beta environment.
     *
     *  @return boolean
     */
    ff4Environment: function() {
      var ua = new RegExp(/Firefox\/4.0b/);
      return ( ua.test( navigator.userAgent ) );
    },


    /**
     *  EditorHas.editSummaryMarkup
     *  True if the editor has a summary field (Gollum's commit message),
     *  false otherwise.
     *
     *  @return boolean
     */
    editSummaryMarkup: function() {
      return ( $('input#gollum-editor-message-field').length > 0 );
    },


    /**
     *  EditorHas.help
     *  True if the editor contains the inline help sector, false otherwise.
     *
     *  @return boolean
     */
    help: function() {
      return ( $('#gollum-editor #gollum-editor-help').length &&
               $('#gollum-editor #function-help').length );
    },


    /**
     *  EditorHas.previewButton
     *  True if the editor has a preview button, false otherwise.
     *
     *  @return boolean
     */
    previewButton: function() {
      return ( $('#gollum-editor #gollum-editor-preview').length );
    },


    /**
     *  EditorHas.titleDisplayed
     *  True if the editor is displaying a title field, false otherwise.
     *
     *  @return boolean
     */
    titleDisplayed: function() {
      return ( ActiveOptions.NewFile );
    }

  };


  /**
   *  FunctionBar
   *
   *  Things the function bar does.
   */
   var FunctionBar = {

      isActive: false,


      /**
       *  FunctionBar.activate
       *  Activates the function bar, attaching all click events
       *  and displaying the bar.
       *
       */
      activate: function() {
        debug('Activating function bar');

        // check these out
        $('#gollum-editor-function-bar a.function-button').each(function() {
          if ( LanguageDefinition.getDefinitionFor( $(this).attr('id') ) ) {
            $(this).click( FunctionBar.evtFunctionButtonClick );
            $(this).removeClass('disabled');
          }
          else if ( $(this).attr('id') != 'function-help' ) {
            $(this).addClass('disabled');
          }
        });

        // show bar as active
        $('#gollum-editor-function-bar').addClass( 'active' );
        FunctionBar.isActive = true;
      },


      deactivate: function() {
        $('#gollum-editor-function-bar a.function-button').unbind('click');
        $('#gollum-editor-function-bar').removeClass( 'active' );
        FunctionBar.isActive = false;
      },


      /**
       *  FunctionBar.evtFunctionButtonClick
       *  Event handler for the function buttons. Traps the click and
       *  executes the proper language action.
       *
       *  @param jQuery.Event jQuery event object.
       */
      evtFunctionButtonClick: function(e) {
        e.preventDefault();
        var def = LanguageDefinition.getDefinitionFor( $(this).attr('id') );
        if ( typeof def == 'object' ) {
          FunctionBar.executeAction( def );
        }
      },


      /**
       *  FunctionBar.executeAction
       *  Executes a language-specific defined action for a function button.
       *
       */
      executeAction: function( definitionObject ) {
        // get the selected text from the textarea
        var txt = $('#gollum-editor-body').val();
        // hmm, I'm not sure this will work in a textarea
        var selPos = FunctionBar
                      .getFieldSelectionPosition( $('#gollum-editor-body') );
        var selText = FunctionBar.getFieldSelection( $('#gollum-editor-body') );
        var repText = selText;
        var reselect = true;
        var cursor = null;

        // execute a replacement function if one exists
        if ( definitionObject.exec &&
             typeof definitionObject.exec == 'function' ) {
          definitionObject.exec( txt, selText, $('#gollum-editor-body') );
          return;
        }

        // execute a search/replace if they exist
        var searchExp = /([^\n]+)/gi;
        if ( definitionObject.search &&
             typeof definitionObject.search == 'object' ) {
          debug('Replacing search Regex');
          searchExp = null;
          searchExp = new RegExp ( definitionObject.search );
          debug( searchExp );
        }
        debug('repText is ' + '"' + repText + '"');
        // replace text
        if ( definitionObject.replace &&
             typeof definitionObject.replace == 'string' ) {
          debug('Running replacement - using ' + definitionObject.replace);
          var rt = definitionObject.replace;
          repText = repText.replace( searchExp, rt );
          // remove backreferences
          repText = repText.replace( /\$[\d]/g, '' );

          if ( repText === '' ) {
            debug('Search string is empty');

            // find position of $1 - this is where we will place the cursor
            cursor = rt.indexOf('$1');

            // we have an empty string, so just remove backreferences
            repText = rt.replace( /\$[\d]/g, '' );

            // if the position of $1 doesn't exist, stick the cursor in
            // the middle
            if ( cursor == -1 ) {
              cursor = Math.floor( rt.length / 2 );
            }
          }
        }

        // append if necessary
        if ( definitionObject.append &&
             typeof definitionObject.append == 'string' ) {
          if ( repText == selText ) {
            reselect = false;
          }
          repText += definitionObject.append;
        }

        if ( repText ) {
          FunctionBar.replaceFieldSelection( $('#gollum-editor-body'),
                                             repText, reselect, cursor );
        }

      },


      /**
       *  getFieldSelectionPosition
       *  Retrieves the selection range for the textarea.
       *
       *  @return object the .start and .end offsets in the string
       */
      getFieldSelectionPosition: function( $field ) {
        if ($field.length) {
          var start = 0, end = 0;
          var el = $field.get(0);

          if (typeof el.selectionStart == "number" &&
              typeof el.selectionEnd == "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
          } else {
            var range = document.selection.createRange();
            var stored_range = range.duplicate();
            stored_range.moveToElementText( el );
            stored_range.setEndPoint( 'EndToEnd', range );
            start = stored_range.text.length - range.text.length;
            end = start + range.text.length;

            // so, uh, we're close, but we need to search for line breaks and
            // adjust the start/end points accordingly since IE counts them as
            // 2 characters in TextRange.
            var s = start;
            var lb = 0;
            var i;
            debug('IE: start position is currently ' + s);
            for ( i=0; i < s; i++ ) {
              if ( el.value.charAt(i).match(/\r/) ) {
                ++lb;
              }
            }

            if ( lb ) {
              debug('IE start: compensating for ' + lb + ' line breaks');
              start = start - lb;
              lb = 0;
            }

            var e = end;
            for ( i=0; i < e; i++ ) {
              if ( el.value.charAt(i).match(/\r/) ) {
                ++lb;
              }
            }

            if ( lb ) {
              debug('IE end: compensating for ' + lb + ' line breaks');
              end = end - lb;
            }
          }

          return {
              start: start,
              end: end
          };
        } // end if ($field.length)
      },


      /**
       *  getFieldSelection
       *  Returns the currently selected substring of the textarea.
       *
       *  @param  jQuery  A jQuery object for the textarea.
       *  @return string  Selected string.
       */
      getFieldSelection: function( $field ) {
        var selStr = '';
        var selPos;

        if ( $field.length ) {
          selPos = FunctionBar.getFieldSelectionPosition( $field );
          selStr = $field.val().substring( selPos.start, selPos.end );
          debug('Selected: ' + selStr + ' (' + selPos.start + ', ' +
                selPos.end + ')');
          return selStr;
        }
        return false;
      },


      isShown: function() {
        return ($('#gollum-editor-function-bar').is(':visible'));
      },

      refresh: function() {
        if ( EditorHas.functionBar() ) {
          debug('Refreshing function bar');
          if ( LanguageDefinition.isValid() ) {
            $('#gollum-editor-function-bar a.function-button').unbind('click');
            FunctionBar.activate();
            if ( Help ) {
              Help.setActiveHelp( LanguageDefinition.getActiveLanguage() );
            }
          } else {
            debug('Language definition is invalid.');
            if ( FunctionBar.isShown() ) {
              // deactivate the function bar; it's not gonna work now
              FunctionBar.deactivate();
            }
            if ( Help.isShown() ) {
              Help.hide();
            }
          }
        }
      },


      /**
       *  replaceFieldSelection
       *  Replaces the currently selected substring of the textarea with
       *  a new string.
       *
       *  @param  jQuery  A jQuery object for the textarea.
       *  @param  string  The string to replace the current selection with.
       *  @param  boolean Reselect the new text range.
       */
      replaceFieldSelection: function( $field, replaceText, reselect, cursorOffset ) {
        var selPos = FunctionBar.getFieldSelectionPosition( $field );
        var fullStr = $field.val();
        var selectNew = true;
        if ( reselect === false) {
          selectNew = false;
        }

        var scrollTop = null;
        if ( $field[0].scrollTop ) {
          scrollTop = $field[0].scrollTop;
        }

        $field.val( fullStr.substring(0, selPos.start) + replaceText +
                    fullStr.substring(selPos.end) );
        $field[0].focus();

        if ( selectNew ) {
          if ( $field[0].setSelectionRange ) {
            if ( cursorOffset ) {
              $field[0].setSelectionRange(
                                            selPos.start + cursorOffset,
                                            selPos.start + cursorOffset
               );
            } else {
              $field[0].setSelectionRange( selPos.start,
                                           selPos.start + replaceText.length );
            }
          } else if ( $field[0].createTextRange ) {
            var range = $field[0].createTextRange();
            range.collapse( true );
            if ( cursorOffset ) {
              range.moveEnd( selPos.start + cursorOffset );
              range.moveStart( selPos.start + cursorOffset );
            } else {
              range.moveEnd( 'character', selPos.start + replaceText.length );
              range.moveStart( 'character', selPos.start );
            }
            range.select();
          }
        }

        if ( scrollTop ) {
          // this jumps sometimes in FF
          $field[0].scrollTop = scrollTop;
        }
      }
   };



   /**
    *  FormatSelector
    *
    *  Functions relating to the format selector (if it exists)
    */
   var FormatSelector = {

     $_SELECTOR: null,

     /**
      *  FormatSelector.evtChangeFormat
      *  Event handler for when a format has been changed by the format
      *  selector. Will automatically load a new language definition
      *  via JS if necessary.
      *
      *  @return void
      */
     evtChangeFormat: function( e ) {
       var newMarkup = $(this).val();
       LanguageDefinition.setActiveLanguage( newMarkup );
     },


     /**
      *  FormatSelector.init
      *  Initializes the format selector.
      *
      *  @return void
      */
     init: function( $sel ) {
       debug('Initializing format selector');

       // unbind events if init is being called twice for some reason
       if ( FormatSelector.$_SELECTOR &&
            typeof FormatSelector.$_SELECTOR == 'object' ) {
         FormatSelector.$_SELECTOR.unbind( 'change' );
       }

       FormatSelector.$_SELECTOR = $sel;

       // set format selector to the current language
       FormatSelector.updateSelected();
       FormatSelector.$_SELECTOR.change( FormatSelector.evtChangeFormat );
     },


     /**
      * FormatSelector.update
      */
    updateSelected: function() {
       var currentLang = LanguageDefinition.getActiveLanguage();
       FormatSelector.$_SELECTOR.val( currentLang );
    }

   };



   /**
    *  Help
    *
    *  Functions that manage the display and loading of inline help files.
    */
  var Help = {

    _ACTIVE_HELP: '',
    _LOADED_HELP_LANGS: [],
    _HELP: {},

    /**
     *  Help.define
     *
     *  Defines a new help context and enables the help function if it
     *  exists in the Gollum Function Bar.
     *
     *  @param string name   The name you're giving to this help context.
     *                       Generally, this should match the language name.
     *  @param object definitionObject The definition object being loaded from a
     *                                 language / help definition file.
     *  @return void
     */
    define: function( name, definitionObject ) {
      if ( Help.isValidHelpFormat( definitionObject ) ) {
        debug('help is a valid format');

        Help._ACTIVE_HELP_LANG = name;
        Help._LOADED_HELP_LANGS.push( name );
        Help._HELP[name] = definitionObject;

        if ( $("#function-help").length ) {
          if ( $('#function-help').hasClass('disabled') ) {
            $('#function-help').removeClass('disabled');
          }
          $('#function-help').unbind('click');
          $('#function-help').click( Help.evtHelpButtonClick );

          // generate help menus
          Help.generateHelpMenuFor( name );

          if ( $('#gollum-editor-help').length &&
               typeof $('#gollum-editor-help').attr('data-autodisplay') !== 'undefined' &&
               $('#gollum-editor-help').attr('data-autodisplay') === 'true' ) {
            Help.show();
          }
        }
      } else {
        if ( $('#function-help').length ) {
          $('#function-help').addClass('disabled');
        }
      }
    },

    /**
     *  Help.generateHelpMenuFor
     *  Generates the markup for the main help menu given a context name.
     *
     *  @param string  name  The context name.
     *  @return void
     */
    generateHelpMenuFor: function( name ) {
      if ( !Help._HELP[name] ) {
        debug('Help is not defined for ' + name.toString());
        return false;
      }
      var helpData = Help._HELP[name];

      // clear this shiz out
      $('#gollum-editor-help-parent').html('');
      $('#gollum-editor-help-list').html('');
      $('#gollum-editor-help-content').html('');

      // go go inefficient algorithm
      for ( var i=0; i < helpData.length; i++ ) {
        if ( typeof helpData[i] != 'object' ) {
          break;
        }

        var $newLi = $('<li><a href="#" rel="' + i + '">' +
                       helpData[i].menuName + '</a></li>');
        $('#gollum-editor-help-parent').append( $newLi );
        if ( i === 0 ) {
          // select on first run
          $newLi.children('a').addClass('selected');
        }
        $newLi.children('a').click( Help.evtParentMenuClick );
      }

      // generate parent submenu on first run
      Help.generateSubMenu( helpData[0], 0 );
      $($('#gollum-editor-help-list li a').get(0)).click();

    },

    /**
     *  Help.generateSubMenu
     *  Generates the markup for the inline help sub-menu given the data
     *  object for the submenu and the array index to start at.
     *
     *  @param object subData The data for the sub-menu.
     *  @param integer index  The index clicked on (parent menu index).
     *  @return void
     */
    generateSubMenu: function( subData, index ) {
      $('#gollum-editor-help-list').html('');
      $('#gollum-editor-help-content').html('');
      for ( var i=0; i < subData.content.length; i++ ) {
        if ( typeof subData.content[i] != 'object' ) {
          break;
        }

        var $subLi = $('<li><a href="#" rel="' + index + ':' + i + '">' +
                       subData.content[i].menuName + '</a></li>');


        $('#gollum-editor-help-list').append( $subLi );
        $subLi.children('a').click( Help.evtSubMenuClick );
      }
    },

    hide: function() {
      if ( $.browser.msie ) {
        $('#gollum-editor-help').css('display', 'none');
      } else {
        $('#gollum-editor-help').animate({
          opacity: 0
        }, 200, function() {
          $('#gollum-editor-help')
            .animate({ height: 'hide' }, 200);
        });
      }
    },

    show: function() {
      if ( $.browser.msie ) {
        // bypass effects for internet explorer, since it does weird crap
        // to text antialiasing with opacity animations
        $('#gollum-editor-help').css('display', 'block');
      } else {
        $('#gollum-editor-help').animate({
          height: 'show'
        }, 200, function() {
          $('#gollum-editor-help')
            .animate({ opacity: 1 }, 300);
        });
      }
    },

    /**
     *  Help.showHelpFor
     *  Displays the actual help content given the two menu indexes, which are
     *  rendered in the rel="" attributes of the help menus
     *
     *  @param integer index1  parent index
     *  @param integer index2  submenu index
     *  @return void
     */
    showHelpFor: function( index1, index2 ) {
      var html =
        Help._HELP[Help._ACTIVE_HELP_LANG][index1].content[index2].data;
      $('#gollum-editor-help-content').html(html);
    },

    /**
     *  Help.isLoadedFor
     *  Returns true if help is loaded for a specific markup language,
     *  false otherwise.
     *
     *  @param string name   The name of the markup language.
     *  @return boolean
     */
    isLoadedFor: function( name ) {
      for ( var i=0; i < Help._LOADED_HELP_LANGS.length; i++ ) {
        if ( name == Help._LOADED_HELP_LANGS[i] ) {
          return true;
        }
      }
      return false;
    },

    isShown: function() {
      return ($('#gollum-editor-help').is(':visible'));
    },

    /**
     *  Help.isValidHelpFormat
     *  Does a quick check to make sure that the help definition isn't in a
     *  completely messed-up format.
     *
     *  @param object (Array) helpArr  The help definition array.
     *  @return boolean
     */
    isValidHelpFormat: function( helpArr ) {
      return ( typeof helpArr == 'object' &&
               helpArr.length &&
               typeof helpArr[0].menuName == 'string' &&
               typeof helpArr[0].content == 'object' &&
               helpArr[0].content.length );
    },

    /**
     *  Help.setActiveHelp
     *  Sets the active help definition to the one defined in the argument,
     *  re-rendering the help menu to match the new definition.
     *
     *  @param string  name  The name of the help definition.
     *  @return void
     */
    setActiveHelp: function( name ) {
      if ( !Help.isLoadedFor( name ) ) {
        if ( $('#function-help').length ) {
          $('#function-help').addClass('disabled');
        }
        if ( Help.isShown() ) {
          Help.hide();
        }
      } else {
        Help._ACTIVE_HELP_LANG = name;
        if ( $("#function-help").length ) {
          if ( $('#function-help').hasClass('disabled') ) {
            $('#function-help').removeClass('disabled');
          }
          $('#function-help').unbind('click');
          $('#function-help').click( Help.evtHelpButtonClick );
          Help.generateHelpMenuFor( name );
        }
      }
    },

    /**
     *  Help.evtHelpButtonClick
     *  Event handler for clicking the help button in the function bar.
     *
     *  @param jQuery.Event e  The jQuery event object.
     *  @return void
     */
    evtHelpButtonClick: function( e ) {
      e.preventDefault();
      if ( Help.isShown() ) {
        // turn off autodisplay if it's on
        if ( $('#gollum-editor-help').length &&
             $('#gollum-editor-help').attr('data-autodisplay') !== 'undefined' &&
             $('#gollum-editor-help').attr('data-autodisplay') === 'true' ) {
          $.post('/wiki/help?_method=delete');
          $('#gollum-editor-help').attr('data-autodisplay', '');
        }
        Help.hide(); }
      else { Help.show(); }
    },

    /**
     *  Help.evtParentMenuClick
     *  Event handler for clicking on an item in the parent menu. Automatically
     *  renders the submenu for the parent menu as well as the first result for
     *  the actual plain text.
     *
     *  @param jQuery.Event e  The jQuery event object.
     *  @return void
     */
    evtParentMenuClick: function( e ) {
      e.preventDefault();
      // short circuit if we've selected this already
      if ( $(this).hasClass('selected') ) { return; }

      // populate from help data for this
      var helpIndex = $(this).attr('rel');
      var subData = Help._HELP[Help._ACTIVE_HELP_LANG][helpIndex];

      $('#gollum-editor-help-parent li a').removeClass('selected');
      $(this).addClass('selected');
      Help.generateSubMenu( subData, helpIndex );
      $($('#gollum-editor-help-list li a').get(0)).click();
    },

    /**
     *  Help.evtSubMenuClick
     *  Event handler for clicking an item in a help submenu. Renders the
     *  appropriate text for the submenu link.
     *
     *  @param jQuery.Event e  The jQuery event object.
     *  @return void
     */
    evtSubMenuClick: function( e ) {
      e.preventDefault();
      if ( $(this).hasClass('selected') ) { return; }

      // split index rel data
      var rawIndex = $(this).attr('rel').split(':');
      $('#gollum-editor-help-list li a').removeClass('selected');
      $(this).addClass('selected');
      Help.showHelpFor( rawIndex[0], rawIndex[1] );
    }
  };

  // Publicly-accessible function to Help.define
  $.GollumEditor.defineHelp = Help.define;

  // Dialog exists as its own thing now
  $.GollumEditor.Dialog = $.GollumDialog;
  $.GollumEditor.replaceSelection = function( repText ) {
    FunctionBar.replaceFieldSelection( $('#gollum-editor-body'), repText );
  };

  // Placeholder exists as its own thing now
  $.GollumEditor.Placeholder = $.GollumPlaceholder;

})(jQuery);

/**
 *  Markdown Language Definition
 *
 *  A language definition for string manipulation operations, in this case
 *  for the Markdown, uh, markup language. Uses regexes for various functions
 *  by default. If regexes won't do and you need to do some serious
 *  manipulation, you can declare a function in the object instead.
 *
 *  Code example:
 *  'functionbar-id'  :   {
 *                          exec: function(text, selectedText) {
 *                                   functionStuffHere();
 *                                },
 *                          search: /somesearchregex/gi,
 *                          replace: 'replace text for RegExp.replace',
 *                          append: "just add this where the cursor is"
 *                         }
 *
**/
(function($) {

var MarkDown = {

  'function-bold' :         {
                              search: /([^\n]+)([\n\s]*)/g,
                              replace: "**$1**$2"
                            },

  'function-italic' :       {
                              search: /([^\n]+)([\n\s]*)/g,
                              replace: "_$1_$2"
                            },

  'function-code'   :       {
                              search: /(^[\n]+)([\n\s]*)/g,
                              replace: "`$1`$2"
                            },

  'function-hr'     :       {
                              append: "\n***\n"
                            },

  'function-ul'     :       {
                              search: /(.+)([\n]?)/g,
                              replace: "* $1$2"
                            },

  /* This looks silly but is completely valid Markdown */
  'function-ol'   :         {
                              search: /(.+)([\n]?)/g,
                              replace: "1. $1$2"
                            },

  'function-blockquote' :   {
                              search: /(.+)([\n]?)/g,
                              replace: "> $1$2"
                            },

  'function-h1'         :   {
                              search: /(.+)([\n]?)/g,
                              replace: "# $1$2"
                            },

  'function-h2'         :   {
                              search: /(.+)([\n]?)/g,
                              replace: "## $1$2"
                            },

  'function-h3'         :   {
                              search: /(.+)([\n]?)/g,
                              replace: "### $1$2"
                            },

  'function-link'       :   {
                              exec: function( txt, selText, $field ) {
                                var results = null;
                                $.GollumEditor.Dialog.init({
                                  title: 'Insert Link',
                                  fields: [
                                    {
                                      id:   'text',
                                      name: 'Link Text',
                                      type: 'text'
                                    },
                                    {
                                      id:   'href',
                                      name: 'URL',
                                      type: 'text'
                                    }
                                  ],
                                  OK: function( res ) {
                                   var rep = '';
                                   if ( res['text'] && res['href'] ) {
                                      rep = '[' + res['text'] + '](' +
                                             res['href'] + ')';
                                    }
                                    $.GollumEditor.replaceSelection( rep );
                                  }
                                });
                              }
                            },

  'function-image'      :   {
                              exec: function( txt, selText, $field ) {
                                var results = null;
                                $.GollumEditor.Dialog.init({
                                  title: 'Insert Image',
                                  fields: [
                                    {
                                      id: 'url',
                                      name: 'Image URL',
                                      type: 'text'
                                    },
                                    {
                                      id: 'alt',
                                      name: 'Alt Text',
                                      type: 'text'
                                    }
                                  ],
                                  OK: function( res ) {
                                    var rep = '';
                                    if ( res['url'] && res['alt'] ) {
                                      rep = '![' + res['alt'] + ']' +
                                            '(' + res['url'] + ')';
                                    }
                                    $.GollumEditor.replaceSelection( rep );
                                  }
                                });
                              }
                            }

};

var MarkDownHelp = [

  {
    menuName: 'Block Elements',
    content: [
                {
                  menuName: 'Paragraphs &amp; Breaks',
                  data: '<p>To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.</p><p>If you want to create a line break, end a line with two or more spaces, then hit Return/Enter.</p>'
                },
                {
                  menuName: 'Headers',
                  data: '<p>Markdown supports two header formats. The wiki editor uses the &ldquo;atx&rsquo;-style headers. Simply prefix your header text with the number of <code>#</code> characters to specify heading depth. For example: <code># Header 1</code>, <code>## Header 2</code> and <code>### Header 3</code> will be progressively smaller headers. You may end your headers with any number of hashes.</p>'
                },
                {
                  menuName: 'Blockquotes',
                  data: '<p>Markdown creates blockquotes email-style by prefixing each line with the <code>&gt;</code>. This looks best if you decide to hard-wrap text and prefix each line with a <code>&gt;</code> character, but Markdown supports just putting <code>&gt;</code> before your paragraph.</p>'
                },
                {
                  menuName: 'Lists',
                  data: '<p>Markdown supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do &mdash; this is why the editor only uses one number.) To create an unordered list, you can prefix each line with <code>*</code>, <code>+</code> or <code>-</code>.</p> List items can contain multiple paragraphs, however each paragraph must be indented by at least 4 spaces or a tab.'
                },
                {
                  menuName: 'Code Blocks',
                  data: '<p>Markdown wraps code blocks in pre-formatted tags to preserve indentation in your code blocks. To create a code block, indent the entire block by at least 4 spaces or one tab. Markdown will strip the extra indentation you&rsquo;ve added to the code block.</p>'
                },
                {
                  menuName: 'Horizontal Rules',
                  data: 'Horizontal rules are created by placing three or more hyphens, asterisks or underscores on a line by themselves. Spaces are allowed between the hyphens, asterisks or underscores.'
                }
              ]
  },

  {
    menuName: 'Span Elements',
    content: [
                {
                  menuName: 'Links',
                  data: '<p>Markdown has two types of links: <strong>inline</strong> and <strong>reference</strong>. For both types of links, the text you want to display to the user is placed in square brackets. For example, if you want your link to display the text &ldquo;GitHub&rdquo;, you write <code>[GitHub]</code>.</p><p>To create an inline link, create a set of parentheses immediately after the brackets and write your URL within the parentheses. (e.g., <code>[GitHub](http://github.com/)</code>). Relative paths are allowed in inline links.</p><p>To create a reference link, use two sets of square brackets. <code>[my internal link][internal-ref]</code> will link to the internal reference <code>internal-ref</code>.</p>'
                },

                {
                  menuName: 'Emphasis',
                  data: '<p>Asterisks (<code>*</code>) and underscores (<code>_</code>) are treated as emphasis and are wrapped with an <code>&lt;em&gt;</code> tag, which usually displays as italics in most browsers. Double asterisks (<code>**</code>) or double underscores (<code>__</code>) are treated as bold using the <code>&lt;strong&gt;</code> tag. To create italic or bold text, simply wrap your words in single/double asterisks/underscores. For example, <code>**My double emphasis text**</code> becomes <strong>My double emphasis text</strong>, and <code>*My single emphasis text*</code> becomes <em>My single emphasis text</em>.</p>'
                },

                {
                  menuName: 'Code',
                  data: '<p>To create inline spans of code, simply wrap the code in backticks (<code>`</code>). Markdown will turn <code>`myFunction`</code> into <code>myFunction</code>.</p>'
                },

                {
                  menuName: 'Images',
                  data: '<p>Markdown image syntax looks a lot like the syntax for links; it is essentially the same syntax preceded by an exclamation point (<code>!</code>). For example, if you want to link to an image at <code>http://github.com/unicorn.png</code> with the alternate text <code>My Unicorn</code>, you would write <code>![My Unicorn](http://github.com/unicorn.png)</code>.</p>'
                }
              ]
  },

  {
    menuName: 'Miscellaneous',
    content: [
                {
                  menuName: 'Automatic Links',
                  data: '<p>If you want to create a link that displays the actual URL, markdown allows you to quickly wrap the URL in <code>&lt;</code> and <code>&gt;</code> to do so. For example, the link <a href="javascript:void(0);">http://github.com/</a> is easily produced by writing <code>&lt;http://github.com/&gt;</code>.</p>'
                },

                {
                  menuName: 'Escaping',
                  data: '<p>If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (<code>\\</code>). Markdown will ignore the character directly after a backslash.'
                }
              ]
  }
];


$.GollumEditor.defineLanguage('markdown', MarkDown);
$.GollumEditor.defineHelp('markdown', MarkDownHelp);

})(jQuery);


$(document).ready(function() {
  $.GollumEditor(); 
});
