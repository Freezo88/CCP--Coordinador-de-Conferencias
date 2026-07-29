import { useEffect, useState } from "react";
import type { Orador } from "../types/Orador";
import { oradoresIniciales } from "../services/oradores";
import { cargarDatos, guardarDatos } from "../utils/localStorage";

export default function Oradores() {
 const [oradores, setOradores] = useState<Orador[]>(
  () => cargarDatos("oradores", oradoresIniciales)
);
useEffect(() => {
  guardarDatos("oradores", oradores);
}, [oradores]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nombre, setNombre] = useState("");
  const [congregacion, setCongregacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [buscar, setBuscar] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);

  function limpiarFormulario() {
    setNombre("");
    setCongregacion("");
    setTelefono("");
    setCorreo("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function guardarOrador() {
    if (nombre.trim() === "" || congregacion.trim() === "") {
      alert("Debe ingresar nombre y congregación.");
      return;
    }

    const existe = oradores.some(
      (o) =>
        o.nombre.toLowerCase() === nombre.toLowerCase() &&
        o.id !== idEditando
    );

    if (existe) {
      alert("Ya existe un orador con ese nombre.");
      return;
    }

    if (idEditando !== null) {
      setOradores(
        oradores.map((o) =>
          o.id === idEditando
            ? {
                ...o,
                nombre,
                congregacion,
                telefono,
                correo,
              }
            : o
        )
      );

      limpiarFormulario();
      return;
    }

    const nuevo: Orador = {
      id: Date.now(),
      nombre,
      congregacion,
      telefono,
      correo,
      activo: true,
    };

    setOradores([...oradores, nuevo]);

    limpiarFormulario();
  }

  function editar(orador: Orador) {
    setNombre(orador.nombre);
    setCongregacion(orador.congregacion);
    setTelefono(orador.telefono);
    setCorreo(orador.correo);

    setIdEditando(orador.id);

    setMostrarFormulario(true);
  }

  function eliminar(id: number) {
    if (!confirm("¿Eliminar este orador?")) return;

    setOradores(oradores.filter((o) => o.id !== id));
  }

  return (
    <div>
      <h1>👤 Oradores</h1>

      <button
        onClick={() => {
          limpiarFormulario();
          setMostrarFormulario(true);
        }}
        style={{
          padding: "10px 20px",
          background: "#1f4e79",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + Nuevo Orador
      </button>

      <input
        type="text"
        placeholder="🔍 Buscar..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {mostrarFormulario && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h2>
            {idEditando === null
              ? "Nuevo Orador"
              : "Editar Orador"}
          </h2>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            value={congregacion}
            onChange={(e) => setCongregacion(e.target.value)}
            placeholder="Congregación"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={guardarOrador}
            style={{
              background: "#198754",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {idEditando === null
              ? "Guardar"
              : "Guardar Cambios"}
          </button>
        </div>
      )}

      {oradores
        .filter((o) =>
          o.nombre.toLowerCase().includes(buscar.toLowerCase())
        )
        .map((orador) => (          <div
            key={orador.id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{orador.nombre}</h3>

            <p>
              <strong>Congregación:</strong> {orador.congregacion}
            </p>

            <p>
              <strong>Teléfono:</strong> {orador.telefono}
            </p>

            <p>
              <strong>Correo:</strong> {orador.correo}
            </p>

            <p>
              <strong>Estado:</strong>{" "}
              {orador.activo ? "Activo" : "Inactivo"}
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => editar(orador)}
                style={{
                  background: "#ffc107",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ✏️ Editar
              </button>

              <button
                onClick={() => eliminar(orador.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}