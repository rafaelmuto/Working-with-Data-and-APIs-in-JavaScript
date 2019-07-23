let video;

function setup() {
  const canvas = createCanvas(635, 480);
  canvas.parent('p5_canvas');

  // setting-up webcam capture:
  video = createCapture(VIDEO);
  video.size(80, 60);
  video.hide();

  let lat, lon;

  // getting geolocation data:
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

  // => SUBMIT post:
  document.getElementById('submit').addEventListener('click', async event => {
    // getting msg and name from form:
    const msg = document.getElementById('msg').value;
    const name = document.getElementById('name').value;

    // como enviar a imagem para o backend?
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

  // GET post list from API:
  const printData = async () => {
    const res = await fetch('/API');
    const data = await res.json();

    console.log('fetching api...');
    console.log(data);

    const postsList = document.getElementById('postsList');

    for (item of data) {
      const postItem = document.createElement('div');
      postItem.setAttribute('class', 'post');
      postItem.setAttribute('id', item._id);

      const post__image = document.createElement('img');
      post__image.src = item.image64;
      post__image.setAttribute('class', 'post__selfy');
      const post__info = document.createElement('p');
      post__info.textContent = `>>>${item._id}: ${item.name} [${item.lat},${item.lon}] @ ${item.timestamp}`;
      post__info.setAttribute('class', 'post__info');
      const post__msg = document.createElement('p');
      post__msg.textContent = item.msg;
      post__msg.setAttribute('class', 'post__msg');

      postItem.append(post__image, post__info, post__msg);
      postsList.append(postItem);
    }
  };

  printData();
}

function draw() {
  // showing video feed:
  image(video, 0, 0, 640, 480);
}
