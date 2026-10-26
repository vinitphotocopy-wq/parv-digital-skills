/* ===== EDIT HERE: main settings ===== */
const CONFIG = {
  // Country code 91 + number, no "+", spaces or brackets. VERIFY before launch.
  whatsapp: "919406542403",
  instagram: "https://www.instagram.com/parvdigitalskills/",
  youtube: "",   // optional: paste URL to show, leave "" to hide
  email: "",     // optional: e.g. "name@example.com", leave "" to hide
  generalMessage: "Hello Parv Digital Skills! I would like to discuss a digital service for my business."
};

/* ===== EDIT HERE: services ===== */
const SERVICES = [
  {icon:"▶", title:"Business Promotional Videos", text:"Videos that present your shop, products, offers and contact details. Ideas: local shop promotions, product videos, business introductions, offer announcements and social media reels.", msg:"Hello! I am interested in promotional video services for my shop/business."},
  {icon:"✂", title:"Video Editing", text:"Editing for short-form and long-form videos, YouTube content, social media videos, advertisements and promotional edits. Tell me your idea and I will confirm what is possible.", msg:"Hello! I am interested in your video editing service. I would like to discuss my project."},
  {icon:"▣", title:"Poster & Promotional Design", text:"Posters and promotional creatives for offers, products, announcements and social media.", msg:"Hello! I am interested in poster and promotional design."},
  {icon:"</>", title:"Website Development", text:"Professional static websites for businesses and suitable projects. Requirements and quotation depend on the functionality you need.", msg:"Hello! I would like to discuss a website for my business."},
  {icon:"✦", title:"AI Creative Solutions", text:"AI-assisted creative work such as visuals and content ideas, used openly and shaped to your brief. Ask me what is possible for your project.", msg:"Hello! I would like to know about your AI creative services."},
  {icon:"#", title:"Social Media Content & Promotion", text:"Content creation and promotional support for your social media pages. No guaranteed followers, reach or sales; just clear, consistent presentation.", msg:"Hello! I am interested in social media content and promotion for my business."}
];

/* ===== EDIT HERE: portfolio =====
   category: "Video Editing" or "Shop Promotion". First project in each category is shown large.
   thumb: image path (e.g. "assets/images/work1.jpg"), link: real URL (leave "" if none).
   label: "" for real work, or "Concept Project" / "Demo Project" if not a real client job. */
const PROJECTS = [
  {category:"Video Editing", title:"Video editing project", desc:"Add a short description of this edit.", thumb:"", link:"", label:""},
  {category:"Video Editing", title:"Video editing project", desc:"Add a short description of this edit.", thumb:"", link:"", label:""},
  {category:"Video Editing", title:"Video editing project", desc:"Add a short description of this edit.", thumb:"", link:"", label:""},
  {category:"Shop Promotion", title:"Shop promotion project", desc:"Add a short description of this promotion.", thumb:"", link:"", label:""},
  {category:"Shop Promotion", title:"Shop promotion project", desc:"Add a short description of this promotion.", thumb:"", link:"", label:""},
  {category:"Shop Promotion", title:"Shop promotion project", desc:"Add a short description of this promotion.", thumb:"", link:"", label:""}
];

const wa = m => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(m);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const EXT = ' target="_blank" rel="noopener noreferrer"';

document.getElementById("serviceGrid").innerHTML = SERVICES.map(s =>
  `<article class="card rv"><div class="ic" aria-hidden="true">${esc(s.icon)}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><a href="${wa(s.msg)}"${EXT}>Request a Quote</a></article>`).join("");

document.getElementById("portfolio").innerHTML = ["Video Editing","Shop Promotion"].map(cat => {
  const items = PROJECTS.filter(p => p.category === cat);
  return `<div class="cat"><h3>${cat}</h3><div class="pgrid">` + items.map((p,i) => {
    const thumb = p.thumb ? `<img class="thumb" src="${esc(p.thumb)}" loading="lazy" alt="${esc(p.title)} preview">` : `<div class="thumb">Project preview coming soon</div>`;
    const action = p.link ? `<a class="btn" href="${esc(p.link)}"${EXT}>View Project</a>` : `<span class="soon">Project link coming soon</span>`;
    const badge = p.label ? `<span class="badge">${esc(p.label)}</span>` : "";
    return `<article class="proj rv${i===0?" feat":""}">${thumb}<div class="body">${badge}<h4>${esc(p.title)}</h4><p>${esc(p.desc)}</p>${action}</div></article>`;
  }).join("") + `</div></div>`;
}).join("");

document.querySelectorAll("[data-wa]").forEach(a => { a.href = wa(CONFIG.generalMessage); a.target = "_blank"; a.rel = "noopener noreferrer"; });

const soc = [["Instagram",CONFIG.instagram],["YouTube",CONFIG.youtube]].filter(x => x[1]).map(x => `<a href="${esc(x[1])}"${EXT}>${x[0]}</a>`);
if (CONFIG.email) soc.push(`<a href="mailto:${esc(CONFIG.email)}">Email</a>`);
document.getElementById("socials").innerHTML = soc.join("");
document.getElementById("yr").textContent = new Date().getFullYear();

const btn = document.querySelector(".menu"), nav = document.getElementById("nav");
const setMenu = o => { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); btn.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); btn.focus(); } });

const els = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.1});
  els.forEach(el => io.observe(el));
} else els.forEach(el => el.classList.add("in"));
