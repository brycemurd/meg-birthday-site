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
    "Reason 10 — you're my bestest friend",
    "Reason 11 — you make me feel comfortable like nobody else can",
    "Reason 12 — you're the prettiest girl I have ever laid my eyes on",
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
  "Photo 7 — Mini-golf date in Bville",
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

Happy 22nd birthday 🖤! I decided to try something new instead of a card, and made a little website for you! I know you keep all of my cards, so whenever you want to come back here you can scan the QR code printed into the card. I just wanted to spend the time to let you know how much you mean to me, and how much I appreciate you so I decided on doing something extra special this year for your birthday. I want to ensure you understand how much I love you because you are the only girl for me. This is my 4th time being here for your birthday and I can't wait for the many more to come. Just know I will always be there for you when you need me most because I know you will always do the same for me. You are the most caring and beautiful girl I know and I would want it to be anyone else. I hope you appreciate the time I spent putting this together because I have never tried something like this before so I learned it for you! I love you so much, just remember you are my bestest friend in the world and I am glad I get to see your beautiful smile.


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
// Lock Screen (PIN = 1231)
// =============================
const LOCK_PIN = "1231";
let pin = "";
let unlockInProgress = false;

function renderPinDots(){
  const dots = Array.from(document.querySelectorAll(".pinDot"));
  dots.forEach((d, i) => d.classList.toggle("filled", i < pin.length));
}

function shakeLock(){
  const card = document.querySelector(".lockCard");
  if (!card) return;
  card.classList.remove("shake");
  // force reflow
  void card.offsetWidth;
  card.classList.add("shake");
}

function clearPin(){
  pin = "";
  renderPinDots();
}

function unlock(){
  if (unlockInProgress) return;
  unlockInProgress = true;

  document.body.classList.remove("isLocked");
  const lock = $("#lockScreen");
  if (lock) lock.classList.add("hidden");

  // focus to avoid iOS weird scroll jumps
  setTimeout(() => {
    document.getElementById("home")?.scrollIntoView({behavior:"auto", block:"start"});
  }, 50);
}

function tryPin(){
  if (pin.length < 4) return;
  if (pin === LOCK_PIN){
    unlock();
  } else {
    shakeLock();
    setTimeout(clearPin, 220);
  }
}

function pressDigit(d){
  if (pin.length >= 4) return;
  pin += String(d);
  renderPinDots();
  tryPin();
}

function backspace(){
  pin = pin.slice(0, -1);
  renderPinDots();
}

