async function createList() {
  let listTitle = document.getElementById('title').value.trim();
  let private = document.getElementById('private').checked;

  let url = global_url + '/playlist/create';

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: listTitle,
      private: private,
      username: username,
    }),
  }).then((response) => {
    if (response.ok) {
      document.getElementById('title').value = '';
      document.getElementById('private').checked = false;

      alert('Playlist created successfully! :D');
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}
