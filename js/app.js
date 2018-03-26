var from = document.querySelector('#from');
var fromResult = document.querySelector('.from__result-list');

var to = document.querySelector('#to');
var toResult = document.querySelector('.to__result-list');

fetch('../data/airports.json')
  .then(response => response.json())
  .then(airports => {
    console.log(airports[0]);
    initTypeAhead({ input: from, output: fromResult, data: airports });
    initTypeAhead({ input: to, output: toResult, data: airports });
  });

function initTypeAhead({ input, output, data }) {
  input.addEventListener('input', function handleInput() {
    var matches = filterItems(data, this.value).slice(0, 10);
    var html = matches.map(a => displayAirport(a, this.value)).join('');
    output.innerHTML = html;
  });

  output.addEventListener('click', function handleResultClick(e) {
    if (e.target.nodeName === 'LI') {
      input.value = e.target.innerText;
      output.innerHTML = '';
      // store actual data somewhere: data-lat, data-long ?
      // calculate distance once both inputs have a result
    }
  });
}

function filterItems(items, query) {
  var regexp = new RegExp(query, 'i');
  return items.filter(item =>
    Object.values(item).some(field => regexp.test(field))
  );
}

function displayAirport(data, highlightText) {
  var text = `${data.iata} - ${data.name}`;
  var regexp = new RegExp(highlightText, 'i');
  text = text.replace(regexp, match => `<span class="highlight">${match}</span>`);
  return `<li>${text}</li>`;
}

