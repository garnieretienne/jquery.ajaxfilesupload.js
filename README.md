JQuery plugin to send files using ajax and FormData
===================================================

Usage
-----

```javascript
$.ajaxfilesupload({
  'files'        : files, // a files array
  'action'       : '/',   // destination
});
```

```javascript
$.ajaxfilesupload({
  'files'        : files,                                         // a files array
  'inputs'       : ['#jquery_selector', '#authenticity_token']    // other inputs to include in the form
  'action'       : '/',                                           // destination
  'abort_button' : $('#abort_button'),                            // build an abort button
  'progress'     : function(e) {                                  // progress event
    percent = Math.round(e.loaded/e.total*100);
    console.log(percent+' %');
  },
  'success'      : function(e) {
                                                                  // load event
  },
  'failed'       : function(e) {
                                                                  // error and timeout event
  },
  'abort'        : function(e) {
                                                                  // abort event
  }
});
```

Exemple
-------

```javascript
// see test/public/js/test.example.js

$(function () {
  $('#awesome_form').submit(function(e) {
    e.preventDefault();

    // get the FileList object
    var files = $('#files').prop('files');

    // print files names
    $.each(files, function ( i, file ) {
      $('#filelist').append('<tr><td>'+file.fileName+'</td><td class="status">prepare to send...</td></tr>');
    });

    // build an abort button
    abort = $('<div id="abort">');
    abort.text('ABORT');
    $('body').append(abort);

    var upload = $(this).ajaxfilesupload({
      'files'        : files,
      'action'       : '/',
      'abort_button' : abort,
      'progress'     : function(e) {
        percent = Math.round(e.loaded/e.total*100);
        $('.status').text('prepare to send ...');
        $('#upload_status').text(percent+' %');
      },
      'success'      : function() {
        $('.status').text('uploaded!');
      },
      'failed'       : function() {
        $('.status').text('failed!');
      },
      'abort'        : function() {
        $('.status').text('aborded!');
      }
    });
  });
});

```

Using with Rails
----------------

If you're using this plugin with rails, take care to add $('#authenticity_token') to the inputs options, to be sure your session will be reconized.
It can avoid this error: 

```
WARNING: Can't verify CSRF token authenticity
```
