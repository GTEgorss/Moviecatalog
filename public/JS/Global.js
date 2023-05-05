// const global_url = 'http://localhost:2002';
const global_url = 'https://gtegorss-moviecatalog.onrender.com';

// const apiDomain = 'http://localhost:2002';
const apiDomain = 'https://gtegorss-moviecatalog.onrender.com';

const username = 'GTEgorss';

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
