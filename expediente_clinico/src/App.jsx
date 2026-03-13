import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SeccionProfesional from "./components/SeccionProfesional";
import SeccionPaciente from "./components/SeccionPaciente";
import SeccionHistoriaExamen from "./components/SeccionHistoriaExamen";
import SeccionEscalas from "./components/SeccionEscalas";
import SeccionLineaVida from "./components/SeccionLineaVida";
import SeccionRegistro from "./components/SeccionRegistro";
import SeccionDiagnostico from "./components/SeccionDiagnostico";

const ESTADO_INICIAL = {
  profesional: {},
  paciente: {},
  historiaExamen: {},
  escalas: {},
  lineaVida: {},
  registro: {},
  diagnostico: {},
};

function App() {
  const [datos, setDatos] = useState(ESTADO_INICIAL);
  const [expedienteId, setExpedienteId] = useState(null);
  const [listaExpedientes, setListaExpedientes] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [guardandoConfig, setGuardandoConfig] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [vistaLista, setVistaLista] = useState(false);

  const actualizar = (seccion) => (valor) => {
    setDatos((prev) => ({ ...prev, [seccion]: valor }));
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    cargarConfigProfesional();
    cargarLista();
  }, []);

  const cargarConfigProfesional = async () => {
    const { data, error } = await supabase.from("configuracion").select("profesional").eq("id", 1).single();
    if (!error && data?.profesional) setDatos((prev) => ({ ...prev, profesional: data.profesional }));
  };

  const guardarConfigProfesional = async () => {
    setGuardandoConfig(true);
    try {
      const { error } = await supabase.from("configuracion").update({ profesional: datos.profesional }).eq("id", 1);
      if (error) throw error;
      mostrarMensaje("exito", "✅ Datos del profesional guardados permanentemente");
    } catch (err) {
      mostrarMensaje("error", "❌ Error al guardar configuración: " + err.message);
    } finally {
      setGuardandoConfig(false);
    }
  };

  const cargarLista = async () => {
    const { data, error } = await supabase.from("expedientes").select("id, created_at, paciente").order("updated_at", { ascending: false });
    if (!error) setListaExpedientes(data || []);
  };

  const guardarExpediente = async () => {
    setGuardando(true);
    try {
      const payload = {
        profesional: datos.profesional,
        paciente: datos.paciente,
        historia_examen: datos.historiaExamen,
        escalas: datos.escalas,
        linea_vida: datos.lineaVida,
        registro: datos.registro,
        diagnostico: datos.diagnostico,
        updated_at: new Date().toISOString(),
      };
      if (expedienteId) {
        const { error } = await supabase.from("expedientes").update(payload).eq("id", expedienteId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("expedientes").insert(payload).select().single();
        if (error) throw error;
        setExpedienteId(data.id);
      }
      mostrarMensaje("exito", "✅ Expediente guardado correctamente");
      cargarLista();
    } catch (err) {
      mostrarMensaje("error", "❌ Error al guardar: " + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const cargarExpediente = async (id) => {
    const { data, error } = await supabase.from("expedientes").select("*").eq("id", id).single();
    if (error) { mostrarMensaje("error", "❌ Error al cargar"); return; }
    setDatos((prev) => ({
      ...prev,
      paciente: data.paciente || {},
      historiaExamen: data.historia_examen || {},
      escalas: data.escalas || {},
      lineaVida: data.linea_vida || {},
      registro: data.registro || {},
      diagnostico: data.diagnostico || {},
    }));
    setExpedienteId(data.id);
    setVistaLista(false);
    mostrarMensaje("exito", "✅ Expediente cargado");
  };

  const eliminarExpediente = async (id) => {
    if (!window.confirm("¿Eliminar este expediente permanentemente?")) return;
    const { error } = await supabase.from("expedientes").delete().eq("id", id);
    if (!error) {
      mostrarMensaje("exito", "🗑️ Expediente eliminado");
      cargarLista();
      if (expedienteId === id) reiniciarPaciente();
    }
  };

  const reiniciarPaciente = () => {
    setDatos((prev) => ({ ...ESTADO_INICIAL, profesional: prev.profesional }));
    setExpedienteId(null);
    setVistaLista(false);
  };

  // ══════════════════════════════════════════════════════════
  // GENERAR PDF — Colores pastel puzzle
  // ══════════════════════════════════════════════════════════
  const generarPDF = async (firmaBase64) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const PW = 210, MARGEN = 14, CONTENIDO = PW - MARGEN * 2;
    let y = 0;

    // ── Paleta de colores puzzle ──
    const AMARILLO     = [255, 243, 194];   // pastel amarillo
    const AZUL_PASTEL  = [194, 220, 255];   // pastel azul
    const ROSA         = [255, 209, 220];   // pastel rosa
    const VERDE        = [204, 235, 210];   // pastel verde
    const LILA         = [220, 210, 255];   // pastel lila

    const HEADER_BG    = [107, 91, 158];    // lila profundo
    const HEADER_TEXT  = [255, 255, 255];
    const NEGRO        = [40, 40, 40];
    const GRIS_TEXTO   = [100, 110, 125];
    const BLANCO       = [255, 255, 255];
    const GRIS_LINEA   = [220, 225, 232];

    // ── Helpers ──
    const checkPage = (e = 20) => {
      if (y + e > 280) { doc.addPage(); y = 15; }
    };

    const campo = (label, valor, x, yPos, ancho) => {
      if (!valor) return 0;
      doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(...GRIS_TEXTO);
      doc.text(label.toUpperCase(), x, yPos);
      doc.setFont("helvetica", "normal"); doc.setTextColor(...NEGRO);
      const lines = doc.splitTextToSize(String(valor), ancho - 2);
      doc.text(lines, x, yPos + 3.5);
      return lines.length * 3.5 + 5.5;
    };

    const seccionHeader = (titulo, color) => {
      checkPage(14);
      doc.setFillColor(...color);
      doc.roundedRect(MARGEN, y, CONTENIDO, 8, 2, 2, "F");
      doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(...NEGRO);
      doc.text(titulo.toUpperCase(), MARGEN + 4, y + 5.5);
      y += 11;
    };

    const siNo = (valor) => valor ? `${valor}` : "—";

    const { profesional, paciente, historiaExamen, escalas, lineaVida, registro, diagnostico } = datos;

    // ══════════════════════════════════════════════════════
    // ENCABEZADO
    // ══════════════════════════════════════════════════════
    doc.setFillColor(...HEADER_BG);
    doc.rect(0, 0, PW, 36, "F");

    // Logo o círculo
    if (profesional.logo) {
      doc.addImage(profesional.logo, "PNG", MARGEN + 1, 7, 22, 22);
    } else {
      doc.setFillColor(100, 130, 180);
      doc.circle(MARGEN + 12, 18, 10, "F");
    }

    doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...HEADER_TEXT);
    doc.text(profesional.nombre || "Nombre del Terapeuta", MARGEN + 27, 13);
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(190, 210, 240);
    if (profesional.especialidad) doc.text(profesional.especialidad, MARGEN + 27, 19);
    if (profesional.cedula) doc.text(`Cédula: ${profesional.cedula}`, MARGEN + 27, 24);
    if (profesional.institucion) doc.text(profesional.institucion, MARGEN + 27, 29);
    if (profesional.contacto || profesional.direccion)
      doc.text(`${profesional.direccion || ""}  ${profesional.contacto || ""}`.trim(), MARGEN + 27, 34);

    // Línea decorativa rosa debajo del encabezado
   

    y = 45;

    // Título expediente
    doc.setFillColor(...LILA)
    doc.roundedRect(MARGEN, y, CONTENIDO, 10, 2, 2, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(...NEGRO);
    doc.text("ENTREVISTA INICIAL DEL PACIENTE", PW / 2, y + 7, { align: "center" });
    doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); doc.setTextColor(...GRIS_TEXTO);
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}`, PW - MARGEN, y + 7, { align: "right" });
    y += 15;

    // ══════════════════════════════════════════════════════
    // 1. DATOS DEL PACIENTE — Azul pastel
    // ══════════════════════════════════════════════════════
    seccionHeader("1. Datos del Paciente", AZUL_PASTEL);

    const col4 = CONTENIDO / 4;
    y += Math.max(
      campo("Nombre", paciente.nombrePaciente, MARGEN, y, col4 * 2),
      campo("Edad", paciente.edad, MARGEN + col4 * 2, y, col4 / 2),
      campo("Género", paciente.genero, MARGEN + col4 * 2.5, y, col4 / 2),
      campo("F. Nacimiento", paciente.fechaNacimiento, MARGEN + col4 * 3, y, col4)
    );
    y += Math.max(
      campo("Grado Estudios", paciente.gradoEstudios, MARGEN, y, col4),
      campo("Escolaridad", paciente.escolaridad, MARGEN + col4, y, col4),
      campo("Domicilio", paciente.domicilio, MARGEN + col4 * 2, y, col4 * 2)
    );
    y += Math.max(
      campo("Diagnóstico Previo", paciente.diagnosticoPrevio, MARGEN, y, col4 * 2),
      campo("Referido Por", paciente.referidoPor, MARGEN + col4 * 2, y, col4 * 2)
    );

    // Mamá y Papá
    const mitad = CONTENIDO / 2 - 2;
    checkPage(20);
    doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...GRIS_TEXTO);
    doc.text("MAMÁ", MARGEN, y); doc.text("PAPÁ", MARGEN + mitad + 4, y);
    y += 4;
    y += Math.max(
      campo("Nombre", paciente.nombreMama, MARGEN, y, mitad / 2),
      campo("Edad", paciente.edadMama, MARGEN + mitad / 2, y, mitad / 4),
      campo("Celular", paciente.celularMama, MARGEN + mitad * 0.75, y, mitad / 4),
      campo("Nombre", paciente.nombrePapa, MARGEN + mitad + 4, y, mitad / 2),
      campo("Edad", paciente.edadPapa, MARGEN + mitad + 4 + mitad / 2, y, mitad / 4),
      campo("Celular", paciente.celularPapa, MARGEN + mitad + 4 + mitad * 0.75, y, mitad / 4)
    );
    y += Math.max(
      campo("Ocupación Mamá", paciente.ocupacionMama, MARGEN, y, mitad),
      campo("Ocupación Papá", paciente.ocupacionPapa, MARGEN + mitad + 4, y, mitad)
    );

    // Hermanos, motivo, referido
    if (paciente.tieneHermanos) {
      y += campo("Hermanos", `${paciente.tieneHermanos}${paciente.cantidadHermanos ? " — " + paciente.cantidadHermanos : ""}`, MARGEN, y, col4 * 2);
    }
    if (paciente.motivoConsulta) y += campo("Motivo de Consulta", paciente.motivoConsulta, MARGEN, y, CONTENIDO);
    y += 3;

    // ══════════════════════════════════════════════════════
    // 2. PERIODO PERINATAL — Rosa
    // ══════════════════════════════════════════════════════
    checkPage(25);
    seccionHeader("2. Periodo Perinatal", ROSA);

    y += Math.max(
      campo("Tipo de Parto", paciente.tipoParto, MARGEN, y, col4),
      campo("Dificultades", paciente.dificultadesParto, MARGEN + col4, y, col4),
      campo("Complicaciones", paciente.complicaciones?.join(", "), MARGEN + col4 * 2, y, col4 * 2)
    );
    y += Math.max(
      campo("Peso al Nacer", paciente.pesoNacer, MARGEN, y, col4),
      campo("Talla al Nacer", paciente.tallaNacer, MARGEN + col4, y, col4),
      campo("Apgar", paciente.apgar, MARGEN + col4 * 2, y, col4),
      campo("Lactancia (meses)", paciente.lactanciaMeses, MARGEN + col4 * 3, y, col4)
    );
    y += campo("Biberón hasta (meses)", paciente.biberonMeses, MARGEN, y, col4 * 2);

    // Desarrollo motor
    doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...GRIS_TEXTO);
    doc.text("DESARROLLO MOTOR (meses)", MARGEN, y); y += 4;
    const col6 = CONTENIDO / 3;
    y += Math.max(
      campo("Sedestación", paciente.edadSedestacion, MARGEN, y, col6),
      campo("Bipedestación", paciente.edadBipedestacion, MARGEN + col6, y, col6),
      campo("Gateo", paciente.edadGateo, MARGEN + col6 * 2, y, col6)
    );
    y += Math.max(
      campo("Marcha", paciente.edadMarcha, MARGEN, y, col6),
      campo("Subir/Bajar Escaleras", paciente.edadSubirBajarEscaleras, MARGEN + col6, y, col6),
      campo("Dificultad para Dormir", paciente.edadDormir, MARGEN + col6 * 2, y, col6)
    );

    // Desarrollo lenguaje
    doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...GRIS_TEXTO);
    doc.text("DESARROLLO DEL LENGUAJE", MARGEN, y); y += 4;
    y += Math.max(
      campo("Balbuceo", paciente.edadBalbuceo, MARGEN, y, col6),
      campo("Primera Palabra", paciente.primeraPalabra, MARGEN + col6, y, col6),
      campo("Oraciones Cortas", paciente.oracionesCortas, MARGEN + col6 * 2, y, col6)
    );
    y += Math.max(
      campo("Oraciones Largas", paciente.oracionesLargas, MARGEN, y, col6),
      campo("Reconoce Vocales", paciente.reconoceVocales, MARGEN + col6, y, col6),
      campo("Reconoce Abecedario", paciente.reconoceAbecedario, MARGEN + col6 * 2, y, col6)
    );
    y += Math.max(
      campo("Control Esfínteres", paciente.controlEsfinteres, MARGEN, y, col4 * 2),
      campo("Frenillo", paciente.frenillo, MARGEN + col4 * 2, y, col4 * 2)
    ) + 2;

    // ══════════════════════════════════════════════════════
    // 3. DESCRIPCIÓN DEL NIÑO — Amarillo
    // ══════════════════════════════════════════════════════
    checkPage(20);
    seccionHeader("3. Descripción del Niño", AMARILLO);

    if (historiaExamen.descripcionNino?.length > 0) {
      y += campo("Características", historiaExamen.descripcionNino.join("  ·  "), MARGEN, y, CONTENIDO);
    }
    if (historiaExamen.observacionesNino) y += campo("Observaciones", historiaExamen.observacionesNino, MARGEN, y, CONTENIDO);
    y += 2;

    // ══════════════════════════════════════════════════════
    // 4. INTERESES Y PASATIEMPOS — Verde
    // ══════════════════════════════════════════════════════
    checkPage(20);
    seccionHeader("4. Intereses y Pasatiempos", VERDE);

    y += Math.max(
      campo("Tiempo Libre", historiaExamen.tiempoLibre, MARGEN, y, mitad),
      campo("Prefiere estar", historiaExamen.prefiereEstar, MARGEN + mitad + 4, y, mitad)
    );
    if (historiaExamen.prefiereEstarCuando) y += campo("¿Cuándo?", historiaExamen.prefiereEstarCuando, MARGEN, y, CONTENIDO);
    if (historiaExamen.quéHaceSolo) y += campo("¿Qué hace cuando está solo?", historiaExamen.quéHaceSolo, MARGEN, y, CONTENIDO);
    y += 2;

    // ══════════════════════════════════════════════════════
    // 5. CONDUCTA — Lila
    // ══════════════════════════════════════════════════════
    checkPage(25);
    seccionHeader("5. Conducta", LILA);

    const conductaCampos = [
      ["Dificultad para hablar", historiaExamen.dificultadHablar, historiaExamen.dificultadHablarCuando],
      ["Dificultad al escuchar", historiaExamen.dificultadEscuchar, historiaExamen.dificultadEscucharCuando],
      ["Pone atención", historiaExamen.poneAtencion, null],
      ["Interés en objetos", null, historiaExamen.interesObjetos],
      ["Sigue reglas en casa", historiaExamen.sigueReglasCasa, null],
      ["Sigue reglas en escuela", historiaExamen.sigueReglasEscuela, null],
      ["¿Qué lo hace feliz?", null, historiaExamen.queLoHaceFeliz],
      ["¿Qué lo entristece?", null, historiaExamen.queLoEntristece],
    ];

    for (let i = 0; i < conductaCampos.length; i += 2) {
      checkPage(8);
      const fila = conductaCampos.slice(i, i + 2);
      let maxAlt = 0;
      fila.forEach(([label, valor, detalle], j) => {
        const texto = [valor, detalle].filter(Boolean).join(" — ");
        if (texto) maxAlt = Math.max(maxAlt, campo(label, texto, MARGEN + (CONTENIDO / 2) * j, y, CONTENIDO / 2 - 2));
      });
      if (maxAlt > 0) y += maxAlt;
    }

    if (historiaExamen.tipoSocial?.length > 0)
      y += campo("Tipo Social", historiaExamen.tipoSocial.join("  ·  "), MARGEN, y, CONTENIDO);
    y += 2;

    // ══════════════════════════════════════════════════════
    // 6. PSICOMOTOR — Azul pastel
    // ══════════════════════════════════════════════════════
    checkPage(25);
    seccionHeader("6. Psicomotor", AZUL_PASTEL);

    const psicomotorCampos = [
      ["¿Gatea?", escalas.actualmente_gatea],
      ["¿Se da gira en cama?", escalas.se_da_gira_cama],
      ["¿Se mantiene de pie?", escalas.intenta_mantenerse_pie],
      ["¿Se sienta?", escalas.se_sienta],
      ["¿Se deja caer?", escalas.se_deja_caer],
      ["¿Brinca en un pie?", escalas.brinca_un_pie],
      ["Molestia física", escalas.molestiaFisica],
      ["¿Camina diferente?", escalas.caminaRaro],
      ["Actividad física", escalas.actividadFisica === "Sí" ? `Sí — ${escalas.actividadFisicaCual || ""}` : escalas.actividadFisica],
    ].filter(([, v]) => v);

    for (let i = 0; i < psicomotorCampos.length; i += 3) {
      checkPage(8);
      let maxAlt = 0;
      psicomotorCampos.slice(i, i + 3).forEach(([l, v], j) => {
        maxAlt = Math.max(maxAlt, campo(l, v, MARGEN + col6 * j, y, col6 - 2));
      });
      y += maxAlt;
    }
    y += 2;

    // ══════════════════════════════════════════════════════
    // 7. APRENDIZAJE Y OCUPACIONAL — Verde
    // ══════════════════════════════════════════════════════
    checkPage(25);
    seccionHeader("7. Aprendizaje y Ocupacional", VERDE);

    const aprendizajeCampos = [
      ["Reconoce abecedario", lineaVida.reconoceAbecedario],
      ["Problemas sílabas", lineaVida.problemasSilabas],
      ["Le gusta leer", lineaVida.leGstaLeer ? `${lineaVida.leGstaLeer}${lineaVida.queLeGustaLeer ? " — " + lineaVida.queLeGustaLeer : ""}` : null],
      ["Escribe correctamente", lineaVida.escribeCorrectamente],
      ["Sigue dictado", lineaVida.sigueDictado],
      ["Tablas multiplicar", lineaVida.sabeTablas ? `${lineaVida.sabeTablas}${lineaVida.hastaQueTabla ? " — hasta " + lineaVida.hastaQueTabla : ""}` : null],
      ["Operaciones básicas", lineaVida.operacionesBasicas?.join(", ")],
      ["Sabe recortar", lineaVida.sabeRecortar],
      ["Agarra lápiz", lineaVida.agarraLapiz],
      ["Se viste solo", lineaVida.seVisteSolo],
      ["Come solo", lineaVida.comeSolo],
      ["Se baña solo", lineaVida.seBaniaSolo],
      ["Se lava dientes", lineaVida.seLavaDientes],
      ["Juegos didácticos", lineaVida.juegosDidacticos],
      ["Le molestan texturas", lineaVida.molestanTexturas === "Sí" ? `Sí — ${lineaVida.molestanTexturasCuales || ""}` : lineaVida.molestanTexturas],
    ].filter(([, v]) => v);

    for (let i = 0; i < aprendizajeCampos.length; i += 3) {
      checkPage(8);
      let maxAlt = 0;
      aprendizajeCampos.slice(i, i + 3).forEach(([l, v], j) => {
        maxAlt = Math.max(maxAlt, campo(l, v, MARGEN + col6 * j, y, col6 - 2));
      });
      y += maxAlt;
    }
    y += 2;

    // ══════════════════════════════════════════════════════
    // 8. ESTADO CLÍNICO — Rosa
    // ══════════════════════════════════════════════════════
    checkPage(25);
    seccionHeader("8. Estado Clínico", ROSA);

    const clinicoCampos = [
      ["Diagnóstico preexistente", registro.diagnosticoPreexistente],
      ["Estudios de audición", registro.estudiosAudicion === "Sí" ? `Sí — ${registro.estudiosAudicionDetalle || ""}` : registro.estudiosAudicion],
      ["Otros estudios médicos", registro.otrosEstudiosMedicos === "Sí" ? `Sí — ${registro.otrosEstudiosMedicosDetalle || ""}` : registro.otrosEstudiosMedicos],
      ["Medicamento", registro.tomaMedicamento === "Sí" ? `Sí — ${registro.tomaMedicamentoDetalle || ""}` : registro.tomaMedicamento],
      ["Dieta / Alergia", registro.dietaAlergia === "Sí" ? `Sí — ${registro.dietaAlergiaDetalle || ""}` : registro.dietaAlergia],
    ].filter(([, v]) => v);

    for (let i = 0; i < clinicoCampos.length; i += 2) {
      checkPage(8);
      let maxAlt = 0;
      clinicoCampos.slice(i, i + 2).forEach(([l, v], j) => {
        maxAlt = Math.max(maxAlt, campo(l, v, MARGEN + (CONTENIDO / 2) * j, y, CONTENIDO / 2 - 2));
      });
      y += maxAlt;
    }
    y += 2;

    // ══════════════════════════════════════════════════════
    // 9. DIAGNÓSTICO FINAL — Amarillo
    // ══════════════════════════════════════════════════════
    checkPage(20);
    seccionHeader("9. Diagnóstico Final", AMARILLO);

    if (diagnostico.diagnostico) {
      const lines = doc.splitTextToSize(diagnostico.diagnostico, CONTENIDO - 6);
      const altBox = lines.length * 4 + 6;
      doc.setFillColor(255, 252, 230);
      doc.roundedRect(MARGEN, y, CONTENIDO, altBox, 2, 2, "F");
      doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(...NEGRO);
      doc.text(lines, MARGEN + 3, y + 5);
      y += altBox + 6;
    }

    // ══════════════════════════════════════════════════════
    // FIRMA CENTRADA
    // ══════════════════════════════════════════════════════
    checkPage(40);
    doc.setDrawColor(...GRIS_LINEA);
    doc.line(MARGEN, y, PW - MARGEN, y);
    y += 5;
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(...GRIS_TEXTO);
    doc.text("Firma del Psicólogo", PW / 2, y, { align: "center" });
    y += 4;

    if (firmaBase64) {
      doc.addImage(firmaBase64, "PNG", (PW - 70) / 2, y, 70, 20);
      y += 24;
    } else {
      doc.setDrawColor(...GRIS_LINEA);
      doc.line((PW - 70) / 2, y + 18, (PW - 70) / 2 + 70, y + 18);
      y += 22;
    }
    doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...NEGRO);
    doc.text(profesional.nombre || "", PW / 2, y, { align: "center" });
    if (profesional.cedula) {
      doc.setFont("helvetica", "normal"); doc.setTextColor(...GRIS_TEXTO);
      doc.text(`Cédula: ${profesional.cedula}`, PW / 2, y + 4, { align: "center" });
    }

    // ── Pie de página ──
    const totalPaginas = doc.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
      doc.setPage(i);
      doc.setFillColor(...HEADER_BG);
      doc.rect(0, 290, PW, 8, "F");
      doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(...HEADER_TEXT);
      doc.text(`Sistema de Expediente Clínico  ·  Página ${i} de ${totalPaginas}`, PW / 2, 295, { align: "center" });
    }

    doc.save(`Expediente_${(paciente.nombrePaciente || "Paciente").replace(/ /g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // ══════════════════════════════════════════════════════════
  // VISTA LISTA
  // ══════════════════════════════════════════════════════════
  if (vistaLista) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-700">📋 Expedientes Guardados</h1>
            <button onClick={() => setVistaLista(false)} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
              ← Volver
            </button>
          </div>
          {listaExpedientes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 shadow-md">No hay expedientes guardados aún.</div>
          ) : (
            <div className="space-y-3">
              {listaExpedientes.map((exp) => (
                <div key={exp.id} className="bg-white rounded-xl shadow-md p-4 border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-700">{exp.paciente?.nombrePaciente || "Sin nombre"}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(exp.created_at).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => cargarExpediente(exp.id)} className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-teal-200">Abrir</button>
                    <button onClick={() => eliminarExpediente(exp.id)} className="bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-red-200">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════
  // VISTA FORMULARIO
  // ══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-700">🗂️ Expediente Clínico Entrevista Inicial</h1>
            <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition">
              <option value="">-- Tipo de Entrevista --</option>
              <option value="conducta">Entrevista Terapia de Conducta</option>
              <option value="lenguaje">Entrevista Terapia de Lenguaje</option>
              <option value="psicologica">Entrevista Psicológica</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { cargarLista(); setVistaLista(true); }} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">
              📋 Expedientes ({listaExpedientes.length})
            </button>
            <button onClick={reiniciarPaciente} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">
              ＋ Nuevo
            </button>
            <button onClick={guardarExpediente} disabled={guardando} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
              {guardando ? "Guardando..." : expedienteId ? "💾 Actualizar" : "💾 Guardar"}
            </button>
          </div>
        </div>

        {mensaje && (
          <div className={`rounded-xl px-4 py-3 text-sm font-medium ${mensaje.tipo === "exito" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {mensaje.texto}
          </div>
        )}

        {expedienteId && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs text-teal-600 font-medium">
            ✏️ Editando: <strong>{datos.paciente?.nombrePaciente || "paciente sin nombre"}</strong>
          </div>
        )}

        <div>
          <SeccionProfesional datos={datos.profesional} onChange={actualizar("profesional")} />
          <div className="flex justify-end -mt-3">
            <button onClick={guardarConfigProfesional} disabled={guardandoConfig}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
              {guardandoConfig ? "Guardando..." : "📌 Guardar como predeterminado"}
            </button>
          </div>
        </div>

        <SeccionPaciente datos={datos.paciente} onChange={actualizar("paciente")} />
        <SeccionHistoriaExamen datos={datos.historiaExamen} onChange={actualizar("historiaExamen")} />
        <SeccionEscalas datos={datos.escalas} onChange={actualizar("escalas")} />
        <SeccionLineaVida datos={datos.lineaVida} onChange={actualizar("lineaVida")} />
        <SeccionRegistro datos={datos.registro} onChange={actualizar("registro")} />
        <SeccionDiagnostico datos={datos.diagnostico} onChange={actualizar("diagnostico")} onGenerarPDF={generarPDF} />

      </div>
    </div>
  );
}

export default App;