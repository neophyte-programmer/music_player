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