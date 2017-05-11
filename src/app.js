
document.addEventListener('DOMContentLoaded', function(event) {
  const form = document.querySelector('#get-json');
  const input = form.querySelector('input[type="url"]');
  const button = form.querySelector('button');
  const reset = form.querySelector('input[type="reset"]');
  const array = document.querySelector('#make-array');

  function freeze(bool = true) {
    input.disabled = bool;
    button.disabled = bool;
    reset.disabled = bool;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    freeze();
    array.innerHTML = `\<p class="progress">In progress...\</p>`;

    // Just to emulate a delay between the request and the response...
    setTimeout(() => {

      Helper.ajax(input.value).then(function (json) {
        array.innerHTML = '';
        try {
          json = JSON.parse(json);
        } catch (e) {
          array.innerHTML = `\<p class="error">${e}\</p>`;
        }
        array.appendChild(Helper.json2Table(json));
        freeze(false);
      }).catch(function () {
        array.innerHTML = '\<p class="error">Invalid URL\</p>';
        freeze(false);
      });

    }, 1000);

  });
});
