const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const progress = document.getElementById('progress')

//progress container 

const progressContainer = document.getElementById('progress-container')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const randomBtn = document.getElementById('random')

//songs

const songs = [
    {name: 'halsey-balenciaga' ,
    displayName:'Balenciaga',
    artist:'Halsey' 
},
  {
    name: 'nora-remedy' ,
    displayName:'Remedy',
    artist:'Nora' 
  },
  {
      name: 'sia-cheapdrills' ,
      displayName:'Cheap Drills',
      artist:'Sia' 
  },
  {
      name: 'wyr-sneaky' ,
      displayName:'Sneaky',
      artist:'WYR' 
  }
]

let isPlaying = false

function playSong() {
    isPlaying = true

    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play()
}

function pauseSong() {
    isPlaying = false

    playBtn.classList.replace ('fa-pause', 'fa-play')
    music.pause()
}


playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()))

function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
}


let songIndex = 0

function prevSong() {
    songIndex-- 

    if(songIndex<0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}


function nextSong() {
    songIndex++

    if(songIndex>songs.length -1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}




loadSong(songs[songIndex])


function updateProgressBar(e) {
    if(isPlaying) {

        const {duration, currentTime} = e.srcElement

        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`

        const durationMinutes =Math.floor(duration/60)
        let durationSeconds = Math.floor(duration%60)

        if(durationSeconds<10) { 
            durationSeconds=`0${durationSeconds}` 
        }

        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

     
        const currentMinutes = Math.floor(currentTime/60)
        let currentSeconds = Math.floor(currentTime%60)

        if(currentSeconds<10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music

    music.currentTime = (clickX/width)*duration
}

// event listener

prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

music.addEventListener('ended', nextSong)

music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)




