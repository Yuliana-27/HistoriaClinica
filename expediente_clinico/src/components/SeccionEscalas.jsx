import { useState } from "react";

// ============================================================
// SECCIÓN 4: Escalas Psicométricas con Sliders
// Sistema de Expediente Clínico Psicológico
// ============================================================

const ESCALAS = [
  {
    nombre: "Escala de Depresión",
    color: "blue",
    items: [
      { id: "tristeza", label: "1. Tristeza" },
      { id: "pesimismo", label: "2. Pesimismo" },
      { id: "fracaso", label: "3. Fracaso" },
      { id: "perdidaPlacer", label: "4. Pérdida de Placer" },
      { id: "culpa", label: "5. Culpa" },
      { id: "castigo", label: "6. Castigo" },
      { id: "disconformidad", label: "7. Disconformidad" },
    ],
  },
  {
    nombre: "Escala de Ansiedad",
    color: "amber",
    items: [
      { id: "nerviosismo", label: "1. Nerviosismo" },
      { id: "preocupacion", label: "2. Preocupación" },
      { id: "tension", label: "3. Tensión" },
      { id: "miedoPerderControl", label: "4. Miedo a perder el control" },
      { id: "inquietud", label: "5. Inquietud" },
    ],
  },
];

// Etiquetas según el valor del slider
const getEtiqueta = (valor) => {
  if (valor === 0) return { texto: "Nada", color: "text-slate-400" };
  if (valor <= 1) return { texto: "Mín", color: "text-green-500" };
  if (valor <= 2) return { texto: "Mod", color: "text-yellow-500" };
  if (valor <= 3) return { texto: "Alto", color: "text-orange-500" };
  return { texto: "Sev", color: "text-red-500" };
};

// Colores del slider según la escala
const coloresSlider = {
  blue: "accent-blue-500",
  amber: "accent-amber-500",
};

const coloresBadge = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function SeccionEscalas({ datos = {}, onChange }) {
  // Actualiza el valor de un ítem específico
  const handleSlider = (escala, itemId, valor) => {
    const escalaActual = datos[escala] || {};
    if (onChange) {
      onChange({
        ...datos,
        [escala]: { ...escalaActual, [itemId]: Number(valor) },
      });
    }
  };

  // Calcula el total de una escala
  const calcularTotal = (escala) => {
    const valores = datos[escala] || {};
    return Object.values(valores).reduce((sum, v) => sum + v, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
          📊
        </div>
        <h2 className="text-lg font-semibold text-slate-700">Escalas Psicométricas</h2>
        <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">
          SLIDERS 3D
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-6 ml-11">
        Desliza el control para calificar. Resultados orientativos.
      </p>

      <div className="space-y-8">
        {ESCALAS.map((escala) => {
          const total = calcularTotal(escala.nombre);
          const etiquetaTotal = getEtiqueta(total);

          return (
            <div key={escala.nombre}>
              {/* Nombre de la escala + total */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-600">
                    🏷 {escala.nombre}
                  </span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${coloresBadge[escala.color]}`}>
                  {total} ({etiquetaTotal.texto})
                </span>
              </div>

              {/* Items con slider */}
              <div className="space-y-3">
                {escala.items.map((item) => {
                  const valor = (datos[escala.nombre] || {})[item.id] || 0;
                  const etiqueta = getEtiqueta(valor);

                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      {/* Label */}
                      <span className="text-sm text-slate-600 w-44 shrink-0">
                        {item.label}
                      </span>

                      {/* Slider */}
                      <input
                        type="range"
                        min={0}
                        max={4}
                        step={1}
                        value={valor}
                        onChange={(e) =>
                          handleSlider(escala.nombre, item.id, e.target.value)
                        }
                        className={`flex-1 h-2 rounded-full cursor-pointer ${coloresSlider[escala.color]}`}
                      />

                      {/* Valor + etiqueta */}
                      <span className={`text-xs font-semibold w-14 text-right ${etiqueta.color}`}>
                        {valor} {etiqueta.texto}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Separador */}
              <div className="border-t border-slate-100 mt-4" />
            </div>
          );
        })}
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
        <SeccionEscalas datos={datos} onChange={setDatos} />
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
