import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SeccionProfesional from "./components/SeccionProfesional";
import SeccionDiagnostico from "./components/SeccionDiagnostico";

// ============================================================
// SECCIONES INTERNAS — Terapia de Conducta
// ============================================================

// ── Datos del Paciente ──────────────────────────────────────
function SeccionPacienteConducta({ datos = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm">👤</div>
          <h2 className="text-lg font-semibold text-slate-700">Datos del Paciente</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre del niño/a</label>
              <input type="text" name="nombrePaciente" value={datos.nombrePaciente || ""} onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
              <input type="number" name="edad" value={datos.edad || ""} onChange={handleChange} placeholder="Años" min={0}
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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento || ""} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Grado de Estudios</label>
              <input type="text" name="gradoEstudios" value={datos.gradoEstudios || ""} onChange={handleChange} placeholder="Ej: 3° Primaria"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Domicilio Actual</label>
              <input type="text" name="domicilio" value={datos.domicilio || ""} onChange={handleChange} placeholder="Calle, colonia, ciudad"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Diagnóstico</label>
            <input type="text" name="diagnosticoPrevio" value={datos.diagnosticoPrevio || ""} onChange={handleChange} placeholder="Diagnóstico previo si existe"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
          </div>

          {/* Mamá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Datos de la Mamá</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre</label>
                <input type="text" name="nombreMama" value={datos.nombreMama || ""} onChange={handleChange} placeholder="Nombre completo"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
                <input type="number" name="edadMama" value={datos.edadMama || ""} onChange={handleChange} placeholder="Edad" min={0}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Celular</label>
                <input type="text" name="celularMama" value={datos.celularMama || ""} onChange={handleChange} placeholder="Número"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ocupación</label>
              <input type="text" name="ocupacionMama" value={datos.ocupacionMama || ""} onChange={handleChange} placeholder="Ocupación"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Papá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Datos del Papá</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre</label>
                <input type="text" name="nombrePapa" value={datos.nombrePapa || ""} onChange={handleChange} placeholder="Nombre completo"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
                <input type="number" name="edadPapa" value={datos.edadPapa || ""} onChange={handleChange} placeholder="Edad" min={0}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Celular</label>
                <input type="text" name="celularPapa" value={datos.celularPapa || ""} onChange={handleChange} placeholder="Número"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ocupación</label>
              <input type="text" name="ocupacionPapa" value={datos.ocupacionPapa || ""} onChange={handleChange} placeholder="Ocupación"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>

          {/* Hermanos + Motivo + Referido */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-6 mb-3">
              <label className="text-sm text-slate-600 font-medium">¿Tiene hermanos?</label>
              {["Si", "No"].map((op) => (
                <label key={op} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="tieneHermanos" value={op} checked={datos.tieneHermanos === op} onChange={handleChange} className="accent-teal-500" />
                  <span className="text-sm text-slate-600">{op}</span>
                </label>
              ))}
              {datos.tieneHermanos === "Si" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 font-medium">¿Cuántos?</label>
                  <input type="number" name="cantidadHermanos" value={datos.cantidadHermanos || ""} onChange={handleChange}
                    placeholder="0" min={0} max={20}
                    className="w-20 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Motivo de Consulta</label>
                <textarea name="motivoConsulta" value={datos.motivoConsulta || ""} onChange={handleChange}
                  placeholder="Motivo principal de consulta..." rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Referido Por</label>
                <input type="text" name="referidoPor" value={datos.referidoPor || ""} onChange={handleChange} placeholder="Nombre o institución"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Periodo Perinatal */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm">🍼</div>
          <h2 className="text-lg font-semibold text-slate-700">Periodo Perinatal</h2>
        </div>
        <div className="space-y-4">
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
              <input type="text" name="dificultadesParto" value={datos.dificultadesParto || ""} onChange={handleChange} placeholder="Ej: anoxia, cordón umbilical..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Complicaciones al Nacer</label>
            <div className="flex flex-wrap gap-2">
              {["Anoxia", "Cordón Umbilical", "Placenta", "Malformación", "Ictericia", "Plecamsia", "Infección vías urinarias"].map((item) => {
                const sel = datos.complicaciones || [];
                const activo = sel.includes(item);
                return (
                  <button key={item} type="button"
                    onClick={() => onChange({ ...datos, complicaciones: activo ? sel.filter(c => c !== item) : [...sel, item] })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${activo ? "bg-pink-500 text-white border-pink-500" : "bg-white text-slate-600 border-slate-300 hover:border-pink-400"}`}>
                    {item}{activo && <span className="ml-1">×</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[["pesoNacer","Peso al Nacer","Ej: 3.2 kg"],["tallaNacer","Talla al Nacer","Ej: 50 cm"],["apgar","Apgar","Puntuación"],["lactanciaMeses","Lactancia (meses)","Meses"]].map(([n,l,p]) => (
              <div key={n}>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{l}</label>
                <input type="text" name={n} value={datos[n] || ""} onChange={handleChange} placeholder={p}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Desarrollo (meses)</p>
            <div className="grid grid-cols-4 gap-3">
              {[["edadDormir","Dificultad dormir"],["edadSedestacion","Sedestación"],["edadBipedestacion","Bipedestación"],["edadGateo","Gateo"],["edadMarcha","Marcha"],["edadSubirBajarEscaleras","Subir/Bajar escaleras"],["edadBalbuceo","Balbuceo"],["primeraPalabra","Primera palabra"],["oracionesCortas","Oraciones cortas"],["oracionesLargas","Oraciones largas"],["reconoceVocales","Reconoce vocales"],["reconoceAbecedario","Reconoce abecedario"]].map(([n,l]) => (
                <div key={n}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{l}</label>
                  <input type="text" name={n} value={datos[n] || ""} onChange={handleChange} placeholder="Meses"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Control de Esfínteres</label>
              <input type="text" name="controlEsfinteres" value={datos.controlEsfinteres || ""} onChange={handleChange} placeholder="Edad en que lo logró"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Presenta Frenillo</label>
              <div className="flex gap-4 mt-1">
                {["Si", "No"].map((op) => (
                  <label key={op} className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="frenillo" value={op} checked={datos.frenillo === op} onChange={handleChange} className="accent-pink-500" />
                    <span className="text-sm text-slate-600">{op}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Descripción + Intereses ─────────────────────────────────
const DESCRIPCION_OPTS = ["Nervioso","Distraído","Sensible","Amable","Agresivo","Tímido","Amistoso","Mutismo","Renuente al contestar","Tartamudez","Verbalización Excesiva","Otros"];

function SeccionDescripcionConducta({ datos = {}, onChange }) {
  const handleChange = (e) => onChange({ ...datos, [e.target.name]: e.target.value });
  const toggle = (campo, item) => {
    const sel = datos[campo] || [];
    onChange({ ...datos, [campo]: sel.includes(item) ? sel.filter(s => s !== item) : [...sel, item] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">👦</div>
          <h2 className="text-lg font-semibold text-slate-700">Descripción del Niño</h2>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {DESCRIPCION_OPTS.map((item) => {
            const activo = (datos.descripcionNino || []).includes(item);
            return (
              <button key={item} type="button" onClick={() => toggle("descripcionNino", item)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition text-center ${activo ? "bg-purple-500 text-white border-purple-500" : "bg-white text-slate-600 border-slate-300 hover:border-purple-400"}`}>
                {item}
              </button>
            );
          })}
        </div>
        <textarea name="observacionesNino" value={datos.observacionesNino || ""} onChange={handleChange}
          placeholder="Observaciones adicionales del niño..." rows={2}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none" />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">⭐</div>
          <h2 className="text-lg font-semibold text-slate-700">Intereses y Pasatiempos</h2>
        </div>
        <div className="space-y-4">
          {[
            ["tiempoLibre","1. ¿Qué le gusta hacer en su tiempo libre?"],
            ["quéHaceSolo","3. ¿Qué hace cuando está solo?"],
            ["queNoLeGusta","4. ¿Qué no le gusta hacer?"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
              <input type="text" name={name} value={datos[name] || ""} onChange={handleChange} placeholder="Respuesta..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">2. ¿Prefiere estar solo o acompañado?</label>
            <div className="flex gap-4 mb-2">
              {["Solo","Acompañado","Ambos"].map(op => (
                <label key={op} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="prefiereEstar" value={op} checked={datos.prefiereEstar === op} onChange={handleChange} className="accent-yellow-500" />
                  <span className="text-sm text-slate-600">{op}</span>
                </label>
              ))}
            </div>
            <input type="text" name="prefiereEstarCuando" value={datos.prefiereEstarCuando || ""} onChange={handleChange}
              placeholder="¿Cuándo prefiere cada opción?"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Conducta (28 preguntas) ─────────────────────────────────
function SeccionConductaCompleta({ datos = {}, onChange }) {
  const handleChange = (e) => onChange({ ...datos, [e.target.name]: e.target.value });
  const toggle = (campo, item) => {
    const sel = datos[campo] || [];
    onChange({ ...datos, [campo]: sel.includes(item) ? sel.filter(s => s !== item) : [...sel, item] });
  };

  const RadioSiNo = ({ name, label, opciones = ["Sí","No","A veces"] }) => (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex gap-3">
        {opciones.map(op => (
          <label key={op} className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={name} value={op} checked={datos[name] === op} onChange={handleChange} className="accent-orange-500" />
            <span className="text-sm text-slate-600">{op}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const Campo = ({ name, placeholder = "Respuesta..." }) => (
    <input type="text" name={name} value={datos[name] || ""} onChange={handleChange} placeholder={placeholder}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
  );

  const Bloque = ({ num, children }) => (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <span className="text-xs font-bold text-orange-500 uppercase mb-2 block">{num}.</span>
      {children}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">🧩</div>
        <h2 className="text-lg font-semibold text-slate-700">Conducta</h2>
      </div>
      <div className="space-y-3">

        <Bloque num="1">
          <RadioSiNo name="dificultadHablar" label="¿Tiene dificultad para hablar?" />
          <div className="mt-2"><Campo name="dificultadHablarCuando" placeholder="¿Cuándo?" /></div>
        </Bloque>

        <Bloque num="2">
          <div className="grid grid-cols-2 gap-4">
            <RadioSiNo name="dificultadEscuchar" label="¿Dificultad al escuchar?" />
            <RadioSiNo name="poneAtencion" label="¿Le pone atención?" />
          </div>
          <div className="mt-2"><Campo name="dificultadEscucharCuando" placeholder="¿Cuándo?" /></div>
        </Bloque>

        <Bloque num="3">
          <label className="block text-sm text-slate-700 mb-2">¿Cómo es la convivencia con su familia en general?</label>
          <Campo name="convivenciaFamilia" />
        </Bloque>

        <Bloque num="4">
          <label className="block text-sm text-slate-700 mb-2">¿Tiene más interés en objetos (Pantalla/Celular) que en personas o juguetes?</label>
          <Campo name="interesObjetos" />
        </Bloque>

        <Bloque num="5">
          <RadioSiNo name="tieneTemos" label="¿Tiene temores?" opciones={["Sí","No"]} />
          <div className="mt-2"><Campo name="temoresCuales" placeholder="¿Cuáles?" /></div>
        </Bloque>

        <Bloque num="6">
          <label className="block text-sm text-slate-700 mb-2">¿Se orina en la cama?</label>
          <Campo name="orinaEnCama" />
        </Bloque>

        <Bloque num="7">
          <div className="flex flex-wrap gap-4 items-center">
            <RadioSiNo name="tieneAmigos" label="¿Tiene amigos?" opciones={["Sí","No"]} />
            <Campo name="cuantosAmigos" placeholder="¿Cuántos?" />
            <RadioSiNo name="hablaDeEllos" label="¿Habla de ellos?" opciones={["Sí","No"]} />
          </div>
        </Bloque>

        <Bloque num="8">
          <div className="grid grid-cols-2 gap-4">
            <RadioSiNo name="provocaPeleas" label="¿Provoca peleas con compañeros?" />
            <RadioSiNo name="intimida" label="¿Intimida a sus compañeros?" />
          </div>
        </Bloque>

        <Bloque num="9">
          <RadioSiNo name="gritaContinuamente" label="¿Grita continuamente?" />
          <div className="mt-2"><Campo name="gritaCuando" placeholder="¿Cuándo?" /></div>
        </Bloque>

        <Bloque num="10">
          <RadioSiNo name="muerdUnas" label="¿Se muerde las uñas?" />
          <div className="mt-2"><Campo name="muerdUnasCuando" placeholder="¿Cuándo?" /></div>
        </Bloque>

        <Bloque num="11">
          <div className="grid grid-cols-2 gap-4">
            <RadioSiNo name="tienePesadillas" label="¿Tiene pesadillas frecuentemente?" />
            <RadioSiNo name="dificultadDormir" label="¿Tiene dificultad para dormir?" />
          </div>
          <div className="mt-2"><Campo name="pesadillasCuando" placeholder="¿Cuándo?" /></div>
        </Bloque>

        <Bloque num="12">
          <RadioSiNo name="seGolpeaCabeza" label="¿Se golpea la cabeza al estar molesto?" />
        </Bloque>

        <Bloque num="13">
          <RadioSiNo name="esImpulsivo" label="¿Es impulsivo?" opciones={["Sí","No","A veces"]} />
        </Bloque>

        <Bloque num="14">
          <RadioSiNo name="noCumpleTareas" label="¿No cumple con sus tareas en la escuela?" />
        </Bloque>

        <Bloque num="15">
          <div className="grid grid-cols-2 gap-4">
            <RadioSiNo name="sigueReglasCasa" label="¿Sigue reglas en casa?" />
            <RadioSiNo name="sigueReglasEscuela" label="¿Y en la escuela?" />
          </div>
        </Bloque>

        <Bloque num="16">
          <label className="block text-sm text-slate-700 mb-2">¿Hace amigos con facilidad?</label>
          <div className="flex flex-wrap gap-2">
            {["Comunicativo","Poco comunicativo","Participa en grupo","Tendencia a aislarse","Pasivo","Agresivo","Dependiente","Independiente"].map(op => {
              const activo = (datos.tipoSocial || []).includes(op);
              return (
                <button key={op} type="button" onClick={() => toggle("tipoSocial", op)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${activo ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-600 border-slate-300 hover:border-orange-400"}`}>
                  {op}
                </button>
              );
            })}
          </div>
        </Bloque>

        <Bloque num="17">
          <label className="block text-sm text-slate-700 mb-2">¿Qué lo hace feliz?</label>
          <Campo name="queLoHaceFeliz" />
        </Bloque>

        <Bloque num="18">
          <label className="block text-sm text-slate-700 mb-2">¿Qué lo entristece?</label>
          <Campo name="queLoEntristece" />
        </Bloque>

        <Bloque num="19">
          <RadioSiNo name="tieneResponsabilidades" label="¿En casa cuenta con responsabilidades?" opciones={["Sí","No"]} />
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Campo name="responsabilidadesCuales" placeholder="¿Cuáles?" />
            <RadioSiNo name="cumpleResponsabilidades" label="¿Las cumple?" opciones={["Sí","No"]} />
          </div>
        </Bloque>

        <Bloque num="20">
          <label className="block text-sm text-slate-700 mb-2">¿Quién es responsable de su disciplina y qué castigos utilizan frecuentemente cuando existe un berrinche?</label>
          <Campo name="disciplinaResponsable" />
        </Bloque>

        <Bloque num="21">
          <RadioSiNo name="mejorConConsecuencia" label="¿Considera que si se emite una consecuencia a sus acciones hay una mejora?" opciones={["Sí","No"]} />
          <div className="mt-2"><Campo name="mejorConConsecuenciaCuales" placeholder="¿Cuáles?" /></div>
        </Bloque>

        <Bloque num="22">
          <label className="block text-sm text-slate-700 mb-2">¿Qué tipo de estructuras comprende su hijo: palabras, frases, oraciones?</label>
          <Campo name="estructurasComprende" />
        </Bloque>

        <Bloque num="23">
          <label className="block text-sm text-slate-700 mb-2">¿Comprende consecuencias de sus acciones?</label>
          <Campo name="comprendConsecuencias" />
        </Bloque>

        <Bloque num="24">
          <label className="block text-sm text-slate-700 mb-2">¿Comprende los gestos asociados a la comunicación (alegría, enojo, señalamiento, etc.)?</label>
          <Campo name="comprendeGestos" />
        </Bloque>

        <Bloque num="25">
          <label className="block text-sm text-slate-700 mb-2">¿Considera que "está muy consentido"?</label>
          <Campo name="muyConsentido" />
        </Bloque>

        <Bloque num="26">
          <label className="block text-sm text-slate-700 mb-2">¿Existe alguna situación o cambio reciente que pueda resultar de relevancia en el comportamiento del menor?</label>
          <Campo name="cambioReciente" />
        </Bloque>

        <Bloque num="27">
          <label className="block text-sm text-slate-700 mb-2">¿Cómo demuestra sus sentimientos o emociones?</label>
          <Campo name="comoDemustraSentimientos" />
        </Bloque>

        <Bloque num="28">
          <label className="block text-sm text-slate-700 mb-2">Describa brevemente el contexto y dinámica familiar:</label>
          <textarea name="dinamicaFamiliar" value={datos.dinamicaFamiliar || ""} onChange={handleChange}
            placeholder="Descripción de la dinámica familiar..." rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none" />
        </Bloque>

      </div>
    </div>
  );
}

// ── Estado Clínico ──────────────────────────────────────────
function SeccionEstadoClinicos({ datos = {}, onChange }) {
  const handleChange = (e) => onChange({ ...datos, [e.target.name]: e.target.value });
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-sm">🏥</div>
        <h2 className="text-lg font-semibold text-slate-700">Estado Clínico</h2>
      </div>
      <div className="space-y-4">
        {[
          ["diagnosticoPreexistente","1. ¿Existe algún diagnóstico preexistente o asociado?","Describe..."],
          ["estudiosAudicionDetalle","2. ¿Se han realizado estudios de audición? Especifique:","Especifique..."],
          ["otrosEstudiosMedicosDetalle","3. ¿Se han realizado algún otro tipo de estudios médicos?","Especifique..."],
          ["tomaMedicamentoDetalle","4. ¿Toma algún medicamento?","¿Cuál y dosis?"],
          ["dietaAlergiaDetalle","5. ¿Tiene alguna dieta especial o alergia?","Especifique..."],
        ].map(([name, label, placeholder]) => (
          <div key={name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
            <input type="text" name={name} value={datos[name] || ""} onChange={handleChange} placeholder={placeholder}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL — EntrevistaConducta
// ══════════════════════════════════════════════════════════════
export default function EntrevistaConducta({ profesional, onGuardarConfig, guardandoConfig, onVolver }) {
  const ESTADO = { paciente: {}, descripcion: {}, conducta: {}, estadoClinico: {}, diagnostico: {} };
  const [datos, setDatos] = useState(ESTADO);
  const [expedienteId, setExpedienteId] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [listaExpedientes, setListaExpedientes] = useState([]);
  const [vistaLista, setVistaLista] = useState(false);

  const actualizar = (sec) => (val) => setDatos(prev => ({ ...prev, [sec]: val }));

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => { cargarLista(); }, []);

  const cargarLista = async () => {
    const { data, error } = await supabase.from("expedientes_conducta").select("id, created_at, paciente").order("updated_at", { ascending: false });
    if (!error) setListaExpedientes(data || []);
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      const payload = {
        profesional,
        paciente: datos.paciente,
        descripcion: datos.descripcion,
        conducta: datos.conducta,
        estado_clinico: datos.estadoClinico,
        diagnostico: datos.diagnostico,
        updated_at: new Date().toISOString(),
      };
      if (expedienteId) {
        const { error } = await supabase.from("expedientes_conducta").update(payload).eq("id", expedienteId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("expedientes_conducta").insert(payload).select().single();
        if (error) throw error;
        setExpedienteId(data.id);
      }
      mostrarMensaje("exito", "✅ Expediente guardado correctamente");
      cargarLista();
    } catch (err) {
      mostrarMensaje("error", "❌ Error: " + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const cargarExpediente = async (id) => {
    const { data, error } = await supabase.from("expedientes_conducta").select("*").eq("id", id).single();
    if (error) { mostrarMensaje("error", "❌ Error al cargar"); return; }
    setDatos({ paciente: data.paciente || {}, descripcion: data.descripcion || {}, conducta: data.conducta || {}, estadoClinico: data.estado_clinico || {}, diagnostico: data.diagnostico || {} });
    setExpedienteId(data.id);
    setVistaLista(false);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este expediente?")) return;
    const { error } = await supabase.from("expedientes_conducta").delete().eq("id", id);
    if (!error) { mostrarMensaje("exito", "🗑️ Eliminado"); cargarLista(); if (expedienteId === id) reiniciar(); }
  };

  const reiniciar = () => { setDatos(ESTADO); setExpedienteId(null); setVistaLista(false); };

  const generarPDF = async (firmaBase64) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const PW = 210, M = 14, C = PW - M * 2;
    let y = 0;
    const AMARILLO=[255,243,194], AZUL=[194,220,255], ROSA=[255,209,220], VERDE=[204,235,210], LILA=[220,210,255];
    const HEADER=[107,91,158], NEGRO=[40,40,40], GRIS=[100,110,125], BLANCO=[255,255,255], GLINEA=[220,225,232];
    const col4 = C/4, col3 = C/3, mitad = C/2-2;
    const checkPage = (e=20) => { if(y+e>280){doc.addPage();y=15;} };
    const campo = (label, valor, x, yPos, ancho) => {
      if(!valor) return 0;
      doc.setFontSize(7);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);
      doc.text(label.toUpperCase(),x,yPos);
      doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);
      const lines=doc.splitTextToSize(String(valor),ancho-2);
      doc.text(lines,x,yPos+3.5);
      return lines.length*3.5+5.5;
    };
    const secH = (titulo, color) => {
      checkPage(14);
      doc.setFillColor(...color);doc.roundedRect(M,y,C,8,2,2,"F");
      doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);
      doc.text(titulo.toUpperCase(),M+4,y+5.5);y+=11;
    };
    const { paciente, descripcion, conducta, estadoClinico, diagnostico } = datos;
    // Encabezado
    doc.setFillColor(...HEADER);doc.rect(0,0,PW,40,"F");
    if(profesional.logo){doc.addImage(profesional.logo,"PNG",M+1,8,22,22);}
    else{doc.setFillColor(100,130,180);doc.circle(M+12,20,10,"F");}
    doc.setFontSize(14);doc.setFont("helvetica","bold");doc.setTextColor(...BLANCO);
    doc.text(profesional.nombre||"Nombre del Terapeuta",M+27,14);
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(190,210,240);
    if(profesional.especialidad)doc.text(profesional.especialidad,M+27,20);
    if(profesional.cedula)doc.text(`Cédula: ${profesional.cedula}`,M+27,25);
    if(profesional.institucion)doc.text(profesional.institucion,M+27,30);
    if(profesional.contacto||profesional.direccion)doc.text(`${profesional.direccion||""}  ${profesional.contacto||""}`.trim(),M+27,35);
    doc.setFillColor(247,168,192);doc.rect(0,40,PW,3,"F");
    y=49;
    doc.setFillColor(...LILA);doc.roundedRect(M,y,C,10,2,2,"F");
    doc.setFontSize(11);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);
    doc.text("ENTREVISTA TERAPIA DE CONDUCTA",PW/2,y+7,{align:"center"});
    doc.setFontSize(7.5);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}`,PW-M,y+7,{align:"right"});
    y+=15;
    // Paciente
    secH("1. Datos del Paciente",AZUL);
    y+=Math.max(campo("Nombre",paciente.nombrePaciente,M,y,col4*2),campo("Edad",paciente.edad,M+col4*2,y,col4/2),campo("Género",paciente.genero,M+col4*2.5,y,col4/2),campo("F. Nacimiento",paciente.fechaNacimiento,M+col4*3,y,col4));
    y+=Math.max(campo("Grado Estudios",paciente.gradoEstudios,M,y,col4),campo("Domicilio",paciente.domicilio,M+col4,y,col4*3));
    y+=campo("Diagnóstico Previo",paciente.diagnosticoPrevio,M,y,C);
    checkPage(15);doc.setFontSize(7.5);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text("MAMÁ",M,y);doc.text("PAPÁ",M+mitad+4,y);y+=4;
    y+=Math.max(campo("Nombre",paciente.nombreMama,M,y,mitad/2),campo("Edad",paciente.edadMama,M+mitad/2,y,mitad/4),campo("Celular",paciente.celularMama,M+mitad*0.75,y,mitad/4),campo("Nombre",paciente.nombrePapa,M+mitad+4,y,mitad/2),campo("Edad",paciente.edadPapa,M+mitad+4+mitad/2,y,mitad/4),campo("Celular",paciente.celularPapa,M+mitad+4+mitad*0.75,y,mitad/4));
    y+=Math.max(campo("Ocupación Mamá",paciente.ocupacionMama,M,y,mitad),campo("Ocupación Papá",paciente.ocupacionPapa,M+mitad+4,y,mitad));
    if(paciente.tieneHermanos)y+=campo("Hermanos",`${paciente.tieneHermanos}${paciente.cantidadHermanos?" — "+paciente.cantidadHermanos:""}`,M,y,col4*2);
    if(paciente.motivoConsulta)y+=campo("Motivo de Consulta",paciente.motivoConsulta,M,y,C);
    if(paciente.referidoPor)y+=campo("Referido Por",paciente.referidoPor,M,y,C);
    y+=3;
    // Periodo Perinatal
    checkPage(20);secH("2. Periodo Perinatal",ROSA);
    y+=Math.max(campo("Tipo de Parto",paciente.tipoParto,M,y,col4),campo("Dificultades",paciente.dificultadesParto,M+col4,y,col4),campo("Complicaciones",paciente.complicaciones?.join(", "),M+col4*2,y,col4*2));
    y+=Math.max(campo("Peso",paciente.pesoNacer,M,y,col4),campo("Talla",paciente.tallaNacer,M+col4,y,col4),campo("Apgar",paciente.apgar,M+col4*2,y,col4),campo("Lactancia (m)",paciente.lactanciaMeses,M+col4*3,y,col4));
    y+=3;
    // Descripción
    checkPage(15);secH("3. Descripción del Niño",AMARILLO);
    if(descripcion.descripcionNino?.length>0)y+=campo("Características",descripcion.descripcionNino.join("  ·  "),M,y,C);
    if(descripcion.observacionesNino)y+=campo("Observaciones",descripcion.observacionesNino,M,y,C);
    y+=2;
    // Intereses
    checkPage(15);secH("4. Intereses y Pasatiempos",VERDE);
    y+=Math.max(campo("Tiempo Libre",descripcion.tiempoLibre,M,y,mitad),campo("Prefiere estar",descripcion.prefiereEstar,M+mitad+4,y,mitad));
    if(descripcion.quéHaceSolo)y+=campo("¿Qué hace solo?",descripcion.quéHaceSolo,M,y,C);
    if(descripcion.queNoLeGusta)y+=campo("¿Qué no le gusta?",descripcion.queNoLeGusta,M,y,C);
    y+=2;
    // Conducta
    checkPage(20);secH("5. Conducta",LILA);
    const conductaItems=[
      ["Dificultad para hablar",conducta.dificultadHablar,conducta.dificultadHablarCuando],
      ["Dificultad al escuchar",conducta.dificultadEscuchar,conducta.dificultadEscucharCuando],
      ["Pone atención",conducta.poneAtencion,null],
      ["Convivencia familiar",null,conducta.convivenciaFamilia],
      ["Interés en objetos",null,conducta.interesObjetos],
      ["Temores",conducta.tieneTemos,conducta.temoresCuales],
      ["Se orina en cama",null,conducta.orinaEnCama],
      ["Tiene amigos",conducta.tieneAmigos,conducta.cuantosAmigos],
      ["Provoca peleas",conducta.provocaPeleas,null],
      ["Intimida",conducta.intimida,null],
      ["Grita continuamente",conducta.gritaContinuamente,conducta.gritaCuando],
      ["Se muerde uñas",conducta.muerdUnas,conducta.muerdUnasCuando],
      ["Pesadillas",conducta.tienePesadillas,null],
      ["Dificultad dormir",conducta.dificultadDormir,conducta.pesadillasCuando],
      ["Se golpea cabeza",conducta.seGolpeaCabeza,null],
      ["Es impulsivo",conducta.esImpulsivo,null],
      ["No cumple tareas",conducta.noCumpleTareas,null],
      ["Sigue reglas casa",conducta.sigueReglasCasa,null],
      ["Sigue reglas escuela",conducta.sigueReglasEscuela,null],
      ["Tipo social",conducta.tipoSocial?.join(" · "),null],
      ["Qué lo hace feliz",null,conducta.queLoHaceFeliz],
      ["Qué lo entristece",null,conducta.queLoEntristece],
      ["Responsabilidades",conducta.tieneResponsabilidades,conducta.responsabilidadesCuales],
      ["Disciplina/Castigos",null,conducta.disciplinaResponsable],
      ["Mejora con consecuencia",conducta.mejorConConsecuencia,conducta.mejorConConsecuenciaCuales],
      ["Estructuras comprende",null,conducta.estructurasComprende],
      ["Comprende consecuencias",null,conducta.comprendConsecuencias],
      ["Comprende gestos",null,conducta.comprendeGestos],
      ["Muy consentido",null,conducta.muyConsentido],
      ["Cambio reciente",null,conducta.cambioReciente],
      ["Demuestra sentimientos",null,conducta.comoDemustraSentimientos],
      ["Dinámica familiar",null,conducta.dinamicaFamiliar],
    ].filter(([,v,d])=>v||d);
    for(let i=0;i<conductaItems.length;i+=2){
      checkPage(8);let maxAlt=0;
      conductaItems.slice(i,i+2).forEach(([label,valor,detalle],j)=>{
        const texto=[valor,detalle].filter(Boolean).join(" — ");
        if(texto)maxAlt=Math.max(maxAlt,campo(label,texto,M+(C/2)*j,y,C/2-2));
      });
      if(maxAlt>0)y+=maxAlt;
    }
    y+=2;
    // Estado Clínico
    checkPage(20);secH("6. Estado Clínico",ROSA);
    [["Diagnóstico preexistente",estadoClinico.diagnosticoPreexistente],["Estudios audición",estadoClinico.estudiosAudicionDetalle],["Otros estudios",estadoClinico.otrosEstudiosMedicosDetalle],["Medicamento",estadoClinico.tomaMedicamentoDetalle],["Dieta/Alergia",estadoClinico.dietaAlergiaDetalle]].filter(([,v])=>v).forEach(([l,v],i,arr)=>{
      checkPage(8);
      if(i%2===0){
        let maxAlt=0;
        [[l,v],arr[i+1]||["",""]].forEach(([ll,vv],j)=>{if(vv)maxAlt=Math.max(maxAlt,campo(ll,vv,M+(C/2)*j,y,C/2-2));});
        if(maxAlt>0)y+=maxAlt;
      }
    });
    y+=2;
    // Diagnóstico
    checkPage(20);secH("7. Diagnóstico Final",AMARILLO);
    if(diagnostico.diagnostico){
      const lines=doc.splitTextToSize(diagnostico.diagnostico,C-6);
      const altBox=lines.length*4+6;
      doc.setFillColor(255,252,230);doc.roundedRect(M,y,C,altBox,2,2,"F");
      doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);
      doc.text(lines,M+3,y+5);y+=altBox+6;
    }
    // Firma
    checkPage(40);
    doc.setDrawColor(...GLINEA);doc.line(M,y,PW-M,y);y+=5;
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);
    doc.text("Firma del Psicólogo",PW/2,y,{align:"center"});y+=4;
    if(firmaBase64){doc.addImage(firmaBase64,"PNG",(PW-70)/2,y,70,20);y+=24;}
    else{doc.setDrawColor(...GLINEA);doc.line((PW-70)/2,y+18,(PW-70)/2+70,y+18);y+=22;}
    doc.setFontSize(8.5);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);
    doc.text(profesional.nombre||"",PW/2,y,{align:"center"});
    if(profesional.cedula){doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text(`Cédula: ${profesional.cedula}`,PW/2,y+4,{align:"center"});}
    const totalPags=doc.getNumberOfPages();
    for(let i=1;i<=totalPags;i++){doc.setPage(i);doc.setFillColor(...HEADER);doc.rect(0,290,PW,8,"F");doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(...BLANCO);doc.text(`Entrevista Terapia de Conducta  ·  Página ${i} de ${totalPags}`,PW/2,295,{align:"center"});}
    doc.save(`Conducta_${(paciente.nombrePaciente||"Paciente").replace(/ /g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  if (vistaLista) return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-700">📋 Expedientes — Terapia de Conducta</h1>
          <button onClick={() => setVistaLista(false)} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">← Volver</button>
        </div>
        {listaExpedientes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 shadow-md">No hay expedientes guardados aún.</div>
        ) : (
          <div className="space-y-3">
            {listaExpedientes.map(exp => (
              <div key={exp.id} className="bg-white rounded-xl shadow-md p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">{exp.paciente?.nombrePaciente || "Sin nombre"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(exp.created_at).toLocaleDateString("es-MX", { year:"numeric", month:"long", day:"numeric" })}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => cargarExpediente(exp.id)} className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-teal-200">Abrir</button>
                  <button onClick={() => eliminar(exp.id)} className="bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-red-200">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Barra superior */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onVolver} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-2 rounded-lg transition border border-slate-200">← Volver</button>
          <h2 className="text-xl font-bold text-slate-700">🧩 Terapia de Conducta</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { cargarLista(); setVistaLista(true); }} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">
            📋 Expedientes ({listaExpedientes.length})
          </button>
          <button onClick={reiniciar} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">＋ Nuevo</button>
          <button onClick={guardar} disabled={guardando} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            {guardando ? "Guardando..." : expedienteId ? "💾 Actualizar" : "💾 Guardar"}
          </button>
        </div>
      </div>

      {mensaje && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${mensaje.tipo === "exito" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {mensaje.texto}
        </div>
      )}

      {expedienteId && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs text-teal-600 font-medium">
          ✏️ Editando: <strong>{datos.paciente?.nombrePaciente || "paciente sin nombre"}</strong>
        </div>
      )}

      <SeccionPacienteConducta datos={datos.paciente} onChange={actualizar("paciente")} />
      <SeccionDescripcionConducta datos={datos.descripcion} onChange={actualizar("descripcion")} />
      <SeccionConductaCompleta datos={datos.conducta} onChange={actualizar("conducta")} />
      <SeccionEstadoClinicos datos={datos.estadoClinico} onChange={actualizar("estadoClinico")} />
      <SeccionDiagnostico datos={datos.diagnostico} onChange={actualizar("diagnostico")} onGenerarPDF={generarPDF} />
    </div>
  );
}
