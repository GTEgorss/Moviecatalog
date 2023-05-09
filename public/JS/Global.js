// const global_url = 'http://localhost:2002';
const global_url = 'https://gtegorss-moviecatalog.onrender.com';

// const apiDomain = 'http://localhost:2002';
const apiDomain = 'https://gtegorss-moviecatalog.onrender.com';

const username = getCookie();

function getCookie() {
  const name = 'username=';
  let cookies = decodeURIComponent(document.cookie);
  console.log(cookies);
  const cookiesArray = cookies.split(';');
  let res;
  cookiesArray.forEach((val) => {
    if (val.trim().indexOf(name) === 0) {
      res = val.substring(name.length);
    }
  });

  return res;
}

window.addEventListener('load', function () {
  initAuth();
});

function initAuth() {
  supertokens.init({
    appInfo: {
      apiDomain: apiDomain,
      apiBasePath: '/apiauth',
      appName: 'moviecatalog',
    },
    recipeList: [supertokensSession.init(), supertokensEmailPassword.init()],
  });
}
