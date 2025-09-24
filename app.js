const containers = document.querySelectorAll(".playlist-container");

containers.forEach(container => {
    const cards = container.querySelector(".cards");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    // Initially hide buttons
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";

    // Scroll left
    leftBtn.addEventListener("click", () => {
        cards.scrollBy({ left: -200, behavior: "smooth" });
    });

    // Scroll right
    rightBtn.addEventListener("click", () => {
        cards.scrollBy({ left: 200, behavior: "smooth" });
    });

    // Show buttons on hover
    container.addEventListener("mouseenter", () => {
        if (cards.scrollLeft > 0) {
            leftBtn.style.display = "block";
        }

        if (cards.scrollLeft < cards.scrollWidth - cards.clientWidth) {
            rightBtn.style.display = "block";
        }
    });

    // Hide buttons when hover ends
    container.addEventListener("mouseleave", () => {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";
    });

    // Update button visibility on scroll
    cards.addEventListener("scroll", () => {
        if (container.matches(':hover')) {
            // Left button
            if (cards.scrollLeft > 0) {
                leftBtn.style.display = "block";
            } else {
                leftBtn.style.display = "none";
            }

            // Right button
            if (cards.scrollLeft < cards.scrollWidth - cards.clientWidth-1) {
                rightBtn.style.display = "block";
            } else {
                rightBtn.style.display = "none";
            }
        }
    });
});






// playbar mai jitna play hua utna green dikhane ke liye
const slider=document.querySelector(".progres-bar");

slider.addEventListener("input", function () {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = `linear-gradient(to right, #1bd760 0%, #1bd760 ${value}%, #ddd ${value}%, #ddd 100%)`;
});

const volume=document.querySelector(".volume");


volume.addEventListener("input", function () {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = `linear-gradient(to right, #1bd760 0%, #1bd760 ${value}%, #ddd ${value}%, #ddd 100%)`;
});









// Songs ke liye
const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("f-img3"); // center button
const progress = document.querySelector(".progres-bar");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".tot-time");
const volumeSlider = document.querySelector(".volume");
const nowPlaying = document.getElementById("now-playing");
const songTitle = document.getElementById("song-title");

let isPlaying = false;

// Format time helper
function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}

// Play/Pause Toggle
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playBtn.src = "./footer/player_icon3.png"; // play_icon3.png
    } else {
        audio.play();
        playBtn.src = "./footer/pause.svg"; // add pause icon image
    }
    isPlaying = !isPlaying;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;

        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);

        progress.style.background = `linear-gradient(to right, #1bd760 0%, #1bd760 ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    }
});

// Seek song
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
});

// Click on card to play song
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const song = card.getAttribute("data-src");
        const title = card.querySelector("p").innerText;
        const img = card.querySelector("img").src;
        // let pl=card.querySelector("h1").innerText;

        audio.src = song;
        audio.play();

        songTitle.innerText = title;
        nowPlaying.innerText = song;
        document.querySelector(".foot1 img").src = img; // footer image भ

        playBtn.src = "./footer/pause.svg";
        isPlaying = true;
    });
});
