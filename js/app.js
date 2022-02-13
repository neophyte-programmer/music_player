// Creating an array to store music
let allMusic = [
	{
		name: '4:44',
		artist: 'JAY Z',
		img: '444',
		src: 'four',
	},
	{
		name: 'Aben Wo Ha',
		artist: 'Daddy Lumba',
		img: 'aben_wo_ha',
		src: 'aben_wo_ha',
	},
	{
		name: 'Blinding Lights',
		artist: 'The Weeknd',
		img: 'blinding_lights',
		src: 'blinding_lights',
	},
	{
		name: 'Fall In Love',
		artist: 'D\'banj',
		img: 'fall_in_love',
		src: 'fall_in_love',
	},
	{
		name: 'For Tonight',
		artist: 'Giveon',
		img: 'for_tonight',
		src: 'for_tonight',
	},
	{
		name: 'Get Down On It',
		artist: 'Kool and the Gang',
		img: 'get_down_on_it',
		src: 'get_down_on_it',
	},
	{
		name: 'Heat Waves',
		artist: 'Glass Animals',
		img: 'heat_waves',
		src: 'heat_waves',
	},
	{
		name: 'Let\'s Get It On',
		artist: 'Marvin Gaye',
		img: 'lets_get_it_on',
		src: 'lets_get_it_on',
	},
	{
		name: 'No Wahala',
		artist: '1da Banton',
		img: 'no_wahala',
		src: 'no_wahala',
	},
	{
		name: 'Peru',
		artist: 'Fireboy DML ft Ed Sheeran',
		img: 'peru',
		src: 'peru',
	},
	{
		name: 'Save Your Tears',
		artist: 'The Weeknd ft Ariana Grande',
		img: 'save_your_tears',
		src: 'save_your_tears',
	},
	{
		name: 'Stay',
		artist: 'The Kid LAROI ft Justin Beiber',
		img: 'stay',
		src: 'stay',
	},
	{
		name: 'Three Little Birds',
		artist: 'Bob Marley and The Wailers',
		img: 'three_little_birds',
		src: 'three_little_birds',
	},
	{
		name: 'Vibration',
		artist: 'Fireboy DML',
		img: 'vibration',
		src: 'vibration',
	}
]


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
const repeatBtn = document.querySelector('#repeat-playlist')
const musicList = document.querySelector('.music__list-wrapper')
const showMoreBtn = document.querySelector('#more-music')
const hideMusicBtn = document.querySelector('#close')
const listTag = document.querySelector('.music__list')

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

//Change icon
repeatBtn.addEventListener('click', () => {
	// get the innertext of the icon and change accordingly
	let getText = repeatBtn.innerText // getting innertext of icon
	// Different changes on different clicks on the icon
	switch (getText) {
		case 'repeat':
			repeatBtn.innerText = 'repeat_one'
			repeatBtn.setAttribute('title', 'Loop Current Song')
			break
		case 'repeat_one':
			repeatBtn.innerText = 'shuffle'
			repeatBtn.setAttribute('title', 'Shuffles Through Playlist')
			break
		case 'shuffle':
			repeatBtn.innerText = 'repeat'
			repeatBtn.setAttribute('title', 'Loops Playlist')
			break
	}
})

// Change song based on icon
musicAudio.addEventListener('ended', () => {
	let getText = repeatBtn.innerText

	switch (getText) {
		case 'repeat':
			nextMusic()
			break
		case 'repeat_one':
			musicAudio.currentTime = 0
			loadMusic(musicIndex)
			playMusic()
			break
		case 'shuffle':
			let randomIndex = Math.floor(Math.random() * allMusic.length + 1)
			do {
				randomIndex = Math.floor(Math.random() * allMusic.length + 1)
			} while (musicIndex == randomIndex)
			musicIndex = randomIndex
			loadMusic(musicIndex)
			playMusic()
			break
	}
})

// Show Playlist
showMoreBtn.addEventListener('click', () => {
	musicList.classList.toggle('show')
})

// Hide Playlist
hideMusicBtn.addEventListener('click', () => {
	showMoreBtn.click()
})

// Create list according to array length
for (let i = 0; i < allMusic.length; i++) {
	// Pass song name and artist from array
	let liTag = ` <li class="music__list-item">
                    <div class="music__list-row">
                        <span class="music__list-info">${allMusic[i].name}</span>
                        <p class="music__list-location">${allMusic[i].artist}</p>
                        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                    </div>
                    <span id="${allMusic[i].src}" class="audio__duration">4:20</span>
                  </li>`
    listTag.insertAdjacentHTML("beforeend", liTag)

   let liAudioDuration = listTag.querySelector(`#${allMusic[i].src}`)
   let liAudioTag = listTag.querySelector(`.${allMusic[i].src}`)

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration
		let totalMinutes = Math.floor(audioDuration / 60)
		let totalSeconds = Math.floor(audioDuration % 60)
		totalSeconds < 10
			? (totalSeconds = `0${totalSeconds}`)
			: (totalSeconds = totalSeconds)
		liAudioDuration.innerText = `${totalMinutes}:${totalSeconds}`
    })
}
