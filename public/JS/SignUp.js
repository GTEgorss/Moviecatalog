async function signUpUser() {
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

    try {
      let response = await supertokensEmailPassword.signUp({
        formFields: [
          {
            id: 'email',
            value: email,
          },
          {
            id: 'password',
            value: password,
          },
          {
            id: 'username',
            value: username,
          },
          {
            id: 'fullname',
            value: fullname,
          },
        ],
      });

      if (response.status === 'FIELD_ERROR') {
        response.formFields.forEach((formField) => {
          if (formField.id === 'email') {
            window.alert(formField.error);
          } else if (formField.id === 'password') {
            window.alert(formField.error);
          }
        });
      } else {
        fetch(url, {
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
          } else {
            response.json().then((data) => alert(data.message));
          }
        });

        alert('You signed up successfully! :D');
        window.location.href = '/';
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        alert(err.message);
      } else {
        alert(err.message);
      }
    }
  }
}
