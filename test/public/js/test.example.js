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
    $('#awesome_form').after(abort);

    var upload = $(this).ajaxfilesupload({
      'files'        : files,
      'inputs'       : ['#secret_key'],
      'action'       : '/',
      'abort_button' : abort,
      'progress'     : function(e) {
        percent = Math.round(e.loaded/e.total*100);
        console.log(percent+' %');
      },
      'success'      : function() {
        console.log('uploaded!');
      },
      'failed'       : function() {
        console.log('failed!');
      },
      'abort'        : function() {
        console.log('aborded!');
      }
    });
  });

  $('#must_fail_form').submit(function(e) {
    e.preventDefault();

    // get the FileList object
    var files = $('#files').prop('files');

    var upload = $(this).ajaxfilesupload({
      'files'        : files,
      'action'       : $(this).attr('action'),
      'progress'     : function(e) {
        percent = Math.round(e.loaded/e.total*100);
        console.log(percent+' %');
      },
      'success'      : function() {
        console.log('Should be declared as failed: Testing failed! :)');
      },
      'failed'       : function() {
        console.log('Should be declared as failed: Testing pass! :)');
      }
    });
  });
});
