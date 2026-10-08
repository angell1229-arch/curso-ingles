window.CLASES_RIC = window.CLASES_RIC || []; window.CLASES_RIC.push(...
[
  {
    "id": 201,
    "etapa": 1,
    "titulo": "Marco legal: DS 8/2019 y cómo funciona la norma",
    "subtitulo": "Ley · DS 8 · pliegos RIC · responsabilidades · licencias · puesta en servicio",
    "objetivo": "Entender qué rige una instalación eléctrica de consumo en Chile, quién responde por ella y cómo se lee y cita un pliego RIC.",
    "teoria": [
      {
        "tema": "La pirámide normativa",
        "explicacion": "Arriba está la Ley General de Servicios Eléctricos (DFL N°4/20.018 de 2006). Bajo ella, el Decreto Supremo N°8 de 2019 del Ministerio de Energía, 'Reglamento de Seguridad de las Instalaciones de Consumo de Energía Eléctrica' (promulgado el 31-01-2019, publicado el 05-03-2020), fija las obligaciones generales. Y los Pliegos Técnicos Normativos RIC, dictados por la SEC, dicen CÓMO se cumplen. Los RIC N°1 al 14 y 16 al 19 fueron dictados por la Resolución Exenta SEC N°33.877 (30-12-2020); el RIC N°15 (vehículos eléctricos) tiene su versión 2024. Rigen desde el 12 de julio de 2021 y reemplazaron a la antigua NCh Elec. 4/2003.",
        "formula": "Ley General de Servicios Eléctricos (DFL 4/20.018)\n  └─ DS N°8/2019 (Min. Energía): obligaciones generales\n       └─ 19 Pliegos RIC (SEC): exigencias técnicas detalladas",
        "ejemplos": ["Una observación de la SEC siempre cita un punto: 'No cumple RIC N°02, punto 6.1.21.2 (IP mínimo en interior)'.", "Art. 24 DS 8: los pliegos entran en vigencia 6 meses después de publicados en el Diario Oficial."]
      },
      {
        "tema": "Objetivo y alcance del DS 8",
        "explicacion": "Art. 1°: fija las exigencias mínimas para el diseño, construcción, puesta en servicio, operación, reparación y mantenimiento de TODA instalación de consumo, hasta el punto de conexión del cliente con la red de distribución, para que funcione segura para las personas y las cosas. Art. 2°: en ambientes costeros (franja de 10 km desde la línea de playa) o con agentes químicos corrosivos, además se aplican las recomendaciones de los fabricantes (temperatura y montaje). Art. 3°: 'lugar de reunión de personas' es todo inmueble o estructura con capacidad para 100 o más personas (hospitales, colegios, templos, restaurantes, recintos deportivos, cines, comercio, terminales…). Los edificios residenciales no lo son, pero sus espacios comunes deben cumplir esas exigencias.",
        "ejemplos": ["Un restaurante con capacidad para 120 personas es lugar de reunión de personas: sus tableros deben ir cerrados con llave (RIC N°02 · 5.2.1).", "Una instalación en La Serena a 3 km del mar está en ambiente costero."]
      },
      {
        "tema": "Quién responde (arts. 5° a 10° y 13°)",
        "explicacion": "El PROPIETARIO es responsable de cumplir las normas y de mantener la instalación en buen estado y segura; si no, la SEC puede multarlo y/o desconectar (arts. 5°, 6° y 10°). Quien diseña, construye o modifica responde por cumplir la normativa (art. 6°). Toda instalación debe ejecutarse según un proyecto técnicamente elaborado (art. 7°) y ser proyectada, ejecutada y dirigida por un instalador eléctrico autorizado por la SEC, de la clase correspondiente según el DS 92/1983 (art. 8°). La SEC puede fiscalizar en cualquier etapa, con autorización del propietario (art. 9°). El propietario debe guardar copia de las declaraciones y el plano definitivo con empalmes y medidores (art. 13°).",
        "ejemplos": ["Si la SEC encuentra una falla, el propietario debe normalizar, y además pueden sancionarse el instalador y el propietario (art. 9°)."]
      },
      {
        "tema": "Puesta en servicio y modificaciones (arts. 15° a 19° y 22°)",
        "explicacion": "Antes de conectarse, el propietario pide a la distribuidora la Factibilidad Técnica de Suministro (art. 15°). Toda instalación, modificación e instalación provisoria debe ser declarada a la SEC por el instalador autorizado según el RIC N°19 (art. 16°). Para energizar una instalación nueva, se comunica a la SEC con al menos 15 días de anticipación (art. 17°); los plazos son en días hábiles (art. 22°). Es 'modificación' todo cambio de diseño o topología: aumento de capacidad, cambios de circuitos en zonas de seguridad, variaciones en ambientes explosivos, cualquier cambio en media tensión, o en instalaciones con consumos que no toleran interrupciones (art. 18°). La distribuidora no puede conectar una instalación que no fue comunicada a la SEC con su Verificación de Tercera Parte (art. 18°).",
        "ejemplos": ["Aumentar la potencia de un local comercial es una modificación: se declara a la SEC.", "15 días hábiles ≈ 3 semanas corridas."]
      },
      {
        "tema": "Licencias de instalador (DS 92/1983, arts. 6° a 8°)",
        "explicacion": "Clase A: alta y baja tensión, sin límite de potencia (ingenieros eléctricos). Clase B: baja tensión hasta 500 kW, incluidas instalaciones con riesgo de explosión o incendio y de espectáculos públicos. Clase C: baja tensión; alumbrado hasta 100 kW y calefacción/fuerza motriz hasta 50 kW, con alimentadores o subalimentadores de máximo 10 kW por fase y 100 m de largo. Clase D: baja tensión sin alimentadores; alumbrado hasta 10 kW y calefacción/fuerza motriz hasta 5 kW.",
        "ejemplos": ["Un taller con 80 kW de fuerza motriz requiere al menos clase B.", "Un ambiente explosivo (bencinera) requiere clase B o A."]
      },
      {
        "tema": "Cómo leer y citar un pliego RIC",
        "explicacion": "Todos los pliegos tienen la misma estructura: 1 Objetivo · 2 Alcance y campo de aplicación · 3 Referencias normativas (normas IEC, que pueden reemplazarse por las UNE equivalentes) · 4 Terminología · 5 en adelante: exigencias · Anexos con tablas y figuras. Los pliegos se citan entre sí: un punto puede remitir a otro pliego. Para hablar como profesional, cita siempre 'RIC N°xx, punto y.z'.",
        "ejemplos": ["RIC N°01 · 6.4: la envolvente metálica de una caja de empalme debe cumplir el punto 8 del RIC N°05.", "RIC N°01 · 5.3 remite a la excepción del RIC N°10 · 5.2.1."]
      },
      {
        "tema": "Conceptos eléctricos que usarás en todos los pliegos",
        "explicacion": "En baja tensión en Chile se usa 220 V monofásico (fase-neutro) y 380 V trifásico (entre fases), a 50 Hz. Potencia aparente S (kVA), activa P (kW) y factor de potencia cos φ. Potencia instalada: suma de las potencias nominales de todos los consumos permanentes (RIC N°01 · 4.8). Demanda máxima: la mayor demanda en un período (RIC N°03 · 3.7). Factor de demanda: demanda máxima ÷ carga total conectada (RIC N°03 · 3.10).",
        "formula": "Monofásico: S = V × I        P = V × I × cos φ\nTrifásico:  S = √3 × V × I   P = √3 × V × I × cos φ\nFactor de demanda = Demanda máxima / Carga conectada",
        "ejemplos": ["Trifásico 380 V, 20 A, cos φ 0,9 → P = 1,732 × 380 × 20 × 0,9 = 11,85 kW.", "Monofásico 220 V, 25 A → S = 5,5 kVA."]
      }
    ],
    "terminos": [
      {"es": "reglamento", "en": "regulation", "definicion": "Norma dictada por el Ejecutivo que desarrolla una ley; el DS 8/2019 es el reglamento de seguridad de las instalaciones de consumo.", "ejemplo": "The regulation sets minimum safety requirements."},
      {"es": "pliego técnico normativo", "en": "technical standard (code section)", "definicion": "Documento de la SEC que detalla las exigencias técnicas para cumplir el DS 8 (RIC N°01 a N°19).", "ejemplo": "Each technical standard covers one topic."},
      {"es": "SEC", "en": "electricity and fuels regulator (SEC)", "definicion": "Superintendencia de Electricidad y Combustibles: dicta los pliegos y fiscaliza su cumplimiento (DS 8, art. 20°).", "ejemplo": "The regulator can inspect any installation."},
      {"es": "instalación de consumo", "en": "consumer installation (premises wiring)", "definicion": "Conjunto de aparatos, equipos, canalizaciones y circuitos destinados a utilizar la energía eléctrica (DS 8, art. 4° c).", "ejemplo": "The premises wiring ends at the utility connection point."},
      {"es": "instalador eléctrico autorizado", "en": "licensed electrician", "definicion": "Profesional autorizado por la SEC para proyectar, ejecutar, dirigir, mantener e inspeccionar instalaciones, según el DS 92/1983.", "ejemplo": "Only a licensed electrician can sign the drawings."},
      {"es": "propietario", "en": "owner", "definicion": "Persona natural o jurídica que acredita dominio sobre el inmueble o instalación (DS 8, art. 4° e); responde por su mantención.", "ejemplo": "The owner must keep the installation safe."},
      {"es": "empresa distribuidora", "en": "distribution utility", "definicion": "Concesionaria o quien opere instalaciones de distribución de electricidad (DS 8, art. 4° b).", "ejemplo": "The utility connects the service."},
      {"es": "factibilidad técnica de suministro", "en": "supply feasibility", "definicion": "Proceso en que la distribuidora entrega las condiciones técnicas y económicas para conectar o modificar una instalación (DS 8, art. 4° a y 15°).", "ejemplo": "Request supply feasibility before building."},
      {"es": "comunicación de energización", "en": "energization notice", "definicion": "Aviso a la SEC para energizar una instalación nueva, con al menos 15 días hábiles de anticipación (DS 8, art. 17°).", "ejemplo": "Submit the energization notice 15 business days ahead."},
      {"es": "verificación de tercera parte", "en": "third-party verification", "definicion": "Verificación del cumplimiento técnico hecha por un tercero autorizado por la SEC (DS 8, art. 4° g).", "ejemplo": "Large installations need third-party verification."},
      {"es": "lugar de reunión de personas", "en": "place of public assembly", "definicion": "Inmueble o estructura con capacidad para 100 o más personas (DS 8, art. 3°).", "ejemplo": "A cinema is a place of public assembly."},
      {"es": "modificación", "en": "alteration", "definicion": "Todo cambio en el diseño o topología de la instalación, como aumento de capacidad (DS 8, art. 18°).", "ejemplo": "Any alteration must be declared."},
      {"es": "potencia instalada", "en": "installed capacity (connected load)", "definicion": "Suma de las potencias nominales de todos los consumos permanentes, en W o kW (RIC N°01 · 4.8).", "ejemplo": "The installed capacity is 12 kW."},
      {"es": "demanda máxima", "en": "maximum demand", "definicion": "Mayor demanda de la instalación en un período dado (RIC N°03 · 3.7).", "ejemplo": "Maximum demand is lower than connected load."},
      {"es": "factor de potencia", "en": "power factor", "definicion": "Razón entre potencia activa (kW) y aparente (kVA): cos φ.", "ejemplo": "Motors usually have a power factor around 0.85."}
    ],
    "calculadoras": ["potencia_electrica"],
    "practica": [
      {"tipo": "alternativas", "pregunta": "¿Qué norma reemplazaron el DS 8/2019 y los pliegos RIC?", "opciones": ["La NCh Elec. 4/2003", "El DS 92/1983", "La Ley General de Servicios Eléctricos", "La NTD de distribución"], "respuestas": ["La NCh Elec. 4/2003"], "explicacion": "Desde el 12-07-2021 rigen el DS 8 y los RIC; dejó de regir la NCh Elec. 4/2003. El DS 92 (licencias) sigue vigente."},
      {"tipo": "numero", "pregunta": "¿Con cuántos días hábiles de anticipación debe comunicarse a la SEC la energización de una instalación nueva? (DS 8, art. 17°)", "respuesta": 15, "tolerancia": 0, "unidad": "días", "explicacion": "Al menos 15 días, que son hábiles según el art. 22°."},
      {"tipo": "numero", "pregunta": "¿Desde qué capacidad de personas un recinto es 'lugar de reunión de personas'? (DS 8, art. 3°)", "respuesta": 100, "tolerancia": 0, "unidad": "personas", "explicacion": "100 o más personas."},
      {"tipo": "texto", "pregunta": "¿Qué organismo dicta los pliegos RIC y fiscaliza su cumplimiento? (sigla)", "respuestas": ["SEC", "Superintendencia de Electricidad y Combustibles"], "explicacion": "La SEC (DS 8, arts. 12° y 20°)."},
      {"tipo": "alternativas", "pregunta": "Según el DS 8, ¿quién es responsable de mantener la instalación en buen estado una vez energizada?", "opciones": ["El propietario", "El instalador que la construyó", "La empresa distribuidora", "La SEC"], "respuestas": ["El propietario"], "explicacion": "Arts. 6° y 10°: el propietario mantiene y conserva la instalación segura."},
      {"tipo": "vf", "pregunta": "Aumentar la capacidad de una instalación es una 'modificación' y debe declararse a la SEC.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "Art. 18° a) y art. 16°."},
      {"tipo": "alternativas", "pregunta": "Una instalación de alumbrado de 60 kW con alimentadores de 8 kW por fase y 50 m. ¿Licencia mínima?", "opciones": ["Clase C", "Clase D", "Clase B", "Solo clase A"], "respuestas": ["Clase C"], "explicacion": "Clase C: alumbrado hasta 100 kW con alimentadores de máx. 10 kW por fase y 100 m. La D no permite alimentadores."},
      {"tipo": "numero", "pregunta": "Trifásico 380 V, 20 A, cos φ = 0,9. ¿Potencia activa P en kW? (2 decimales)", "respuesta": 11.85, "tolerancia": 0.02, "unidad": "kW", "explicacion": "P = √3 × 380 × 20 × 0,9 = 11.847 W ≈ 11,85 kW."},
      {"tipo": "numero", "pregunta": "Monofásico 220 V con un automático de 25 A. ¿Potencia aparente máxima S en kVA?", "respuesta": 5.5, "tolerancia": 0.01, "unidad": "kVA", "explicacion": "S = 220 × 25 = 5.500 VA = 5,5 kVA."},
      {"tipo": "numero", "pregunta": "¿Cuántos km mide la franja costera que el DS 8 considera 'ambiente costero'?", "respuesta": 10, "tolerancia": 0, "unidad": "km", "explicacion": "Art. 2°: 10 km de ancho medidos desde la línea de playa."}
    ],
    "escritura": {
      "consigna": "Explica a un cliente quién responde por su instalación eléctrica, qué hace la SEC y qué pasos hay antes de energizar una instalación nueva.",
      "minPalabras": 70,
      "obligatorias": ["propietario", "instalador", "SEC", "15 días"],
      "modelo": "La instalación debe proyectarla, ejecutarla y dirigirla un instalador autorizado por la SEC, con la licencia de la clase que corresponda a la potencia. Primero se pide a la distribuidora la factibilidad técnica de suministro. Al terminar, el instalador declara la instalación a la SEC según el RIC N°19 y se comunica la energización con al menos 15 días hábiles de anticipación. Una vez energizada, el propietario es responsable de mantenerla segura; si no cumple, la SEC puede multar o desconectar."
    },
    "prueba": [
      {"tipo": "alternativas", "pregunta": "¿Qué institución dictó los pliegos RIC N°1 al 14 y 16 al 19?", "opciones": ["La SEC, por Resolución Exenta N°33.877", "El Ministerio de Energía, por el DS 8", "La CNE, por resolución", "El Congreso, por ley"], "respuestas": ["La SEC, por Resolución Exenta N°33.877"], "explicacion": "El DS 8 (Min. Energía) es el reglamento; la SEC dicta los pliegos (Res. Ex. 33.877 del 30-12-2020)."},
      {"tipo": "alternativas", "pregunta": "¿Desde qué fecha rigen el DS 8/2019 y sus pliegos para las instalaciones de consumo?", "opciones": ["12 de julio de 2021", "5 de marzo de 2020", "1 de enero de 2019", "30 de diciembre de 2020"], "respuestas": ["12 de julio de 2021"], "explicacion": "5-03-2020 es la publicación del DS 8 y 30-12-2020 la resolución de la SEC; la exigencia de los pliegos rige desde el 12-07-2021."},
      {"tipo": "texto", "pregunta": "¿Qué decreto regula las licencias de instalador eléctrico? (ej.: DS ___)", "respuestas": ["DS 92", "92", "decreto 92", "DS 92/1983", "DS 92 de 1983"], "explicacion": "DS N°92 de 1983, Reglamento de Instaladores Eléctricos."},
      {"tipo": "alternativas", "pregunta": "Una bencinera (ambiente con riesgo de explosión) de 150 kW en baja tensión. ¿Qué licencia mínima se requiere?", "opciones": ["Clase B", "Clase C", "Clase D", "No requiere licencia"], "respuestas": ["Clase B"], "explicacion": "La clase B incluye explícitamente instalaciones con riesgo de explosión o incendio, hasta 500 kW en BT."},
      {"tipo": "alternativas", "pregunta": "Instalación de fuerza motriz de 4 kW, sin alimentadores. ¿Licencia mínima?", "opciones": ["Clase D", "Clase C", "Clase B", "Clase A"], "respuestas": ["Clase D"], "explicacion": "Clase D: fuerza motriz hasta 5 kW sin alimentadores."},
      {"tipo": "numero", "pregunta": "¿Hasta cuántos kW en baja tensión puede ejecutar un instalador clase B?", "respuesta": 500, "tolerancia": 0, "unidad": "kW", "explicacion": "500 kW máximo de potencia instalada."},
      {"tipo": "vf", "pregunta": "Los edificios residenciales son 'lugar de reunión de personas', incluidos sus departamentos.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "No lo son (art. 3°), pero sus espacios comunes deben cumplir las exigencias de esos lugares."},
      {"tipo": "alternativas", "pregunta": "¿Qué NO es una 'modificación' según el art. 18° del DS 8?", "opciones": ["Cambiar una ampolleta por otra igual", "Aumentar la capacidad de la instalación", "Cualquier cambio en media tensión", "Cambiar circuitos en zonas de seguridad"], "respuestas": ["Cambiar una ampolleta por otra igual"], "explicacion": "Modificación es un cambio de diseño o topología; reponer un elemento igual no lo es."},
      {"tipo": "alternativas", "pregunta": "¿Qué debe pedir el propietario a la distribuidora antes de conectar o ampliar una instalación?", "opciones": ["La factibilidad técnica de suministro", "La licencia clase A", "El TE1 firmado por la SEC", "La verificación de tercera parte"], "respuestas": ["La factibilidad técnica de suministro"], "explicacion": "Art. 15° del DS 8."},
      {"tipo": "texto", "pregunta": "Término: suma de las potencias nominales de todos los consumos permanentes de una instalación.", "respuestas": ["potencia instalada", "installed capacity", "connected load"], "explicacion": "Potencia instalada (RIC N°01 · 4.8)."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'factor de potencia' en inglés?", "respuestas": ["power factor"], "explicacion": "Power factor (cos φ)."},
      {"tipo": "numero", "pregunta": "Trifásico 380 V, 32 A, cos φ = 0,85. ¿Potencia activa en kW? (2 decimales)", "respuesta": 17.9, "tolerancia": 0.02, "unidad": "kW", "explicacion": "√3 × 380 × 32 × 0,85 = 17.902 W ≈ 17,90 kW."},
      {"tipo": "numero", "pregunta": "Un consumo monofásico de 4,4 kW con cos φ = 1 a 220 V. ¿Qué corriente toma? (A)", "respuesta": 20, "tolerancia": 0.05, "unidad": "A", "explicacion": "I = P / (V × cos φ) = 4.400 / 220 = 20 A."},
      {"tipo": "numero", "pregunta": "Una instalación tiene 40 kW de carga conectada y una demanda máxima de 28 kW. ¿Factor de demanda? (2 decimales)", "respuesta": 0.7, "tolerancia": 0.005, "unidad": "", "explicacion": "Fd = 28 / 40 = 0,70 (RIC N°03 · 3.10)."},
      {"tipo": "alternativas", "pregunta": "¿Qué parte de un pliego define el significado exacto de cada palabra usada?", "opciones": ["Terminología", "Alcance y campo de aplicación", "Referencias normativas", "Anexos"], "respuestas": ["Terminología"], "explicacion": "Generalmente el punto 3 o 4 de cada pliego."},
      {"tipo": "escritura", "pregunta": "En 70+ palabras: explica la diferencia entre la ley, el DS 8 y los pliegos RIC, y qué licencia necesita un instalador para un taller de 80 kW de fuerza motriz.", "minPalabras": 70, "obligatorias": ["DS 8", "pliegos", "SEC", "licencia"]}
    ],
    "fuentes": [
      {"titulo": "Decreto 8 (2019), Ministerio de Energía — Biblioteca del Congreso Nacional", "url": "https://bcn.cl/2etj7"},
      {"titulo": "SEC — Pliegos técnicos RIC (Reglamento DS 8)", "url": "https://www.sec.cl/reglamento-de-seguridad-de-las-instalaciones-de-consumo-de-energia-electrica-decreto-08/"},
      {"titulo": "SEC — Entrada en vigencia de los pliegos RIC", "url": "https://sec.custhelp.com/app/answers/detail/a_id/1273/~/consulta-por-entrada-en-vigencia-de-los-nuevos-pliegos-t%C3%A9cnicos-ric,-decreto"},
      {"titulo": "SEC — ¿Qué instalaciones puede declarar cada clase de licencia?", "url": "https://sec.custhelp.com/app/answers/detail/a_id/254/~/%C2%BFqu%C3%A9-tipo-de-instalaciones-puede-declarar-cada-clase"}
    ]
  },
  {
    "id": 202,
    "etapa": 1,
    "titulo": "RIC N°01 · Empalmes",
    "subtitulo": "Qué es un empalme · capacidad · ubicación del medidor · edificios · protecciones",
    "objetivo": "Dimensionar y ubicar un empalme en baja tensión según el RIC N°01, y conocer las exigencias para edificios y media tensión.",
    "teoria": [
      {
        "tema": "Qué es un empalme (puntos 2 y 4)",
        "explicacion": "Empalme: conjunto de elementos y equipos que conectan la unidad de medida de la instalación del cliente con la red de distribución (4.5). La caja de empalme aloja el equipo de medida y sus accesorios (4.2). El pliego aplica a empalmes de baja y media tensión (2). Alimentador: conductores entre el equipo de medida y el primer tablero (4.1).",
        "ejemplos": ["Red de la distribuidora → acometida → caja de empalme con medidor y protección → alimentador → tablero general."]
      },
      {
        "tema": "Exigencias generales (punto 5)",
        "explicacion": "El empalme se construye según las normas o, si no existen, según los estándares de la distribuidora, que deben ser públicos y que la SEC puede objetar (5.1). Solo se otorga empalme a instalaciones construidas según la normativa y con la comunicación de energización inscrita en la SEC (5.2). Su capacidad se fija según la potencia total instalada declarada, ajustada a valores normalizados (anexo 1.3): igual o inferior, NUNCA superior (5.3; excepción: RIC N°10 · 5.2.1). Cada instalación tiene un empalme único; una propiedad puede tener varios empalmes si las instalaciones están separadas y no comparten canalizaciones ni tableros (5.6).",
        "ejemplos": ["Potencia instalada declarada 7 kW monofásica → empalme normalizado hasta 35 A (7 kW); no puede ser de 40 A (8 kW)."]
      },
      {
        "tema": "La distribuidora debe negar la energización (5.4)",
        "explicacion": "Si al conectar se produce una falla que hace operar la protección del empalme (5.4.1); si la ubicación o construcción no cumple la normativa (5.4.2); o si la instalación no existe o está inconclusa (5.4.3), en cuyo caso debe registrarlo con medios audiovisuales e informar a la SEC dentro de 24 horas.",
        "ejemplos": ["Al energizar salta el automático del empalme por un cortocircuito: la distribuidora no conecta."]
      },
      {
        "tema": "Materiales (punto 6)",
        "explicacion": "Conectores y terminales sin puntos calientes, arcos ni falsas conexiones (6.2). Cajas, micas y canalizaciones no metálicas expuestas al sol: protección UV (6.3). Envolvente metálica: según RIC N°05, punto 8 (6.4). Toda caja de empalme: resistencia mecánica mínima IK 09 (6.5) y distancias del RIC N°02 · 6.1.20.",
        "ejemplos": ["IK 09 = resiste un impacto de 10 J (golpe fuerte)."]
      },
      {
        "tema": "Ubicación del medidor en viviendas (7.1 a 7.5, anexo 1.1)",
        "explicacion": "La unidad de medida debe permitir lectura, control y mantenimiento fáciles (7.1). En casas y recintos con empalme único: en la fachada principal, visible desde la vía pública e impidiendo su manipulación, dentro de un semicírculo de radio no superior a 15 m con centro en la puerta de acceso desde la calle (7.2). Si la edificación queda fuera de esa zona: en una estructura exclusiva cerca de la línea de cierre (poste o nicho) (7.3). En zonas rurales: de común acuerdo con la distribuidora (7.4). Con telemedida se permiten distancias mayores de común acuerdo (7.5). Las acometidas no pueden atravesar propiedades vecinas salvo servidumbre de paso (7.1).",
        "ejemplos": ["Casa a 25 m de la reja: el medidor va en un poste o nicho junto al cierre."]
      },
      {
        "tema": "Empalmes en edificios (7.6 a 7.19)",
        "explicacion": "Pueden ser concentrados (todos en un recinto), distribuidos (por piso o zona) o mixtos (7.6). Concentración permitida hasta 6 pisos; sobre eso, un recinto cada 6 pisos o fracción (7.7). Recinto de concentrados: en planta baja, entresuelo o primer subterráneo, exclusivo, paredes no combustibles (7.8.1-7.8.3); cajas con borde inferior ≥ 0,80 m y superior ≤ 2,10 m del piso, a ≥ 20 cm de paredes colindantes, ancho mínimo de pared con medidores 1,50 m, espacio libre ≥ 1,10 m al frente y puerta que abre hacia afuera con cerradura (7.8.4); reserva de superficie ≥ 15 % (7.8.5); luz de emergencia ≥ 2 h y ≥ 5 lux (7.8.8). Armarios distribuidos: mismas alturas, reserva 15 %, pasillo ≥ 1,5 m, RF 30 y cerradura (7.9). Shaft vertical de arranques: exclusivo, RF 120, reserva 15 % (7.12.4). Ducto del alimentador empalme→primer tablero: debe permitir aumentar 100 % la sección y nunca menor a 32 mm (7.15). Prohibido: ductos de agua o gas en recintos de empalmes (7.18) y derivar del alimentador entre empalme y primer tablero (7.19).",
        "formula": "Superficie de reserva: SP = 0,15 × (X × Y)   (anexo 1.4)",
        "ejemplos": ["Edificio de 14 pisos: 3 recintos de concentración (cada 6 pisos o fracción).", "Muro de medidores de 3 m × 2 m → reserva SP = 0,15 × 6 = 0,9 m²."]
      },
      {
        "tema": "Protecciones del empalme (punto 8)",
        "explicacion": "En BT, la curva de los limitadores o protecciones debe ser la más lenta; otra curva solo con estudio de coordinación y selectividad (8.1). Poder de corte ≥ 1,2 veces la corriente de cortocircuito prevista en el punto de instalación (8.2). Empalmes en MT de 500 kW o más: interruptor de poder o reconectador con sobrecorriente de fase (50/51), residual (50N/51N) y sobretensión de secuencia cero (59N) (8.3); sus ajustes se acuerdan con la distribuidora, que responde en máximo 15 días corridos (8.4).",
        "formula": "Poder de corte mínimo = 1,2 × Icc prevista",
        "ejemplos": ["Icc prevista 5 kA → la protección debe tener poder de corte ≥ 6 kA."]
      },
      {
        "tema": "Potencias normalizadas (anexo 1.3)",
        "explicacion": "Monofásicos (220 V): 6, 10, 16, 20, 25 A (tipo A-6/S-6), 30, 32, 35, 40 A (A-9/S-9) en tarifa BT-1; 50 y 63 A (A-16/S-16) para tarifas residenciales distintas a BT-1. Trifásicos (380 V): de 6 a 1000 A. La potencia máxima del empalme es S = V × I (mono) o S = √3 × V × I (tri). La potencia a contratar en kW es cercana al 91 % de esa cifra. A = aéreo, S = subterráneo, AR/SR = con medidor de reactivos.",
        "formula": "Mono: S [kVA] = 220 × I / 1000\nTri:  S [kVA] = √3 × 380 × I / 1000",
        "ejemplos": ["Mono 25 A → 5,5 kVA (5 kW a contratar).", "Tri 40 A → 26,33 kVA (24 kW a contratar).", "Tri 63 A → 41,47 kVA (38 kW)."]
      }
    ],
    "terminos": [
      {"es": "empalme", "en": "service connection", "definicion": "Conjunto de elementos que conectan la unidad de medida del cliente con la red de distribución (RIC N°01 · 4.5).", "ejemplo": "The service connection includes the meter."},
      {"es": "acometida", "en": "service drop", "definicion": "Conductores que llegan desde la red de distribución hasta el empalme, aéreos o subterráneos.", "ejemplo": "The service drop cannot cross the neighbor's property."},
      {"es": "caja de empalme", "en": "meter box", "definicion": "Contenedor que aloja el equipo de medida y sus accesorios (RIC N°01 · 4.2); mínimo IK 09.", "ejemplo": "The meter box must be IK09."},
      {"es": "unidad de medida", "en": "metering unit", "definicion": "Componente del sistema de medición, monitoreo y control de la red (RIC N°01 · 4.12).", "ejemplo": "The metering unit must be easy to read."},
      {"es": "telemedida", "en": "remote metering", "definicion": "Medición que se lee a distancia; permite ubicar el medidor más lejos de común acuerdo (RIC N°01 · 7.5).", "ejemplo": "Remote metering allows longer distances."},
      {"es": "alimentador", "en": "feeder", "definicion": "Conductores entre el equipo de medida y el primer tablero, o que alimentan tableros desde el tablero general (RIC N°01 · 4.1).", "ejemplo": "No taps are allowed on this feeder."},
      {"es": "empalmes concentrados", "en": "centralized metering", "definicion": "Todos los empalmes del edificio reunidos en un recinto único (RIC N°01 · 7.6).", "ejemplo": "Centralized metering is allowed up to 6 floors."},
      {"es": "empalmes distribuidos", "en": "distributed metering", "definicion": "Empalmes ubicados en recintos o armarios en cada piso o zona (RIC N°01 · 7.6).", "ejemplo": "Distributed metering uses cabinets on each floor."},
      {"es": "shaft", "en": "shaft (riser)", "definicion": "Conducto técnico vertical del edificio para canalizaciones eléctricas; para arranques, exclusivo y RF 120 (RIC N°01 · 4.9 y 7.12.4).", "ejemplo": "The riser must be fire rated."},
      {"es": "poder de corte", "en": "breaking capacity", "definicion": "Máxima corriente de cortocircuito que una protección puede interrumpir; en el empalme ≥ 1,2 × Icc (RIC N°01 · 8.2).", "ejemplo": "The breaking capacity must exceed the fault current."},
      {"es": "corriente de cortocircuito", "en": "short-circuit current", "definicion": "Corriente muy alta que circula cuando hay una falla de impedancia casi nula.", "ejemplo": "Calculate the prospective short-circuit current."},
      {"es": "reconectador", "en": "recloser", "definicion": "Equipo de MT que abre ante fallas y puede reconectar; exigido (o interruptor de poder) en empalmes MT ≥ 500 kW (RIC N°01 · 8.3).", "ejemplo": "A recloser with 50/51 and 51N functions."},
      {"es": "selectividad", "en": "selectivity (discrimination)", "definicion": "Coordinación para que ante una falla actúe solo la protección más cercana a ella.", "ejemplo": "A selectivity study allows a different curve."},
      {"es": "servidumbre de paso", "en": "easement (right of way)", "definicion": "Derecho a pasar por un terreno ajeno; única forma en que una acometida puede cruzar una propiedad vecina (RIC N°01 · 7.1).", "ejemplo": "An easement is needed to cross the lot."},
      {"es": "resistencia al fuego", "en": "fire resistance rating", "definicion": "Minutos que un elemento resiste el fuego (RF 30, RF 120).", "ejemplo": "The shaft needs a 120-minute fire resistance rating."}
    ],
    "calculadoras": ["empalme"],
    "practica": [
      {"tipo": "numero", "pregunta": "Radio máximo del semicírculo, medido desde la puerta de acceso, dentro del cual debe ir el medidor de una casa (RIC N°01 · 7.2). (m)", "respuesta": 15, "tolerancia": 0, "unidad": "m", "explicacion": "Semicírculo de radio no superior a 15 m."},
      {"tipo": "numero", "pregunta": "Empalme monofásico de 32 A. ¿Potencia máxima en kVA? (1 decimal)", "respuesta": 7.04, "tolerancia": 0.05, "unidad": "kVA", "explicacion": "220 × 32 = 7.040 VA ≈ 7,0 kVA (anexo 1.3)."},
      {"tipo": "numero", "pregunta": "Empalme trifásico de 40 A. ¿Potencia máxima en kVA? (2 decimales)", "respuesta": 26.33, "tolerancia": 0.02, "unidad": "kVA", "explicacion": "√3 × 380 × 40 = 26.327 VA ≈ 26,33 kVA."},
      {"tipo": "alternativas", "pregunta": "La potencia total instalada declarada es 6 kW (monofásica). ¿Qué empalme NO se puede otorgar?", "opciones": ["40 A (8 kW)", "30 A (6 kW)", "25 A (5 kW)", "20 A (4 kW)"], "respuestas": ["40 A (8 kW)"], "explicacion": "5.3: igual o inferior a la potencia instalada, nunca superior."},
      {"tipo": "numero", "pregunta": "La Icc prevista en el punto del empalme es 4,5 kA. ¿Poder de corte mínimo de la protección? (kA)", "respuesta": 5.4, "tolerancia": 0.01, "unidad": "kA", "explicacion": "1,2 × 4,5 = 5,4 kA (8.2)."},
      {"tipo": "alternativas", "pregunta": "¿Qué curva deben tener las protecciones de un empalme en BT (sin estudio de coordinación)?", "opciones": ["La más lenta", "La más rápida", "Curva B", "Cualquiera"], "respuestas": ["La más lenta"], "explicacion": "8.1: curva más lenta; otra solo con estudio de coordinación y selectividad."},
      {"tipo": "numero", "pregunta": "Edificio de 20 pisos con empalmes concentrados. ¿Cuántos recintos de concentración se necesitan como mínimo? (7.7)", "respuesta": 4, "tolerancia": 0, "unidad": "recintos", "explicacion": "Uno cada 6 pisos o fracción: 20 / 6 = 3,33 → 4."},
      {"tipo": "vf", "pregunta": "Se puede derivar un circuito desde el alimentador que va del empalme al primer tablero, si se protege bien.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "7.19: está prohibido hacer derivaciones desde ese alimentador."},
      {"tipo": "numero", "pregunta": "Diámetro mínimo del ducto del alimentador entre el empalme y el primer tablero (7.15). (mm)", "respuesta": 32, "tolerancia": 0, "unidad": "mm", "explicacion": "Debe permitir aumentar 100 % la sección y nunca ser menor a 32 mm."},
      {"tipo": "texto", "pregunta": "¿Cómo se llama el contenedor que aloja el medidor y sus accesorios?", "respuestas": ["caja de empalme", "meter box"], "explicacion": "Caja de empalme (4.2)."}
    ],
    "escritura": {
      "consigna": "Explica a un cliente dónde debe ir el medidor de su casa (que está a 25 m de la reja) y cómo se elige la capacidad del empalme.",
      "minPalabras": 70,
      "obligatorias": ["15 m", "fachada", "potencia instalada", "anexo 1.3"],
      "modelo": "Según el RIC N°01, el medidor debe ir en la fachada principal, visible desde la calle, dentro de un semicírculo de 15 m con centro en la puerta de acceso. Como tu casa está a 25 m de la reja, queda fuera de esa zona, así que el medidor se instala en un poste o nicho exclusivo junto al cierre. La capacidad del empalme se elige según la potencia instalada que se declara a la SEC, usando los valores normalizados del anexo 1.3: puede ser igual o menor, nunca mayor."
    },
    "prueba": [
      {"tipo": "alternativas", "pregunta": "¿Qué define el RIC N°01 como empalme?", "opciones": ["Los elementos que conectan la unidad de medida del cliente con la red de distribución", "El primer tablero de la instalación", "Los conductores entre tableros", "La red de la distribuidora"], "respuestas": ["Los elementos que conectan la unidad de medida del cliente con la red de distribución"], "explicacion": "Punto 4.5."},
      {"tipo": "alternativas", "pregunta": "¿A qué empalmes aplica el RIC N°01?", "opciones": ["Baja y media tensión", "Solo baja tensión", "Solo media tensión", "Solo residenciales"], "respuestas": ["Baja y media tensión"], "explicacion": "Punto 2."},
      {"tipo": "numero", "pregunta": "Empalme monofásico de 25 A. ¿Potencia máxima en kVA?", "respuesta": 5.5, "tolerancia": 0.05, "unidad": "kVA", "explicacion": "220 × 25 = 5,5 kVA."},
      {"tipo": "numero", "pregunta": "Empalme trifásico de 63 A. ¿Potencia máxima en kVA? (2 decimales)", "respuesta": 41.47, "tolerancia": 0.02, "unidad": "kVA", "explicacion": "√3 × 380 × 63 = 41.465 VA ≈ 41,47 kVA."},
      {"tipo": "numero", "pregunta": "Icc prevista de 10 kA. ¿Poder de corte mínimo de la protección del empalme? (kA)", "respuesta": 12, "tolerancia": 0.01, "unidad": "kA", "explicacion": "1,2 × 10 = 12 kA."},
      {"tipo": "numero", "pregunta": "Recinto de empalmes concentrados: altura máxima del borde superior de las cajas sobre el piso terminado. (m)", "respuesta": 2.1, "tolerancia": 0, "unidad": "m", "explicacion": "Entre 0,80 m (borde inferior) y 2,10 m (borde superior) (7.8.4)."},
      {"tipo": "numero", "pregunta": "Muro de medidores de 4 m × 2 m. ¿Superficie de reserva mínima según el anexo 1.4? (m²)", "respuesta": 1.2, "tolerancia": 0.01, "unidad": "m²", "explicacion": "SP = 0,15 × (4 × 2) = 1,2 m²."},
      {"tipo": "numero", "pregunta": "¿Hasta cuántos pisos se acepta un único recinto de concentración de empalmes? (7.7)", "respuesta": 6, "tolerancia": 0, "unidad": "pisos", "explicacion": "Sobre 6 pisos, un recinto cada 6 pisos o fracción."},
      {"tipo": "alternativas", "pregunta": "Al energizar, salta la protección del empalme por una falla. ¿Qué debe hacer la distribuidora?", "opciones": ["Denegar la energización", "Cambiar la protección por una más grande", "Energizar igual y avisar después", "Cobrar una multa"], "respuestas": ["Denegar la energización"], "explicacion": "5.4.1."},
      {"tipo": "numero", "pregunta": "Si la instalación está inconclusa, ¿en cuántas horas debe la distribuidora informar a la SEC? (5.4.3)", "respuesta": 24, "tolerancia": 0, "unidad": "horas", "explicacion": "Dentro de las 24 horas siguientes, con respaldo audiovisual."},
      {"tipo": "alternativas", "pregunta": "Empalme en media tensión de 600 kW. ¿Qué exige el punto 8.3?", "opciones": ["Interruptor de poder o reconectador con funciones 50/51, 50N/51N y 59N", "Solo fusibles", "Un limitador de curva lenta", "Nada especial"], "respuestas": ["Interruptor de poder o reconectador con funciones 50/51, 50N/51N y 59N"], "explicacion": "Para empalmes MT ≥ 500 kW."},
      {"tipo": "texto", "pregunta": "Resistencia mecánica mínima de toda caja de empalme (código IK, ej.: IK 0X).", "respuestas": ["IK 09", "IK09", "IK 9"], "explicacion": "6.5: IK 09."},
      {"tipo": "vf", "pregunta": "Está permitido que un ducto de agua cruce el recinto donde están los empalmes eléctricos.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "7.18: está prohibido."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'poder de corte' en inglés?", "respuestas": ["breaking capacity", "interrupting capacity"], "explicacion": "Breaking capacity."},
      {"tipo": "numero", "pregunta": "Pasillo mínimo frente a un armario de empalmes distribuidos (7.9.4). (m)", "respuesta": 1.5, "tolerancia": 0, "unidad": "m", "explicacion": "1,5 m desde la parte más saliente del armario hasta la pared opuesta."},
      {"tipo": "escritura", "pregunta": "En 70+ palabras: describe las exigencias de un recinto de empalmes concentrados en un edificio (ubicación, alturas, reserva y seguridad).", "minPalabras": 70, "obligatorias": ["0,80", "2,10", "15 %", "emergencia"]}
    ],
    "fuentes": [
      {"titulo": "SEC — Pliego Técnico Normativo RIC N°01 Empalmes (en tu Drive: Electricidad/Pliegos RIC)", "url": "https://www.sec.cl/reglamento-de-seguridad-de-las-instalaciones-de-consumo-de-energia-electrica-decreto-08/"}
    ]
  },
  {
    "id": 203,
    "etapa": 1,
    "titulo": "RIC N°02 · Tableros eléctricos",
    "subtitulo": "Clasificación · rotulación · espacios de trabajo · construcción · IP · conexionado",
    "objetivo": "Especificar, construir y revisar un tablero eléctrico cumpliendo el RIC N°02.",
    "teoria": [
      {
        "tema": "Qué es un tablero y cómo se clasifica (4.25)",
        "explicacion": "Equipo que concentra dispositivos de protección y maniobra para proteger y operar toda o parte de la instalación (4.25). Por función: general (protege los alimentadores y opera toda la instalación), general auxiliar (desde él salen subalimentadores), de distribución (protege y opera circuitos), de paso, de comando, centros de control, móvil, CCM, de transferencia (red ↔ fuente alternativa, nunca ambas a la vez) y de autogeneración (4.25.1). Por carga: alumbrado, fuerza, climatización, control, computación y de uso especial (4.25.2).",
        "ejemplos": ["Casa típica: empalme → tablero de distribución con circuitos de alumbrado y enchufes.", "Edificio: TG → TGAux por torre → TD por departamento."]
      },
      {
        "tema": "Ubicación y rotulación (5.2 y 5.3)",
        "explicacion": "Tableros en lugares seguros y fácilmente accesibles; en lugares de reunión de personas, en recintos, nichos o gabinetes cerrados con llave, accesibles solo para personal calificado (5.2.1). Rotulación indeleble, legible y simple (5.3). Todo tablero lleva marca, nombre, tensión de servicio, corriente nominal y número de fases, más el nombre del responsable (5.3.5); cuadro de circuitos y diagrama unilineal actualizado y protegido (5.3.6); cada protección rotulada con su número de circuito y servicio (5.3.7); la sección de los alimentadores que llegan, identificada (5.3.9).",
        "ejemplos": ["Etiqueta: 'TD Depto 501 · 220 V · 40 A · 1F · IP41 · Instalaciones XX · 2026'."]
      },
      {
        "tema": "Espacios de trabajo y salas eléctricas (5.4)",
        "explicacion": "Zona alcanzable por una persona: 2,50 m hacia arriba, 1,0 m hacia los lados y 1,0 m hacia abajo (5.4.1). Espacio libre mínimo frente a partes energizadas (tabla 2.1, 0-1000 V): 0,90 m (condición 1: el otro lado no conductor), 1,20 m (condición 2: el otro lado conductor a tierra, como un muro de hormigón) y 1,50 m (condición 3: partes energizadas a ambos lados). Si la parte descubierta está al frente del tablero: 1,50 m (5.4.3). Acceso de al menos 0,80 m × 2,20 m, puerta que abre hacia afuera y se abre desde dentro sin llave (5.4.4); altura libre ≥ 1,0 m sobre el espacio (5.4.5); iluminancia ≥ 500 lux (5.4.6); sin almacenamiento (5.4.7). Salas eléctricas: exclusivas, RF 120, aislantes secos o líquidos clase K (ignición > 300 °C) (5.4.9), luz de emergencia ≥ 2 h y 5 lux (5.4.10).",
        "ejemplos": ["Tablero con partes energizadas frente a un muro de ladrillo: espacio libre de 1,20 m (condición 2)."]
      },
      {
        "tema": "Construcción (6.1)",
        "explicacion": "Todo en cajas, gabinetes o armarios, con cubierta cubre equipos y puerta exterior; las protecciones solo se alcanzan abriendo la puerta (6.1.3 y 6.1.4). Bandejas portaconductores ocupadas como máximo al 50 %, salvo tableros de menos de 8 circuitos (6.1.16.1). Reserva de 25 % de la capacidad por tipo de servicio en instalaciones nuevas (6.1.16.3). Materiales no metálicos: no higroscópicos, autoextinguentes, IK 07 (2 J), resistentes a UV en intemperie y libres de halógenos en lugares de reunión de personas (6.1.19). Altura de los dispositivos de comando: entre 0,45 m y 2,0 m sobre el piso terminado (6.1.22).",
        "ejemplos": ["Tablero nuevo con 12 circuitos de alumbrado: reservar espacio para 3 más (25 %)."]
      },
      {
        "tema": "Grado IP y distancias internas (6.1.20 y 6.1.21)",
        "explicacion": "No se aceptan tableros abiertos. IP mínimo: IP 41 en interior; IP 44 en exterior bajo techo; IP 54 en exterior sin techo; IP X4 en lugares mojados (más 6,5 mm de separación de la pared en húmedos y mojados). En exterior sin techo, las canalizaciones entran por abajo. Distancias mínimas entre partes desnudas (tabla 2.2): hasta 200 V: 15 mm al aire, 20 mm sobre superficie y 15 mm a tierra; 201-400 V: 20 / 35 / 15 mm; 401-1000 V: 30 / 50 / 30 mm.",
        "formula": "IP X Y → X = sólidos (0-6) · Y = agua (0-8)\nInterior IP41 · Exterior bajo techo IP44 · Intemperie IP54 · Mojado IPX4",
        "ejemplos": ["Tablero en un patio sin techo: IP 54 mínimo y entradas por la parte inferior."]
      },
      {
        "tema": "Material eléctrico (6.2)",
        "explicacion": "Cableado interno según las tablas del RIC N°04 con el método A1 (6.2.2). Barras desnudas con barrera y símbolo de riesgo eléctrico; la cubierta cubre equipos sola no basta (6.2.3). No se cablea de dispositivo a dispositivo, salvo un automático hacia un diferencial; para repartir se usan barras o peines, que deben usar el 100 % de sus accesorios (6.2.4). El diferencial debe quedar protegido por un termomagnético: su In debe ser ≥ la In del automático aguas arriba, o la suma de las In de los automáticos aguas abajo ≤ In del diferencial (6.2.6). Secuencia de barras: azul, negro, rojo (R-S-T), de izquierda a derecha, de arriba hacia abajo y de adelante hacia atrás (6.2.9). Regletas para los consumos externos, salvo tableros de menos de 8 circuitos (6.2.12). Tableros de 100 A o más: instrumentos de V e I por fase (6.2.13). Luces piloto por fase, salvo tableros domiciliarios de hasta 3 circuitos (6.2.14). Circuitos de control protegidos con máximo 10 A (6.2.15).",
        "formula": "Diferencial protegido si:\n  In diferencial ≥ In automático aguas arriba,  o\n  Σ In automáticos aguas abajo ≤ In diferencial",
        "ejemplos": ["Diferencial de 40 A con 3 automáticos aguas abajo de 10 + 16 + 10 = 36 A → cumple.", "Diferencial de 25 A con 2 automáticos de 16 A (32 A) y sin automático aguas arriba de ≤ 25 A → no cumple."]
      },
      {
        "tema": "Orden de conexionado (6.3)",
        "explicacion": "La alimentación llega primero al dispositivo de maniobra y luego al de protección (6.3.1). En automáticos verticales, la alimentación entra por los contactos fijos para que, al abrir, los bornes de abajo queden sin tensión; si técnicamente no se puede, se avisa con un letrero de acrílico rojo con letras blancas (6.3.2). Fusibles tipo D: alimentación al contacto central (6.3.4). Fusibles limitadores en serie con disyuntores: la alimentación llega primero a los fusibles (6.3.5).",
        "ejemplos": ["Alimentar un automático 'por abajo' deja tensión en los bornes inferiores aunque esté abierto: peligro para quien lo mantiene."]
      },
      {
        "tema": "Tableros generales y de distribución (6.4 a 6.6)",
        "explicacion": "Todo tablero se conecta a tierra según el RIC N°06 (6.4). Tablero general obligatorio si hay más de un tablero de distribución, o si el único tablero está a más de 30 m del medidor (6.5.1-6.5.2). Un TG con más de un alimentador lleva interruptor general de corte omnipolar (6.5.3), y no mezcla alimentadores de distintas tensiones (6.5.5). Tablero de distribución: máximo 25 circuitos por protección general (6.6.1); interruptor general omnipolar, salvo domiciliarios de hasta 3 circuitos (6.6.2); servicios distintos (fuerza, alumbrado, climatización) agrupados con su propio general omnipolar, salvo servicios de menos de 4 circuitos (6.6.3). Aeropuertos, hoteles de más de 300 habitaciones, espectáculos de más de 1.000 personas, centros comerciales de más de 2.000 m², edificios de oficinas de gran altura y ambientes explosivos: diferencial general de 300 mA o detección de falla de arco (IEC 62606) en todos los circuitos (6.6.4).",
        "ejemplos": ["Casa con un tablero a 40 m del medidor: necesita tablero general junto al empalme."]
      },
      {
        "tema": "Móviles, transferencia, CCM y verificaciones (6.7 a 6.10)",
        "explicacion": "Tableros móviles: pulsador exterior de emergencia con enclavamiento, cordón flexible H07RN-F (5 conductores trifásico / 3 monofásico) y mínimo IP 56 e IK 07 (6.7.1-6.7.3). Edificios de más de 5 pisos con respaldo con transferencia automática o con autogeneración: botonera en el acceso principal que desconecte todas las fuentes (6.7.5). CCM según IEC 61439-1/-2 y resistencia al arco según IEC TR 61641 (6.9). Verificaciones de diseño y pruebas de rutina: tableros de más de 100 A y menos de 1.500 A según el anexo 2.3; de 1.500 A o más, según IEC 61439 (6.10). El anexo 2.3 incluye conformidad con planos, rotulado, código de colores, torque, pruebas dieléctricas, continuidad de masas, resistencia de aislación y prueba de diferenciales.",
        "ejemplos": ["Tablero de faena para una obra: móvil, IP 56, IK 07 y con setas de emergencia."]
      }
    ],
    "terminos": [
      {"es": "tablero eléctrico", "en": "switchboard (panelboard)", "definicion": "Equipo que concentra dispositivos de protección y maniobra para proteger y operar la instalación (RIC N°02 · 4.25).", "ejemplo": "Label every switchboard."},
      {"es": "tablero general", "en": "main switchboard", "definicion": "Tablero principal desde el que se protegen los alimentadores y se opera toda la instalación (4.25.1.1).", "ejemplo": "The main switchboard needs an all-pole main switch."},
      {"es": "tablero de distribución", "en": "distribution board", "definicion": "Tablero que protege y opera directamente los circuitos (4.25.1.3); máximo 25 circuitos por protección general.", "ejemplo": "Each apartment has a distribution board."},
      {"es": "cubierta cubre equipos", "en": "dead front", "definicion": "Tapa interior que impide el contacto con partes energizadas al operar las protecciones (6.1.8).", "ejemplo": "Remove the dead front only for maintenance."},
      {"es": "grado IP", "en": "IP code (ingress protection)", "definicion": "Grado de protección de una envolvente contra sólidos (1er dígito) y agua (2° dígito).", "ejemplo": "Indoor boards need at least IP41."},
      {"es": "corte omnipolar", "en": "all-pole disconnection", "definicion": "Corte simultáneo de todos los conductores activos, incluido el neutro (4.7).", "ejemplo": "The main switch must provide all-pole disconnection."},
      {"es": "disyuntor termomagnético", "en": "circuit breaker (MCB)", "definicion": "Protección que desconecta automáticamente ante sobrecarga o cortocircuito (4.10).", "ejemplo": "A 16 A circuit breaker protects the socket circuit."},
      {"es": "protector diferencial", "en": "residual current device (RCD)", "definicion": "Protección que desconecta ante una falla a masa, cuando la suma fasorial de corrientes supera un valor (4.19).", "ejemplo": "Every RCD must be protected by a breaker."},
      {"es": "sensibilidad", "en": "rated residual current (IΔn)", "definicion": "Corriente diferencial que hace operar al protector diferencial (4.21), por ejemplo 30 mA o 300 mA.", "ejemplo": "A 300 mA RCD protects against fire."},
      {"es": "diagrama unilineal", "en": "single-line diagram", "definicion": "Esquema simplificado de la instalación que todo tablero debe llevar adherido y actualizado (5.3.6.2).", "ejemplo": "Keep the single-line diagram inside the door."},
      {"es": "barra de distribución", "en": "busbar", "definicion": "Conductor rígido que reparte la energía dentro del tablero; desnuda debe ir con barrera (6.2.3).", "ejemplo": "Busbars follow the blue-black-red sequence."},
      {"es": "peine", "en": "busbar comb", "definicion": "Conexión prefabricada entre protecciones; debe usar el 100 % de sus accesorios (6.2.4.3).", "ejemplo": "Use a busbar comb instead of jumpers."},
      {"es": "regleta de conexiones", "en": "terminal block", "definicion": "Bornes a los que llegan los conductores de los consumos externos (6.2.12).", "ejemplo": "Field wiring lands on the terminal block."},
      {"es": "centro de control de motores", "en": "motor control center (MCC)", "definicion": "Envolvente con gavetas desde donde se conectan, protegen y controlan motores (4.25.1.8).", "ejemplo": "Each motor starter has its own drawer in the MCC."},
      {"es": "tablero de transferencia", "en": "transfer switch panel", "definicion": "Tablero que cambia la alimentación entre la red y una fuente alternativa sin que coexistan (4.25.1.9).", "ejemplo": "The transfer switch starts the generator."}
    ],
    "calculadoras": ["tablero"],
    "practica": [
      {"tipo": "texto", "pregunta": "Grado IP mínimo de un tablero instalado en interior (ej.: IP 00).", "respuestas": ["IP 41", "IP41"], "explicacion": "6.1.21.2: IP 41 mínimo en interior."},
      {"tipo": "texto", "pregunta": "Grado IP mínimo de un tablero al exterior SIN techo.", "respuestas": ["IP 54", "IP54"], "explicacion": "6.1.21.3: IP 44 bajo techo; IP 54 si no está bajo techo."},
      {"tipo": "numero", "pregunta": "Tablero nuevo con 16 circuitos de alumbrado. ¿Cuántos espacios de reserva como mínimo? (25 %)", "respuesta": 4, "tolerancia": 0, "unidad": "espacios", "explicacion": "16 × 0,25 = 4 (6.1.16.3)."},
      {"tipo": "numero", "pregunta": "Máximo de circuitos por protección general en un tablero de distribución (6.6.1).", "respuesta": 25, "tolerancia": 0, "unidad": "circuitos", "explicacion": "25 circuitos por cada protección general."},
      {"tipo": "numero", "pregunta": "Espacio libre mínimo frente a partes energizadas descubiertas, con un muro de hormigón al frente (condición 2). (m)", "respuesta": 1.2, "tolerancia": 0, "unidad": "m", "explicacion": "Tabla 2.1: 0,90 / 1,20 / 1,50 m para las condiciones 1, 2 y 3."},
      {"tipo": "alternativas", "pregunta": "¿Cuándo es obligatorio un tablero general si hay un único tablero de distribución?", "opciones": ["Si está a más de 30 m del medidor", "Siempre", "Nunca", "Si tiene más de 3 circuitos"], "respuestas": ["Si está a más de 30 m del medidor"], "explicacion": "6.5.2."},
      {"tipo": "alternativas", "pregunta": "Diferencial de 40 A con automáticos aguas abajo de 16 + 16 + 10 A. ¿Cumple el 6.2.6 (sin automático aguas arriba)?", "opciones": ["No cumple: la suma es 42 A, mayor que 40 A", "Cumple: la suma es menor que 40 A", "No aplica a diferenciales", "Cumple solo si es de 30 mA"], "respuestas": ["No cumple: la suma es 42 A, mayor que 40 A"], "explicacion": "16 + 16 + 10 = 42 A > 40 A: no cumple. Necesitaría un automático aguas arriba de ≤ 40 A."},
      {"tipo": "vf", "pregunta": "Un tablero domiciliario de 2 circuitos debe llevar luces piloto por fase.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "6.2.14: se exceptúan los tableros domiciliarios de hasta 3 circuitos."},
      {"tipo": "numero", "pregunta": "Corriente nominal desde la cual un tablero debe llevar instrumentos de tensión y corriente por fase (6.2.13). (A)", "respuesta": 100, "tolerancia": 0, "unidad": "A", "explicacion": "Igual o superior a 100 A."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'protector diferencial' en inglés? (sigla o nombre)", "respuestas": ["RCD", "residual current device"], "explicacion": "RCD: residual current device."}
    ],
    "escritura": {
      "consigna": "Describe cómo debe quedar el tablero de distribución de un local comercial de 18 circuitos (alumbrado y fuerza) que está en interior y dentro de un lugar de reunión de personas.",
      "minPalabras": 80,
      "obligatorias": ["IP 41", "25 %", "omnipolar", "llave"],
      "modelo": "El tablero debe ir en un nicho o gabinete cerrado con llave, porque es un lugar de reunión de personas, con acceso solo para personal calificado. Al estar en interior, su grado mínimo es IP 41 y debe tener cubierta cubre equipos y puerta. Como tiene alumbrado y fuerza, cada servicio va agrupado con su propio general de corte omnipolar, además del interruptor general. Hay que dejar un 25 % de reserva, usar bandejas portaconductores y regletas por tener más de 8 circuitos, y rotular cada circuito con su diagrama unilineal."
    },
    "prueba": [
      {"tipo": "alternativas", "pregunta": "¿Qué tablero alimenta subalimentadores que energizan tableros de distribución?", "opciones": ["Tablero general auxiliar", "Tablero de paso", "Tablero de comando", "Tablero móvil"], "respuestas": ["Tablero general auxiliar"], "explicacion": "4.25.1.2."},
      {"tipo": "texto", "pregunta": "Grado IP mínimo para un tablero en exterior bajo techo.", "respuestas": ["IP 44", "IP44"], "explicacion": "6.1.21.3."},
      {"tipo": "numero", "pregunta": "Altura mínima de montaje de los dispositivos de comando de un tablero sobre el piso terminado (6.1.22). (m)", "respuesta": 0.45, "tolerancia": 0, "unidad": "m", "explicacion": "Entre 0,45 m y 2,0 m."},
      {"tipo": "numero", "pregunta": "Distancia mínima entre partes desnudas de distinta polaridad TENDIDAS AL AIRE en un tablero de 380 V (tabla 2.2). (mm)", "respuesta": 20, "tolerancia": 0, "unidad": "mm", "explicacion": "Rango 201-400 V: 20 mm al aire, 35 mm sobre superficie y 15 mm a tierra."},
      {"tipo": "numero", "pregunta": "Iluminancia mínima de los espacios de trabajo de tableros y salas eléctricas (5.4.6). (lux)", "respuesta": 500, "tolerancia": 0, "unidad": "lux", "explicacion": "500 lux."},
      {"tipo": "numero", "pregunta": "Espacio libre mínimo cuando hay partes energizadas descubiertas a ambos lados y el operario trabaja entre ellas (condición 3). (m)", "respuesta": 1.5, "tolerancia": 0, "unidad": "m", "explicacion": "Tabla 2.1."},
      {"tipo": "alternativas", "pregunta": "¿Cuál es la secuencia de colores de las barras R-S-T según el 6.2.9?", "opciones": ["Azul, negro, rojo", "Rojo, negro, azul", "Negro, rojo, azul", "Café, negro, gris"], "respuestas": ["Azul, negro, rojo"], "explicacion": "De izquierda a derecha, de arriba hacia abajo y de adelante hacia atrás."},
      {"tipo": "alternativas", "pregunta": "En un automático montado verticalmente, ¿por dónde debe llegar la alimentación?", "opciones": ["Por los contactos fijos, para que al abrir queden sin tensión los bornes de abajo", "Por los bornes inferiores", "Da lo mismo", "Por el neutro"], "respuestas": ["Por los contactos fijos, para que al abrir queden sin tensión los bornes de abajo"], "explicacion": "6.3.2; si no se puede, letrero de acrílico rojo con letras blancas."},
      {"tipo": "numero", "pregunta": "Tablero nuevo con 20 circuitos de fuerza. ¿Cuántos espacios de reserva como mínimo?", "respuesta": 5, "tolerancia": 0, "unidad": "espacios", "explicacion": "20 × 25 % = 5."},
      {"tipo": "alternativas", "pregunta": "Centro comercial de 5.000 m². ¿Qué medida contra incendio exige el 6.6.4 en sus tableros de distribución?", "opciones": ["Diferencial general de 300 mA o detección de falla de arco en todos los circuitos", "Solo extintores", "Diferenciales de 30 mA únicamente", "Tableros metálicos"], "respuestas": ["Diferencial general de 300 mA o detección de falla de arco en todos los circuitos"], "explicacion": "Aplica a centros comerciales de más de 2.000 m², entre otros."},
      {"tipo": "vf", "pregunta": "Se puede cablear un tablero de dispositivo a dispositivo, por ejemplo de un automático a otro automático.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "6.2.4: solo se acepta de un automático a un diferencial; para repartir se usan barras o peines."},
      {"tipo": "numero", "pregunta": "Corriente máxima de la protección de los circuitos de control y luces piloto (6.2.15). (A)", "respuesta": 10, "tolerancia": 0, "unidad": "A", "explicacion": "Máximo 10 A, con capacidad de ruptura adecuada."},
      {"tipo": "alternativas", "pregunta": "Un tablero de 800 A. ¿Cómo se hacen sus verificaciones de diseño y pruebas de rutina?", "opciones": ["Según el anexo 2.3 del RIC N°02", "Según IEC 61439", "No requiere", "Las hace la SEC"], "respuestas": ["Según el anexo 2.3 del RIC N°02"], "explicacion": "Más de 100 A y menos de 1.500 A → anexo 2.3; de 1.500 A o más → IEC 61439 (6.10)."},
      {"tipo": "texto", "pregunta": "Grado mínimo de protección contra impactos de un tablero móvil (código IK).", "respuestas": ["IK 07", "IK07", "IK 7"], "explicacion": "6.7.3: IP 56 e IK 07 mínimo."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'diagrama unilineal' en inglés?", "respuestas": ["single-line diagram", "single line diagram", "one-line diagram"], "explicacion": "Single-line diagram."},
      {"tipo": "escritura", "pregunta": "En 70+ palabras: explica cómo se protege un diferencial dentro de un tablero (6.2.6) y por qué no se cablea de dispositivo a dispositivo.", "minPalabras": 70, "obligatorias": ["diferencial", "termomagnético", "peine", "barra"]}
    ],
    "fuentes": [
      {"titulo": "SEC — Pliego Técnico Normativo RIC N°02 Tableros eléctricos (en tu Drive: Electricidad/Pliegos RIC)", "url": "https://www.sec.cl/reglamento-de-seguridad-de-las-instalaciones-de-consumo-de-energia-electrica-decreto-08/"}
    ]
  }
]
);
