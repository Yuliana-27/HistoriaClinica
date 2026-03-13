// ============================================================
// SECCIÓN 4: Psicomotor
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionEscalas({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  const RadioSiNo = ({ name, label }) => (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex gap-2">
        {["Sí", "No"].map((op) => (
          <label key={op} className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={name} value={op}
              checked={datos[name] === op} onChange={handleChange}
              className="accent-indigo-500" />
            <span className="text-sm text-slate-600">{op}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">🏃</div>
        <h2 className="text-lg font-semibold text-slate-700">Psicomotor</h2>
      </div>

      <div className="space-y-5">

        {/* Pregunta 1 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">1.</p>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="actualmente_gatea" label="¿Actualmente gatea?" />
            <RadioSiNo name="se_da_gira_cama" label="¿Se da gira en la cama?" />
          </div>
        </div>

        {/* Pregunta 2 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">2.</p>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="intenta_mantenerse_pie" label="¿Intenta mantenerse de pie?" />
            <RadioSiNo name="se_sienta" label="¿Se sienta?" />
          </div>
        </div>

        {/* Pregunta 3 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">3.</p>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="se_deja_caer" label="¿Se deja caer rápido?" />
            <RadioSiNo name="brinca_un_pie" label="¿Brinca en un pie?" />
          </div>
        </div>

        {/* Pregunta 4 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">4. ¿Presenta alguna molestia física?</p>
          <input type="text" name="molestiaFisica" value={datos.molestiaFisica || ""} onChange={handleChange}
            placeholder="Describe la molestia física si existe..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white" />
        </div>

        {/* Pregunta 5 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">5. ¿Camina de alguna manera extraña o diferente?</p>
          <input type="text" name="caminaRaro" value={datos.caminaRaro || ""} onChange={handleChange}
            placeholder="Describe cómo camina..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white" />
        </div>

        {/* Pregunta 6 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">6. ¿Hace algún tipo de actividad física?</p>
          <div className="flex items-center gap-6 mb-3">
            <RadioSiNo name="actividadFisica" label="¿Realiza actividad física?" />
          </div>
          {datos.actividadFisica === "Sí" && (
            <input type="text" name="actividadFisicaCual" value={datos.actividadFisicaCual || ""} onChange={handleChange}
              placeholder="¿Cuál actividad física realiza?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white" />
          )}
        </div>

      </div>
    </div>
  );
}
