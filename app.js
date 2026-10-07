'use strict';

/* =====================================================================
   English Lab — curso de inglés B1
   Contenido: datos/etapaN.js (window.CLASES) · Progreso: localStorage + Google Sheets
   ===================================================================== */

const APP_ONLINE = 'https://angell1229-arch.github.io/curso-ingles/';
const NOTA_MINIMA = 80;
const INTERVALOS = [1, 2, 4, 7, 15, 30]; // días de espera al llegar a la caja 1..6
const TARJETAS_POR_SESION = 20;
const LS_KEY = 'cursoIngles.v1';

const TEMARIO = [
  { id: 1, etapa: 1, titulo: 'My daily life & work', subtitulo: 'Presente simple vs. continuo' },
  { id: 2, etapa: 1, titulo: 'Last weekend', subtitulo: 'Pasado simple' },
  { id: 3, etapa: 1, titulo: 'Telling stories', subtitulo: 'Pasado continuo + conectores' },
  { id: 4, etapa: 2, titulo: 'Have you ever…?', subtitulo: 'Present perfect' },
  { id: 5, etapa: 2, titulo: 'Life changes', subtitulo: 'Present perfect vs. past · for/since' },
  { id: 6, etapa: 2, titulo: 'Plans & predictions', subtitulo: 'Futuro: will / going to' },
  { id: 7, etapa: 3, titulo: 'Better or worse?', subtitulo: 'Comparativos y superlativos' },
  { id: 8, etapa: 3, titulo: 'Rules & advice', subtitulo: 'Verbos modales' },
  { id: 9, etapa: 3, titulo: 'Phrasal verbs en acción', subtitulo: 'Los 25 más frecuentes' },
  { id: 10, etapa: 4, titulo: 'What if…?', subtitulo: 'Condicionales 0, 1 y 2' },
  { id: 11, etapa: 4, titulo: 'It was made in…', subtitulo: 'Voz pasiva' },
  { id: 12, etapa: 4, titulo: 'He said that…', subtitulo: 'Estilo indirecto + examen final' },
];
const ETAPAS = { 1: 'Presente y pasado', 2: 'Experiencias y futuro', 3: 'Opinar, comparar y aconsejar', 4: 'Comunicación real' };
const TIPOS = { verbo: 'Verbo', palabra: 'Palabra', phrasal: 'Phrasal verb', combinacion: 'Combinación',
  completar: 'Completar', traducir: 'Traducir al inglés', corregir: 'Corregir el error', elegir: 'Elegir', orden: 'Ordenar', escritura: 'Escritura' };

const CLASES = window.CLASES || [];
const claseDatos = id => CLASES.find(c => c.id === id);
const claseMeta = id => TEMARIO.find(c => c.id === id);

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const fechaLocal = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hoy = () => fechaLocal();
function sumarDias(n) { const d = new Date(); d.setDate(d.getDate() + n); return fechaLocal(d); }
function normFecha(x) { if (!x) return ''; const s = String(x); return s.length > 10 ? fechaLocal(new Date(s)) : s; }
function barajar(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fechaCorta(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}
/* ---------- Voz en inglés (Web Speech) ---------- */
const HAY_VOZ = 'speechSynthesis' in window;
// Orden de preferencia: voces neuronales/premium primero; las voces "de efecto" del Mac quedan al final
const VOCES_BUENAS = [/natural/i, /neural/i, /premium/i, /enhanced|mejorad/i, /google us english/i,
  /\b(ava|zoe|evan|nathan|noelle|joelle|samantha|allison|susan|aaron|nicky)\b/i, /google uk english/i];
// voces "de efecto" y robóticas del Mac/iPhone (en inglés y con su nombre traducido al español): no se ofrecen
const VOCES_ROBOTICAS = /(fred|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|kathy|organ|ralph|superstar|trinoids|whisper|wobble|zarvox|grandma|grandpa|rocko|shelley|eddy|flo\b|reed|sandy|noticias|burbuja|campana|órgano|organo|susurr|superestrella|violonchel|bufón|histéric|trastornad|tambale|abuel)/i;
let VOCES = [];
function puntajeVoz(v) {
  let p = 0;
  VOCES_BUENAS.forEach((r, i) => { if (r.test(v.name)) p += (VOCES_BUENAS.length - i) * 10; });
  if (/en[-_]US/i.test(v.lang)) p += 5;
  if (VOCES_ROBOTICAS.test(v.name)) p -= 100;
  return p;
}
function cargarVoces() {
  if (!HAY_VOZ) return;
  const ingles = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang));
  const buenas = ingles.filter(v => !VOCES_ROBOTICAS.test(v.name));
  VOCES = (buenas.length ? buenas : ingles).sort((a, b) => puntajeVoz(b) - puntajeVoz(a));
  pintarSelectorVoz();
}
const vozElegida = () => VOCES.find(v => v.name === S.config.voz) || VOCES[0] || null;
let frasesVivas = []; // Safari descarta las frases que el recolector de basura libera antes de terminar
function hablar(t) {
  if (!HAY_VOZ) { alert('Este navegador no tiene voz. Prueba con Chrome o Safari actualizados.'); return; }
  if (!VOCES.length) cargarVoces();
  const v = vozElegida();
  frasesVivas = String(t).split('|').map(s => s.trim()).filter(Boolean).map(parte => {
    const u = new SpeechSynthesisUtterance(parte);
    u.lang = v ? v.lang : 'en-US'; if (v) u.voice = v;
    u.rate = Number(S.config.velocidad) || 0.95;
    return u;
  });
  const decir = () => { speechSynthesis.resume(); frasesVivas.forEach(u => speechSynthesis.speak(u)); };
  // Safari se traba si se cancela y habla en el mismo instante: solo cancelar si algo suena
  if (speechSynthesis.speaking || speechSynthesis.pending) { speechSynthesis.cancel(); setTimeout(decir, 120); } else decir();
}
if (HAY_VOZ) {
  cargarVoces();
  if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', cargarVoces);
  else speechSynthesis.onvoiceschanged = cargarVoces;
}
// "take – took – taken" → se dice en tres partes con pausa; "was / were" → "was or were"
const formasVoz = s => String(s).split(/\s+–\s+/).map(f => f.replace(/\s*\/\s*/g, ' or ')).join('|');
const voz = t => `<button class="voz" data-act="hablar" data-t="${esc(t)}" title="Escuchar">🔊</button>`;
function pintarSelectorVoz() {
  const sel = document.getElementById('cfg-voz'); if (!sel) return;
  const actual = vozElegida();
  sel.innerHTML = VOCES.length
    ? VOCES.map((v, i) => `<option value="${esc(v.name)}" ${actual && v.name === actual.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})${i === 0 ? ' ⭐ recomendada' : ''}</option>`).join('')
    : '<option>Cargando voces…</option>';
}
const colorPct = p => p >= 80 ? 'var(--c4)' : p >= 50 ? 'var(--c3)' : 'var(--c1)';

/* ---------- Estado (se guarda en este navegador y se sincroniza con Sheets) ---------- */
function estadoVacio() {
  return { config: { nombre: 'Angel', url: '', token: '' }, progreso: {}, intentos: [], vocab: {}, borradores: {}, pendientes: [], ultimaSync: null };
}
let S = (() => {
  try { const g = JSON.parse(localStorage.getItem(LS_KEY)); if (g) return Object.assign(estadoVacio(), g); } catch (e) { /* sin almacenamiento */ }
  return estadoVacio();
})();
function guardarLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento */ } }

const aprobada = id => S.progreso[id]?.estado === 'aprobada';
const desbloqueada = id => id === 1 || aprobada(id - 1);
const claseActual = () => TEMARIO.find(c => desbloqueada(c.id) && !aprobada(c.id)) || null;

/* ---------- Tarjetas de repaso (sistema Leitner) ---------- */
function itemsDeClase(c) {
  const out = [];
  c.verbos.forEach(v => out.push({ id: 'v:' + v.base, tipo: 'verbo', en: `${v.base} – ${v.pasado} – ${v.participio}`, es: v.es, ejemplo: v.ejemplo, verbo: v }));
  c.vocabulario.forEach(w => out.push({ id: 'w:' + w.en, tipo: 'palabra', en: w.en, es: w.es, ejemplo: w.ejemplo }));
  (c.combinaciones || []).forEach(w => out.push({ id: 'c:' + w.en, tipo: 'combinacion', en: w.en, es: w.es, ejemplo: '' }));
  c.phrasal.forEach(w => out.push({ id: 'p:' + w.en, tipo: 'phrasal', en: w.en, es: w.es, ejemplo: w.ejemplo }));
  return out;
}
const INDICE = {};
CLASES.forEach(c => itemsDeClase(c).forEach(it => { if (!INDICE[it.id]) INDICE[it.id] = { ...it, clase_id: c.id }; }));
const TOTAL_TARJETAS = Object.keys(INDICE).length;

