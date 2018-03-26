var from = document.querySelector("#from");
var to = document.querySelector("#to");

fetch('../data/airports.json')
  .then(response => response.json())
  .then(airports => {
    initTypeAhead(from, airports);
    initTypeAhead(to, airports);
  });

function initTypeAhead(elem, arr) {
  elem.addEventListener("input", function handleInput() {
    var matches = filterItems(arr, this.value)
    console.log(matches);
  });
}

function filterItems(items, query) {
  var regexp = new RegExp(query, 'i');
  return items.filter(item =>
    Object.values(item).some(field => regexp.test(field))
  );
}
