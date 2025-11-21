let timer: number | undefined;
let time = 0;

self.onmessage = (e) => {
  const { command, value } = e.data;
  console.log('Worker received:', command, value);

  if (command === 'start') {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (time > 0) {
        time -= 1;
        self.postMessage({ time });
      } else {
        self.postMessage({ time: 0, done: true });
        if (timer) clearInterval(timer);
      }
    }, 1000);
  } else if (command === 'stop') {
    if (timer) clearInterval(timer);
    timer = undefined;
  } else if (command === 'set') {
    time = value;
    console.log('Worker time set to:', time);
  }
};