function initLock(){
  // clicks
  document.querySelectorAll("[data-digit]").forEach(btn => {
    btn.addEventListener("click", () => pressDigit(btn.getAttribute("data-digit")));
  });
  $("#pinDel")?.addEventListener("click", backspace);

  // keyboard support (optional)
  window.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("isLocked")) return;

    if (e.key >= "0" && e.key <= "9"){
      pressDigit(e.key);
      return;
    }
    if (e.key === "Backspace"){
      backspace();
      return;
    }
    if (e.key === "Escape"){
      clearPin();
    }
  });

  renderPinDots();
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

  $("#copyLinkBtn")?.addEventListener("click", async () => {
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
  if (!grid) return;

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

  $("#reasonPrevBtn")?.addEventListener("click", () => setReasonIndex(reasonIdx - 1));
  $("#reasonNextBtn")?.addEventListener("click", () => setReasonIndex(reasonIdx + 1));
  $("#reasonAutoBtn")?.addEventListener("click", toggleReasonAuto);

  setReasonIndex(0);

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
// Photos (carousel + auto)
// =============================
let photos = [];
let captions = [];
let photoIdx = 0;
let photoAuto = false;
let photoTimer = null;

function buildThumbs(){
  const row = $("#thumbRow");
  if (!row) return;
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

  const imgEl = $("#carouselImg");
  if (imgEl) imgEl.src = photos[photoIdx];

  setText("imgCount", `${photoIdx + 1} / ${n}`);
  setText("imgCaption", captions[photoIdx] || "");

  document.querySelectorAll(".thumb").forEach((t, k) => {
    t.classList.toggle("thumbActive", k === photoIdx);
  });
}

function resetPhotoTimer(){
  if (photoTimer) clearInterval(photoTimer);
  photoTimer = null;

  if (photoAuto){
    const seconds = Number($("#photoSpeed")?.value || 5);
    photoTimer = setInterval(() => setPhotoIndex(photoIdx + 1), seconds * 1000);
  }
}

function togglePhotoAuto(){
  photoAuto = !photoAuto;
  setText("photoAutoBtn", `Auto: ${photoAuto ? "On" : "Off"}`);
  resetPhotoTimer();
}

function initPhotos(){
  photos = (CONFIG.photos || []).slice(0, 22);
  captions = (CONFIG.captions || []).slice(0, photos.length);

  buildThumbs();
  setPhotoIndex(0);

  $("#prevBtn")?.addEventListener("click", () => setPhotoIndex(photoIdx - 1));
  $("#nextBtn")?.addEventListener("click", () => setPhotoIndex(photoIdx + 1));
  $("#photoAutoBtn")?.addEventListener("click", togglePhotoAuto);
  $("#photoSpeed")?.addEventListener("change", resetPhotoTimer);

  // Arrow keys are used by 2048 too; let the game take over when open.
  window.addEventListener("keydown", (e) => {
    if (window.__GAME2048_OPEN__) return;
    if (e.key === "ArrowLeft") setPhotoIndex(photoIdx - 1);
    if (e.key === "ArrowRight") setPhotoIndex(photoIdx + 1);
  });

  // local preview (only if input exists)
  const fileInput = $("#fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files || []);
      if (!files.length) return;

      photos = files.slice(0, 50).map((f) => URL.createObjectURL(f));
      captions = files.slice(0, photos.length).map((f) => f.name);

      buildThumbs();
      setPhotoIndex(0);

      if (photoAuto) togglePhotoAuto();
    });
  }
}

// =============================
// Music (playlist + controls)
// =============================
let trackIdx = 0;
let muted = false;
let rafId = null;

function audioEl(){ return document.getElementById("audio"); }

function renderPlaylist(){
  const wrap = $("#playlist");
  if (!wrap) return;
  wrap.innerHTML = "";

  CONFIG.songs.forEach((s, i) => {
    const item = document.createElement("div");
    item.className = "plItem" + (i === trackIdx ? " plActive" : "");
    item.tabIndex = 0;

    const left = document.createElement("div");
    left.innerHTML = `<div class="plTitle">${s.title}</div><div class="plMeta">${s.meta || ""}</div>`;

    const right = document.createElement("div");
    right.className = "plMeta";
    right.textContent = i === trackIdx && !audioEl().paused ? "playing" : "";

    item.appendChild(left);
    item.appendChild(right);

    const select = () => setTrack(i, true);
    item.addEventListener("click", select);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") select();
    });

    wrap.appendChild(item);
  });
}

function setTrack(i, keepPlayState=false){
  const audio = audioEl();
  if (!audio) return;

  const wasPlaying = !audio.paused && !audio.ended;
  trackIdx = (i + CONFIG.songs.length) % CONFIG.songs.length;

  const t = CONFIG.songs[trackIdx];
  setText("trackTitle", t.title);
  setText("trackSub", t.meta || "");

  audio.src = t.file;
  audio.load();

  renderPlaylist();
  updatePlayPauseButton();

  if (keepPlayState && wasPlaying){
    audio.play().catch(() => updatePlayPauseButton());
  }
}

function updatePlayPauseButton(){
  const audio = audioEl();
  const btn = $("#playPause");
  if (!audio || !btn) return;
  btn.textContent = audio.paused ? "Play" : "Pause";
}

function updateProgressUI(){
  const audio = audioEl();
  if (!audio) return;

  setText("timeNow", formatTime(audio.currentTime));
  setText("timeDur", formatTime(audio.duration));

  const pct = (audio.duration && audio.duration > 0)
    ? (audio.currentTime / audio.duration) * 100
    : 0;

  const fill = $("#progressFill");
  if (fill) fill.style.width = `${Math.min(100, Math.max(0, pct))}%`;

  rafId = requestAnimationFrame(updateProgressUI);
}

