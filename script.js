const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titles
songs = ['hey', 'summer', 'ukulele'];

//Selected song
songIndex = 2;

//Load the details of a song in DOM
loadSong(songs[songIndex]);

//Function loadSong
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//Function playSong
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//Function pauseSong
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//Play previous song
function playPrev() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//Play next song
function playNext() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//Update progress of song in progressbar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}

//Set the progress of progressBar
function setProgress(e) {
    const width = this.clientWidth;
    const duration = audio.duration;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / width) * duration;
}


// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


//Change Songs evt listeners
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);


//Progress bar evt listeners
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', playNext);
