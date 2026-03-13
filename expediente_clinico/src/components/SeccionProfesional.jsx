import { useRef } from "react";

// ============================================================
// SECCIÓN 1: Datos del Profesional
// Sistema de Expediente Clínico Psicológico
// ============================================================

export default function SeccionProfesional({ datos = {}, onChange }) {
  const logoInputRef = useRef(null);

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange({ ...datos, [name]: value });
  };

  // Guarda el logo como base64 DENTRO de datos (para que llegue al PDF)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (onChange) onChange({ ...datos, logo: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const quitarLogo = () => {
    if (onChange) onChange({ ...datos, logo: null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-slate-100">

      {/* Encabezado de sección */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm">
          👤
        </div>
        <h2 className="text-lg font-semibold text-slate-700">Profesional</h2>
      </div>

      <div className="flex gap-6">

        {/* Columna izquierda: formulario */}
        <div className="flex-1 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Nombre del Terapeuta
            </label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre || ""}
              onChange={handleChange}
              placeholder="Dr. Alejandro Ramírez Cantú"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Especialidad
              </label>
              <input
                type="text"
                name="especialidad"
                value={datos.especialidad || ""}
                onChange={handleChange}
                placeholder="Psicología Clínica Integral"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={datos.cedula || ""}
                onChange={handleChange}
                placeholder="5685200ART115A"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Institución
            </label>
            <input
              type="text"
              name="institucion"
              value={datos.institucion || ""}
              onChange={handleChange}
              placeholder="Nombre de la institución u consultorio"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={datos.direccion || ""}
                onChange={handleChange}
                placeholder="Calle, colonia, ciudad"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Contacto
              </label>
              <input
                type="text"
                name="contacto"
                value={datos.contacto || ""}
                onChange={handleChange}
                placeholder="Tel. o correo"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              />
            </div>
          </div>

        </div>

        {/* Columna derecha: logo */}
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => logoInputRef.current.click()}
            className="w-28 h-28 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition overflow-hidden"
          >
            {datos.logo ? (
              <img src={datos.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <svg className="w-10 h-10 text-slate-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 11c0-1.1.9-2 2-2s2 .9 2 2v1m-4-1c0-1.1-.9-2-2-2s-2 .9-2 2v1m0 0v3a4 4 0 008 0v-3" />
                </svg>
                <span className="text-xs text-slate-400 font-medium">SUBIR LOGO</span>
              </>
            )}
          </div>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          {datos.logo && (
            <button
              onClick={quitarLogo}
              className="text-xs text-red-400 hover:text-red-600 transition"
            >
              Quitar logo
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
