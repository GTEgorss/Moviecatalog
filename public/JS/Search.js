window.onload = () => {
  const input = document.getElementById('movieTitle');
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      DoSearch();
    }
  });
};

function DoSearch() {
  document.getElementById('search-spinner').setAttribute('class', 'spinner');

  let title = document
    .getElementById('movieTitle')
    .value.trim()
    .replace(/\s+/g, ' ');

  fetch(global_url + '/movie/title/' + title).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayResults(data);
        document
          .getElementById('search-spinner')
          .setAttribute('class', 'is-hidden');
      });
    } else {
      response.json().then((data) => alert(data.message));
    }
  });
}

function displayResults(data) {
  const table = document.querySelector('#results');
  const tableBody = table.children[0];
  tableBody.querySelectorAll('td').forEach((td) => td.parentElement.remove());
  table.setAttribute('class', 'is-movie-table-empty');

  if (data.length === 0) {
    document.getElementById('no-results').removeAttribute('class');
  } else {
    document.getElementById('no-results').setAttribute('class', 'is-hidden');
    for (let i = 0; i < data.length; ++i) {
      displayResult(
        tableBody,
        data[i].id,
        data[i].title,
        data[i].year,
        data[i].genre,
        data[i].age,
      );
    }

    table.setAttribute('class', 'movie-table playlists-movie-table');
  }
}

function displayResult(tableBody, id, title, year, genre, age) {
  const tableRow = document.createElement('tr');

  const titleTd = document.createElement('td');
  const titleLink = document.createElement('a');
  titleLink.setAttribute('href', `movieprofile/${id}`);
  const titleKey = document.createTextNode(title);
  titleLink.appendChild(titleKey);
  titleTd.appendChild(titleLink);
  tableRow.appendChild(titleTd);

  const yearTd = document.createElement('td');
  const yearKey = document.createTextNode(year);
  yearTd.appendChild(yearKey);
  tableRow.appendChild(yearTd);

  const genreTd = document.createElement('td');
  const genreKey = document.createTextNode(genre);
  genreTd.appendChild(genreKey);
  tableRow.appendChild(genreTd);

  const ageTd = document.createElement('td');
  let ageRating = age + '+';
  const ageKey = document.createTextNode(ageRating);
  ageTd.appendChild(ageKey);
  tableRow.appendChild(ageTd);

  tableBody.appendChild(tableRow);
}
