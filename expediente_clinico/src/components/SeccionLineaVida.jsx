// ============================================================
// SECCIÓN 5: Aprendizaje y Ocupacional
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionLineaVida({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  const RadioSiNo = ({ name, label }) => (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-slate-700 font-medium">{label}</span>
      <div className="flex gap-3">
        {["Sí", "No"].map((op) => (
          <label key={op} className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={name} value={op}
              checked={datos[name] === op} onChange={handleChange}
              className="accent-violet-500" />
            <span className="text-sm text-slate-600">{op}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white text-sm">📚</div>
        <h2 className="text-lg font-semibold text-slate-700">Aprendizaje y Ocupacional</h2>
      </div>

      <div className="space-y-5">

        {/* 8 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">8.</span>
            <RadioSiNo name="reconoceAbecedario" label="¿Reconoce el abecedario?" />
          </div>
          <input type="text" name="reconoceAbecedarioDetalle" value={datos.reconoceAbecedarioDetalle || ""} onChange={handleChange}
            placeholder="Observaciones..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 9 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">9.</span>
            <RadioSiNo name="problemasSilabas" label="¿Tiene problemas con sílabas trabadas?" />
          </div>
          <input type="text" name="problemasSilabasDetalle" value={datos.problemasSilabasDetalle || ""} onChange={handleChange}
            placeholder="Observaciones..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 10 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">10.</span>
            <RadioSiNo name="leGstaLeer" label="¿Le gusta leer?" />
          </div>
          <input type="text" name="queLeGustaLeer" value={datos.queLeGustaLeer || ""} onChange={handleChange}
            placeholder="¿Qué le gusta leer?"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 11 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase block mb-2">11.</span>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="escribeCorrectamente" label="¿Escribe correctamente?" />
            <RadioSiNo name="sigueDictado" label="¿Sigue bien el dictado?" />
          </div>
        </div>

        {/* 12 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">12.</span>
            <RadioSiNo name="sabeTablas" label="¿Se sabe las tablas de multiplicar?" />
          </div>
          <input type="text" name="hastaQueTabla" value={datos.hastaQueTabla || ""} onChange={handleChange}
            placeholder="¿Hasta cuál tabla?"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 13 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-3">13. Operaciones Básicas</p>
          <div className="flex flex-wrap gap-3">
            {["Suma", "Resta", "División", "Multiplicación"].map((op) => {
              const seleccionados = datos.operacionesBasicas || [];
              const activo = seleccionados.includes(op);
              return (
                <button key={op} type="button"
                  onClick={() => {
                    const nuevos = activo ? seleccionados.filter((s) => s !== op) : [...seleccionados, op];
                    if (onChange) onChange({ ...datos, operacionesBasicas: nuevos });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                    ${activo ? "bg-violet-500 text-white border-violet-500" : "bg-white text-slate-600 border-slate-300 hover:border-violet-400"}`}>
                  {op}
                </button>
              );
            })}
          </div>
        </div>

        {/* 14 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase block mb-2">14.</span>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="sabeRecortar" label="¿Sabe recortar?" />
            <RadioSiNo name="agarraLapiz" label="¿Agarra bien el lápiz?" />
          </div>
        </div>

        {/* 15 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase block mb-2">15.</span>
          <div className="flex flex-wrap gap-6">
            <RadioSiNo name="seVisteSolo" label="¿Se viste solo?" />
            <RadioSiNo name="comeSolo" label="¿Come solo?" />
          </div>
        </div>

        {/* 16 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase">16.</span>
            <RadioSiNo name="seBaniaSolo" label="¿Se baña solo?" />
          </div>
        </div>

        {/* 17 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">17.</span>
            <RadioSiNo name="seLavaDientes" label="¿Se lava los dientes solo?" />
          </div>
          <input type="text" name="seLavaDientesDetalle" value={datos.seLavaDientesDetalle || ""} onChange={handleChange}
            placeholder="Observaciones..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 18 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">18. ¿Qué tipo de juegos didácticos utiliza?</p>
          <input type="text" name="juegosDidacticos" value={datos.juegosDidacticos || ""} onChange={handleChange}
            placeholder="Describe los juegos que utiliza..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
        </div>

        {/* 19 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">19.</span>
            <RadioSiNo name="molestanTexturas" label="¿Le molesta algún tipo de texturas?" />
          </div>
          {datos.molestanTexturas === "Sí" && (
            <input type="text" name="molestanTexturasCuales" value={datos.molestanTexturasCuales || ""} onChange={handleChange}
              placeholder="¿Cuáles texturas le molestan?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
          )}
        </div>

      </div>
    </div>
  );
}
