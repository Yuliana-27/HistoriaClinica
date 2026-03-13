import { useState } from "react";

// ============================================================
// SECCIÓN 2: Datos del Paciente + Periodo Perinatal
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionPaciente({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (onChange) onChange({ ...datos, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="space-y-6">

      {/* ── Datos del Paciente ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm">👤</div>
          <h2 className="text-lg font-semibold text-slate-700">Datos del Paciente</h2>
        </div>

        <div className="space-y-4">

          {/* Nombre, Edad, Género */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre Completo</label>
              <input type="text" name="nombrePaciente" value={datos.nombrePaciente || ""} onChange={handleChange}
                placeholder="Nombre del niño/a"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
              <input type="number" name="edad" value={datos.edad || ""} onChange={handleChange}
                placeholder="Años" min={0} max={120}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Género</label>
              <select name="genero" value={datos.genero || ""} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition bg-white">
                <option value="">Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
            </div>
          </div>

          {/* Fecha nacimiento, Grado estudios, Ocupación */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento || ""} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Grado de Estudios</label>
              <input type="text" name="gradoEstudios" value={datos.gradoEstudios || ""} onChange={handleChange}
                placeholder="Ej: 3° Primaria"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Escolaridad</label>
              <input type="text" name="escolaridad" value={datos.escolaridad || ""} onChange={handleChange}
                placeholder="Nivel de escolaridad"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Domicilio y Diagnóstico */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Domicilio Actual</label>
              <input type="text" name="domicilio" value={datos.domicilio || ""} onChange={handleChange}
                placeholder="Calle, colonia, ciudad"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Diagnóstico</label>
              <input type="text" name="diagnosticoPrevio" value={datos.diagnosticoPrevio || ""} onChange={handleChange}
                placeholder="Diagnóstico previo si existe"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Datos Mamá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Datos de la Mamá</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre</label>
                <input type="text" name="nombreMama" value={datos.nombreMama || ""} onChange={handleChange}
                  placeholder="Nombre completo"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
                <input type="number" name="edadMama" value={datos.edadMama || ""} onChange={handleChange}
                  placeholder="Edad" min={0}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Celular</label>
                <input type="text" name="celularMama" value={datos.celularMama || ""} onChange={handleChange}
                  placeholder="Número"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ocupación</label>
              <input type="text" name="ocupacionMama" value={datos.ocupacionMama || ""} onChange={handleChange}
                placeholder="Ocupación de la mamá"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Datos Papá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Datos del Papá</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre</label>
                <input type="text" name="nombrePapa" value={datos.nombrePapa || ""} onChange={handleChange}
                  placeholder="Nombre completo"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
                <input type="number" name="edadPapa" value={datos.edadPapa || ""} onChange={handleChange}
                  placeholder="Edad" min={0}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Celular</label>
                <input type="text" name="celularPapa" value={datos.celularPapa || ""} onChange={handleChange}
                  placeholder="Número"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ocupación</label>
              <input type="text" name="ocupacionPapa" value={datos.ocupacionPapa || ""} onChange={handleChange}
                placeholder="Ocupación del papá"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Hermanos */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Hermanos</p>
            <div className="flex items-center gap-6">
              <label className="text-sm text-slate-600 font-medium">¿Tiene hermanos?</label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tieneHermanos" value="Si" checked={datos.tieneHermanos === "Si"} onChange={handleChange} className="accent-teal-500" />
                <span className="text-sm text-slate-600">Sí</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tieneHermanos" value="No" checked={datos.tieneHermanos === "No"} onChange={handleChange} className="accent-teal-500" />
                <span className="text-sm text-slate-600">No</span>
              </label>
              {datos.tieneHermanos === "Si" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">¿Cuántos?</label>
                  <input type="number" name="cantidadHermanos" value={datos.cantidadHermanos || ""} onChange={handleChange}
                    placeholder="0" min={0} max={20}
                    className="w-20 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                </div>
              )}
            </div>
          </div>

          {/* Motivo de consulta y Referido por */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Motivo de Consulta</label>
              <textarea name="motivoConsulta" value={datos.motivoConsulta || ""} onChange={handleChange}
                placeholder="Describe el motivo principal de consulta..."
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Referido Por</label>
              <input type="text" name="referidoPor" value={datos.referidoPor || ""} onChange={handleChange}
                placeholder="Nombre o institución que refiere al paciente"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Periodo Perinatal ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm">🍼</div>
          <h2 className="text-lg font-semibold text-slate-700">Periodo Perinatal</h2>
        </div>

        <div className="space-y-4">

          {/* Tipo de parto */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Tipo de Parto</label>
              <select name="tipoParto" value={datos.tipoParto || ""} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white">
                <option value="">Seleccione</option>
                <option value="Normal">Normal</option>
                <option value="Cesárea">Cesárea</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Dificultades de Parto</label>
              <input type="text" name="dificultadesParto" value={datos.dificultadesParto || ""} onChange={handleChange}
                placeholder="Ej: anoxia, cordón umbilical..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>

          {/* Complicaciones al nacer */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Complicaciones al Nacer</label>
            <div className="flex flex-wrap gap-2">
              {["Anoxia", "Cordón Umbilical", "Placenta", "Malformación", "Ictericia", "Plecamsia", "Infección vías urinarias"].map((item) => {
                const seleccionados = datos.complicaciones || [];
                const activo = seleccionados.includes(item);
                return (
                  <button key={item} type="button"
                    onClick={() => {
                      const nuevos = activo ? seleccionados.filter((c) => c !== item) : [...seleccionados, item];
                      if (onChange) onChange({ ...datos, complicaciones: nuevos });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                      ${activo ? "bg-pink-500 text-white border-pink-500" : "bg-white text-slate-600 border-slate-300 hover:border-pink-400"}`}>
                    {item}{activo && <span className="ml-1">×</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Peso, Talla, Apgar */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Peso al Nacer</label>
              <input type="text" name="pesoNacer" value={datos.pesoNacer || ""} onChange={handleChange}
                placeholder="Ej: 3.2 kg"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Talla al Nacer</label>
              <input type="text" name="tallaNacer" value={datos.tallaNacer || ""} onChange={handleChange}
                placeholder="Ej: 50 cm"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Apgar</label>
              <input type="text" name="apgar" value={datos.apgar || ""} onChange={handleChange}
                placeholder="Puntuación Apgar"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>

          {/* Lactancia y sueño */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Lactancia Materna hasta los (meses)</label>
              <input type="number" name="lactanciaMeses" value={datos.lactanciaMeses || ""} onChange={handleChange}
                placeholder="Meses" min={0}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Biberón hasta los (meses)</label>
              <input type="number" name="biberonMeses" value={datos.biberonMeses || ""} onChange={handleChange}
                placeholder="Meses" min={0}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>

          {/* Desarrollo motor */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Desarrollo Motor (edad en meses)</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "edadDormir", label: "Dificultad para Dormir" },
                { name: "edadSedestacion", label: "Sedestación" },
                { name: "edadBipedestacion", label: "Bipedestación" },
                { name: "edadGateo", label: "Gateo" },
                { name: "edadMarcha", label: "Marcha" },
                { name: "edadSubirBajarEscaleras", label: "Subir y Bajar Escaleras" },
              ].map((campo) => (
                <div key={campo.name}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{campo.label}</label>
                  <input type="text" name={campo.name} value={datos[campo.name] || ""} onChange={handleChange}
                    placeholder="Meses"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Desarrollo del lenguaje */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Desarrollo del Lenguaje</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "edadBalbuceo", label: "Balbuceo" },
                { name: "primeraPalabra", label: "Primera Palabra" },
                { name: "oracionesCortas", label: "Oraciones Cortas" },
                { name: "oracionesLargas", label: "Oraciones Largas" },
                { name: "reconoceVocales", label: "Reconoce Vocales" },
                { name: "reconoceAbecedario", label: "Reconoce Abecedario" },
              ].map((campo) => (
                <div key={campo.name}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{campo.label}</label>
                  <input type="text" name={campo.name} value={datos[campo.name] || ""} onChange={handleChange}
                    placeholder="Edad / respuesta"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Control esfínteres y Frenillo */}
          <div className="border-t border-slate-100 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Control de Esfínteres</label>
                <input type="text" name="controlEsfinteres" value={datos.controlEsfinteres || ""} onChange={handleChange}
                  placeholder="Edad en que lo logró"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Presenta Frenillo</label>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="frenillo" value="Si" checked={datos.frenillo === "Si"} onChange={handleChange} className="accent-pink-500" />
                    <span className="text-sm text-slate-600">Sí</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="frenillo" value="No" checked={datos.frenillo === "No"} onChange={handleChange} className="accent-pink-500" />
                    <span className="text-sm text-slate-600">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
