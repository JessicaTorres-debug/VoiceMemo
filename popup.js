const log = console.log.bind(console)
  , id = val => document.getElementById(val)
  , className = val => document.getElementsByClassName(val)
  , ul = id('downloads')
  , container = id('container')
  , types = className('fmt-option')
  , start = id('start')
  , stop = id('stop');

let stream
  , recorder
  , counter = 1
  , chunks
  , media;


document.addEventListener('DOMContentLoaded', function () {
  let mediaOptions = {
    audio: {
      tag: 'audio',
      type: 'audio/mpeg-3',
      ext: '.mp3',
      gUM: { audio: true }
    }
  };

  media = mediaOptions.audio;

  navigator.mediaDevices.getUserMedia(media.gUM)
    .then(_stream => {
      stream = _stream;

      id('btns').style.display = 'inherit';
      start.removeAttribute('disabled');

      recorder = new MediaRecorder(stream);

      recorder.ondataavailable = e => {
        chunks.push(e.data);
        if (recorder.state == 'inactive') {
          counter++;
          takeName();
        }
      };

      log('Media successfully received');
    })
    .catch(log);
})


start.onclick = e => {
  start.disabled = true;

  if (start.classList.contains('notRec')) {
    start.classList.remove('notRec');
    start.classList.add('Rec');
  }
  else {
    start.classList.remove('Rec');
    start.classList.add('notRec');
  }

  stop.removeAttribute('disabled');
  chunks = [];
  recorder.start();
}


stop.onclick = e => {
  start.classList.remove('Rec');
  start.classList.add('notRec');

  stop.disabled = true;
  recorder.stop();
  start.removeAttribute('disabled');
}



function takeName() {

  const input = document.createElement('input')
  input.setAttribute('id', `field`);

  const submit = document.createElement('button')
  submit.setAttribute('id', `save`)
  submit.addEventListener('click', function () {
    // if () {
    //   if () {
    //     media.type = 'audio/mpeg';
    //     media.ext = '.mp3';
    //   } else if () {
    //     media.type = '';
    //     media.ext = '.wav';
    //   } else if () {
    //     media.type = 'audio/ogg';
    //     media.ext = '.ogg';
    //   }
    // }
    makeLink(inputField.value);
    input.parentNode.removeChild(input);
    submit.parentNode.removeChild(submit);
  });

  if (ul.getElementsByTagName('li').length >= 1) {
    ul.appendChild(input);
    ul.appendChild(submit);
  } else {
    container.appendChild(input);
    container.appendChild(submit);
  }

  let inputField = id(`field`);
}

function makeLink(fileName) {
  let blob = new Blob(chunks, { type: media.type })
    , url = URL.createObjectURL(blob)
    , li = document.createElement('li')
    , mt = document.createElement(media.tag)
    , hf = document.createElement('a');

  mt.controls = true;
  mt.src = url;
  hf.href = url;

  hf.setAttribute('class', 'download');
  hf.download = `${fileName}${media.ext}`;
  hf.innerHTML = `<span><i class="material-icons md-48 toggleBtn get_app">get_app</i> ${hf.download}</span>`;

  li.appendChild(mt);
  li.appendChild(hf);
  ul.appendChild(li);
}
