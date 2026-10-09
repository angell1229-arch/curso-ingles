'use strict';

/* =====================================================================
   Saber Lab — plataforma de cursos: English (B1), Finanzas y Norma eléctrica RIC
   Contenido: datos/etapaN.js (window.CLASES, inglés, ids 1–12), datos/finanzas_etapaN.js (window.CLASES_FIN, ids 101–120)
   y datos/ric_etapaN.js (window.CLASES_RIC, ids 201–222)
   Progreso: localStorage + Google Sheets (misma planilla para ambos cursos)
   ===================================================================== */

// VERSIÓN: subirla en cada cambio (y el ?v= de index.html). Detalle en FUNCIONES_APP.md → Registro de cambios.
const APP_VERSION = '3.1.0';
const APP_FECHA = '8 oct 2026';
const APP_ONLINE = 'https://angell1229-arch.github.io/curso-ingles/';
const NOTA_MINIMA = 80;
const INTERVALOS = [1, 2, 4, 7, 15, 30]; // días de espera al llegar a la caja 1..6
const TARJETAS_POR_SESION = 20;
const NUEVAS_POR_DIA = 15; // tarjetas nuevas que entran al repaso cada día (se reparten en los días siguientes)
const LS_KEY = 'cursoIngles.v1'; // se mantiene para no perder el avance guardado

