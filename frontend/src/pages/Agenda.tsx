import { useState } from "react";
import type { Agenda } from "../types/Agenda";
import { agendaInicial } from "../services/agenda";
import { oradoresIniciales } from "../services/oradores";
import { conferenciasIniciales } from "../services/conferencias";
import FormularioAgenda from "../components/FormularioAgenda";

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<Agenda[]>(agendaInicial);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [fecha, setFecha] = useState("");
  const [oradorId, setOradorId] = useState(0);
  const [conferenciaId, setConferenciaId] = useState(0);
  const [presidente, setPresidente] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [idEditando, setIdEditando] = useState<number | null>(null);

  const [buscar, setBuscar] = useState("");

  function obtenerOrador(id: number) {
    return oradoresIniciales.find((o) => o.id === id);
  }

  function obtenerConferencia(id: number) {
    return conferenciasIniciales.find((c) => c.numero === id);
  }

  function limpiarFormulario() {
    setFecha("");
    setOradorId(0);
    setConferenciaId(0);
    setPresidente("");
    setObservaciones("");
    setIdEditando(null);
    setMostrarFormulario(false);
  }

  function guardarAgenda() {
    if (!fecha || oradorId === 0 || conferenciaId === 0) {
      alert("Complete todos los campos obligatorios.");
      return;
    }

    if (idEditando !== null) {
      setAgenda(
        agenda.map((item) =>
          item.id === idEditando
            ? {
                ...item,
                fecha,
                oradorId,
                conferenciaId,
                presidente,
                observaciones,
              }
            : item
        )
      );
    } else {
      const nuevaAgenda: Agenda = {
        id: Date.now(),
        fecha,
        oradorId,
        conferenciaId,
        presidente,
        observaciones,
      };

      setAgenda([...agenda, nuevaAgenda]);
    }

    limpiarFormulario();
  }

  function editarAgenda(item: Agenda) {
    setFecha(item.fecha);
    setOradorId(item.oradorId);
    setConferenciaId(item.conferenciaId);
    setPresidente(item.presidente);
    setObservaciones(item.observaciones);
    setIdEditando(item.id);
    setMostrarFormulario(true);
  }

  function eliminarAgenda(id: number) {
    if (!confirm("¿Desea eliminar esta programación?")) return;

    setAgenda(agenda.filter((item) => item.id !== id));
  }

  const agendaFiltrada = agenda.filter((item) => {
    const orador = obtenerOrador(item.oradorId)?.nombre ?? "";
    const conferencia = obtenerConferencia(item.conferenciaId)?.titulo ?? "";

    return (
      item.fecha.toLowerCase().includes(buscar.toLowerCase()) ||
      orador.toLowerCase().includes(buscar.toLowerCase()) ||
      conferencia.toLowerCase().includes(buscar.toLowerCase()) ||
      item.presidente.toLowerCase().includes(buscar.toLowerCase())
    );
  });

  return (
    <div>
      <h1>📅 Agenda</h1>

      <button
        onClick={() => {
          limpiarFormulario();
          setMostrarFormulario(true);
        }}
      >
        ➕ Nueva Programación
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Buscar..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {mostrarFormulario && (
        <FormularioAgenda
          fecha={fecha}
          setFecha={setFecha}
          oradorId={oradorId}
          setOradorId={setOradorId}
          conferenciaId={conferenciaId}
          setConferenciaId={setConferenciaId}
          presidente={presidente}
          setPresidente={setPresidente}
          observaciones={observaciones}
          setObservaciones={setObservaciones}
          guardarAgenda={guardarAgenda}
          idEditando={idEditando}
          oradores={oradoresIniciales}
          conferencias={conferenciasIniciales}
        />
      )}

      <hr />

      {agendaFiltrada.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.fecha}</h3>

          <p>
            <strong>👤 Orador:</strong>{" "}
            {obtenerOrador(item.oradorId)?.nombre}
          </p>

          <p>
            <strong>📖 Conferencia:</strong>{" "}
            {obtenerConferencia(item.conferenciaId)?.numero} -{" "}
            {obtenerConferencia(item.conferenciaId)?.titulo}
          </p>

          <p>
            <strong>Presidente:</strong> {item.presidente}
          </p>

          <p>
            <strong>Observaciones:</strong>{" "}
            {item.observaciones || "-"}
          </p>

          <button onClick={() => editarAgenda(item)}>
            ✏️ Editar
          </button>

          <button
            onClick={() => eliminarAgenda(item.id)}
            style={{ marginLeft: "10px" }}
          >
            🗑 Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}