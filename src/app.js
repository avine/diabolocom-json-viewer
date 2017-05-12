
jQuery(document).ready(function(event) {
  const $form = jQuery('#get-json');
  const $input = $form.find('input[type="url"]');
  const $button = $form.find('button');
  const $reset = $form.find('input[type="reset"]');
  const $array = jQuery('#make-array');

  function freeze(bool = true) {
    $input.prop('disabled', bool);
    $button.prop('disabled', bool);
    $reset.prop('disabled', bool);
  }

  function message(text, css) {
    $array.html(jQuery('<p>').text(text).addClass(css));
  }

  $form.submit(function (e) {
    e.preventDefault();
    freeze();
    message('In progress...', 'progress');
    jQuery.get($input.val()).done(function (json) {
      $array.html('');
      try {
        json = JSON.parse(json);
        $array.html(Helper.json2Table(json));
      } catch (e) {
        message(e, 'error');
      }
      freeze(false);
    }).fail(function () {
      message('Invalid URL', 'error');
      freeze(false);
    });
  });
});
