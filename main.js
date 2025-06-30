const channelList = document.getElementById('channel-list');
const channels = Array.from(channelList.getElementsByClassName('channel'));
const videoPlayer = document.getElementById('video-player');
const audioPlayer = document.getElementById('audio-player');
const mediaPlayButton = document.getElementById('media-play');
const mediaStopButton = document.getElementById('media-stop');
const searchInput = document.getElementById('search-input');
const resetButton = document.getElementById('reset-search');
const voiceSearchButton = document.getElementById('voice-search');

let currentHls = null;

function stopCurrentStream() {
  if (currentHls) {
    currentHls.destroy();
    currentHls = null;
  }
  videoPlayer.pause();
  videoPlayer.src = "";
  audioPlayer.pause();
  audioPlayer.src = "";
}

channels.forEach(channel => {
  channel.addEventListener('click', function () {
    channels.forEach(ch => ch.classList.remove('active'));
    this.classList.add('active');
    const url = this.getAttribute('data-url');
    if (!url) return;

    stopCurrentStream();

    const lowerUrl = url.toLowerCase();
    const isAudio = /\.(mp3|nsv|aac|flac|ogg)$/.test(lowerUrl) || url.includes('powerhitz') || url.includes('playlist.m3u8');

    if (isAudio) {
      audioPlayer.src = url;
      audioPlayer.load();
      audioPlayer.play().catch(console.error);
      videoPlayer.style.display = 'none';
      audioPlayer.style.display = 'block';
    } else {
      if (lowerUrl.includes('relinkerservlet') || lowerUrl.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          currentHls = new Hls();
          currentHls.loadSource(url);
          currentHls.attachMedia(videoPlayer);
          currentHls.on(Hls.Events.MANIFEST_PARSED, () => videoPlayer.play());
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
          videoPlayer.src = url;
          videoPlayer.addEventListener('loadedmetadata', () => videoPlayer.play());
        } else {
          videoPlayer.src = url;
          videoPlayer.play();
        }
      } else {
        videoPlayer.src = url;
        videoPlayer.play();
      }
      videoPlayer.style.display = 'block';
      audioPlayer.style.display = 'none';
    }
  });
});

mediaPlayButton.addEventListener('click', () => {
  if (audioPlayer.style.display === 'block' && audioPlayer.src) audioPlayer.play();
  else if (videoPlayer.style.display === 'block' && videoPlayer.src) videoPlayer.play();
});

mediaStopButton.addEventListener('click', () => {
  if (audioPlayer.style.display === 'block') {
    audioPlayer.pause(); audioPlayer.currentTime = 0;
  } else if (videoPlayer.style.display === 'block') {
    videoPlayer.pause(); videoPlayer.currentTime = 0;
  }
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  channels.forEach(channel => {
    const channelText = channel.textContent.toLowerCase();
    channel.style.display = channelText.includes(searchTerm) ? '' : 'none';
  });
});

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  channels.forEach(channel => channel.style.display = '');
});

voiceSearchButton.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'it-IT';
  recognition.start();

  recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    searchInput.value = speechResult;
    const searchTerm = speechResult;
    channels.forEach(channel => {
      const channelText = channel.textContent.toLowerCase();
      channel.style.display = channelText.includes(searchTerm) ? '' : 'none';
    });
  };

  recognition.onerror = function (event) {
    console.error('Errore riconoscimento vocale:', event.error);
  };
});
