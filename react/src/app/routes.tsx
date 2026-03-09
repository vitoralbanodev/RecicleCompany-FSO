import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { Agendamento } from "./pages/agendamento";
import { Consulta } from "./pages/consulta";
import { Denuncia } from "./pages/denuncia";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "agendamento", Component: Agendamento },
      { path: "consulta", Component: Consulta },
      { path: "denuncia", Component: Denuncia }
    ],
  },
]);
