// =============================
// EDIT EVERYTHING HERE
// =============================
const CONFIG = {
  name: "Meg",
  age: 22,
  madeBy: "Bryce",

  eyebrow: "A small website, just for you.",
  subtitle: "22 reasons I love you and 22 memories I never want to forget.",


  // Put your 22 reasons here (keep them short-ish so it looks clean).
  reasons: [
    "Reason 1 — your beautiful smile whenever you laugh",
    "Reason 2 — how your freckles glow in the sun",
    "Reason 3 — your never-ending need for sleep",
    "Reason 4 — your love and care for animals",
    "Reason 5 — your big pretty brown doe eyes",
    "Reason 6 — because you always care for those near you",
    "Reason 7 — your patience for me even when I am slow asf",
    "Reason 8 — how beautiful you are inside and out",
    "Reason 9 — the love you have for horror movies",
    "Reason 10 — your my bestest friend",
    "Reason 11 — you make me feel comfortable like nobody else can",
    "Reason 12 — you're the prettiest girl I have ever lied my eyes on",
    "Reason 13 — we share the same future goals",
    "Reason 14 — you are motivated to succeed even when it gets difficult",
    "Reason 15 — your choice of comedy (monkeys)",
    "Reason 16 — your hugs make me instantly calm",
    "Reason 17 — you are not afraid to voice your opinion",
    "Reason 18 — we aren't afraid to be weird to each other",
    "Reason 19 — your taste in fashuion (and helping me lol)",
    "Reason 20 — the joy you can find in small things",
    "Reason 21 — because I can ragebait you and you still love me",
    "Reason 22 — because you're you (I know I'm lucky)"
  ],

  // Permanent photos: put files in /photos and list them here.
  // Easiest is naming them 01.jpg ... 22.jpg
  photos: [
    "photos/01.jpg","photos/02.jpg","photos/03.jpg","photos/04.jpg","photos/05.jpg","photos/06.jpg",
    "photos/07.jpg","photos/08.jpg","photos/09.jpg","photos/10.jpg","photos/11.jpg","photos/12.jpg",
    "photos/13.jpg","photos/14.jpg","photos/15.jpg","photos/16.jpg","photos/17.jpg","photos/18.jpg",
    "photos/19.jpg","photos/20.jpg","photos/21.jpg","photos/22.jpg"
  ],

  // Captions shown on each photo (keep 22 entries).
  captions: [
  "Photo 1 — First night together",
  "Photo 2 — Date at the zoo",
  "Photo 3 — Literally a week into dating",
  "Photo 4 — Before getting sick at Johnny Rockets",
  "Photo 5 — Maxy!",
  "Photo 6 — Your first birthday with me :) (19)",
  "Photo 7 — Mini-Gold date in Bville",
  "Photo 8 — Second Halloween together",
  "Photo 9 — Second birthday with me (20)",
  "Photo 10 — STRAWBERRY!!!",
  "Photo 11 — Monkey",
  "Photo 12 — Niagara Falls",
  "Photo 13 — My sister's grad",
  "Photo 14 — Riding da bull",
  "Photo 15 — Dinner at NEAT for 2 years together",
  "Photo 16 — Great Pumpkin Farm",
  "Photo 17 — Halloween 2024",
  "Photo 18 — Winning you Squishmallow in Canada",
  "Photo 19 — Another zoo picture",
  "Photo 20 — Our favorite place to eat",
  "Photo 21 — Hibachi for 3 years together",
  "Photo 22 — Halloween 2025"
],


  letter: `Meg,

Happy 22nd birthday 🖤! I decided to try something new instead of a card, and made a little website for you! I know you keep all of my cards, so whenever you want to come back here you can scan the QR code printed into the card. I just wanted to spend the time to let you know how much you mean to me, and how much I appreciate you so I decided on doing something extra special this year for your birthday. I want to ensure you understand how much I love you because you are the only girl for me. This is my 4th time being here for your birthday and I can't wait for the many more to come. Just know I will always be there for you when you need me most because I know you will always do the same for me. You are the most caring and beatiful girl I know and I would want it to be anyone else. I hope you appreciate the time I spent putting this together because I have never tried something like this before so I learned it for you! I love you so much, just remember you are my bestest friend in the world and I am glad I get to see your beatiful smile.


`,

  // Put your 3 songs here. Put the audio files in /music and match the filenames.
  songs: [
  { title: "Love It If We Made It - The 1975", meta: "Reminds me of our first months at college", file: "music/song1.mp3" },
  { title: "Music of the Night (Instrumental) - Fox Music Crew", meta: "I know you wanted to get married with this song playing", file: "music/song2.mp3" },
  { title: "Heavenly - Cigarettes After Sex", meta: "We both love this song", file: "music/song3.mp3" },
  { title: "Beautiful Things - Benson Boone", meta: "Another song you wanted playing to get married to", file: "music/song4.mp3" },
  { title: "NBAYOUNGBOAT - Lil Yachty", meta: "Always plays it at the function", file: "music/song5.mp3" }
],

  surpriseMessage: "Surprise: I love you more than you know. 🖤🌹"
};

