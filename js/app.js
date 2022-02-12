// Query Selectors

const wrapper = document.querySelector('.wrapper')
const musicImage = document.querySelector('.img')
const musicTitle = document.querySelector('.song__name')
const musicArtist = document.querySelector('.song__artist')
const musicAudio = document.querySelector('.music-audio')
const playPauseBtn = document.querySelector('.play__pause')

let musicIndex = 2

window.addEventListener("load", () => {
    // Call loadMusic() once window is loaded
    loadMusic(musicIndex)
})

// Load Music and Details To Page
function loadMusic(indexNumber) {
    musicTitle.innerText = allMusic[indexNumber - 1].name
    musicArtist.innerText = allMusic[indexNumber - 1].artist
    musicImage.src = `images/${allMusic[indexNumber - 1].img}.jpg`
    musicAudio.src = `songs/${allMusic[indexNumber - 1].src}.mp3`
}

// Play music 
function playMusic() {
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").classList = "wrapper__icon bx bx-pause-circle"
    musicAudio.play()
}

// Pause music 
function pauseMusic() {
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector("i").classList = "wrapper__icon bx bx-play-circle"
    musicAudio.pause()
}

// Play or pause music
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused")
    // If music is paused, play else pause
    isMusicPaused ? pauseMusic() : playMusic()
})