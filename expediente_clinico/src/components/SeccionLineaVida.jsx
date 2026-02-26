import { useState } from "react";

// ============================================================
// SECCIÓN 5: Línea de Vida
// Sistema de Expediente Clínico Psicológico
// ============================================================

const ETAPAS = ["Infancia", "Adolescencia", "Adultez", "Adultez Mayor"];

const coloresEtapa = {
  Infancia: "bg-yellow-400",
  Adolescencia: "bg-green-400",
  Adultez: "bg-blue-400",
  "Adultez Mayor": "bg-purple-400",
};

const coloresBorde = {
  Infancia: "border-yellow-300",
  Adolescencia: "border-green-300",
  Adultez: "border-blue-300",
  "Adultez Mayor": "border-purple-300",
};

export default function SeccionLineaVida({ datos = {}, onChange }) {
  const eventos = datos.eventos || [];

  // Estado local para el formulario de nuevo evento
  const [nuevoEvento, setNuevoEvento] = useState({
    etapa: "Adultez",
    edad: "",
    descripcion: "",
  });

  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({ ...prev, [name]: value }));
  };

  // Agrega un nuevo evento a la lista
  const agregarEvento = () => {
    if (!nuevoEvento.descripcion.trim()) return;
    const eventoConId = {
      ...nuevoEvento,
      id: Date.now(), // ID único basado en timestamp
    };
    if (onChange) {
      onChange({ ...datos, eventos: [...eventos, eventoConId] });
    }
    // Limpia el formulario
    setNuevoEvento({ etapa: "Adultez", edad: "", descripcion: "" });
  };

  // Elimina un evento por su ID
  const eliminarEvento = (id) => {
    if (onChange) {
      onChange({ ...datos, eventos: eventos.filter((e) => e.id !== id) });
    }
  };

  // Agrupa eventos por etapa para mostrarlos en orden
  const eventosPorEtapa = ETAPAS.reduce((acc, etapa) => {
    acc[etapa] = eventos.filter((e) => e.etapa === etapa);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">
          📅
        </div>
        <h2 className="text-lg font-semibold text-slate-700">Línea de Vida</h2>
        <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full border border-green-200">
          VISUAL
        </span>
      </div>

      {/* Formulario para agregar evento */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Agregar Evento</p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Etapa */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">Etapa</label>
            <select
              name="etapa"
              value={nuevoEvento.etapa}
              onChange={handleNuevoChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white"
            >
              {ETAPAS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          {/* Fecha / Edad */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">Edad</label>
            <input
              type="number"
              name="edad"
              value={nuevoEvento.edad}
              onChange={handleNuevoChange}
              placeholder="Ej: 29"
              min={0}
              max={120}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
          {/* Evento */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">Evento</label>
            <input
              type="text"
              name="descripcion"
              value={nuevoEvento.descripcion}
              onChange={handleNuevoChange}
              placeholder="Describe el evento..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={agregarEvento}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          <span>＋</span> Agregar Evento
        </button>
      </div>

      {/* Línea de tiempo visual */}
      {eventos.length === 0 ? (
        <div className="text-center text-slate-300 text-sm py-8">
          Aún no hay eventos. Agrega el primero arriba ↑
        </div>
      ) : (
        <div className="space-y-6">
          {ETAPAS.map((etapa) => {
            const eventosEtapa = eventosPorEtapa[etapa];
            if (eventosEtapa.length === 0) return null;

            return (
              <div key={etapa}>
                {/* Nombre de etapa */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${coloresEtapa[etapa]}`} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {etapa}
                  </span>
                </div>

                {/* Eventos de esta etapa */}
                <div className="space-y-2 ml-5 border-l-2 border-slate-200 pl-4">
                  {eventosEtapa.map((evento) => (
                    <div
                      key={evento.id}
                      className={`flex items-start justify-between bg-white border rounded-lg px-4 py-3 ${coloresBorde[etapa]}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${coloresEtapa[etapa]}`} />
                        <div>
                          <p className="text-sm text-slate-700">{evento.descripcion}</p>
                          {evento.edad && (
                            <p className="text-xs text-slate-400 mt-0.5">{evento.edad} años</p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarEvento(evento.id)}
                        className="text-slate-300 hover:text-red-400 transition text-lg ml-4 shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
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
        <SeccionLineaVida datos={datos} onChange={setDatos} />
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
