import { useState } from "react";
import type { Orador } from "../types/Orador";
import { oradoresIniciales } from "../services/oradores";

export default function Oradores() {
  const [oradores, setOradores] = useState<Orador[]>(oradoresIniciales);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nombre, setNombre] = useState("");
  const [congregacion, setCongregacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  function guardarOrador() {
    if (nombre.trim() === "" || congregacion.trim() === "") {
      alert("Debe ingresar el nombre y la congregación.");
      return;
    }

    const nuevoOrador: Orador = {
      id: Date.now(),
      nombre,
      congregacion,
      telefono,
      correo,
      activo: true,
    };

    setOradores([...oradores, nuevoOrador]);

    setNombre("");
    setCongregacion("");
    setTelefono("");
    setCorreo("");

    setMostrarFormulario(false);
  }

  return (
    <div>
      <h1>👤 Oradores</h1>

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1f4e79",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        {mostrarFormulario ? "Cancelar" : "+ Nuevo Orador"}
      </button>

      {mostrarFormulario && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Nuevo Orador</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="text"
            placeholder="Congregación"
            value={congregacion}
            onChange={(e) => setCongregacion(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={guardarOrador}
            style={{
              padding: "10px 20px",
              backgroundColor: "#198754",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </div>
      )}

      {oradores.map((orador) => (
        <div
          key={orador.id}
          style={{
            backgroundColor: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
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
        </div>
      ))}
    </div>
  );
}