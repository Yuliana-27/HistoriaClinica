import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SeccionDiagnostico from "./components/SeccionDiagnostico";

// ============================================================
// ENTREVISTA — Terapia de Lenguaje
// ============================================================

// ── Helpers reutilizables ────────────────────────────────────
function RadioSiNo({ name, label, datos, onChange, opciones = ["Sí", "No"] }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-slate-700">{label}</span>
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

function Campo({ name, label, datos, onChange, placeholder = "Respuesta...", rows }) {
  const handleChange = e => onChange({ ...datos, [e.target.name]: e.target.value });
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>}
      {rows ? (
        <textarea name={name} value={datos[name] || ""} onChange={handleChange} placeholder={placeholder} rows={rows}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none bg-white" />
      ) : (
        <input type="text" name={name} value={datos[name] || ""} onChange={handleChange} placeholder={placeholder}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition bg-white" />
      )}
    </div>
  );
}

function Bloque({ titulo, color = "bg-slate-50", children }) {
  return (
    <div className={`${color} rounded-xl p-4 border border-slate-100 space-y-3`}>
      {titulo && <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{titulo}</p>}
      {children}
    </div>
  );
}

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

// ── 1. Datos del Paciente ────────────────────────────────────
function SeccionDatos({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const COMPLICACIONES = ["Anoxia","Cordón Umbilical","Placenta","Malformación","Ictericia","Plecamsia","Infección vías urinarias"];
  const DESCRIPCION = ["Nervioso","Distraído","Sensible","Amable","Agresivo","Tímido","Amistoso","Mutismo","Renuente al contestar","Tartamudez","Verbalización Excesiva","Otros"];
  const toggleArr = (campo, item) => {
    const s = datos[campo] || [];
    onChange({ ...datos, [campo]: s.includes(item) ? s.filter(x => x !== item) : [...s, item] });
  };

  return (
    <div className="space-y-6">
      <Card icono="👤" titulo="Datos del Paciente" color="bg-teal-600">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nombre del niño/a</label>
              <input type="text" name="nombrePaciente" value={datos.nombrePaciente||""} onChange={hc} placeholder="Nombre completo"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Edad</label>
              <input type="number" name="edad" value={datos.edad||""} onChange={hc} min={0}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Género</label>
              <select name="genero" value={datos.genero||""} onChange={hc}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition">
                <option value="">Seleccione</option>
                <option>Femenino</option><option>Masculino</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento||""} onChange={hc}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Grado de Estudios</label>
              <input type="text" name="gradoEstudios" value={datos.gradoEstudios||""} onChange={hc} placeholder="Ej: 3° Primaria"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Domicilio Actual</label>
            <input type="text" name="domicilio" value={datos.domicilio||""} onChange={hc} placeholder="Calle, colonia, ciudad"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Diagnóstico</label>
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
          {/* Hermanos + Motivo + Referido */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 font-medium">¿Tiene hermanos?</span>
              {["Si","No"].map(op => (
                <label key={op} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="tieneHermanos" value={op} checked={datos.tieneHermanos===op} onChange={hc} className="accent-teal-500" />
                  <span className="text-sm text-slate-600">{op}</span>
                </label>
              ))}
              {datos.tieneHermanos==="Si" && (
                <input type="number" name="cantidadHermanos" value={datos.cantidadHermanos||""} onChange={hc} placeholder="¿Cuántos?" min={0} max={20}
                  className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Motivo de Consulta</label>
              <textarea name="motivoConsulta" value={datos.motivoConsulta||""} onChange={hc} rows={3} placeholder="Motivo principal..."
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
              <select name="tipoParto" value={datos.tipoParto||""} onChange={hc} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition">
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
            {[["pesoNacer","Peso al Nacer","kg"],["tallaNacer","Talla al Nacer","cm"],["apgar","Apgar","pts"],["lactanciaMeses","Lactancia (m)","meses"]].map(([n,l,p])=>(
              <div key={n}>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{l}</label>
                <input type="text" name={n} value={datos[n]||""} onChange={hc} placeholder={p}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 border-t border-slate-100 pt-3">
            {[["biberonMeses","Biberón (m)"],["edadDormir","Dificultad dormir"],["edadSedestacion","Sedestación"],["edadBipedestacion","Bipedestación"],["edadGateo","Gateo"],["edadMarcha","Marcha"],["edadSubirBajarEscaleras","Subir escaleras"],["controlEsfinteres","Ctrl esfínteres"]].map(([n,l])=>(
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

// ── 2. Antecedentes Médicos ─────────────────────────────────
function SeccionAntecedentes({ datos = {}, onChange }) {
  const preguntas = [
    ["diagnosticoPreexistente","¿Existe algún diagnóstico pre-existente o asociado?"],
    ["estudiosAudicion","¿Se han realizado estudios de audición? Especifique:"],
    ["otrosEstudios","¿Se han realizado algún otro tipo de estudios médicos?"],
    ["tomaMedicamento","¿Toma algún medicamento?"],
    ["asisteTerapia","¿Asiste o ha asistido a alguna terapia?"],
    ["antecedenteFamiliar","¿Existe algún antecedente de discapacidad o retraso de lenguaje en la familia?"],
  ];
  return (
    <Card icono="🏥" titulo="Antecedentes Médicos" color="bg-rose-500">
      <div className="space-y-3">
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} />
          </Bloque>
        ))}
      </div>
    </Card>
  );
}

// ── 3. Desarrollo ───────────────────────────────────────────
function SeccionDesarrollo({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const preguntas = [
    ["edadBalbuceo","¿A qué edad comenzó a balbucear?"],
    ["primeraPalabra","¿Su primera palabra?"],
    ["pronunciaMasDospalabras","¿Puede pronunciar más de dos palabras?"],
    ["tipoSonidos","¿Recuerda qué tipo de sonidos realizaba para comunicarse antes de decir palabras?"],
    ["dificilCalmar","¿Era difícil de calmar cuando lloraba?"],
    ["adivinanNecesidades","¿De más pequeño, o incluso ahora considera que se le adivina lo que necesita, o se le exige hablar?"],
    ["edadSeñalar","¿A qué edad comenzó a señalar? En caso de no hacerlo, ¿cómo expresa lo que necesita?"],
    ["actitudSeñalarEnExceso","¿En caso de hacerlo en exceso, cuál es su actitud o respuesta ante ello?"],
    ["perdidaLenguaje","¿En algún momento ocurrió una pérdida o modificación en el comportamiento lingüístico? ¿Comenzó a hablar en otro idioma?"],
    ["adquisicionPalabrasNuevas","¿Cómo describiría la adquisición de palabras nuevas? Rápida, estancada, solo las aprenda si le pido que las repita..."],
    ["estancamientoEvento","¿Si observó algún tipo de estancamiento, existe algún evento o circunstancia al que pueda asociarlo?"],
    ["comoDescribeHijo","¿Cómo describiría a su hijo: quieto, callado, introvertido, activo, etc.?"],
    ["muyConsentido","¿Considera que está muy consentido?"],
    ["dinamicaFamiliar","Describa brevemente el contexto y dinámica familiar"],
  ];
  return (
    <Card icono="📈" titulo="Desarrollo" color="bg-blue-500">
      <div className="space-y-3">
        <Bloque>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">¿Reconoce ABC?</label>
              <div className="flex gap-3">
                {["Sí","No"].map(op=><label key={op} className="flex items-center gap-1 cursor-pointer"><input type="radio" name="reconoceABC" value={op} checked={datos.reconoceABC===op} onChange={hc} className="accent-blue-500"/><span className="text-sm">{op}</span></label>)}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">¿Reconoce Colores?</label>
              <div className="flex gap-3">
                {["Sí","No"].map(op=><label key={op} className="flex items-center gap-1 cursor-pointer"><input type="radio" name="reconoceColores" value={op} checked={datos.reconoceColores===op} onChange={hc} className="accent-blue-500"/><span className="text-sm">{op}</span></label>)}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">¿Reconoce Formas?</label>
              <div className="flex gap-3">
                {["Sí","No"].map(op=><label key={op} className="flex items-center gap-1 cursor-pointer"><input type="radio" name="reconoceFormas" value={op} checked={datos.reconoceFormas===op} onChange={hc} className="accent-blue-500"/><span className="text-sm">{op}</span></label>)}
              </div>
            </div>
          </div>
        </Bloque>
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} rows={name==="dinamicaFamiliar"?3:undefined} />
          </Bloque>
        ))}
      </div>
    </Card>
  );
}

// ── 4. Alimentación ─────────────────────────────────────────
function SeccionAlimentacion({ datos = {}, onChange }) {
  const preguntas = [
    ["dietaAlergia","¿Tiene alguna dieta especial o alergia?"],
    ["problemasDeglución","¿Presenta o presentó problemas de deglución y/o masticación?"],
    ["esSelectivo","¿Es selectivo para comer?"],
    ["comoComeCubiertos","¿Cómo come con cubiertos, se limpia con servilleta, le tienen que partir pedazos pequeños, etc.?"],
  ];
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  return (
    <Card icono="🍽️" titulo="Alimentación" color="bg-green-600">
      <div className="space-y-3">
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} />
          </Bloque>
        ))}
        <Bloque>
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Hábitos al comer</p>
          <div className="grid grid-cols-3 gap-4">
            {[["mastica","¿Mastica?"],["haceRuidos","¿Hace ruidos al comer?"],["bocaCerrada","¿Come con boca cerrada o abierta?"]].map(([name,label])=>(
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">{label}</label>
                <div className="flex gap-3">
                  {["Sí","No"].map(op=><label key={op} className="flex items-center gap-1 cursor-pointer"><input type="radio" name={name} value={op} checked={datos[name]===op} onChange={hc} className="accent-green-500"/><span className="text-sm">{op}</span></label>)}
                </div>
              </div>
            ))}
          </div>
        </Bloque>
      </div>
    </Card>
  );
}

