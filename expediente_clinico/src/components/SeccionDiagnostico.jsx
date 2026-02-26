import { useState, useRef } from "react";

// ============================================================
// SECCIÓN 7: Diagnóstico y Firma + Generar PDF
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionDiagnostico({ datos = {}, onChange, onGenerarPDF }) {
  const canvasRef = useRef(null);
  const [dibujando, setDibujando] = useState(false);
  const [tieneFirma, setTieneFirma] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  // ── Lógica del canvas para firma ──
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const iniciarDibujo = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDibujando(true);
  };

  const dibujar = (e) => {
    if (!dibujando) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1e293b";
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setTieneFirma(true);
  };

  const terminarDibujo = () => setDibujando(false);

  const borrarFirma = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTieneFirma(false);
  };

  // Obtiene la firma como imagen base64
  const getFirmaBase64 = () => {
    if (!tieneFirma) return null;
    return canvasRef.current.toDataURL("image/png");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-sm">
          📝
        </div>
        <h2 className="text-lg font-semibold text-slate-700">Diagnóstico y Firma</h2>
      </div>

      {/* Impresión diagnóstica */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Impresión Diagnóstica Final
        </label>
        <textarea
          name="diagnostico"
          value={datos.diagnostico || ""}
          onChange={handleChange}
          placeholder="Ej: Trastorno de ansiedad generalizada leve con síntomas depresivos asociados."
          rows={4}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition resize-none"
        />
      </div>

      {/* Área de firma */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Firma del Terapeuta
        </label>
        <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={120}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={iniciarDibujo}
            onMouseMove={dibujar}
            onMouseUp={terminarDibujo}
            onMouseLeave={terminarDibujo}
            onTouchStart={iniciarDibujo}
            onTouchMove={dibujar}
            onTouchEnd={terminarDibujo}
          />
        </div>
        {tieneFirma && (
          <button
            type="button"
            onClick={borrarFirma}
            className="text-xs text-red-400 hover:text-red-600 transition mt-1"
          >
            Borrar Firma
          </button>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3">
        {/* Generar PDF */}
        <button
          type="button"
          onClick={() => onGenerarPDF && onGenerarPDF(getFirmaBase64())}
          className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
        >
          📄 Generar Expediente Completo
        </button>

        {/* Botones secundarios */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("¿Borrar toda la configuración?")) {
                if (onChange) onChange({});
              }
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-xl transition text-sm"
          >
            Borrar Configuración
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("¿Reiniciar datos del paciente?")) {
                if (onChange) onChange({});
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition text-sm"
          >
            Reiniciar Paciente
          </button>
        </div>
      </div>

    </div>
  );
}


// ============================================================
// DEMO
// ============================================================
export function Demo() {
  const [datos, setDatos] = useState({});

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-700 mb-6">
          🗂️ Sistema de Expediente Clínico
        </h1>
        <SeccionDiagnostico
          datos={datos}
          onChange={setDatos}
          onGenerarPDF={(firma) => alert("¡PDF generado! (integrar librería)")}
        />
      </div>
    </div>
  );
}
