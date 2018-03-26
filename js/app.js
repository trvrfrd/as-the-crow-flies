var airports;

function loadJSON(path, handler) {
  console.log(path);
  var req = new XMLHttpRequest();

  req.addEventListener('load', function resHandler() {
    alert(this);
  });

  req.open('GET', path);
  req.send();
}

loadJSON('../data/airports.json', function(json) {
});
