var from = document.querySelector('#from');
var fromResultList = document.querySelector('.from .control__result-list');
var fromResultData = {};

var to = document.querySelector('#to');
var toResultList = document.querySelector('.to .control__result-list');
var toResultData = {};

var itinerary = document.querySelector('.itinerary');

fetch('data/airports.json')
  .then(response => response.json())
  .then(airports => {
    initTypeAhead({ input: from, output: fromResultList, data: airports, resultData: fromResultData });
    initTypeAhead({ input: to, output: toResultList, data: airports, resultData: toResultData });
  });

function initTypeAhead({ input, output, data, resultData }) {
  input.addEventListener('input', function handleInput() {
    delete resultData.lat;
    delete resultData.lon;
    var query = this.value || null;
    var matches = filterItems(data, query).slice(0, 10);
    console.log(matches);
    var html = matches.map(a => renderAirport(a, query)).join('');
    output.innerHTML = html;
  });

  output.addEventListener('click', function handleResultClick(e) {
    var li;
    if (e.target.nodeName === 'SPAN') {
      li = e.target.parentNode;
    } else if (e.target.nodeName === 'LI') {
      li = e.target;
    } else {
      return;
    }
    resultData.lat = li.dataset.lat;
    resultData.lon = li.dataset.lon;
    input.value = li.innerText;
    output.innerHTML = '';
    displayItinerary();
  });
}

function filterItems(items, query) {
  var regexp = new RegExp(query, 'i');
  return items.filter(item =>
    Object.values(item).some(field => regexp.test(field))
  );
}

function renderAirport(data, highlightText) {
  var text = `${data.iata} - ${data.name} - ${data.city}, ${data.state}`;
  if (highlightText) {
    let regexp = new RegExp(highlightText, 'i');
    text = text.replace(regexp, match => `<span class="highlight">${match}</span>`);
  }
  return `<li data-lat="${data.lat}" data-lon="${data.lon}">${text}</li>`;
}

function displayItinerary() {
  if (!dataReady(fromResultData, toResultData)) {
    itinerary.innerHTML = "<p>blah blah</p>";
  } else if (sameLocation(fromResultData, toResultData)) {
    itinerary.innerHTML = "<p>looks like you've already arrived</p>";
  } else {
    itinerary.innerHTML = `<p>${displayDistance(fromResultData, toResultData)}</p>`
  }
}

function dataReady(d1, d2) {
  return (d1.lat && d1.lon && d2.lat && d2.lon);
}

function sameLocation(d1, d2) {
  return (d1.lat === d2.lat && d1.lon === d2.lon);
}

function displayDistance(d1, d2) {
  var km = calculateDistance(d1, d2);
  var mi = km * 0.6213712;
  return `${km.toFixed(2)} km / ${mi.toFixed(2)} mi`;
}

function calculateDistance(d1, d2) {
  return getDistanceFromLatLonInKm(d1.lat, d1.lon, d2.lat, d2.lon);
}

// you better BELIEVE I pasted these two functions straight from StackOverflow
// https://stackoverflow.com/a/27943/3777336
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