const tarjetas = () => Object.values(S.vocab).filter(t => INDICE[t.id]);
const pendientesHoy = () => tarjetas().filter(t => normFecha(t.proxima_revision) <= hoy());

function asegurarTarjetas() {
  const nuevas = [];
  Object.values(INDICE).forEach(it => {
    if (S.vocab[it.id] || !desbloqueada(it.clase_id)) return;
    const t = { id: it.id, tipo: it.tipo, en: it.en, es: it.es, clase_id: it.clase_id, caja: 1, proxima_revision: hoy(),
      aciertos: 0, fallos: 0, ultima_revision: '', ultimo_error: '' };
    S.vocab[it.id] = t; nuevas.push(t);
  });
  if (nuevas.length) { guardarLocal(); enviarVocab(nuevas); }
}

/* ---------- Corrección de respuestas ---------- */
function normalizar(t) {
  let s = String(t || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”"]/g, '');
  s = s.replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not').replace(/'m\b/g, ' am').replace(/'re\b/g, ' are').replace(/'ve\b/g, ' have')
    .replace(/'ll\b/g, ' will').replace(/'d\b/g, ' would').replace(/'s\b/g, ' is');
  return s.replace(/[.,!?;:¡¿()]/g, ' ').replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}
function esCorrecta(resp, item) {
  const r = normalizar(resp);
  if (!r) return false;
  if (item.respuestas.some(a => normalizar(a) === r)) return true;
  // también vale escribir la oración (o un trozo de ella) con el espacio rellenado: "It's raining"
  if ((item.pregunta.match(/___/g) || []).length === 1) {
    const base = item.pregunta.replace(/\(.*?\)/g, '');
    if (item.respuestas.some(a => {
      const completa = ' ' + normalizar(base.replace('___', a)) + ' ';
      return completa.includes(' ' + r + ' ') && (' ' + r + ' ').includes(' ' + normalizar(a) + ' ');
    })) return true;
  }
  return false;
}
function formaOk(resp, forma) {
  const r = normalizar(resp);
  const ops = forma.split('/').map(normalizar);
  return !!r && (ops.includes(r) || r === ops.join(' '));
}
function distancia(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const contarPalabras = t => (String(t).match(/[A-Za-zÀ-ÿ']+/g) || []).length;
function usaPalabra(texto, w) {
  const t = ' ' + String(texto).toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const f = w.toLowerCase();
  if (f.includes(' ')) return t.includes(' ' + f + ' ');
  return new RegExp(`\\s${f}(s|es|ed|d|ing)?\\s`).test(t);
}
function evaluarEscritura(texto, min, obligatorias) {
  const palabras = contarPalabras(texto);
  const usadas = obligatorias.map(w => ({ w, ok: usaPalabra(texto, w) }));
  return { palabras, usadas, ok: palabras >= min && usadas.every(u => u.ok) };
}
const chipsEscritura = (ev, min) =>
  ev.usadas.map(u => `<span class="chip ${u.ok ? 'verde' : ''}">${u.ok ? '✓ ' : ''}${esc(u.w)}</span>`).join('') +
  `<span class="chip ${ev.palabras >= min ? 'verde' : 'amarillo'}">${ev.palabras} / ${min} palabras</span>`;

/* ---------- Registro de progreso ---------- */
function registrarIntento(d) {
  const i = { fecha: new Date().toISOString(), errores: [], escritura: '', ...d };
  S.intentos.push(i); guardarLocal();
  enviar('guardarIntento', { data: i });
}
function actualizarProgreso(id, puntaje, ok) {
  const p = S.progreso[id] || { estado: 'en curso', mejor_puntaje: 0, intentos: 0, fecha_aprobada: '' };
  p.intentos++; p.mejor_puntaje = Math.max(p.mejor_puntaje, puntaje);
  if (ok && p.estado !== 'aprobada') { p.estado = 'aprobada'; p.fecha_aprobada = new Date().toISOString(); }
  S.progreso[id] = p; guardarLocal();
}
function diasEstudiados() {
  const m = {};
  S.intentos.forEach(i => { const f = fechaLocal(new Date(i.fecha)); m[f] = (m[f] || 0) + 1; });
  return m;
}
function racha() {
  const dias = diasEstudiados(); let n = 0; const d = new Date();
  if (!dias[fechaLocal(d)]) d.setDate(d.getDate() - 1);
  while (dias[fechaLocal(d)]) { n++; d.setDate(d.getDate() - 1); }
  let rec = 0, cur = 0, prev = null;
  Object.keys(dias).sort().forEach(f => {
    const dt = new Date(f + 'T12:00');
    cur = prev && Math.round((dt - prev) / 864e5) === 1 ? cur + 1 : 1;
    rec = Math.max(rec, cur); prev = dt;
  });
  return { actual: n, record: Math.max(rec, n) };
}

/* ---------- Sincronización con Google Sheets ---------- */
let sincronizando = false, errorSync = null;
function enviar(action, datos) { S.pendientes.push({ action, ...datos }); guardarLocal(); sincronizar(); }
function enviarVocab(items) { if (S.config.url && items.length) enviar('guardarVocabulario', { items }); }
async function llamar(cuerpo) {
  const r = await fetch(S.config.url, { method: 'POST', body: JSON.stringify({ token: S.config.token, ...cuerpo }) });
  const j = await r.json();
  if (!j.ok) throw new Error(j.error || 'Error del servidor');
  return j;
}
async function sincronizar() {
  if (!S.config.url || sincronizando) { pintarSync(); return; }
  sincronizando = true; pintarSync();
  try {
    while (S.pendientes.length) { await llamar(S.pendientes[0]); S.pendientes.shift(); guardarLocal(); }
    S.ultimaSync = new Date().toISOString(); errorSync = null;
  } catch (e) { errorSync = e.message; }
  sincronizando = false; guardarLocal(); pintarSync();
}
async function cargarDesdeSheets() {
  const j = await llamar({ action: 'cargar' });
  (j.progreso || []).forEach(r => {
    const id = Number(r.clase_id); if (!id) return;
    const l = S.progreso[id] || {};
    S.progreso[id] = {
      estado: l.estado === 'aprobada' || r.estado === 'aprobada' ? 'aprobada' : 'en curso',
      mejor_puntaje: Math.max(Number(l.mejor_puntaje) || 0, Number(r.mejor_puntaje) || 0),
      intentos: Math.max(Number(l.intentos) || 0, Number(r.intentos) || 0),
      fecha_aprobada: l.fecha_aprobada || r.fecha_aprobada || '',
    };
  });
  (j.vocabulario || []).forEach(r => {
    if (!r.id) return;
    const l = S.vocab[r.id];
    if (!l || (Date.parse(r.ultima_revision) || 0) > (Date.parse(l.ultima_revision) || 0)) {
      S.vocab[r.id] = { ...r, clase_id: Number(r.clase_id), caja: Number(r.caja) || 1, aciertos: Number(r.aciertos) || 0,
        fallos: Number(r.fallos) || 0, proxima_revision: normFecha(r.proxima_revision) };
    }
  });
  const clave = i => new Date(i.fecha).toISOString().slice(0, 19) + '|' + i.tipo + '|' + i.clase_id;
  const vistos = new Set(S.intentos.map(clave));
  (j.intentos || []).forEach(r => {
    if (!r.fecha) return;
    const i = { fecha: r.fecha, clase_id: Number(r.clase_id), tipo: r.tipo, puntaje: Number(r.puntaje), correctas: Number(r.correctas),
      total: Number(r.total), aprobado: r.aprobado === 'SÍ', errores: String(r.errores || '').split(' | ').filter(Boolean), escritura: r.escritura || '' };
    if (!vistos.has(clave(i))) { S.intentos.push(i); vistos.add(clave(i)); }
  });
  S.intentos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  S.ultimaSync = new Date().toISOString();
  guardarLocal();
}
function pintarSync() {
  const el = $('#sync'); if (!el) return;
  const n = S.pendientes.length;
  if (!S.config.url) el.innerHTML = `<b class="off">○ Solo en este navegador</b>Conecta Google Sheets para no perder tu avance →`;
  else if (sincronizando) el.innerHTML = `<b>⟳ Sincronizando…</b>Google Sheets`;
  else if (errorSync) el.innerHTML = `<b class="err">⚠ Sin conexión</b>${n} cambio(s) pendientes · se reintentará`;
  else el.innerHTML = `<b class="ok">● Sincronizado</b>Google Sheets${S.ultimaSync ? ' · ' + fechaCorta(S.ultimaSync) : ''}`;
  const due = pendientesHoy().length;
  $('#badge').textContent = due ? due : '';
}

/* =====================================================================
   VISTAS
   ===================================================================== */

function vistaPanel() {
  const actual = claseActual(), due = pendientesHoy().length, r = racha(), ts = tarjetas();
  const aprendidas = ts.filter(t => t.caja >= 4).length;
  const vs = ts.filter(t => t.tipo === 'verbo');
  const ac = vs.reduce((s, t) => s + t.aciertos, 0), fa = vs.reduce((s, t) => s + t.fallos, 0);
  const prec = ac + fa ? Math.round(ac * 100 / (ac + fa)) : null;
  const nAprob = TEMARIO.filter(c => aprobada(c.id)).length;
  const nDias = Object.keys(diasEstudiados()).length;
  const cajas = [1, 2, 3, 4, 5, 6].map(n => ts.filter(t => Math.min(t.caja, 6) === n).length);
  const maxCaja = Math.max(1, ...cajas);
  const nombresCaja = ['Caja 1 · mañana', 'Caja 2 · 2 días', 'Caja 3 · 4 días', 'Caja 4 · 7 días', 'Caja 5 · 15 días', 'Dominada · 30 días'];
  const fallos = ts.filter(t => t.fallos > 0).sort((a, b) => b.fallos - a.fallos || a.aciertos - b.aciertos).slice(0, 6);

  const cta = due
    ? `<a class="btn grande" href="#/repaso">↻ Repasar ${due} tarjeta${due > 1 ? 's' : ''} (~${Math.max(1, Math.round(Math.min(due, TARJETAS_POR_SESION) / 3))} min)</a>`
    : actual ? `<a class="btn grande" href="#/clase/${actual.id}">Seguir con la clase ${actual.id} →</a>` : '';
  const sub = actual
    ? `Clase actual: ${actual.id} · ${esc(actual.titulo)}${claseDatos(actual.id) ? '' : ' (contenido en preparación)'}`
    : '¡Terminaste todas las clases!';

  const avisoConectar = S.config.url ? '' : `<div class="aviso azul" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="flex:1;min-width:220px">📲 <b>${esAppInstalada() ? 'Conecta esta app' : 'Conecta este dispositivo'}</b> a tu planilla para guardar tu avance.
    Copia el link en el curso ya conectado (⚙ Configuración → <i>Copiar link de vinculación</i>) y pégalo aquí.</span>
    <button class="btn" data-act="pegar-link">📋 Pegar link y conectar</button></div>`;
  return `${avisoConectar}
  <div class="head"><div><h1>Hola, ${esc(S.config.nombre || '')} 👋</h1><p>${sub}</p></div>${cta}</div>
  <div class="kpis">
    <div class="k"><div class="l">Racha</div><div class="v">${r.actual} <small>día${r.actual === 1 ? '' : 's'}</small></div><div class="d">Récord: ${r.record} día${r.record === 1 ? '' : 's'}</div></div>
    <div class="k"><div class="l">Palabras aprendidas <span title="Tarjetas en caja 4 o más: ya las recuerdas después de una semana">ⓘ</span></div><div class="v">${aprendidas} <small>/ ${TOTAL_TARJETAS}</small></div><div class="d">${ts.length} en tu mazo · ${due} para hoy</div></div>
    <div class="k"><div class="l">Precisión en verbos</div><div class="v">${prec ?? '—'}<small>${prec !== null ? '%' : ''}</small></div><div class="d" style="color:${prec === null ? 'var(--sub)' : colorPct(prec)}">${ac + fa ? `en ${ac + fa} respuestas` : 'Aún sin respuestas'}</div></div>
    <div class="k"><div class="l">Clases aprobadas</div><div class="v">${nAprob} <small>/ ${TEMARIO.length}</small></div><div class="d" style="color:var(--amarillo)">${actual && claseDatos(actual.id) ? `Prueba clase ${actual.id} disponible` : ''}</div></div>
  </div>
  <div class="grid2">
    <div class="card"><h3>Memoria — cajas de repetición espaciada <span>${ts.length} tarjetas</span></h3>
      ${ts.length ? `<div class="leit">${cajas.map((n, i) => `<div><b>${n}</b><i style="height:${Math.round(n / maxCaja * 72)}%;background:var(--c${i + 1})"></i><small>${nombresCaja[i]}</small></div>`).join('')}</div>`
        : `<div class="vacio">Abre la clase 1 para empezar a llenar tu mazo.</div>`}
    </div>
    <div class="card"><h3>Lo que más fallas <span>verbos y palabras</span></h3>
      ${fallos.length ? `<table><tr><th>Palabra</th><th>Tu respuesta</th><th>Correcto</th><th>Aciertos</th></tr>
        ${fallos.map(t => { const p = Math.round(t.aciertos * 100 / (t.aciertos + t.fallos)); return `<tr>
          <td>${esc(t.es)}</td><td class="mono bad">${esc(t.ultimo_error || '—')}</td><td class="mono ok">${esc(t.en)}</td>
          <td><span class="bar"><i style="width:${p}%;background:${colorPct(p)}"></i></span></td></tr>`; }).join('')}</table>`
        : `<div class="vacio">Aquí aparecerán los verbos y palabras que más se te olvidan.</div>`}
    </div>
    <div class="card"><h3>Constancia — últimas 18 semanas <span>${nDias} día${nDias === 1 ? '' : 's'} estudiado${nDias === 1 ? '' : 's'}</span></h3>
      <div class="heat">${heatmap()}</div></div>
    <div class="card"><h3>Avance por clase <span>mínimo ${NOTA_MINIMA}% para avanzar</span></h3>
      <div class="cls">${TEMARIO.map(c => {
        const p = S.progreso[c.id], ok = aprobada(c.id), lib = desbloqueada(c.id);
        const pct = p ? p.mejor_puntaje : 0;
        const estado = ok ? `${pct}% ✓` : !lib ? '🔒' : !claseDatos(c.id) ? 'pronto' : p ? `${pct}%` : 'en curso';
        return `<a class="c ${lib ? '' : 'lock'}" href="#/clase/${c.id}"><span class="t">${c.id} · ${esc(c.titulo)}</span>
          <span class="b"><i style="width:${pct}%;background:${ok ? 'var(--c4)' : 'var(--c3)'}"></i></span><span class="s">${estado}</span></a>`;
      }).join('')}</div></div>
  </div>`;
}
function heatmap() {
  const dias = diasEstudiados(), h = hoy(), d = new Date();
  d.setDate(d.getDate() - (d.getDay() + 6) % 7 - 17 * 7); // lunes de hace 17 semanas
  let html = '';
  for (let i = 0; i < 18 * 7; i++) {
    const f = fechaLocal(d), n = dias[f] || 0;
    const nivel = n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : 4;
    html += f > h ? '<i class="fut"></i>' : `<i class="h${nivel}" title="${f}: ${n} actividad${n === 1 ? '' : 'es'}"></i>`;
    d.setDate(d.getDate() + 1);
  }
  return html;
}

function vistaClases() {
  return `<div class="head"><div><h1>Clases</h1><p>4 etapas · 12 clases · aprueba la prueba con ${NOTA_MINIMA}% para desbloquear la siguiente</p></div></div>
  ${[1, 2, 3, 4].map(e => `<div class="etapa">Etapa ${e} — ${ETAPAS[e]}</div><div class="clases">
    ${TEMARIO.filter(c => c.etapa === e).map(c => {
      const lib = desbloqueada(c.id), datos = claseDatos(c.id), p = S.progreso[c.id];
      const chip = aprobada(c.id) ? `<span class="chip verde">Aprobada · ${p.mejor_puntaje}%</span>`
        : !lib ? '<span class="chip">🔒 Bloqueada</span>'
        : !datos ? '<span class="chip azul">Próximamente</span>'
        : p ? `<span class="chip amarillo">Mejor: ${p.mejor_puntaje}%</span>` : '<span class="chip amarillo">En curso</span>';
      const info = datos ? `${datos.verbos.length} verbos · ${datos.vocabulario.length} palabras` : '';
      return `<a class="clase ${lib ? '' : 'lock'}" href="#/clase/${c.id}"><div class="n">Clase ${c.id}</div><h4>${esc(c.titulo)}</h4>
        <p>${esc(c.subtitulo)}</p><div class="meta"><span>${info}</span>${chip}</div></a>`;
    }).join('')}</div>`).join('')}`;
}

/* ---------- Clase ---------- */
const PESTANAS = [['gramatica', 'Gramática'], ['verbos', 'Verbos'], ['vocabulario', 'Vocabulario'], ['phrasal', 'Phrasal verbs'], ['practica', 'Práctica'], ['escritura', 'Escritura']];
let PR = null; // estado de la práctica

function vistaClase(id, tab) {
  const meta = claseMeta(id);
  if (!meta) return vistaPanel();
  if (!desbloqueada(id)) return `<div class="head"><div><h1>🔒 Clase ${id} · ${esc(meta.titulo)}</h1>
    <p>Aprueba la prueba de la clase ${id - 1} con ${NOTA_MINIMA}% o más para desbloquearla.</p></div>
    <a class="btn" href="#/clase/${id - 1}">Ir a la clase ${id - 1}</a></div>`;
  const c = claseDatos(id);
  if (!c) return `<div class="head"><div><h1>Clase ${id} · ${esc(meta.titulo)}</h1><p>${esc(meta.subtitulo)}</p></div></div>
    <div class="aviso azul">El contenido de esta clase está en preparación. Pídele a Claude que cree la etapa ${meta.etapa} (archivo <span class="mono">datos/etapa${meta.etapa}.js</span>).</div>`;
  asegurarTarjetas();
  const p = S.progreso[id];
  const estado = aprobada(id) ? `<span class="chip verde">Aprobada · ${p.mejor_puntaje}%</span>` : p ? `<span class="chip amarillo">Mejor intento: ${p.mejor_puntaje}%</span>` : '';
  const cuerpo = { gramatica: tabGramatica, verbos: tabVerbos, vocabulario: tabVocabulario, phrasal: tabPhrasal, practica: tabPractica, escritura: tabEscritura }[tab] || tabGramatica;
  return `<div class="head"><div><p>Etapa ${c.etapa} · Clase ${c.id} ${estado}</p><h1>${esc(c.titulo)}</h1><p>${esc(c.subtitulo)} — ${esc(c.objetivo)}</p></div>
    <a class="btn grande" href="#/prueba/${id}">✎ Rendir prueba</a></div>
    <div class="tabs">${PESTANAS.map(([k, n]) => `<a href="#/clase/${id}/${k}" class="${k === tab ? 'on' : ''}">${n}</a>`).join('')}</div>
    ${cuerpo(c)}`;
}
function tabGramatica(c) {
  return `<div class="gram">${c.gramatica.map(g => `<div class="card"><h4>${esc(g.tema)}</h4><p>${esc(g.explicacion)}</p>
    <ul>${g.ejemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}
function tabVerbos(c) {
  return `<div class="aviso azul">💡 Actívate a ti mismo: pulsa <b>Ocultar formas</b>, di en voz alta el pasado y el participio, y luego haz clic para comprobar.</div>
  <div class="acciones" style="margin:0 0 12px"><button class="btn sec" data-act="ocultar">👁 Ocultar / mostrar formas</button>
    <button class="btn sec" data-act="repaso-verbos">⚡ Practicar verbos</button></div>
  <div class="card"><table id="tverbos"><tr><th>Base</th><th>Pasado</th><th>Participio</th><th>Español</th><th>Ejemplo</th></tr>
  ${c.verbos.map(v => `<tr><td><b>${esc(v.base)}</b>${voz(formasVoz(`${v.base} – ${v.pasado} – ${v.participio}`))}</td>
    <td class="f" data-act="ver"><span>${esc(v.pasado)}</span></td><td class="f" data-act="ver"><span>${esc(v.participio)}</span></td>
    <td>${esc(v.es)}</td><td class="ej">${esc(v.ejemplo)}${voz(v.ejemplo)}</td></tr>`).join('')}</table></div>`;
}
function tabVocabulario(c) {
  return `<div class="card"><table><tr><th>Inglés</th><th>Español</th><th>Ejemplo</th></tr>
  ${c.vocabulario.map(w => `<tr><td><b>${esc(w.en)}</b>${voz(w.en)}</td><td>${esc(w.es)}</td><td class="ej">${esc(w.ejemplo)}${voz(w.ejemplo)}</td></tr>`).join('')}</table></div>
  ${c.combinaciones?.length ? `<div class="card" style="margin-top:16px"><h3>Combinaciones útiles <span>apréndelas completas, no la palabra sola</span></h3>
    <table>${c.combinaciones.map(w => `<tr><td><b>${esc(w.en)}</b>${voz(w.en)}</td><td>${esc(w.es)}</td></tr>`).join('')}</table></div>` : ''}`;
}
function tabPhrasal(c) {
  return `<div class="card"><table><tr><th>Phrasal verb</th><th>Significado</th><th>Ejemplo</th></tr>
  ${c.phrasal.map(w => `<tr><td><b>${esc(w.en)}</b>${voz(w.en)}</td><td>${esc(w.es)}</td><td class="ej">${esc(w.ejemplo)}${voz(w.ejemplo)}</td></tr>`).join('')}</table></div>`;
}
function campoRespuesta(it, valor, attrs, bloqueado) {
  if (it.opciones) return `<div class="ops">${it.opciones.map(o => `<button class="op ${valor === o ? 'sel' : ''}" ${attrs} data-act="opcion" data-v="${esc(o)}" ${bloqueado ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
  return `<input class="txt" ${attrs} value="${esc(valor)}" autocomplete="off" autocapitalize="off" spellcheck="false" ${bloqueado ? 'disabled' : ''} placeholder="Escribe tu respuesta…">`;
}
function tabPractica(c) {
  if (!PR || PR.claseId !== c.id) PR = { claseId: c.id, resp: {}, revisado: false };
  const items = c.practica;
  const correctas = PR.revisado ? items.filter((it, i) => esCorrecta(PR.resp[i], it)).length : 0;
  return `<div class="aviso">Escribe solo lo que falta (o la oración completa). Las contracciones valen igual: <i>don't = do not</i>.</div>
  <div class="ejer">${items.map((it, i) => {
    const r = PR.resp[i] || '', ok = PR.revisado ? esCorrecta(r, it) : null;
    return `<div class="item ${ok === true ? 'bien' : ok === false ? 'mal' : ''}"><div class="nn">${i + 1}</div><div>
      <div class="tipo">${TIPOS[it.tipo] || it.tipo}</div><div class="q">${esc(it.pregunta)}</div>
      ${campoRespuesta(it, r, `data-campo="practica" data-i="${i}"`, PR.revisado)}
      ${PR.revisado ? `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correcto' : `✗ Respuesta: <b>${esc(it.respuestas[0])}</b>`}</div>` : ''}
    </div></div>`;
  }).join('')}</div>
  <div class="acciones">${PR.revisado
    ? `<span class="num" style="font-size:22px;font-weight:700;color:${colorPct(correctas * 100 / items.length)}">${correctas} / ${items.length}</span>
       <button class="btn sec" data-act="practica-reiniciar">↺ Intentar de nuevo</button>
       ${correctas * 100 / items.length >= NOTA_MINIMA ? `<a class="btn" href="#/prueba/${c.id}">¡Bien! Rendir la prueba →</a>` : ''}`
    : `<button class="btn" data-act="practica-revisar">Revisar respuestas</button>`}</div>`;
}
function tabEscritura(c) {
  const e = c.escritura, texto = S.borradores[c.id] || '', ev = evaluarEscritura(texto, e.minPalabras, e.obligatorias);
  return `<div class="card"><h3>${esc(e.consigna)}</h3>
    <p style="color:var(--sub);margin-bottom:10px">Mínimo <b>${e.minPalabras} palabras</b>. Usa estas palabras (pueden llevar -s, -ed, -ing):</p>
    <textarea class="txt" data-campo="escritura" data-min="${e.minPalabras}" data-oblig="${esc(JSON.stringify(e.obligatorias))}" placeholder="Start writing here…">${esc(texto)}</textarea>
    <div class="chips" id="chips-esc">${chipsEscritura(ev, e.minPalabras)}</div>
    <div class="acciones"><button class="btn" data-act="guardar-escrito" data-id="${c.id}">💾 Guardar en mis escritos</button>
      <button class="link" data-act="ver-modelo">Ver texto modelo</button></div>
    <div id="modelo" style="display:none;margin-top:14px" class="aviso azul"><b>Texto modelo:</b><br>${esc(e.modelo)} ${voz(e.modelo)}</div>
  </div>`;
}

/* ---------- Prueba escrita ---------- */
let P = null;
function vistaPrueba(id) {
  const c = claseDatos(id);
  if (!c || !desbloqueada(id)) return vistaClase(id, 'gramatica');
  if (!P || P.claseId !== id) P = { claseId: id, i: 0, resp: [], fin: null };
  if (P.fin) return vistaResultado(c);
  const it = c.prueba[P.i], total = c.prueba.length, r = P.resp[P.i] || '';
  let campo;
  if (it.tipo === 'escritura') {
    const ev = evaluarEscritura(r, it.minPalabras, it.obligatorias);
    campo = `<textarea class="txt" data-campo="prueba" data-min="${it.minPalabras}" data-oblig="${esc(JSON.stringify(it.obligatorias))}" placeholder="Start writing here…">${esc(r)}</textarea>
      <div class="chips" id="chips-esc">${chipsEscritura(ev, it.minPalabras)}</div>`;
  } else campo = campoRespuesta(it, r, 'data-campo="prueba"', false);
  const ayuda = { verbo: 'Escribe solo la forma pedida.', completar: 'Escribe solo lo que falta (o la oración completa).',
    traducir: 'Traduce la oración completa al inglés.', corregir: 'Escribe la oración corregida completa.',
    escritura: 'Debes cumplir el mínimo de palabras y usar todas las palabras indicadas.' }[it.tipo] || '';
  return `<div class="head"><div><p>Clase ${c.id} · ${esc(c.titulo)}</p><h1>Prueba escrita</h1></div>
    <a class="btn sec" href="#/clase/${c.id}">✕ Salir</a></div>
  <div class="segs">${c.prueba.map((_, k) => `<i class="${k === P.i ? 'a' : P.resp[k] ? 'r' : ''}"></i>`).join('')}</div>
  <div class="pq"><div class="tipo">Pregunta ${P.i + 1} de ${total} · ${TIPOS[it.tipo] || it.tipo}</div>
    <div class="enun">${esc(it.pregunta)}</div>${campo}
    <p style="color:var(--sub);font-size:13px;margin-top:8px">${ayuda} No verás la corrección hasta entregar.</p>
    <div class="acciones">
      <button class="btn sec" data-act="prueba-ant" ${P.i === 0 ? 'disabled' : ''}>← Anterior</button>
      ${P.i < total - 1 ? `<button class="btn" data-act="prueba-sig">Siguiente →</button>`
        : `<button class="btn" data-act="prueba-entregar">Entregar prueba ✓</button>`}
      <span style="color:var(--sub);font-size:13px">${P.resp.filter(Boolean).length} de ${total} respondidas</span>
    </div></div>`;
}
function entregarPrueba() {
  const c = claseDatos(P.claseId);
  const sinResp = c.prueba.length - c.prueba.filter((_, i) => (P.resp[i] || '').trim()).length;
  if (sinResp && !confirm(`Tienes ${sinResp} pregunta(s) sin responder. ¿Entregar igual?`)) return;
  const detalle = c.prueba.map((it, i) => {
    const r = P.resp[i] || '';
    if (it.tipo === 'escritura') { const ev = evaluarEscritura(r, it.minPalabras, it.obligatorias); return { it, r, ok: ev.ok, ev }; }
    return { it, r, ok: esCorrecta(r, it) };
  });
  const correctas = detalle.filter(d => d.ok).length;
  const puntaje = Math.round(correctas * 100 / detalle.length), ok = puntaje >= NOTA_MINIMA;
  actualizarProgreso(c.id, puntaje, ok);
  registrarIntento({
    clase_id: c.id, titulo: c.titulo, tipo: 'prueba', puntaje, correctas, total: detalle.length, aprobado: ok,
    errores: detalle.filter(d => !d.ok).map(d => d.it.tipo === 'escritura'
      ? `Escritura: ${d.ev.palabras}/${d.it.minPalabras} palabras, faltó: ${d.ev.usadas.filter(u => !u.ok).map(u => u.w).join(', ') || '—'}`
      : `${d.it.pregunta} → "${d.r || '(vacío)'}" (correcto: ${d.it.respuestas[0]})`),
    escritura: detalle.find(d => d.it.tipo === 'escritura')?.r || '',
  });
  if (ok) asegurarTarjetas();
  P.fin = { detalle, correctas, puntaje, ok };
  render(); scrollTo(0, 0);
}
function vistaResultado(c) {
  const f = P.fin, sig = claseMeta(c.id + 1);
  return `<div class="head"><div><p>Clase ${c.id} · ${esc(c.titulo)} · Prueba escrita</p><h1>${f.ok ? '¡Aprobaste! 🎉' : 'Todavía no — ¡casi!'}</h1>
    <p>${f.ok ? (sig ? `Se desbloqueó la clase ${sig.id}: ${esc(sig.titulo)}. Sus verbos y palabras ya están en tu repaso.` : 'Completaste el curso.')
      : `Necesitas ${NOTA_MINIMA}%. Repasa los errores de abajo, practica y vuelve a intentarlo.`}</p></div>
    <div class="nota" style="color:${colorPct(f.puntaje)}">${f.puntaje}%</div></div>
  <div class="acciones" style="margin:0 0 18px">
    ${f.ok && sig ? `<a class="btn grande" href="#/clase/${sig.id}">Ir a la clase ${sig.id} →</a>` : ''}
    ${!f.ok ? `<button class="btn grande" data-act="prueba-reintentar">↺ Intentar de nuevo</button><a class="btn sec" href="#/clase/${c.id}/practica">Volver a practicar</a>` : ''}
    <a class="btn sec" href="#/panel">Ir al panel</a></div>
  <div class="card"><h3>Corrección <span>${f.correctas} de ${f.detalle.length} correctas</span></h3>
    <div class="ejer">${f.detalle.map((d, i) => `<div class="item ${d.ok ? 'bien' : 'mal'}"><div class="nn">${i + 1}</div><div>
      <div class="tipo">${TIPOS[d.it.tipo] || d.it.tipo}</div><div class="q">${esc(d.it.pregunta)}</div>
      ${d.it.tipo === 'escritura'
        ? `<div class="escrito">${esc(d.r) || '<i>(vacío)</i>'}</div><div class="chips">${chipsEscritura(d.ev, d.it.minPalabras)}</div>`
        : `<div>Tu respuesta: <span class="mono ${d.ok ? 'ok' : 'bad'}">${esc(d.r) || '(vacío)'}</span></div>
           ${d.ok ? '' : `<div class="fb">Correcto: <b class="mono ok">${esc(d.it.respuestas[0])}</b>${voz(d.it.respuestas[0])}</div>`}`}
    </div></div>`).join('')}</div></div>`;
}

/* ---------- Repaso con repetición espaciada ---------- */
let R = null;
function iniciarRepaso(modo) {
  asegurarTarjetas();
  const ids = modo === 'verbos'
    ? barajar(tarjetas().filter(t => t.tipo === 'verbo')).slice(0, TARJETAS_POR_SESION).map(t => t.id)
    : barajar(pendientesHoy()).sort((a, b) => a.caja - b.caja).slice(0, TARJETAS_POR_SESION).map(t => t.id);
  R = { cola: ids, pos: 0, modo, res: null, primeros: {}, reencolados: new Set(), snap: null, fin: null };
  if (location.hash !== '#/repaso') location.hash = '#/repaso'; else render();
}
function vistaRepaso() {
  if (!R || R.fin) {
    asegurarTarjetas();
    const due = pendientesHoy().length, fin = R?.fin;
    return `<div class="head"><div><h1>Repaso</h1><p>Repetición espaciada: cada tarjeta vuelve justo antes de que la olvides.</p></div></div>
    ${fin ? `<div class="card" style="margin-bottom:16px"><h3>Sesión terminada <span>${fin.ok} de ${fin.total} a la primera</span></h3>
      <div class="nota" style="color:${colorPct(fin.total ? fin.ok * 100 / fin.total : 0)}">${fin.total ? Math.round(fin.ok * 100 / fin.total) : 0}%</div>
      ${fin.errores.length ? `<p style="margin-top:10px;color:var(--sub)">Estas vuelven mañana:</p><div class="chips">${fin.errores.map(e => `<span class="chip rojo">${esc(e)}</span>`).join('')}</div>` : ''}</div>` : ''}
    <div class="card"><h3>${due ? `Tienes ${due} tarjeta${due > 1 ? 's' : ''} para hoy` : 'Nada pendiente por hoy ✓'}</h3>
      <p style="color:var(--sub)">${due ? `Sesiones de hasta ${TARJETAS_POR_SESION} tarjetas. Primero las más difíciles.` : 'Vuelve mañana o sigue avanzando con tu clase. Si quieres, practica verbos igual.'}</p>
      <div class="acciones">${due ? `<button class="btn grande" data-act="repaso-iniciar">↻ Empezar repaso</button>` : ''}
        <button class="btn sec" data-act="repaso-verbos">⚡ Practicar verbos al azar</button></div></div>`;
  }
  const id = R.cola[R.pos], t = S.vocab[id], info = INDICE[id], res = R.res;
  let campos;
  if (t.tipo === 'verbo') {
    const nombres = ['Base', 'Pasado', 'Participio'], formas = [info.verbo.base, info.verbo.pasado, info.verbo.participio];
    campos = `<div class="tres">${nombres.map((n, k) => {
      const v = res ? res.campos[k] : '', clase = res ? (formaOk(v, formas[k]) ? 'bien' : 'mal') : '';
      return `<div><label>${n}</label><input class="txt ${clase}" data-campo="tarjeta" value="${esc(v)}" ${res ? 'disabled' : ''} autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    }).join('')}</div>`;
  } else {
    campos = `<input class="txt ${res ? (res.ok ? 'bien' : 'mal') : ''}" data-campo="tarjeta" value="${esc(res ? res.campos[0] : '')}" ${res ? 'disabled' : ''} placeholder="Escribe en inglés…" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  }
  const etiqueta = t.tipo === 'verbo' ? 'Verbo · escribe las 3 formas' : `${TIPOS[t.tipo]} · escríbelo en inglés`;
  return `<div class="tarjeta">
    <div class="prog"><span>${R.modo === 'verbos' ? 'Práctica de verbos' : 'Repaso de hoy'}</span><span>${Math.min(R.pos + 1, R.cola.length)} / ${R.cola.length}</span></div>
    <div class="pbar"><i style="width:${R.pos / R.cola.length * 100}%"></i></div>
    <div class="flash"><span class="caja chip">Caja ${Math.min(t.caja, 6)}</span><div class="etq">${etiqueta}</div>
      <div class="w">${esc(t.es)}</div>${campos}
      ${res ? `<div class="resultado ${res.ok ? 'bien' : 'mal'}">
          ${res.ok ? '✓ ¡Correcto!' : res.casi ? '✗ ¡Casi! Revisa la ortografía:' : '✗ La respuesta es:'} <b class="mono">${esc(t.en)}</b>${voz(formasVoz(t.en))}
          ${info.ejemplo ? `<div class="ej">${esc(info.ejemplo)}${voz(info.ejemplo)}</div>` : ''}</div>
        <div class="acciones"><button class="btn grande" data-act="tarjeta-sig" id="btn-sig">Siguiente → <small style="opacity:.7">(Enter)</small></button>
          ${!res.ok && !res.noSe ? `<button class="link" data-act="tarjeta-tenia-razon">Tenía razón (fue un error de tipeo)</button>` : ''}</div>`
        : `<div class="acciones"><button class="btn grande" data-act="tarjeta-comprobar">Comprobar <small style="opacity:.7">(Enter)</small></button>
          <button class="btn sec" data-act="tarjeta-nose">No sé</button></div>`}
    </div></div>`;
}
function comprobarTarjeta(noSe) {
  const id = R.cola[R.pos], t = S.vocab[id], info = INDICE[id];
  const campos = $$('[data-campo="tarjeta"]').map(i => i.value);
  let ok, casi = false, error;
  if (t.tipo === 'verbo') {
    const formas = [info.verbo.base, info.verbo.pasado, info.verbo.participio];
    ok = !noSe && formas.every((f, k) => formaOk(campos[k], f));
    error = campos.map(c => c.trim() || '—').join(' – ');
  } else {
    const a = normalizar(campos[0]), b = normalizar(t.en);
    ok = !noSe && a === b;
    casi = !ok && !noSe && a.length > 2 && distancia(a, b) <= 2;
    error = campos[0].trim() || '—';
  }
  R.res = { ok, casi, campos, noSe };
  calificar(id, ok, noSe ? '(no sé)' : error);
  render();
}
function calificar(id, ok, error) {
  if (id in R.primeros) return; // solo cuenta el primer intento de cada tarjeta en la sesión
  const t = S.vocab[id];
  R.snap = { ...t };
  R.primeros[id] = { ok, error };
  const tocaHoy = normFecha(t.proxima_revision) <= hoy();
  t.ultima_revision = new Date().toISOString();
  if (ok) {
    t.aciertos++;
    if (tocaHoy) { t.caja = Math.min(t.caja + 1, 6); t.proxima_revision = sumarDias(INTERVALOS[t.caja - 1]); }
  } else {
    t.fallos++; t.caja = 1; t.proxima_revision = sumarDias(1); t.ultimo_error = error;
    if (!R.reencolados.has(id)) { R.reencolados.add(id); R.cola.push(id); }
  }
  guardarLocal();
}
function teniaRazon() {
  const id = R.cola[R.pos];
  S.vocab[id] = R.snap; delete R.primeros[id];
  if (R.reencolados.delete(id)) R.cola.splice(R.cola.lastIndexOf(id), 1);
  R.res.ok = true; R.res.casi = false;
  calificar(id, true, '');
  render();
}
function siguienteTarjeta() {
  R.pos++; R.res = null;
  if (R.pos >= R.cola.length) {
    const ids = Object.keys(R.primeros), ok = ids.filter(i => R.primeros[i].ok).length;
    const errores = ids.filter(i => !R.primeros[i].ok).map(i => S.vocab[i].en);
    registrarIntento({ clase_id: 0, titulo: R.modo === 'verbos' ? 'Práctica de verbos' : 'Repaso', tipo: 'repaso',
      puntaje: ids.length ? Math.round(ok * 100 / ids.length) : 0, correctas: ok, total: ids.length,
      aprobado: ids.length ? ok * 100 / ids.length >= NOTA_MINIMA : false,
      errores: ids.filter(i => !R.primeros[i].ok).map(i => `${S.vocab[i].en}: ${R.primeros[i].error}`) });
    enviarVocab(ids.map(i => S.vocab[i]));
    R.fin = { ok, total: ids.length, errores };
  }
  render();
}

/* ---------- Otras páginas ---------- */
function vistaVerbos() {
  asegurarTarjetas();
  const filas = Object.values(INDICE).filter(it => it.tipo === 'verbo');
  return `<div class="head"><div><h1>Verbos</h1><p>${filas.length} verbos en el curso hasta ahora · los de clases bloqueadas aparecen atenuados</p></div>
    <button class="btn" data-act="repaso-verbos">⚡ Practicar 20 al azar</button></div>
  <div class="acciones" style="margin:0 0 12px"><input class="txt" id="buscar" placeholder="Buscar verbo en inglés o español…" style="max-width:340px">
    <button class="btn sec" data-act="ocultar">👁 Ocultar / mostrar formas</button></div>
  <div class="card"><table id="tverbos"><tr><th>Base</th><th>Pasado</th><th>Participio</th><th>Español</th><th>Clase</th><th>Caja</th><th>Aciertos</th></tr>
  ${filas.map(it => {
    const v = it.verbo, t = S.vocab[it.id], lib = desbloqueada(it.clase_id), tot = t ? t.aciertos + t.fallos : 0;
    return `<tr data-buscar="${esc((v.base + ' ' + v.pasado + ' ' + v.participio + ' ' + v.es).toLowerCase())}" style="${lib ? '' : 'opacity:.4'}">
      <td><b>${esc(v.base)}</b>${voz(formasVoz(`${v.base} – ${v.pasado} – ${v.participio}`))}</td>
      <td class="f mono" data-act="ver"><span>${esc(v.pasado)}</span></td><td class="f mono" data-act="ver"><span>${esc(v.participio)}</span></td>
      <td>${esc(v.es)}</td><td>${it.clase_id}</td><td>${t ? `<span class="chip">${Math.min(t.caja, 6)}</span>` : '🔒'}</td>
      <td>${tot ? `<span class="bar"><i style="width:${t.aciertos * 100 / tot}%;background:${colorPct(t.aciertos * 100 / tot)}"></i></span> <span class="mono" style="color:var(--sub)">${t.aciertos}/${tot}</span>` : '—'}</td></tr>`;
  }).join('')}</table></div>`;
}
function vistaPruebas() {
  const ps = S.intentos.filter(i => i.tipo === 'prueba').slice().reverse();
  return `<div class="head"><div><h1>Pruebas</h1><p>Historial de todas tus pruebas escritas</p></div></div>
  <div class="card">${ps.length ? `<table><tr><th>Fecha</th><th>Clase</th><th>Puntaje</th><th>Resultado</th><th>Errores</th></tr>
    ${ps.map(i => `<tr><td>${fechaCorta(i.fecha)}</td><td>${i.clase_id} · ${esc(claseMeta(i.clase_id)?.titulo || '')}</td>
      <td class="num" style="font-weight:700;color:${colorPct(i.puntaje)}">${i.puntaje}%</td>
      <td>${i.aprobado ? '<span class="chip verde">Aprobada</span>' : '<span class="chip rojo">No aprobada</span>'}</td>
      <td style="font-size:12.5px;color:var(--sub)">${i.errores.length ? i.errores.map(esc).join('<br>') : '—'}</td></tr>`).join('')}</table>`
    : '<div class="vacio">Aún no has rendido pruebas.</div>'}</div>`;
}
function vistaEscritos() {
  const es = S.intentos.filter(i => i.escritura).slice().reverse();
  return `<div class="head"><div><h1>Mis escritos</h1><p>Todo lo que has escrito en inglés. Relee tus textos antiguos: verás cuánto has avanzado.</p></div></div>
  ${es.length ? es.map(i => `<div class="card" style="margin-bottom:14px"><h3>Clase ${i.clase_id} · ${esc(claseMeta(i.clase_id)?.titulo || '')}
    <span>${i.tipo === 'prueba' ? 'Prueba' : 'Escritura'} · ${fechaCorta(i.fecha)} · ${contarPalabras(i.escritura)} palabras</span></h3>
    <div class="escrito">${esc(i.escritura)}</div></div>`).join('')
    : '<div class="card"><div class="vacio">Todavía no hay escritos. Ve a la pestaña <b>Escritura</b> de tu clase.</div></div>'}`;
}
function vistaConfig() {
  return `<div class="head"><div><h1>Configuración</h1><p>Conexión con Google Sheets y respaldo</p></div></div>
  <div class="cfg">
    <div class="card cfg">
      <label>Tu nombre<input class="txt" id="cfg-nombre" value="${esc(S.config.nombre)}"></label>
      <label>URL de la aplicación web de Apps Script<small>Termina en <span class="mono">/exec</span>. Ver <span class="mono">06_Google_Sheets/Instrucciones_conexion.md</span></small>
        <input class="txt mono" id="cfg-url" value="${esc(S.config.url)}" placeholder="https://script.google.com/macros/s/…/exec"></label>
      <label>Clave (TOKEN)<small>La misma que pusiste en Code.gs</small><input class="txt mono" id="cfg-token" type="password" value="${esc(S.config.token)}"></label>
      <div class="acciones"><button class="btn" data-act="cfg-guardar">Guardar y probar conexión</button><span id="cfg-msg"></span></div>
    </div>
    <div class="card cfg"><h3>🔊 Voz en inglés</h3>
      <label>Voz<small>La ⭐ es la más natural que encontré en este dispositivo. Cada celular y computador tiene voces distintas.</small>
        <select class="txt" id="cfg-voz"></select></label>
      <label>Velocidad<select class="txt" id="cfg-velocidad">
        ${[['1', 'Normal'], ['0.95', 'Un poco más lenta (recomendada)'], ['0.8', 'Lenta'], ['0.65', 'Muy lenta']].map(([v, n]) =>
          `<option value="${v}" ${String(S.config.velocidad || '0.95') === v ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <div class="acciones" style="margin-top:0"><button class="btn sec" data-act="hablar" data-t="I usually take a break at eleven.|take|took|taken">▶ Probar voz</button></div>
      <p style="color:var(--sub);font-size:13px">💡 <b>¿Suena robótica?</b> Descarga una voz mejor y aparecerá aquí:<br>
        <b>iPhone:</b> Ajustes → Accesibilidad → Contenido leído → Voces → Inglés (EE. UU.) → <i>Ava</i> o <i>Zoe</i> (Premium/Mejorada).<br>
        <b>Mac:</b> Ajustes del Sistema → Accesibilidad → Contenido leído → Voz del sistema → Gestionar voces → <i>Ava (Premium)</i>.<br>
        <b>iPhone en silencio:</b> si el interruptor lateral está en silencio, Safari no habla.</p></div>
    ${S.config.url ? `<div class="card"><h3>📱 Vincular el celular u otro dispositivo</h3>
      <p style="color:var(--sub)">Escanea este código con la cámara del celular: se abre el curso ya conectado a tu planilla, sin escribir nada.
        <br><b>iPhone, app anclada al inicio:</b> no comparte datos con Safari. En Safari (ya conectado) toca <i>Copiar link de vinculación</i>, abre la app anclada y toca <i>📋 Pegar link y conectar</i>.</p>
      <div class="acciones"><button class="btn" data-act="qr">Mostrar código QR</button><button class="btn sec" data-act="copiar-link">Copiar link de vinculación</button></div>
      <div id="qr" style="margin-top:16px"></div>
      <p style="color:var(--rojo);font-size:12.5px;margin-top:10px">🔒 El QR y el link contienen tu clave: úsalos solo en tus dispositivos y no los compartas.</p></div>` : ''}
    <div class="card"><h3>Respaldo <span>${S.pendientes.length} cambio(s) sin sincronizar</span></h3>
      <div class="acciones" style="margin-top:0"><button class="btn sec" data-act="sync-ahora">⟳ Sincronizar ahora</button>
      <button class="btn sec" data-act="respaldo">⬇ Descargar respaldo</button>
      <label class="btn sec">⬆ Importar respaldo<input type="file" id="importar" accept=".json" hidden></label>
      <button class="btn peligro" data-act="borrar">Borrar progreso de este navegador</button></div></div>
  </div>`;
}

/* =====================================================================
   ENRUTADOR Y EVENTOS
   ===================================================================== */
function render() {
  const [ruta = 'panel', a, b] = location.hash.replace(/^#\/?/, '').split('/');
  $$('.links a').forEach(l => l.classList.toggle('on', l.dataset.ruta === (ruta === 'clase' || ruta === 'prueba' ? 'clases' : ruta)));
  const vistas = {
    panel: vistaPanel, clases: vistaClases, clase: () => vistaClase(+a, b || 'gramatica'), prueba: () => vistaPrueba(+a),
    repaso: vistaRepaso, verbos: vistaVerbos, pruebas: vistaPruebas, escritos: vistaEscritos, config: vistaConfig,
  };
  $('#main').innerHTML = (vistas[ruta] || vistaPanel)();
  pintarSelectorVoz();
  pintarSync();
  // foco automático
  const sig = $('#btn-sig');
  if (sig) sig.focus();
  else { const f = $('[data-campo="tarjeta"]:not([disabled]), [data-campo="prueba"]'); if (f) f.focus(); }
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case 'hablar': hablar(el.dataset.t); break;
    case 'ocultar': $('#tverbos')?.classList.toggle('oculto'); break;
    case 'ver': el.classList.toggle('ver'); break;
    case 'opcion':
      if (el.dataset.campo === 'practica') PR.resp[el.dataset.i] = el.dataset.v;
      else if (el.dataset.campo === 'prueba') P.resp[P.i] = el.dataset.v;
      render(); break;
    case 'practica-revisar': {
      PR.revisado = true; render();
      const c = claseDatos(PR.claseId), ok = c.practica.filter((it, i) => esCorrecta(PR.resp[i], it)).length;
      registrarIntento({ clase_id: c.id, titulo: c.titulo, tipo: 'practica', puntaje: Math.round(ok * 100 / c.practica.length), correctas: ok,
        total: c.practica.length, aprobado: ok * 100 / c.practica.length >= NOTA_MINIMA,
        errores: c.practica.filter((it, i) => !esCorrecta(PR.resp[i], it)).map(it => `${it.pregunta} → ${it.respuestas[0]}`) });
      break;
    }
    case 'practica-reiniciar': PR = null; render(); break;
    case 'ver-modelo': { const m = $('#modelo'); m.style.display = m.style.display === 'none' ? 'block' : 'none'; break; }
    case 'guardar-escrito': {
      const c = claseDatos(+el.dataset.id), texto = S.borradores[c.id] || '';
      if (contarPalabras(texto) < 5) { alert('Escribe un poco más antes de guardar 🙂'); break; }
      const ev = evaluarEscritura(texto, c.escritura.minPalabras, c.escritura.obligatorias);
      registrarIntento({ clase_id: c.id, titulo: c.titulo, tipo: 'escritura', puntaje: ev.ok ? 100 : 0, correctas: ev.usadas.filter(u => u.ok).length,
        total: ev.usadas.length, aprobado: ev.ok, errores: ev.usadas.filter(u => !u.ok).map(u => 'Faltó usar: ' + u.w), escritura: texto });
      el.textContent = '✓ Guardado'; el.disabled = true;
      break;
    }
    case 'prueba-ant': P.i--; render(); break;
    case 'prueba-sig': P.i++; render(); break;
    case 'prueba-entregar': entregarPrueba(); break;
    case 'prueba-reintentar': P = null; render(); break;
    case 'repaso-iniciar': iniciarRepaso('hoy'); break;
    case 'repaso-verbos': iniciarRepaso('verbos'); break;
    case 'tarjeta-comprobar': comprobarTarjeta(false); break;
    case 'tarjeta-nose': comprobarTarjeta(true); break;
    case 'tarjeta-sig': siguienteTarjeta(); break;
    case 'tarjeta-tenia-razon': teniaRazon(); break;
    case 'cfg-guardar': guardarConfig(); break;
    case 'sync-ahora': sincronizar().then(render); break;
    case 'qr': {
      const caja = $('#qr'); caja.innerHTML = '';
      if (!window.QRCode) { caja.textContent = 'No se pudo cargar el generador de QR (¿sin internet?). Usa "Copiar link".'; break; }
      new QRCode(caja, { text: linkVinculacion(), width: 220, height: 220, correctLevel: QRCode.CorrectLevel.M });
      break;
    }
    case 'pegar-link': {
      const pedirTexto = () => prompt('Pega aquí tu link de vinculación:') || '';
      (navigator.clipboard?.readText ? navigator.clipboard.readText().catch(pedirTexto) : Promise.resolve(pedirTexto()))
        .then(t => { if (!/conectar=/.test(t)) t = pedirTexto(); if (t) conectarConLink(t); });
      break;
    }
    case 'copiar-link':
      navigator.clipboard.writeText(linkVinculacion()).then(() => { el.textContent = '✓ Link copiado'; }, () => prompt('Copia este link:', linkVinculacion()));
      break;
    case 'respaldo': {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
      a.download = `respaldo-curso-ingles-${hoy()}.json`; a.click();
      break;
    }
    case 'borrar':
      if (confirm('¿Borrar todo el progreso guardado en este navegador? (Lo que esté en Google Sheets no se borra)')) {
        const config = S.config; S = estadoVacio(); S.config = config; guardarLocal(); location.hash = '#/panel'; render();
      }
      break;
  }
});

document.addEventListener('input', e => {
  const el = e.target, campo = el.dataset.campo;
  if (campo === 'practica') PR.resp[el.dataset.i] = el.value;
  else if (campo === 'prueba') P.resp[P.i] = el.value;
  else if (campo === 'escritura') { const id = +location.hash.split('/')[2]; S.borradores[id] = el.value; guardarLocal(); }
  else if (el.id === 'buscar') {
    const q = el.value.trim().toLowerCase();
    $$('#tverbos tr[data-buscar]').forEach(tr => { tr.style.display = tr.dataset.buscar.includes(q) ? '' : 'none'; });
  }
  if (el.dataset.oblig) { // contador de palabras en vivo
    const ev = evaluarEscritura(el.value, +el.dataset.min, JSON.parse(el.dataset.oblig));
    $('#chips-esc').innerHTML = chipsEscritura(ev, +el.dataset.min);
  }
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return;
  const campo = e.target.dataset.campo;
  if (campo === 'tarjeta') {
    e.preventDefault();
    const inputs = $$('[data-campo="tarjeta"]'), k = inputs.indexOf(e.target);
    if (k < inputs.length - 1) inputs[k + 1].focus(); else comprobarTarjeta(false);
  } else if (campo === 'prueba') {
    e.preventDefault();
    const total = claseDatos(P.claseId).prueba.length;
    if (P.i < total - 1) { P.i++; render(); }
  }
});

document.addEventListener('change', e => {
  if (e.target.id === 'cfg-voz' || e.target.id === 'cfg-velocidad') {
    S.config[e.target.id === 'cfg-voz' ? 'voz' : 'velocidad'] = e.target.value; guardarLocal();
    hablar('take|took|taken'); return;
  }
  if (e.target.id !== 'importar' || !e.target.files[0]) return;
  e.target.files[0].text().then(t => {
    try { S = Object.assign(estadoVacio(), JSON.parse(t)); guardarLocal(); alert('Respaldo importado ✓'); render(); }
    catch (err) { alert('El archivo no es un respaldo válido.'); }
  });
});

async function guardarConfig() {
  const msg = $('#cfg-msg');
  S.config.nombre = $('#cfg-nombre').value.trim();
  S.config.url = $('#cfg-url').value.trim();
  S.config.token = $('#cfg-token').value.trim();
  guardarLocal();
  if (!S.config.url) { msg.innerHTML = '<span class="ok">Guardado ✓</span>'; pintarSync(); return; }
  msg.textContent = 'Probando conexión…';
  try {
    await cargarDesdeSheets();
    enviarVocab(Object.values(S.vocab)); // sube tu mazo completo a la planilla
    msg.innerHTML = '<span class="ok">✓ Conectado. Tu progreso se guarda en Google Sheets.</span>';
  } catch (e) {
    msg.innerHTML = `<span class="bad">✗ No se pudo conectar: ${esc(e.message)}. Revisa la URL, el TOKEN y que el acceso sea "Cualquier usuario".</span>`;
  }
  pintarSync();
}

/* ---------- Vincular dispositivos (QR / link con la conexión) ---------- */
// La conexión viaja en el "#" del link: el navegador no lo envía a ningún servidor.
function linkVinculacion() {
  const datos = btoa(JSON.stringify({ u: S.config.url, t: S.config.token, n: S.config.nombre }));
  return `${APP_ONLINE}#conectar=${encodeURIComponent(datos)}`;
}
// Recibe un link (o solo la parte "conectar=…") y guarda la conexión. Tolera espacios o saltos de línea.
function aplicarVinculacion(texto) {
  const m = String(texto).match(/conectar=([\s\S]+)$/);
  if (!m) return false;
  try {
    const d = JSON.parse(atob(decodeURIComponent(m[1].trim()).replace(/\s+/g, '')));
    if (d.u && d.t) { S.config.url = d.u; S.config.token = d.t; if (d.n) S.config.nombre = d.n; guardarLocal(); return true; }
  } catch (e) { /* link incompleto */ }
  return false;
}
function leerVinculacion() {
  if (!/^#conectar=/.test(location.hash)) return false;
  const ok = aplicarVinculacion(location.hash);
  history.replaceState(null, '', location.pathname + '#/panel'); // borra la clave de la barra de direcciones
  if (!ok) setTimeout(() => alert('El link de vinculación llegó incompleto. Ábrelo desde tu planilla: menú 🎓 Curso Inglés → Conectar este navegador.'), 300);
  return ok;
}
// Conecta con un link pegado (la app anclada al inicio del iPhone no comparte datos con Safari)
async function conectarConLink(texto) {
  if (!aplicarVinculacion(texto)) { alert('Ese no es un link de vinculación completo. En el curso ya conectado: ⚙ Configuración → Copiar link de vinculación.'); return; }
  try { await cargarDesdeSheets(); enviarVocab(Object.values(S.vocab)); } catch (e) { errorSync = e.message; }
  location.hash = '#/panel'; render(); sincronizar();
}
const esAppInstalada = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/* ---------- Inicio ---------- */
const recienVinculado = leerVinculacion();
window.addEventListener('hashchange', render);
asegurarTarjetas();
render();
if (S.config.url) cargarDesdeSheets().then(() => {
  if (recienVinculado) enviarVocab(Object.values(S.vocab));
  render(); sincronizar();
}).catch(e => { errorSync = e.message; pintarSync(); });
