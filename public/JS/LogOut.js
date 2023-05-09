async function logOut() {
  await supertokensSession.signOut();
  window.location.reload();

  fetch('session/revoke', { method: 'POST' }).then((response) =>
    response.json().then((data) => {
      console.log(data);
    }),
  );
}
