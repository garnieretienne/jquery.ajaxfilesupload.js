(function( $ ){

  // default settings
  var settings = {
    'files'         : new Array(),
    'action'        : '',
    'abort_button'  : null,
    'progress'      : function(e){},
    'success'       : function(e){},
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
        xhr.upload.onload     = settings.success;
        xhr.upload.onerror    = settings.failed;
        xhr.upload.ontimeout  = settings.failed;
        xhr.upload.onabort    = settings.abort;

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
          $.each(settings.files, function ( i, file ) {
            if(file.size > 0) { // do not send empty files
              formData.append(i, file);
              totalSize =+ file.size;
            };
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

