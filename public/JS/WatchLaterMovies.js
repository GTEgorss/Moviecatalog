(async () => {
  let username = 'GTEgorss';

  await fetch(global_url + '/user/username/' + username).then((response) => {
    if (response.ok) {
      response.json().then((data) => getWatchLaterMovies(data.id));
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
})();

function getWatchLaterMovies(id) {
  fetch(global_url + '/watchlatermovie/userid/' + id).then(async (response) => {
    if (response.ok) {
      await response.json().then((data) => {
        console.log(JSON.stringify(data));
        displayWatchLaterMovies(data);
      });
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

let watchLaterMovieId = 2;

function displayWatchLaterMovies(data) {
  console.log(data);

  for (let i = 0; i < data.length; ++i) {
    addToList(data[i].movieId, data[i].watchLaterStatus === 'WATCHED');
  }
}

function setWatchLaterStatus(node, watched) {
  const movie_name_element = node.parentNode.nextSibling.childNodes[0];

  if (watched) {
    fetch(
      global_url +
        '/watchlatermovie/changestatus/' +
        watchLaterMovieId +
        '/WATCHED',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => {
      if (response.ok) {
        movie_name_element.setAttribute(
          'class',
          'movie-list--movie-name is-movie-watched',
        );
      } else {
        response.json().then((data) => alert(data.message));
      }
    });
  } else {
    fetch(
      global_url +
        '/watchlatermovie/changestatus/' +
        watchLaterMovieId +
        '/NOT_WATCHED',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => {
      if (response.ok) {
        movie_name_element.setAttribute('class', 'movie-list--movie-name');
      } else {
        response.json().then((data) => alert(data.message));
      }
    });
  }
}

function removeWatchLaterMovie(node) {
  fetch(global_url + '/watchlatermovie/id/' + watchLaterMovieId, {
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
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}
