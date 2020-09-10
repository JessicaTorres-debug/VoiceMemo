const log = console.log.bind(console),
  id = val => document.getElementById(val),
  ul = id('ul'),
  streamBtn = id('stream-btn'),
  start = id('start'),
  stop = id('stop');

let stream,
  recorder,
  counter = 1,
  chunks,
  media;


streamBtn.onclick = e => {
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
}


start.onclick = e => {
  start.disabled = true;
  stop.removeAttribute('disabled');
  chunks = [];
  recorder.start();
}


stop.onclick = e => {
  stop.disabled = true;
  recorder.stop();
  start.removeAttribute('disabled');
}