const TEMARIO_EN = [
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
const ETAPAS_EN = { 1: 'Presente y pasado', 2: 'Experiencias y futuro', 3: 'Opinar, comparar y aconsejar', 4: 'Comunicación real' };
const TEMARIO_FIN = [
  { id: 101, etapa: 1, titulo: 'El dinero pierde valor: inflación, IPC y UF', subtitulo: 'Poder de compra · IPC · UF · tu negocio' },
  { id: 102, etapa: 1, titulo: 'El tiempo vale dinero: interés compuesto y valor presente', subtitulo: 'Compuesto · regla del 72 · valor presente · ahorro mensual' },
  { id: 103, etapa: 1, titulo: 'Tasas que engañan: tasa real, tasa efectiva, la cuota y la CAE', subtitulo: 'Fisher · mensual vs. anual · cuota · CAE · tasa máxima' },
  { id: 104, etapa: 2, titulo: 'Presupuesto y flujo personal', subtitulo: 'Fondo de emergencia · 50/30/20' },
  { id: 105, etapa: 2, titulo: 'Deuda inteligente', subtitulo: 'Tarjetas · consumo · hipotecario · refinanciar' },
  { id: 106, etapa: 2, titulo: 'Ahorro e inversión personal', subtitulo: 'Depósitos · fondos mutuos · ETFs · APV · AFP' },
  { id: 107, etapa: 3, titulo: 'Macroeconomía', subtitulo: 'PIB · ciclo económico · empleo' },
  { id: 108, etapa: 3, titulo: 'Banco Central, tasas y dólar', subtitulo: 'Política monetaria · tipo de cambio' },
  { id: 109, etapa: 3, titulo: 'Cómo funciona la bolsa', subtitulo: 'Acciones · bonos · índices · órdenes' },
  { id: 110, etapa: 4, titulo: 'Estado de resultados', subtitulo: 'Ingresos · márgenes · EBITDA · utilidad' },
  { id: 111, etapa: 4, titulo: 'Balance', subtitulo: 'Activos · pasivos · patrimonio · liquidez' },
  { id: 112, etapa: 4, titulo: 'Flujo de caja', subtitulo: 'Operacional · inversión · financiamiento · FCF' },
  { id: 113, etapa: 4, titulo: 'Finanzas de tu negocio', subtitulo: 'Punto de equilibrio · capital de trabajo · VAN y TIR' },
  { id: 114, etapa: 5, titulo: 'Ratios financieros', subtitulo: 'ROE · ROA · ROIC · deuda · eficiencia' },
  { id: 115, etapa: 5, titulo: 'Valoración por múltiplos', subtitulo: 'P/E · EV/EBITDA · P/B · dividend yield' },
  { id: 116, etapa: 5, titulo: 'Valoración por flujos descontados', subtitulo: 'DCF · WACC · margen de seguridad' },
  { id: 117, etapa: 5, titulo: 'Análisis cualitativo', subtitulo: 'Ventajas competitivas · gerencia · reportes' },
  { id: 118, etapa: 6, titulo: 'Riesgo y retorno', subtitulo: 'Volatilidad · diversificación · correlación' },
  { id: 119, etapa: 6, titulo: 'Construir un portafolio', subtitulo: 'Asignación de activos · rebalanceo · costos' },
  { id: 120, etapa: 6, titulo: 'Psicología del inversionista + proyecto final', subtitulo: 'Sesgos · tu informe de análisis' },
];
const TEMARIO_RIC = [
  { id: 201, etapa: 1, titulo: 'La instalación de principio a fin y quién la regula', subtitulo: 'Recorrido · riesgos · DS 8 · licencias · trámite' },
  { id: 202, etapa: 1, titulo: 'La electricidad que usa un instalador', subtitulo: 'Tensión · corriente · Ohm · potencia mono y trifásica · kWh' },
  { id: 203, etapa: 1, titulo: 'Por qué la electricidad daña y cómo se protege', subtitulo: 'Efectos en el cuerpo · incendio · lógica de las protecciones' },
  { id: 204, etapa: 2, titulo: 'Empalmes: capacidad y ubicación', subtitulo: 'RIC N°01 · elegir el empalme · medidor · edificios' },
  { id: 205, etapa: 2, titulo: 'Tableros: qué llevan y cómo se arman', subtitulo: 'RIC N°02 · tipos · IP · reserva · conexionado' },
  { id: 206, etapa: 2, titulo: '¿Cuánta potencia necesita la casa?', subtitulo: 'RIC N°03 y N°10 · previsión de cargas · demanda' },
  { id: 207, etapa: 3, titulo: 'Elegir el conductor', subtitulo: 'RIC N°04 · capacidad de corriente · factores de corrección' },
  { id: 208, etapa: 3, titulo: 'Caída de tensión', subtitulo: 'RIC N°03 · calcular · límites · corregir' },
  { id: 209, etapa: 3, titulo: 'Canalizaciones', subtitulo: 'RIC N°04 · ductos · bandejas · ocupación · montaje' },
  { id: 210, etapa: 4, titulo: 'Protecciones contra sobrecarga y cortocircuito', subtitulo: 'RIC N°02 y N°05 · termomagnéticos · coordinación con el conductor' },
  { id: 211, etapa: 4, titulo: 'Proteger a las personas: diferenciales', subtitulo: 'RIC N°05 · contactos directos e indirectos' },
  { id: 212, etapa: 4, titulo: 'Puesta a tierra', subtitulo: 'RIC N°06 · sistemas TN/TT/IT · electrodos · medición' },
  { id: 213, etapa: 4, titulo: 'La vivienda completa', subtitulo: 'RIC N°10 y N°11 · circuitos · enchufes · baños · proyecto guía' },
  { id: 214, etapa: 5, titulo: 'Motores, climatización y condensadores', subtitulo: 'RIC N°07 · arranque · protecciones · factor de potencia' },
  { id: 215, etapa: 5, titulo: 'Sistemas de emergencia y respaldo', subtitulo: 'RIC N°08 · generadores · UPS · iluminación de seguridad' },
  { id: 216, etapa: 5, titulo: 'Energía solar y autogeneración', subtitulo: 'RIC N°09 · conexión a red · protecciones' },
  { id: 217, etapa: 5, titulo: 'Recarga de vehículos eléctricos', subtitulo: 'RIC N°15 (2024) · modos de carga · empalme' },
  { id: 218, etapa: 5, titulo: 'Eficiencia energética y subsistemas', subtitulo: 'RIC N°14 y N°16' },
  { id: 219, etapa: 6, titulo: 'Recintos especiales y lugares de reunión', subtitulo: 'RIC N°11 (I) · asistenciales · educacionales · húmedos' },
  { id: 220, etapa: 6, titulo: 'Construcciones y equipos especiales', subtitulo: 'RIC N°11 (II) · ascensores · data center · agrícolas · minería' },
  { id: 221, etapa: 6, titulo: 'Provisionales, eventos y lugares públicos', subtitulo: 'RIC N°11 (III) · faenas · teatros · letreros' },
  { id: 222, etapa: 6, titulo: 'Ambientes explosivos', subtitulo: 'RIC N°12 · clasificación de áreas · equipos Ex' },
  { id: 223, etapa: 6, titulo: 'Subestaciones y media tensión', subtitulo: 'RIC N°13 · salas eléctricas · tierra' },
  { id: 224, etapa: 7, titulo: 'Presentar el proyecto', subtitulo: 'RIC N°18 · planos · memoria · cuadros de carga' },
  { id: 225, etapa: 7, titulo: 'Puesta en servicio', subtitulo: 'RIC N°19 · pruebas · verificación · declaración' },
  { id: 226, etapa: 7, titulo: 'Operación, mantenimiento y proyecto final', subtitulo: 'RIC N°17 · caso integrado' },
];
const ETAPAS_RIC = { 1: 'Fundamentos: el mapa, la electricidad y los riesgos', 2: 'Llevar la energía a la casa', 3: 'Dimensionar', 4: 'Proteger a las personas', 5: 'Equipos y energía', 6: 'Instalaciones especiales', 7: 'Proyecto, puesta en servicio y mantención' };
const ETAPAS_FIN = { 1: 'El dinero y el tiempo', 2: 'Finanzas personales', 3: 'Economía y mercados', 4: 'Finanzas de empresas', 5: 'Análisis de empresas en bolsa', 6: 'Portafolio y riesgo' };
const TIPOS = { verbo: 'Verbo', palabra: 'Palabra', phrasal: 'Phrasal verb', combinacion: 'Combinación',
  completar: 'Completar', traducir: 'Traducir al inglés', corregir: 'Corregir el error', elegir: 'Elegir', orden: 'Ordenar', escritura: 'Escritura',
  termino: 'Término', formula: 'Fórmula', alternativas: 'Alternativas', numero: 'Cálculo', texto: 'Término', vf: 'Verdadero o falso' };

// Cursos: cada uno con su temario; los ids de clase no se repiten (inglés 1–12, finanzas 101–120)
const CURSOS = {
  ingles: { id: 'ingles', nombre: 'English', icono: '🗣️', base: 1, clases: window.CLASES || [], temario: TEMARIO_EN, etapas: ETAPAS_EN },
  finanzas: { id: 'finanzas', nombre: 'Finanzas', icono: '📈', base: 101, clases: window.CLASES_FIN || [], temario: TEMARIO_FIN, etapas: ETAPAS_FIN },
  ric: { id: 'ric', nombre: 'Norma RIC', corto: 'RIC', icono: '⚡', base: 201, clases: window.CLASES_RIC || [], temario: TEMARIO_RIC, etapas: ETAPAS_RIC },
};
const CLASES = [...CURSOS.ingles.clases, ...CURSOS.finanzas.clases, ...CURSOS.ric.clases];
const TEMARIOS = [...TEMARIO_EN, ...TEMARIO_FIN, ...TEMARIO_RIC];
const cursoDe = id => Number(id) >= 200 ? CURSOS.ric : Number(id) >= 100 ? CURSOS.finanzas : CURSOS.ingles;
const nc = id => id - cursoDe(id).base + 1; // número de la clase dentro de su curso
let CUR = CURSOS.ingles; // curso activo (se lee de la configuración al cargar)
const esConceptos = () => CUR.id !== 'ingles'; // cursos de conceptos (Finanzas, RIC): términos, fórmulas, calculadoras
const claseDatos = id => CLASES.find(c => c.id === id);
const claseMeta = id => TEMARIOS.find(c => c.id === id);

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
CUR = CURSOS[S.config.curso] || CURSOS.ingles;

const aprobada = id => S.progreso[id]?.estado === 'aprobada';
const desbloqueada = id => id === cursoDe(id).base || aprobada(id - 1);
const claseActual = () => CUR.temario.find(c => desbloqueada(c.id) && !aprobada(c.id)) || null;

/* ---------- Tarjetas de repaso (sistema Leitner) ---------- */
function itemsDeClase(c) {
  const out = [];
  if (c.formato === 'leccion') // lección guiada: el repaso trae preguntas de comprensión y aplicación
    return (c.repaso || []).map((q, k) => ({ id: `q:${c.id}:${k}`, tipo: 'concepto', es: q.etiqueta || String(q.pregunta).slice(0, 80), en: '', q }));
  if (c.terminos) { // finanzas: términos (se escribe el término a partir de su definición) y fórmulas (autoevaluación)
    const pre = c.id >= 200 ? 'r:' : 'f:'; // prefijo por curso para que no choquen términos iguales
    c.terminos.forEach(w => out.push({ id: pre + w.es, tipo: 'termino', en: w.en, es: w.es, definicion: w.definicion, ejemplo: w.ejemplo }));
    c.teoria.forEach((g, k) => { if (g.formula) out.push({ id: `fx:${c.id}:${k}`, tipo: 'formula', es: g.tema, en: g.formula, ejemplo: (g.ejemplos || [])[0] || '' }); });
    return out;
  }
  c.verbos.forEach(v => out.push({ id: 'v:' + v.base, tipo: 'verbo', en: `${v.base} – ${v.pasado} – ${v.participio}`, es: v.es, ejemplo: v.ejemplo, verbo: v }));
  c.vocabulario.forEach(w => out.push({ id: 'w:' + w.en, tipo: 'palabra', en: w.en, es: w.es, ejemplo: w.ejemplo }));
  (c.combinaciones || []).forEach(w => out.push({ id: 'c:' + w.en, tipo: 'combinacion', en: w.en, es: w.es, ejemplo: '' }));
  c.phrasal.forEach(w => out.push({ id: 'p:' + w.en, tipo: 'phrasal', en: w.en, es: w.es, ejemplo: w.ejemplo }));
  return out;
}
const INDICE = {};
CLASES.forEach(c => itemsDeClase(c).forEach(it => { if (!INDICE[it.id]) INDICE[it.id] = { ...it, clase_id: c.id }; }));
const totalTarjetas = () => Object.values(INDICE).filter(it => cursoDe(it.clase_id) === CUR).length;

const tarjetas = () => Object.values(S.vocab).filter(t => INDICE[t.id] && cursoDe(t.clase_id) === CUR);
const pendientesHoy = () => tarjetas().filter(t => normFecha(t.proxima_revision) <= hoy());

function asegurarTarjetas() {
  const nuevas = [];
  Object.values(CURSOS).forEach(curso => {
  // las nuevas se reparten (por curso): hasta NUEVAS_POR_DIA por día, contando las que ya entraron sin repasar
  const yaAgendadas = {};
  Object.values(S.vocab).filter(t => INDICE[t.id] && cursoDe(t.clase_id) === curso && !t.ultima_revision)
    .forEach(t => { const f = normFecha(t.proxima_revision); yaAgendadas[f] = (yaAgendadas[f] || 0) + 1; });
  let dia = 0;
  const siguienteFecha = () => {
    while ((yaAgendadas[sumarDias(dia)] || 0) >= NUEVAS_POR_DIA) dia++;
    const f = sumarDias(dia); yaAgendadas[f] = (yaAgendadas[f] || 0) + 1; return f;
  };
  Object.values(INDICE).forEach(it => {
    if (cursoDe(it.clase_id) !== curso || S.vocab[it.id] || !desbloqueada(it.clase_id)) return;
    const t = { id: it.id, tipo: it.tipo, en: it.en, es: it.es, clase_id: it.clase_id, caja: 1, proxima_revision: siguienteFecha(),
      aciertos: 0, fallos: 0, ultima_revision: '', ultimo_error: '' };
    S.vocab[it.id] = t; nuevas.push(t);
  });
  });
  if (nuevas.length) { guardarLocal(); enviarVocab(nuevas); }
}

/* ---------- Corrección de respuestas ---------- */
const sinTildes = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // "inflación" = "inflacion"
// alt = true lee 's como "has" y 'd como "had" (She's finished = She has finished)
function normalizar(t, alt = false) {
  let s = sinTildes(String(t || '').toLowerCase()).replace(/[’‘`´]/g, "'").replace(/[“”"]/g, '');
  s = s.replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not').replace(/'m\b/g, ' am').replace(/'re\b/g, ' are').replace(/'ve\b/g, ' have')
    .replace(/'ll\b/g, ' will').replace(/'d\b/g, alt ? ' had' : ' would').replace(/'s\b/g, alt ? ' has' : ' is');
  return s.replace(/[.,!?;:¡¿()]/g, ' ').replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}
const lecturas = t => [...new Set([normalizar(t), normalizar(t, true)])];
function esCorrecta(resp, item) {
  if (!normalizar(resp)) return false;
  const rs = lecturas(resp);
  if (item.respuestas.some(a => lecturas(a).some(x => rs.includes(x)))) return true;
  // también vale escribir la oración (o un trozo de ella) con el espacio rellenado: "It's raining"
  if ((item.pregunta.match(/___/g) || []).length === 1) {
    const base = item.pregunta.replace(/\(.*?\)/g, '');
    if (item.respuestas.some(a => lecturas(base.replace('___', a)).some(completa => rs.some(r =>
      (' ' + completa + ' ').includes(' ' + r + ' ') && lecturas(a).some(na => (' ' + r + ' ').includes(' ' + na + ' ')))))) return true;
  }
  return false;
}
// Números escritos a la chilena o a la inglesa: "1.234.567", "1,5", "26.82", "$ 474.000", "-25 %".
// Si es ambiguo ("26,824" o "1.000") devuelve las dos lecturas y vale cualquiera que calce.
function lecturasNumero(t) {
  let s = String(t || '').replace(/[\s$%]/g, '').replace(/[−–—]/g, '-').replace(/[^\d.,-]+$/, '');
  if (!s || !/^-?[\d.,]+$/.test(s)) return [];
  const neg = s.startsWith('-'); s = s.replace('-', '');
  const p = s.lastIndexOf('.'), c = s.lastIndexOf(',');
  const op = [];
  if (p >= 0 && c >= 0) op.push(p > c ? s.replace(/,/g, '') : s.replace(/\./g, '').replace(',', '.'));
  else if (c >= 0) { op.push(s.replace(/\./g, '').replace(/,(?=\d+$)/, '.').replace(/,/g, '')); if (/^\d{1,3}(,\d{3})+$/.test(s)) op.push(s.replace(/,/g, '')); }
  else if (p >= 0) { if (/^\d{1,3}(\.\d{3})+$/.test(s)) op.push(s.replace(/\./g, '')); if ((s.match(/\./g) || []).length === 1) op.push(s); }
  else op.push(s);
  return op.map(Number).filter(Number.isFinite).map(n => (neg ? -n : n));
}
const parseNumero = t => lecturasNumero(t)[0] ?? null;
const fmtNum = (n, dec) => Number(n).toLocaleString('es-CL', { minimumFractionDigits: dec ?? 0, maximumFractionDigits: dec ?? (Math.abs(n) >= 1000 ? 0 : 2) });
function respuestaTexto(it) {
  if (it.tipo !== 'numero') return it.respuestas[0];
  const n = fmtNum(it.respuesta);
  return it.unidad === '$' ? `$${n}` : it.unidad ? `${n} ${it.unidad}` : n;
}
// Corrige cualquier tipo de pregunta (inglés y finanzas)
function corregir(it, r) {
  if (it.tipo === 'numero') {
    const tol = (it.tolRel != null ? Math.abs(it.respuesta) * it.tolRel : (it.tolerancia ?? Math.abs(it.respuesta) * 0.005)) + 1e-9;
    return lecturasNumero(r).some(v => Math.abs(v - it.respuesta) <= tol);
  }
  if (it.opciones) return it.respuestas.includes(r);
  return esCorrecta(r, it);
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
  const t = ' ' + sinTildes(String(texto).toLowerCase()).replace(/[’]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const f = sinTildes(w.toLowerCase());
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
  const ver = $('#version'); if (ver) ver.textContent = `v${APP_VERSION} · ${APP_FECHA}`;
}

/* =====================================================================
   VISTAS
   ===================================================================== */

function vistaPanel() {
  const actual = claseActual(), due = pendientesHoy().length, r = racha(), ts = tarjetas();
  const aprendidas = ts.filter(t => t.caja >= 4).length;
  const vs = esConceptos() ? ts : ts.filter(t => t.tipo === 'verbo');
  const ac = vs.reduce((s, t) => s + t.aciertos, 0), fa = vs.reduce((s, t) => s + t.fallos, 0);
  const prec = ac + fa ? Math.round(ac * 100 / (ac + fa)) : null;
  const nAprob = CUR.temario.filter(c => aprobada(c.id)).length;
  const nDias = Object.keys(diasEstudiados()).length;
  const cajas = [1, 2, 3, 4, 5, 6].map(n => ts.filter(t => Math.min(t.caja, 6) === n).length);
  const maxCaja = Math.max(1, ...cajas);
  const nombresCaja = ['Caja 1 · mañana', 'Caja 2 · 2 días', 'Caja 3 · 4 días', 'Caja 4 · 7 días', 'Caja 5 · 15 días', 'Dominada · 30 días'];
  const fallos = ts.filter(t => t.fallos > 0).sort((a, b) => b.fallos - a.fallos || a.aciertos - b.aciertos).slice(0, 6);

  const cta = due
    ? `<a class="btn grande" href="#/repaso">↻ Repasar ${due} tarjeta${due > 1 ? 's' : ''} (~${Math.max(1, Math.round(Math.min(due, TARJETAS_POR_SESION) / 3))} min)</a>`
    : actual ? `<a class="btn grande" href="#/clase/${actual.id}">Seguir con la clase ${nc(actual.id)} →</a>` : '';
  const sub = actual
    ? `${CUR.icono} ${CUR.nombre} · Clase actual: ${nc(actual.id)} · ${esc(actual.titulo)}${claseDatos(actual.id) ? '' : ' (contenido en preparación)'}`
    : `${CUR.icono} ${CUR.nombre} · ¡Terminaste todas las clases!`;

  const avisoConectar = S.config.url ? '' : `<div class="aviso azul" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
    <span style="flex:1;min-width:220px">📲 <b>${esAppInstalada() ? 'Conecta esta app' : 'Conecta este dispositivo'}</b> a tu planilla para guardar tu avance.
    Copia el link en el curso ya conectado (⚙ Configuración → <i>Copiar link de vinculación</i>) y pégalo aquí.</span>
    <button class="btn" data-act="pegar-link">📋 Pegar link y conectar</button></div>`;
  return `${avisoConectar}
  <div class="head"><div><h1>Hola, ${esc(S.config.nombre || '')} 👋</h1><p>${sub}</p></div>${cta}</div>
  <div class="kpis">
    <div class="k"><div class="l">Racha</div><div class="v">${r.actual} <small>día${r.actual === 1 ? '' : 's'}</small></div><div class="d">Récord: ${r.record} día${r.record === 1 ? '' : 's'}</div></div>
    <div class="k"><div class="l">${esConceptos() ? 'Conceptos aprendidos' : 'Palabras aprendidas'} <span title="Tarjetas en caja 4 o más: ya las recuerdas después de una semana">ⓘ</span></div><div class="v">${aprendidas} <small>/ ${totalTarjetas()}</small></div><div class="d">${ts.length} en tu mazo · ${due} para hoy</div></div>
    <div class="k"><div class="l">${esConceptos() ? 'Precisión en el repaso' : 'Precisión en verbos'}</div><div class="v">${prec ?? '—'}<small>${prec !== null ? '%' : ''}</small></div><div class="d" style="color:${prec === null ? 'var(--sub)' : colorPct(prec)}">${ac + fa ? `en ${ac + fa} respuestas` : 'Aún sin respuestas'}</div></div>
    <div class="k"><div class="l">Clases aprobadas</div><div class="v">${nAprob} <small>/ ${CUR.temario.length}</small></div><div class="d" style="color:var(--amarillo)">${actual && claseDatos(actual.id) ? `Prueba clase ${nc(actual.id)} disponible` : ''}</div></div>
  </div>
  <div class="grid2">
    <div class="card"><h3>Memoria — cajas de repetición espaciada <span>${ts.length} tarjetas</span></h3>
      ${ts.length ? `<div class="leit">${cajas.map((n, i) => `<div><b>${n}</b><i style="height:${Math.round(n / maxCaja * 72)}%;background:var(--c${i + 1})"></i><small>${nombresCaja[i]}</small></div>`).join('')}</div>`
        : `<div class="vacio">Abre la clase 1 para empezar a llenar tu mazo.</div>`}
    </div>
    <div class="card"><h3>Lo que más fallas <span>${esConceptos() ? 'conceptos y fórmulas' : 'verbos y palabras'}</span></h3>
      ${fallos.length ? `<table><tr><th>${esConceptos() ? 'Concepto' : 'Palabra'}</th><th>Tu respuesta</th><th>${esConceptos() ? 'En inglés' : 'Correcto'}</th><th>Aciertos</th></tr>
        ${fallos.map(t => { const p = Math.round(t.aciertos * 100 / (t.aciertos + t.fallos)); return `<tr>
          <td>${esc(t.es)}</td><td class="mono bad">${esc(t.ultimo_error || '—')}</td><td class="mono ok">${esc(t.en || '—')}</td>
          <td><span class="bar"><i style="width:${p}%;background:${colorPct(p)}"></i></span></td></tr>`; }).join('')}</table>`
        : `<div class="vacio">Aquí aparecerán ${esConceptos() ? 'los conceptos' : 'los verbos y palabras'} que más se te olvidan.</div>`}
    </div>
    <div class="card"><h3>Constancia (todos los cursos) — 18 semanas <span>${nDias} día${nDias === 1 ? '' : 's'} estudiado${nDias === 1 ? '' : 's'}</span></h3>
      <div class="heat">${heatmap()}</div></div>
    <div class="card"><h3>Avance por clase <span>mínimo ${NOTA_MINIMA}% para avanzar</span></h3>
      <div class="cls">${CUR.temario.map(c => {
        const p = S.progreso[c.id], ok = aprobada(c.id), lib = desbloqueada(c.id);
        const pct = p ? p.mejor_puntaje : 0;
        const estado = ok ? `${pct}% ✓` : !lib ? '🔒' : !claseDatos(c.id) ? 'pronto' : p ? `${pct}%` : 'en curso';
        return `<a class="c ${lib ? '' : 'lock'}" href="#/clase/${c.id}"><span class="t">${nc(c.id)} · ${esc(c.titulo)}</span>
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
  const etapas = Object.keys(CUR.etapas).map(Number);
  return `<div class="head"><div><h1>${CUR.icono} ${CUR.nombre} · Clases</h1><p>${etapas.length} etapas · ${CUR.temario.length} clases · aprueba la prueba con ${NOTA_MINIMA}% para desbloquear la siguiente</p></div></div>
  ${etapas.map(e => `<div class="etapa">Etapa ${e} — ${CUR.etapas[e]}</div><div class="clases">
    ${CUR.temario.filter(c => c.etapa === e).map(c => {
      const lib = desbloqueada(c.id), datos = claseDatos(c.id), p = S.progreso[c.id];
      const chip = aprobada(c.id) ? `<span class="chip verde">Aprobada · ${p.mejor_puntaje}%</span>`
        : !lib ? '<span class="chip">🔒 Bloqueada</span>'
        : !datos ? '<span class="chip azul">Próximamente</span>'
        : p ? `<span class="chip amarillo">Mejor: ${p.mejor_puntaje}%</span>` : '<span class="chip amarillo">En curso</span>';
      const info = !datos ? '' : datos.formato === 'leccion' ? `🧭 Lección guiada · 🧩 caso · ✎ desafío` : datos.terminos ? `${datos.terminos.length} términos · 🧮 ${datos.calculadoras.length} calculadora${datos.calculadoras.length > 1 ? 's' : ''}`
        : `${datos.verbos.length} verbos · ${datos.vocabulario.length} palabras`;
      return `<a class="clase ${lib ? '' : 'lock'}" href="#/clase/${c.id}"><div class="n">Clase ${nc(c.id)}</div><h4>${esc(c.titulo)}</h4>
        <p>${esc(c.subtitulo)}</p><div class="meta"><span>${info}</span>${chip}</div></a>`;
    }).join('')}</div>`).join('')}`;
}

/* ---------- Clase ---------- */
const PESTANAS_EN = [['gramatica', 'Gramática'], ['verbos', 'Verbos'], ['vocabulario', 'Vocabulario'], ['phrasal', 'Phrasal verbs'], ['practica', 'Práctica'], ['escritura', 'Escritura']];
const PESTANAS_LEC = [['leccion', '🧭 Lección guiada'], ['caso', '🧩 Caso práctico'], ['ficha', '📄 Ficha'], ['calculadora', '🧮 Calculadoras'], ['terminos', '📖 Términos']];
const PESTANAS_FIN = [['teoria', 'Conceptos'], ['terminos', 'Términos'], ['calculadora', '🧮 Calculadora'], ['practica', 'Práctica'], ['escritura', 'Explícalo']];
let PR = null; // estado de la práctica

function vistaClase(id, tab) {
  const meta = claseMeta(id);
  if (!meta) return vistaPanel();
  if (!desbloqueada(id)) return `<div class="head"><div><h1>🔒 Clase ${nc(id)} · ${esc(meta.titulo)}</h1>
    <p>Aprueba la prueba de la clase ${nc(id) - 1} con ${NOTA_MINIMA}% o más para desbloquearla.</p></div>
    <a class="btn" href="#/clase/${id - 1}">Ir a la clase ${nc(id) - 1}</a></div>`;
  const c = claseDatos(id);
  if (!c) return `<div class="head"><div><h1>Clase ${nc(id)} · ${esc(meta.titulo)}</h1><p>${esc(meta.subtitulo)}</p></div></div>
    <div class="aviso azul">El contenido de esta clase está en preparación: se construye etapa por etapa. Pídele a Claude la etapa ${meta.etapa} de ${cursoDe(id).nombre}.</div>`;
  asegurarTarjetas();
  const p = S.progreso[id];
  const estado = aprobada(id) ? `<span class="chip verde">Aprobada · ${p.mejor_puntaje}%</span>` : p ? `<span class="chip amarillo">Mejor intento: ${p.mejor_puntaje}%</span>` : '';
  const pest = c.formato === 'leccion'
    ? PESTANAS_LEC.filter(([k]) => (k !== 'calculadora' || c.calculadoras?.length) && (k !== 'terminos' || c.terminos?.length) && (k !== 'caso' || c.caso))
    : c.terminos ? PESTANAS_FIN : PESTANAS_EN;
  if (!pest.some(([k]) => k === tab)) tab = pest[0][0];
  const cuerpo = { gramatica: tabGramatica, verbos: tabVerbos, vocabulario: tabVocabulario, phrasal: tabPhrasal, practica: tabPractica, escritura: tabEscritura,
    teoria: tabTeoria, terminos: tabTerminos, calculadora: tabCalculadora,
    leccion: x => vistaLeccion(x, 'leccion'), caso: x => vistaLeccion(x, 'caso'), ficha: tabFicha }[tab];
  const viejo = c.terminos && c.formato !== 'leccion'
    ? `<div class="aviso">🛠️ Esta clase todavía está en el <b>formato anterior</b> (conceptos y términos). La estoy rehaciendo como <b>lección guiada</b> con ejemplos resueltos, casos y desafío. Mientras tanto puedes usarla.</div>` : '';
  return `<div class="head"><div><p>${cursoDe(id).icono} ${cursoDe(id).nombre} · Etapa ${c.etapa} · Clase ${nc(c.id)} ${estado}</p><h1>${esc(c.titulo)}</h1><p>${esc(c.subtitulo)} — ${esc(c.objetivo)}</p></div>
    <div class="acciones" style="margin:0"><button class="btn sec grande" data-act="repaso-clase" data-id="${id}">⚡ Practicar esta clase</button>
    <a class="btn grande" href="#/prueba/${id}">✎ ${c.formato === 'leccion' ? 'Desafío' : 'Rendir prueba'}</a></div></div>${viejo}
    <div class="tabs">${pest.map(([k, n]) => `<a href="#/clase/${id}/${k}" class="${k === tab ? 'on' : ''}">${n}</a>`).join('')}</div>
    ${cuerpo(c)}`;
}
function tabGramatica(c) {
  return `<div class="gram">${c.gramatica.map(g => `<div class="card"><h4>${esc(g.tema)}</h4><p>${esc(g.explicacion)}</p>
    <ul>${g.ejemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}
function tabVerbos(c) {
  return `<div class="aviso azul">💡 Actívate a ti mismo: pulsa <b>Ocultar formas</b>, di en voz alta el pasado y el participio, y luego haz clic para comprobar.</div>
  <div class="acciones" style="margin:0 0 12px"><button class="btn sec" data-act="ocultar">👁 Ocultar / mostrar formas</button>
    <button class="btn sec" data-act="repaso-clase" data-id="${c.id}">⚡ Practicar esta clase</button></div>
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
  if (it.tipo === 'numero') return `<div class="num-campo">${it.unidad === '$' ? '<span>$</span>' : ''}<input class="txt" ${attrs} value="${esc(valor)}" inputmode="decimal" autocomplete="off" ${bloqueado ? 'disabled' : ''} placeholder="Escribe el número…">${it.unidad && it.unidad !== '$' ? `<span>${esc(it.unidad)}</span>` : ''}</div>`;
  if (it.opciones) return `<div class="ops ${it.opciones.some(o => o.length > 24) ? 'largas' : ''}">${it.opciones.map(o => `<button class="op ${valor === o ? 'sel' : ''}" ${attrs} data-act="opcion" data-v="${esc(o)}" ${bloqueado ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
  return `<input class="txt" ${attrs} value="${esc(valor)}" autocomplete="off" autocapitalize="off" spellcheck="false" ${bloqueado ? 'disabled' : ''} placeholder="Escribe tu respuesta…">`;
}
function tabPractica(c) {
  if (!PR || PR.claseId !== c.id) PR = { claseId: c.id, resp: {}, revisado: false };
  const items = c.practica;
  const correctas = PR.revisado ? items.filter((it, i) => corregir(it, PR.resp[i])).length : 0;
  return `<div class="aviso">${c.terminos ? 'En los cálculos escribe solo el número (punto o coma para decimales; se acepta el redondeo). En los términos vale español o inglés, con o sin tildes.'
    : "Escribe solo lo que falta (o la oración completa). Las contracciones valen igual: <i>don't = do not</i>."}</div>
  <div class="ejer">${items.map((it, i) => {
    const r = PR.resp[i] || '', ok = PR.revisado ? corregir(it, r) : null;
    return `<div class="item ${ok === true ? 'bien' : ok === false ? 'mal' : ''}"><div class="nn">${i + 1}</div><div>
      <div class="tipo">${TIPOS[it.tipo] || it.tipo}</div><div class="q">${esc(it.pregunta)}</div>
      ${campoRespuesta(it, r, `data-campo="practica" data-i="${i}"`, PR.revisado)}
      ${PR.revisado ? `<div class="fb ${ok ? 'ok' : 'bad'}">${ok ? '✓ Correcto' : `✗ Respuesta: <b>${esc(respuestaTexto(it))}</b>`}</div>
        ${it.explicacion ? `<div class="expl">💡 ${esc(it.explicacion)}</div>` : ''}` : ''}
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
    <p style="color:var(--sub);margin-bottom:10px">Mínimo <b>${e.minPalabras} palabras</b>. Usa estas palabras ${c.terminos ? '(explicar con tus palabras es la mejor forma de comprobar que entendiste)' : '(pueden llevar -s, -ed, -ing)'}:</p>
    <textarea class="txt" data-campo="escritura" data-min="${e.minPalabras}" data-oblig="${esc(JSON.stringify(e.obligatorias))}" placeholder="${c.terminos ? 'Escribe aquí…' : 'Start writing here…'}">${esc(texto)}</textarea>
    <div class="chips" id="chips-esc">${chipsEscritura(ev, e.minPalabras)}</div>
    <div class="acciones"><button class="btn" data-act="guardar-escrito" data-id="${c.id}">💾 Guardar en mis escritos</button>
      <button class="link" data-act="ver-modelo">Ver texto modelo</button></div>
    <div id="modelo" style="display:none;margin-top:14px" class="aviso azul"><b>Texto modelo:</b><br>${esc(e.modelo)} ${c.terminos ? '' : voz(e.modelo)}</div>
  </div>`;
}

/* ---------- Clases de conceptos (Finanzas y RIC): teoría, términos y calculadoras ---------- */
function tabTeoria(c) {
  return `<div class="gram">${c.teoria.map(g => `<div class="card"><h4>${esc(g.tema)}</h4><p>${esc(g.explicacion)}</p>
    ${g.formula ? `<pre class="formula">${esc(g.formula)}</pre>` : ''}
    ${g.ejemplos?.length ? `<ul>${g.ejemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
  ${c.fuentes?.length ? `<div class="card" style="margin-top:16px"><h3>Fuentes <span>para profundizar o verificar</span></h3>
    <ul class="fuentes">${c.fuentes.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a></li>`).join('')}</ul></div>` : ''}`;
}
function tabTerminos(c) {
  return `<div class="aviso azul">💡 Para hablar como alguien que sabe de finanzas: aprende cada término en español <b>y</b> en inglés (así aparecen en reportes, noticias y en tu corredora). En el repaso verás la definición y escribes el término.</div>
  <div class="card"><table><tr><th>Español</th><th>Inglés</th><th>Definición</th><th>Ejemplo</th></tr>
  ${c.terminos.map(w => `<tr><td><b>${esc(w.es)}</b></td><td><i>${esc(w.en)}</i>${voz(w.en.replace(/\s*\(.*\)/, ''))}</td><td>${esc(w.definicion)}</td>
    <td class="ej">${esc(w.ejemplo)}${voz(w.ejemplo)}</td></tr>`).join('')}</table></div>`;
}
function tabCalculadora(c) {
  return `<div class="aviso azul">🧮 Cambia los números y mira cómo cambia el resultado. Experimentar es la forma más rápida de entender las fórmulas.</div>
    ${c.calculadoras.map(k => calcHTML(k)).join('')}`;
}

// Calculadoras: campos editables + función que devuelve los resultados en HTML
const pct = (x, d = 2) => `${fmtNum(x * 100, d)}%`;
const peso = x => `$${fmtNum(Math.round(x), 0)}`;
const fila = (k, v, fuerte) => `<div class="cr ${fuerte ? 'fuerte' : ''}"><span>${k}</span><b>${v}</b></div>`;
function tirMensual(montoRecibido, pagos) { // tasa que iguala lo recibido con el valor presente de los pagos (bisección)
  let lo = 0, hi = 1;
  const vp = r => pagos.reduce((s, p, t) => s + p / Math.pow(1 + r, t + 1), 0);
  if (vp(0) <= montoRecibido) return 0;
  for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (vp(m) > montoRecibido) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const CALCS = {
  inflacion_uf: {
    titulo: 'Inflación y UF', desc: 'Cuánto costarán las cosas, cuánto pierde tu dinero y cuánto son las UF en pesos.',
    campos: [['monto', 'Monto ($)', 1000000], ['infl', 'Inflación anual (%)', 4], ['anios', 'Años', 5], ['uf', 'Cantidad de UF', 12], ['valoruf', 'Valor de la UF ($)', 39500]],
    calc: v => {
      const f = Math.pow(1 + v.infl / 100, v.anios);
      return fila(`Lo que hoy cuesta ${peso(v.monto)} costará en ${v.anios} años`, peso(v.monto * f), true)
        + fila(`Poder de compra de ${peso(v.monto)} guardados ${v.anios} años (en pesos de hoy)`, peso(v.monto / f))
        + fila('Poder de compra perdido', `${peso(v.monto - v.monto / f)} (${pct(1 - 1 / f, 1)})`)
        + fila(`${fmtNum(v.uf, 2)} UF en pesos`, peso(v.uf * v.valoruf), true)
        + `<p class="nota-calc">El valor de la UF del día lo publican el Banco Central (bcentral.cl) y el SII (sii.cl). El ${fmtNum(v.valoruf)} de ejemplo es referencial.</p>`;
    },
  },
  interes_compuesto: {
    titulo: 'Interés compuesto con aportes mensuales', desc: 'Cuánto tendrás si inviertes un monto inicial y aportas todos los meses.',
    campos: [['capital', 'Monto inicial ($)', 1000000], ['aporte', 'Aporte mensual ($)', 100000], ['tasa', 'Rentabilidad anual (%)', 7], ['anios', 'Años', 20]],
    calc: v => {
      const i = Math.pow(1 + v.tasa / 100, 1 / 12) - 1, n = Math.round(v.anios * 12);
      const fv = m => v.capital * Math.pow(1 + i, m) + (i ? v.aporte * (Math.pow(1 + i, m) - 1) / i : v.aporte * m);
      const total = fv(n), aportado = v.capital + v.aporte * n;
      const paso = Math.max(1, Math.ceil(v.anios / 8)), filas = [];
      for (let a = paso; a <= v.anios; a += paso) filas.push(a);
      if (filas[filas.length - 1] !== v.anios && v.anios > 0) filas.push(v.anios);
      const max = fv(n) || 1;
      return fila(`Valor final en ${v.anios} años`, peso(total), true) + fila('Total aportado por ti', peso(aportado))
        + fila('Ganado en intereses', `${peso(total - aportado)} (${aportado ? fmtNum((total - aportado) / aportado * 100, 0) : 0}% de lo aportado)`)
        + fila('Regla del 72: se duplica cada', v.tasa > 0 ? `${fmtNum(72 / v.tasa, 1)} años aprox.` : '—')
        + `<div class="barras">${filas.map(a => { const t = fv(a * 12), ap = v.capital + v.aporte * a * 12;
          return `<div class="br"><span>Año ${a}</span><div class="bt"><i class="ap" style="width:${ap / max * 100}%"></i><i class="in" style="width:${Math.max(0, t - ap) / max * 100}%"></i></div><b>${peso(t)}</b></div>`; }).join('')}
          <div class="ley"><i class="ap"></i> lo que aportas <i class="in"></i> intereses</div></div>`;
    },
  },
  tasas: {
    titulo: 'Tasas: real, efectiva y equivalentes', desc: 'Ecuación de Fisher y conversión entre tasa mensual y anual.',
    campos: [['nominal', 'Tasa nominal anual (%)', 6], ['infl', 'Inflación anual (%)', 4], ['mensual', 'Tasa mensual (%)', 1.5]],
    calc: v => {
      const real = (1 + v.nominal / 100) / (1 + v.infl / 100) - 1, m = v.mensual / 100;
      return fila('Tasa real exacta (Fisher)', pct(real), true) + fila('Tasa real aproximada (nominal − inflación)', pct((v.nominal - v.infl) / 100))
        + fila(`${fmtNum(v.mensual, 2)}% mensual → anual efectiva`, pct(Math.pow(1 + m, 12) - 1), true)
        + fila(`${fmtNum(v.mensual, 2)}% mensual × 12 (como la CAE)`, pct(m * 12))
        + fila(`${fmtNum(v.nominal, 2)}% anual → mensual equivalente`, pct(Math.pow(1 + v.nominal / 100, 1 / 12) - 1));
    },
  },
  credito: {
    titulo: 'Crédito en cuotas fijas (con CAE)', desc: 'Cuota, costo total, CAE y cómo se reparte cada cuota entre interés y capital.',
    campos: [['monto', 'Monto del crédito ($)', 2000000], ['tasa', 'Tasa de interés mensual (%)', 1.5], ['n', 'Número de cuotas', 24], ['gastos', 'Gastos iniciales descontados ($)', 0], ['seguro', 'Seguros mensuales ($)', 0]],
    calc: v => {
      const i = v.tasa / 100, n = Math.max(1, Math.round(v.n));
      const cuota = i ? v.monto * i / (1 - Math.pow(1 + i, -n)) : v.monto / n, pago = cuota + v.seguro;
      const recibido = v.monto - v.gastos, r = tirMensual(recibido, Array(n).fill(pago));
      let saldo = v.monto; const tabla = [];
      for (let k = 1; k <= n; k++) { const int = saldo * i, am = cuota - int; saldo -= am; if (k <= 3 || k === n) tabla.push([k, int, am, Math.max(0, saldo)]); }
      return fila('Cuota mensual (con seguros)', peso(pago), true) + fila('Costo total del crédito (todo lo que pagas)', peso(pago * n), true)
        + fila('Intereses, seguros y gastos', peso(pago * n - recibido)) + fila('Monto que recibes (líquido)', peso(recibido))
        + fila('CAE (tasa mensual equivalente × 12)', pct(r * 12), true) + fila('Tasa anual efectiva equivalente', pct(Math.pow(1 + r, 12) - 1))
        + `<table class="amort"><tr><th>Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr>
          ${tabla.map(([k, int, am, sal], j) => `${j === 3 && n > 4 ? '<tr><td colspan="4" style="text-align:center">…</td></tr>' : ''}<tr><td>${k}</td><td>${peso(int)}</td><td>${peso(am)}</td><td>${peso(sal)}</td></tr>`).join('')}</table>
          <p class="nota-calc">Fíjate: en las primeras cuotas pagas más interés que capital. La CAE oficial la informa la institución; esta es una estimación con los datos que ingreses.</p>`;
    },
  },
  potencia_electrica: {
    titulo: 'Potencia y corriente (mono y trifásico)', desc: 'S = V·I · P = V·I·cos φ · trifásico con √3. Y al revés: qué corriente toma una carga.',
    campos: [['fases', 'Fases (1 o 3)', 3], ['v', 'Tensión (V): 220 mono / 380 tri', 380], ['i', 'Corriente (A)', 20], ['fp', 'Factor de potencia cos φ', 0.9], ['p', 'Potencia de una carga (kW) → corriente', 5]],
    calc: v => {
      const k = v.fases === 3 ? Math.sqrt(3) : 1, fp = Math.min(Math.max(v.fp || 1, 0.01), 1);
      const S = k * v.v * v.i / 1000, P = S * fp, Q = Math.sqrt(Math.max(S * S - P * P, 0));
      const I = v.v ? v.p * 1000 / (k * v.v * fp) : 0;
      return fila(`Potencia aparente S (${v.fases === 3 ? '√3 × ' : ''}V × I)`, `${fmtNum(S, 2)} kVA`, true) + fila('Potencia activa P (S × cos φ)', `${fmtNum(P, 2)} kW`, true)
        + fila('Potencia reactiva Q', `${fmtNum(Q, 2)} kvar`) + fila(`Corriente que toma una carga de ${fmtNum(v.p, 2)} kW`, `${fmtNum(I, 1)} A`, true)
        + `<p class="nota-calc">En BT en Chile: 220 V entre fase y neutro (monofásico) y 380 V entre fases (trifásico), 50 Hz.</p>`;
    },
  },
  empalme: {
    titulo: 'Empalme en baja tensión (RIC N°01)', desc: 'Potencia del empalme según el anexo 1.3, regla del punto 5.3, poder de corte (8.2) y reserva de superficie (anexo 1.4).',
    campos: [['fases', 'Fases (1 o 3)', 1], ['in', 'Interruptor del empalme (A)', 25], ['pinst', 'Potencia instalada declarada (kW)', 6], ['icc', 'Icc prevista en el punto (kA)', 4.5], ['x', 'Muro de medidores: ancho X (m)', 3], ['y', 'Muro de medidores: alto Y (m)', 2]],
    calc: v => {
      const MONO = [[6, 1, 'A-6/S-6'], [10, 2, 'A-6/S-6'], [16, 3, 'A-6/S-6'], [20, 4, 'A-6/S-6'], [25, 5, 'A-6/S-6'], [30, 6, 'A-9/S-9'], [32, 6.5, 'A-9/S-9'], [35, 7, 'A-9/S-9'], [40, 8, 'A-9/S-9'], [50, 10, 'A-16/S-16'], [63, 13, 'A-16/S-16']];
      const TRI = [[6, 3.6], [10, 6], [16, 9.7], [20, 12], [25, 15], [30, 18], [32, 19], [35, 21], [40, 24], [50, 30], [63, 38], [80, 48], [90, 55], [100, 61], [125, 76], [150, 91], [160, 97], [200, 122], [225, 137], [250, 153], [320, 195], [350, 214], [400, 244], [450, 275], [500, 306], [630, 385], [800, 489], [1000, 612]];
      const tri = v.fases === 3, V = tri ? 380 : 220, S = (tri ? Math.sqrt(3) : 1) * V * v.in / 1000;
      const tabla = tri ? TRI : MONO, f = tabla.find(r => r[0] === v.in);
      const ok = f ? f[1] <= v.pinst + 1e-9 : null;
      const mayor = [...tabla].reverse().find(r => r[1] <= v.pinst + 1e-9);
      return fila(`Potencia máxima del empalme (${tri ? '√3 × 380' : '220'} × ${v.in} A)`, `${fmtNum(S, 2)} kVA`, true)
        + fila('Potencia a contratar (anexo 1.3)', f ? `${fmtNum(f[1], 1)} kW${f[2] ? ' · tipo ' + f[2] : ''}` : 'no es un valor normalizado del anexo 1.3')
        + fila('¿Cumple el punto 5.3? (empalme ≤ potencia instalada)', ok === null ? '—' : ok ? '✓ cumple' : '✗ el empalme supera la potencia instalada')
        + fila('Mayor empalme permitido para esa potencia instalada', mayor ? `${mayor[0]} A (${fmtNum(mayor[1], 1)} kW)` : 'menor al mínimo normalizado')
        + fila('Poder de corte mínimo de la protección (1,2 × Icc)', `${fmtNum(1.2 * v.icc, 2)} kA`, true)
        + fila('Superficie de reserva en recinto o armario (0,15 × X × Y)', `${fmtNum(0.15 * v.x * v.y, 2)} m²`)
        + `<p class="nota-calc">Monofásico hasta 40 A: tarifa BT-1; 50 y 63 A: tarifas residenciales distintas a BT-1. La potencia a contratar es ≈ 91 % de la potencia máxima en kVA.</p>`;
    },
  },
  tablero: {
    titulo: 'Chequeo de un tablero (RIC N°02)', desc: 'Ingresa los datos de tu tablero y revisa qué exige el pliego.',
    campos: [['circ', 'N° de circuitos', 12], ['inom', 'Corriente nominal del tablero (A)', 40], ['dom', 'Domiciliario (1 = sí, 0 = no)', 1], ['dist', 'Distancia al medidor del empalme (m)', 10], ['ntd', 'N° de tableros de distribución', 1], ['ind', 'Diferencial: In (A)', 40], ['suma', 'Suma de las In de los automáticos que dependen de él (A)', 36], ['ubic', 'Ubicación: 1 interior · 2 exterior bajo techo · 3 intemperie · 4 mojado', 1]],
    calc: v => {
      const si = '✓', no = '✗', req = 'Exigido';
      const ipTxt = { 1: 'IP 41 mínimo (6.1.21.2)', 2: 'IP 44 mínimo (6.1.21.3)', 3: 'IP 54 mínimo y entradas por abajo (6.1.21.3 y .6)', 4: 'IP X4 mínimo y 6,5 mm de la pared (6.1.21.4-.5)' }[Math.round(v.ubic)] || '—';
      const tg = v.ntd > 1 || v.dist > 30;
      return fila('Grado IP', ipTxt, true)
        + fila('Espacios de reserva (25 % por servicio, 6.1.16.3)', `${Math.ceil(v.circ * 0.25)} como mínimo`, true)
        + fila('Circuitos por protección general (máx. 25, 6.6.1)', v.circ <= 25 ? `${si} ${v.circ} circuitos` : `${no} ${v.circ}: divide en más protecciones generales`)
        + fila('Interruptor general omnipolar (6.6.2)', v.dom && v.circ <= 3 ? 'No exigido (domiciliario ≤ 3 circuitos)' : req)
        + fila('Luces piloto por fase (6.2.14)', v.dom && v.circ <= 3 ? 'No exigidas (domiciliario ≤ 3 circuitos)' : req)
        + fila('Bandejas portaconductores ≤ 50 % y regletas (6.1.16.1 y 6.2.12)', v.circ < 8 ? 'No exigidas (menos de 8 circuitos)' : req)
        + fila('Instrumentos de V e I por fase (6.2.13)', v.inom >= 100 ? req : 'No exigidos (menos de 100 A)')
        + fila('Tablero general (6.5.1-6.5.2)', tg ? `${req}: ${v.ntd > 1 ? 'hay más de un tablero de distribución' : 'el tablero está a más de 30 m del medidor'}` : 'No exigido')
        + fila('Diferencial protegido por la suma aguas abajo (6.2.6)', v.suma <= v.ind ? `${si} ${fmtNum(v.suma)} A ≤ ${fmtNum(v.ind)} A` : `${no} ${fmtNum(v.suma)} A > ${fmtNum(v.ind)} A: necesita un automático aguas arriba de ≤ ${fmtNum(v.ind)} A`, true)
        + fila('Verificaciones de diseño y rutina (6.10)', v.inom >= 1500 ? 'Según IEC 61439' : v.inom > 100 ? 'Según anexo 2.3 del RIC N°02' : 'Pruebas básicas (continuidad, aislación, diferenciales)')
        + fila('Altura de los dispositivos de comando (6.1.22)', 'Entre 0,45 m y 2,0 m del piso terminado');
    },
  },
};
function calcHTML(k) {
  const c = CALCS[k]; if (!c) return '';
  return `<div class="card calc" id="calc-${k}"><h3>${esc(c.titulo)} <span>${esc(c.desc)}</span></h3>
    <div class="calc-grid"><div class="calc-in">${c.campos.map(([id, lab, def]) => `<label>${esc(lab)}<input class="txt" type="number" step="any" data-calc="${k}" data-k="${id}" value="${def}"></label>`).join('')}</div>
    <div class="calc-out" id="res-${k}">${c.calc(Object.fromEntries(c.campos.map(([id, , def]) => [id, def])))}</div></div></div>`;
}
function pintarCalc(k) {
  const c = CALCS[k], out = $('#res-' + k); if (!c || !out) return;
  const v = {}; $$(`[data-calc="${k}"]`).forEach(inp => { v[inp.dataset.k] = Number(inp.value) || 0; });
  out.innerHTML = c.calc(v);
}
function vistaGlosario() {
  asegurarTarjetas();
  const filas = Object.values(INDICE).filter(it => it.tipo === 'termino' && cursoDe(it.clase_id) === CUR);
  return `<div class="head"><div><h1>📖 Glosario · ${CUR.nombre}</h1><p>${filas.length} términos hasta ahora, en español e inglés · los de clases bloqueadas aparecen atenuados</p></div>
    <button class="btn" data-act="repaso-verbos">📖 Practicar 20 al azar</button></div>
  <div class="acciones" style="margin:0 0 12px"><input class="txt" id="buscar" placeholder="Buscar término en español o inglés…" style="max-width:340px"></div>
  <div class="card"><table id="tverbos"><tr><th>Español</th><th>Inglés</th><th>Definición</th><th>Clase</th><th>Caja</th></tr>
  ${filas.map(it => {
    const t = S.vocab[it.id], lib = desbloqueada(it.clase_id);
    return `<tr data-buscar="${esc(sinTildes((it.es + ' ' + it.en + ' ' + it.definicion).toLowerCase()))}" style="${lib ? '' : 'opacity:.4'}">
      <td><b>${esc(it.es)}</b></td><td><i>${esc(it.en)}</i>${voz(it.en.replace(/\s*\(.*\)/, ''))}</td><td>${esc(it.definicion)}</td>
      <td>${nc(it.clase_id)}</td><td>${t ? `<span class="chip">${Math.min(t.caja, 6)}</span>` : '🔒'}</td></tr>`;
  }).join('')}</table></div>`;
}

/* ---------- Prueba escrita ---------- */
let P = null;
function vistaPrueba(id) {
  const c = claseDatos(id);
  if (!c || !desbloqueada(id)) return vistaClase(id, 'gramatica');
  if (!P || P.claseId !== id) P = { claseId: id, i: 0, resp: [], fin: null, items: prepararPrueba(c) };
  if (P.fin) return vistaResultado(c);
  const it = P.items[P.i], total = P.items.length, r = P.resp[P.i] || '';
  let campo;
  if (it.tipo === 'escritura') {
    const ev = evaluarEscritura(r, it.minPalabras, it.obligatorias);
    campo = `<textarea class="txt" data-campo="prueba" data-min="${it.minPalabras}" data-oblig="${esc(JSON.stringify(it.obligatorias))}" placeholder="${c.terminos ? 'Escribe aquí…' : 'Start writing here…'}">${esc(r)}</textarea>
      <div class="chips" id="chips-esc">${chipsEscritura(ev, it.minPalabras)}</div>`;
  } else campo = campoRespuesta(it, r, 'data-campo="prueba"', false);
  const ayuda = { verbo: 'Escribe solo la forma pedida.', completar: 'Escribe solo lo que falta (o la oración completa).',
    traducir: 'Traduce la oración completa al inglés.', corregir: 'Escribe la oración corregida completa.',
    escritura: 'Debes cumplir el mínimo de palabras y usar todas las palabras indicadas.',
    numero: 'Escribe solo el número (punto o coma para decimales). Se acepta un pequeño margen de redondeo.',
    texto: 'Escribe el término en español o en inglés (las tildes no importan).', alternativas: 'Elige una alternativa.', vf: 'Elige verdadero o falso.' }[it.tipo] || '';
  return `<div class="head"><div><p>${cursoDe(c.id).icono} ${cursoDe(c.id).nombre} · Clase ${nc(c.id)} · ${esc(c.titulo)}</p><h1>${c.formato === 'leccion' ? 'Desafío' : 'Prueba escrita'}</h1></div>
    <a class="btn sec" href="#/clase/${c.id}">✕ Salir</a></div>
  <div class="segs">${P.items.map((_, k) => `<i class="${k === P.i ? 'a' : P.resp[k] ? 'r' : ''}"></i>`).join('')}</div>
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
  const sinResp = P.items.length - P.items.filter((_, i) => (P.resp[i] || '').trim()).length;
  if (sinResp && !confirm(`Tienes ${sinResp} pregunta(s) sin responder. ¿Entregar igual?`)) return;
  const detalle = P.items.map((it, i) => {
    const r = P.resp[i] || '';
    if (it.tipo === 'escritura') { const ev = evaluarEscritura(r, it.minPalabras, it.obligatorias); return { it, r, ok: ev.ok, ev }; }
    return { it, r, ok: corregir(it, r) };
  });
  const correctas = detalle.filter(d => d.ok).length;
  const puntaje = Math.round(correctas * 100 / detalle.length), ok = puntaje >= NOTA_MINIMA;
  actualizarProgreso(c.id, puntaje, ok);
  registrarIntento({
    clase_id: c.id, titulo: c.titulo, tipo: 'prueba', puntaje, correctas, total: detalle.length, aprobado: ok,
    errores: detalle.filter(d => !d.ok).map(d => d.it.tipo === 'escritura'
      ? `Escritura: ${d.ev.palabras}/${d.it.minPalabras} palabras, faltó: ${d.ev.usadas.filter(u => !u.ok).map(u => u.w).join(', ') || '—'}`
      : `${d.it.pregunta} → "${d.r || '(vacío)'}" (correcto: ${respuestaTexto(d.it)})`),
    escritura: detalle.find(d => d.it.tipo === 'escritura')?.r || '',
  });
  if (ok) asegurarTarjetas();
  P.fin = { detalle, correctas, puntaje, ok };
  render(); scrollTo(0, 0);
}
function vistaResultado(c) {
  const f = P.fin, sig = claseMeta(c.id + 1);
  return `<div class="head"><div><p>Clase ${nc(c.id)} · ${esc(c.titulo)} · ${c.formato === 'leccion' ? 'Desafío' : 'Prueba escrita'}</p><h1>${f.ok ? '¡Aprobaste! 🎉' : 'Todavía no — ¡casi!'}</h1>
    <p>${f.ok ? (sig ? `Se desbloqueó la clase ${nc(sig.id)}: ${esc(sig.titulo)}. Sus tarjetas ya están en tu repaso.` : 'Completaste el curso.')
      : `Necesitas ${NOTA_MINIMA}%. Repasa los errores de abajo, practica y vuelve a intentarlo.`}</p></div>
    <div class="nota" style="color:${colorPct(f.puntaje)}">${f.puntaje}%</div></div>
  <div class="acciones" style="margin:0 0 18px">
    ${f.ok && sig ? `<a class="btn grande" href="#/clase/${sig.id}">Ir a la clase ${nc(sig.id)} →</a>` : ''}
    ${!f.ok ? `<button class="btn grande" data-act="prueba-reintentar">↺ Intentar de nuevo</button><a class="btn sec" href="#/clase/${c.id}/practica">Volver a practicar</a>` : ''}
    <a class="btn sec" href="#/panel">Ir al panel</a></div>
  <div class="card"><h3>Corrección <span>${f.correctas} de ${f.detalle.length} correctas</span></h3>
    <div class="ejer">${f.detalle.map((d, i) => `<div class="item ${d.ok ? 'bien' : 'mal'}"><div class="nn">${i + 1}</div><div>
      <div class="tipo">${TIPOS[d.it.tipo] || d.it.tipo}</div><div class="q">${esc(d.it.pregunta)}</div>
      ${d.it.tipo === 'escritura'
        ? `<div class="escrito">${esc(d.r) || '<i>(vacío)</i>'}</div><div class="chips">${chipsEscritura(d.ev, d.it.minPalabras)}</div>`
        : `<div>Tu respuesta: <span class="mono ${d.ok ? 'ok' : 'bad'}">${esc(d.r) || '(vacío)'}</span></div>
           ${d.ok ? '' : `<div class="fb">Correcto: <b class="mono ok">${esc(respuestaTexto(d.it))}</b>${cursoDe(c.id).id === 'ingles' ? voz(d.it.respuestas[0]) : ''}</div>`}
           ${d.it.explicacion ? `<div class="expl">💡 ${esc(d.it.explicacion)}</div>` : ''}`}
    </div></div>`).join('')}</div></div>`;
}

/* ---------- Repaso con repetición espaciada ---------- */
let R = null;
// modo: 'hoy' (pendientes) · 'verbos' (verbos al azar) · 'clase' (todas las tarjetas de una clase, para preparar la prueba)
function iniciarRepaso(modo, claseId) {
  asegurarTarjetas();
  const ids = modo === 'verbos' ? barajar(tarjetas().filter(t => esConceptos() || t.tipo === 'verbo')).slice(0, TARJETAS_POR_SESION).map(t => t.id)
    : modo === 'clase' ? barajar(tarjetas().filter(t => t.clase_id === claseId)).sort((a, b) => a.caja - b.caja).slice(0, TARJETAS_POR_SESION).map(t => t.id)
    : barajar(pendientesHoy()).sort((a, b) => a.caja - b.caja).slice(0, TARJETAS_POR_SESION).map(t => t.id);
  // 🎧 modo escuchar: ~1 de cada 3 palabras ya conocidas (caja ≥ 2) se dicta en vez de mostrarse en español
  const escuchar = new Set(HAY_VOZ && !esConceptos() ? ids.filter(id => S.vocab[id].tipo !== 'verbo' && S.vocab[id].caja >= 2 && Math.random() < 0.35) : []);
  R = { cola: ids, pos: 0, modo, claseId, res: null, primeros: {}, reencolados: new Set(), snap: null, fin: null, escuchar, sonado: -1, mostrar: false, inst: {}, selOp: undefined };
  if (location.hash !== '#/repaso') location.hash = '#/repaso'; else render();
}
function vistaRepaso() {
  if (!R || R.fin) {
    asegurarTarjetas();
    const due = pendientesHoy().length, fin = R?.fin;
    return `<div class="head"><div><h1>${CUR.icono} Repaso · ${CUR.nombre}</h1><p>Repetición espaciada: cada tarjeta vuelve justo antes de que la olvides.</p></div></div>
    ${fin ? `<div class="card" style="margin-bottom:16px"><h3>Sesión terminada <span>${fin.ok} de ${fin.total} a la primera</span></h3>
      <div class="nota" style="color:${colorPct(fin.total ? fin.ok * 100 / fin.total : 0)}">${fin.total ? Math.round(fin.ok * 100 / fin.total) : 0}%</div>
      ${fin.errores.length ? `<p style="margin-top:10px;color:var(--sub)">Estas vuelven mañana:</p><div class="chips">${fin.errores.map(e => `<span class="chip rojo">${esc(e)}</span>`).join('')}</div>` : ''}</div>` : ''}
    <div class="card"><h3>${due ? `Tienes ${due} tarjeta${due > 1 ? 's' : ''} para hoy` : 'Nada pendiente por hoy ✓'}</h3>
      <p style="color:var(--sub)">${due ? `Sesiones de hasta ${TARJETAS_POR_SESION} tarjetas. Primero las más difíciles.` : 'Vuelve mañana o sigue avanzando con tu clase. Si quieres, practica igual.'}</p>
      <div class="acciones">${due ? `<button class="btn grande" data-act="repaso-iniciar">↻ Empezar repaso</button>` : ''}
        ${claseActual() && claseDatos(claseActual().id) ? `<button class="btn sec" data-act="repaso-clase" data-id="${claseActual().id}">📘 Practicar clase ${nc(claseActual().id)}</button>` : ''}
        <button class="btn sec" data-act="repaso-verbos">${esConceptos() ? '📖 Practicar conceptos al azar' : '⚡ Practicar verbos al azar'}</button></div>
      <p style="color:var(--sub);font-size:13px;margin-top:12px">Las tarjetas nuevas entran de a ${NUEVAS_POR_DIA} por día para no saturarte. ${esConceptos()
        ? '💡 Vuelven las ideas y los procedimientos de tus lecciones: preguntas de aplicación con números nuevos y su explicación.'
        : '🎧 Algunas palabras que ya conoces te las dictará la voz.'}</p></div>`;
  }
  const id = R.cola[R.pos], t = S.vocab[id], info = INDICE[id], res = R.res;
  if (t.tipo === 'concepto') return vistaTarjetaConcepto(id, t, info, res);
  let campos;
  if (t.tipo === 'verbo') {
    const nombres = ['Base', 'Pasado', 'Participio'], formas = [info.verbo.base, info.verbo.pasado, info.verbo.participio];
    campos = `<div class="tres">${nombres.map((n, k) => {
      const v = res ? res.campos[k] : '', clase = res ? (formaOk(v, formas[k]) ? 'bien' : 'mal') : '';
      return `<div><label>${n}</label><input class="txt ${clase}" data-campo="tarjeta" value="${esc(v)}" ${res ? 'disabled' : ''} autocomplete="off" autocapitalize="off" spellcheck="false"></div>`;
    }).join('')}</div>`;
  } else if (t.tipo === 'formula') {
    campos = R.mostrar || res ? `<pre class="formula">${esc(info.en)}</pre>${info.ejemplo ? `<div class="ej" style="margin-top:6px">Ej.: ${esc(info.ejemplo)}</div>` : ''}` : '';
  } else {
    campos = `<input class="txt ${res ? (res.ok ? 'bien' : 'mal') : ''}" data-campo="tarjeta" value="${esc(res ? res.campos[0] : '')}" ${res ? 'disabled' : ''} placeholder="${t.tipo === 'termino' ? 'Escribe el término (español o inglés)…' : 'Escribe en inglés…'}" autocomplete="off" autocapitalize="off" spellcheck="false">`;
  }
  const oir = R.escuchar.has(id);
  const etiqueta = t.tipo === 'verbo' ? 'Verbo · escribe las 3 formas' : t.tipo === 'termino' ? '📖 ¿Qué término es?' : t.tipo === 'formula' ? '🧮 ¿Cuál es la fórmula o regla?'
    : oir ? '🎧 Escucha y escribe lo que oyes' : `${TIPOS[t.tipo]} · escríbelo en inglés`;
  const titulo = R.modo === 'verbos' ? (esConceptos() ? 'Práctica de conceptos' : 'Práctica de verbos') : R.modo === 'clase' ? `Práctica · Clase ${nc(R.claseId)}` : 'Repaso de hoy';
  const enunciado = t.tipo === 'termino' ? `<div class="w def">${esc(info.definicion)}</div>` : `<div class="w">${esc(t.es)}</div>`;
  const respuestaOk = t.tipo === 'termino' ? `${esc(info.es)} · <i>${esc(info.en)}</i>${voz(info.en.replace(/\s*\(.*\)/, ''))}` : t.tipo === 'formula' ? '' : `${esc(t.en)}${voz(formasVoz(t.en))}`;
  return `<div class="tarjeta">
    <div class="prog"><span>${titulo}</span><span>${Math.min(R.pos + 1, R.cola.length)} / ${R.cola.length}</span></div>
    <div class="pbar"><i style="width:${R.pos / R.cola.length * 100}%"></i></div>
    <div class="flash"><span class="caja chip">Caja ${Math.min(t.caja, 6)}</span><div class="etq">${etiqueta}</div>
      ${oir && !res ? `<div class="w"><button class="btn sec grande" data-act="hablar" data-t="${esc(t.en)}">🔊 Escuchar de nuevo</button></div>` : enunciado}${campos}
      ${res ? `${t.tipo === 'formula' ? `<div class="resultado ${res.ok ? 'bien' : 'mal'}">${res.ok ? '✓ ¡Bien! La sabías.' : '✗ Vuelve mañana para reforzarla.'}</div>`
          : `<div class="resultado ${res.ok ? 'bien' : 'mal'}">
          ${res.ok ? '✓ ¡Correcto!' : res.casi ? '✗ ¡Casi! Revisa la ortografía:' : '✗ La respuesta es:'} <b class="mono">${respuestaOk}</b>
          ${info.ejemplo ? `<div class="ej">${esc(info.ejemplo)}${voz(info.ejemplo)}</div>` : ''}</div>`}
        <div class="acciones"><button class="btn grande" data-act="tarjeta-sig" id="btn-sig">Siguiente → <small style="opacity:.7">(Enter)</small></button>
          ${!res.ok && !res.noSe && t.tipo !== 'formula' ? `<button class="link" data-act="tarjeta-tenia-razon">Tenía razón (fue un error de tipeo)</button>` : ''}</div>`
        : t.tipo === 'formula' ? (R.mostrar
          ? `<div class="acciones"><button class="btn grande" data-act="tarjeta-autoeval" data-ok="1">✓ La sabía</button><button class="btn peligro grande" data-act="tarjeta-autoeval" data-ok="0">✗ No la sabía</button></div>`
          : `<div class="acciones"><button class="btn grande" data-act="tarjeta-mostrar" id="btn-sig">Mostrar respuesta <small style="opacity:.7">(Enter)</small></button></div>`)
        : `<div class="acciones"><button class="btn grande" data-act="tarjeta-comprobar">Comprobar <small style="opacity:.7">(Enter)</small></button>
          <button class="btn sec" data-act="tarjeta-nose">No sé</button></div>`}
    </div></div>`;
}
// Tarjeta de comprensión (clases en formato lección): una pregunta de aplicación con su explicación
function vistaTarjetaConcepto(id, t, info, res) {
  const it = R.inst[id] || (R.inst[id] = instanciar(info.q));
  const titulo = R.modo === 'clase' ? `Práctica · Clase ${nc(R.claseId)}` : R.modo === 'verbos' ? 'Práctica al azar' : 'Repaso de hoy';
  const campo = it.opciones
    ? `<div class="ops ${it.opciones.some(o => o.length > 24) ? 'largas' : ''}">${it.opciones.map(o => `<button class="op ${res ? (o === R.selOp ? (res.ok ? 'sel bien' : 'sel mal') : it.respuestas.includes(o) ? 'correcta' : '') : ''}" data-act="rep-op" data-v="${esc(o)}" ${res ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`
    : `<div class="num-campo" style="max-width:380px">${it.unidad === '$' ? '<span>$</span>' : ''}<input class="txt ${res ? (res.ok ? 'bien' : 'mal') : ''}" data-campo="tarjeta" value="${esc(res ? res.campos[0] : '')}" ${res ? 'disabled' : ''} ${it.tipo === 'numero' ? 'inputmode="decimal"' : ''} autocomplete="off" placeholder="Tu respuesta…">${it.unidad && it.unidad !== '$' ? `<span>${esc(it.unidad)}</span>` : ''}</div>`;
  return `<div class="tarjeta">
    <div class="prog"><span>${titulo}</span><span>${Math.min(R.pos + 1, R.cola.length)} / ${R.cola.length}</span></div>
    <div class="pbar"><i style="width:${R.pos / R.cola.length * 100}%"></i></div>
    <div class="flash"><span class="caja chip">Caja ${Math.min(t.caja, 6)}</span><div class="etq">💡 Clase ${nc(t.clase_id)} · ${esc(TIPOS[it.tipo] || 'Pregunta')}</div>
      <div class="w def">${md(it.pregunta)}</div>${campo}
      ${res ? `<div class="resultado ${res.ok ? 'bien' : 'mal'}">${res.ok ? '✓ ¡Correcto!' : '✗ La respuesta es:'} <b>${esc(respuestaTexto(it))}</b>${it.explicacion ? `<div class="ej">${md(it.explicacion)}</div>` : ''}</div>
        <div class="acciones"><button class="btn grande" data-act="tarjeta-sig" id="btn-sig">Siguiente → <small style="opacity:.7">(Enter)</small></button></div>`
      : `<div class="acciones">${it.opciones ? '' : '<button class="btn grande" data-act="tarjeta-comprobar">Comprobar <small style="opacity:.7">(Enter)</small></button>'}
          <button class="btn sec" data-act="tarjeta-nose">No sé</button></div>`}
    </div></div>`;
}
function comprobarTarjeta(noSe) {
  const id = R.cola[R.pos], t = S.vocab[id], info = INDICE[id];
  const campos = $$('[data-campo="tarjeta"]').map(i => i.value);
  if (t.tipo === 'concepto') {
    const it = R.inst[id], v = R.selOp ?? (campos[0] || '');
    const ok = !noSe && corregir(it, v);
    R.res = { ok, casi: false, campos: [v], noSe };
    calificar(id, ok, noSe ? '(no sé)' : String(v));
    render(); return;
  }
  let ok, casi = false, error;
  if (t.tipo === 'verbo') {
    const formas = [info.verbo.base, info.verbo.pasado, info.verbo.participio];
    ok = !noSe && formas.every((f, k) => formaOk(campos[k], f));
    error = campos.map(c => c.trim() || '—').join(' – ');
  } else {
    const a = normalizar(campos[0]), validas = (t.tipo === 'termino' ? aceptadasTermino(info) : [t.en]).map(x => normalizar(x));
    ok = !noSe && validas.includes(a);
    casi = !ok && !noSe && a.length > 2 && validas.some(b => distancia(a, b) <= 2);
    error = campos[0].trim() || '—';
  }
  R.res = { ok, casi, campos, noSe };
  calificar(id, ok, noSe ? '(no sé)' : error);
  render();
}
// "CPI (consumer price index)" → acepta "CPI", "consumer price index" y el texto completo
const aceptadasTermino = info => [info.es, info.en, ...String(info.en).replace(/\)/g, '').split(/\s*\(\s*/)];
function autoevaluar(ok) {
  const id = R.cola[R.pos];
  R.res = { ok, casi: false, campos: [], noSe: !ok };
  calificar(id, ok, ok ? '' : '(no la sabía)');
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
    if (tocaHoy) { t.caja = Math.min(t.caja + 1, 6); t.proxima_revision = sumarDias(INTERVALOS[t.caja - 1]); } // practicar antes de tiempo no adelanta la caja
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
  R.pos++; R.res = null; R.mostrar = false; R.selOp = undefined;
  if (R.pos >= R.cola.length) {
    const ids = Object.keys(R.primeros), ok = ids.filter(i => R.primeros[i].ok).length;
    const etiquetaT = i => esConceptos() ? S.vocab[i].es : S.vocab[i].en;
    const errores = ids.filter(i => !R.primeros[i].ok).map(etiquetaT);
    registrarIntento({ clase_id: CUR.base - 1, titulo: `${CUR.nombre} · ${R.modo === 'verbos' ? 'Práctica al azar' : R.modo === 'clase' ? 'Práctica de clase' : 'Repaso'}`, tipo: 'repaso',
      puntaje: ids.length ? Math.round(ok * 100 / ids.length) : 0, correctas: ok, total: ids.length,
      aprobado: ids.length ? ok * 100 / ids.length >= NOTA_MINIMA : false,
      errores: ids.filter(i => !R.primeros[i].ok).map(i => `${etiquetaT(i)}: ${R.primeros[i].error}`) });
    enviarVocab(ids.map(i => S.vocab[i]));
    R.fin = { ok, total: ids.length, errores };
  }
  render();
}

/* ---------- Otras páginas ---------- */
function vistaVerbos() {
  if (esConceptos()) return vistaGlosario();
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
  const ps = S.intentos.filter(i => i.tipo === 'prueba' && cursoDe(i.clase_id) === CUR).slice().reverse();
  return `<div class="head"><div><h1>${CUR.icono} Pruebas · ${CUR.nombre}</h1><p>Historial de todas tus pruebas escritas</p></div></div>
  <div class="card">${ps.length ? `<table><tr><th>Fecha</th><th>Clase</th><th>Puntaje</th><th>Resultado</th><th>Errores</th></tr>
    ${ps.map(i => `<tr><td>${fechaCorta(i.fecha)}</td><td>${nc(i.clase_id)} · ${esc(claseMeta(i.clase_id)?.titulo || '')}</td>
      <td class="num" style="font-weight:700;color:${colorPct(i.puntaje)}">${i.puntaje}%</td>
      <td>${i.aprobado ? '<span class="chip verde">Aprobada</span>' : '<span class="chip rojo">No aprobada</span>'}</td>
      <td style="font-size:12.5px;color:var(--sub)">${i.errores.length ? i.errores.map(esc).join('<br>') : '—'}</td></tr>`).join('')}</table>`
    : '<div class="vacio">Aún no has rendido pruebas.</div>'}</div>`;
}
function vistaEscritos() {
  const es = S.intentos.filter(i => i.escritura && cursoDe(i.clase_id) === CUR).slice().reverse();
  return `<div class="head"><div><h1>${CUR.icono} Mis escritos · ${CUR.nombre}</h1><p>${esConceptos() ? 'Todo lo que has explicado con tus palabras. Explicar es la mejor prueba de que entendiste.' : 'Todo lo que has escrito en inglés. Relee tus textos antiguos: verás cuánto has avanzado.'}</p></div></div>
  ${es.length ? es.map(i => `<div class="card" style="margin-bottom:14px"><h3>Clase ${nc(i.clase_id)} · ${esc(claseMeta(i.clase_id)?.titulo || '')}
    <span>${i.tipo === 'prueba' ? 'Prueba' : 'Escritura'} · ${fechaCorta(i.fecha)} · ${contarPalabras(i.escritura)} palabras</span></h3>
    <div class="escrito">${esc(i.escritura)}</div></div>`).join('')
    : `<div class="card"><div class="vacio">Todavía no hay escritos. Ve a la pestaña <b>${esConceptos() ? 'Explícalo' : 'Escritura'}</b> de tu clase.</div></div>`}`;
}
function vistaConfig() {
  return `<div class="head"><div><h1>Configuración</h1><p>Conexión con Google Sheets y respaldo</p></div>
    <span class="chip azul" style="font-size:13px">Saber Lab v${APP_VERSION} · ${APP_FECHA}</span></div>
  <div class="cfg">
    <div class="card cfg">
      <label>Tu nombre<input class="txt" id="cfg-nombre" value="${esc(S.config.nombre)}"></label>
      <label>URL de la aplicación web de Apps Script<small>Termina en <span class="mono">/exec</span>. Ver <span class="mono">06_Google_Sheets/Instrucciones_conexion.md</span></small>
        <input class="txt mono" id="cfg-url" value="${esc(S.config.url)}" placeholder="https://script.google.com/macros/s/…/exec"></label>
      <label>Clave (TOKEN)<small>La misma que pusiste en Code.gs</small><input class="txt mono" id="cfg-token" type="password" value="${esc(S.config.token)}"></label>
      <div class="acciones"><button class="btn" data-act="cfg-guardar">Guardar y probar conexión</button><span id="cfg-msg"></span></div>
    </div>
    <div class="card cfg"><h3>🔊 Voz en inglés <span>se usa en English y en los términos en inglés de Finanzas y RIC</span></h3>
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
function cambiarCurso(id, irAlPanel = true) {
  if (!CURSOS[id]) return;
  S.config.curso = id; guardarLocal(); CUR = CURSOS[id]; R = null; P = null; PR = null;
  if (irAlPanel && location.hash !== '#/panel') location.hash = '#/panel'; else render();
}
function pintarCursos() {
  const el = $('#cursos'); if (!el) return;
  el.innerHTML = Object.values(CURSOS).map(c => `<button class="cur ${c === CUR ? 'on' : ''}" data-act="curso" data-c="${c.id}" title="${c.nombre}">${c.icono} ${c.corto || c.nombre}</button>`).join('');
  const v = $('[data-ruta="verbos"]'); if (v) v.innerHTML = esConceptos() ? '📖 Glosario' : '⚡ Verbos';
}
function render() {
  const [ruta = 'panel', a, b] = location.hash.replace(/^#\/?/, '').split('/');
  // si se abre una clase de otro curso (link directo), se cambia a ese curso
  if ((ruta === 'clase' || ruta === 'prueba') && claseMeta(+a) && cursoDe(+a) !== CUR) { S.config.curso = cursoDe(+a).id; CUR = cursoDe(+a); R = null; guardarLocal(); }
  pintarCursos();
  $$('.links a').forEach(l => l.classList.toggle('on', l.dataset.ruta === (ruta === 'clase' || ruta === 'prueba' ? 'clases' : ruta)));
  const vistas = {
    panel: vistaPanel, clases: vistaClases, clase: () => vistaClase(+a, b || ''), prueba: () => vistaPrueba(+a),
    repaso: vistaRepaso, verbos: vistaVerbos, pruebas: vistaPruebas, escritos: vistaEscritos, config: vistaConfig,
  };
  $('#main').innerHTML = (vistas[ruta] || vistaPanel)();
  pintarSelectorVoz();
  pintarSync();
  // foco automático
  const sig = $('#btn-sig');
  if (R && !R.fin && !R.res && ruta === 'repaso' && R.escuchar.has(R.cola[R.pos]) && R.sonado !== R.pos) {
    R.sonado = R.pos; hablar(S.vocab[R.cola[R.pos]].en);
  }
  if (sig) sig.focus();
  else { const f = $('[data-campo="tarjeta"]:not([disabled]), [data-campo="prueba"]'); if (f) f.focus(); }
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case 'hablar': hablar(el.dataset.t); break;
    case 'curso': cambiarCurso(el.dataset.c); break;
    case 'tarjeta-mostrar': R.mostrar = true; render(); break;
    case 'rep-op': R.selOp = el.dataset.v; comprobarTarjeta(false); break;
    case 'tarjeta-autoeval': autoevaluar(el.dataset.ok === '1'); break;
    case 'ocultar': $('#tverbos')?.classList.toggle('oculto'); break;
    case 'ver': el.classList.toggle('ver'); break;
    case 'opcion':
      if (el.dataset.campo === 'practica') PR.resp[el.dataset.i] = el.dataset.v;
      else if (el.dataset.campo === 'prueba') P.resp[P.i] = el.dataset.v;
      render(); break;
    case 'practica-revisar': {
      PR.revisado = true; render();
      const c = claseDatos(PR.claseId), ok = c.practica.filter((it, i) => corregir(it, PR.resp[i])).length;
      registrarIntento({ clase_id: c.id, titulo: c.titulo, tipo: 'practica', puntaje: Math.round(ok * 100 / c.practica.length), correctas: ok,
        total: c.practica.length, aprobado: ok * 100 / c.practica.length >= NOTA_MINIMA,
        errores: c.practica.filter((it, i) => !corregir(it, PR.resp[i])).map(it => `${it.pregunta} → ${respuestaTexto(it)}`) });
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
    case 'repaso-clase': iniciarRepaso('clase', +el.dataset.id); break;
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
      a.download = `respaldo-saber-lab-${hoy()}.json`; a.click();
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
  else if (el.dataset.calc) pintarCalc(el.dataset.calc);
  else if (el.id === 'buscar') {
    const q = sinTildes(el.value.trim().toLowerCase());
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
    const total = P.items.length;
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
