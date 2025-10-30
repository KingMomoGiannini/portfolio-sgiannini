const CONFIG = {
  owner: "Sebastián Giannini",
  email: "sebastiangiannini95@gmail.com",
  cvUrl: "./Giannini-Sebastian.pdf", 
  projects: [
    {
      title: "Gestión de reservas (Spring Boot)",
      description: "CRUD de salas y reservas con autenticación, JPA/Hibernate y MySQL. Despliegue en Docker/Tomcat.",
      tags: ["Full‑stack","Spring Boot","Java"],
      url: "https://github.com/KingMomoGiannini/Proyecto-Java-Web-DOMI-Nation---FINAL-PrograII-INSPT",
      image: "./assets/domination.png"
    },
    {
      title: "Indoor Automation (Arduino/ESP32)",
      description: "Control de luz con fotoperiodo, lectura de temperatura/humedad (DHT), LCD con menú y reloj.",
      tags: ["ESP32","Arduino","C"],
      url: "https://github.com/KingMomoGiannini/Indoor-Responsive",
      image: null
    },
    {
      title: "Notas Full‑stack Challenge",
      description: "App CRUD de notas. Init de base vía script SQL y despliegue con Docker Compose.",
      tags: ["Full‑stack","Spring Boot","Java","React.ts"],
      url: "https://github.com/KingMomoGiannini/Hilrelens-Challenge_-Aplicacion-notas",
      image: null
    }
  ]
}

// ======= Tema (dark/light) =======
const root = document.documentElement
function applyTheme(t){
  if(t==='light'){root.classList.add('light')} else {root.classList.remove('light')}
  localStorage.setItem('theme', t)
}
const saved = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
applyTheme(saved)

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleTheme')
  if (toggle) toggle.addEventListener('click',()=>{
    const next = root.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next)
  })

  // ======= Utilidades =======
  const $ = s => document.querySelector(s)
  const $$ = s => Array.from(document.querySelectorAll(s))

  // ======= Proyectos con filtros =======
  const filtersEl = document.getElementById('filters')
  const projectsGrid = document.getElementById('projectsGrid')
  const tags = Array.from(new Set(CONFIG.projects.flatMap(p=>p.tags))).sort()
  let activeTag = 'Todos'

  function renderFilters(){
    if (!filtersEl) return
    filtersEl.innerHTML = ''
    const all = chip('Todos', true)
    filtersEl.appendChild(all)
    tags.forEach(t=>filtersEl.appendChild(chip(t)))
  }
  function chip(text, active=false){
    const el = document.createElement('span')
    el.className = 'chip' + (active? ' active':'')
    el.textContent = text
    el.addEventListener('click',()=>{
      activeTag = text
      $$('.filters .chip').forEach(c=>c.classList.remove('active'))
      el.classList.add('active')
      renderProjects()
    })
    return el
  }
  function renderProjects(){
    if (!projectsGrid) return
    const items = CONFIG.projects.filter(p=>activeTag==='Todos' || p.tags.includes(activeTag))
    projectsGrid.innerHTML = ''
    items.forEach(p=>{
      const card = document.createElement('article')
      card.className='project card'
      card.innerHTML = `
        <a class="thumb" href="${p.url}" target="_blank" rel="noreferrer">
          ${p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover">` : `<span class="chip">${p.tags.join(' · ')}</span>`}
        </a>
        <div>
          <h3><a href="${p.url}" target="_blank" rel="noreferrer">${p.title}</a></h3>
          <div class="meta">${p.description}</div>
        </div>
        <div class="stack">${p.tags.map(t=>`<span class='chip'>${t}</span>`).join('')}</div>
      `
      projectsGrid.appendChild(card)
    })
    const kpi = document.getElementById('kpiProjects')
    if (kpi) kpi.textContent = items.length
  }

  // ======= Datos dinámicos =======
  const year = document.getElementById('year')
  if (year) year.textContent = new Date().getFullYear()

  const emailLink = document.getElementById('emailLink')
  if (emailLink) emailLink.href = `mailto:${CONFIG.email}`

  const form = document.getElementById('contactForm')
  if (form) form.action = `mailto:${CONFIG.email}`

  const cv = document.getElementById('cvLink')
  if (cv) cv.href = CONFIG.cvUrl

  renderFilters();
  renderProjects();
})

// === Typewriter ===
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.dataset.text || el.textContent || '';
  el.textContent = '';
  let i = 0;
  const speed = 28; // ms por carácter (ajustable)
  function step(){
    if (i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
});
