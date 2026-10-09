'use strict';
/* =====================================================================
   Lecciones guiadas — cursos de comprensión (Finanzas y Norma RIC)
   Método: 01_Investigacion/Metodo_cursos_tecnicos.md
   Se carga ANTES de app.js; usa sus funciones (esc, fmtNum, corregir, render…) solo al ejecutarse.

   Una clase en formato 'leccion' trae:
     gancho · leccion[pasos] · caso{titulo, contexto, pasos} · desafio[preguntas] · repaso[preguntas]
     ficha{ideas, formulas, normas} · accion · terminos (consulta) · calculadoras · fuentes
   Tipos de paso: texto · norma · predice · pregunta · turno · ejemplo · calc · reflexion · resumen
   Preguntas con números variables: params {x: [min, max, paso]} + formula "expresión JS" + {x} / {=expr} en los textos
   ===================================================================== */

/* ---------- Números variables ---------- */
function valoresParams(params) {
  const v = {};
  for (const [k, [min, max, paso]] of Object.entries(params || {})) {
    const n = Math.round((max - min) / paso);
    v[k] = +(min + paso * Math.floor(Math.random() * (n + 1))).toFixed(6);
  }
  return v;
}
function evaluar(expr, vals) {
  try { return Function(...Object.keys(vals), `return (${expr});`)(...Object.values(vals)); } catch (e) { return NaN; }
}
function rellenar(txt, vals) {
  if (txt == null || !vals) return txt;
  return String(txt)
    .replace(/\{=([^}]+)\}/g, (_, e) => fmtNum(evaluar(e, vals)))
    .replace(/\{(\w+)\}/g, (m, k) => (k in vals ? fmtNum(vals[k]) : m));
}
function instanciar(it, vals) {
  if (!it || !it.params) return it;
  vals = vals || valoresParams(it.params);
  const o = { ...it, vals };
  for (const k of ['pregunta', 'enunciado', 'explicacion', 'pista']) if (it[k]) o[k] = rellenar(it[k], vals);
  if (it.formula) { o.respuesta = evaluar(it.formula, vals); if (it.decimales != null) o.respuesta = +o.respuesta.toFixed(it.decimales); }
  if (it.opciones) o.opciones = it.opciones.map(x => rellenar(x, vals));
  if (it.respuestas) o.respuestas = it.respuestas.map(x => rellenar(x, vals));
  return o;
}
const prepararPrueba = c => (c.desafio || c.prueba).map(it => instanciar(it));

/* ---------- Texto con formato mínimo: **negrita**, saltos y viñetas ---------- */
function md(t) {
  return esc(t || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|\n)- /g, '$1• ').replace(/\n/g, '<br>');
}

/* ---------- Estado de cada lección (se guarda en este navegador) ---------- */
const PREGUNTAS_LEC = ['predice', 'pregunta', 'turno'];
const BLOQUEAN = ['predice', 'pregunta', 'turno', 'ejemplo', 'reflexion'];
function estadoLec(c, parte) {
  S.lecciones = S.lecciones || {};
  const k = c.id + ':' + parte;
  return S.lecciones[k] || (S.lecciones[k] = { paso: 0, res: {}, rev: {}, vals: {}, completada: false });
}
const pasosDe = (c, parte) => (parte === 'caso' ? c.caso.pasos : c.leccion);
function instLec(c, parte, i) {
  const E = estadoLec(c, parte), p = pasosDe(c, parte)[i];
  if (p.params && !E.vals[i]) { E.vals[i] = valoresParams(p.params); guardarLocal(); }
  // el 'tipo' del paso (predice/pregunta/turno) no es el tipo de respuesta: este se toma de 'como' o se deduce
  const como = p.como || (p.opciones ? 'alternativas' : (p.respuesta != null || p.formula) ? 'numero' : 'texto');
  return { ...instanciar(p, E.vals[i]), tipo: como };
}
function pasoListo(p, r, rev) {
  if (!BLOQUEAN.includes(p.tipo)) return true;
  if (p.tipo === 'ejemplo') return (rev || 0) >= p.pasos.length;
  return !!(r && (r.ok || r.visto));
}

