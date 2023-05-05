(function () {
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
      getFavorites(username);
    });
  });
})();

function getFavorites(username) {
  fetch(global_url + '/user/favorites/username/' + username).then(
    async (response) => {
      if (response.ok) {
        await response.json().then((data) => {
          displayFavorites(data);
        });
      } else {
        response.json().then((data) => alert(data.message));
      }
    },
  );
}

function displayFavorites(data) {
  document.querySelector('#favorites-spinner').style.display = 'none';

  if (data.length === 0) {
    document.getElementById('no-favorites').removeAttribute('class');
  } else {
    const table = document.querySelector('#favorites-table');
    const tableBody = table.children[0];

    tableBody.querySelectorAll('td').forEach((td) => td.parentElement.remove());

    for (let i = 0; i < data.length; ++i) {
      displayFavorite(tableBody, data[i].movieId, data[i].movieTitle);
    }

    table.setAttribute('class', 'layout-movie-list');
  }
}

function displayFavorite(tableBody, movieId, movieTitle) {
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('class', 'layout-movie-list-item');

  const titleTd = document.createElement('td');
  const titleBox = document.createElement('div');
  titleBox.setAttribute('class', 'layout-movie-link-box');
  const titleLink = document.createElement('a');
  titleLink.setAttribute('class', 'movie-link');
  titleLink.setAttribute('href', `movieprofile/${movieId}`);
  const titleKey = document.createTextNode(movieTitle);
  titleLink.appendChild(titleKey);
  titleBox.appendChild(titleLink);
  titleTd.appendChild(titleBox);
  tableRow.appendChild(titleTd);

  const removeTd = document.createElement('td');
  const remove = document.createElement('button');
  remove.setAttribute('class', 'button button--remove');
  remove.setAttribute('onclick', `removeFavorite(this, ${movieId})`);
  const removeKey = document.createTextNode('Remove');
  remove.appendChild(removeKey);
  removeTd.appendChild(remove);
  tableRow.appendChild(removeTd);

  tableBody.appendChild(tableRow);
}

function removeFavorite(node, movieId) {
  fetch(global_url + '/user/favorites/username/' + username + '/' + movieId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      node.parentNode.parentNode.parentNode.removeChild(
        node.parentNode.parentNode,
      );
      alert('Favorite removed successfully.');
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}