function initMusic(){
  const audio = audioEl();
  if (!audio) return;

  audio.volume = Number($("#volume")?.value || 0.7);
  setTrack(0, false);

  $("#playPause")?.addEventListener("click", async () => {
    try{
      if (audio.paused) await audio.play();
      else audio.pause();
      updatePlayPauseButton();
      renderPlaylist();
    } catch {
      // user can click again; browsers block without a gesture sometimes
    }
  });

  $("#trackPrev")?.addEventListener("click", () => setTrack(trackIdx - 1, true));
  $("#trackNext")?.addEventListener("click", () => setTrack(trackIdx + 1, true));

  $("#volume")?.addEventListener("input", () => {
    audio.volume = Number($("#volume").value);
    if (muted && audio.volume > 0) {
      muted = false;
      audio.muted = false;
      setText("muteBtn", "Mute");
    }
  });

  $("#muteBtn")?.addEventListener("click", () => {
    muted = !muted;
    audio.muted = muted;
    setText("muteBtn", muted ? "Unmute" : "Mute");
  });

  $("#progress")?.addEventListener("click", (e) => {
    const rect = $("#progress").getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    if (audio.duration && audio.duration > 0) {
      audio.currentTime = ratio * audio.duration;
    }
  });

  audio.addEventListener("ended", () => {
    setTrack(trackIdx + 1, false);
    audio.play().catch(() => {});
  });

  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(updateProgressUI);

  audio.addEventListener("play", () => { updatePlayPauseButton(); renderPlaylist(); });
  audio.addEventListener("pause", () => { updatePlayPauseButton(); renderPlaylist(); });
}

// =============================
// 2048 (monochrome, responsive, animated)
// =============================
const G = {
  size: 4,
  gap: 10,
  cell: 72,
  tileId: 1,
  grid: [],
  score: 0,
  best: 0,
  won: false,
  open: false
};

function gEls(){
  return {
    play: $("#gamePlayBtn"),
    newBtn: $("#gameNewBtn"),
    wrap: $("#gWrap"),
    board: $("#gBoard"),
    cells: $("#gCells"),
    tiles: $("#gTiles"),
    score: $("#gScore"),
    best: $("#gBest"),
    msg: $("#gMsg"),
  };
}

function gEmptyGrid(){
  G.grid = Array.from({length: G.size}, () => Array.from({length: G.size}, () => null));
}

function gEmptyCells(){
  const out = [];
  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      if (!G.grid[r][c]) out.push({r,c});
    }
  }
  return out;
}

function gAddRandom(){
  const empties = gEmptyCells();
  if (!empties.length) return false;
  const pick = empties[Math.floor(Math.random() * empties.length)];
  const t = {
    id: G.tileId++,
    v: Math.random() < 0.9 ? 2 : 4,
    r: pick.r,
    c: pick.c,
    isNew: true,
    isMerged: false
  };
  G.grid[pick.r][pick.c] = t;
  return true;
}

function gCanMove(){
  if (gEmptyCells().length) return true;
  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      const t = G.grid[r][c];
      if (!t) continue;
      const neighbors = [
        [r+1,c],[r-1,c],[r,c+1],[r,c-1]
      ];
      for (const [rr,cc] of neighbors){
        if (rr<0||rr>=G.size||cc<0||cc>=G.size) continue;
        const n = G.grid[rr][cc];
        if (n && n.v === t.v) return true;
      }
    }
  }
  return false;
}

function gSetMessage(text){
  const { msg } = gEls();
  if (!msg) return;
  if (!text){
    msg.classList.add("hidden");
    msg.textContent = "";
    return;
  }
  msg.textContent = text;
  msg.classList.remove("hidden");
}

function gUpdateScoreUI(){
  const { score, best } = gEls();
  if (score) score.textContent = String(G.score);
  if (best) best.textContent = String(G.best);
}

