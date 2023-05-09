window.addEventListener('load', function (event) {
  sendMsg();
});

const socket = io('https://gtegorss-moviecatalog.onrender.com');

socket.on('msgToClient', (message) => {
  receive(message);
});

function sendMsg(message) {
  const movieId = Number(document.getElementById('movie-id').innerText);
  socket.emit('msgToServer', movieId);
}

function receive(message) {
  const parts = message.split(' ');

  console.log(parts);

  const movieId = Number(parts[0]);
  const timesOpened = Number(parts[1]);

  const movieIdHTML = Number(document.getElementById('movie-id').innerText);

  if (movieIdHTML === movieId) {
    document.getElementById('times-opened').innerText = timesOpened;
  }
}
