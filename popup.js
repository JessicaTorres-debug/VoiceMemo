const log = console.log.bind(console),
  id = val => document.getElementById(val),
  ul = id('ul'),
  container = id('container'),
  start = id('start'),
  stop = id('stop');

let stream,
  recorder,
  counter = 1,
  chunks,
  media;


document.addEventListener('DOMContentLoaded', function() {
  let mediaOptions = {
    audio: {
      tag: 'audio',
      type: 'audio/webm',
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
  // start.disabled = true;

  if(start.classList.contains('notRec')){
		start.classList.remove('notRec');
		start.classList.add('Rec');
	}
	else{
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

    makeLink(inputField.value);
    input.parentNode.removeChild(input);
    submit.parentNode.removeChild(submit);
  });

  container.appendChild(input);
  container.appendChild(submit);

  let inputField = id(`field`);

  console.log('value:', inputField.value);
}

function makeLink(fileName) {
  let blob = new Blob(chunks, { type: media.type })
    , url = URL.createObjectURL(blob)
    , li = document.createElement('li')
    , mt = document.createElement(media.tag)
    , hf = document.createElement('a')
    ;
  mt.controls = true;
  mt.src = url;
  hf.href = url;

  hf.download = `${fileName}${media.ext}`;
  hf.innerHTML = `donwload ${hf.download}`;

  li.appendChild(mt);
  li.appendChild(hf);
  ul.appendChild(li);
}
