(function () {
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
      loadPlaylists();
    });
  });
})();

function loadPlaylists() {
  fetch(global_url + '/user/playlists/' + username).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayPlaylists(data);
      });
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

function displayPlaylists(data) {
  document.querySelector('#playlist-spinner').style.display = 'none';

  if (data.length === 0) {
    document.getElementById('no-playlists').removeAttribute('class');
  } else {
    const table = document.querySelector('#playlists');
    const tableBody = table.children[0];

    tableBody.querySelectorAll('td').forEach((td) => td.parentElement.remove());

    for (let i = 0; i < data.length; ++i) {
      displayPlaylist(tableBody, data[i].id, data[i].title, data[i].private);
    }

    table.setAttribute('class', 'movie-table playlists-movie-table');
  }
}

function displayPlaylist(tableBody, id, title, isPrivate) {
  const tableRow = document.createElement('tr');

  const titleTd = document.createElement('td');
  const titleLink = document.createElement('a');
  titleLink.setAttribute('href', `playlist/${id}`);
  const titleKey = document.createTextNode(title);
  titleLink.appendChild(titleKey);
  titleTd.appendChild(titleLink);
  tableRow.appendChild(titleTd);

  const privateTd = document.createElement('td');
  const privateKey = document.createTextNode(isPrivate ? 'yes' : 'no');
  privateTd.appendChild(privateKey);
  tableRow.appendChild(privateTd);

  tableBody.appendChild(tableRow);
}
