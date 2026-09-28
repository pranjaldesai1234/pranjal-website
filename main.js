/* ================================================================
   Shared behaviour for every page.
   ================================================================ */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function niceDate(iso){
  const [y,m,d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m-1]} ${y}`;
}
function shortDate(iso){
  const [y,m,d] = iso.split("-").map(Number);
  return `${String(d).padStart(2,"0")}.${String(m).padStart(2,"0")}.${String(y).slice(2)}`;
}
function readTime(post){
  const words = (post.body||[]).map(b => b.lead||b.p||b.quote||b.note||"").join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words/200)) + " min read";
}
function sortedPosts(){ return [...POSTS].sort((a,b) => b.date.localeCompare(a.date)); }
function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function accentTitle(title, accent){
  if(!accent) return esc(title);
  const i = title.indexOf(accent);
  if(i === -1) return esc(title);
  return esc(title.slice(0,i)) + "<i>" + esc(accent) + "</i>" + esc(title.slice(i+accent.length));
}

/* ---------------- nav scroll state ---------------- */
function initNav(){
  const nav = document.querySelector(".nav");
  if(!nav) return;
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });
}

/* ---------------- hero load sequence ---------------- */
function initHero(){
  const lines = document.querySelectorAll(".hero-line");
  if(!lines.length) return;
  if(REDUCED){ lines.forEach(l => l.classList.add("in")); }
  else{
    lines.forEach((l,i) => setTimeout(() => l.classList.add("in"), 150*i + 80));
  }
}

/* ---------------- "Connecting ___." cycling line ---------------- */
function initConnectCycle(){
  const el = document.getElementById("connect-word");
  if(!el) return;
  const words = ["data.", "behaviour.", "markets.", "policy.", "people."];
  if(REDUCED){ el.textContent = words[0]; return; }
  let i = 0;
  setInterval(() => {
    el.classList.add("fading");
    setTimeout(() => {
      i = (i+1) % words.length;
      el.textContent = words[i];
      el.classList.remove("fading");
    }, 380);
  }, 3000);
}

/* ---------------- scroll reveals (generic) ---------------- */
function initReveal(){
  const targets = document.querySelectorAll(".reveal, .hair, .lorenz, .timeline, .sub-timeline, .fan-stage, .count-row");
  if(!("IntersectionObserver" in window) || REDUCED){
    targets.forEach(t => {
      t.classList.add("in","drawn","fanned");
    });
    document.querySelectorAll(".count-item .num[data-to]").forEach(runCount);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const t = e.target;
      t.classList.add("in");
      if(t.classList.contains("lorenz")) t.classList.add("drawn");
      if(t.classList.contains("timeline")) t.classList.add("drawn");
      if(t.classList.contains("sub-timeline")) t.classList.add("drawn");
      if(t.classList.contains("fan-stage")) t.classList.add("fanned");
      if(t.classList.contains("count-row")){
        t.querySelectorAll(".num[data-to]").forEach(runCount);
      }
      io.unobserve(t);
    });
  }, { threshold:0.18, rootMargin:"0px 0px -60px 0px" });
  targets.forEach(t => io.observe(t));
}

/* ---------------- count-up numbers ---------------- */
function runCount(el){
  const to = el.getAttribute("data-to");
  const suffix = el.getAttribute("data-suffix") || "";
  const from = parseInt(el.getAttribute("data-from") || "0", 10);
  const target = parseInt(to, 10);
  if(REDUCED || isNaN(target)){ el.textContent = to + suffix; return; }
  const dur = 1100, start = performance.now();
  function tick(now){
    const p = Math.min(1, (now-start)/dur);
    const eased = 1 - Math.pow(1-p, 3);
    const val = Math.round(from + (target-from)*eased);
    el.textContent = val + suffix;
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const FAN_ANGLES = [-16,-9,-3,3,9,16];
const FAN_Y      = [18, 8, 2, 2, 8, 18];


function initFan(){
  const stage = document.getElementById("fan-stage");
  if(!stage) return;
  const list = sortedPosts().slice(0,6);
  stage.innerHTML = list.map((post,i) => `
    <a class="fan-card" href="post.html?p=${encodeURIComponent(post.slug)}"
       style="z-index:${10-Math.abs(i-2.5)|0}; --a:${FAN_ANGLES[i] ?? 0}deg; --y:${FAN_Y[i] ?? 10}px;"
       data-angle="${FAN_ANGLES[i] ?? 0}" data-y="${FAN_Y[i] ?? 10}">
      <span class="tag">${esc(post.tag||"NOTE")}</span>
      <span class="ft">${esc(post.title)}</span>
    </a>
  `).join("");

  const cards = stage.querySelectorAll(".fan-card");
  if(REDUCED) return;

  stage.addEventListener("mousemove", (e) => {
    if(!stage.classList.contains("fanned")) return;
    const r = stage.getBoundingClientRect();
    const relX = (e.clientX - r.left)/r.width - 0.5; // -0.5..0.5
    cards.forEach(c => {
      const a = parseFloat(c.getAttribute("data-angle"));
      const y = parseFloat(c.getAttribute("data-y"));
      const tilt = relX * 6;
      c.style.transform = `translate(-50%,-50%) rotate(${a+tilt}deg) translateY(${y}px)`;
    });
  });
  stage.addEventListener("mouseleave", () => {
    cards.forEach(c => c.style.transform = ""); // fall back to the CSS var rule
  });
}

/* ---------------- story grid ---------------- */
function renderStoryGrid(){
  const mount = document.getElementById("story-grid");
  if(!mount) return;
  const list = sortedPosts();
  mount.innerHTML = list.map(post => {
    const href = `post.html?p=${encodeURIComponent(post.slug)}`;
    const coverHTML = post.cover ? `
      <div class="story-cover">
        <img src="${esc(post.cover)}" alt="${esc(post.title)}">
        <span class="tag cover-tag">${esc(post.tag||"NOTE")}</span>
      </div>` : `
      <div class="top">
        <span class="tag">${esc(post.tag||"NOTE")}</span>
        <span class="meta">${shortDate(post.date)}</span>
      </div>`;
    return `
    <div class="story-card reveal" data-href="${href}" tabindex="0">
      ${coverHTML}
      <div class="story-body">
        ${post.cover ? `<div class="top"><span></span><span class="meta">${shortDate(post.date)}</span></div>` : ""}
        <h3><a class="title-link" href="${href}">${accentTitle(post.title, post.accent)}</a></h3>
        <p class="ex">${esc(post.excerpt||"")}</p>
        <div class="bottom">
          <a class="read" href="${href}">Read &rarr;</a>
          <span class="meta">${readTime(post)}</span>
        </div>
        <div class="li">Originally on <a href="https://www.linkedin.com/in/pranjaldesai15/" target="_blank" rel="noopener">LinkedIn</a></div>
      </div>
    </div>`;
  }).join("");

  mount.querySelectorAll(".story-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if(e.target.closest("a")) return; // let real links behave normally
      window.location.href = card.dataset.href;
    });
    card.addEventListener("keydown", (e) => {
      if((e.key === "Enter" || e.key === " ") && !e.target.closest("a")){
        e.preventDefault();
        window.location.href = card.dataset.href;
      }
    });
  });
}

/* ---------------- Latest on LinkedIn (posts.json-driven) ---------------- */
async function renderLinkedInPosts(){
  const mount = document.getElementById("li-posts");
  if(!mount) return;

  let records = [];
  try{
    const res = await fetch("posts.json", { cache:"no-store" });
    if(res.ok) records = await res.json();
  }catch(e){
    records = []; // e.g. opened via file:// instead of a server — fail quietly
  }

  // dedupe by id (first occurrence wins), drop anything without a real url
  const seen = new Set();
  const clean = [];
  (records||[]).forEach(r => {
    if(!r || !r.id || !r.url || seen.has(r.id)) return;
    seen.add(r.id);
    clean.push(r);
  });
  clean.sort((a,b) => (b.date||"").localeCompare(a.date||""));

  if(!clean.length){
    mount.innerHTML = `<p class="li-posts-empty">No verified posts logged yet.</p>`;
    return;
  }

  mount.innerHTML = clean.map(r => `
    <div class="li-post-row">
      ${r.image ? `<img src="${esc(r.image)}" alt="">` : `<span></span>`}
      <div>
        <span class="li-date">${r.date ? esc(niceDate(r.date)) : ""}</span>
        <p class="li-excerpt">${esc(r.excerpt||"")}</p>
      </div>
      <a class="li-link" href="${esc(r.url)}" target="_blank" rel="noopener">View on LinkedIn &rarr;</a>
    </div>
  `).join("");
}

/* ---------------- single article ---------------- */
function renderArticle(){
  const mount = document.getElementById("article");
  if(!mount) return;

  const list = sortedPosts();
  const slug = new URLSearchParams(location.search).get("p");
  const idx = list.findIndex(x => x.slug === slug);
  const post = list[idx];

  if(!post){
    mount.innerHTML = `
      <div class="article-head"><h1>That essay isn't here</h1></div>
      <div class="article-body"><p>The link may be out of date. <a href="index.html#writing" style="color:var(--gold)">Browse everything written so far.</a></p></div>`;
    return;
  }

  document.title = `${post.title} — Pranjal Desai`;
  const meta = document.querySelector('meta[name="description"]');
  if(meta) meta.setAttribute("content", post.excerpt || "");

  const blocks = (post.body||[]).map(b => {
    if(b.lead)  return `<p class="lead">${esc(b.lead)}</p>`;
    if(b.quote) return `<blockquote>${esc(b.quote)}</blockquote>`;
    if(b.note)  return `<div class="article-note">${esc(b.note)}</div>`;
    if(b.img)   return `<figure><img src="${esc(b.img)}" alt="${esc(b.cap||post.title)}">${b.cap?`<figcaption>${esc(b.cap)}</figcaption>`:""}</figure>`;
    if(b.p)     return `<p>${esc(b.p)}</p>`;
    return "";
  }).join("");

  const prev = list[idx+1];
  const next = list[idx-1];

  mount.innerHTML = `
    <a class="back" href="index.html#writing">&larr; All writing</a>
    <div class="article-head">
      <div class="meta">
        <span class="tag">${esc(post.tag||"NOTE")}</span>
        <span class="meta" style="font-family:var(--f-mono);color:var(--muted)">${niceDate(post.date)} &nbsp;&middot;&nbsp; ${readTime(post)}</span>
      </div>
      <h1>${accentTitle(post.title, post.accent)}</h1>
    </div>
    <div class="article-body">${blocks}</div>
    <div class="byline">
      <img src="assets/about-portrait.jpg" alt="Pranjal Desai">
      <div>
        <div class="name">Pranjal Desai</div>
        <a class="link" href="index.html#writing">All essays &rarr;</a>
      </div>
    </div>
    <div class="prevnext">
      <span>${prev ? `<a href="post.html?p=${encodeURIComponent(prev.slug)}">&larr; ${esc(prev.title)}</a>` : ""}</span>
      <span>${next ? `<a href="post.html?p=${encodeURIComponent(next.slug)}">${esc(next.title)} &rarr;</a>` : ""}</span>
    </div>`;
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHero();
  initConnectCycle();
  initFan();
  renderStoryGrid();
  renderLinkedInPosts();
  renderArticle();
  initReveal();

  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
});
