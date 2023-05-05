async function logIn() {
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

  try {
    let response = await supertokensEmailPassword.signIn({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    });

    if (response.status === 'FIELD_ERROR') {
      response.formFields.forEach((formField) => {
        if (formField.id === 'email') {
          window.alert(formField.error);
        }
      });
    } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
      window.alert('Email password combination is incorrect.');
    } else {
      window.alert('Logged in successfully');
      window.location.href = '/';
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert(err.message);
    }
  }
}