// ── 5. Comprensión ──────────────────────────────────────────
function SeccionComprension({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const preguntas = [
    ["estructurasComprende","¿Qué tipo de estructuras comprende su hijo: palabras, frases, oraciones?"],
    ["sigueInstrucciones","¿Sigue instrucciones? ¿De uno, dos o tres elementos? ¿Con apoyo del contexto o solo con la instrucción?"],
    ["comprensionLectura","¿Qué nivel de comprensión muestra durante la lectura de un cuento?"],
    ["comprendeConsecuencias","¿Comprende consecuencias de sus acciones?"],
    ["comprendeGestos","¿Comprende los gestos asociados a la comunicación? (alegría, enojo, señalamiento, etc.)"],
    ["comprendeSituaciones","¿Considera que su hijo comprende las situaciones que suceden a su alrededor? Describa:"],
    ["comprendePreguntas","¿Comprende preguntas simples? ¿Las responde?"],
    ["comprensionVariaPersona","¿Su comprensión varía dependiendo de la persona que le comunica?"],
    ["soloSituacionesConocidas","¿Percibe que comprende únicamente situaciones o palabras conocidas?"],
    ["tiposEmociones","¿Qué tipo de emociones considera que comprende?"],
  ];
  return (
    <Card icono="🧠" titulo="Comprensión" color="bg-indigo-500">
      <div className="space-y-3">
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} />
          </Bloque>
        ))}
      </div>
    </Card>
  );
}

