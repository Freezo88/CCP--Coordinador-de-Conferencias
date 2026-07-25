import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        background: "#eef2f7",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1>📖 Coordinador de Conferencias</h1>

        <p style={{ color: "#666" }}>
          Congregación Durazno
        </p>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <h2>📅 Próximo sábado</h2>

          <p><strong>Conferencia:</strong> Sin programar</p>

          <p><strong>Orador:</strong> Sin asignar</p>

          <p><strong>Estado:</strong> Pendiente</p>
        </div>
      </main>
    </div>
  );
}