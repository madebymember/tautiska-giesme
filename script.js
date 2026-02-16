/* ========================
 *  Laikmačiai + Audio
 *  Lokalė: lt-LT
 * ======================== */

/* --- Laikmačiai --- */
const LT_LABELS = {
  days: "d.",
  hours: "val.",
  minutes: "min.",
  seconds: "sek."
};

/** Artimiausia nurodyta kalendorinė data (00:00 vietiniu laiku).
 *  Jei šių metų data jau praėjo (ar yra šiandien po 00:00), imame kitus metus.
 */
function nextOccurrence(month, day) {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, month - 1, day, 0, 0, 0, 0);
  if (now >= target) {
    target = new Date(year + 1, month - 1, day, 0, 0, 0, 0);
  }
  return target;
}

function updateTimer(container, target) {
  const now = new Date();
  let diffMs = target - now;

  if (diffMs < 0) {
    // jei kažkaip pasiekėm tikslą – peršokam į kitus metus
    const m = target.getMonth() + 1;
    const d = target.getDate();
    target = nextOccurrence(m, d);
    diffMs = target - now;
    container._target = target;
  }

  const totalSec = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSec / (24 * 3600));
  const hours = Math.floor((totalSec % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  container.innerHTML = `
    ${unit(days, "days")}
    ${unit(hours, "hours")}
    ${unit(minutes, "minutes")}
    ${unit(seconds, "seconds")}
  `;

  const nextDateEl = container.parentElement.querySelector(".next-date");
  if (nextDateEl) {
    const fmt = new Intl.DateTimeFormat("lt-LT", {
      year: "numeric", month: "long", day: "numeric", weekday: "long"
    });
    nextDateEl.textContent = `Artimiausia data: ${fmt.format(container._target || target)}`;
  }
}

function unit(value, labelKey) {
  return `
    <div class="unit" aria-label="${value} ${labelText(labelKey)}">
      <span class="value">${pad(value)}</span>
      <span class="label">${LT_LABELS[labelKey]}</span>
    </div>
  `;
}

function labelText(k) {
  switch (k) {
    case "days": return "dienų";
    case "hours": return "valandų";
    case "minutes": return "minučių";
    case "seconds": return "sekundžių";
    default: return "";
  }
}
const pad = (n) => String(n).padStart(2, "0");

function initTimers() {
  const nodes = document.querySelectorAll(".countdown");
  nodes.forEach(node => {
    const month = parseInt(node.dataset.month, 10);
    const day = parseInt(node.dataset.day, 10);
    const target = nextOccurrence(month, day);
    node._target = target;
    updateTimer(node, target);
    setInterval(() => updateTimer(node, node._target), 1000);
  });
}

/* --- Audio: himno grotuvas --- */
function initAudio() {
  const audio = document.getElementById("hymn-audio");
  if (!audio) return;

  const btn = document.getElementById("play-toggle");
  const cur = document.getElementById("current-time");
  const dur = document.getElementById("duration");
  const hymnParas = Array.from(document.querySelectorAll(".hymn p"));

  // Trukmė
  const setDuration = () => {
    if (audio.duration && isFinite(audio.duration)) {
      dur.textContent = formatTime(audio.duration);
    }
  };
  audio.addEventListener("loadedmetadata", setDuration);
  audio.addEventListener("durationchange", setDuration);

  // Mygtukas Leisti/Pauzė
  const updateBtn = () => {
    btn.textContent = audio.paused ? "▶️ Leisti" : "⏸️ Pauzė";
  };
  btn.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });
  audio.addEventListener("play", updateBtn);
  audio.addEventListener("pause", updateBtn);
  audio.addEventListener("ended", () => {
    updateBtn();
    highlightParagraph(-1, hymnParas); // nuimti paryškinimą
  });

  // Laiko eiga + „karaokė“
  audio.addEventListener("timeupdate", () => {
    cur.textContent = formatTime(audio.currentTime);
    highlightByTime(audio.currentTime, hymnParas);
  });

  // Paspaudus posmą – šokti į jo pradžią (jei yra data-start)
  hymnParas.forEach(p => {
    p.style.cursor = "pointer";
    p.title = "Spauskite, kad peršoktumėte į šį posmą";
    p.addEventListener("click", () => {
      const start = parseFloat(p.dataset.start);
      if (!isNaN(start)) {
        audio.currentTime = start;
        audio.play();
      }
    });
  });
}

function highlightByTime(current, paras) {
  let idx = -1;
  let best = -1;
  paras.forEach((p, i) => {
    const start = parseFloat(p.dataset.start);
    if (!isNaN(start) && start <= current && start >= best) {
      best = start; idx = i;
    }
  });
  highlightParagraph(idx, paras);
}

function highlightParagraph(activeIndex, paras) {
  paras.forEach((p, i) => p.classList.toggle("active", i === activeIndex));
  if (activeIndex >= 0) {
    paras[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function formatTime(sec) {
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* --- Init --- */
document.addEventListener("DOMContentLoaded", () => {
  initTimers();
  initAudio();
});
