const log = console.log.bind(console),
  id = val => document.getElementById(val),
  ul = id('ul'),
  gUMbtn = id('gUMbtn'),
  start = id('start'),
  stop = id('stop');

let stream,
  recorder,
  counter = 1,
  chunks,
  media;


