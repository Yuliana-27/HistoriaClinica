import { useState } from "react";
import SeccionProfesional from "./components/SeccionProfesional";
import SeccionPaciente from "./components/SeccionPaciente";
import SeccionHistoriaExamen from "./components/SeccionHistoriaExamen";
import SeccionEscalas from "./components/SeccionEscalas";
import SeccionLineaVida from "./components/SeccionLineaVida";
import SeccionRegistro from "./components/SeccionRegistro";
import SeccionDiagnostico from "./components/SeccionDiagnostico";

// ============================================================
// App.jsx FINAL — Sistema de Expediente Clínico Psicológico
// PDF con formato profesional
// ============================================================

function App() {
  const [profesional, setProfesional] = useState({});
  const [paciente, setPaciente] = useState({});
  const [historiaExamen, setHistoriaExamen] = useState({});
  const [escalas, setEscalas] = useState({});
  const [lineaVida, setLineaVida] = useState({});
  const [registro, setRegistro] = useState({});
  const [diagnostico, setDiagnostico] = useState({});

  const generarPDF = async (firmaBase64) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const PW = 210;
    const MARGEN = 14;
    const CONTENIDO = PW - MARGEN * 2;
    let y = 0;

    const AZUL_OSCURO = [30, 58, 95];
    const AZUL_MEDIO = [52, 100, 145];
    const GRIS_CLARO = [245, 247, 250];
    const GRIS_LINEA = [220, 225, 232];
    const NEGRO = [30, 30, 30];
    const BLANCO = [255, 255, 255];

    const checkPage = (espacio = 20) => {
      if (y + espacio > 280) {
        doc.addPage();
        y = 15;
      }
    };

    const campo = (label, valor, x, yPos, ancho) => {
      if (!valor) return 0;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...AZUL_MEDIO);
      doc.text(label.toUpperCase(), x, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...NEGRO);
      const lines = doc.splitTextToSize(String(valor), ancho - 2);
      doc.text(lines, x, yPos + 4);
      return lines.length * 3.5 + 6;
    };

    const seccionHeader = (titulo) => {
      checkPage(14);
      doc.setFillColor(...AZUL_OSCURO);
      doc.rect(MARGEN, y, CONTENIDO, 7, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...BLANCO);
      doc.text(titulo.toUpperCase(), MARGEN + 3, y + 5);
      y += 10;
    };

    // ── ENCABEZADO ──
    doc.setFillColor(...AZUL_OSCURO);
    doc.rect(0, 0, PW, 38, "F");

    doc.setFillColor(...AZUL_MEDIO);
    doc.circle(MARGEN + 12, 19, 11, "F");
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLANCO);
    doc.text(profesional.nombre || "Dr. Nombre del Terapeuta", MARGEN + 27, 14);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 210, 235);
    doc.text(profesional.especialidad || "Especialidad", MARGEN + 27, 20);
    if (profesional.cedula) doc.text(`Cédula: ${profesional.cedula}`, MARGEN + 27, 25);
    if (profesional.institucion) doc.text(profesional.institucion, MARGEN + 27, 30);
    if (profesional.contacto || profesional.direccion) {
      doc.text(`${profesional.direccion || ""}  ${profesional.contacto || ""}`.trim(), MARGEN + 27, 35);
    }

    y = 44;

    // Título
    doc.setFillColor(...GRIS_CLARO);
    doc.rect(MARGEN, y, CONTENIDO, 10, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...AZUL_OSCURO);
    doc.text("EXPEDIENTE CLÍNICO INTEGRAL", PW / 2, y + 7, { align: "center" });
    const fecha = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 130, 145);
    doc.text(`Fecha: ${fecha}`, PW - MARGEN, y + 7, { align: "right" });
    y += 15;

    // ── DATOS DEL PACIENTE ──
    seccionHeader("Datos del Paciente");
    const col4 = CONTENIDO / 4;
    const a1 = campo("Paciente", paciente.nombrePaciente, MARGEN, y, col4 * 2);
    const a2 = campo("Edad", paciente.edad, MARGEN + col4 * 2, y, col4 / 2);
    const a3 = campo("Género", paciente.genero, MARGEN + col4 * 2.5, y, col4 / 2);
    const a4 = campo("Ocupación", paciente.ocupacion, MARGEN + col4 * 3, y, col4);
    y += Math.max(a1, a2, a3, a4);
    const b1 = campo("Escolaridad", paciente.escolaridad, MARGEN, y, col4 * 2);
    const b2 = campo("Contacto Emergencia", paciente.contactoEmergencia, MARGEN + col4 * 2, y, col4 * 2);
    y += Math.max(b1, b2) + 2;

    // ── ANTECEDENTES Y MOTIVO ──
    seccionHeader("Antecedentes y Motivo");
    const altM = campo("Motivo", paciente.motivoConsulta, MARGEN, y, CONTENIDO);
    y += altM;
    const altA = campo("Antecedentes", paciente.antecedentes?.join("  ·  "), MARGEN, y, CONTENIDO * 0.6);
    const altT = campo("Tratamientos Previos", paciente.tratamientosPrevios, MARGEN + CONTENIDO * 0.6, y, CONTENIDO * 0.4);
    y += Math.max(altA, altT) + 2;

    // ── HISTORIA FAMILIAR Y SOCIAL ──
    checkPage(25);
    seccionHeader("Historia Familiar y Social");
    const mitad = CONTENIDO / 2 - 2;
    const altF = campo("FAMILIAR", historiaExamen.dinamicaFamiliar, MARGEN, y, mitad);
    const altS = campo("SOCIAL", historiaExamen.vidaSocial, MARGEN + mitad + 4, y, mitad);
    y += Math.max(altF, altS) + 2;

    // ── EXAMEN MENTAL ──
    checkPage(30);
    seccionHeader("Examen Mental y Personalidad");
    const col3 = CONTENIDO / 3;
    const mse = [
      ["Apariencia", historiaExamen.aparienciaConducta],
      ["Orientación", historiaExamen.orientacion],
      ["Atención/Memoria", historiaExamen.atencionMemoria],
      ["Lenguaje", historiaExamen.lenguaje],
      ["Afecto/Ánimo", historiaExamen.afectoAnimo],
      ["Pensamiento/Juicio", historiaExamen.pensamientoJuicio],
    ].filter(([, v]) => v);

    for (let i = 0; i < mse.length; i += 3) {
      const fila = mse.slice(i, i + 3);
      let maxAlt = 0;
      fila.forEach(([label, valor], j) => {
        const alt = campo(label, valor, MARGEN + col3 * j, y, col3 - 2);
        maxAlt = Math.max(maxAlt, alt);
      });
      y += maxAlt;
    }
    if (historiaExamen.autoconcepto) {
      y += 1;
      y += campo("Autoconcepto / Personalidad", historiaExamen.autoconcepto, MARGEN, y, CONTENIDO);
    }
    y += 2;

    // ── EVALUACIÓN PSICOMÉTRICA ──
    checkPage(20);
    seccionHeader("Evaluación Psicométrica");
    const getEtiqueta = (t) => {
      if (t === 0) return "0 (Nada)";
      if (t <= 5) return `${t} (Leve)`;
      if (t <= 15) return `${t} (Moderado)`;
      return `${t} (Alto)`;
    };
    [["BDI", "Escala de Depresión"], ["BAI", "Escala de Ansiedad"]].forEach(([sigla, nombre], i) => {
      const escala = escalas[nombre];
      if (escala) {
        const total = Object.values(escala).reduce((s, v) => s + v, 0);
        campo(`${sigla}: ${getEtiqueta(total)}`, nombre, MARGEN + (CONTENIDO / 2) * i, y, CONTENIDO / 2 - 2);
      }
    });
    y += 10;

    // ── LÍNEA DE VIDA ──
    if (lineaVida.eventos?.length > 0) {
      checkPage(20);
      seccionHeader("Línea de Vida");
      lineaVida.eventos.forEach((evento) => {
        checkPage(8);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...AZUL_MEDIO);
        doc.text(`${evento.etapa.toUpperCase()}${evento.edad ? " - " + evento.edad + " AÑOS" : ""}`, MARGEN, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...NEGRO);
        const lines = doc.splitTextToSize(evento.descripcion, CONTENIDO - 48);
        doc.text(lines, MARGEN + 48, y);
        y += Math.max(lines.length * 3.5 + 2, 5);
      });
      y += 2;
    }

    // ── REGISTRO CLÍNICO SOAP ──
    checkPage(30);
    seccionHeader("Registro Clínico (SOAP)");
    const soap = [
      ["S - Subjetivo", registro.subjetivo],
      ["O - Objetivo", registro.objetivo],
      ["A - Análisis", registro.analisis],
      ["P - Plan", registro.plan],
    ].filter(([, v]) => v);
    const colSoap = CONTENIDO / 2;
    for (let i = 0; i < soap.length; i += 2) {
      const fila = soap.slice(i, i + 2);
      let maxAlt = 0;
      fila.forEach(([label, valor], j) => {
        const alt = campo(label, valor, MARGEN + colSoap * j, y, colSoap - 2);
        maxAlt = Math.max(maxAlt, alt);
      });
      y += maxAlt;
      checkPage();
    }
    if (registro.sesiones?.length > 0) {
      y += 2;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...AZUL_MEDIO);
      doc.text("HISTORIAL DE SESIONES", MARGEN, y);
      y += 4;
      registro.sesiones.forEach((s, i) => {
        checkPage(6);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...NEGRO);
        doc.text(`${i + 1}. ${s.fecha}  —  ${s.objetivo}`, MARGEN + 2, y);
        y += 4;
      });
      y += 2;
    }

    // ── DIAGNÓSTICO FINAL ──
    checkPage(20);
    seccionHeader("Diagnóstico Final");
    if (diagnostico.diagnostico) {
      doc.setFillColor(...GRIS_CLARO);
      const lines = doc.splitTextToSize(diagnostico.diagnostico, CONTENIDO - 6);
      const altBox = lines.length * 4 + 6;
      doc.rect(MARGEN, y, CONTENIDO, altBox, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...NEGRO);
      doc.text(lines, MARGEN + 3, y + 5);
      y += altBox + 6;
    }

    // ── FIRMA ──
    checkPage(35);
    doc.setDrawColor(...GRIS_LINEA);
    doc.line(MARGEN, y, PW - MARGEN, y);
    y += 4;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 130, 145);
    doc.text("Firma del Psicólogo", MARGEN, y);
    y += 3;
    if (firmaBase64) {
      doc.addImage(firmaBase64, "PNG", MARGEN, y, 70, 20);
      y += 22;
    } else {
      doc.setDrawColor(...GRIS_LINEA);
      doc.line(MARGEN, y + 15, MARGEN + 70, y + 15);
      y += 20;
    }
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NEGRO);
    doc.text(profesional.nombre || "", MARGEN, y);
    if (profesional.cedula) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 130, 145);
      doc.text(`Cédula: ${profesional.cedula}`, MARGEN, y + 4);
    }

    // ── PIE DE PÁGINA ──
    const totalPaginas = doc.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
      doc.setPage(i);
      doc.setFillColor(...AZUL_OSCURO);
      doc.rect(0, 290, PW, 8, "F");
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BLANCO);
      doc.text(
        `Sistema de Expediente Clínico  ·  Página ${i} de ${totalPaginas}`,
        PW / 2, 295, { align: "center" }
      );
    }

    const nombreArchivo = `Expediente_${(paciente.nombrePaciente || "Paciente").replace(/ /g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-700">
          🗂️ Sistema de Expediente Clínico
        </h1>
        <SeccionProfesional datos={profesional} onChange={setProfesional} />
        <SeccionPaciente datos={paciente} onChange={setPaciente} />
        <SeccionHistoriaExamen datos={historiaExamen} onChange={setHistoriaExamen} />
        <SeccionEscalas datos={escalas} onChange={setEscalas} />
        <SeccionLineaVida datos={lineaVida} onChange={setLineaVida} />
        <SeccionRegistro datos={registro} onChange={setRegistro} />
        <SeccionDiagnostico
          datos={diagnostico}
          onChange={setDiagnostico}
          onGenerarPDF={generarPDF}
        />
      </div>
    </div>
  );
}

export default App;
