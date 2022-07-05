const playPauseBtn = document.querySelector(".play-pause-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const theaterBtn = document.querySelector(".theater-btn");
const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");
const volumeSlider = document.querySelector(".volume-slider");
const volumeContainer = document.querySelector(".volume-container");
const muteBtn = document.querySelector(".mute-btn");
const totalTime = document.querySelector(".total-time");
const currentTime = document.querySelector(".current-time");
const captionsBtn = document.querySelector(".captions-btn");
const speedBtn = document.querySelector(".speed-btn");

// modes
theaterBtn.addEventListener("click", toggleTheater);

fullScreenBtn.addEventListener("click", toggleFullScreen);

miniPlayerBtn.addEventListener("click", toggleMiniPlayer);

function toggleTheater() {
  videoContainer.classList.toggle("theater");
}

function toggleFullScreen() {
  document.fullscreenElement == null
    ? video.requestFullscreen()
    : document.exitFullscreen();
}

function toggleMiniPlayer() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
    videoContainer.classList.remove("mini-player");
  } else {
    video.requestPictureInPicture();
    videoContainer.classList.add("mini-player");
  }
}

document.addEventListener("fullscreenchange", () =>
  videoContainer.classList.toggle("full-screen")
);

// play pause stuff
playPauseBtn.addEventListener("click", togglePlay);

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("click", togglePlay);
video.addEventListener("dblclick", toggleFullScreen);

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return;
  // if some text field is active then do nothing

  switch (e.key.toLowerCase()) {
    case " ":
      // if a button is highlighted with tab then don't play pause the video
      if (tagName === "button") return;
    case "k":
      togglePlay();
      break;

    case "f":
      toggleFullScreen();
      break;
    case "t":
      toggleTheater();
      break;
    case "i":
      toggleMiniPlayer();
      break;
    case "m":
      toggleMute();
      break;
    case "arrowup":
      // volume up
      if (video.volume != 1) video.volume = video.volume + 0.1;
      break;
    case "arrowdown":
      // volume down
      if (video.volume != 0) video.volume = video.volume - 0.1;
      break;

    case "arrowleft":
    case "j":
      if (video.currentTime != 0) video.currentTime = video.currentTime - 10;
      break;
    case "arrowright":
    case "l":
      if (video.currentTime != video.duration)
        video.currentTime = video.currentTime + 10;
      break;
  }
});

video.addEventListener("play", () => videoContainer.classList.remove("paused"));
video.addEventListener("pause", () => videoContainer.classList.add("paused"));

// play pause stuff end

// volume slider
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

function toggleMute() {
  video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;

  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "muted";
  } else if (video.volume <= 0.5) {
    volumeLevel = "low";
  } else {
    volumeLevel = "high";
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

// time stuff

video.addEventListener("loadeddata", () => {
  totalTime.textContent = formatDuration(video.duration);
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(duration) {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

video.addEventListener("timeupdate", () => {
  currentTime.textContent = formatDuration(video.currentTime);
});

// captions

const captions = video.textTracks[0];
captions.mode = "hidden"; // sets captions to be hidden by default

captionsBtn.addEventListener("click", toggleCaptions);

function toggleCaptions() {
  const isHidden = captions.mode === "hidden";
  captions.mode = isHidden ? "showing" : "hidden";
  videoContainer.classList.toggle("captions", isHidden);
}

// speed btn
speedBtn.addEventListener("click", changePlaybackSpeed);

function changePlaybackSpeed() {
  video.playbackRate === 2
    ? (video.playbackRate = 0.25)
    : (video.playbackRate = video.playbackRate + 0.25);
  speedBtn.textContent = `${video.playbackRate}x`;
}