function gComputeMetrics(){
  const { board } = gEls();
  if (!board) return;

  const styles = getComputedStyle(board);
  const gap = Number((styles.getPropertyValue("--gap") || "10").trim().replace("px","")) || 10;
  const w = board.clientWidth;
  const cell = Math.floor((w - gap*(G.size+1)) / G.size);

  G.gap = gap;
  G.cell = cell;

  board.style.setProperty("--cell", `${cell}px`);
}

function gBuildCells(){
  const { cells } = gEls();
  if (!cells) return;
  cells.innerHTML = "";

  gComputeMetrics();

  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      const d = document.createElement("div");
      d.className = "gCell";
      const left = G.gap + c*(G.cell + G.gap);
      const top  = G.gap + r*(G.cell + G.gap);
      d.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      cells.appendChild(d);
    }
  }
}

function gTileKeySet(){
  const set = new Set();
  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      const t = G.grid[r][c];
      if (t) set.add(t.id);
    }
  }
  return set;
}

function gRender(){
  const { tiles } = gEls();
  if (!tiles) return;

  gComputeMetrics();

  const existing = new Map();
  tiles.querySelectorAll(".gTile").forEach(el => {
    const id = Number(el.getAttribute("data-id"));
    existing.set(id, el);
  });

  const alive = gTileKeySet();

  // remove old
  existing.forEach((el, id) => {
    if (!alive.has(id)) el.remove();
  });

  // add / update current
  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      const t = G.grid[r][c];
      if (!t) continue;

      let el = existing.get(t.id);
      const left = G.gap + t.c*(G.cell + G.gap);
      const top  = G.gap + t.r*(G.cell + G.gap);

      if (!el){
        el = document.createElement("div");
        el.className = "gTile";
        el.setAttribute("data-id", String(t.id));
        tiles.appendChild(el);
      }

      el.setAttribute("data-v", String(t.v));
      el.innerHTML = `<span>${t.v}</span>`;
      el.style.transform = `translate3d(${left}px, ${top}px, 0)`;

      el.classList.toggle("spawn", !!t.isNew);
      el.classList.toggle("merge", !!t.isMerged);

      // clear flags after first paint
      if (t.isNew || t.isMerged){
        requestAnimationFrame(() => {
          el.classList.remove("spawn");
          el.classList.remove("merge");
        });
      }

      t.isNew = false;
      t.isMerged = false;

      if (t.v >= 2048 && !G.won){
        G.won = true;
        gSetMessage("You got 2048. 🖤 Keep going if you want.");
      }
    }
  }

  gUpdateScoreUI();
}

function gReset(){
  gEmptyGrid();
  G.score = 0;
  G.won = false;
  gSetMessage("");
  gAddRandom();
  gAddRandom();
  gUpdateScoreUI();
  gRender();
}

function gMoveLine(getTileAt, setTileAt, iteratePositions){
  // iteratePositions returns array of {r,c} in scan order
  let moved = false;
  let gained = 0;

  for (const line of iteratePositions()){
    // line is an array of coords representing a row/col in movement order
    let targetIdx = 0;
    let lastTile = null;

    // clear line in grid (we'll rebuild)
    const tilesInOrder = [];
    for (const pos of line){
      const t = getTileAt(pos.r, pos.c);
      if (t) tilesInOrder.push(t);
      setTileAt(pos.r, pos.c, null);
    }

    for (const t of tilesInOrder){
      if (lastTile && lastTile.v === t.v && !lastTile._merged){
        // merge into lastTile
        lastTile.v *= 2;
        lastTile._merged = true;
        lastTile.isMerged = true;
        gained += lastTile.v;
        moved = true;
      } else {
        const dest = line[targetIdx];
        if (t.r !== dest.r || t.c !== dest.c) moved = true;
        t.r = dest.r;
        t.c = dest.c;
        t._merged = false;
        setTileAt(dest.r, dest.c, t);
        lastTile = t;
        targetIdx++;
      }
    }
  }

  return { moved, gained };
}

