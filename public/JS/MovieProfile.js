function addMovieToFavorites(movieId) {
  fetch(global_url + '/user/favorites/username/' + username + '/' + movieId, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      movieId: movieId,
    }),
  }).then((response) => {
    if (response.ok) {
      alert('Movie added to favorites successfully! :D');
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

function addMovieToWatchLater(movieId) {
  fetch(global_url + '/watchlatermovie/create/username', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      watchLaterStatus: 'NOT_WATCHED',
      movieId: movieId,
      username: username,
    }),
  }).then((response) => {
    if (response.ok) {
      alert('Movie added to watch later successfully! :D');
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

function addMovieToPlaylist(movieId) {
  try {
    let playlistId = Number(document.getElementById('playlistId').value.trim());

    fetch(global_url + '/playlist/addmovie/' + playlistId + '/' + movieId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert(`Movie added to playlist id:${playlistId} successfully! :D`);
      } else {
        response.json().then((data) => alert(data.message));
      }
    });
  } catch (e) {
    alert('Playlist ID has to be a number. ' + e.prototype.toString());
  }
}
