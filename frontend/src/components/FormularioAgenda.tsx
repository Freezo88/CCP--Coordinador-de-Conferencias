type Props = {
  fecha: string;
  setFecha: (valor: string) => void;

  oradorId: number;
  setOradorId: (valor: number) => void;

  conferenciaId: number;
  setConferenciaId: (valor: number) => void;

  presidente: string;
  setPresidente: (valor: string) => void;

  observaciones: string;
  setObservaciones: (valor: string) => void;

  guardarAgenda: () => void;

  idEditando: number | null;

  oradores: {
    id: number;
    nombre: string;
  }[];

  conferencias: {
    numero: number;
    titulo: string;
  }[];
};

export default function FormularioAgenda({
  fecha,
  setFecha,
  oradorId,
  setOradorId,
  conferenciaId,
  setConferenciaId,
  presidente,
  setPresidente,
  observaciones,
  setObservaciones,
  guardarAgenda,
  idEditando,
  oradores,
  conferencias,
}: Props) {
  return (
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
          ? "Nueva Programación"
          : "Editar Programación"}
      </h2>

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <select
        value={oradorId}
        onChange={(e) => setOradorId(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <option value={0}>Seleccione un orador</option>

        {oradores.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nombre}
          </option>
        ))}
      </select>

      <select
        value={conferenciaId}
        onChange={(e) =>
          setConferenciaId(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <option value={0}>Seleccione una conferencia</option>

        {conferencias.map((c) => (
          <option key={c.numero} value={c.numero}>
            {c.numero} - {c.titulo}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Presidente"
        value={presidente}
        onChange={(e) => setPresidente(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) =>
          setObservaciones(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          minHeight: "80px",
        }}
      />

      <button
        onClick={guardarAgenda}
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
  );
}