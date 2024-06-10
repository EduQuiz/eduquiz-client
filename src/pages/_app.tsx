import "../styles/globals.css";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { user_id } = parseCookies();
  }, []);

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
