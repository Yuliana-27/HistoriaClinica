import { useState } from "react";

// ============================================================
// SECCIÓN 2: Datos del Paciente + Motivo & Antecedentes
// Sistema de Expediente Clínico Psicológico
// ============================================================

const ANTECEDENTES_OPCIONES = [
  "Ansiedad",
  "Depresión",
  "Trauma",
  "Riesgo Suicida",
  "Duelo",
  "Adicciones",
];

export default function SeccionPaciente({ datos = {}, onChange }) {
  // Maneja cambios en campos simples
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  // Maneja selección/deselección de antecedentes clínicos
  const toggleAntecedente = (item) => {
    const actuales = datos.antecedentes || [];
    const existe = actuales.includes(item);
    const nuevos = existe
      ? actuales.filter((a) => a !== item)
      : [...actuales, item];
    if (onChange) onChange({ ...datos, antecedentes: nuevos });
  };

  const antecedentesSeleccionados = datos.antecedentes || [];

  return (
    <div className="space-y-6">

      {/* ── Datos del Paciente ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm">
            👤
          </div>
          <h2 className="text-lg font-semibold text-slate-700">Datos del Paciente</h2>
        </div>

        <div className="space-y-4">

          {/* Nombre, Edad, Género, Ocupación */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombrePaciente"
                value={datos.nombrePaciente || ""}
                onChange={handleChange}
                placeholder="María Fernanda López"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Edad
              </label>
              <input
                type="number"
                name="edad"
                value={datos.edad || ""}
                onChange={handleChange}
                placeholder="25"
                min={0}
                max={120}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Género
              </label>
              <select
                name="genero"
                value={datos.genero || ""}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white"
              >
                <option value="">Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="No binario">No binario</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>
          </div>

          {/* Escolaridad, Ocupación, Contacto emergencia */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Escolaridad
              </label>
              <input
                type="text"
                name="escolaridad"
                value={datos.escolaridad || ""}
                onChange={handleChange}
                placeholder="Licenciatura"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Ocupación
              </label>
              <input
                type="text"
                name="ocupacion"
                value={datos.ocupacion || ""}
                onChange={handleChange}
                placeholder="Estudiante / Empleado..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Contacto Emergencia
              </label>
              <input
                type="text"
                name="contactoEmergencia"
                value={datos.contactoEmergencia || ""}
                onChange={handleChange}
                placeholder="Nombre y teléfono"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Motivo & Antecedentes ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm">
            🔄
          </div>
          <h2 className="text-lg font-semibold text-slate-700">Motivo & Antecedentes</h2>
        </div>

        <div className="space-y-4">

          {/* Motivo de consulta */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Motivo de Consulta
            </label>
            <textarea
              name="motivoConsulta"
              value={datos.motivoConsulta || ""}
              onChange={handleChange}
              placeholder="Describe el motivo principal por el que el paciente busca atención..."
              rows={4}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
            />
          </div>

          {/* Antecedentes clínicos */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Antecedentes Clínicos
            </label>
            <div className="flex flex-wrap gap-2">
              {ANTECEDENTES_OPCIONES.map((item) => {
                const seleccionado = antecedentesSeleccionados.includes(item);
                // "Riesgo Suicida" se resalta en rojo cuando está seleccionado
                const esRiesgo = item === "Riesgo Suicida";
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAntecedente(item)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition
                      ${seleccionado
                        ? esRiesgo
                          ? "bg-red-500 text-white border-red-500"
                          : "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-slate-600 border-slate-300 hover:border-teal-400"
                      }`}
                  >
                    {item}
                    {seleccionado && <span className="ml-1">×</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tratamientos previos */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Tratamientos Previos / Medicación
            </label>
            <input
              type="text"
              name="tratamientosPrevios"
              value={datos.tratamientosPrevios || ""}
              onChange={handleChange}
              placeholder="Ej: Terapia cognitivo-conductual (2022), Sertralina 50mg..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

        </div>
      </div>

    </div>
  );
}


// ============================================================
// DEMO: Cómo usar el componente
// ============================================================
export function Demo() {
  const [datosPaciente, setDatosPaciente] = useState({
    nombrePaciente: "",
    edad: "",
    genero: "",
    escolaridad: "",
    ocupacion: "",
    contactoEmergencia: "",
    motivoConsulta: "",
    antecedentes: [],
    tratamientosPrevios: "",
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-700 mb-6">
          🗂️ Sistema de Expediente Clínico
        </h1>

        <SeccionPaciente
          datos={datosPaciente}
          onChange={setDatosPaciente}
        />

        {/* Vista previa */}
        <div className="bg-slate-100 rounded-xl p-4 mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
            Vista previa de datos (solo para desarrollo):
          </p>
          <pre className="text-xs text-slate-600 whitespace-pre-wrap">
            {JSON.stringify(datosPaciente, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