/* ---------- Vista de la lección / caso ---------- */
function vistaLeccion(c, parte) {
  const pasos = pasosDe(c, parte), E = estadoLec(c, parte);
  if (E.paso >= pasos.length) E.paso = pasos.length - 1;
  const i = E.paso, p = pasos[i], listo = pasoListo(p, E.res[i], E.rev[i]);
  const intro = parte === 'caso'
    ? `<div class="gancho"><b>🧩 ${esc(c.caso.titulo)}</b><br>${md(c.caso.contexto)}</div>`
    : (i === 0 && c.gancho ? `<div class="gancho"><b>🎯 La situación</b><br>${md(c.gancho)}</div>` : '');
  const segs = pasos.map((q, k) => {
    const r = E.res[k], cls = k === i ? 'a' : !pasoListo(q, r, E.rev[k]) ? '' : PREGUNTAS_LEC.includes(q.tipo) ? (r.primero ? 'ok' : 'mal') : 'r';
    return `<i class="${cls}" title="Paso ${k + 1}"></i>`;
  }).join('');
  const fin = E.completada ? `<div class="aviso" style="background:var(--verde-bg);color:#0f5323">✓ ${parte === 'caso' ? 'Caso resuelto' : 'Lección completada'}.
      ${parte === 'leccion' ? (c.caso ? 'Sigue con el <b>🧩 Caso práctico</b> y luego el <b>✎ Desafío</b>.' : '') : 'Ya puedes rendir el <b>✎ Desafío</b>.'}
      <button class="link" data-act="lec-reiniciar" data-parte="${parte}">Repasar desde el inicio</button></div>` : '';
  return `${fin}${intro}
    <div class="lec-prog">${segs}</div>
    <div class="paso card">${renderPaso(c, parte, p, i, E)}</div>
    <div class="acciones lec-nav">
      <button class="btn sec" data-act="lec-prev" data-parte="${parte}" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
      ${i < pasos.length - 1
        ? `<button class="btn" id="lec-sig" data-act="lec-next" data-parte="${parte}" ${listo ? '' : 'disabled'}>Continuar →</button>`
        : `<button class="btn" data-act="lec-fin" data-parte="${parte}" ${listo ? '' : 'disabled'}>${E.completada ? '✓ Completada' : 'Terminar ✓'}</button>`}
      <span class="lec-cuenta">Paso ${i + 1} de ${pasos.length}${listo ? '' : '<span class="lec-falta"> · responde para continuar</span>'}</span></div>`;
}

function renderPaso(c, parte, p, i, E) {
  const dg = p.diagrama ? diagrama(p.diagrama) : '';
  const d = dg ? `<div class="diag">${dg}</div>${dg.startsWith('<svg') ? '<div class="diag-hint">↔ Desliza el diagrama para verlo completo</div>' : ''}` : '';
  const porque = p.porque ? `<div class="porque">💡 <b>Por qué importa:</b> ${md(p.porque)}</div>` : '';
  switch (p.tipo) {
    case 'texto':
      return `<h3 class="paso-t">${esc(p.titulo)}</h3><div class="paso-c">${md(p.texto)}</div>${d}${porque}`;
    case 'norma':
      return `<h3 class="paso-t">📘 ${esc(p.titulo || 'Lo que dice la norma')}</h3>
        <div class="norma"><div class="norma-ref">${esc(p.ref)}</div><blockquote>“${esc(p.cita)}”</blockquote></div>
        <div class="paso-c"><b>En simple:</b> ${md(p.simple)}</div>${d}${porque}`;
    case 'predice': case 'pregunta': case 'turno':
      return renderPreguntaLec(c, parte, p, i, E, d);
    case 'ejemplo': {
      const n = E.rev[i] || 0;
      return `<h3 class="paso-t">📐 Ejemplo resuelto${p.titulo ? ': ' + esc(p.titulo) : ''}</h3>
        <div class="paso-c">${md(p.planteamiento)}</div>${d}
        <div class="ej-pasos">${p.pasos.slice(0, n).map((s, k) => `<div class="ej-paso"><span>${k + 1}</span><div>${md(s.texto)}${s.calculo ? `<pre class="formula">${esc(s.calculo)}</pre>` : ''}</div></div>`).join('')}</div>
        ${n < p.pasos.length
          ? `<button class="btn sec" data-act="lec-rev" data-parte="${parte}">${n === 0 ? 'Ver el primer paso' : 'Ver el siguiente paso'} (${n + 1}/${p.pasos.length})</button>`
          : (p.resultado ? `<div class="resultado bien">✓ ${md(p.resultado)}</div>` : '')}`;
    }
    case 'calc':
      return `<h3 class="paso-t">🧮 ${esc(p.titulo || 'Experimenta')}</h3><div class="paso-c">${md(p.tarea)}</div>${calcHTML(p.calc)}`;
    case 'reflexion': {
      const r = E.res[i] || {}, palabras = contarPalabras(r.txt || '');
      return `<h3 class="paso-t">🗣️ Explícalo con tus palabras</h3><div class="paso-c">${md(p.consigna)}</div>
        <textarea class="txt" data-campo="lec-txt" data-i="${i}" data-parte="${parte}" placeholder="Escribe tu explicación aquí…" ${r.visto ? 'readonly' : ''}>${esc(r.txt || '')}</textarea>
        ${r.visto
          ? `<div class="aviso azul" style="margin-top:12px"><b>Respuesta experta:</b><br>${md(p.modelo)}</div>
             ${p.claves ? `<div class="paso-c"><b>¿Tu explicación incluía…?</b><ul class="claves">${p.claves.map(k => `<li>☐ ${md(k)}</li>`).join('')}</ul>
             <span style="color:var(--sub);font-size:13px">Si te faltó algo, vuelve a leerlo: explicar lo que entendiste es la mejor forma de fijarlo.</span></div>` : ''}`
          : `<div class="acciones"><button class="btn sec" data-act="lec-reflex" data-parte="${parte}" ${palabras < 15 ? 'disabled' : ''} id="btn-reflex">Comparar con la respuesta experta</button>
             <span style="color:var(--sub);font-size:13px" id="reflex-cuenta">${palabras} palabras · escribe al menos 15</span></div>`}`;
    }
    case 'resumen':
      return `<h3 class="paso-t">📌 ${esc(p.titulo || 'Lo que aprendiste')}</h3><ul class="resumen">${p.puntos.map(x => `<li>${md(x)}</li>`).join('')}</ul>
        ${c.accion && parte === 'leccion' ? `<div class="accion">✅ <b>Aplícalo esta semana:</b> ${md(c.accion)}</div>` : ''}`;
  }
  return '';
}

