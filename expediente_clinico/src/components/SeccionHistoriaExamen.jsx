import { useState } from "react";

// ============================================================
// SECCIÓN 3: Historia Familiar y Social + Examen Mental
// Sistema de Expediente Clínico Psicológico
// ============================================================

const CAMPOS_MSE = [
  { name: "aparienciaConducta", label: "Apariencia/Conducta" },
  { name: "orientacion", label: "Orientación" },
  { name: "atencionMemoria", label: "Atención/Memoria" },
  { name: "lenguaje", label: "Lenguaje" },
  { name: "afectoAnimo", label: "Afecto/Ánimo" },
  { name: "pensamientoJuicio", label: "Pensamiento/Juicio" },
];

export default function SeccionHistoriaExamen({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  return (
    <div className="space-y-6">

      {/* ── Historia Familiar y Social ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">
            👨‍👩‍👧
          </div>
          <h2 className="text-lg font-semibold text-slate-700">Historia Familiar y Social</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Dinámica Familiar (Convivencia/Conflictos)
            </label>
            <textarea
              name="dinamicaFamiliar"
              value={datos.dinamicaFamiliar || ""}
              onChange={handleChange}
              placeholder="Describe la dinámica familiar del paciente..."
              rows={5}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Vida Social y Red de Apoyo
            </label>
            <textarea
              name="vidaSocial"
              value={datos.vidaSocial || ""}
              onChange={handleChange}
              placeholder="Amigos, pareja, grupos de apoyo, relaciones significativas..."
              rows={5}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            />
          </div>
        </div>

      </div>

      {/* ── Examen Mental ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
            🧠
          </div>
          <h2 className="text-lg font-semibold text-slate-700">Examen Mental</h2>
        </div>

        {/* Etiqueta MSE */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            Observaciones Específicas (MSE)
          </span>
        </div>

        {/* Grid de 3 columnas con los 6 campos MSE */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {CAMPOS_MSE.map((campo) => (
            <div key={campo.name}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                {campo.label}
              </label>
              <input
                type="text"
                name={campo.name}
                value={datos[campo.name] || ""}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>
          ))}
        </div>

        {/* Autoconcepto / Personalidad */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Autoconcepto / Personalidad
          </label>
          <textarea
            name="autoconcepto"
            value={datos.autoconcepto || ""}
            onChange={handleChange}
            placeholder="Observaciones sobre la percepción que tiene el paciente de sí mismo..."
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
          />
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
        <SeccionHistoriaExamen datos={datos} onChange={setDatos} />
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
