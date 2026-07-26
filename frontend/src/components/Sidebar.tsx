type Props = {
  cambiarPagina: (pagina: string) => void;
};

export default function Sidebar({ cambiarPagina }: Props) {
  return (
    <div
      style={{
        width: "220px",
        background: "#1f4e79",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>📖 CCP</h2>

      <hr />

      <p
        style={{ cursor: "pointer" }}
        onClick={() => cambiarPagina("inicio")}
      >
        🏠 Inicio
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => cambiarPagina("agenda")}
      >
        📅 Agenda
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => cambiarPagina("oradores")}
      >
        👤 Oradores
      </p>
    </div>
  );
}