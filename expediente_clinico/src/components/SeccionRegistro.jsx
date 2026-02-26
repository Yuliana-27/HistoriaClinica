import { useState } from "react";

// ============================================================
// SECCIÓN 6: Registro Clínico y Seguimiento
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionRegistro({ datos = {}, onChange }) {
  // Estado local para nueva sesión
  const [nuevaSesion, setNuevaSesion] = useState({
    fecha: "",
    objetivo: "",
  });

  const sesiones = datos.sesiones || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  const handleNuevaSesionChange = (e) => {
    const { name, value } = e.target;
    setNuevaSesion((prev) => ({ ...prev, [name]: value }));
  };

  // Agrega una nueva sesión al historial
  const agregarSesion = () => {
    if (!nuevaSesion.fecha.trim()) return;
    const sesionConId = { ...nuevaSesion, id: Date.now() };
    if (onChange) {
      onChange({ ...datos, sesiones: [...sesiones, sesionConId] });
    }
    setNuevaSesion({ fecha: "", objetivo: "" });
  };

  // Elimina una sesión por ID
  const eliminarSesion = (id) => {
    if (onChange) {
      onChange({ ...datos, sesiones: sesiones.filter((s) => s.id !== id) });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
          📋
        </div>
        <h2 className="text-lg font-semibold text-slate-700">Registro Clínico y Seguimiento</h2>
      </div>

      {/* Notas SOAP */}
      <div className="mb-6">
        <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
          Notas SOAP
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* S - Subjetivo */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            S · Subjetivo
          </label>
          <textarea
            name="subjetivo"
            value={datos.subjetivo || ""}
            onChange={handleChange}
            placeholder="Lo que el paciente reporta subjetivamente..."
            rows={4}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
          />
        </div>

        {/* O - Objetivo */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            O · Objetivo
          </label>
          <textarea
            name="objetivo"
            value={datos.objetivo || ""}
            onChange={handleChange}
            placeholder="Observaciones objetivas del terapeuta..."
            rows={4}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
          />
        </div>

        {/* A - Análisis */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            A · Análisis
          </label>
          <textarea
            name="analisis"
            value={datos.analisis || ""}
            onChange={handleChange}
            placeholder="Interpretación clínica del terapeuta..."
            rows={4}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
          />
        </div>

        {/* P - Plan */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            P · Plan
          </label>
          <textarea
            name="plan"
            value={datos.plan || ""}
            onChange={handleChange}
            placeholder="Plan de intervención y próximos pasos..."
            rows={4}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
          />
        </div>
      </div>

      {/* Historial de sesiones */}
      <div className="border-t border-slate-100 pt-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
          Historial de Sesiones
        </p>

        {/* Formulario nueva sesión */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-xs text-slate-500 mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={nuevaSesion.fecha}
              onChange={handleNuevaSesionChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <div className="flex-[3]">
            <label className="block text-xs text-slate-500 mb-1">Objetivo</label>
            <input
              type="text"
              name="objetivo"
              value={nuevaSesion.objetivo}
              onChange={handleNuevaSesionChange}
              placeholder="Objetivo de la sesión..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={agregarSesion}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>

        {/* Lista de sesiones */}
        {sesiones.length === 0 ? (
          <p className="text-center text-slate-300 text-sm py-4">
            Aún no hay sesiones registradas.
          </p>
        ) : (
          <div className="space-y-2">
            {sesiones.map((sesion, index) => (
              <div
                key={sesion.id}
                className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {sesion.fecha}
                  </span>
                  <span className="text-sm text-slate-700">{sesion.objetivo}</span>
                </div>
                <button
                  type="button"
                  onClick={() => eliminarSesion(sesion.id)}
                  className="text-slate-300 hover:text-red-400 transition text-lg ml-4"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
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
        <SeccionRegistro datos={datos} onChange={setDatos} />
        <div className="bg-slate-100 rounded-xl p-4 mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Vista previa:</p>
          <pre className="text-xs text-slate-600 whitespace-pre-wrap">
            {JSON.stringify(datos, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
