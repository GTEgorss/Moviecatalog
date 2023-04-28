(async () => {
  let username = 'GTEgorss';

  await fetch(global_url + '/user/username/' + username).then((response) => {
    if (response.ok) {
      response.json().then((data) => getFavorites(data.id));
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
})();

function getFavorites(id) {
  fetch(global_url + '/user/favorites/' + id).then(async (response) => {
    if (response.ok) {
      await response.json().then((data) => {
        document.getElementById('favorites-list').innerText =
          JSON.stringify(data);
      });
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}
