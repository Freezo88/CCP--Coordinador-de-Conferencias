import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Agenda from "./Agenda";
import Oradores from "./Oradores";

export default function Home() {
  const [pagina, setPagina] = useState("inicio");

  return (
    <div
      style={{
        display: "flex",
        background: "#eef2f7",
        minHeight: "100vh",
      }}
    >
      <Sidebar cambiarPagina={setPagina} />

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {pagina === "inicio" && (
          <>
            <h1>📖 Coordinador de Conferencias</h1>

            <p>Congregación Durazno</p>

            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
              }}
            >
              <h2>Próximo sábado</h2>

              <p>Conferencia: Sin programar</p>

              <p>Orador: Sin asignar</p>

              <p>Estado: Pendiente</p>
            </div>
          </>
        )}

        {pagina === "agenda" && <Agenda />}

        {pagina === "oradores" && <Oradores />}
      </main>
    </div>
  );
}