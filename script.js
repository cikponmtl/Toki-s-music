// ===============================
// TOKI'S MUSIC - MUSIC PLAYER
// ===============================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const songList = document.getElementById("songList");
const searchInput = document.getElementById("searchInput");


// ===============================
// MINI PLAYER
// ===============================

const miniCover = document.getElementById("miniCover");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");

const miniPlay = document.getElementById("miniPlay");
const miniPrev = document.getElementById("miniPrev");
const miniNext = document.getElementById("miniNext");


// ===============================
// DAFTAR LAGU
// ===============================

const songs = [
    {
        title: "Chloe",
        artist: "Toki",
        file: "Chloee.mp3",
        cover: "suka.png"
    },

    {
        title: "Jatuh cinta",
        artist: "Asuma",
        file: "jc.mp3",
        cover: "춥다 (1).jpg"
    },
    
    {
        title: "Dj Pudar",
        artist: "Youkai",
        file: "dj pudar.mp3",
        cover: "Han.jpg"
    },
    
    {
        title: "Mahligai Cinta",
        artist: "Saya",
        file: "mahligai cinta.mp3",
        cover: "Gyj.jpg"
    },
    
    {
        title: "JC x MH",
        artist: "Anta lips",
        file: "jc x Mh.mp3",
        cover: "so hee.jpg"
    },
    
    {
        title: "Comak Caloo",
        artist: "4w",
        file: "comak calo.mp3",
        cover: "default.jpg"
    },
    
    {
        title: "?",
        artist: "786",
        file: "ada apa dengan cinta.mp3",
        cover: "MBG.jpg"
    },
    
    {
        title: "Tentang Perasaanku",
        artist: "Blue heart",
        file: "tentang persaan ku.mp3",
        cover: "mbg.jpg"
    },
    
    {
        title: "Jatuh cinta x My Heart",
        artist: "Dj Garam",
        file: "jc x my heart.mp3",
        cover: "default.jpg"
    },
    {
        title: "Hidup romanc",
        artist: "Kakeru",
        file: "Peak life.mp3",
        cover: "Yo.jpg"
    },
    
    {
        title: "MIEKU",
        artist: "Toki",
        file: "mieku.mp3",
        cover: "default.jpg"
    },
    
    {
        title: "kicau mania",
        artist: "Suka",
        file: "kicau mania.mp3",
        cover: "default.jpg"
    }
    
    
];


// ===============================
// PLAYER STATE
// ===============================

let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.file;
    cover.src = song.cover;
    miniCover.src = song.cover;
miniTitle.textContent = song.title;
miniArtist.textContent = song.artist;
updateMediaSession();

    progress.value = 0;

    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

    updateSongList();
}


// ===============================
// PLAY
// ===============================

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.textContent = "⏸";
}


// ===============================
// PAUSE
// ===============================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";
}


// ===============================
// PLAY / PAUSE BUTTON
// ===============================

playBtn.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});


// ===============================
// NEXT SONG
// ===============================

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSong && songs.length > 1);

        currentSong = randomIndex;

    } else {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

    }

    loadSong(currentSong);
    playSong();
}


// ===============================
// PREVIOUS SONG
// ===============================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
}


nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", previousSong);


// ===============================
// AUTO NEXT
// ===============================

audio.addEventListener("ended", () => {

    if (isRepeat) {

        audio.currentTime = 0;
        playSong();

    } else {

        nextSong();

    }

});


// ===============================
// SHUFFLE
// ===============================

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffleBtn.classList.toggle("active", isShuffle);

});


// ===============================
// REPEAT
// ===============================

repeatBtn.addEventListener("click", () => {

    isRepeat = !isRepeat;

    repeatBtn.classList.toggle("active", isRepeat);

});


// ===============================
// PROGRESS BAR
// ===============================

audio.addEventListener("loadedmetadata", () => {

    durationText.textContent = formatTime(audio.duration);

});


audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTimeText.textContent =
        formatTime(audio.currentTime);

});


progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// ===============================
// VOLUME
// ===============================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ===============================
// FORMAT TIME
// ===============================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


// ===============================
// MUSIC LIBRARY
// ===============================

function updateSongList() {

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const item = document.createElement("button");

        item.type = "button";

        item.className = "song-item";

        if (index === currentSong) {
            item.classList.add("playing");
        }

        item.innerHTML = `
            <img
                src="${song.cover}"
                alt=""
            >

            <div>
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>
        `;

        item.addEventListener("click", () => {

            loadSong(index);
            playSong();

        });

        songList.appendChild(item);

    });

}


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase().trim();

    const items =
        document.querySelectorAll(".song-item");

    items.forEach((item, index) => {

        const song = songs[index];

        const text =
            `${song.title} ${song.artist}`
            .toLowerCase();

        item.style.display =
            text.includes(keyword)
                ? ""
                : "none";

    });

});


// ===============================
// INITIALIZE
// ===============================

audio.volume = 1;

loadSong(0);

// ===============================
// MINI PLAYER CONTROLS
// ===============================

miniPlay.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});

miniPrev.addEventListener("click", () => {
    previousSong();
});

miniNext.addEventListener("click", () => {
    nextSong();
});


// Sinkronisasi tombol mini player
audio.addEventListener("play", () => {
    miniPlay.textContent = "⏸";
});

audio.addEventListener("pause", () => {
    miniPlay.textContent = "▶";
});

// ===============================
// ANDROID MEDIA CONTROLS
// ===============================

function updateMediaSession() {

    if (!("mediaSession" in navigator)) {
        return;
    }

    const song = songs[currentSong];

    navigator.mediaSession.metadata =
        new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: "Toki's Music",
            artwork: [
                {
                    src: song.cover,
                    sizes: "512x512",
                    type: "image/jpeg"
                }
            ]
        });
}


// PLAY / PAUSE
if ("mediaSession" in navigator) {

    navigator.mediaSession.setActionHandler(
        "play",
        () => {
            playSong();
        }
    );

    navigator.mediaSession.setActionHandler(
        "pause",
        () => {
            pauseSong();
        }
    );


    // NEXT
    navigator.mediaSession.setActionHandler(
        "nexttrack",
        () => {
            nextSong();
        }
    );


    // PREVIOUS
    navigator.mediaSession.setActionHandler(
        "previoustrack",
        () => {
            previousSong();
        }
    );

}