// =============================
// Helpers
// =============================
const $ = (sel) => document.querySelector(sel);

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function pad2(n){ return String(n).padStart(2,"0"); }

function formatTime(sec){
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60);
  return `${m}:${String(s).padStart(2,"0")}`;
}

// =============================
// Hero + Letter
// =============================
function initHeroAndLetter(){
  setText("siteTitle", `Happy ${CONFIG.age}nd, ${CONFIG.name}`);
  setText("heroTitle", `Happy ${CONFIG.age}nd Birthday, ${CONFIG.name} 🖤`);
  setText("eyebrowText", CONFIG.eyebrow);
  setText("heroSubtitle", CONFIG.subtitle);
  setText("footerText", `Made with love by ${CONFIG.madeBy}.`);
  setText("noteText", CONFIG.letter);
  setText("signature", `— ${CONFIG.madeBy}`);


  $("#copyLinkBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      $("#copyLinkBtn").textContent = "Copied!";
      setTimeout(() => ($("#copyLinkBtn").textContent = "Copy link"), 1200);
    } catch {
      alert("Couldn’t copy automatically — copy the URL from your address bar.");
    }
  });
}

// =============================
// Reasons (grid + spotlight + auto)
// =============================
let reasonIdx = 0;
let reasonAuto = false;
let reasonTimer = null;

function renderSpotlight(){
  const reason = (CONFIG.reasons[reasonIdx] ?? "").trim();
  $("#spotNum").textContent = `REASON ${pad2(reasonIdx + 1)}`;
  $("#spotText").textContent = reason || "(Add your reasons in script.js)";
}

function setReasonIndex(i){
  const n = CONFIG.reasons.length || 1;
  reasonIdx = (i + n) % n;
  renderSpotlight();
}

function toggleReasonAuto(){
  reasonAuto = !reasonAuto;
  $("#reasonAutoBtn").textContent = `Auto: ${reasonAuto ? "On" : "Off"}`;

  if (reasonTimer) clearInterval(reasonTimer);
  reasonTimer = null;

  if (reasonAuto){
    reasonTimer = setInterval(() => setReasonIndex(reasonIdx + 1), 3500);
  }
}

function initReasons(){
  const grid = $("#reasonsGrid");
  if (!grid) return; // safety

  grid.innerHTML = "";

  const reasons = CONFIG.reasons.slice(0, 22);
  while (reasons.length < 22) reasons.push("Add another reason…");

  reasons.forEach((text, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const num = document.createElement("div");
    num.className = "cardNum";
    num.textContent = `REASON ${pad2(i + 1)}`;

    const body = document.createElement("div");
    body.className = "cardText";
    body.textContent = text;

    card.appendChild(num);
    card.appendChild(body);

    const onSelect = () => {
      setReasonIndex(i);
      document.querySelectorAll(".card").forEach(c => c.classList.remove("cardPinned"));
      card.classList.add("cardPinned");
    };

    card.addEventListener("click", onSelect);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") onSelect();
    });

    grid.appendChild(card);
  });

  // spotlight controls
  $("#reasonPrevBtn")?.addEventListener("click", () => setReasonIndex(reasonIdx - 1));
  $("#reasonNextBtn")?.addEventListener("click", () => setReasonIndex(reasonIdx + 1));
  $("#reasonAutoBtn")?.addEventListener("click", toggleReasonAuto);

  // start spotlight at first reason
  setReasonIndex(0);

  // Option B toggle (only if the button exists)
  const toggleBtn = $("#toggleAllReasons");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      grid.classList.toggle("hidden");
      const isHidden = grid.classList.contains("hidden");
      toggleBtn.textContent = isHidden ? "Show all 22" : "Hide all 22";
    });
  }
}


// =============================
// Photos (carousel + auto + local preview)
// =============================
let photos = [];
let captions = [];
let photoIdx = 0;
let photoAuto = false;
let photoTimer = null;

