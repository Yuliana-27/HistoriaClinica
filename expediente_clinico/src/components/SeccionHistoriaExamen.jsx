// ============================================================
// SECCIÓN 3: Descripción del Niño + Intereses + Conducta
// Sistema de Expediente Clínico Psicológico
// ============================================================

const DESCRIPCION_OPCIONES = [
  "Nervioso", "Distraído", "Sensible", "Amable",
  "Agresivo", "Tímido", "Amistoso", "Mutismo",
  "Renuente al contestar", "Tartamudez", "Verbalización Excesiva", "Otros",
];

export default function SeccionHistoriaExamen({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  const toggleDescripcion = (item) => {
    const actuales = datos.descripcionNino || [];
    const existe = actuales.includes(item);
    const nuevos = existe ? actuales.filter((d) => d !== item) : [...actuales, item];
    if (onChange) onChange({ ...datos, descripcionNino: nuevos });
  };

  const descripcionSeleccionada = datos.descripcionNino || [];

  return (
    <div className="space-y-6">

      {/* ── Descripción del Niño ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">👦</div>
          <h2 className="text-lg font-semibold text-slate-700">Descripción del Niño</h2>
        </div>

        {/* Botones de características */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {DESCRIPCION_OPCIONES.map((item) => {
            const activo = descripcionSeleccionada.includes(item);
            return (
              <button key={item} type="button" onClick={() => toggleDescripcion(item)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition text-center
                  ${activo
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-slate-600 border-slate-300 hover:border-purple-400"
                  }`}>
                {item}
              </button>
            );
          })}
        </div>

        {/* Observaciones adicionales */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Observaciones Adicionales</label>
          <textarea name="observacionesNino" value={datos.observacionesNino || ""} onChange={handleChange}
            placeholder="Describe otras características observadas del niño..."
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none" />
        </div>
      </div>

      {/* ── Intereses y Pasatiempos ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">⭐</div>
          <h2 className="text-lg font-semibold text-slate-700">Intereses y Pasatiempos</h2>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              1. ¿Qué le gusta hacer en su tiempo libre?
            </label>
            <input type="text" name="tiempoLibre" value={datos.tiempoLibre || ""} onChange={handleChange}
              placeholder="Respuesta..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              2. ¿Prefiere estar solo o acompañado?
            </label>
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="prefiereEstar" value="Solo" checked={datos.prefiereEstar === "Solo"} onChange={handleChange} className="accent-yellow-500" />
                <span className="text-sm text-slate-600">Solo</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="prefiereEstar" value="Acompañado" checked={datos.prefiereEstar === "Acompañado"} onChange={handleChange} className="accent-yellow-500" />
                <span className="text-sm text-slate-600">Acompañado</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="prefiereEstar" value="Ambos" checked={datos.prefiereEstar === "Ambos"} onChange={handleChange} className="accent-yellow-500" />
                <span className="text-sm text-slate-600">Ambos</span>
              </label>
            </div>
            <input type="text" name="prefiereEstarCuando" value={datos.prefiereEstarCuando || ""} onChange={handleChange}
              placeholder="¿Cuándo prefiere estar solo? ¿Cuándo acompañado?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              3. ¿Qué hace cuando está solo?
            </label>
            <input type="text" name="quéHaceSolo" value={datos.quéHaceSolo || ""} onChange={handleChange}
              placeholder="Respuesta..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>

        </div>
      </div>

      {/* ── Conducta ── */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">🧩</div>
          <h2 className="text-lg font-semibold text-slate-700">Conducta</h2>
        </div>

        <div className="space-y-5">

          {/* Pregunta 1 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              1. ¿Tiene dificultad para hablar?
            </label>
            <div className="flex items-center gap-4 mb-2">
              {["Sí", "No", "A veces"].map((op) => (
                <label key={op} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="dificultadHablar" value={op} checked={datos.dificultadHablar === op} onChange={handleChange} className="accent-orange-500" />
                  <span className="text-sm text-slate-600">{op}</span>
                </label>
              ))}
            </div>
            <input type="text" name="dificultadHablarCuando" value={datos.dificultadHablarCuando || ""} onChange={handleChange}
              placeholder="¿Cuándo?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
          </div>

          {/* Pregunta 2 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              2. ¿Dificultad al escuchar? ¿Le pone atención?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Dificultad al escuchar</p>
                <div className="flex gap-3">
                  {["Sí", "No", "A veces"].map((op) => (
                    <label key={op} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="dificultadEscuchar" value={op} checked={datos.dificultadEscuchar === op} onChange={handleChange} className="accent-orange-500" />
                      <span className="text-sm text-slate-600">{op}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">¿Le pone atención?</p>
                <div className="flex gap-3">
                  {["Sí", "No", "A veces"].map((op) => (
                    <label key={op} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="poneAtencion" value={op} checked={datos.poneAtencion === op} onChange={handleChange} className="accent-orange-500" />
                      <span className="text-sm text-slate-600">{op}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <input type="text" name="dificultadEscucharCuando" value={datos.dificultadEscucharCuando || ""} onChange={handleChange}
              placeholder="¿Cuándo?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition mt-2" />
          </div>

          {/* Pregunta 3 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              3. ¿Tiene más interés en objetos (Pantalla/Celular) que en personas o juguetes?
            </label>
            <input type="text" name="interesObjetos" value={datos.interesObjetos || ""} onChange={handleChange}
              placeholder="Respuesta..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
          </div>

          {/* Pregunta 4 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              4. ¿Sigue reglas?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">En casa</p>
                <div className="flex gap-3">
                  {["Sí", "No", "A veces"].map((op) => (
                    <label key={op} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="sigueReglasCasa" value={op} checked={datos.sigueReglasCasa === op} onChange={handleChange} className="accent-orange-500" />
                      <span className="text-sm text-slate-600">{op}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">En la escuela</p>
                <div className="flex gap-3">
                  {["Sí", "No", "A veces"].map((op) => (
                    <label key={op} className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="sigueReglasEscuela" value={op} checked={datos.sigueReglasEscuela === op} onChange={handleChange} className="accent-orange-500" />
                      <span className="text-sm text-slate-600">{op}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pregunta 5 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              5. ¿Hace amigos con facilidad?
            </label>
            <div className="flex flex-wrap gap-2">
              {["Comunicativo", "Poco comunicativo", "Participa en grupo", "Tendencia a aislarse", "Pasivo", "Agresivo", "Dependiente", "Independiente"].map((op) => {
                const seleccionados = datos.tipoSocial || [];
                const activo = seleccionados.includes(op);
                return (
                  <button key={op} type="button"
                    onClick={() => {
                      const nuevos = activo ? seleccionados.filter((s) => s !== op) : [...seleccionados, op];
                      if (onChange) onChange({ ...datos, tipoSocial: nuevos });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                      ${activo ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-600 border-slate-300 hover:border-orange-400"}`}>
                    {op}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pregunta 6 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              6. ¿Qué lo hace feliz?
            </label>
            <input type="text" name="queLoHaceFeliz" value={datos.queLoHaceFeliz || ""} onChange={handleChange}
              placeholder="Respuesta..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
          </div>

          {/* Pregunta 7 */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              7. ¿Qué lo entristece?
            </label>
            <input type="text" name="queLoEntristece" value={datos.queLoEntristece || ""} onChange={handleChange}
              placeholder="Respuesta..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
          </div>

        </div>
      </div>

    </div>
  );
}
