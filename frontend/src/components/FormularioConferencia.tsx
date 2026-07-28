type Props = {
  numero: string;
  setNumero: (valor: string) => void;

  titulo: string;
  setTitulo: (valor: string) => void;

  duracion: string;
  setDuracion: (valor: string) => void;

  observaciones: string;
  setObservaciones: (valor: string) => void;

  idEditando: number | null;

  guardarConferencia: () => void;
};

export default function FormularioConferencia({
  numero,
  setNumero,
  titulo,
  setTitulo,
  duracion,
  setDuracion,
  observaciones,
  setObservaciones,
  idEditando,
  guardarConferencia,
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
          ? "Nueva Conferencia"
          : "Editar Conferencia"}
      </h2>

      <input
        type="number"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <select
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <option value="30">30 minutos</option>
        <option value="45">45 minutos</option>
      </select>

      <textarea
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          minHeight: "80px",
        }}
      />

      <button
        onClick={guardarConferencia}
        style={{
          background: "#198754",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
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