const chaosBtn = document.getElementById("chaosBtn");
let chaosActive = false;

chaosBtn.addEventListener("click", () => {
    if (!chaosActive) {
        chaosActive = true;
        startChaos();
        chaosBtn.innerText = "help";
    }
});

function startChaos() {
    setInterval(() => randomEvent(), 700);
}

function randomEvent() {
    const events = [
        shakeScreen,
        spawnEmoji,
        glitchTitle,
        swapBackground,
        moveButton
    ];
    const random = Math.floor(Math.random() * events.length);
    events[random]();
}

function shakeScreen() {
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);
}

function spawnEmoji() {
    const emojis = ["😼","🌚","🤡","😵","✨","👀","🧨","💔","🥀"];
    const e = document.createElement("div");
    e.classList.add("emoji");
    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.left = Math.random() * window.innerWidth + "px";
    e.style.top = Math.random() * window.innerHeight + "px";

    document.body.appendChild(e);
    setTimeout(() => e.remove(), 100);
}

function glitchTitle() {
    const title = document.getElementById("title");
    title.classList.add("glitch");
    setTimeout(() => title.classList.remove("glitch"), 600);
}

function swapBackground() {
    const colors = ["#ff4d4d", "#4dff91", "#4db8ff", "#ffe84d", "#d44dff", "#000"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
}

function moveButton() {
    chaosBtn.style.position = "absolute";
    chaosBtn.style.left = Math.random() * (window.innerWidth - 150) + "px";
    chaosBtn.style.top = Math.random() * (window.innerHeight - 60) + "px";
}
