export default function Sidebar() {

  const menu = [
    "🏠 Inicio",
    "📅 Agenda",
    "👤 Oradores",
    "📖 Conferencias",
    "🚗 Salidas",
    "📥 Invitaciones",
    "📜 Historial",
    "📊 Informes",
    "⚙ Configuración",
  ];

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#1f4e79",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>📖 CCP</h2>

      <hr />

      {menu.map((opcion) => (
        <div
          key={opcion}
          style={{
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          {opcion}
        </div>
      ))}
    </div>
  );
}