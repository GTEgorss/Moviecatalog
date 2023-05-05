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
        displayWatchLaterMovies(data);
      });
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

function displayWatchLaterMovies(data) {
  for (let i = 0; i < data.length; ++i) {
    addToList(
      data[i].id,
      data[i].movieId,
      data[i].movieTitle,
      data[i].watchLaterStatus === 'WATCHED',
    );
  }
}

function setWatchLaterStatus(id, node, watched) {
  const movie_name_element =
    node.parentNode.nextSibling.childNodes[0].childNodes[0];

  if (watched) {
    fetch(global_url + '/watchlatermovie/changestatus/' + id + '/WATCHED', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
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
    fetch(global_url + '/watchlatermovie/changestatus/' + id + '/NOT_WATCHED', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        movie_name_element.setAttribute('class', 'movie-list--movie-name');
      } else {
        response.json().then((data) => alert(data.message));
      }
    });
  }
}

function removeWatchLaterMovie(node, id) {
  fetch(global_url + '/watchlatermovie/id/' + id, {
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