// ── 6. Expresión ────────────────────────────────────────────
function SeccionExpresion({ datos = {}, onChange }) {
  const preguntas = [
    ["formatoComunicacion","¿Cuál es el formato preferido de comunicación de su hijo? Señas, gritos, llanto, palabras, tarjetas, frases, oraciones"],
    ["quienComprende","¿Quién comprende la comunicación de su hijo? Solo padres, quienes lo conocen, todos, etc."],
    ["claridad","¿Qué tan bien comprende lo que dice su hijo? Elabore a nivel de lenguaje y claridad del habla"],
    ["comunicaNecesidades","¿Logra comunicar sus necesidades básicas? ¿Cómo?"],
    ["comunicaAcontecimiento","¿Logra expresar un acontecimiento del que no tienen contexto y darlo a entender con claridad?"],
    ["expresionesBasicasElaboradas","¿Sus emociones o expresiones son muy básicas o por el contrario demasiado elaboradas?"],
    ["dificultadOtrosNinos","¿Su hijo tiene dificultad para que otros niños lo comprendan?"],
    ["nivelLenguajeInteraccion","¿Su nivel de lenguaje le dificulta la interacción o el juego con otros niños?"],
    ["reaccionNoEntendido","¿Si su hijo tiene problemas para hablar con claridad, cómo reacciona cuando no le entienden?"],
    ["reaccionRepetir","¿Cómo reacciona cuando le piden que repita lo que dijo?"],
    ["produceMejorAlRepetir","¿Cuándo repite, lo produce mejor o lo dice igual?"],
    ["inconstanciaPalabras","¿Cuándo dice mal las palabras, las dice siempre de la misma forma o es inconstante?"],
    ["queHaHecho","¿Qué ha hecho o cómo ha tratado de ayudarlo para expresarse mejor? ¿Cómo le ha funcionado?"],
    ["comoDemuestraSentimientos","¿Cómo demuestra sus sentimientos o emociones?"],
  ];
  return (
    <Card icono="💬" titulo="Expresión" color="bg-pink-600">
      <div className="space-y-3">
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} />
          </Bloque>
        ))}
      </div>
    </Card>
  );
}

