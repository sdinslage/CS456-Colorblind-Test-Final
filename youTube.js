// Replace with your YouTube video IDs
var videoIds = ['https://www.youtube.com/watch?v=KcB_NhUNP0I', 'https://www.youtube.com/watch?v=-UNQxXfY2AI', 'VIDEO_ID_3'];

var players = [];

function onYouTubeIframeAPIReady() {
  for (var i = 0; i < videoIds.length; i++) {
    players[i] = new YT.Player('video' + (i + 1), {
      height: '315',
      width: '560',
      videoId: videoIds[i],
      events: {
        'onReady': onPlayerReady,
      },
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}