(() => {
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
      const location = document.location;
      console.log(location.pathname);

      switch (location.pathname) {
        case '/':
          addSelected('index');
          break;
        case '/lists':
        case '/favorites':
        case '/watchlater':
        case '/search':
        case '/explore':
        case '/style':
          addSelected(location.pathname.substr(1));
          break;
        default:
          break;
      }
    });
  });
})();

function addSelected(id) {
  document
    .getElementById(id)
    .setAttribute('class', 'button button--nav is-button-selected');
}