// ── 7. Interacción y Juego ──────────────────────────────────
function SeccionInteraccion({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const preguntas = [
    ["leGustaJugar","Describa qué le gusta a jugar a su hijo:"],
    ["actividadesSolo","¿Cuáles son las actividades que más disfruta realizar solo?"],
    ["actividadesConOtros","¿Qué tipo de actividades busca hacer con: padres, hermanos, otras personas?"],
    ["dificultadInteractuar","¿Presenta dificultad para interactuar con otras personas?"],
    ["comportamientoAtipico","¿Presenta algún comportamiento atípico que llame su atención? Describa"],
    ["juegaObjetosPeculiares","¿Le gusta jugar con objetos peculiares y por el contrario le llaman poco la atención los juguetes?"],
  ];
  const siNoItems = [
    ["prefiereJugarSolo","¿Prefiere jugar solo?"],
    ["puedenJuegosMesa","¿Pueden jugar juegos de mesa?"],
    ["sigueReglas","¿Sigue reglas?"],
    ["aceptaPerder","¿Acepta perder?"],
    ["leGustaCompetir","¿Le gusta competir?"],
  ];
  return (
    <Card icono="🎮" titulo="Interacción y Juego" color="bg-orange-500">
      <div className="space-y-3">
        {preguntas.map(([name, label]) => (
          <Bloque key={name}>
            <Campo name={name} label={label} datos={datos} onChange={onChange} />
          </Bloque>
        ))}
        <Bloque>
          <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Juego social</p>
          <div className="grid grid-cols-2 gap-3">
            {siNoItems.map(([name, label]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="text-sm text-slate-700">{label}</span>
                <div className="flex gap-2">
                  {["Sí","No"].map(op=><label key={op} className="flex items-center gap-1 cursor-pointer"><input type="radio" name={name} value={op} checked={datos[name]===op} onChange={hc} className="accent-orange-500"/><span className="text-sm">{op}</span></label>)}
                </div>
              </div>
            ))}
          </div>
        </Bloque>
      </div>
    </Card>
  );
}

// ── 8. Revisión Frenillo Lingual ────────────────────────────
function SeccionFrenillo({ datos = {}, onChange }) {
  const hc = e => onChange({ ...datos, [e.target.name]: e.target.value });
  const preguntas = [
    { name: "formaPuntaLengua", label: "¿Qué forma tiene la punta de la lengua?" },
    { name: "dondeSefijaEncias", label: "¿Dónde se fija a la encía?" },
    { name: "cuantoSelevanta", label: "¿Cuánto se levanta (con la boca abierta)?" },
    { name: "cuantoSale", label: "¿Cuánto sale de la boca?" },
  ];
  return (
    <Card icono="👅" titulo="Revisión de Frenillo Lingual" color="bg-red-500">
      <p className="text-xs text-slate-400 mb-4">Califica cada ítem con 0, 1 o 2 puntos según la observación clínica.</p>
      <div className="space-y-3">
        {preguntas.map(({ name, label }) => (
          <div key={name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                {["0","1","2"].map(v => (
                  <label key={v} className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name={name} value={v} checked={datos[name]===v} onChange={hc} className="accent-red-500"/>
                    <span className="text-sm font-medium text-slate-600">{v} pts</span>
                  </label>
                ))}
              </div>
              <span className="text-xs text-slate-400 ml-2">
                {datos[name] ? `Puntos: ${datos[name]}` : "Sin calificar"}
              </span>
            </div>
          </div>
        ))}
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-sm font-semibold text-red-700">
            Total: {["formaPuntaLengua","dondeSefijaEncias","cuantoSelevanta","cuantoSale"].reduce((s, k) => s + (parseInt(datos[k]) || 0), 0)} / 8 puntos
          </p>
        </div>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL — EntrevistaLenguaje
// ══════════════════════════════════════════════════════════════
export default function EntrevistaLenguaje({ profesional, onVolver }) {
  const ESTADO = { datos: {}, antecedentes: {}, desarrollo: {}, alimentacion: {}, comprension: {}, expresion: {}, interaccion: {}, frenillo: {}, diagnostico: {} };
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
    const { data, error } = await supabase.from("expedientes_lenguaje").select("id, created_at, datos").order("updated_at", { ascending: false });
    if (!error) setListaExpedientes(data || []);
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      const payload = { profesional, ...datos, updated_at: new Date().toISOString() };
      if (expedienteId) {
        const { error } = await supabase.from("expedientes_lenguaje").update(payload).eq("id", expedienteId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("expedientes_lenguaje").insert(payload).select().single();
        if (error) throw error;
        setExpedienteId(data.id);
      }
      mostrarMensaje("exito", "✅ Expediente guardado");
      cargarLista();
    } catch (err) { mostrarMensaje("error", "❌ " + err.message); }
    finally { setGuardando(false); }
  };

  const cargarExpediente = async (id) => {
    const { data, error } = await supabase.from("expedientes_lenguaje").select("*").eq("id", id).single();
    if (error) { mostrarMensaje("error", "❌ Error al cargar"); return; }
    setDatos({ datos: data.datos||{}, antecedentes: data.antecedentes||{}, desarrollo: data.desarrollo||{}, alimentacion: data.alimentacion||{}, comprension: data.comprension||{}, expresion: data.expresion||{}, interaccion: data.interaccion||{}, frenillo: data.frenillo||{}, diagnostico: data.diagnostico||{} });
    setExpedienteId(data.id);
    setVistaLista(false);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este expediente?")) return;
    const { error } = await supabase.from("expedientes_lenguaje").delete().eq("id", id);
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
    const col4=C/4, col3=C/3, mitad=C/2-2;
    const checkPage=(e=20)=>{if(y+e>280){doc.addPage();y=15;}};
    const campo=(label,valor,x,yPos,ancho)=>{
      if(!valor)return 0;
      doc.setFontSize(7);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text(label.toUpperCase(),x,yPos);
      doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);
      const lines=doc.splitTextToSize(String(valor),ancho-2);doc.text(lines,x,yPos+3.5);
      return lines.length*3.5+5.5;
    };
    const secH=(titulo,color)=>{checkPage(14);doc.setFillColor(...color);doc.roundedRect(M,y,C,8,2,2,"F");doc.setFontSize(9);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text(titulo.toUpperCase(),M+4,y+5.5);y+=11;};
    const { datos: d, antecedentes, desarrollo, alimentacion, comprension, expresion, interaccion, frenillo, diagnostico } = datos;
    // Encabezado
    doc.setFillColor(...HEADER);doc.rect(0,0,PW,40,"F");
    if(profesional.logo){doc.addImage(profesional.logo,"PNG",M+1,8,22,22);}
    else{doc.setFillColor(100,130,180);doc.circle(M+12,20,10,"F");}
    doc.setFontSize(14);doc.setFont("helvetica","bold");doc.setTextColor(...BLANCO);doc.text(profesional.nombre||"Nombre del Terapeuta",M+27,14);
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(190,210,240);
    if(profesional.especialidad)doc.text(profesional.especialidad,M+27,20);
    if(profesional.cedula)doc.text(`Cédula: ${profesional.cedula}`,M+27,25);
    if(profesional.institucion)doc.text(profesional.institucion,M+27,30);
    if(profesional.contacto||profesional.direccion)doc.text(`${profesional.direccion||""}  ${profesional.contacto||""}`.trim(),M+27,35);
    doc.setFillColor(247,168,192);doc.rect(0,40,PW,3,"F");
    y=49;
    doc.setFillColor(...LILA);doc.roundedRect(M,y,C,10,2,2,"F");
    doc.setFontSize(11);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text("ENTREVISTA TERAPIA DE LENGUAJE",PW/2,y+7,{align:"center"});
    doc.setFontSize(7.5);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text(`Fecha: ${new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}`,PW-M,y+7,{align:"right"});
    y+=15;
    // 1. Datos
    secH("1. Datos del Paciente",AZUL);
    y+=Math.max(campo("Nombre",d.nombrePaciente,M,y,col4*2),campo("Edad",d.edad,M+col4*2,y,col4/2),campo("Género",d.genero,M+col4*2.5,y,col4/2),campo("F. Nacimiento",d.fechaNacimiento,M+col4*3,y,col4));
    y+=Math.max(campo("Grado",d.gradoEstudios,M,y,col4),campo("Domicilio",d.domicilio,M+col4,y,col4*3));
    if(d.diagnosticoPrevio)y+=campo("Diagnóstico Previo",d.diagnosticoPrevio,M,y,C);
    checkPage(12);doc.setFontSize(7.5);doc.setFont("helvetica","bold");doc.setTextColor(...GRIS);doc.text("MAMÁ",M,y);doc.text("PAPÁ",M+mitad+4,y);y+=4;
    y+=Math.max(campo("Nombre",d.nombreMama,M,y,mitad/2),campo("Edad",d.edadMama,M+mitad/2,y,mitad/4),campo("Celular",d.celularMama,M+mitad*0.75,y,mitad/4),campo("Nombre",d.nombrePapa,M+mitad+4,y,mitad/2),campo("Edad",d.edadPapa,M+mitad+4+mitad/2,y,mitad/4),campo("Celular",d.celularPapa,M+mitad+4+mitad*0.75,y,mitad/4));
    y+=Math.max(campo("Ocup. Mamá",d.ocupacionMama,M,y,mitad),campo("Ocup. Papá",d.ocupacionPapa,M+mitad+4,y,mitad));
    if(d.tieneHermanos)y+=campo("Hermanos",`${d.tieneHermanos}${d.cantidadHermanos?" — "+d.cantidadHermanos:""}`,M,y,col4*2);
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
    // 4. Antecedentes
    checkPage(20);secH("4. Antecedentes Médicos",ROSA);
    const antItems=[["Diagnóstico",antecedentes.diagnosticoPreexistente],["Estudios audición",antecedentes.estudiosAudicion],["Otros estudios",antecedentes.otrosEstudios],["Medicamento",antecedentes.tomaMedicamento],["Asiste terapia",antecedentes.asisteTerapia],["Antecedente familiar",antecedentes.antecedenteFamiliar]].filter(([,v])=>v);
    for(let i=0;i<antItems.length;i+=2){checkPage(8);let mx=0;antItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 5. Desarrollo
    checkPage(20);secH("5. Desarrollo",AZUL);
    y+=Math.max(campo("Balbuceo",desarrollo.edadBalbuceo,M,y,col3),campo("Primera Palabra",desarrollo.primeraPalabra,M+col3,y,col3),campo("Reconoce ABC/Colores/Formas",[desarrollo.reconoceABC&&"ABC",desarrollo.reconoceColores&&"Colores",desarrollo.reconoceFormas&&"Formas"].filter(Boolean).join(", "),M+col3*2,y,col3));
    const desItems=[["Pronuncia 2+ palabras",desarrollo.pronunciaMasDospalabras],["Tipos de sonidos",desarrollo.tipoSonidos],["Difícil de calmar",desarrollo.dificilCalmar],["Se le adivina lo que necesita",desarrollo.adivinanNecesidades],["Comenzó a señalar",desarrollo.edadSeñalar],["Señalar en exceso",desarrollo.actitudSeñalarEnExceso],["Pérdida de lenguaje",desarrollo.perdidaLenguaje],["Adquisición palabras nuevas",desarrollo.adquisicionPalabrasNuevas],["Estancamiento",desarrollo.estancamientoEvento],["Describe al hijo",desarrollo.comoDescribeHijo],["Muy consentido",desarrollo.muyConsentido],["Dinámica familiar",desarrollo.dinamicaFamiliar]].filter(([,v])=>v);
    for(let i=0;i<desItems.length;i+=2){checkPage(8);let mx=0;desItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 6. Alimentación
    checkPage(20);secH("6. Alimentación",VERDE);
    const alimItems=[["Dieta/Alergia",alimentacion.dietaAlergia],["Deglución/Masticación",alimentacion.problemasDeglución],["Selectivo",alimentacion.esSelectivo],["Come con cubiertos",alimentacion.comoComeCubiertos],["Mastica",alimentacion.mastica],["Hace ruidos",alimentacion.haceRuidos],["Boca cerrada/abierta",alimentacion.bocaCerrada]].filter(([,v])=>v);
    for(let i=0;i<alimItems.length;i+=2){checkPage(8);let mx=0;alimItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 7. Comprensión
    checkPage(20);secH("7. Comprensión",LILA);
    const compItems=Object.entries(comprension).filter(([,v])=>v);
    for(let i=0;i<compItems.length;i+=2){checkPage(8);let mx=0;compItems.slice(i,i+2).forEach(([k,v],j)=>{if(v)mx=Math.max(mx,campo(k.replace(/([A-Z])/g,' $1').trim(),v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 8. Expresión
    checkPage(20);secH("8. Expresión",ROSA);
    const exprItems=Object.entries(expresion).filter(([,v])=>v);
    for(let i=0;i<exprItems.length;i+=2){checkPage(8);let mx=0;exprItems.slice(i,i+2).forEach(([k,v],j)=>{if(v)mx=Math.max(mx,campo(k.replace(/([A-Z])/g,' $1').trim(),v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 9. Interacción
    checkPage(20);secH("9. Interacción y Juego",VERDE);
    const interItems=[["Le gusta jugar",interaccion.leGustaJugar],["Actividades solo",interaccion.actividadesSolo],["Actividades con otros",interaccion.actividadesConOtros],["Dificultad interactuar",interaccion.dificultadInteractuar],["Juega solo",interaccion.prefiereJugarSolo],["Juegos de mesa",interaccion.puedenJuegosMesa],["Sigue reglas",interaccion.sigueReglas],["Acepta perder",interaccion.aceptaPerder],["Le gusta competir",interaccion.leGustaCompetir],["Comportamiento atípico",interaccion.comportamientoAtipico],["Objetos peculiares",interaccion.juegaObjetosPeculiares]].filter(([,v])=>v);
    for(let i=0;i<interItems.length;i+=2){checkPage(8);let mx=0;interItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,v,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    y+=2;
    // 10. Frenillo
    checkPage(20);secH("10. Revisión de Frenillo Lingual",AMARILLO);
    const frenItems=[["Forma punta lengua",frenillo.formaPuntaLengua],["Fijación a encía",frenillo.dondeSefijaEncias],["Se levanta",frenillo.cuantoSelevanta],["Sale de boca",frenillo.cuantoSale]].filter(([,v])=>v);
    for(let i=0;i<frenItems.length;i+=2){checkPage(8);let mx=0;frenItems.slice(i,i+2).forEach(([l,v],j)=>{if(v)mx=Math.max(mx,campo(l,`${v} pts`,M+(C/2)*j,y,C/2-2));});if(mx>0)y+=mx;}
    const totalFrenillo=["formaPuntaLengua","dondeSefijaEncias","cuantoSelevanta","cuantoSale"].reduce((s,k)=>s+(parseInt(frenillo[k])||0),0);
    y+=campo("TOTAL FRENILLO",`${totalFrenillo} / 8 puntos`,M,y,C)+2;
    // 11. Diagnóstico
    checkPage(20);secH("11. Diagnóstico Final",AMARILLO);
    if(diagnostico.diagnostico){const lines=doc.splitTextToSize(diagnostico.diagnostico,C-6);const ah=lines.length*4+6;doc.setFillColor(255,252,230);doc.roundedRect(M,y,C,ah,2,2,"F");doc.setFontSize(9);doc.setFont("helvetica","normal");doc.setTextColor(...NEGRO);doc.text(lines,M+3,y+5);y+=ah+6;}
    // Firma
    checkPage(40);doc.setDrawColor(...GLINEA);doc.line(M,y,PW-M,y);y+=5;
    doc.setFontSize(8);doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text("Firma del Psicólogo",PW/2,y,{align:"center"});y+=4;
    if(firmaBase64){doc.addImage(firmaBase64,"PNG",(PW-70)/2,y,70,20);y+=24;}
    else{doc.setDrawColor(...GLINEA);doc.line((PW-70)/2,y+18,(PW-70)/2+70,y+18);y+=22;}
    doc.setFontSize(8.5);doc.setFont("helvetica","bold");doc.setTextColor(...NEGRO);doc.text(profesional.nombre||"",PW/2,y,{align:"center"});
    if(profesional.cedula){doc.setFont("helvetica","normal");doc.setTextColor(...GRIS);doc.text(`Cédula: ${profesional.cedula}`,PW/2,y+4,{align:"center"});}
    const tp=doc.getNumberOfPages();for(let i=1;i<=tp;i++){doc.setPage(i);doc.setFillColor(...HEADER);doc.rect(0,290,PW,8,"F");doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(...BLANCO);doc.text(`Entrevista Terapia de Lenguaje  ·  Página ${i} de ${tp}`,PW/2,295,{align:"center"});}
    doc.save(`Lenguaje_${(d.nombrePaciente||"Paciente").replace(/ /g,"_")}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  if (vistaLista) return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-700">📋 Expedientes — Terapia de Lenguaje</h1>
          <button onClick={() => setVistaLista(false)} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">← Volver</button>
        </div>
        {listaExpedientes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 shadow-md">No hay expedientes guardados aún.</div>
        ) : (
          <div className="space-y-3">
            {listaExpedientes.map(exp => (
              <div key={exp.id} className="bg-white rounded-xl shadow-md p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">{exp.datos?.nombrePaciente || "Sin nombre"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(exp.created_at).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}</p>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onVolver} className="bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-2 rounded-lg transition border border-slate-200">← Volver</button>
          <h2 className="text-xl font-bold text-slate-700">🗣️ Terapia de Lenguaje</h2>
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
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${mensaje.tipo==="exito"?"bg-green-50 text-green-700 border border-green-200":"bg-red-50 text-red-700 border border-red-200"}`}>
          {mensaje.texto}
        </div>
      )}
      {expedienteId && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs text-teal-600 font-medium">
          ✏️ Editando: <strong>{datos.datos?.nombrePaciente || "paciente sin nombre"}</strong>
        </div>
      )}

      <SeccionDatos datos={datos.datos} onChange={actualizar("datos")} />
      <SeccionAntecedentes datos={datos.antecedentes} onChange={actualizar("antecedentes")} />
      <SeccionDesarrollo datos={datos.desarrollo} onChange={actualizar("desarrollo")} />
      <SeccionAlimentacion datos={datos.alimentacion} onChange={actualizar("alimentacion")} />
      <SeccionComprension datos={datos.comprension} onChange={actualizar("comprension")} />
      <SeccionExpresion datos={datos.expresion} onChange={actualizar("expresion")} />
      <SeccionInteraccion datos={datos.interaccion} onChange={actualizar("interaccion")} />
      <SeccionFrenillo datos={datos.frenillo} onChange={actualizar("frenillo")} />
      <SeccionDiagnostico datos={datos.diagnostico} onChange={actualizar("diagnostico")} onGenerarPDF={generarPDF} />
    </div>
  );
}
