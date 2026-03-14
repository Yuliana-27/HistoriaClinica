import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SeccionDiagnostico from "./components/SeccionDiagnostico";

// ============================================================
// ENTREVISTA — Psicológica
// ============================================================

function Card({ icono, titulo, color, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white text-sm`}>{icono}</div>
        <h2 className="text-lg font-semibold text-slate-700">{titulo}</h2>
      </div>
      {children}
    </div>
  );
}

function Bloque({ num, children }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
      {num && <span className="text-xs font-bold text-violet-500 uppercase">{num}.</span>}
      {children}
    </div>
  );
}

function Campo({ name, label, datos, onChange, placeholder = "Respuesta...", rows }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>}
      {rows
        ? <textarea name={name} value={datos[name] || ""} onChange={hc} placeholder={placeholder} rows={rows}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none bg-white" />
        : <input type="text" name={name} value={datos[name] || ""} onChange={hc} placeholder={placeholder}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
      }
    </div>
  );
}

function RadioGroup({ name, label, datos, onChange, opciones = ["Sí", "No", "A veces"] }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {label && <span className="text-sm text-slate-700">{label}</span>}
      <div className="flex gap-3">
        {opciones.map(op => (
          <label key={op} className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={name} value={op} checked={datos[name] === op}
              onChange={e => onChange({ ...datos, [e.target.name]: e.target.value })}
              className="accent-violet-500" />
            <span className="text-sm text-slate-600">{op}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ── 1. Datos del Paciente ─────────────────────────────────────
function SeccionDatos({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const COMPLICACIONES = ["Anoxia","Cordón Umbilical","Placenta","Malformación","Ictericia","Plecamsia","Infección vías urinarias"];
  const DESCRIPCION = ["Nervioso","Distraído","Sensible","Amable","Agresivo","Tímido","Amistoso","Mutismo","Renuente al contestar","Tartamudez","Verbalización Excesiva","Otros"];
  const toggleArr = (campo, item) => {
    const s = datos[campo] || [];
    onChange({ ...datos, [campo]: s.includes(item) ? s.filter(x => x !== item) : [...s, item] });
  };

  // Personas que viven en casa
  const personas = datos.personasCasa || [{ nombre: "", parentesco: "" }, { nombre: "", parentesco: "" }, { nombre: "", parentesco: "" }, { nombre: "", parentesco: "" }];
  const updatePersona = (i, campo, val) => {
    const nuevas = personas.map((p, idx) => idx === i ? { ...p, [campo]: val } : p);
    onChange({ ...datos, personasCasa: nuevas });
  };

  return (
    <div className="space-y-6">
      <Card icono="👤" titulo="Datos del Paciente" color="bg-teal-600">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nombre del niño/a</label>
              <input type="text" name="nombrePaciente" value={datos.nombrePaciente||""} onChange={hc} placeholder="Nombre completo"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Edad</label>
              <input type="number" name="edad" value={datos.edad||""} onChange={hc} min={0}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Género</label>
              <select name="genero" value={datos.genero||""} onChange={hc}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition">
                <option value="">Seleccione</option><option>Femenino</option><option>Masculino</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento||""} onChange={hc}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Grado de Estudios</label>
              <input type="text" name="gradoEstudios" value={datos.gradoEstudios||""} onChange={hc} placeholder="Ej: 3° Primaria"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Domicilio Actual</label>
            <input type="text" name="domicilio" value={datos.domicilio||""} onChange={hc} placeholder="Calle, colonia, ciudad"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Diagnóstico</label>
            <input type="text" name="diagnosticoPrevio" value={datos.diagnosticoPrevio||""} onChange={hc} placeholder="Diagnóstico previo si existe"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
          </div>

          {/* Mamá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Datos de la Mamá</p>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nombre</label>
                <input type="text" name="nombreMama" value={datos.nombreMama||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Edad</label>
                <input type="number" name="edadMama" value={datos.edadMama||""} onChange={hc} min={0} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Celular</label>
                <input type="text" name="celularMama" value={datos.celularMama||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
            </div>
            <div className="mt-2"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ocupación</label>
              <input type="text" name="ocupacionMama" value={datos.ocupacionMama||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
          </div>

          {/* Papá */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Datos del Papá</p>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nombre</label>
                <input type="text" name="nombrePapa" value={datos.nombrePapa||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Edad</label>
                <input type="number" name="edadPapa" value={datos.edadPapa||""} onChange={hc} min={0} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Celular</label>
                <input type="text" name="celularPapa" value={datos.celularPapa||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
            </div>
            <div className="mt-2"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Ocupación</label>
              <input type="text" name="ocupacionPapa" value={datos.ocupacionPapa||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" /></div>
          </div>

          {/* Hermanos */}
          <div className="border-t border-slate-100 pt-4 flex items-center gap-4">
            <span className="text-sm text-slate-600 font-medium">¿Tiene hermanos?</span>
            {["Si","No"].map(op => (
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tieneHermanos" value={op} checked={datos.tieneHermanos===op} onChange={hc} className="accent-teal-500"/>
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
            {datos.tieneHermanos==="Si" && (
              <input type="number" name="cantidadHermanos" value={datos.cantidadHermanos||""} onChange={hc} placeholder="¿Cuántos?" min={0}
                className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            )}
          </div>

          {/* Personas que viven en casa */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Personas que viven en casa con el niño</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 bg-slate-100 px-4 py-2">
                <span className="text-xs font-bold text-slate-600 uppercase">Nombre</span>
                <span className="text-xs font-bold text-slate-600 uppercase">Parentesco</span>
              </div>
              {personas.map((p, i) => (
                <div key={i} className="grid grid-cols-2 border-t border-slate-100">
                  <input type="text" value={p.nombre} onChange={e => updatePersona(i, "nombre", e.target.value)}
                    placeholder={`Persona ${i+1}`}
                    className="px-4 py-2 text-sm text-slate-700 focus:outline-none focus:bg-violet-50 border-r border-slate-100 transition" />
                  <input type="text" value={p.parentesco} onChange={e => updatePersona(i, "parentesco", e.target.value)}
                    placeholder="Parentesco"
                    className="px-4 py-2 text-sm text-slate-700 focus:outline-none focus:bg-violet-50 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Motivo y Referido */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Motivo de Consulta</label>
              <textarea name="motivoConsulta" value={datos.motivoConsulta||""} onChange={hc} rows={3} placeholder="Motivo principal de consulta..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Referido Por</label>
              <input type="text" name="referidoPor" value={datos.referidoPor||""} onChange={hc} placeholder="Nombre o institución"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>
        </div>
      </Card>

      {/* Periodo Perinatal */}
      <Card icono="🍼" titulo="Periodo Perinatal" color="bg-pink-500">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tipo de Parto</label>
              <select name="tipoParto" value={datos.tipoParto||""} onChange={hc}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition">
                <option value="">Seleccione</option><option>Normal</option><option>Cesárea</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Dificultades de Parto</label>
              <input type="text" name="dificultadesParto" value={datos.dificultadesParto||""} onChange={hc} placeholder="Ej: anoxia..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Complicaciones al Nacer</label>
            <div className="flex flex-wrap gap-2">
              {COMPLICACIONES.map(item => {
                const activo = (datos.complicaciones||[]).includes(item);
                return <button key={item} type="button" onClick={() => toggleArr("complicaciones", item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${activo?"bg-pink-500 text-white border-pink-500":"bg-white text-slate-600 border-slate-300 hover:border-pink-400"}`}>
                  {item}{activo&&<span className="ml-1">×</span>}
                </button>;
              })}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[["pesoNacer","Peso al Nacer"],["tallaNacer","Talla al Nacer"],["apgar","Apgar"],["lactanciaMeses","Lactancia (m)"]].map(([n,l])=>(
              <div key={n}>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{l}</label>
                <input type="text" name={n} value={datos[n]||""} onChange={hc}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 border-t border-slate-100 pt-3">
            {[["biberonMeses","Biberón (m)"],["edadDormir","Dificultad dormir"],["edadSedestacion","Sedestación"],["edadBipedestacion","Bipedestación"],["edadGateo","Gateo"],["edadMarcha","Marcha"],["edadSubirBajarEscaleras","Subir escaleras"],["controlEsfinteres","Ctrl esfínteres"],["edadBalbuceo","Balbuceo"],["primeraPalabra","Primera palabra"],["oracionesCortas","Oraciones cortas"],["oracionesLargas","Oraciones largas"],["reconoceVocales","Reconoce vocales"],["reconoceAbecedario","Reconoce abecedario"]].map(([n,l])=>(
              <div key={n}>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{l}</label>
                <input type="text" name={n} value={datos[n]||""} onChange={hc} placeholder="meses"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
            <span className="text-sm text-slate-600 font-medium">Presenta Frenillo:</span>
            {["Si","No"].map(op=>(
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="frenillo" value={op} checked={datos.frenillo===op} onChange={hc} className="accent-pink-500"/>
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
        </div>
      </Card>

      {/* Descripción del Niño */}
      <Card icono="👦" titulo="Descripción del Niño" color="bg-purple-500">
        <div className="grid grid-cols-4 gap-2">
          {DESCRIPCION.map(item => {
            const activo = (datos.descripcionNino||[]).includes(item);
            return <button key={item} type="button" onClick={() => toggleArr("descripcionNino", item)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${activo?"bg-purple-500 text-white border-purple-500":"bg-white text-slate-600 border-slate-300 hover:border-purple-400"}`}>
              {item}
            </button>;
          })}
        </div>
      </Card>
    </div>
  );
}

// ── 2. Intereses / Comportamiento ────────────────────────────
function SeccionComportamiento({ datos = {}, onChange }) {
  const toggle = (campo, item) => {
    const s = datos[campo] || [];
    onChange({ ...datos, [campo]: s.includes(item) ? s.filter(x => x !== item) : [...s, item] });
  };

  return (
    <Card icono="🧩" titulo="Intereses / Comportamiento" color="bg-orange-500">
      <div className="space-y-3">

        <Bloque num="1">
          <label className="block text-sm text-slate-700 mb-1">¿Qué le gusta hacer en su tiempo libre?</label>
          <input type="text" name="tiempoLibre" value={datos.tiempoLibre||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        <Bloque num="2">
          <label className="block text-sm text-slate-700 mb-2">¿Prefiere estar solo o acompañado?</label>
          <div className="flex gap-4 mb-2">
            {["Solo","Acompañado","Ambos"].map(op=>(
              <label key={op} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="prefiereEstar" value={op} checked={datos.prefiereEstar===op} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})} className="accent-orange-500"/>
                <span className="text-sm text-slate-600">{op}</span>
              </label>
            ))}
          </div>
          <input type="text" name="prefiereEstarCuando" value={datos.prefiereEstarCuando||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="¿Cuándo?" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        <Bloque num="3">
          <label className="block text-sm text-slate-700 mb-1">¿Qué hace cuando está solo?</label>
          <input type="text" name="quéHaceSolo" value={datos.quéHaceSolo||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        <Bloque num="4">
          <label className="block text-sm text-slate-700 mb-1">¿Qué no le gusta hacer?</label>
          <input type="text" name="queNoLeGusta" value={datos.queNoLeGusta||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        {/* Preguntas 1-21 de conducta */}
        {[
          { num:"5", name:"tieneTemos", label:"¿Tiene temores?", conDetalle:"temoresCuales", detallePlaceholder:"¿Cuáles?" },
          { num:"6", name:"orinaEnCama", label:"¿Se orina en la cama?", esTexto:true },
          { num:"9", name:"gritaContinuamente", label:"¿Grita continuamente?", conDetalle:"gritaCuando", detallePlaceholder:"¿Cuándo?" },
          { num:"10", name:"muerdUnas", label:"¿Se muerde las uñas?", conDetalle:"muerdUnasCuando", detallePlaceholder:"¿Cuándo?" },
          { num:"12", name:"seGolpeaCabeza", label:"¿Se golpea la cabeza al estar molesto?" },
          { num:"13", name:"esImpulsivo", label:"¿Es impulsivo?" },
          { num:"14", name:"noCumpleTareas", label:"¿No cumple con sus tareas en la escuela?" },
        ].map(({ num, name, label, conDetalle, detallePlaceholder, esTexto }) => (
          <Bloque key={name} num={num}>
            {esTexto ? (
              <>
                <label className="block text-sm text-slate-700 mb-1">{label}</label>
                <input type="text" name={name} value={datos[name]||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
                  placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
              </>
            ) : (
              <>
                <RadioGroup name={name} label={label} datos={datos} onChange={onChange} />
                {conDetalle && <input type="text" name={conDetalle} value={datos[conDetalle]||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
                  placeholder={detallePlaceholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white mt-1" />}
              </>
            )}
          </Bloque>
        ))}

        <Bloque num="1">
          <RadioGroup name="dificultadHablar" label="¿Tiene dificultad para hablar?" datos={datos} onChange={onChange} />
          <input type="text" name="dificultadHablarCuando" value={datos.dificultadHablarCuando||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="¿Cuándo?" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white mt-1" />
        </Bloque>

        <Bloque num="2">
          <div className="grid grid-cols-2 gap-4">
            <RadioGroup name="dificultadEscuchar" label="¿Dificultad al escuchar?" datos={datos} onChange={onChange} />
            <RadioGroup name="poneAtencion" label="¿Le pone atención?" datos={datos} onChange={onChange} />
          </div>
          <input type="text" name="dificultadEscucharCuando" value={datos.dificultadEscucharCuando||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="¿Cuándo?" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white mt-1" />
        </Bloque>

        <Bloque num="3">
          <label className="block text-sm text-slate-700 mb-1">¿Cómo es la convivencia con su familia en general?</label>
          <input type="text" name="convivenciaFamilia" value={datos.convivenciaFamilia||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        <Bloque num="4">
          <label className="block text-sm text-slate-700 mb-1">¿Tiene más interés en objetos (Pantalla/Celular) que en personas o juguetes?</label>
          <input type="text" name="interesObjetos" value={datos.interesObjetos||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
        </Bloque>

        <Bloque num="7">
          <div className="flex flex-wrap gap-4 items-center">
            <RadioGroup name="tieneAmigos" label="¿Tiene amigos?" datos={datos} onChange={onChange} opciones={["Sí","No"]} />
            <input type="text" name="cuantosAmigos" value={datos.cuantosAmigos||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
              placeholder="¿Cuántos?" className="w-28 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
            <RadioGroup name="hablaDeEllos" label="¿Habla de ellos?" datos={datos} onChange={onChange} opciones={["Sí","No"]} />
          </div>
        </Bloque>

        <Bloque num="8">
          <div className="grid grid-cols-2 gap-4">
            <RadioGroup name="provocaPeleas" label="¿Provoca peleas?" datos={datos} onChange={onChange} />
            <RadioGroup name="intimida" label="¿Intimida a compañeros?" datos={datos} onChange={onChange} />
          </div>
        </Bloque>

        <Bloque num="11">
          <div className="grid grid-cols-2 gap-4">
            <RadioGroup name="tienePesadillas" label="¿Tiene pesadillas?" datos={datos} onChange={onChange} />
            <RadioGroup name="dificultadDormir" label="¿Dificultad para dormir?" datos={datos} onChange={onChange} />
          </div>
          <input type="text" name="pesadillasCuando" value={datos.pesadillasCuando||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="¿Cuándo?" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white mt-1" />
        </Bloque>

        <Bloque num="15">
          <div className="grid grid-cols-2 gap-4">
            <RadioGroup name="sigueReglasCasa" label="¿Sigue reglas en casa?" datos={datos} onChange={onChange} />
            <RadioGroup name="sigueReglasEscuela" label="¿Y en la escuela?" datos={datos} onChange={onChange} />
          </div>
        </Bloque>

        <Bloque num="16">
          <label className="block text-sm text-slate-700 mb-2">¿Hace amigos con facilidad?</label>
          <div className="flex flex-wrap gap-2">
            {["Comunicativo","Poco comunicativo","Participa en grupo","Tendencia a aislarse","Pasivo","Agresivo","Dependiente","Independiente"].map(op => {
              const activo = (datos.tipoSocial||[]).includes(op);
              return <button key={op} type="button" onClick={() => toggle("tipoSocial", op)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${activo?"bg-orange-500 text-white border-orange-500":"bg-white text-slate-600 border-slate-300 hover:border-orange-400"}`}>
                {op}
              </button>;
            })}
          </div>
        </Bloque>

        {[
          ["17","queLoHaceFeliz","¿Qué lo hace feliz?"],
          ["18","queLoEntristece","¿Qué lo entristece?"],
          ["20","disciplinaResponsable","¿Quién es responsable de su disciplina y qué castigos utilizan frecuentemente cuando existe un berrinche?"],
          ["22","estructurasComprende","¿Qué tipo de estructuras comprende su hijo: palabras, frases, oraciones?"],
          ["23","comprendeConsecuencias","¿Comprende consecuencias de sus acciones?"],
          ["24","comprendeGestos","¿Comprende los gestos asociados a la comunicación? (alegría, enojo, señalamiento, etc.)"],
          ["25","muyConsentido","¿Considera que está muy consentido?"],
          ["26","cambioReciente","¿Existe alguna situación o cambio reciente que pueda resultar de relevancia en el comportamiento del menor?"],
          ["27","comoDemuestraSentimientos","¿Cómo demuestra sus sentimientos o emociones?"],
          ["28","dinamicaFamiliar","Describa brevemente el contexto y dinámica familiar"],
        ].map(([num, name, label]) => (
          <Bloque key={name} num={num}>
            <label className="block text-sm text-slate-700 mb-1">{label}</label>
            <input type="text" name={name} value={datos[name]||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
              placeholder="Respuesta..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
          </Bloque>
        ))}

        <Bloque num="19">
          <RadioGroup name="tieneResponsabilidades" label="¿En casa cuenta con responsabilidades?" datos={datos} onChange={onChange} opciones={["Sí","No"]} />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <input type="text" name="responsabilidadesCuales" value={datos.responsabilidadesCuales||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
              placeholder="¿Cuáles?" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white" />
            <RadioGroup name="cumpleResponsabilidades" label="¿Las cumple?" datos={datos} onChange={onChange} opciones={["Sí","No"]} />
          </div>
        </Bloque>

        <Bloque num="21">
          <RadioGroup name="mejorConConsecuencia" label="¿Considera que si se emite una consecuencia a sus acciones hay una mejora?" datos={datos} onChange={onChange} opciones={["Sí","No"]} />
          <input type="text" name="mejorConConsecuenciaCuales" value={datos.mejorConConsecuenciaCuales||""} onChange={e=>onChange({...datos,[e.target.name]:e.target.value})}
            placeholder="¿Cuáles?" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white mt-1" />
        </Bloque>

      </div>
    </Card>
  );
}

// ── 3. Estado Clínico + Observaciones ────────────────────────
function SeccionEstadoObservaciones({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  return (
    <div className="space-y-6">
      <Card icono="🏥" titulo="Estado Clínico" color="bg-rose-500">
        <div className="space-y-3">
          {[
            ["diagnosticoPreexistente","1. ¿Existe algún diagnóstico preexistente o asociado?"],
            ["otrosEstudiosMedicos","2. ¿Se han realizado algún otro tipo de estudios médicos?"],
            ["tomaMedicamento","3. ¿Toma algún medicamento?"],
            ["dietaAlergia","4. ¿Tiene alguna dieta especial o alergia?"],
          ].map(([name, label]) => (
            <div key={name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
              <input type="text" name={name} value={datos[name]||""} onChange={hc} placeholder="Respuesta..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white" />
            </div>
          ))}
        </div>
      </Card>

      <Card icono="📝" titulo="Observaciones Adicionales" color="bg-slate-500">
        <textarea name="observacionesAdicionales" value={datos.observacionesAdicionales||""} onChange={hc}
          placeholder="Anota aquí cualquier observación adicional relevante..." rows={5}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition resize-none" />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL — EntrevistaPsicologica
// ══════════════════════════════════════════════════════════════
export default function EntrevistaPsicologica({ profesional, onVolver }) {
  const ESTADO = { datos: {}, comportamiento: {}, estadoClinico: {}, diagnostico: {} };
  const [datos, setDatos] = useState(ESTADO);
  const [expedienteId, setExpedienteId] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [listaExpedientes, setListaExpedientes] = useState([]);
  const [vistaLista, setVistaLista] = useState(false);

  const actualizar = (sec) => (val) => setDatos(prev => ({ ...prev, [sec]: val }));
  const mostrarMensaje = (tipo, texto) => { setMensaje({ tipo, texto }); setTimeout(() => setMensaje(null), 3000); };

  useEffect(() => { cargarLista(); }, []);

  const cargarLista = async () => {
    const { data, error } = await supabase.from("expedientes_psicologica").select("id, created_at, datos").order("updated_at", { ascending: false });
    if (!error) setListaExpedientes(data || []);
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      const payload = { profesional, ...datos, updated_at: new Date().toISOString() };
      if (expedienteId) {
        const { error } = await supabase.from("expedientes_psicologica").update(payload).eq("id", expedienteId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("expedientes_psicologica").insert(payload).select().single();
        if (error) throw error;
        setExpedienteId(data.id);
      }
      mostrarMensaje("exito", "✅ Expediente guardado");
      cargarLista();
    } catch (err) { mostrarMensaje("error", "❌ " + err.message); }
    finally { setGuardando(false); }
  };

  const cargarExpediente = async (id) => {
    const { data, error } = await supabase.from("expedientes_psicologica").select("*").eq("id", id).single();
    if (error) { mostrarMensaje("error", "❌ Error al cargar"); return; }
    setDatos({ datos: data.datos||{}, comportamiento: data.comportamiento||{}, estadoClinico: data.estado_clinico||{}, diagnostico: data.diagnostico||{} });
    setExpedienteId(data.id);
    setVistaLista(false);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este expediente?")) return;
    const { error } = await supabase.from("expedientes_psicologica").delete().eq("id", id);
    if (!error) { mostrarMensaje("exito", "🗑️ Eliminado"); cargarLista(); if (expedienteId === id) { setDatos(ESTADO); setExpedienteId(null); } }
  };

  const reiniciar = () => { setDatos(ESTADO); setExpedienteId(null); setVistaLista(false); };

  const generarPDF = async (firmaBase64) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const PW=210, M=14, C=PW-M*2;
    let y=0;
    const AMARILLO=[255,243,194],AZUL=[194,220,255],ROSA=[255,209,220],VERDE=[204,235,210],LILA=[220,210,255];
    const HEADER=[107,91,158],NEGRO=[40,40,40],GRIS=[100,110,125],BLANCO=[255,255,255],GLINEA=[220,225,232];
    const col4=C/4, mitad=C/2-2;
    const checkPage=(e=20)=>{if(y+e>280){doc.addPage();y=15;}};
    const campo=(label,valor,x,yPos,ancho)=>{
      if(!valor)return 0;
      doc.setFontSize(7);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text(label.toUpperCase(),x,yPos);
      doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);
      const lines=doc.splitTextToSize(String(valor),ancho-2);doc.text(lines,x,yPos+3.5);
      return lines.length*3.5+5.5;
    };
    const secH=(titulo,color)=>{checkPage(14);doc.setFillColor(...color);doc.roundedRect(M,y,C,8,2,2,"F");doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text(titulo.toUpperCase(),M+4,y+5.5);y+=11;};
    const { datos: d, comportamiento: c, estadoClinico: e, diagnostico } = datos;

    // Encabezado
    doc.setFillColor(...HEADER);doc.rect(0,0,PW,40,"F");
    if(profesional.logo){doc.addImage(profesional.logo,"PNG",M+1,8,22,22);}
    else{doc.setFillColor(100,130,180);doc.circle(M+12,20,10,"F");}
    doc.setFontSize(14);doc.setFont("helvetica","bold");doc.setTextColor(...BLANCO);doc.text(profesional.nombre||"",M+27,14);
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(190,210,240);
    if(profesional.especialidad)doc.text(profesional.especialidad,M+27,20);
    if(profesional.cedula)doc.text(`Cédula: ${profesional.cedula}`,M+27,25);
    if(profesional.institucion)doc.text(profesional.institucion,M+27,30);
    if(profesional.contacto||profesional.direccion)doc.text(`${profesional.direccion||""}  ${profesional.contacto||""}`.trim(),M+27,35);
    doc.setFillColor(247,168,192);doc.rect(0,40,PW,3,"F");
    y=49;
    doc.setFillColor(...LILA);doc.roundedRect(M,y,C,10,2,2,"F");
    doc.setFontSize(11);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text("ENTREVISTA PSICOLÓGICA",PW/2,y+7,{align:"center"});
    doc.setFontSize(7.5);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text(`Fecha: ${new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}`,PW-M,y+7,{align:"right"});
    y+=15;

    // 1. Datos
    secH("1. Datos del Paciente",AZUL);
    y+=Math.max(campo("Nombre",d.nombrePaciente,M,y,col4*2),campo("Edad",d.edad,M+col4*2,y,col4/2),campo("Género",d.genero,M+col4*2.5,y,col4/2),campo("F. Nacimiento",d.fechaNacimiento,M+col4*3,y,col4));
    y+=Math.max(campo("Grado",d.gradoEstudios,M,y,col4),campo("Domicilio",d.domicilio,M+col4,y,col4*3));
    if(d.diagnosticoPrevio)y+=campo("Diagnóstico",d.diagnosticoPrevio,M,y,C);
    checkPage(12);doc.setFontSize(7.5);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text("MAMÁ",M,y);doc.text("PAPÁ",M+mitad+4,y);y+=4;
    y+=Math.max(campo("Nombre",d.nombreMama,M,y,mitad/2),campo("Edad",d.edadMama,M+mitad/2,y,mitad/4),campo("Celular",d.celularMama,M+mitad*0.75,y,mitad/4),campo("Nombre",d.nombrePapa,M+mitad+4,y,mitad/2),campo("Edad",d.edadPapa,M+mitad+4+mitad/2,y,mitad/4),campo("Celular",d.celularPapa,M+mitad+4+mitad*0.75,y,mitad/4));
    y+=Math.max(campo("Ocup. Mamá",d.ocupacionMama,M,y,mitad),campo("Ocup. Papá",d.ocupacionPapa,M+mitad+4,y,mitad));
    if(d.tieneHermanos)y+=campo("Hermanos",`${d.tieneHermanos}${d.cantidadHermanos?" — "+d.cantidadHermanos:""}`,M,y,C);
    // Personas en casa
    if(d.personasCasa?.some(p=>p.nombre)){
      checkPage(12);doc.setFontSize(7.5);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text("PERSONAS EN CASA",M,y);y+=4;
      d.personasCasa.filter(p=>p.nombre).forEach(p=>{y+=Math.max(campo("Nombre",p.nombre,M,y,mitad),campo("Parentesco",p.parentesco,M+mitad+4,y,mitad));});
    }
    if(d.motivoConsulta)y+=campo("Motivo",d.motivoConsulta,M,y,C);
    if(d.referidoPor)y+=campo("Referido Por",d.referidoPor,M,y,C);
    y+=2;

    // 2. Perinatal
    checkPage(20);secH("2. Periodo Perinatal",ROSA);
    y+=Math.max(campo("Parto",d.tipoParto,M,y,col4),campo("Dificultades",d.dificultadesParto,M+col4,y,col4),campo("Complicaciones",d.complicaciones?.join(", "),M+col4*2,y,col4*2));
    y+=Math.max(campo("Peso",d.pesoNacer,M,y,col4),campo("Talla",d.tallaNacer,M+col4,y,col4),campo("Apgar",d.apgar,M+col4*2,y,col4),campo("Lactancia",d.lactanciaMeses,M+col4*3,y,col4));
    y+=2;

    // 3. Descripción
    checkPage(12);secH("3. Descripción del Niño",AMARILLO);
    if(d.descripcionNino?.length>0)y+=campo("Características",d.descripcionNino.join("  ·  "),M,y,C);
    y+=2;

    // 4. Intereses / Comportamiento
    checkPage(20);secH("4. Intereses / Comportamiento",LILA);
    const compItems=[
      ["Tiempo libre",c.tiempoLibre],["Prefiere estar",c.prefiereEstar],["¿Cuándo?",c.prefiereEstarCuando],
      ["¿Qué hace solo?",c.quéHaceSolo],["¿Qué no le gusta?",c.queNoLeGusta],
      ["Dificultad hablar",c.dificultadHablar],["¿Cuándo?",c.dificultadHablarCuando],
      ["Dificultad escuchar",c.dificultadEscuchar],["Pone atención",c.poneAtencion],
      ["Convivencia familiar",c.convivenciaFamilia],["Interés objetos",c.interesObjetos],
      ["Temores",c.tieneTemos],["¿Cuáles?",c.temoresCuales],["Se orina en cama",c.orinaEnCama],
      ["Tiene amigos",c.tieneAmigos],["¿Cuántos?",c.cuantosAmigos],["Habla de ellos",c.hablaDeEllos],
      ["Provoca peleas",c.provocaPeleas],["Intimida",c.intimida],
      ["Grita continuamente",c.gritaContinuamente],["¿Cuándo?",c.gritaCuando],
      ["Se muerde uñas",c.muerdUnas],["¿Cuándo?",c.muerdUnasCuando],
      ["Pesadillas",c.tienePesadillas],["Dificultad dormir",c.dificultadDormir],["¿Cuándo?",c.pesadillasCuando],
      ["Se golpea cabeza",c.seGolpeaCabeza],["Es impulsivo",c.esImpulsivo],
      ["No cumple tareas",c.noCumpleTareas],["Sigue reglas casa",c.sigueReglasCasa],["Sigue reglas escuela",c.sigueReglasEscuela],
      ["Tipo social",c.tipoSocial?.join(" · ")],["¿Qué lo hace feliz?",c.queLoHaceFeliz],["¿Qué lo entristece?",c.queLoEntristece],
      ["Responsabilidades",c.tieneResponsabilidades],["¿Cuáles?",c.responsabilidadesCuales],
      ["Disciplina/Castigos",c.disciplinaResponsable],["Mejora con consecuencia",c.mejorConConsecuencia],["¿Cuáles?",c.mejorConConsecuenciaCuales],
      ["Estructuras comprende",c.estructurasComprende],["Comprende consecuencias",c.comprendeConsecuencias],
      ["Comprende gestos",c.comprendeGestos],["Muy consentido",c.muyConsentido],
      ["Cambio reciente",c.cambioReciente],["Cómo demuestra sentimientos",c.comoDemuestraSentimientos],
      ["Dinámica familiar",c.dinamicaFamiliar],
    ].filter(([,v])=>v);
    for(let i=0;i<compItems.length;i+=2){checkPage(8);let mx=0;compItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;

    // 5. Estado Clínico
    checkPage(20);secH("5. Estado Clínico",ROSA);
    [["Diagnóstico preexistente",e.diagnosticoPreexistente],["Otros estudios",e.otrosEstudiosMedicos],["Medicamento",e.tomaMedicamento],["Dieta/Alergia",e.dietaAlergia]].filter(([,v])=>v).forEach(([l,v],i,arr)=>{
      if(i%2===0){checkPage(8);let mx=0;[[l,v],arr[i+1]||["",""]].forEach(([ll,vv],j)=>{if(vv)mx=Math.max(mx,campo(ll,vv,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    });
    y+=2;

    // 6. Observaciones
    if(e.observacionesAdicionales){checkPage(15);secH("6. Observaciones Adicionales",VERDE);y+=campo("Observaciones",e.observacionesAdicionales,M,y,C)+2;}

    // 7. Diagnóstico
    checkPage(20);secH("7. Diagnóstico Final",AMARILLO);
    if(diagnostico.diagnostico){const lines=doc.splitTextToSize(diagnostico.diagnostico,C-6);const ah=lines.length*4+6;doc.setFillColor(255,252,230);doc.roundedRect(M,y,C,ah,2,2,"F");doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);doc.text(lines,M+3,y+5);y+=ah+6;}

    // Firma
    checkPage(40);doc.setDrawColor(...GLINEA);doc.line(M,y,PW-M,y);y+=5;
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text("Firma del Psicólogo",PW/2,y,{align:"center"});y+=4;
    if(firmaBase64){doc.addImage(firmaBase64,"PNG",(PW-70)/2,y,70,20);y+=24;}
    else{doc.setDrawColor(...GLINEA);doc.line((PW-70)/2,y+18,(PW-70)/2+70,y+18);y+=22;}
    doc.setFontSize(8.5);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text(profesional.nombre||"",PW/2,y,{align:"center"});
    if(profesional.cedula){doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text(`Cédula: ${profesional.cedula}`,PW/2,y+4,{align:"center"});}
    const tp=doc.getNumberOfPages();for(let i=1;i<=tp;i++){doc.setPage(i);doc.setFillColor(...HEADER);doc.rect(0,290,PW,8,"F");doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(...BLANCO);doc.text(`Entrevista Psicológica  ·  Página ${i} de ${tp}`,PW/2,295,{align:"center"});}
    doc.save(`Psicologica_${(d.nombrePaciente||"Paciente").replace(/ /g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  if (vistaLista) return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-700">📋 Expedientes — Psicológica</h1>
          <button onClick={() => setVistaLista(false)} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">← Volver</button>
        </div>
        {listaExpedientes.length === 0
          ? <div className="bg-white rounded-2xl p-12 text-center text-slate-400 shadow-md">No hay expedientes guardados aún.</div>
          : <div className="space-y-3">{listaExpedientes.map(exp=>(
              <div key={exp.id} className="bg-white rounded-xl shadow-md p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">{exp.datos?.nombrePaciente||"Sin nombre"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(exp.created_at).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>cargarExpediente(exp.id)} className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-teal-200">Abrir</button>
                  <button onClick={()=>eliminar(exp.id)} className="bg-red-50 hover:bg-red-100 text-red-500 text-sm font-semibold px-3 py-1.5 rounded-lg transition border border-red-200">Eliminar</button>
                </div>
              </div>
            ))}</div>
        }
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onVolver} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-2 rounded-lg transition border border-slate-200">← Volver</button>
          <h2 className="text-xl font-bold text-slate-700">🧠 Entrevista Psicológica</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>{cargarLista();setVistaLista(true);}} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">
            📋 Expedientes ({listaExpedientes.length})
          </button>
          <button onClick={reiniciar} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2 rounded-lg transition border border-slate-200">＋ Nuevo</button>
          <button onClick={guardar} disabled={guardando} className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            {guardando?"Guardando...":expedienteId?"💾 Actualizar":"💾 Guardar"}
          </button>
        </div>
      </div>

      {mensaje && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${mensaje.tipo==="exito"?"bg-green-50 text-green-700 border border-green-200":"bg-red-50 text-red-700 border border-red-200"}`}>
          {mensaje.texto}
        </div>
      )}
      {expedienteId && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs text-teal-600 font-medium">
          ✏️ Editando: <strong>{datos.datos?.nombrePaciente||"paciente sin nombre"}</strong>
        </div>
      )}

      <SeccionDatos datos={datos.datos} onChange={actualizar("datos")} />
      <SeccionComportamiento datos={datos.comportamiento} onChange={actualizar("comportamiento")} />
      <SeccionEstadoObservaciones datos={datos.estadoClinico} onChange={actualizar("estadoClinico")} />
      <SeccionDiagnostico datos={datos.diagnostico} onChange={actualizar("diagnostico")} onGenerarPDF={generarPDF} />
    </div>
  );
}
