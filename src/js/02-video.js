import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);

const savedTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));

if (savedTime) {
  player.setCurrentTime(savedTime.seconds);
}

player.on('timeupdate', throttle(onPlayerStart, 1000));

function onPlayerStart(e) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify({
      seconds: e.seconds,
    })
  );
}
