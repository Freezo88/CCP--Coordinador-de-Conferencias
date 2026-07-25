export default function Oradores() {
  return (
    <div>
      <h1>👤 Oradores</h1>

      <button
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

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Juan Pérez</h3>

        <p>Congregación: Durazno</p>

        <p>Conferencias asignadas: 185</p>

        <p>Última salida: 12/07/2026</p>
      </div>
    </div>
  );
}