const SECRET_CODE = "riya";

const lockScreen = document.getElementById("lockScreen");
const giftContent = document.getElementById("giftContent");
const unlockForm = document.getElementById("unlockForm");
const passcode = document.getElementById("passcode");
const errorMessage = document.getElementById("errorMessage");
const relockButton = document.getElementById("relockButton");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseTitle = document.getElementById("surpriseTitle");
const surpriseMessage = document.getElementById("surpriseMessage");
const letterCopy = document.getElementById("letterCopy");
const letterModal = document.getElementById("letterModal");
const letterEditor = document.getElementById("letterEditor");
const toast = document.getElementById("toast");

const messages = [
  ["A little reminder ✨", "You don't need to be perfect to make a difference. Being your own kind of wonderful is more than enough."],
  ["For the days you forget 🌙", "You are valued more than you know. Keep moving at your own pace and give yourself the same kindness you give others."],
  ["A note from the universe 💫", "Even small steps count. Keep learning, laughing, dreaming, and becoming the person you want to be."],
  ["Never forget this 💜", "You deserve happiness, peace, good friends, and people who celebrate the real you."],
  ["Keep your light ✨", "Your story is still unfolding. There are so many beautiful things ahead, so keep believing in yourself."]
];
let messageIndex = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

unlockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passcode.value.trim().toLowerCase() === SECRET_CODE) {
    lockScreen.classList.add("hidden");
    giftContent.classList.remove("hidden");
    errorMessage.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Welcome, Riya 💜");
  } else {
    errorMessage.textContent = "That code isn't quite right. Try again 💫";
    passcode.select();
  }
});

relockButton.addEventListener("click", () => {
  giftContent.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  passcode.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

surpriseButton.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;
  surpriseTitle.textContent = messages[messageIndex][0];
  surpriseMessage.textContent = messages[messageIndex][1];
});

document.getElementById("editLetter").addEventListener("click", () => {
  letterEditor.value = [...letterCopy.querySelectorAll("p")].map(p => p.textContent.trim()).join("\n\n");
  letterModal.classList.remove("hidden");
  letterEditor.focus();
});
document.getElementById("closeModal").addEventListener("click", () => letterModal.classList.add("hidden"));
letterModal.addEventListener("click", event => {
  if (event.target === letterModal) letterModal.classList.add("hidden");
});
document.getElementById("saveLetter").addEventListener("click", () => {
  const paragraphs = letterEditor.value.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  letterCopy.replaceChildren(...paragraphs.map(text => {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }));
  letterModal.classList.add("hidden");
  showToast("Your letter has been updated ✦");
});

const soundToggle = document.getElementById("soundToggle");
const soundLabel = document.getElementById("soundLabel");
const soundIcon = document.getElementById("soundIcon");
let audioContext = null;
let soundOn = false;
let soundTimer = null;
function playSoftTone() {
  if (!soundOn) return;
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 440 + Math.random() * 220;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, audioContext.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.65);
    oscillator.connect(gain); gain.connect(audioContext.destination);
    oscillator.start(); oscillator.stop(audioContext.currentTime + 0.7);
  } catch (_) {}
}
soundToggle.addEventListener("click", async () => {
  soundOn = !soundOn;
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  soundLabel.textContent = soundOn ? "Sound on" : "Sound off";
  soundIcon.textContent = soundOn ? "♫" : "♪";
  if (soundOn) {
    try { audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)(); await audioContext.resume(); } catch (_) {}
    playSoftTone();
    soundTimer = setInterval(playSoftTone, 1800);
  } else {
    clearInterval(soundTimer);
  }
});

const stars = document.getElementById("stars");
for (let i = 0; i < 35; i++) {
  const star = document.createElement("span");
  star.textContent = Math.random() > 0.5 ? "✦" : "·";
  star.style.position = "absolute";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.color = Math.random() > 0.5 ? "#d9ceff" : "#fff";
  star.style.opacity = String(0.2 + Math.random() * 0.6);
  star.style.fontSize = `${7 + Math.random() * 9}px`;
  star.style.animation = `twinkle ${2 + Math.random() * 4}s ease-in-out infinite alternate`;
  stars.appendChild(star);
}
