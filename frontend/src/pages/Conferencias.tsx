import { useState } from "react";
import type { Conferencia } from "../types/Conferencia";
import { conferenciasIniciales } from "../services/conferencias";
import FormularioConferencia from "../components/FormularioConferencia";

export default function Conferencias() {
  const [conferencias, setConferencias] =
    useState<Conferencia[]>(conferenciasIniciales);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [numero, setNumero] = useState("");
  const [titulo, setTitulo] = useState("");
  const [duracion, setDuracion] = useState("30");
  const [observaciones, setObservaciones] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [buscar, setBuscar] = useState("");

  function limpiarFormulario() {
    setNumero("");
    setTitulo("");
    setDuracion("30");
    setObservaciones("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function guardarConferencia() {
    if (numero.trim() === "" || titulo.trim() === "") {
      alert("Debe ingresar el número y el título.");
      return;
    }

    if (
      conferencias.some(
        (c) =>
          c.numero === Number(numero) &&
          c.id !== idEditando
      )
    ) {
      alert("Ese número ya existe.");
      return;
    }

    if (idEditando !== null) {
      setConferencias(
        conferencias.map((c) =>
          c.id === idEditando
            ? {
                ...c,
                numero: Number(numero),
                titulo,
                duracion: Number(duracion),
                observaciones,
              }
            : c
        )
      );

      limpiarFormulario();
      return;
    }

        setConferencias([
      ...conferencias,
      {
        id: Date.now(),
        numero: Number(numero),
        titulo,
        duracion: Number(duracion),
        observaciones,
        activa: true,
      },
    ]);

    limpiarFormulario();
  }

function editarConferencia(conferencia: Conferencia) {
  setNumero(conferencia.numero.toString());
  setTitulo(conferencia.titulo);
  setDuracion(conferencia.duracion.toString());
  setObservaciones(conferencia.observaciones);

  setIdEditando(conferencia.id);
  setMostrarFormulario(true);
}

function eliminarConferencia(id: number) {
  if (!confirm("¿Está seguro que desea eliminar esta conferencia?")) {
    return;
  }

  setConferencias(
    conferencias.filter((c) => c.id !== id)
  );
}

return (
    <div>
      <h1>📖 Conferencias</h1>

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario
          ? "Cancelar"
          : "+ Nueva Conferencia"}
      </button>

      <br />
      <br />

      <input
  type="text"
  placeholder="🔍 Buscar por número o título..."
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
        <FormularioConferencia
          numero={numero}
          setNumero={setNumero}
          titulo={titulo}
          setTitulo={setTitulo}
          duracion={duracion}
          setDuracion={setDuracion}
          observaciones={observaciones}
          setObservaciones={setObservaciones}
          idEditando={idEditando}
          guardarConferencia={guardarConferencia}
        />
      )}

      <hr />

      {conferencias
  .filter(
    (c) =>
      c.numero.toString().includes(buscar) ||
      c.titulo.toLowerCase().includes(buscar.toLowerCase())
  )
  .map((c) => (
        <div
          key={c.id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>
            {c.numero} - {c.titulo}
          </h3>

          <p>Duración: {c.duracion} minutos</p>

          <p>
            Observaciones:
            {" "}
            {c.observaciones || "-"}
          </p>
          <button
  onClick={() => editarConferencia(c)}
  style={{
    marginTop: "10px",
    background: "#ffc107",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  ✏️ Editar
</button>

<button
  onClick={() => eliminarConferencia(c.id)}
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🗑 Eliminar
</button>
        </div>
      ))}
    </div>
  );
}