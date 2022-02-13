// QUERY SELECTORS

const wrapper = document.querySelector('.wrapper')
const musicImage = document.querySelector('.img')
const musicTitle = document.querySelector('.song__name')
const musicArtist = document.querySelector('.song__artist')
const musicAudio = document.querySelector('.music-audio')
const playPauseBtn = document.querySelector('.play__pause')
const previousBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const progressBar = document.querySelector('.progress__bar')
const progressArea = document.querySelector('.progress__area')
const repeatBtn = document.querySelector("#repeat-playlist")


// WINDOW FUNCTION
let musicIndex = 1

window.addEventListener('load', () => {
	// Call loadMusic() once window is loaded
	loadMusic(musicIndex)
})


// FUNCTIONS

// Load Music and Details To Page
function loadMusic(indexNumber) {
	musicTitle.innerText = allMusic[indexNumber - 1].name
	musicArtist.innerText = allMusic[indexNumber - 1].artist
	musicImage.src = `images/${allMusic[indexNumber - 1].img}.jpg`
	musicAudio.src = `songs/${allMusic[indexNumber - 1].src}.mp3`
}

// Play music
function playMusic() {
	wrapper.classList.add('paused')
	playPauseBtn.querySelector('i').classList =
		'wrapper__icon bx bx-pause-circle'
	musicAudio.play()
}

// Pause music
function pauseMusic() {
	wrapper.classList.remove('paused')
	playPauseBtn.querySelector('i').classList =
		'wrapper__icon bx bx-play-circle'
	musicAudio.pause()
}

// Next Music
function nextMusic() {
	// Increment indexMusic by 1
	musicIndex++
	musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex)
	loadMusic(musicIndex)
	playMusic()
}

// Previous Music
function previousMusic() {
	// Decrement indexMusic by 1
	musicIndex--
	musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex)
	loadMusic(musicIndex)
	playMusic()
}

// EVENT LISTENERS


// Play or pause music
playPauseBtn.addEventListener('click', () => {
	const isMusicPaused = wrapper.classList.contains('paused')
	// If music is paused, play else pause
	isMusicPaused ? pauseMusic() : playMusic()
})

// When next button is clicked, nextMusic() is called
nextBtn.addEventListener('click', () => {
	nextMusic()
})

// When next button is clicked, nextMusic() is called
previousBtn.addEventListener('click', () => {
	previousMusic()
})

// Update progress bar according to current time of song
musicAudio.addEventListener('timeupdate', (e) => {
	const currentTime = e.target.currentTime
	const duration = e.target.duration
	let progressWidth = (currentTime / duration) * 100
	progressBar.style.width = `${progressWidth}%`

	let musicCurrentTime = document.querySelector('.current')
	let musicDuration = document.querySelector('.duration')

	musicAudio.addEventListener('loadeddata', () => {
		// Update song duration
		let audioDuration = musicAudio.duration
		let totalMinutes = Math.floor(audioDuration / 60)
		let totalSeconds = Math.floor(audioDuration % 60)
		totalSeconds < 10
			? (totalSeconds = `0${totalSeconds}`)
			: (totalSeconds = totalSeconds)
		musicDuration.innerText = `${totalMinutes}:${totalSeconds}`
	})
	// Update current time of song
	let audioCurrent = musicAudio.currentTime
	let currentMinute = Math.floor(audioCurrent / 60)
	let currentSecond = Math.floor(audioCurrent % 60)
	currentSecond < 10
		? (currentSecond = `0${currentSecond}`)
		: (currentSecond = currentSecond)
	musicCurrentTime.innerText = `${currentMinute}:${currentSecond}`
})

// Update song time based on where you click
progressArea.addEventListener('click', (e) => {
	let progressWidthValue = progressArea.clientWidth //getting width of progress bar based on where you click
	let clickedOffSetX = e.offsetX // getting offset x value
	let songDuration = musicAudio.duration // getting total duration

	musicAudio.currentTime =
        (clickedOffSetX / progressWidthValue) * songDuration
    
    playMusic()
})

// Repeat and shuffle song based on icon
repeatBtn.addEventListener("click", () => {
    // get the innertext of the icon and change accordingly
    let getClass = repeatBtn.innerText // getting innertext of icon
    // Different changes on different clicks on the icon
    switch (getClass) {
        case "repeat":
            repeatBtn.innerText = "repeat_one"
            repeatBtn.setAttribute("title", "Loop Current Song")
            break
        case "repeat_one":
            repeatBtn.innerText = "shuffle"
            repeatBtn.setAttribute("title", "Shuffles Through Playlist")
            break
        case "shuffle":
            repeatBtn.innerText = "repeat"
            repeatBtn.setAttribute("title", "Loops Playlist")
            break
    }
})