function renderPreguntaLec(c, parte, p, i, E, d) {
  const it = instLec(c, parte, i), r = E.res[i] || {}, cerrado = r.ok || r.visto;
  const cab = { predice: '🤔 Predice antes de seguir', pregunta: '❓ Compruébalo', turno: '✍️ Tu turno' }[p.tipo];
  let campo;
  if (it.opciones) {
    campo = `<div class="ops ${it.opciones.some(o => o.length > 24) ? 'largas' : ''}">${it.opciones.map(o => {
      const cls = r.v === o ? (r.ok ? 'sel bien' : 'sel mal') : (cerrado && it.respuestas.includes(o) ? 'correcta' : '');
      return `<button class="op ${cls}" data-act="lec-op" data-parte="${parte}" data-v="${esc(o)}" ${cerrado ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('')}</div>`;
  } else {
    campo = `<div class="num-campo" style="max-width:380px">${it.unidad === '$' ? '<span>$</span>' : ''}
      <input class="txt ${r.intentos ? (r.ok ? 'bien' : 'mal') : ''}" data-campo="lec" data-parte="${parte}" value="${esc(r.borrador ?? r.v ?? '')}" ${it.tipo === 'numero' ? 'inputmode="decimal"' : ''} autocomplete="off" ${cerrado ? 'disabled' : ''} placeholder="${it.tipo === 'numero' ? 'Escribe el número…' : 'Escribe tu respuesta…'}">
      ${it.unidad && it.unidad !== '$' ? `<span>${esc(it.unidad)}</span>` : ''}</div>
      ${cerrado ? '' : `<div class="acciones"><button class="btn" data-act="lec-check" data-parte="${parte}">Comprobar</button></div>`}`;
  }
  let fb = '';
  if (r.ok) fb = `<div class="resultado bien">✓ ¡Correcto!${it.explicacion ? `<div class="ej">${md(it.explicacion)}</div>` : ''}</div>`;
  else if (r.visto) fb = `<div class="resultado ${p.tipo === 'predice' ? '' : 'mal'}" ${p.tipo === 'predice' ? 'style="background:var(--azul-bg);color:#0a3069"' : ''}>
      ${p.tipo === 'predice' ? '🤔 Era para predecir: lo importante es lo que viene.' : '✗ La respuesta correcta es:'} <b>${esc(respuestaTexto(it))}</b>${it.explicacion ? `<div class="ej">${md(it.explicacion)}</div>` : ''}</div>`;
  else if (r.intentos) fb = `<div class="resultado mal">✗ No es correcto${r.intentos === 1 ? ', inténtalo otra vez.' : '.'}
      ${it.pista ? `<div class="ej">💡 Pista: ${md(it.pista)}</div>` : ''}
      ${r.intentos >= 2 ? `<div style="margin-top:8px"><button class="link" data-act="lec-ver" data-parte="${parte}">Ver la respuesta y la explicación</button></div>` : ''}</div>`;
  const otro = p.tipo === 'turno' && p.params && cerrado ? `<button class="link" data-act="lec-otro" data-parte="${parte}">🔄 Practicar con otros números</button>` : '';
  return `<div class="etq-paso">${cab}</div><div class="paso-q">${md(it.pregunta)}</div>${d}${campo}${fb}${otro}`;
}

/* ---------- Ficha de la clase ---------- */
function tabFicha(c) {
  const f = c.ficha || {};
  return `<div class="gram">
    ${f.ideas ? `<div class="card"><h4>💡 Ideas clave</h4><ul class="resumen">${f.ideas.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>` : ''}
    ${f.formulas ? `<div class="card"><h4>🧮 Fórmulas</h4>${f.formulas.map(x => `<pre class="formula">${esc(x)}</pre>`).join('')}</div>` : ''}
    ${f.normas ? `<div class="card"><h4>📘 Puntos de la norma</h4><ul class="resumen">${f.normas.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>` : ''}
    ${c.accion ? `<div class="card"><h4>✅ Aplícalo esta semana</h4><p>${md(c.accion)}</p></div>` : ''}
  </div>
  ${c.fuentes?.length ? `<div class="card" style="margin-top:16px"><h3>Fuentes <span>para profundizar o verificar</span></h3>
    <ul class="fuentes">${c.fuentes.map(x => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.titulo)}</a></li>`).join('')}</ul></div>` : ''}`;
}

