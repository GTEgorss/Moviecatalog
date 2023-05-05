function removeMovie(node, playlistId, movieId) {
  fetch(global_url + '/playlist/removemovie/' + playlistId + '/' + movieId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      node.parentNode.parentNode.removeChild(node.parentNode);

      response
        .json()
        .then((data) =>
          alert(
            `Movie with title:${data.movieTitle} was removed from the playlist id:${data.playlistId}`,
          ),
        );
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}
