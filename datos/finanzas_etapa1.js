window.CLASES_FIN = window.CLASES_FIN || []; window.CLASES_FIN.push(...
[
  {
    "id": 101,
    "etapa": 1,
    "titulo": "El dinero, la inflación y la UF",
    "subtitulo": "Qué son las finanzas · inflación · IPC · UF",
    "objetivo": "Entender por qué el dinero pierde valor, cómo se mide la inflación en Chile y para qué existe la UF.",
    "teoria": [
      {
        "tema": "¿Qué son las finanzas?",
        "explicacion": "Las finanzas estudian cómo personas, empresas y gobiernos toman decisiones sobre el dinero a lo largo del tiempo y con riesgo. Tres ideas atraviesan TODO el curso: (1) el valor del dinero en el tiempo: $1 hoy vale más que $1 mañana; (2) riesgo y retorno: para esperar ganar más, hay que aceptar más incertidumbre; (3) costo de oportunidad: cada peso que usas en algo deja de estar disponible para otra cosa.",
        "ejemplos": ["Dejar $1.000.000 en la cuenta corriente tiene un costo de oportunidad: lo que habría ganado en un depósito a plazo.", "Una acción puede rentar más que un depósito, pero también puede caer: más retorno esperado = más riesgo."]
      },
      {
        "tema": "Inflación y poder adquisitivo",
        "explicacion": "La inflación es el alza sostenida y generalizada de los precios. No es que suba un producto: sube 'el nivel' de precios. Su efecto es que con el mismo dinero compras menos: baja tu poder adquisitivo. Si los precios bajan de forma generalizada se llama deflación.",
        "formula": "Variación % = (Precio final − Precio inicial) / Precio inicial × 100\nPoder adquisitivo de un monto futuro = Monto / (1 + inflación)",
        "ejemplos": ["Pan de $2.000 a $2.200: (2.200 − 2.000) / 2.000 = 10%.", "$1.000.000 con inflación de 5%: al año compran lo que hoy compran $1.000.000 / 1,05 = $952.381."]
      },
      {
        "tema": "El IPC: cómo se mide la inflación en Chile",
        "explicacion": "El Índice de Precios al Consumidor (IPC) lo elabora el INE cada mes. Mide la variación de precios de una canasta de bienes y servicios que consumen los hogares (alimentos, transporte, vivienda, salud, educación…). La canasta y el peso de cada producto salen de la Encuesta de Presupuestos Familiares. Se publica alrededor del día 8 de cada mes. Ojo con tres cifras distintas: variación mensual, acumulada en el año (desde diciembre) y en 12 meses (la que se usa para hablar de 'la inflación anual').",
        "ejemplos": ["'El IPC de marzo fue 0,4%' = variación mensual.", "'La inflación en 12 meses es 4,1%' = de marzo del año pasado a marzo de este año."]
      },
      {
        "tema": "Las variaciones se componen, no se suman",
        "explicacion": "Para acumular la inflación de varios meses se multiplican los factores (1 + variación). Sumar da una aproximación que se equivoca más mientras más grandes son las cifras.",
        "formula": "Acumulada = (1 + v1) × (1 + v2) × … − 1",
        "ejemplos": ["Enero 0,5% y febrero 0,3%: 1,005 × 1,003 − 1 = 0,8015% (sumar daría 0,8%)."]
      },
      {
        "tema": "La UF (Unidad de Fomento)",
        "explicacion": "La UF es una unidad de cuenta que se reajusta según la inflación. La calcula el Banco Central: cambia cada día desde el día 10 de un mes hasta el 9 del siguiente, distribuyendo (con tasa geométrica diaria) la variación del IPC del mes anterior. Por eso los contratos en UF (créditos hipotecarios, arriendos, seguros, planes de salud) mantienen su valor real: protegen a quien recibe el pago. Para quien paga, una deuda en UF sube en pesos cuando hay inflación.",
        "formula": "Monto en pesos = Cantidad de UF × Valor de la UF del día",
        "ejemplos": ["Arriendo de 12 UF con la UF a $39.500 → 12 × 39.500 = $474.000.", "El valor diario de la UF se consulta en bcentral.cl o sii.cl."]
      },
      {
        "tema": "Puntos porcentuales vs. porcentaje",
        "explicacion": "Si una tasa pasa de 3% a 5%, subió 2 puntos porcentuales (pp). En términos relativos subió 66,7% (2/3). Hablar de 'pp' cuando comparas dos porcentajes es lo que hace alguien que sabe de finanzas.",
        "ejemplos": ["'La inflación bajó de 6% a 4%' = bajó 2 pp. Ojo: los precios siguen subiendo, solo que más lento."]
      }
    ],
    "terminos": [
      {"es": "finanzas", "en": "finance", "definicion": "Estudio de cómo se toman decisiones sobre el dinero a lo largo del tiempo y con riesgo.", "ejemplo": "Personal finance helps you plan your money."},
      {"es": "valor del dinero en el tiempo", "en": "time value of money", "definicion": "Principio de que un peso hoy vale más que un peso en el futuro, porque puede invertirse y porque hay inflación.", "ejemplo": "The time value of money explains why we charge interest."},
      {"es": "costo de oportunidad", "en": "opportunity cost", "definicion": "Lo que dejas de ganar por elegir una alternativa en vez de la mejor otra opción disponible.", "ejemplo": "Cash in a drawer has an opportunity cost."},
      {"es": "riesgo", "en": "risk", "definicion": "Posibilidad de que el resultado sea distinto (y peor) al esperado.", "ejemplo": "Stocks carry more risk than bank deposits."},
      {"es": "retorno", "en": "return", "definicion": "Ganancia o pérdida de una inversión, normalmente expresada en porcentaje (también: rentabilidad).", "ejemplo": "The return was 8% last year."},
      {"es": "inflación", "en": "inflation", "definicion": "Alza sostenida y generalizada del nivel de precios de una economía.", "ejemplo": "Inflation reduces what your money can buy."},
      {"es": "deflación", "en": "deflation", "definicion": "Baja sostenida y generalizada del nivel de precios.", "ejemplo": "Deflation is rare and often bad for the economy."},
      {"es": "poder adquisitivo", "en": "purchasing power", "definicion": "Cantidad de bienes y servicios que puedes comprar con una cantidad de dinero.", "ejemplo": "High inflation erodes purchasing power."},
      {"es": "IPC", "en": "CPI (consumer price index)", "definicion": "Índice de Precios al Consumidor: mide la variación mensual de precios de una canasta de consumo de los hogares. Lo publica el INE.", "ejemplo": "The CPI rose 0.4% in March."},
      {"es": "canasta", "en": "basket (of goods and services)", "definicion": "Conjunto representativo de bienes y servicios cuyos precios se siguen para calcular el IPC.", "ejemplo": "The CPI basket includes food, transport and rent."},
      {"es": "UF", "en": "inflation-indexed unit of account (UF)", "definicion": "Unidad de Fomento: unidad de cuenta que calcula el Banco Central y se reajusta diariamente según el IPC.", "ejemplo": "Mortgages in Chile are usually in UF."},
      {"es": "reajuste", "en": "indexation", "definicion": "Ajuste de un monto según un índice (por ejemplo, el IPC) para mantener su valor real.", "ejemplo": "Rents are often subject to indexation."},
      {"es": "variación porcentual", "en": "percentage change", "definicion": "Cambio de un valor expresado como porcentaje del valor inicial.", "ejemplo": "The percentage change in price was 10%."},
      {"es": "punto porcentual", "en": "percentage point", "definicion": "Diferencia aritmética entre dos porcentajes (de 3% a 5% = 2 puntos porcentuales).", "ejemplo": "Inflation fell by two percentage points."},
      {"es": "Banco Central", "en": "central bank", "definicion": "Institución autónoma que cuida la estabilidad de precios (controlar la inflación) y calcula la UF.", "ejemplo": "The central bank targets 3% inflation."}
    ],
    "calculadoras": ["inflacion_uf"],
    "practica": [
      {"tipo": "numero", "pregunta": "Un kilo de pan costaba $2.000 y ahora cuesta $2.200. ¿Cuál fue la variación porcentual?", "respuesta": 10, "tolerancia": 0.05, "unidad": "%", "explicacion": "(2.200 − 2.000) / 2.000 = 0,10 = 10%."},
      {"tipo": "alternativas", "pregunta": "¿Qué mide el IPC?", "opciones": ["La variación de precios de una canasta de bienes y servicios de los hogares", "El crecimiento de la economía", "El valor del dólar", "Las tasas de interés de los bancos"], "respuestas": ["La variación de precios de una canasta de bienes y servicios de los hogares"], "explicacion": "El IPC sigue los precios de una canasta representativa del consumo de los hogares. El crecimiento de la economía lo mide el PIB."},
      {"tipo": "texto", "pregunta": "¿Qué institución elabora el IPC en Chile? (sigla)", "respuestas": ["INE", "Instituto Nacional de Estadísticas"], "explicacion": "El INE (Instituto Nacional de Estadísticas) publica el IPC cada mes."},
      {"tipo": "alternativas", "pregunta": "¿Quién calcula el valor diario de la UF?", "opciones": ["El Banco Central", "El INE", "El SII", "Los bancos comerciales"], "respuestas": ["El Banco Central"], "explicacion": "El Banco Central la calcula usando el IPC que publica el INE. El SII también publica su valor, pero no la calcula."},
      {"tipo": "numero", "pregunta": "Guardas $1.000.000 bajo el colchón y la inflación del año es 5%. ¿Cuánto poder de compra tendrán al final del año, en pesos de hoy? (redondea)", "respuesta": 952381, "tolerancia": 500, "unidad": "$", "explicacion": "1.000.000 / 1,05 = 952.381. Perdiste unos $47.619 de poder de compra sin 'gastar' nada."},
      {"tipo": "vf", "pregunta": "Si la inflación de un año es 4%, el dinero que no gana intereses pierde poder adquisitivo.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "Los precios suben 4% y tu dinero sigue igual: compras menos."},
      {"tipo": "alternativas", "pregunta": "La inflación anual pasó de 3% a 5%. ¿Cuál es la forma correcta de decirlo?", "opciones": ["Subió 2 puntos porcentuales", "Subió 2%", "Subió 5%", "Bajó 2 puntos porcentuales"], "respuestas": ["Subió 2 puntos porcentuales"], "explicacion": "Entre dos porcentajes, la diferencia se dice en puntos porcentuales. En términos relativos subió 66,7%."},
      {"tipo": "numero", "pregunta": "IPC de enero: +0,5%; febrero: +0,3%. ¿Inflación acumulada en los dos meses? (2 decimales)", "respuesta": 0.80, "tolerancia": 0.006, "unidad": "%", "explicacion": "1,005 × 1,003 − 1 = 0,8015% ≈ 0,80%. Las variaciones se componen."},
      {"tipo": "texto", "pregunta": "Término: cantidad de bienes y servicios que puedes comprar con tu dinero.", "respuestas": ["poder adquisitivo", "poder de compra", "purchasing power"], "explicacion": "Poder adquisitivo (purchasing power)."},
      {"tipo": "numero", "pregunta": "Tu arriendo es de 12 UF. Si la UF vale $39.500, ¿cuánto pagas en pesos?", "respuesta": 474000, "tolerancia": 0, "unidad": "$", "explicacion": "12 × 39.500 = 474.000."}
    ],
    "escritura": {
      "consigna": "Explícale a un amigo por qué un arriendo en UF sube un poco cada mes y qué tiene que ver con el IPC y la inflación.",
      "minPalabras": 60,
      "obligatorias": ["UF", "IPC", "inflación", "Banco Central"],
      "modelo": "Tu arriendo está en UF, y la UF es una unidad que se reajusta con la inflación. Cada mes el INE publica el IPC, que mide cuánto subieron los precios de una canasta de consumo. Con ese dato, el Banco Central calcula el valor de la UF para cada día entre el 10 de un mes y el 9 del siguiente. Si hubo inflación, la UF sube un poco cada día, y tu arriendo en pesos también. Así el dueño no pierde poder adquisitivo, pero tú pagas más pesos."
    },
    "prueba": [
      {"tipo": "alternativas", "pregunta": "¿Qué es la inflación?", "opciones": ["Un alza sostenida y generalizada de los precios", "El alza del precio de un solo producto", "El aumento del sueldo mínimo", "La baja del dólar"], "respuestas": ["Un alza sostenida y generalizada de los precios"], "explicacion": "Generalizada (muchos precios) y sostenida (en el tiempo)."},
      {"tipo": "numero", "pregunta": "Un producto subió de $5.000 a $5.400. ¿Variación porcentual?", "respuesta": 8, "tolerancia": 0.05, "unidad": "%", "explicacion": "400 / 5.000 = 8%."},
      {"tipo": "numero", "pregunta": "Un precio bajó de $8.000 a $6.000. ¿Variación porcentual? (negativa si bajó)", "respuesta": -25, "tolerancia": 0.05, "unidad": "%", "explicacion": "(6.000 − 8.000) / 8.000 = −25%."},
      {"tipo": "numero", "pregunta": "Con una inflación de 10% en el año, ¿cuánto valen en pesos de hoy $110.000 que recibirás en un año?", "respuesta": 100000, "tolerancia": 50, "unidad": "$", "explicacion": "110.000 / 1,10 = 100.000."},
      {"tipo": "alternativas", "pregunta": "La UF se reajusta…", "opciones": ["cada día, del 10 de un mes al 9 del siguiente, según el IPC del mes anterior", "una vez al año, según el sueldo mínimo", "cada día, según el precio del dólar", "cuando los bancos lo deciden"], "respuestas": ["cada día, del 10 de un mes al 9 del siguiente, según el IPC del mes anterior"], "explicacion": "Así lo calcula el Banco Central con el IPC que publica el INE."},
      {"tipo": "alternativas", "pregunta": "Tienes un crédito hipotecario en UF y hay alta inflación. ¿Qué pasa con tu deuda medida en pesos?", "opciones": ["Aumenta", "Disminuye", "No cambia", "Desaparece"], "respuestas": ["Aumenta"], "explicacion": "La UF sube con la inflación, así que la misma cantidad de UF equivale a más pesos."},
      {"tipo": "texto", "pregunta": "Sigla del índice que mide la inflación en Chile.", "respuestas": ["IPC", "índice de precios al consumidor", "CPI"], "explicacion": "IPC = Índice de Precios al Consumidor (en inglés, CPI)."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'poder adquisitivo' en inglés?", "respuestas": ["purchasing power"], "explicacion": "Purchasing power."},
      {"tipo": "texto", "pregunta": "Término: lo que dejas de ganar por elegir una alternativa en vez de otra.", "respuestas": ["costo de oportunidad", "opportunity cost"], "explicacion": "Costo de oportunidad (opportunity cost)."},
      {"tipo": "numero", "pregunta": "IPC: +1% en marzo y +1% en abril. ¿Inflación acumulada en los dos meses? (2 decimales)", "respuesta": 2.01, "tolerancia": 0.006, "unidad": "%", "explicacion": "1,01 × 1,01 − 1 = 2,01% (no 2%)."},
      {"tipo": "alternativas", "pregunta": "En junio, la inflación 'acumulada en el año' mide la variación de precios…", "opciones": ["desde diciembre del año anterior hasta junio", "desde junio del año pasado hasta junio", "solo durante junio", "el promedio del año"], "respuestas": ["desde diciembre del año anterior hasta junio"], "explicacion": "Acumulada en el año = desde el cierre del año anterior. La de 12 meses compara con el mismo mes del año pasado."},
      {"tipo": "numero", "pregunta": "Si la UF vale $39.000 y tu plan de salud cuesta 3,5 UF, ¿cuánto pagas en pesos?", "respuesta": 136500, "tolerancia": 0, "unidad": "$", "explicacion": "3,5 × 39.000 = 136.500."},
      {"tipo": "vf", "pregunta": "La deflación es una baja generalizada y sostenida de los precios.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "Es lo contrario de la inflación."},
      {"tipo": "alternativas", "pregunta": "La inflación bajó de 6% a 4%. ¿Qué significa?", "opciones": ["Los precios siguen subiendo, pero más lento", "Los precios bajaron", "Los precios bajaron 2%", "La UF bajó"], "respuestas": ["Los precios siguen subiendo, pero más lento"], "explicacion": "Inflación más baja ≠ precios más bajos. Para que bajen tendría que haber deflación."},
      {"tipo": "numero", "pregunta": "Tu sueldo subió 4% y la inflación fue 6%. ¿Variación real aproximada de tu sueldo? (en %, negativa si perdiste)", "respuesta": -2, "tolerancia": 0.15, "unidad": "%", "explicacion": "Aproximado: 4 − 6 = −2%. Exacto: 1,04 / 1,06 − 1 = −1,89%. Ganas más pesos, pero compras menos."},
      {"tipo": "escritura", "pregunta": "En 60+ palabras: explícale a alguien qué es la inflación, cómo se mide en Chile y por qué existe la UF.", "minPalabras": 60, "obligatorias": ["inflación", "IPC", "UF", "poder adquisitivo"]}
    ],
    "fuentes": [
      {"titulo": "Banco Central de Chile — Metodología de la UF", "url": "https://si3.bcentral.cl/estadisticas/Principal1/Metodologias/EMF/UF.pdf"},
      {"titulo": "Monedario — Qué es el IPC y cómo se calcula", "url": "https://monedario.cl/posts/que-es-el-ipc-chile-como-se-calcula/"},
      {"titulo": "Finclaro — Qué es la UF", "url": "https://finclaro.cl/guias/que-es-la-uf-chile"}
    ]
  },
  {
    "id": 102,
    "etapa": 1,
    "titulo": "Interés simple y compuesto",
    "subtitulo": "Valor presente y futuro · regla del 72 · aportes periódicos",
    "objetivo": "Calcular cuánto crece tu dinero, cuánto vale hoy un pago futuro y por qué el tiempo es tu mejor aliado.",
    "teoria": [
      {
        "tema": "El interés: el precio del dinero",
        "explicacion": "El interés es lo que paga quien usa dinero ajeno (el deudor) a quien se lo presta (el acreedor). Para ti como ahorrante es una ganancia; como deudor, un costo. Se expresa como una tasa por período: % anual, % mensual.",
        "ejemplos": ["Un depósito a plazo te paga interés porque el banco usa tu dinero.", "Una tarjeta de crédito te cobra interés porque usas dinero del banco."]
      },
      {
        "tema": "Interés simple",
        "explicacion": "Los intereses se calculan SIEMPRE sobre el capital inicial. Los intereses ganados no generan nuevos intereses.",
        "formula": "VF = VP × (1 + r × n)\nIntereses = VP × r × n",
        "ejemplos": ["$1.000.000 al 6% simple por 3 años: 1.000.000 × (1 + 0,06 × 3) = $1.180.000."]
      },
      {
        "tema": "Interés compuesto",
        "explicacion": "Los intereses de cada período se suman al capital y el período siguiente también ganan intereses: 'interés sobre interés'. Es el motor de las inversiones de largo plazo (y de las deudas que crecen sin control).",
        "formula": "VF = VP × (1 + r)ⁿ",
        "ejemplos": ["$1.000.000 al 6% compuesto por 3 años: 1.000.000 × 1,06³ = $1.191.016 (vs. $1.180.000 simple).", "A 40 años al 7%, el dinero se multiplica por 15; a 30 años, por 7,6."]
      },
      {
        "tema": "Valor presente (VP) y valor futuro (VF)",
        "explicacion": "Llevar un monto futuro a hoy se llama descontar. La tasa usada es la tasa de descuento: lo que podrías ganar en otra alternativa de riesgo parecido. Es la base de TODA valoración: un bono, una empresa o un proyecto valen el valor presente de lo que van a pagar.",
        "formula": "VP = VF / (1 + r)ⁿ",
        "ejemplos": ["$1.000.000 en 3 años, descontados al 8%: 1.000.000 / 1,08³ = $793.832 hoy."]
      },
      {
        "tema": "Regla del 72",
        "explicacion": "Atajo mental para saber en cuántos años se duplica el dinero con interés compuesto: 72 dividido por la tasa anual (en %). Funciona bien entre 4% y 15%.",
        "formula": "Años para duplicar ≈ 72 / tasa (%)\nTasa necesaria ≈ 72 / años",
        "ejemplos": ["Al 8%: 72 / 8 ≈ 9 años.", "Para duplicar en 6 años necesitas ≈ 12% anual."]
      },
      {
        "tema": "Aportes periódicos (anualidad)",
        "explicacion": "Si ahorras un monto fijo cada período, cada aporte crece por el tiempo que le queda. La fórmula supone el aporte al final de cada período. La tasa y los aportes deben estar en el mismo período (mensual con mensual).",
        "formula": "VF = Aporte × [(1 + r)ⁿ − 1] / r",
        "ejemplos": ["$100.000 al mes, 12 meses, 1% mensual: 100.000 × (1,01¹² − 1) / 0,01 = $1.268.250."]
      }
    ],
    "terminos": [
      {"es": "interés", "en": "interest", "definicion": "Precio que se paga por usar dinero ajeno; ganancia para quien presta.", "ejemplo": "The bank pays interest on deposits."},
      {"es": "tasa de interés", "en": "interest rate", "definicion": "Interés expresado como porcentaje del capital por período (anual, mensual).", "ejemplo": "The interest rate is 6% per year."},
      {"es": "capital", "en": "principal", "definicion": "Monto inicial que se invierte o se pide prestado, sobre el que se calculan los intereses.", "ejemplo": "You pay interest on the principal."},
      {"es": "interés simple", "en": "simple interest", "definicion": "Interés calculado siempre sobre el capital inicial; los intereses no generan intereses.", "ejemplo": "Simple interest grows linearly."},
      {"es": "interés compuesto", "en": "compound interest", "definicion": "Interés que se suma al capital y genera nuevos intereses en los períodos siguientes.", "ejemplo": "Compound interest is the key to long-term investing."},
      {"es": "capitalización", "en": "compounding", "definicion": "Proceso de sumar los intereses al capital; puede ser anual, mensual, diaria.", "ejemplo": "Monthly compounding earns more than annual compounding."},
      {"es": "valor presente", "en": "present value", "definicion": "Lo que vale hoy un monto que se recibirá en el futuro, descontado a una tasa.", "ejemplo": "The present value of $1,000 in 3 years is less than $1,000."},
      {"es": "valor futuro", "en": "future value", "definicion": "Lo que valdrá en el futuro un monto de hoy, invertido a una tasa.", "ejemplo": "Calculate the future value of your savings."},
      {"es": "descontar", "en": "to discount", "definicion": "Llevar un flujo futuro a su valor de hoy dividiéndolo por (1 + tasa) elevado al número de períodos.", "ejemplo": "We discount future cash flows."},
      {"es": "tasa de descuento", "en": "discount rate", "definicion": "Tasa usada para traer flujos futuros a valor presente; refleja el costo de oportunidad y el riesgo.", "ejemplo": "A higher discount rate lowers the present value."},
      {"es": "regla del 72", "en": "rule of 72", "definicion": "Atajo: años para duplicar ≈ 72 / tasa anual (%).", "ejemplo": "By the rule of 72, money doubles in 9 years at 8%."},
      {"es": "anualidad", "en": "annuity", "definicion": "Serie de pagos o aportes iguales y periódicos.", "ejemplo": "Monthly savings are an annuity."},
      {"es": "período", "en": "period", "definicion": "Unidad de tiempo en que se aplica la tasa (mes, año). Tasa y plazo deben estar en el mismo período.", "ejemplo": "Use monthly rates with monthly periods."},
      {"es": "horizonte de inversión", "en": "investment horizon", "definicion": "Tiempo que piensas mantener una inversión antes de necesitar el dinero.", "ejemplo": "A long investment horizon allows more risk."},
      {"es": "rentabilidad", "en": "yield", "definicion": "Retorno de una inversión expresado en porcentaje (en renta fija se usa 'yield').", "ejemplo": "The deposit has a 5% yield."}
    ],
    "calculadoras": ["interes_compuesto"],
    "practica": [
      {"tipo": "numero", "pregunta": "Depositas $1.000.000 al 6% de interés SIMPLE anual por 3 años. ¿Cuánto tienes al final?", "respuesta": 1180000, "tolerancia": 0, "unidad": "$", "explicacion": "1.000.000 × (1 + 0,06 × 3) = 1.180.000."},
      {"tipo": "numero", "pregunta": "Mismo caso con interés COMPUESTO anual (6%, 3 años). (redondea al peso)", "respuesta": 1191016, "tolerancia": 2, "unidad": "$", "explicacion": "1.000.000 × 1,06³ = 1.191.016. La diferencia ($11.016) son intereses sobre intereses."},
      {"tipo": "alternativas", "pregunta": "¿Por qué el interés compuesto entrega más que el simple?", "opciones": ["Porque los intereses también generan intereses", "Porque la tasa es más alta", "Porque el banco regala dinero", "Porque paga menos impuestos"], "respuestas": ["Porque los intereses también generan intereses"], "explicacion": "Con la misma tasa, el compuesto reinvierte los intereses."},
      {"tipo": "numero", "pregunta": "Regla del 72: al 8% anual, ¿en cuántos años aproximadamente se duplica tu dinero?", "respuesta": 9, "tolerancia": 0.1, "unidad": "años", "explicacion": "72 / 8 = 9 años."},
      {"tipo": "numero", "pregunta": "¿Cuánto debes invertir hoy al 10% anual compuesto para tener $1.210.000 en 2 años?", "respuesta": 1000000, "tolerancia": 5, "unidad": "$", "explicacion": "VP = 1.210.000 / 1,10² = 1.000.000."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'interés compuesto' en inglés?", "respuestas": ["compound interest"], "explicacion": "Compound interest."},
      {"tipo": "vf", "pregunta": "Con interés compuesto, empezar a invertir 10 años antes puede pesar más que invertir el doble más tarde.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "Al 7%, 10 años extra multiplican el monto por ~1,97: casi lo mismo que duplicar el aporte."},
      {"tipo": "numero", "pregunta": "Inviertes $500.000 al 1% mensual compuesto por 12 meses. ¿Valor final? (redondea)", "respuesta": 563413, "tolerancia": 3, "unidad": "$", "explicacion": "500.000 × 1,01¹² = 563.412,5 ≈ 563.413."},
      {"tipo": "alternativas", "pregunta": "El 'valor presente' de un monto futuro es…", "opciones": ["lo que vale hoy ese monto, descontado a una tasa", "lo que tendrás en el futuro", "el interés del mes", "el precio de una acción"], "respuestas": ["lo que vale hoy ese monto, descontado a una tasa"], "explicacion": "VP = VF / (1 + r)ⁿ."},
      {"tipo": "numero", "pregunta": "Regla del 72: al 4% anual, ¿en cuántos años se duplica el dinero aproximadamente?", "respuesta": 18, "tolerancia": 0.1, "unidad": "años", "explicacion": "72 / 4 = 18 años."}
    ],
    "escritura": {
      "consigna": "Explica con un ejemplo de tu vida o de tu negocio cómo funciona el interés compuesto y por qué el tiempo importa tanto.",
      "minPalabras": 60,
      "obligatorias": ["interés compuesto", "capital", "tasa", "años"],
      "modelo": "Si guardo $1.000.000 de las ganancias del negocio en una inversión al 7% anual, el primer año gano $70.000. Con interés compuesto, el segundo año gano intereses sobre $1.070.000, no solo sobre el capital inicial. Así, en 10 años el monto casi se duplica, y en 30 años se multiplica por más de 7. Por eso el tiempo es tan importante: mientras más años, más intereses sobre intereses. Una tasa un poco mayor también hace una gran diferencia."
    },
    "prueba": [
      {"tipo": "numero", "pregunta": "Interés simple: $2.000.000 al 5% anual por 4 años. ¿Cuánto ganas SOLO en intereses?", "respuesta": 400000, "tolerancia": 0, "unidad": "$", "explicacion": "2.000.000 × 0,05 × 4 = 400.000."},
      {"tipo": "numero", "pregunta": "Interés compuesto: $2.000.000 al 5% anual por 4 años. ¿Valor final? (redondea al peso)", "respuesta": 2431013, "tolerancia": 2, "unidad": "$", "explicacion": "2.000.000 × 1,05⁴ = 2.431.012,5."},
      {"tipo": "numero", "pregunta": "Recibirás $1.000.000 en 3 años; la tasa de descuento es 8% anual. ¿Cuánto vale hoy? (redondea)", "respuesta": 793832, "tolerancia": 3, "unidad": "$", "explicacion": "1.000.000 / 1,08³ = 793.832."},
      {"tipo": "numero", "pregunta": "Regla del 72: al 12% anual, ¿años para duplicar?", "respuesta": 6, "tolerancia": 0.1, "unidad": "años", "explicacion": "72 / 12 = 6."},
      {"tipo": "numero", "pregunta": "Quieres duplicar tu dinero en 6 años. Según la regla del 72, ¿qué tasa anual necesitas? (%)", "respuesta": 12, "tolerancia": 0.1, "unidad": "%", "explicacion": "72 / 6 = 12%."},
      {"tipo": "alternativas", "pregunta": "Con una tasa de 10% anual, ¿qué vale más HOY?", "opciones": ["$1.000.000 hoy", "$1.050.000 en un año", "Valen lo mismo", "Depende del dólar"], "respuestas": ["$1.000.000 hoy"], "explicacion": "$1.050.000 en un año valen hoy 1.050.000 / 1,10 = $954.545 < $1.000.000."},
      {"tipo": "alternativas", "pregunta": "Con la misma tasa anual nominal, ¿qué capitalización genera más intereses?", "opciones": ["Mensual", "Anual", "Generan lo mismo", "Ninguna genera intereses"], "respuestas": ["Mensual"], "explicacion": "Mientras más seguido se capitaliza, antes empiezan los intereses a ganar intereses."},
      {"tipo": "texto", "pregunta": "Término: monto inicial que inviertes o pides prestado (en español o inglés).", "respuestas": ["capital", "principal"], "explicacion": "Capital (principal)."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'valor presente' en inglés?", "respuestas": ["present value", "PV"], "explicacion": "Present value (PV)."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'tasa de descuento' en inglés?", "respuestas": ["discount rate"], "explicacion": "Discount rate."},
      {"tipo": "numero", "pregunta": "Ahorras $100.000 al final de cada mes durante 12 meses, al 1% mensual compuesto. ¿Cuánto tienes al final? (redondea)", "respuesta": 1268250, "tolerancia": 3, "unidad": "$", "explicacion": "100.000 × (1,01¹² − 1) / 0,01 = 1.268.250. Sin intereses serían 1.200.000."},
      {"tipo": "vf", "pregunta": "Con interés simple, los intereses de cada año se calculan solo sobre el capital inicial.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "Esa es justamente la diferencia con el compuesto."},
      {"tipo": "alternativas", "pregunta": "Ana invierte $1.000.000 a los 25 años; Beto invierte $1.000.000 a los 35. Ambos al 7% anual, sin más aportes. A los 65, ¿quién tiene más?", "opciones": ["Ana, aproximadamente el doble que Beto", "Beto", "Tienen lo mismo", "Ana, solo un 10% más"], "respuestas": ["Ana, aproximadamente el doble que Beto"], "explicacion": "Ana: ×1,07⁴⁰ ≈ 15,0. Beto: ×1,07³⁰ ≈ 7,6. Diez años más ≈ el doble."},
      {"tipo": "numero", "pregunta": "¿Cuánto necesitas invertir hoy al 6% anual para tener $10.000.000 en 10 años? (redondea)", "respuesta": 5583948, "tolerancia": 5, "unidad": "$", "explicacion": "10.000.000 / 1,06¹⁰ = 5.583.948."},
      {"tipo": "numero", "pregunta": "Ahorras $100.000 al mes por 12 meses SIN intereses. ¿Total?", "respuesta": 1200000, "tolerancia": 0, "unidad": "$", "explicacion": "100.000 × 12 = 1.200.000."},
      {"tipo": "escritura", "pregunta": "En 60+ palabras: explica la diferencia entre interés simple y compuesto, y por qué conviene empezar a invertir temprano.", "minPalabras": 60, "obligatorias": ["interés compuesto", "interés simple", "capital", "tiempo"]}
    ],
    "fuentes": [
      {"titulo": "CFA Institute — Time value of money (Quantitative Methods, Level I)", "url": "https://finance.uworld.com/cfa/level-1-topics/"}
    ]
  },
  {
    "id": 103,
    "etapa": 1,
    "titulo": "Tasas: nominal, real, efectiva y la CAE",
    "subtitulo": "Ecuación de Fisher · tasas equivalentes · cuota de un crédito · CAE y costo total",
    "objetivo": "Comparar tasas correctamente y saber cuánto te cuesta de verdad un crédito.",
    "teoria": [
      {
        "tema": "Tasa nominal vs. tasa real (ecuación de Fisher)",
        "explicacion": "La tasa nominal es la que te dicen (en pesos). La tasa real descuenta la inflación: mide cuánto crece tu poder adquisitivo. Si la tasa real es negativa, tus ahorros pierden valor aunque 'ganen' intereses.",
        "formula": "Exacta: (1 + nominal) = (1 + real) × (1 + inflación)\nReal = (1 + nominal) / (1 + inflación) − 1\nAproximada: real ≈ nominal − inflación",
        "ejemplos": ["Nominal 8%, inflación 3% → real exacta 1,08 / 1,03 − 1 = 4,85% (aprox. 5%).", "Un depósito en UF + 2% ya te da una tasa real de 2%."]
      },
      {
        "tema": "Tasas equivalentes: mensual ↔ anual",
        "explicacion": "Una tasa mensual compuesta durante 12 meses equivale a una tasa anual EFECTIVA mayor que la mensual × 12. Para comparar, todo debe estar en el mismo período y en la misma forma.",
        "formula": "Anual efectiva = (1 + mensual)¹² − 1\nMensual equivalente = (1 + anual)^(1/12) − 1",
        "ejemplos": ["2% mensual → (1,02)¹² − 1 = 26,82% anual efectiva (no 24%).", "12% anual efectiva → 0,95% mensual."]
      },
      {
        "tema": "La cuota de un crédito (sistema francés)",
        "explicacion": "La mayoría de los créditos de consumo e hipotecarios tienen cuota fija. Al comienzo, la cuota paga sobre todo intereses (porque la deuda es grande) y poco capital; al final, al revés. A cada parte de capital pagado se le llama amortización. Alargar el plazo baja la cuota pero sube el total de intereses.",
        "formula": "Cuota = Monto × i / [1 − (1 + i)^(−n)]\ni = tasa del período (mensual), n = número de cuotas",
        "ejemplos": ["$2.000.000 al 1,5% mensual en 24 cuotas → cuota ≈ $99.848; total pagado ≈ $2.396.352."]
      },
      {
        "tema": "CAE y costo total del crédito (Chile)",
        "explicacion": "La Carga Anual Equivalente (CAE), creada por la Ley 20.555 ('Sernac Financiero'), resume en un porcentaje anual el costo de un crédito: incluye la tasa de interés, el plazo y todos los gastos y seguros asociados. Se calcula buscando la tasa mensual que iguala el monto líquido que recibes con el valor presente de lo que pagas, y esa tasa se multiplica por 12. El costo total del crédito es la suma de todo lo que pagarás. Para comparar créditos del mismo monto y plazo: mira la CAE y el costo total, no solo la tasa ni la cuota.",
        "formula": "CAE = tasa mensual (que iguala lo recibido con lo pagado) × 12\nCosto total = suma de todas las cuotas y pagos",
        "ejemplos": ["En el ejemplo del Sernac, la tasa mensual que iguala los flujos es 1,86% → CAE = 1,86% × 12 ≈ 22,3%.", "Dos créditos con la misma tasa pueden tener CAE distinta por los seguros y gastos."]
      },
      {
        "tema": "Tasa máxima convencional",
        "explicacion": "La ley (Ley 18.010) fija un tope de interés: la tasa máxima convencional, que se calcula a partir del interés corriente (promedio de mercado) que publica la CMF cada mes. Cobrar más es usura. Que un crédito esté bajo el tope no significa que sea barato.",
        "ejemplos": ["Si te ofrecen un crédito 'a la tasa máxima', es de los más caros que permite la ley."]
      }
    ],
    "terminos": [
      {"es": "tasa nominal", "en": "nominal interest rate", "definicion": "Tasa de interés expresada en pesos, sin descontar la inflación.", "ejemplo": "The nominal rate is 8%."},
      {"es": "tasa real", "en": "real interest rate", "definicion": "Tasa de interés descontada la inflación; mide el crecimiento del poder adquisitivo.", "ejemplo": "Negative real rates hurt savers."},
      {"es": "ecuación de Fisher", "en": "Fisher equation", "definicion": "(1 + nominal) = (1 + real) × (1 + inflación).", "ejemplo": "Use the Fisher equation to get the real rate."},
      {"es": "tasa efectiva anual", "en": "effective annual rate (EAR)", "definicion": "Tasa anual que considera la capitalización dentro del año: (1 + tasa del período)^períodos − 1.", "ejemplo": "A 2% monthly rate is a 26.8% EAR."},
      {"es": "tasa mensual", "en": "monthly rate", "definicion": "Tasa de interés por mes; muy usada en créditos de consumo y tarjetas en Chile.", "ejemplo": "Credit cards often quote a monthly rate."},
      {"es": "cuota", "en": "installment", "definicion": "Pago periódico de un crédito, que incluye intereses y amortización del capital.", "ejemplo": "My monthly installment is $99,848."},
      {"es": "amortización", "en": "amortization", "definicion": "Parte de cada cuota que devuelve capital; reduce la deuda.", "ejemplo": "Early payments are mostly interest, little amortization."},
      {"es": "sistema francés", "en": "fixed-payment (French) amortization", "definicion": "Sistema de crédito con cuota fija: al inicio se paga más interés y al final más capital.", "ejemplo": "Most mortgages use fixed payments."},
      {"es": "plazo", "en": "term", "definicion": "Tiempo total para pagar un crédito o duración de una inversión.", "ejemplo": "A longer term lowers the payment but increases total interest."},
      {"es": "CAE", "en": "equivalent annual charge (similar to APR)", "definicion": "Carga Anual Equivalente: costo anual de un crédito en %, incluyendo tasa, gastos y seguros (Ley 20.555).", "ejemplo": "Compare loans by their CAE, like the APR in the US."},
      {"es": "costo total del crédito", "en": "total cost of credit", "definicion": "Suma de todo lo que pagarás por un crédito (cuotas, gastos, seguros).", "ejemplo": "Always check the total cost of credit."},
      {"es": "deudor", "en": "borrower", "definicion": "Persona o empresa que recibe un préstamo y debe devolverlo con intereses.", "ejemplo": "The borrower pays interest to the lender."},
      {"es": "acreedor", "en": "lender (creditor)", "definicion": "Quien presta el dinero y tiene derecho a cobrarlo.", "ejemplo": "The bank is the lender."},
      {"es": "tasa máxima convencional", "en": "maximum legal interest rate (usury cap)", "definicion": "Tope legal de interés en Chile, calculado desde el interés corriente que publica la CMF.", "ejemplo": "Charging above the usury cap is illegal."},
      {"es": "refinanciar", "en": "to refinance", "definicion": "Reemplazar una deuda por otra con distintas condiciones (tasa, plazo).", "ejemplo": "They refinanced the mortgage at a lower rate."}
    ],
    "calculadoras": ["tasas", "credito"],
    "practica": [
      {"tipo": "numero", "pregunta": "Tasa nominal 8% e inflación 3%. ¿Tasa real APROXIMADA? (%)", "respuesta": 5, "tolerancia": 0.05, "unidad": "%", "explicacion": "8 − 3 = 5%."},
      {"tipo": "numero", "pregunta": "Mismo caso: ¿tasa real EXACTA (Fisher)? (2 decimales)", "respuesta": 4.85, "tolerancia": 0.01, "unidad": "%", "explicacion": "1,08 / 1,03 − 1 = 4,85%."},
      {"tipo": "numero", "pregunta": "Una tasa de 2% mensual, ¿a qué tasa anual EFECTIVA equivale? (2 decimales)", "respuesta": 26.82, "tolerancia": 0.01, "unidad": "%", "explicacion": "1,02¹² − 1 = 26,82%."},
      {"tipo": "numero", "pregunta": "Y la misma tasa de 2% mensual multiplicada por 12 (anual 'simple'), ¿cuánto da?", "respuesta": 24, "tolerancia": 0.01, "unidad": "%", "explicacion": "2 × 12 = 24%. Es menor que la efectiva porque ignora el interés sobre interés."},
      {"tipo": "alternativas", "pregunta": "Dos créditos de consumo del mismo monto y plazo. ¿Qué indicador comparas primero?", "opciones": ["La CAE", "La tasa de interés mensual", "El valor de la cuota", "El nombre del banco"], "respuestas": ["La CAE"], "explicacion": "La CAE incluye tasa, gastos y seguros. Complementa con el costo total del crédito."},
      {"tipo": "numero", "pregunta": "Crédito de $1.000.000 en 12 cuotas de $95.000. ¿Costo total del crédito?", "respuesta": 1140000, "tolerancia": 0, "unidad": "$", "explicacion": "95.000 × 12 = 1.140.000."},
      {"tipo": "numero", "pregunta": "En ese crédito, ¿cuánto pagas en intereses y gastos?", "respuesta": 140000, "tolerancia": 0, "unidad": "$", "explicacion": "1.140.000 − 1.000.000 = 140.000."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'cuota' (de un crédito) en inglés?", "respuestas": ["installment", "instalment", "payment", "monthly payment"], "explicacion": "Installment (o monthly payment)."},
      {"tipo": "vf", "pregunta": "Una tasa real negativa significa que tus ahorros pierden poder adquisitivo aunque ganen intereses.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Verdadero"], "explicacion": "La inflación es mayor que el interés nominal."},
      {"tipo": "alternativas", "pregunta": "En un crédito de cuota fija (sistema francés), las primeras cuotas pagan principalmente…", "opciones": ["intereses", "capital", "seguros", "impuestos"], "respuestas": ["intereses"], "explicacion": "Al inicio la deuda es más grande, así que el interés del mes es mayor."}
    ],
    "escritura": {
      "consigna": "Explica por qué la CAE sirve más que la tasa de interés para comparar créditos, y qué es la tasa real.",
      "minPalabras": 70,
      "obligatorias": ["CAE", "tasa real", "inflación", "costo total"],
      "modelo": "La tasa de interés no muestra todo lo que cuesta un crédito: faltan los gastos y los seguros. La CAE junta todo en un porcentaje anual, por eso sirve para comparar créditos del mismo monto y plazo. También hay que mirar el costo total, que es todo lo que voy a pagar. Por otro lado, la tasa real es la tasa nominal descontada la inflación. Si un depósito paga 5% y la inflación es 4%, mi tasa real es cerca de 1%: casi no gano poder adquisitivo."
    },
    "prueba": [
      {"tipo": "numero", "pregunta": "Depósito al 6% nominal anual, inflación 4%. ¿Tasa real EXACTA? (2 decimales)", "respuesta": 1.92, "tolerancia": 0.01, "unidad": "%", "explicacion": "1,06 / 1,04 − 1 = 1,92%."},
      {"tipo": "numero", "pregunta": "Tasa nominal 3%, inflación 5%. ¿Tasa real APROXIMADA? (%)", "respuesta": -2, "tolerancia": 0.05, "unidad": "%", "explicacion": "3 − 5 = −2%: pierdes poder adquisitivo."},
      {"tipo": "numero", "pregunta": "Tasa de 1,5% mensual. ¿Tasa anual efectiva? (2 decimales)", "respuesta": 19.56, "tolerancia": 0.01, "unidad": "%", "explicacion": "1,015¹² − 1 = 19,56%."},
      {"tipo": "numero", "pregunta": "Tasa anual efectiva de 12%. ¿Tasa mensual equivalente? (2 decimales)", "respuesta": 0.95, "tolerancia": 0.01, "unidad": "%", "explicacion": "1,12^(1/12) − 1 = 0,95%."},
      {"tipo": "numero", "pregunta": "Crédito de $2.000.000 al 1,5% mensual en 24 cuotas fijas. ¿Valor de la cuota? (redondea)", "respuesta": 99848, "tolerancia": 2, "unidad": "$", "explicacion": "2.000.000 × 0,015 / (1 − 1,015⁻²⁴) = 99.848."},
      {"tipo": "numero", "pregunta": "Ese mismo crédito: ¿cuánto pagas en total? (cuota redondeada × 24)", "respuesta": 2396352, "tolerancia": 60, "unidad": "$", "explicacion": "99.848 × 24 = 2.396.352: casi $400.000 en intereses."},
      {"tipo": "numero", "pregunta": "La tasa mensual que iguala lo que recibes con lo que pagas en un crédito (con gastos y seguros) es 2%. Según la norma chilena, ¿cuál es su CAE? (%)", "respuesta": 24, "tolerancia": 0.01, "unidad": "%", "explicacion": "CAE = tasa mensual × 12 = 24%. Ojo: la tasa efectiva anual sería mayor (26,82%)."},
      {"tipo": "alternativas", "pregunta": "¿Qué incluye la CAE?", "opciones": ["Tasa de interés, plazo, gastos y seguros del crédito, en un porcentaje anual", "Solo la tasa de interés", "Solo los seguros", "La inflación esperada"], "respuestas": ["Tasa de interés, plazo, gastos y seguros del crédito, en un porcentaje anual"], "explicacion": "Por eso permite comparar créditos del mismo monto y plazo."},
      {"tipo": "alternativas", "pregunta": "Crédito A: CAE 28%. Crédito B: CAE 35%. Mismo monto y plazo. ¿Cuál es más barato?", "opciones": ["A", "B", "Son iguales", "No se puede saber"], "respuestas": ["A"], "explicacion": "Menor CAE = menor costo anual equivalente."},
      {"tipo": "alternativas", "pregunta": "¿Qué es la tasa máxima convencional?", "opciones": ["El tope legal de interés, calculado desde el interés corriente que publica la CMF", "La tasa que fija el Banco Central para la economía", "La tasa de los depósitos a plazo", "La inflación máxima permitida"], "respuestas": ["El tope legal de interés, calculado desde el interés corriente que publica la CMF"], "explicacion": "Cobrar sobre ella es usura (Ley 18.010). La tasa del Banco Central es otra cosa (Etapa 3)."},
      {"tipo": "texto", "pregunta": "¿Cómo se dice 'tasa de interés real' en inglés?", "respuestas": ["real interest rate", "real rate"], "explicacion": "Real interest rate."},
      {"tipo": "texto", "pregunta": "Término: parte de cada cuota que devuelve capital y reduce la deuda.", "respuestas": ["amortización", "amortization"], "explicacion": "Amortización (amortization)."},
      {"tipo": "vf", "pregunta": "Si un crédito tiene una tasa de interés más baja, siempre tiene un costo total menor.", "opciones": ["Verdadero", "Falso"], "respuestas": ["Falso"], "explicacion": "Gastos, seguros y plazo también cuentan. Por eso existe la CAE."},
      {"tipo": "alternativas", "pregunta": "Alargar el plazo de un crédito (mismo monto y tasa) produce…", "opciones": ["Cuota más baja pero más intereses totales", "Cuota más alta y menos intereses", "Todo igual", "Menos intereses y cuota más baja"], "respuestas": ["Cuota más baja pero más intereses totales"], "explicacion": "Pagas más tiempo intereses sobre la deuda."},
      {"tipo": "numero", "pregunta": "Tarjeta de crédito al 3% mensual. Debes $500.000 y no pagas nada por 6 meses (interés compuesto). ¿Cuánto debes? (redondea)", "respuesta": 597026, "tolerancia": 3, "unidad": "$", "explicacion": "500.000 × 1,03⁶ = 597.026: casi 20% más en medio año."},
      {"tipo": "escritura", "pregunta": "En 70+ palabras: explica cómo compararías dos créditos de consumo y qué indicadores mirarías antes de firmar.", "minPalabras": 70, "obligatorias": ["CAE", "costo total", "cuota", "plazo"]}
    ],
    "fuentes": [
      {"titulo": "SERNAC — Ejemplo de cálculo de la CAE (tasa mensual × 12)", "url": "https://www.sernac.cl/portal/617/articles-9192_archivo_01.pdf"},
      {"titulo": "SERNAC — Carga Anual Equivalente", "url": "https://sernac.cl/portal/604/w3-article-2928.html"},
      {"titulo": "CMF — Metodología de interés corriente y tasa máxima convencional", "url": "https://www.cmfchile.cl/portal/prensa/625/w4-article-102387.html"},
      {"titulo": "Wall Street Prep — Fisher equation", "url": "https://www.wallstreetprep.com/knowledge/fisher-equation/"}
    ]
  }
]
);
