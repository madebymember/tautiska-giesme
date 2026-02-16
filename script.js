/* --- Laikmačiai (palik kaip buvo) --- */
const LT_LABELS = {
  days: "d.",
  hours: "val.",
  minutes: "min.",
  seconds: "sek."
};

function nextOccurrence(month, day) {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, month - 1, day, 0, 0, 0, 0);
  if (now.getTime() >= target.getTime() + 24 * 60 * 60 * 1000) {
    target = new Date(year + 1, month - 1, day, 0, 0, 0, 0);
  }
  return target;
}

function updateTimer(container, target) {
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    const month = target.getMonth() + 1;
    const day = target.getDate();
    target = nextOccurrence(month, day);
    diff = target.getTime() - now.getTime();
  }

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  container.innerHTML = `
    ${unit(days, "days")}
    ${unit(hours, "hours")}
    ${unit(minutes, "minutes")}
    ${unit(seconds, "seconds")}
  `;

  const nextDateEl = container.parentElement.querySelector(".next-date");
  if (nextDateEl) {
    const fmt = new Intl.DateTimeFormat("lt-LT", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
    nextDateEl.textContent = `Artimiausia data: ${fmt.format(target)}`;
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
function pad(n) { return String(n).padStart(2, "0"); }

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

  // Paruošiam trukmės atvaizdavimą
  const setDuration = () => {
    if (audio.duration && isFinite(audio.duration)) {
      dur.textContent = formatTime(audio.duration);
    }
  };
  audio.addEventListener("loadedmetadata", setDuration);
  audio.addEventListener("durationchange", setDuration);

  // Play / Pause
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

  // Laiko eiga + „karaokės“ paryškinimas
  audio.addEventListener("timeupdate", () => {
    cur.textContent = formatTime(audio.currentTime);
    highlightByTime(audio.currentTime, hymnParas);
  });

  // Paspaudus ant posmo – peršokame į jo pradžią (jei turi data-start)
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
  // Surandame didžiausią data-start, kuris <= current
  let idx = -1;
  let bestStart = -1;
  paras.forEach((p, i) => {
    const start = parseFloat(p.dataset.start);
    if (!isNaN(start) && start <= current && start >= bestStart) {
      bestStart = start;
      idx = i;
    }
  });
  highlightParagraph(idx, paras);
}

function highlightParagraph(activeIndex, paras) {
  paras.forEach((p, i) => p.classList.toggle("active", i === activeIndex));
  if (activeIndex >= 0) {
    // Gražiai prascrollinam iki aktyvaus posmo (ne privaloma)
    paras[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function formatTime(sec) {
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60) % 60;
  const h = Math.floor(sec / 3600);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* --- Init --- */
document.addEventListener("DOMContentLoaded", () => {
  initTimers();
  initAudio();
});