function buildThumbs(){
  const row = $("#thumbRow");
  row.innerHTML = "";

  photos.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.className = "thumb";
    btn.type = "button";
    btn.title = `Photo ${i + 1}`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Thumbnail ${i + 1}`;
    btn.appendChild(img);

    btn.addEventListener("click", () => setPhotoIndex(i));
    row.appendChild(btn);
  });
}

function setPhotoIndex(i){
  const n = photos.length || 1;
  photoIdx = (i + n) % n;

  $("#carouselImg").src = photos[photoIdx];
  $("#imgCount").textContent = `${photoIdx + 1} / ${n}`;
  $("#imgCaption").textContent = captions[photoIdx] || "";

  document.querySelectorAll(".thumb").forEach((t, k) => {
    t.classList.toggle("thumbActive", k === photoIdx);
  });
}

function resetPhotoTimer(){
  if (photoTimer) clearInterval(photoTimer);
  photoTimer = null;

  if (photoAuto){
    const seconds = Number($("#photoSpeed").value || 5);
    photoTimer = setInterval(() => setPhotoIndex(photoIdx + 1), seconds * 1000);
  }
}

function togglePhotoAuto(){
  photoAuto = !photoAuto;
  $("#photoAutoBtn").textContent = `Auto: ${photoAuto ? "On" : "Off"}`;
  resetPhotoTimer();
}

function initPhotos(){
  photos = (CONFIG.photos || []).slice(0, 22);
  captions = (CONFIG.captions || []).slice(0, photos.length);

  buildThumbs();
  setPhotoIndex(0);

  $("#prevBtn").addEventListener("click", () => setPhotoIndex(photoIdx - 1));
  $("#nextBtn").addEventListener("click", () => setPhotoIndex(photoIdx + 1));
  $("#photoAutoBtn").addEventListener("click", togglePhotoAuto);
  $("#photoSpeed").addEventListener("change", resetPhotoTimer);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setPhotoIndex(photoIdx - 1);
    if (e.key === "ArrowRight") setPhotoIndex(photoIdx + 1);
  });

    // local preview (doesn't upload) — only if the input exists in index.html
  const fileInput = $("#fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files || []);
      if (!files.length) return;

      photos = files.slice(0, 50).map((f) => URL.createObjectURL(f));
      captions = files.slice(0, photos.length).map((f) => f.name);

      buildThumbs();
      setPhotoIndex(0);

      // optional: turn off auto when using local preview
      if (photoAuto) togglePhotoAuto();
    });
  }
}

// =============================
// Music (3-song playlist + controls)
// =============================
const audio = $("#audio");
let trackIdx = 0;
let muted = false;
let rafId = null;

function renderPlaylist(){
  const wrap = $("#playlist");
  wrap.innerHTML = "";

  CONFIG.songs.forEach((s, i) => {
    const item = document.createElement("div");
    item.className = "plItem" + (i === trackIdx ? " plActive" : "");
    item.tabIndex = 0;

    const left = document.createElement("div");
    left.innerHTML = `<div class="plTitle">${s.title}</div><div class="plMeta">${s.meta || ""}</div>`;

    const right = document.createElement("div");
    right.className = "plMeta";
    right.textContent = i === trackIdx ? "playing" : "";

    item.appendChild(left);
    item.appendChild(right);

    const select = () => {
      setTrack(i, true); // keep play state
    };
    item.addEventListener("click", select);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") select();
    });

    wrap.appendChild(item);
  });
}

function setTrack(i, keepPlayState=false){
  const wasPlaying = !audio.paused && !audio.ended;
  trackIdx = (i + CONFIG.songs.length) % CONFIG.songs.length;

  const t = CONFIG.songs[trackIdx];
  $("#trackTitle").textContent = t.title;
  $("#trackSub").textContent = t.meta || "";

  audio.src = t.file;
  audio.load();

  renderPlaylist();
  updatePlayPauseButton();

  if (keepPlayState && wasPlaying){
    audio.play().catch(() => {
      // usually blocked until user gesture; fine
      updatePlayPauseButton();
    });
  }
}

function updatePlayPauseButton(){
  $("#playPause").textContent = audio.paused ? "Play" : "Pause";
}

function updateProgressUI(){
  $("#timeNow").textContent = formatTime(audio.currentTime);
  $("#timeDur").textContent = formatTime(audio.duration);

  const pct = (audio.duration && audio.duration > 0)
    ? (audio.currentTime / audio.duration) * 100
    : 0;

  $("#progressFill").style.width = `${Math.min(100, Math.max(0, pct))}%`;

  rafId = requestAnimationFrame(updateProgressUI);
}

function initMusic(){
  // default volume
  audio.volume = Number($("#volume").value || 0.7);

  // load first track
  setTrack(0, false);

  $("#playPause").addEventListener("click", async () => {
    try{
      if (audio.paused) await audio.play();
      else audio.pause();
      updatePlayPauseButton();
    } catch {
      // if blocked, user will try again; nothing to do
    }
  });

  $("#trackPrev").addEventListener("click", () => setTrack(trackIdx - 1, true));
  $("#trackNext").addEventListener("click", () => setTrack(trackIdx + 1, true));

  $("#volume").addEventListener("input", () => {
    audio.volume = Number($("#volume").value);
    if (muted && audio.volume > 0) {
      muted = false;
      audio.muted = false;
      $("#muteBtn").textContent = "Mute";
    }
  });

  $("#muteBtn").addEventListener("click", () => {
    muted = !muted;
    audio.muted = muted;
    $("#muteBtn").textContent = muted ? "Unmute" : "Mute";
  });

  // Click-to-seek
  $("#progress").addEventListener("click", (e) => {
    const rect = $("#progress").getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    if (audio.duration && audio.duration > 0) {
      audio.currentTime = ratio * audio.duration;
    }
  });

  // auto-advance next song
  audio.addEventListener("ended", () => {
    setTrack(trackIdx + 1, false);
    // keep playing automatically when track ends (allowed since user already initiated play)
    audio.play().catch(() => {});
  });

  // keep UI updated
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(updateProgressUI);

  audio.addEventListener("play", updatePlayPauseButton);
  audio.addEventListener("pause", updatePlayPauseButton);
}


// =============================
// Boot
// =============================
initHeroAndLetter();
initReasons();
initPhotos();
initMusic();
