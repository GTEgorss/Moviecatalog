async function signUp() {
  let username = document.getElementById('username').value.trim();
  let fullname = document.getElementById('fullname').value.trim();
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();
  let confirm_password = document
    .getElementById('confirm-password')
    .value.trim();

  if (password !== confirm_password) {
    alert('Make sure that passwords match in Password and Confirm password');
  } else {
    let url = global_url + '/user/create';

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        fullname: fullname,
        email: email,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('You signed up successfully! :D');
      } else {
        response.json().then((data) => alert(data.message));
      }
    });
  }
}