/* ---------- Eventos de la lección ---------- */
// En celular el encabezado de la clase ocupa media pantalla: al avanzar se va al paso, no al inicio de la página
function irAlPaso() { const el = $('.lec-prog'); if (el) scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - 12)); }
const mostrar = sel => { const el = $(sel); if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
function claseDeRuta() { return claseDatos(+location.hash.split('/')[2]); }
function lecComprobar(parte, valor) {
  const c = claseDeRuta(); if (!c) return;
  const E = estadoLec(c, parte), i = E.paso, p = pasosDe(c, parte)[i], it = instLec(c, parte, i);
  const r = E.res[i] || (E.res[i] = { intentos: 0 });
  if (r.ok || r.visto || String(valor ?? '').trim() === '') return;
  r.v = valor; r.borrador = undefined; r.intentos++; r.ok = corregir(it, valor);
  if (r.intentos === 1) r.primero = r.ok;
  if (p.tipo === 'predice') r.visto = true;
  guardarLocal(); render(); mostrar('.paso .resultado');
}
function lecTerminar(parte) {
  const c = claseDeRuta(); if (!c) return;
  const E = estadoLec(c, parte), pasos = pasosDe(c, parte);
  const qs = pasos.map((p, k) => [p, k]).filter(([p]) => p.tipo === 'pregunta' || p.tipo === 'turno');
  const ok = qs.filter(([, k]) => E.res[k]?.primero).length;
  if (!E.completada) {
    E.completada = true;
    registrarIntento({ clase_id: c.id, titulo: c.titulo, tipo: parte === 'caso' ? 'caso' : 'leccion',
      puntaje: qs.length ? Math.round(ok * 100 / qs.length) : 100, correctas: ok, total: qs.length, aprobado: true,
      errores: qs.filter(([, k]) => !E.res[k]?.primero).map(([p]) => String(p.pregunta || '').slice(0, 90)) });
  }
  guardarLocal();
  location.hash = `#/clase/${c.id}/${parte === 'leccion' && c.caso ? 'caso' : 'ficha'}`;
  setTimeout(() => { const t = $('.tabs'); if (t) scrollTo(0, Math.max(0, t.getBoundingClientRect().top + scrollY - 8)); }, 60);
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act^="lec-"]'); if (!el) return;
  const c = claseDeRuta(); if (!c) return;
  const parte = el.dataset.parte || 'leccion', E = estadoLec(c, parte), i = E.paso, pasos = pasosDe(c, parte);
  switch (el.dataset.act) {
    case 'lec-next': if (i < pasos.length - 1) { E.paso++; guardarLocal(); render(); irAlPaso(); } break;
    case 'lec-prev': if (i > 0) { E.paso--; guardarLocal(); render(); irAlPaso(); } break;
    case 'lec-op': lecComprobar(parte, el.dataset.v); break;
    case 'lec-check': lecComprobar(parte, $('[data-campo="lec"]')?.value); break;
    case 'lec-ver': (E.res[i] = E.res[i] || {}).visto = true; guardarLocal(); render(); mostrar('.paso .resultado'); break;
    case 'lec-rev': E.rev[i] = (E.rev[i] || 0) + 1; guardarLocal(); render(); mostrar('.paso .resultado.bien, .paso [data-act="lec-rev"]'); break;
    case 'lec-reflex': (E.res[i] = E.res[i] || {}).visto = true; guardarLocal(); render(); mostrar('.paso .aviso.azul'); break;
    case 'lec-otro': delete E.vals[i]; E.res[i] = { intentos: 0 }; guardarLocal(); render(); break;
    case 'lec-fin': lecTerminar(parte); break;
    case 'lec-reiniciar': E.paso = 0; E.res = {}; E.rev = {}; E.vals = {}; guardarLocal(); render(); irAlPaso(); break;
  }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.campo === 'lec-txt') {
    const c = claseDeRuta(); if (!c) return;
    const E = estadoLec(c, el.dataset.parte), r = E.res[+el.dataset.i] || (E.res[+el.dataset.i] = {});
    r.txt = el.value; guardarLocal();
    const n = contarPalabras(el.value), b = $('#btn-reflex'), t = $('#reflex-cuenta');
    if (b) b.disabled = n < 15; if (t) t.textContent = `${n} palabras · escribe al menos 15`;
  } else if (el.dataset.campo === 'lec') {
    const c = claseDeRuta(); if (!c) return;
    const E = estadoLec(c, el.dataset.parte); (E.res[E.paso] = E.res[E.paso] || { intentos: 0 }).borrador = el.value;
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.dataset?.campo === 'lec') { e.preventDefault(); lecComprobar(e.target.dataset.parte, e.target.value); }
});

