// ============================================================
// SECCIÓN 6: Estado Clínico
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionRegistro({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-sm">🏥</div>
        <h2 className="text-lg font-semibold text-slate-700">Estado Clínico</h2>
      </div>

      <div className="space-y-5">

        {/* 1 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">1. ¿Existe algún diagnóstico preexistente o asociado?</p>
          <input type="text" name="diagnosticoPreexistente" value={datos.diagnosticoPreexistente || ""} onChange={handleChange}
            placeholder="Describe el diagnóstico si existe..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
        </div>

        {/* 2 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">2. ¿Se han realizado estudios de audición? Especifique:</p>
          <div className="flex items-center gap-4 mb-2">
            {["Sí", "No"].map((op) => (
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="estudiosAudicion" value={op}
                  checked={datos.estudiosAudicion === op} onChange={handleChange}
                  className="accent-rose-500" />
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
          {datos.estudiosAudicion === "Sí" && (
            <input type="text" name="estudiosAudicionDetalle" value={datos.estudiosAudicionDetalle || ""} onChange={handleChange}
              placeholder="Especifique los estudios realizados..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
          )}
        </div>

        {/* 3 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">3. ¿Se han realizado algún otro tipo de estudios médicos?</p>
          <div className="flex items-center gap-4 mb-2">
            {["Sí", "No"].map((op) => (
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="otrosEstudiosMedicos" value={op}
                  checked={datos.otrosEstudiosMedicos === op} onChange={handleChange}
                  className="accent-rose-500" />
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
          {datos.otrosEstudiosMedicos === "Sí" && (
            <input type="text" name="otrosEstudiosMedicosDetalle" value={datos.otrosEstudiosMedicosDetalle || ""} onChange={handleChange}
              placeholder="Especifique los estudios médicos..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
          )}
        </div>

        {/* 4 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">4. ¿Toma algún medicamento?</p>
          <div className="flex items-center gap-4 mb-2">
            {["Sí", "No"].map((op) => (
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tomaMedicamento" value={op}
                  checked={datos.tomaMedicamento === op} onChange={handleChange}
                  className="accent-rose-500" />
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
          {datos.tomaMedicamento === "Sí" && (
            <input type="text" name="tomaMedicamentoDetalle" value={datos.tomaMedicamentoDetalle || ""} onChange={handleChange}
              placeholder="¿Cuál medicamento y dosis?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
          )}
        </div>

        {/* 5 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">5. ¿Tiene alguna dieta especial o alergia?</p>
          <div className="flex items-center gap-4 mb-2">
            {["Sí", "No"].map((op) => (
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="dietaAlergia" value={op}
                  checked={datos.dietaAlergia === op} onChange={handleChange}
                  className="accent-rose-500" />
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
          {datos.dietaAlergia === "Sí" && (
            <input type="text" name="dietaAlergiaDetalle" value={datos.dietaAlergiaDetalle || ""} onChange={handleChange}
              placeholder="Especifique la dieta o alergia..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
          )}
        </div>

      </div>
    </div>
  );
}
