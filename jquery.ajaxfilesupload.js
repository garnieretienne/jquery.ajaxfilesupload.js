(function( $ ){

  // default settings
  var settings = {
    'files'         : new Array(),
    'inputs'        : new Array(),
    'action'        : '',
    'abort_button'  : null,
    'progress'      : function(e){},
    'success'       : function(response){},
    'failed'        : function(e){},
    'abort'         : function(e){}
  };


  // namespacing
  var methods = {
    init : function( options ) {

      return this.each(function() {

        var $this = $(this);
    
        // given options over defaults options
        if ( options ) {       
          $.extend( settings, options );
        }

        // build the request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', settings.action, true);

        // callbacks
        xhr.upload.onprogress = settings.progress;
        xhr.upload.onerror    = settings.failed;
        xhr.upload.ontimeout  = settings.failed;
        xhr.upload.onabort    = settings.abort;
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              settings.success(xhr.response);
            } else {
              settings.failed(xhr.status, xhr.statusText);
            }
          }
        };

        // build abort button
        if (settings.abort_button) {
          settings.abort_button.click(function() {
            xhr.abort();
          });
        };
 
        // build the form data
        var formData = new FormData();
        var totalSize = 0;
        if(settings.files.length > 0) {
          $.each(settings.files, function(i, file) {
            if(file.size > 0) { // do not send empty files
              formData.append("files["+i+"]", file);
              totalSize =+ file.size;
            };
          });

          // add aditional inputs if asked, using jquery selector
          $.each(settings.inputs, function(i, input) {
            formData.append($(input).attr('id'), $(input).attr('value'));
          });

          // send it
          if(totalSize > 0) {
            xhr.send(formData);
          };
        };

      });
      
    }
  };

  $.fn.ajaxfilesupload = function( method ) {

    // method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on this plugin' );
    }

  };

})( jQuery );