/* =====================================================================
   DIAGRAMAS (SVG/HTML con los colores del tema)
   ===================================================================== */
const DIAG = {
  /* ---------- Finanzas ---------- */
  poder_compra: () => `<svg viewBox="0 0 640 190" class="svg" role="img" aria-label="Poder de compra antes y después de la inflación">
    <text x="0" y="22" class="t-b">Hoy: canasta a $10.000</text>
    ${Array.from({ length: 10 }, (_, k) => `<rect x="${k * 52}" y="34" width="44" height="34" rx="6" fill="var(--c5)"/>`).join('')}
    <text x="530" y="58" class="t">100 canastas</text>
    <text x="0" y="112" class="t-b">En 1 año, precios +10 %: canasta a $11.000</text>
    ${Array.from({ length: 9 }, (_, k) => `<rect x="${k * 52}" y="124" width="44" height="34" rx="6" fill="var(--c2)"/>`).join('')}<rect x="468" y="124" width="4" height="34" rx="1" fill="var(--c2)"/>
    <text x="530" y="148" class="t">90,9 canastas</text>
    <text x="0" y="184" class="t-s">Mismo $1.000.000 (cada bloque = 10 canastas). Lo que cambió es lo que puedes comprar con él.</text></svg>`,
  canasta_ipc: () => {
    const items = [['Alimentos', 30, 8, 'var(--c1)'], ['Transporte', 20, 5, 'var(--c3)'], ['Vivienda y servicios', 50, 2, 'var(--c5)']];
    let x = 0;
    return `<svg viewBox="0 0 640 200" class="svg" role="img" aria-label="Canasta simplificada del IPC">
      <text x="0" y="18" class="t-b">Canasta simplificada (ejemplo): cuánto pesa cada grupo en el gasto y cuánto subió</text>
      ${items.map(([n, p, v, col]) => { const w = p * 6.2, g = `<rect x="${x}" y="32" width="${w - 4}" height="60" rx="6" fill="${col}" opacity=".85"/>
        <text x="${x + 8}" y="56" class="t-w">${n}</text><text x="${x + 8}" y="78" class="t-w">peso ${p} % · subió ${v} %</text>
        <text x="${x + 8}" y="116" class="t">${p} % × ${v} % = ${fmtNum(p * v / 100, 1)} pp</text>`; x += w; return g; }).join('')}
      <text x="0" y="160" class="t-b">IPC de la canasta = 2,4 + 1,0 + 1,0 = 4,4 %</text>
      <text x="0" y="184" class="t-s">El IPC es un promedio PONDERADO: lo que más pesa en el gasto de los hogares mueve más el índice.</text></svg>`;
  },
  uf_linea: () => {
    const pts = Array.from({ length: 31 }, (_, k) => `${40 + k * 18},${150 - k * 3.2}`).join(' ');
    return `<svg viewBox="0 0 640 210" class="svg" role="img" aria-label="Cómo se reajusta la UF día a día">
      <line x1="40" y1="160" x2="610" y2="160" stroke="var(--borde)"/>
      <polyline points="${pts}" fill="none" stroke="var(--verde-btn)" stroke-width="3"/>
      <circle cx="40" cy="150" r="5" fill="var(--verde-btn)"/><circle cx="580" cy="54" r="5" fill="var(--verde-btn)"/>
      <text x="40" y="180" class="t">día 10</text><text x="540" y="180" class="t">día 9 sgte.</text>
      <text x="40" y="140" class="t">UF $39.500</text><text x="470" y="44" class="t">≈ $39.698 (+0,5 %)</text>
      <rect x="40" y="10" width="300" height="46" rx="8" fill="var(--azul-bg)"/>
      <text x="52" y="30" class="t-b">~Día 8: el INE publica el IPC del mes anterior</text>
      <text x="52" y="48" class="t">Ejemplo: IPC +0,5 % → la UF lo reparte día a día</text>
      <text x="40" y="202" class="t-s">El Banco Central calcula la UF para cada día del 10 al 9 con la variación del IPC del mes anterior (tasa diaria geométrica).</text></svg>`;
  },
  /* ---------- Norma RIC ---------- */
  recorrido_energia: () => {
    const cajas = [['Red de la distribuidora', 'postes, transformador', 'Distribuidora', 'var(--sub)'],
      ['Empalme y medidor', 'acometida y caja', 'RIC N°01', 'var(--c5)'],
      ['Alimentador', 'medidor → 1er tablero', 'RIC N°03 · N°04', 'var(--c3)'],
      ['Tableros', 'protección y maniobra', 'RIC N°02 · N°05', 'var(--c2)'],
      ['Circuitos y puntos', 'enchufes, luces, equipos', 'RIC N°04 · N°10 · N°07', 'var(--c4)']];
    return `<svg viewBox="0 0 660 250" class="svg" role="img" aria-label="Recorrido de la energía en una instalación">
      ${cajas.map(([t, s, r, col], k) => { const x = k * 132; return `
        <rect x="${x}" y="40" width="118" height="92" rx="10" fill="#fff" stroke="${col}" stroke-width="2.5"/>
        <text x="${x + 59}" y="70" class="t-b" text-anchor="middle">${t.split(' ').slice(0, 2).join(' ')}</text>
        <text x="${x + 59}" y="86" class="t-b" text-anchor="middle">${t.split(' ').slice(2).join(' ')}</text>
        <text x="${x + 59}" y="108" class="t-s" text-anchor="middle">${s}</text>
        <rect x="${x + 6}" y="142" width="106" height="24" rx="12" fill="${col}"/>
        <text x="${x + 59}" y="158" class="t-w" text-anchor="middle">${r}</text>
        ${k < 4 ? `<path d="M${x + 120} 86 l10 0" stroke="var(--txt)" stroke-width="2" marker-end="url(#fl)"/>` : ''}`; }).join('')}
      <defs><marker id="fl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--txt)"/></marker></defs>
      <line x1="125" y1="20" x2="125" y2="180" stroke="var(--rojo)" stroke-dasharray="5 4" stroke-width="2"/>
      <text x="131" y="24" class="t" fill="var(--rojo)">punto de conexión (DS 8, art. 1°)</text>
      <text x="0" y="200" class="t-s">← responsabilidad de la distribuidora</text><text x="250" y="200" class="t-s">instalación de consumo: responsabilidad del propietario →</text>
      <rect x="132" y="212" width="520" height="30" rx="8" fill="var(--side)" stroke="var(--borde)"/>
      <text x="142" y="232" class="t">En toda la instalación: puesta a tierra (RIC N°06) y protección de las personas (RIC N°05)</text></svg>`;
  },
  piramide_normativa: () => {
    const niv = [['Ley General de Servicios Eléctricos', 'DFL N°4/20.018 de 2006 · el marco', 'var(--c6)'],
      ['DS N°8/2019 (Ministerio de Energía)', 'reglamento: obligaciones generales, responsables, puesta en servicio', 'var(--c5)'],
      ['19 Pliegos Técnicos Normativos RIC (SEC)', 'el CÓMO: exigencias técnicas detalladas, punto por punto', 'var(--c4)'],
      ['Normas IEC / UNE citadas por los pliegos', 'solo en los puntos donde un pliego las cita', 'var(--c3)']];
    return `<svg viewBox="0 0 640 230" class="svg" role="img" aria-label="Pirámide normativa">${niv.map(([t, s, col], k) => {
      const m = 110 - k * 36, y = 10 + k * 54; return `<rect x="${m}" y="${y}" width="${640 - 2 * m}" height="46" rx="8" fill="${col}" opacity=".88"/>
      <text x="320" y="${y + 20}" class="t-w" text-anchor="middle">${t}</text><text x="320" y="${y + 37}" class="t-w2" text-anchor="middle">${s}</text>`; }).join('')}</svg>`;
  },
  tramite_linea: () => {
    const p = [['1', 'Factibilidad técnica', 'la pide el propietario o proyectista a la distribuidora (art. 15°)'], ['2', 'Proyecto', 'técnicamente elaborado (art. 7°) · RIC N°18'],
      ['3', 'Ejecución', 'instalador autorizado de la clase que corresponda (art. 8°)'], ['4', 'Pruebas y verificación inicial', 'RIC N°19'],
      ['5', 'Declaración en e-declarador', '≥ 15 días hábiles antes de energizar (art. 17°, 22° · RIC N°19 9.1.1)'], ['6', 'Inscripción SEC → conexión', 'con el documento de la SEC se pide el suministro (art. 18° · 9.2.11)'],
      ['7', 'Operación y mantención', 'responsable: el propietario (art. 10° · RIC N°17)']];
    return `<div class="tramite">${p.map(([n, t, s]) => `<div class="tr-paso"><span>${n}</span><b>${t}</b><small>${s}</small></div>`).join('')}</div>`;
  },
  semicirculo_15m: () => `<svg viewBox="0 0 640 260" class="svg" role="img" aria-label="Zona de 15 m para ubicar el medidor">
    <rect x="20" y="210" width="600" height="40" fill="#d0d7de"/><text x="30" y="236" class="t-b">Calle (vía pública)</text>
    <rect x="60" y="20" width="520" height="190" fill="none" stroke="var(--sub)" stroke-dasharray="6 4"/><text x="66" y="36" class="t-s">Deslinde del terreno (línea de cierre abajo)</text>
    <path d="M140 210 A 130 130 0 0 1 400 210" fill="var(--azul-bg)" stroke="var(--azul)" stroke-width="2"/>
    <line x1="270" y1="210" x2="370" y2="128" stroke="var(--azul)"/><text x="330" y="160" class="t" fill="var(--azul)">r ≤ 15 m</text>
    <circle cx="270" cy="210" r="7" fill="var(--rojo)"/><text x="232" y="204" class="t-b">puerta</text>
    <rect x="180" y="110" width="80" height="60" rx="4" fill="var(--c4)" opacity=".85"/><text x="186" y="134" class="t-w">Casa A</text><text x="186" y="152" class="t-w2">medidor en fachada ✓</text>
    <rect x="455" y="40" width="100" height="60" rx="4" fill="var(--c2)" opacity=".85"/><text x="461" y="64" class="t-w">Casa B</text><text x="461" y="82" class="t-w2">fuera de los 15 m</text>
    <rect x="500" y="196" width="14" height="14" fill="var(--c2)"/><path d="M505 110 L507 190" stroke="var(--c2)" stroke-dasharray="4 3"/>
    <text x="430" y="190" class="t">poste o nicho ✓</text>
    <text x="20" y="20" class="t-s">RIC N°01 · 7.2 y 7.3 (anexo 1.1)</text></svg>`,
  riesgos: () => `<div class="riesgos">
    <div class="rg"><h5>🔥 Incendio</h5><ul><li><b>Sobrecarga</b>: más corriente de la que el conductor soporta → calor → la aislación se degrada.</li><li><b>Cortocircuito</b>: falla de impedancia casi nula → corriente enorme en milisegundos.</li><li><b>Conexión floja</b>: resistencia en un punto → punto caliente y arco.</li></ul>
      <div class="def">Defensas: conductor de sección correcta (RIC N°04) · protección termomagnética coordinada con el conductor (RIC N°02/N°05) · conexiones bien apretadas y materiales adecuados (RIC N°01 · 6.2)</div></div>
    <div class="rg"><h5>⚡ Choque eléctrico</h5><ul><li><b>Contacto directo</b>: tocar una parte energizada (un borne, un cable pelado).</li><li><b>Contacto indirecto</b>: tocar una carcasa que quedó energizada por una falla de aislación.</li></ul>
      <div class="def">Defensas: aislación y envolventes con grado IP (RIC N°02/N°05) · protector diferencial (RIC N°05) · puesta a tierra de las masas (RIC N°06)</div></div></div>`,
  /* ---------- Finanzas: el tiempo y las tasas ---------- */
  simple_compuesto: () => {
    const anos = [0, 5, 10, 15, 20, 25, 30], k = 150 / 7.7;
    return `<svg viewBox="0 0 640 250" class="svg" role="img" aria-label="Interés simple vs compuesto">
      <text x="0" y="16" class="t-b">$1.000.000 al 7 % anual: interés simple vs. compuesto (millones de $)</text>
      <line x1="40" y1="200" x2="630" y2="200" stroke="var(--borde)"/>
      ${anos.map((n, j) => { const sim = 1 + 0.07 * n, com = Math.pow(1.07, n), x = 50 + j * 84;
        return `<rect x="${x}" y="${200 - sim * k}" width="30" height="${sim * k}" rx="3" fill="var(--c3)"/>
          <rect x="${x + 34}" y="${200 - com * k}" width="30" height="${com * k}" rx="3" fill="var(--verde-btn)"/>
          <text x="${x + 15}" y="${194 - sim * k}" class="t-s" text-anchor="middle">${fmtNum(sim, 1)}</text>
          <text x="${x + 49}" y="${194 - com * k}" class="t-s" text-anchor="middle">${fmtNum(com, 1)}</text>
          <text x="${x + 32}" y="218" class="t" text-anchor="middle">año ${n}</text>`; }).join('')}
      <rect x="40" y="232" width="12" height="12" fill="var(--c3)"/><text x="58" y="243" class="t">simple: crece en línea recta</text>
      <rect x="290" y="232" width="12" height="12" fill="var(--verde-btn)"/><text x="308" y="243" class="t">compuesto: los intereses también ganan intereses</text></svg>`;
  },
  linea_vp: () => `<svg viewBox="0 0 640 200" class="svg" role="img" aria-label="Valor presente y valor futuro">
    <defs><marker id="fv" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--verde-btn)"/></marker>
      <marker id="fp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--azul)"/></marker></defs>
    <line x1="60" y1="100" x2="600" y2="100" stroke="var(--txt)" stroke-width="2"/>
    ${['Hoy', 'Año 1', 'Año 2'].map((t, j) => `<circle cx="${80 + j * 240}" cy="100" r="6" fill="var(--txt)"/><text x="${80 + j * 240}" y="126" class="t-b" text-anchor="middle">${t}</text>`).join('')}
    <path d="M90 70 C 250 30, 410 30, 550 70" fill="none" stroke="var(--verde-btn)" stroke-width="2.5" marker-end="url(#fv)"/>
    <text x="320" y="34" class="t" text-anchor="middle" fill="var(--verde-btn)">VALOR FUTURO: × 1,06 × 1,06</text>
    <text x="80" y="64" class="t-b" text-anchor="middle">$1.000.000</text><text x="560" y="64" class="t-b" text-anchor="middle">$1.123.600</text>
    <path d="M550 140 C 410 180, 250 180, 90 140" fill="none" stroke="var(--azul)" stroke-width="2.5" marker-end="url(#fp)"/>
    <text x="320" y="190" class="t" text-anchor="middle" fill="var(--azul)">VALOR PRESENTE (descontar): ÷ 1,06 ÷ 1,06</text>
    <text x="80" y="156" class="t-b" text-anchor="middle">$1.023.496</text><text x="560" y="156" class="t-b" text-anchor="middle">$1.150.000</text></svg>`,
  amortizacion: () => {
    const P = 2000000, i = 0.015, n = 24, c = P * i / (1 - Math.pow(1 + i, -n)), k = 110 / c;
    let saldo = P, bars = '';
    for (let m = 1; m <= n; m++) { const int = saldo * i, am = c - int; saldo -= am; const x = 30 + (m - 1) * 25;
      bars += `<rect x="${x}" y="${170 - c * k}" width="20" height="${int * k}" fill="var(--c2)"/><rect x="${x}" y="${170 - am * k}" width="20" height="${am * k}" fill="var(--verde-btn)"/>
        ${m === 1 || m === 12 || m === 24 ? `<text x="${x + 10}" y="186" class="t-s" text-anchor="middle">${m}</text>` : ''}`; }
    return `<svg viewBox="0 0 640 230" class="svg" role="img" aria-label="Cómo se reparte la cuota">
      <text x="0" y="16" class="t-b">Crédito de $2.000.000 al 1,5 % mensual en 24 cuotas fijas de $99.848</text>
      <text x="0" y="36" class="t-s">Cada barra es una cuota: la parte de arriba es interés y la de abajo amortiza (paga) la deuda</text>
      ${bars}<text x="320" y="200" class="t" text-anchor="middle">número de cuota</text>
      <rect x="30" y="210" width="12" height="12" fill="var(--c2)"/><text x="48" y="221" class="t">interés (sobre el saldo que debes)</text>
      <rect x="300" y="210" width="12" height="12" fill="var(--verde-btn)"/><text x="318" y="221" class="t">amortización (baja tu deuda)</text></svg>`;
  },
};
function diagrama(id) { try { return (DIAG[id] || (() => ''))(); } catch (e) { return ''; } }
