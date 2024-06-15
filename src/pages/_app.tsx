import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  if (
    Component.name === "Entrar" ||
    Component.name === "Registrar" ||
    Component.name === "Responder" ||
    Component.name === "Obrigado"
  ) {
    return <Component {...pageProps} />;
  }

  return (
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  );
}