function gMove(dir){
  if (!G.open) return;

  // clear merge flags
  for (let r=0; r<G.size; r++){
    for (let c=0; c<G.size; c++){
      const t = G.grid[r][c];
      if (t) t._merged = false;
    }
  }

  const get = (r,c) => G.grid[r][c];
  const set = (r,c,val) => { G.grid[r][c] = val; };

  const makeLines = (type) => {
    // returns array of lines; each line is array coords in movement order
    const lines = [];

    if (type === "rowL"){
      for (let r=0; r<G.size; r++){
        lines.push(Array.from({length:G.size}, (_,i)=>({r,c:i})));
      }
    }
    if (type === "rowR"){
      for (let r=0; r<G.size; r++){
        lines.push(Array.from({length:G.size}, (_,i)=>({r,c:G.size-1-i})));
      }
    }
    if (type === "colU"){
      for (let c=0; c<G.size; c++){
        lines.push(Array.from({length:G.size}, (_,i)=>({r:i,c})));
      }
    }
    if (type === "colD"){
      for (let c=0; c<G.size; c++){
        lines.push(Array.from({length:G.size}, (_,i)=>({r:G.size-1-i,c})));
      }
    }
    return lines;
  };

  let result;
  if (dir === "left"){
    result = gMoveLine(get, set, () => makeLines("rowL"));
  } else if (dir === "right"){
    result = gMoveLine(get, set, () => makeLines("rowR"));
  } else if (dir === "up"){
    result = gMoveLine(get, set, () => makeLines("colU"));
  } else if (dir === "down"){
    result = gMoveLine(get, set, () => makeLines("colD"));
  } else return;

  if (!result.moved) return;

  G.score += result.gained;
  if (G.score > G.best){
    G.best = G.score;
    localStorage.setItem("meg2048_best", String(G.best));
  }

  gAddRandom();
  gRender();

  if (!gCanMove()){
    gSetMessage("Game over. Press New to try again.");
  }
}

function init2048(){
  const els = gEls();
  if (!els.play || !els.wrap || !els.board) return;

  // best score
  G.best = Number(localStorage.getItem("meg2048_best") || "0") || 0;
  gUpdateScoreUI();

  // ensure board layout is right
  gBuildCells();
  window.addEventListener("resize", () => { if (G.open) { gBuildCells(); gRender(); } });

  // open game
  els.play.addEventListener("click", () => {
    els.wrap.classList.remove("hidden");
    els.play.classList.add("hidden");
    els.newBtn?.classList.remove("hidden");
    window.__GAME2048_OPEN__ = true;
    G.open = true;
    gBuildCells();
    gReset();
    els.board.focus();
  });

  // new game
  els.newBtn?.addEventListener("click", () => gReset());

  // keyboard
  window.addEventListener("keydown", (e) => {
    if (!G.open) return;
    if (document.body.classList.contains("isLocked")) return;

    const keys = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"];
    if (!keys.includes(e.key)) return;

    // prevent page scrolling on mobile / safari
    e.preventDefault();

    if (e.key === "ArrowLeft") gMove("left");
    if (e.key === "ArrowRight") gMove("right");
    if (e.key === "ArrowUp") gMove("up");
    if (e.key === "ArrowDown") gMove("down");
  }, { passive: false });

  // swipe
  let sx=0, sy=0, active=false;
  const threshold = 22;

  els.board.addEventListener("touchstart", (e) => {
    if (!G.open) return;
    if (e.touches.length !== 1) return;
    active = true;
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });

  els.board.addEventListener("touchend", (e) => {
    if (!G.open || !active) return;
    active = false;

    const t = e.changedTouches[0];
    const dx = t.clientX - sx;
    const dy = t.clientY - sy;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

    if (Math.abs(dx) > Math.abs(dy)){
      gMove(dx > 0 ? "right" : "left");
    } else {
      gMove(dy > 0 ? "down" : "up");
    }
  }, { passive: true });
}

// =============================
// Boot
// =============================
document.addEventListener("DOMContentLoaded", () => {
  initLock();
  initHeroAndLetter();
  initReasons();
  initPhotos();
  initMusic();
  init2048();
});