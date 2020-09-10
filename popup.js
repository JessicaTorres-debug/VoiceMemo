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
  }