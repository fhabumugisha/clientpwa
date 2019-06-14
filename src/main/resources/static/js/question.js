var form = document.querySelector('form');
var titleInput = document.querySelector('#title');
var fullNameInput = document.querySelector('#fullName');
var descriptionInput = document.querySelector('#description');

function sendData() {
  var questionData = new FormData();
  questionData.append('title', titleInput.value);
  questionData.append('fullName', fullNameInput.value);
  questionData.append('description', descriptionInput.value);

  fetch('/ask-question-sync', {
      method: 'POST',
      body: questionData
    })
    .then(function (res) {
      console.log('Sent data', res);
      //updateUI();
    })
}


form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (titleInput.value.trim() === '' || fullNameInput.value.trim() === '' || descriptionInput.value.trim() === '') {
    alert('Please enter valid data!');
    return;
  }


  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(function (sw) {
        var post = {
          id: new Date().toISOString(),
          title: titleInput.value,
          description: descriptionInput.value,
          fullName: fullNameInput.value,
        };
        writeData('sync-questions', post)
          .then(function () {
            return sw.sync.register('sync-new-questions');
          })
          .then(function () {
            updateUI();
            form.reset();

          })
          .catch(function (err) {
            console.log(err);
          });
      });
  } else {
    sendData();
  }
});

function updateUI() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);

}