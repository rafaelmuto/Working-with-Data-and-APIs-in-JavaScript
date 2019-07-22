let video;

function setup() {
  const canvas = createCanvas(320, 240);
  canvas.parent('p5_canvas');

  video = createCapture(VIDEO);
  video.size(80, 60);
  video.hide();

  let lat, lon;

  document.getElementById('submit').addEventListener('click', async event => {
    const msg = document.getElementById('msg').value;
    const name = document.getElementById('name').value;

    video.loadPixels();
    const image64 = video.canvas.toDataURL();

    const data = { lat, lon, name, msg, image64 };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const res = await fetch('/API', options);
    const json = await res.json();
    window.location = '/index.html';
    console.log('data entered!');
  });

  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
    });
  } else {
    console.log('geolocation not available');
  }

  const printData = async () => {
    const res = await fetch('/API');
    const data = await res.json();

    console.log('fetching api');
    console.log(data);

    const list_item = document.getElementById('list');

    for (item of data) {
      const list_item__image = document.createElement('img');
      list_item__image.src = item.image64;
      const list_item__id = document.createElement('p');
      list_item__id.textContent = item._id;
      const list_item__info = document.createElement('p');
      list_item__info.textContent = `Name: ${item.name} [${item.lat},${item.lon}] - ${item.timestamp}`;
      const list_item__msg = document.createElement('p');
      list_item__msg.textContent = item.msg;
      const list_item__hr = document.createElement('hr');

      list_item.append(list_item__id, list_item__info, list_item__msg, list_item__hr, list_item__image);
    }
  };

  printData();
}

function draw() {
  image(video, 0, 0, 320, 240);
}
